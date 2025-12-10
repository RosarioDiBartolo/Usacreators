// src/lib/shared/creator-apply-server.ts
import { z } from "zod";
import { applyStandardRules, formSteps } from "./creators-apply-shared";
import { TimestampLike } from "@/lib/firebase/utils.js";
import { withDefault } from "@/lib/zod-utils";

// ---- Persistence schema (what we actually store) ----
// Omit on the object, extend, then re-apply the same rule.

export const creatorApplicationPayloadsObject = z
  .object({
    ...formSteps.shape.details.shape,

    ...formSteps.shape.social.shape,

    ...formSteps.shape.personal.shape
  })
  .omit({
    profilePictureFile: true,
  })
  .extend({
    profilePictureUrl: z.string().url(),
  });
export const creatorApplicationObject = creatorApplicationPayloadsObject.extend(
  {
    legal: z.object({
      acceptedAt: z.any(),
      privacyVersion: z.string(),
      termsVersion: z.string(),
    }),
    // audit / meta
    ipHash: z.string(),
    ua: z.string().max(300).optional().default(""),
    country: z.string().optional().default("unknown"),
    source: z.literal("server-fn"),
    createdAt: z.any(), // Firestore server timestamp
  }
);
//use to create new documents safely and possibly zod safe...
export const creatorApplicationSchema = applyStandardRules(
  creatorApplicationObject
);

// ---- Retriving schema ----
// Some fields might be missing for outdated versions of the forms and the schemas... use this for document retriving and sanatization
export const firebaseCreatorRecord = creatorApplicationObject

  .extend({
    bio: withDefault(z.string().optional(), undefined),
    portfolio: withDefault(z.string().url().optional().nullable(), null),
    instagramPostUrl: z.string().trim().optional(),
    instagram: z.string().optional().nullable(),
    tiktok: z.string().optional().nullable(),
    profilePictureUrl: withDefault(
      z.string().url().optional().nullable(),
      null
    ),
    niches: withDefault(z.array(z.string()), []),
    legal: z.object({
      termsVersion: z.string(),
      privacyVersion: z.string(),
      acceptedAt: TimestampLike,
    }),
    newsLetter: z.boolean().optional().default(true),
    ipHash: z.string(),
    ua: z.string().max(300).optional(),
    country: z.string().optional().default("unknown"),
    source: withDefault(z.literal("server-fn"), "server-fn"),
    createdAt: TimestampLike,
  })
  .strip();

export const LegalAcceptanceSchema = z
  .object({
    subjectType: z.literal("application"),
    subjectId: z.string().min(1), // Firestore doc id (random 20 chars typically)
    context: z.literal("application_submit"),
    emailHash: z
      .string()
      .regex(/^[a-f0-9]{64}$/i, "Expected SHA-256 hex string"),
    ipHash: z
      .string()
      .regex(/^[a-f0-9]{64}$/i, "Expected SHA-256 hex string")
      .optional(),
    userAgent: z.string().min(1).max(512),
    country: z
      .string()
      .regex(/^[A-Z]{2}$/, "Use ISO 3166-1 alpha-2 (e.g., IT, US)"),
    termsVersion: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD"),
    privacyVersion: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD"),
    acceptedAt: z.union([TimestampLike, z.date()]),
  })
  .strict();

export type LegalAcceptance = z.infer<typeof LegalAcceptanceSchema>;
export const EmailVerificationSchema = z.object({
  id: z
    .string()
    .min(1, "Missing id")
    .regex(/^[a-zA-Z0-9_-]{5,100}$/, "Invalid document id"), // Firestore-safe
  token: z.string().min(1, "Missing token"), // tokens are opaque
});
export type FirestoreCreatorRecord = z.infer<typeof creatorApplicationSchema>;

export type Creator = z.infer<typeof firebaseCreatorRecord>;
export type EmailVerification = z.infer<typeof EmailVerificationSchema>;
