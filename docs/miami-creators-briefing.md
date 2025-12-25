# MIAMI CREATORS — PROJECT BRIEFING (SSOT)
Last synced: 2025-12-17  
Source: repository code/config only. No speculation.

## 1) What This Repo Is (Code-Verified)
- TanStack Start (SSR) React app with file-based routes and server functions (`vite.config.ts`, `src/router.tsx`, `src/routes/**`, `package.json`).
- Persists data via Firestore using Firebase Admin (service-account credential) (`src/lib/firebase/admin.ts`, `package.json`).
- Integrations present in runtime code: Brevo (contacts), Cloudinary (image uploads), Sentry (logging/observability), optional Slack webhook (`src/lib/brevo/**`, `src/lib/cloudinary/**`, `src/router.tsx`, `instrument.server.mjs`, `src/lib/creators/subscription-steps.ts`).

## 2) Public Routes (Verified)
- `/` home page (`src/routes/index.tsx`, `src/pages/home/index.tsx`).
- `/catalog` catalog page (queries creators) (`src/routes/catalog.tsx`, `src/pages/catalog/**`, `src/lib/creators/utils.ts`).
- `/creators/apply` creator application form (`src/routes/creators/apply.tsx`, `src/pages/apply-creator/**`).
- `/success/$token` confirmation route (marks an application confirmed) (`src/routes/success.$token.tsx`, `src/lib/creators/server-fns.tsx`).
- `/legal/terms`, `/legal/privacy`, `/legal/cookies` static legal pages from JSON assets (`src/routes/legal/terms.tsx`, `src/routes/legal/privacy.tsx`, `src/routes/legal/cookies.tsx`, `src/assets/legal/**`).
- `/__not-found` 404 route (`src/routes/__not-found.tsx`).
- `/rroll` redirect route (`src/routes/rroll.tsx`).

## 3) Server Functions (createServerFn) (Verified)
- `getPlatformMeta` (GET): reads Firestore `pages/home` and returns `{ title }` (`src/lib/meta/index.ts`).
- `getLegalVersions` (GET): reads Firestore `legal/registry` and returns `{ terms, privacy, cookies }` version strings (`src/lib/legal/utils.ts`).
- `uploadProfilePicture` (POST): accepts `FormData` with `file`, uploads to Cloudinary folder `users/avatars` (`src/lib/cloudinary/upload.ts`, `src/lib/cloudinary/cloudinary.ts`).
- `requestSubscription` (POST): runs duplicate checks, reads legal versions, writes application, logs legal acceptance, optional Slack notify (`src/lib/creators/server-fns.tsx`, `src/lib/creators/subscription-steps.ts`).
- `confirmSubscription` (POST): updates `applications/{id}.status` to `"confirmed"` (`src/lib/creators/server-fns.tsx`, `src/lib/creators/subscription-steps.ts`).
- CORS headers for POST flows are set via `setCorsHeaders` (origin from `ALLOW_ORIGIN`, default `*`) (`src/lib/creators/subscription-steps.ts`, `src/enviroment/server.ts`).
- `findCreatorByToken` (GET): queries `applications` where `confirmToken == $token` (`src/lib/creators/server-fns.tsx`, `src/lib/creators/creators-collection.ts`).
- `getCreators` / `getCreator` (GET): reads from `applications` via `creatorsRepo` / `findCreators` (`src/lib/creators/utils.ts`, `src/lib/creators/creators-collection.ts`).
- `subscribeToNewsletterFunction` (POST): calls Brevo `createContact` helper (`src/lib/brevo/server-fns.ts`, `src/lib/brevo/utils.ts`).

## 4) Firestore: Access, Rules, Indexes (Verified)
- Admin initialization requires base64 JSON `FIREBASE_SERVICE_ACCOUNT` (`src/lib/firebase/admin.ts`, `src/enviroment/server.ts`).
- Firestore security rules only allow public `get` for `/pages/home`; everything else is denied (`firestore.rules`).
- Firestore indexes are defined for the `applications` collection group (e.g., `bio+createdAt`, `email+createdAt`, `ipHash+createdAt`) (`firestore.indexes.json`).
- Firebase project wiring: default project is `miami-creators` and Firestore location is `eur3` (`.firebaserc`, `firebase.json`).

## 5) Data Model (Verified Names + Where Used)
- `applications` collection: creator application records, including `status`, `confirmToken`, and nested `legal` object (`src/lib/creators/schemas/creators-apply-server.ts`, `src/lib/creators/subscription-steps.ts`, `src/lib/creators/creators-collection.ts`).
- `legal_acceptances` collection: append-only acceptance logs (`src/lib/creators/subscription-steps.ts`, `src/lib/creators/legal-collection.ts`).
- `pages/home` document: platform meta used for `<title>` (`src/lib/meta/index.ts`, `firestore.rules`).
- `legal/registry` + `legal/history/versions/{YYYY-MM-DD}` docs: runtime expects registry entries for `terms`, `privacy`, and `cookies` artifacts with timestamps; sync script writes `terms`/`privacy` artifacts and a `currentVersion` field (`src/lib/legal/utils.ts`, `src/scripts/legal.ts`).
- `test_connection/connection_test` doc: used by Firestore credentials test script (`scripts/test-firebase-credentials.ts`).

