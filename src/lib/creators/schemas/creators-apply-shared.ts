import { z } from "zod";

// --- enum & tipo riutilizzabili
export const yesNoEnum = z.enum(["yes", "no"]);
export type YesNo = z.infer<typeof yesNoEnum>;

// --- helper
export const emptyToUndef = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
    schema
  );

export const urlOrHandle = z
  .string()
  .trim()
  .refine((v) => /^@[a-zA-Z0-9_.]{2,30}$/.test(v) || /^https?:\/\//.test(v), {
    message: "Enter @handle or a full URL.",
  });

export const MAX_BIO = 1000;
export const MAX_ADDITIONAL = 2000;

// 🔹 One tiny helper to apply standard cross-field rules everywhere
export const applyStandardRules = <T extends z.ZodTypeAny>(obj: T) =>
  obj.superRefine((data, ctx: z.RefinementCtx) => {
    // Always-on: at least one social
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

export const sharedBaseFormObject = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Enter a valid email address."),
  locationYesNo: yesNoEnum,
  instagram: urlOrHandle,
  tiktok: urlOrHandle,
  portfolio: urlOrHandle,
  bio: emptyToUndef(
    z.string().max(MAX_BIO, `Max ${MAX_BIO} characters`).optional()
  ),
  additionalInfo: emptyToUndef(
    z.string()
      .max(MAX_ADDITIONAL, `Max ${MAX_ADDITIONAL} characters`)
      .optional()
  ),
});

// ---- Versions sent by client (optional, but if present must be YYYY-MM-DD) ----
export const consentServerAdditions = z.object({
  termsVersion: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  privacyVersion: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
});

// ---- Build plain object first (no effects here) ----
export const payloadObject = sharedBaseFormObject
  .strict() // reject unknown base fields early
  .merge(consentServerAdditions)
  .merge(
    z.object({
      profilePictureUrl: z.string().trim().url().optional().nullable(),
      //profilePicture: uploadMetaSchema, // optional as a whole
      turnstileToken: z.string().optional(),
    })
  );

export const payloadSchema = applyStandardRules(payloadObject);

export type Payload = z.infer<typeof payloadObject>;

export type StepId = "personal" | "social" | "details" | "media" | "legal";
