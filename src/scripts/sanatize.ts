// src/scripts/sanatize.ts

import { db, admin } from "../lib/firebase/admin";
import { sanitizeSchema } from "../lib/sanatize";
import { z } from "zod";

// Infer the sanitized type (optional but nice for type safety)
type SanitizedDoc = z.infer<typeof sanitizeSchema>;

// Simple deep-ish equality check using JSON
const isEqual = <T>(a: T, b: T): boolean =>
  JSON.stringify(a) === JSON.stringify(b);

async function sanitizeApplicationsCollection(): Promise<void> {
  const col = db.collection("applications");

  let lastDocId: string | undefined;
  let processed = 0;
  let updated = 0;
  let invalid = 0;

  console.log("🚀 Starting sanitization of 'applications' collection...");

  while (true) {
    let query = col
      .orderBy(admin.firestore.FieldPath.documentId())
      .limit(400); // headroom for batch limit

    if (lastDocId) {
      query = query.startAfter(lastDocId);
    }

    const snap = await query.get();
    if (snap.empty) {
      break;
    }

    const batch = db.batch();
    let batchWrites = 0;

    for (const doc of snap.docs) {
      processed++;
      const raw = doc.data();

      let parsed: SanitizedDoc;
      try {
        // This should never throw if sanitizeSchema is:
        // - .passthrough() or .strip()
        // - using .default() / .catch() for fields
        parsed = sanitizeSchema.parse(raw);
      } catch (err) {
        invalid++;
        console.error(
          `❌ Doc ${doc.id} could not be parsed even with sanitizeSchema:`,
          err
        );
        continue;
      }

      // Skip writes if nothing actually changed
      if (isEqual(raw, parsed)) {
        continue;
      }

      // Overwrite doc with sanitized version.
      // If sanitizeSchema is .passthrough(), extra fields are preserved.
      // If it's .strip(), extra fields will be removed here.
      batch.set(doc.ref, parsed  , { merge: false });
      batchWrites++;
      updated++;
    }

    if (batchWrites > 0) {
      await batch.commit();
      console.log(
        `✅ Page committed: processed so far=${processed}, updated=${updated}, invalid=${invalid}`
      );
    } else {
      console.log(
        `ℹ️ Page had no changes: processed so far=${processed}, updated=${updated}, invalid=${invalid}`
      );
    }

    // Prepare next page
    lastDocId = snap.docs[snap.docs.length - 1].id;
  }

  console.log("🏁 Sanitization finished.");
  console.log(`Total processed: ${processed}`);
  console.log(`Total updated:   ${updated}`);
  console.log(`Total invalid:   ${invalid}`);
}

// Run the script
sanitizeApplicationsCollection()
  .then(() => {
    console.log("🎉 Done.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("💥 Fatal error during sanitization:", err);
    process.exit(1);
  });