## 6) Creator Application Flow (Verified)
- Client form is multi-step (personal/social/details/legal/confirm) using Zod schemas (`src/pages/apply-creator/creators-form/index.tsx`, `src/lib/creators/schemas/creators-apply-shared.ts`).
- Client-required fields include: `name`, `email`, `phone`, `locationYesNo`, `instagramPostUrl`, `niches[]`, `profilePictureFile`, `newsLetter`, `termsAccepted`; at least one of `instagram` or `tiktok` must be provided (`src/lib/creators/schemas/creators-apply-shared.ts`).
- Client uploads profile picture to Cloudinary before submitting the application (`src/lib/creators/use-application-form.ts`, `src/lib/cloudinary/upload.ts`).
- Server normalizes `email`, `instagram`, `tiktok`; adds `ua`, `country`, `ipHash`, `createdAt`, `confirmToken`, `status: "pending"`, and `legal.{termsVersion,privacyVersion,acceptedAt}` (`src/lib/creators/subscription-steps.ts`).
- Request context sets `X-Request-ID`, reads `user-agent` and `x-vercel-ip-country`, and computes `ipHash` (`src/lib/server-only/request/request-context.ts`).
- Duplicate checks prevent re-application by `email`, `instagram`, `tiktok`, and by Brevo list membership (`src/lib/creators/subscription-steps.ts`, `src/lib/brevo/utils.ts`).
- Legal acceptance is logged to `legal_acceptances` with a salted `emailHash` and an `ipHash` derived from request context (`src/lib/creators/subscription-steps.ts`, `src/lib/server-only/request/request-context.ts`, `src/enviroment/server.ts`).
- Confirmation: visiting `/success/$token` looks up by `confirmToken` and calls `confirmSubscription` to set `status: "confirmed"` (`src/routes/success.$token.tsx`, `src/lib/creators/server-fns.tsx`).

## 7) Brevo Sync (Verified)
- App runtime can create a Brevo contact and add it to list `BREVO_NEWSLETTER_LIST_ID` (`src/lib/brevo/client.ts`, `src/lib/brevo/utils.ts`, `src/enviroment/server.ts`).
- `requestSubscription` persists the application and calls `subscribeToNewsletter(...)` (`src/lib/creators/subscription-steps.ts`).
- Firebase Functions codebase also syncs Brevo on Firestore triggers for `applications/{applicationId}` create/update/delete (`functions/src/index.ts`, `firebase.json`, `functions/package.json`).

## 8) Observability (Verified)
- Sentry is initialized in both `instrument.server.mjs` and `src/router.tsx` (hardcoded DSN) and used for logging in server functions (`instrument.server.mjs`, `src/router.tsx`, `src/lib/creators/server-fns.tsx`, `src/lib/brevo/server-fns.ts`).
- Build-time sourcemap upload is configured via `@sentry/vite-plugin` using `SENTRY_AUTH_TOKEN` (`vite.config.ts`, `src/enviroment/server.ts`).

## 9) Environment Variables (Verified Validation)
- Server-validated env vars (`src/enviroment/server.ts`): `SENTRY_AUTH_TOKEN`, `BREVO_API_KEY`, `BREVO_NEWSLETTER_LIST_ID`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `VITE_DOMAIN_URL`, `FIREBASE_SERVICE_ACCOUNT`. Optional: `ANALYZE`, `EMAIL_HASH_SALT`, `ALLOW_ORIGIN` (default `*`), `SLACK_WEBHOOK_URL`.
- Client-validated env vars (`src/enviroment/client.ts`): `VITE_DOMAIN_URL`.

## 10) TODO / Follow-ups (Needs Inspection)
- Confirmation email/link delivery: `confirmToken` is generated and stored, but not forwarded to Brevo payloads or any mailer code path (`src/lib/creators/subscription-steps.ts`, `src/lib/brevo/utils.ts`, `functions/src/index.ts`, `src/pages/apply-creator/creators-form/confirm.tsx`).
- Legal registry schema alignment: runtime expects `legal/registry` to include `cookies`, but `src/scripts/legal.ts` writes only `terms` + `privacy` and expects markdown files not present in-repo (only JSON assets exist) (`src/lib/legal/utils.ts`, `src/scripts/legal.ts`, `public/legal/**`, `src/assets/legal/**`).
- Catalog access control: `/catalog` queries `applications` via `getCreators` without any auth checks; verify intended exposure/field filtering (`src/routes/catalog.tsx`, `src/pages/catalog/**`, `src/lib/creators/utils.ts`, `src/lib/creators/creators-collection.ts`).
- Sanitization script status: `src/scripts/sanatize.ts` imports `{ db, admin }` but `src/lib/firebase/admin.ts` exports only `db` (`src/scripts/sanatize.ts`, `src/lib/firebase/admin.ts`).
- Request context IP hashing: request context currently hashes the `Host` header, not the client IP headers listed in `extractClientIp` (`src/lib/server-only/request/request-context.ts`, `src/lib/server-only/utils.ts`).
- Deployment expectations: `vercel.json` is effectively empty; confirm what platform config is required (`vercel.json`, `src/lib/server-only/request/request-context.ts`).
