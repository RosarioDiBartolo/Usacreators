# MIAMI CREATORS — PROJECT BRIEFING (SSOT)
Last synced: 2025-12-17
Source: repository files. This document includes ONLY facts verifiable in code; speculative or product-marketing statements were removed.

## Tech stack & build (verified)
- Frontend: React (dependency `react` in `package.json`).
- Language: TypeScript (see `tsconfig.json`).
- Bundler / dev server: Vite (`vite.config.ts`, `package.json` scripts).
- TanStack: the repo depends on TanStack packages including `@tanstack/react-start`, `@tanstack/react-query`, and `@tanstack/react-router` (see `package.json` and `vite.config.ts`).
- Server runtime / hybrid: `nitro` / `nitropack` are present as dependencies and `@tanstack/react-start` Vite plugin is used (`vite.config.ts`).
- Styling: Tailwind CSS is a dependency and Vite plugin is used (`package.json`, `vite.config.ts`).
- Observability: Sentry is integrated via `@sentry/vite-plugin` and `@sentry/tanstackstart-react` (configured in `vite.config.ts`).

## Repo-level artifacts & scripts (verified)
- Root npm scripts include `dev`, `build`, `start`, `preview`, `type-check`, `lint`, and `legal-registry` (see `package.json`).
- `vercel` and `@vercel/node` are present in `package.json` dependencies.
- A `functions/` folder exists with its own `package.json` (Firebase Functions config, Node engine `22`). (see `functions/package.json`).

## Server endpoints / server functions (verified)
- `src/lib/creators/server-fns.tsx` exports TanStack server functions (`createServerFn`):
	- `requestSubscription` (POST) — handles creator application submission (reads/writes `applications`, uses Brevo subscribe, logs legal acceptance).
	- `confirmSubscription` (POST) — confirms application/status by id (updates `applications` status).
	- `findCreatorByToken` (GET) — finds application by confirmation token (queries `applications`).
- `src/lib/legal/utils.ts` exports `getLegalVersions` (GET) which reads `legal/registry` in Firestore.
- `src/lib/meta/index.ts` exports `getPlatformMeta` (GET) which reads `pages/home` document. (see those files)

## Firestore collections & document locations (verified)
- `applications` — creator application documents. Referenced in: `src/lib/creators/creators-collection.ts`, `src/lib/creators/subscription-steps.ts`, `src/scripts/sanatize.ts`.
- `legal_acceptances` — recorded legal acceptance events. Referenced in: `src/lib/creators/legal-collection.ts`, `src/lib/creators/subscription-steps.ts`.
- `legal/registry` (document) and `legal/history/versions/{version}` (history docs) — used by `src/scripts/legal.ts` and `src/lib/legal/utils.ts`.
- `pages` collection (document `pages/home`) — used for platform meta (`src/lib/meta/index.ts`).
- `test_connection` — used by `scripts/test-firebase-credentials.ts` for connectivity checks.

## Key document schemas (verified)
- Creator application persistence schemas (Zod): `creatorApplicationSchema` and `firebaseCreatorRecord` define the stored shape and sanitization in `src/lib/creators/schemas/creators-apply-server.ts`.
	- Verified fields (examples): `email` (lowercased in code before storage), `profilePictureUrl` (URL string), `instagram`, `tiktok`, `createdAt` (Firestore server timestamp), `status` (`pending` | `confirmed`), `confirmToken` (string), `legal` object (`termsVersion`, `privacyVersion`, `acceptedAt`), `ipHash`, `ua`, `country`, `source: 'server-fn'`, `niches` (string[]), `phone?`, `newsLetter`.

- Legal acceptance schema: `LegalAcceptanceSchema` (in `src/lib/creators/schemas/creators-apply-server.ts`) with fields: `subjectType: 'application'`, `subjectId` (string), `context: 'application_submit'`, `emailHash` (SHA-256 hex), optional `ipHash`, `userAgent`, `country` (ISO 3166-1 alpha-2), `termsVersion` and `privacyVersion` (YYYY-MM-DD), `acceptedAt` (timestamp/date).

## Integrations & environment variables (verified)
- Brevo: dependency `@getbrevo/brevo` and application code uses Brevo utilities to subscribe users (see `src/lib/creators/subscription-steps.ts` and `src/lib/brevo/*`).
- Cloudinary: package `cloudinary` present and Cloudinary-related env vars are validated.
- Slack webhook: `SLACK_WEBHOOK_URL` is read by `notifySlackSafely` (optional).

Server-side env vars validated in `src/enviroment/server.ts` (verified names):
- `ANALYZE`, `SENTRY_AUTH_TOKEN`, `EMAIL_HASH_SALT`, `BREVO_API_KEY`, `BREVO_NEWSLETTER_LIST_ID`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `ALLOW_ORIGIN`, `SLACK_WEBHOOK_URL`, `VITE_DOMAIN_URL`, `FIREBASE_SERVICE_ACCOUNT`.

Client-side env vars validated in `src/enviroment/client.ts` (verified):
- `VITE_DOMAIN_URL`.

## Maintenance scripts (verified)
- `src/scripts/sanatize.ts` — scans `applications` collection and overwrites sanitized documents using Zod schema parsing.
- `src/scripts/legal.ts` — reads `public/legal/terms_{YYYY-MM-DD}.md` and `privacy_{YYYY-MM-DD}.md` and writes `legal/history/versions/{version}` and `legal/registry` in Firestore. Expects a `YYYY-MM-DD` argument and uses `VITE_DOMAIN_URL`.

## Observability & logging (verified)
- Sentry usage appears in server flows (`Sentry.logger.*` in `src/lib/creators/subscription-steps.ts`) and Sentry Vite plugin configuration exists in `vite.config.ts`.

## Verified constraints / behaviors (from code)
- Duplicate prevention: `ensureNoDuplicatesOrThrow` checks Firestore for existing `email`, normalized `instagram`, and normalized `tiktok` before persisting (`src/lib/creators/subscription-steps.ts`).
- Email confirmations: applications are created with a `confirmToken` and status `pending` by default; `confirmSubscription` updates status to `confirmed` (see `creators-apply-server.ts` and `server-fns.tsx`).
- Legal acceptances are logged to `legal_acceptances` with hashed emails (`EMAIL_HASH_SALT` + SHA-256) and timestamped via server timestamp.

## TODO (files to inspect next)
These items require additional file inspection before they can be asserted in the SSOT:
- `src/lib/brevo/**` — confirm exact Brevo API flows and which list IDs are used.
- `src/lib/cloudinary/**` — verify Cloudinary upload endpoints and usage.
- `src/routes/**` and `src/pages/**` — enumerate public client routes and UI flows.
- `firestore.rules` and `firestore.indexes.json` — extract security rules and index requirements.
- `functions/src` (or `functions/lib`) — inspect Firebase Functions source (if present) to document serverless endpoints and schedules.
- `vercel.json`, `instrument.server.mjs`, CI files — verify deployment configuration and any scheduled jobs.

----
Files used to verify this SSOT:
`package.json`, `vite.config.ts`, `tsconfig.json`, `src/enviroment/server.ts`, `src/enviroment/client.ts`, `src/lib/creators/schemas/creators-apply-server.ts`, `src/lib/creators/subscription-steps.ts`, `src/lib/creators/server-fns.tsx`, `src/lib/legal/utils.ts`, `src/lib/meta/index.ts`, `src/scripts/sanatize.ts`, `src/scripts/legal.ts`, `functions/package.json`.
