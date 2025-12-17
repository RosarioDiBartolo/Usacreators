# Briefing Changelog

## 2025-12-17
- Created initial SSOT from repository files (`docs/miami-creators-briefing.md`).

## 2025-12-17 (resync)
- Rewrote SSOT to be code/config-only, removed unverified product claims, and added file-path citations (`docs/miami-creators-briefing.md`).
- Added verified public routes inventory (`src/routes/**`, `src/pages/**`).
- Expanded server function list to include Cloudinary upload, creator reads, and Brevo helper (`src/lib/meta/index.ts`, `src/lib/legal/utils.ts`, `src/lib/cloudinary/upload.ts`, `src/lib/creators/server-fns.tsx`, `src/lib/creators/utils.ts`, `src/lib/brevo/server-fns.ts`).
- Added Firestore rules/indexes + Firebase project config summary (`firestore.rules`, `firestore.indexes.json`, `.firebaserc`, `firebase.json`).
- Added creator application schema + persistence/logging details (`src/lib/creators/schemas/creators-apply-shared.ts`, `src/lib/creators/schemas/creators-apply-server.ts`, `src/lib/creators/subscription-steps.ts`, `src/lib/creators/use-application-form.ts`).
- Documented Brevo sync paths in both app runtime and Firebase Functions (`src/lib/brevo/**`, `functions/src/index.ts`, `functions/package.json`).
- Added TODOs for confirmation email delivery, legal-registry schema mismatch, catalog access control, and request-context hashing (`src/lib/creators/subscription-steps.ts`, `src/lib/brevo/utils.ts`, `functions/src/index.ts`, `src/lib/legal/utils.ts`, `src/scripts/legal.ts`, `src/lib/server-only/request/request-context.ts`).
