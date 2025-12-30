# Miami Creators

Platform for collecting and managing creator applications. The site uses TanStack React Start with server-side rendering (SSR) to deliver the marketing homepage, creator intake form, and confirmation flows backed by Firestore, Brevo, Cloudinary, and Slack hooks for notifications.

## Stack
- **Framework & SSR:** TanStack React Start with Nitro/Vinxi SSR (`vite.config.ts`, `src/router.tsx`).
- **Styling:** Tailwind CSS v4 (`index.css`, `vite.config.ts`).
- **Observability:** Sentry via `@sentry/tanstackstart-react` and Vite plugin (`vite.config.ts`).
- **Data & integrations:** Firebase Admin for Firestore (`src/lib/firebase/admin` usage across creator flows), Brevo for email list subscription, Cloudinary for media, optional Slack webhook alerts (`src/lib/creators/subscription-steps.ts`).

## Key flows
- **Creator application (submission):** `/creators/apply` renders the form page and posts through `requestSubscription` to persist the application, subscribe via Brevo, and log legal acceptance (`src/routes/creators/apply.tsx`, `src/lib/creators/server-fns.tsx`, `src/lib/creators/subscription-steps.ts`).
- **Confirmation:** `/success/$token` loads an application by confirmation token and finalizes the subscription status before rendering the success page (`src/routes/success.$token.tsx`, `src/lib/creators/server-fns.tsx`).
- **Legal policies:** Legal document versions are read from Firestore for intake logging, and public routes serve Terms, Privacy, and Cookies content (`src/lib/legal/utils.ts`, `src/routes/legal/{terms,privacy,cookies}.tsx`).

## Development
1. Install dependencies (project is pinned to `npm@10.9.0` via `package.json`):
   ```bash
   npm install
   ```
2. Start the dev server (SSR on port 3000 by default):
   ```bash
   npm run dev
   ```

Additional commands:
- Build for production: `npm run build`
- Preview a production build: `npm run preview`
- Start built server (expects `.output` assets): `npm start`
- Type checking: `npm run type-check`
- Linting: `npm run lint`

## Environment variables
Define variables in `.env.local` so they load for dev commands (validated at startup by `src/enviroment/server.ts` and `src/enviroment/client.ts`). Required server-side keys: `SENTRY_AUTH_TOKEN`, `BREVO_API_KEY`, `BREVO_NEWSLETTER_LIST_ID`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `VITE_DOMAIN_URL`, `FIREBASE_SERVICE_ACCOUNT`. Optional keys: `ANALYZE` (defaults `false`), `EMAIL_HASH_SALT`, `ALLOW_ORIGIN` (defaults `*`), `SLACK_WEBHOOK_URL`. Client-side validation also requires `VITE_DOMAIN_URL`.

The playlist import flow expects a YouTube Data API key (`YOUTUBE_API_KEY`) to list playlist items; transcripts are fetched directly from YouTube timed-text endpoints without additional secrets.
