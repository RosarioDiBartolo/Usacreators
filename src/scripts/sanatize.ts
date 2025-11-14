// scripts/sanitize-creators.ts
import { Creator, creatorObject } from "../lib/creators/schemas/creator-apply-server";
import { db, admin } from "../lib/firebase/admin";

// 🔹 Derived only in this script, schema file stays unchanged
const sanitizeSchema = creatorObject.strip();

// --- 2. Generic shallow equal ---
const isEqual = <T>(a: T, b: T): boolean =>
  JSON.stringify(a) === JSON.stringify(b);

// --- 3. Main sanitize function ---
async function sanitizeCreatorsCollection(): Promise<void> {
  const col = db.collection("applications");

  let lastDocId: string | undefined;
  let processed = 0;
  let updated = 0;
  let invalid = 0;

  while (true) {
    let query = col
      .orderBy(admin.firestore.FieldPath.documentId())
      .limit(400); // keep headroom for batch limit

    if (lastDocId) {
      query = query.startAfter(lastDocId);
    }

    const snap = await query.get();
    if (snap.empty) break;

    const batch = db.batch();

    for (const doc of snap.docs) {
      processed++;

      const rawUnknown = doc.data() as unknown;

      // ⬇️ Use the *stripped* schema → extra fields are ignored, not errors
      const parsed = sanitizeSchema.safeParse(rawUnknown);

      if (!parsed.success) {
        invalid++;
        console.warn(`❌ Invalid doc ${doc.id}:`, parsed.error.flatten());
        continue;
      }

      const normalized: Creator = parsed.data;
      const raw = rawUnknown as Partial<Creator>;

      const update: Partial<Creator> = {};

      for (const key of Object.keys(normalized) as (keyof Creator)[]) {
        const before = raw[key];
        const after = normalized[key];

        if (!isEqual(before, after)) {
          update[key] = after;
        }
      }

      if (Object.keys(update).length > 0) {
        batch.set(doc.ref, update, { merge: true });
        updated++;
      }
    }

    await batch.commit();
    lastDocId = snap.docs[snap.docs.length - 1]?.id;
  }

  console.log(JSON.stringify({ processed, updated, invalid }, null, 2));
}

// --- 4. Run ---
sanitizeCreatorsCollection()
  .then(() => {
    console.log("✅ Done");
    process.exit(0);
  })
  .catch((err) => {
    console.error("🔥 Error in sanitizeCreatorsCollection", err);
    process.exit(1);
  });
