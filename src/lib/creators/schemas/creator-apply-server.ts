// src/lib/shared/creator-apply-server.ts
import { z } from "zod";
import {
  applyStandardRules,
  payloadObject,
 
} from "./creators-apply-shared";
import { TimestampLike } from "@/lib/firebase/utils.js";

 
   

// ---- Persistence schema (what we actually store) ----
// Omit on the object, extend, then re-apply the same rule.
const persistObject = payloadObject
  .omit({
    turnstileToken: true,
     // keep profilePictureUrl if you store the CDN URL
  })
  .extend({
    // normalize/canonicalize before persisting
    email: z.string().email().transform((e) => e.toLowerCase()),
    instagram: z.string().optional().nullable(), // normalized upstream
    tiktok: z.string().optional().nullable(),
    instagramPost: z.string().url().optional().nullable(),
    profilePictureUrl: z.string().url().optional().nullable(),

    // legal block is authoritative server-side
    legal: z.object({
      termsVersion: z.string(), // current versions from server registry
      privacyVersion: z.string(),
      acceptedAt: z.any(), // Firestore server timestamp
    }),

    // audit / meta
    ipHash: z.string(),
    ua: z.string().max(300).optional().default(""),
    country: z.string().optional().default("unknown"),
    source: z.literal("server-fn"),
    createdAt: z.any(), // Firestore server timestamp
  });

export const persistSchema = applyStandardRules(persistObject);
 
export const LegalAcceptanceSchema = z
  .object({
    subjectType: z.literal("application"),
    subjectId: z.string().min(1), // Firestore doc id (random 20 chars typically)
    context: z.literal("application_submit"),
    emailHash: z.string().regex(/^[a-f0-9]{64}$/i, "Expected SHA-256 hex string"),
    ipHash: z
      .string()
      .regex(/^[a-f0-9]{64}$/i, "Expected SHA-256 hex string")
      .optional(),
    userAgent: z.string().min(1).max(512),
    country: z
      .string()
      .regex(/^[A-Z]{2}$/, "Use ISO 3166-1 alpha-2 (e.g., IT, US)"),
    termsVersion: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD"),
    privacyVersion: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD"),
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

 export type PersistRecord = z.infer<typeof persistObject>;
export type EmailVerification = z.infer<typeof EmailVerificationSchema>;
