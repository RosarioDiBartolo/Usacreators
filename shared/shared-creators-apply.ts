// ============================================================================
// Shared primitives & base slices (safe for both client and server)
// ============================================================================
import { z } from "zod";

// ----- Primitives / Helpers
export const yesNoEnum = z.enum(["yes", "no"]);
export type YesNo = z.infer<typeof yesNoEnum>;

export const MAX_BIO = 1000;
export const MAX_ADDITIONAL = 2000;

// String "" -> undefined helper
export const emptyToUndef = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
    schema
  );

// @handle or http(s):// URL
export const urlOrHandle = z
  .string()
  .trim()
  .optional()
  .refine(
    (v) =>
      v === undefined ||
      /^@[a-zA-Z0-9_.]{2,30}$/.test(v) ||
      /^https?:\/\//.test(v),
    { message: "Enter @handle or a full URL." }
  );

// ----- Base slices (neutral, no File, no env stuff)
export const personalInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Enter a valid email address."),
});

export const socialSchema = z.object({
  locationYesNo: yesNoEnum,
  instagram: urlOrHandle,
  tiktok: urlOrHandle,
  instagramPost: emptyToUndef(
    z.string().url("Enter a valid URL.").optional()
  ),
});

// “Additional” base WITHOUT file (client/server add their own)
export const additionalBaseSchema = z.object({
  bio: emptyToUndef(z.string().max(MAX_BIO, `Max ${MAX_BIO} characters`).optional()),
  additionalInfo: emptyToUndef(
    z.string().max(MAX_ADDITIONAL, `Max ${MAX_ADDITIONAL} characters`).optional()
  ),
});

// Consent *core* (versions are env-specific, added in client/server)
export const consentCoreSchema = z.object({
  termsAccepted: z
  .boolean()
  .refine((v) => v === true, { message: "You must accept terms to continue." })
});


// Often-used composite (no file, no env fields)
export const sharedBaseFormSchema = personalInfoSchema
  .merge(socialSchema)
  .merge(additionalBaseSchema)
  .merge(consentCoreSchema);

// Cross-field helper you can reuse
export const requireAtLeastOneSocial = <T extends z.ZodRawShape>(
  object: z.ZodObject<T>
) =>
  object.superRefine((data , ctx) => {
    if (!data.instagram && !data.tiktok) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["instagram"],
        message: "Provide at least one social (Instagram or TikTok).",
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["tiktok"],
        message: "Provide at least one social (Instagram or TikTok).",
      });
    }
  });

  // Step identifiers — UI concept, not data keys
export type StepId = "personal" | "social" | "details" | "media" | "legal";

export type SharedBaseForm = z.infer<typeof sharedBaseFormSchema>;
