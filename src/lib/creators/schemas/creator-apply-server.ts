// src/lib/shared/creator-apply-server.ts
import { z } from "zod";
import {
  applyStandardRules,
  // IMPORTANT: use the pure object (no effects) so we can strict/merge/omit safely
  sharedBaseFormObject,
} from "./creators-apply-shared.js";

// ---- Upload meta (wire) ----
const uploadMetaSchema = z
  .object({
    url: z.string().url(),
    mime: z.string().min(1),
    size: z.number().max(3 * 1024 * 1024), // <= 3MB
  })
  .optional();

// ---- Versions sent by client (optional, but if present must be YYYY-MM-DD) ----
const consentServerAdditions = z.object({
  termsVersion: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  privacyVersion: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

// ---- Wire-only extras that the server may receive ----
const serverWireExtras = z.object({
  profilePictureUrl: z.string().trim().url().optional().nullable(),
  profilePicture: uploadMetaSchema, // optional as a whole
  turnstileToken: z.string().optional(),
});

// ---- Build plain object first (no effects here) ----
const baseServerObj = sharedBaseFormObject
  .strict() // reject unknown base fields early
  .merge(consentServerAdditions)
  .merge(serverWireExtras);

// ---- Apply cross-field rule AFTER object construction (always-on) ----
export const serverSchema = applyStandardRules(baseServerObj);


// ---- Persistence schema (what we actually store) ----
// Omit on the object, extend, then re-apply the same rule.
const persistObject = baseServerObj
  .omit({
    turnstileToken: true,
    profilePicture: true, // do not persist raw upload meta
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
    source: z.literal("vercel-api"),
    createdAt: z.any(), // Firestore server timestamp
  });

export const persistSchema = applyStandardRules(persistObject);

export const EmailVerificationSchema = z.object({
  id: z
    .string()
    .min(1, "Missing id")
    .regex(/^[a-zA-Z0-9_-]{5,100}$/, "Invalid document id"), // Firestore-safe
  token: z.string().min(1, "Missing token"), // tokens are opaque
});

export type ServerInput = z.infer<typeof serverSchema>;
export type PersistRecord = z.infer<typeof persistSchema>;
export type EmailVerification = z.infer<typeof EmailVerificationSchema>;
