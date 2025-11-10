// src/server/legal/get-legal-versions.ts
import { z } from "zod";
import { createServerFn } from '@tanstack/react-start'
 
// ---- Public type for UI (unchanged)
export type LegalVersions = {
  termsVersion: string;    // e.g. "2025-11-01"
  privacyVersion: string;  // e.g. "2025-11-01"
  termsUrl?: string;
  privacyUrl?: string;
};

// ---- Timestamp guard (works across admin/emulator builds)
export const TimestampLike = z.custom<{ toDate: () => Date }>(
  (v) => !!v && typeof v.toDate === "function",
  "Expected Firestore Timestamp-like object"
);

// ---- Artifact schema (mirrors writer)
const ArtifactSchema = z.object({
  versionYMD: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  url: z.string().url(),
  sha256: z.string().length(64),
  size: z.number().int().nonnegative(),
  contentFormat: z.literal("markdown"),
  publishedAt: TimestampLike,
});

// ---- Registry document stored at legal/registry
const RegistrySchema = z.object({
  currentVersion: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  terms: ArtifactSchema,
  privacy: ArtifactSchema,
  createdAt: TimestampLike,
  updatedAt: TimestampLike,
});

 const ParamsSchema = z.object({
  includeUrls: z.boolean()
}).optional()
export type GetLegalVersionsOptions = z.infer< typeof ParamsSchema>
// Server function (no caching). Can be called from loaders or client.
export const getLegalVersions = createServerFn ({ method: "GET" }).inputValidator(ParamsSchema).handler(async ({ data }) => {
    
  const {db}  = await import("@/lib/firebase/admin");
  const includeUrls = data?.includeUrls ?? false;

  const snap = await db.doc("legal/registry").get();
  if (!snap.exists) {
    // Keep this explicit so failures surface clearly in logs/UX
    throw new Error('Firestore: missing document "legal/registry"');
  }

  const parsed = RegistrySchema.parse(snap.data());

  const result: LegalVersions = {
    termsVersion: parsed.terms.versionYMD,
    privacyVersion: parsed.privacy.versionYMD,
    ...(includeUrls && {
      termsUrl: parsed.terms.url,
      privacyUrl: parsed.privacy.url,
    }),
  };

  return result;
});
