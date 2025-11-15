import z from "zod";
import { payloadObject } from "./creators/schemas/creators-apply-shared";

// helper: same default for "missing" or "invalid"
export const withDefault = <T extends z.ZodTypeAny>(
  schema: T,
  defaultValue: z.infer<T>
) => schema.default(defaultValue).catch(defaultValue);


// ---- Persistence schema (what we actually store) ----
export const sanitizeSchema = payloadObject
  .omit({
    turnstileToken: true,
    
  })
  .extend({
    email: z
      .string()
      .email()
      .transform((e) => e.toLowerCase()),
      bio: withDefault( z.string().optional(), undefined),
    portfolio:   z.string().url().optional().nullable(),

    instagram: z.string().optional().nullable(),
    tiktok: z.string().optional().nullable(),
    profilePictureUrl: withDefault( z.string().url().nullable(), null),
    niches: withDefault(z.array(z.string()), []),

    legal: z.object({
      termsVersion: z.string(),
      privacyVersion: z.string(),
      acceptedAt: z.any(),
    }),

    ipHash: z.string(),
    ua: z.string().max(300).optional() ,
    country: z.string().optional().default("unknown"),
    source: withDefault( z.literal("server-fn"), "server-fn") ,
    createdAt: z.any(),
  })
  .passthrough();