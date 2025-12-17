# Briefing Changelog

## 2025-12-17
- Created `docs/miami-creators-briefing.md` (initial SSOT) from repository files. Verified items included: server functions, Firestore collections, Zod schemas, env vars, and maintenance scripts.

## 2025-12-17 (update)
- Removed non-code-verified content from the SSOT (marketing/product copy and speculative items). Changes:
	- Removed the "One-Sentence Summary" and high-level product marketing statements that are not verifiable in source code.
	- Removed the "Not implemented yet" speculative list.
	- Reworded deployment statements to reference presence of packages/config rather than asserting deployment targets.
- Files proving the changes and used to verify facts:
	- `package.json`
	- `vite.config.ts`
	- `tsconfig.json`
	- `src/enviroment/server.ts`
	- `src/enviroment/client.ts`
	- `src/lib/creators/schemas/creators-apply-server.ts`
	- `src/lib/creators/subscription-steps.ts`
	- `src/lib/creators/server-fns.tsx`
	- `src/lib/legal/utils.ts`
	- `src/lib/meta/index.ts`
	- `src/scripts/sanatize.ts`
	- `src/scripts/legal.ts`
	- `functions/package.json`

Notes / next steps:
- Inspect the TODO paths listed in the SSOT to expand the briefing with exact routes, rules, background jobs, and function implementations.

