// src/scripts/sanatize.ts (or sanitize-creators.ts)

import { z } from "zod";
import { db, admin } from "../lib/firebase/admin";
import { payloadObject } from "@/lib/creators/schemas/creators-apply-shared";

// ---- Persistence schema (what we actually store) ----
export const sanitizeSchema = payloadObject
  .omit({
    turnstileToken: true,
    portfolio: true,
    niches: true,
  })
  .extend({
    email: z
      .string()
      .email()
      .transform((e) => e.toLowerCase()),
    portfolio: z.string().url().optional().nullable(),
    instagram: z.string().optional().nullable(),
    tiktok: z.string().optional().nullable(),
    profilePictureUrl: z.string().url().optional(),
    niches: z.array(z.string()).default([]),

    legal: z.object({
      termsVersion: z.string(),
      privacyVersion: z.string(),
      acceptedAt: z.any(),
    }),

    ipHash: z.string(),
    ua: z.string().max(300).optional().default(""),
    country: z.string().optional().default("unknown"),
    source: z.literal("server-fn").default("server-fn"),
    createdAt: z.any(),
  })
  .strip();

type SanitizedDoc = z.infer<typeof sanitizeSchema>;

const defaultValues: Partial<SanitizedDoc> = {
  name: "",
  email: "",
  profilePictureUrl: undefined,
  // 👇 important: make bio a defined string so it stops being "Required"
  bio: "",
  niches: [],
  locationYesNo: "yes",
  portfolio: null,
  instagram: undefined,
  tiktok: undefined,
};

const isEqual = (a: unknown, b: unknown) =>
  JSON.stringify(a) === JSON.stringify(b);

async function sanitizeCreatorsCollection(): Promise<void> {
  const col = db.collection("applications");

  let lastDocId: string | undefined;
  let processed = 0;
  let updated = 0;
  let invalid = 0;

  while (true) {
    let query = col
      .orderBy(admin.firestore.FieldPath.documentId())
      .limit(400);

    if (lastDocId) {
      query = query.startAfter(lastDocId);
    }

    const snap = await query.get();
    if (snap.empty) break;

    const batch = db.batch();

    for (const doc of snap.docs) {
      processed++;

      const rawUnknown = doc.data() as Record<string, unknown>;

      let toValidate: Record<string, unknown> = {
        ...defaultValues,
        ...rawUnknown,
      };

      let parsed = sanitizeSchema.safeParse(toValidate);

      if (!parsed.success) {
        const { fieldErrors } = parsed.error.flatten();

        const repairPatch: Partial<SanitizedDoc> = {};

        // --- TARGETED REPAIRS ---

        // profilePictureUrl: invalid blob / junk → unset it
        if (fieldErrors.profilePictureUrl) {
          repairPatch.profilePictureUrl = undefined;
        }

        // source: anything that's not "server-fn" → force it
        if (fieldErrors.source) {
          repairPatch.source = "server-fn";
        }

        // portfolio: invalid URL → null it out (schema allows nullable)
        if (fieldErrors.portfolio) {
          repairPatch.portfolio = null;
        }

        // 🔥 NEW: bio is required by your schema → default to empty string
        if (fieldErrors.bio) {
          repairPatch.bio = "";
        }

        // If we don't know how to fix any of the errors → count as invalid and skip
        if (Object.keys(repairPatch).length === 0) {
          invalid++;
          console.warn(
            `❌ Invalid doc ${doc.id}, nothing to auto-fix:`,
            fieldErrors
          );
          continue;
        }

        // Apply patch and retry validation
        toValidate = { ...toValidate, ...repairPatch };
        const retry = sanitizeSchema.safeParse(toValidate);

        if (!retry.success) {
          invalid++;
          console.warn(
            `❌ Doc ${doc.id} still invalid after patch:`,
            retry.error.flatten()
          );
          continue;
        }

        parsed = retry;
      }

      // At this point, parsed is valid
      const sanitized = parsed.data as SanitizedDoc;

      // Only compare on known fields
      const currentKnown: Partial<SanitizedDoc> = {};
      for (const key of Object.keys(sanitized) as (keyof SanitizedDoc)[]) {
        currentKnown[key] = rawUnknown[key] as SanitizedDoc[typeof key];
      }

      if (!isEqual(currentKnown, sanitized)) {
        batch.set(doc.ref, sanitized, { merge: true });
        updated++;
      }
    }

    await batch.commit();
    lastDocId = snap.docs[snap.docs.length - 1]?.id;
  }

  console.log(JSON.stringify({ processed, updated, invalid }, null, 2));
}

sanitizeCreatorsCollection()
  .then(() => {
    console.log("✅ Done");
    process.exit(0);
  })
  .catch((err) => {
    console.error("🔥 Error in sanitizeCreatorsCollection", err);
    process.exit(1);
  });
