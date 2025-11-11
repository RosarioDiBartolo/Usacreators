// src/server/legal/get-legal-versions.ts
import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";
import { validatePolicyDoc } from "./policy";
import { setResponseHeader } from "@tanstack/react-start/server";

// ---- Public type for UI (unchanged)
export type LegalVersions = {
  terms: string; // e.g. "2025-11-01"
  privacy: string; // e.g. "2025-11-01"
  cookies: string;
  termsUrl?: string;
  privacyUrl?: string;
};

// ---- Timestamp guard (works across admin/emulator builds)
export const TimestampLike = z.custom<{ toDate: () => Date }>(
  (v) => !!v && typeof v.toDate === "function",
  "Expected Firestore Timestamp-like object"
);

const policyVersion = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
// ---- Artifact schema (mirrors writer)
const ArtifactSchema = z.object({
  versionYMD: policyVersion,
  url: z.string().url().optional(),
  sha256: z.string().length(64).optional(),
  size: z.number().int().nonnegative().optional(),
  contentFormat: z.literal("markdown").optional(),
  publishedAt: TimestampLike,
});

// ---- Registry document stored at legal/registry
const RegistrySchema = z.object({
  terms: ArtifactSchema,
  privacy: ArtifactSchema,
  cookies: ArtifactSchema,
  createdAt: TimestampLike,
  updatedAt: TimestampLike,
});

// Server function (no caching). Can be called from loaders or client.
export const getLegalVersions = createServerFn({ method: "GET" }).handler(
  async () => {
    const { db } = await import("@/lib/firebase/admin");

    const snap = await db.doc("legal/registry").get();
    if (!snap.exists) {
      // Keep this explicit so failures surface clearly in logs/UX
      throw new Error('Firestore: missing document "legal/registry"');
    }

    const parsed = RegistrySchema.parse(snap.data());

    const result: LegalVersions = {
      terms: parsed.terms.versionYMD,
      privacy: parsed.privacy.versionYMD,
      cookies: parsed.cookies.versionYMD,
    };

    return result;
  }
);
const policyObject = z.enum(["terms", "privacy", "cookie"]);
export type Policy = z.infer<typeof policyObject>;
export type PolicyVersion = z.infer<typeof policyVersion>;

const params = z.object({
  policy: policyObject,
  version: policyVersion,
});

export const getLegalFromPublic = createServerFn({ method: "GET" })
  .inputValidator(params)
  .handler(async ({ data: { policy, version } }) => {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");

    const filePath = path.join(
      process.cwd(),
      "public",
      "legal",
      policy,
      `${version}.json`
    );

    const rawStr = await fs.readFile(filePath, "utf8");
    const raw = JSON.parse(rawStr);
    const parsed = validatePolicyDoc(raw);
    setResponseHeader(
      "Cache-Control",
      "public, max-age=300, stale-while-revalidate=86400"
    );

    return { version, parsed };
  });
