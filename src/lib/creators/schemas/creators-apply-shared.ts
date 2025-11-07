import { z } from "zod";

// --- enum & tipo riutilizzabili
export const yesNoEnum = z.enum(["yes", "no"]);
export type YesNo = z.infer<typeof yesNoEnum>;

// --- helper
export const emptyToUndef = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess(v => (typeof v === "string" && v.trim() === "" ? undefined : v), schema);

const urlOrHandle = z
  .string()
  .trim()
  .optional()
  .refine(
    v =>
      v === undefined ||
      /^@[a-zA-Z0-9_.]{2,30}$/.test(v) ||
      /^https?:\/\//.test(v),
    { message: "Enter @handle or a full URL." }
  );

export const MAX_BIO = 1000;
export const MAX_ADDITIONAL = 2000;
 
export const sharedBaseFormObject = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Enter a valid email address."),
  locationYesNo: yesNoEnum,
  instagram: urlOrHandle,
  tiktok: urlOrHandle,
  instagramPost: emptyToUndef(z.string().url("Enter a valid URL.").optional()),
  bio: emptyToUndef(z.string().max(MAX_BIO, `Max ${MAX_BIO} characters`).optional()),
  additionalInfo: emptyToUndef(
    z.string().max(MAX_ADDITIONAL, `Max ${MAX_ADDITIONAL} characters`).optional()
  ),
  termsAccepted: z.boolean().refine(v => v === true, {
    message: "You must accept terms to continue.",
  }),
});

// 🔹 One tiny helper to apply standard cross-field rules everywhere
export const applyStandardRules = <T extends z.ZodTypeAny>(obj: T) =>
  (obj ).superRefine((data, ctx: z.RefinementCtx) => {
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

// Ready-to-use shared schema if someone just needs “the base form”
export const sharedBaseFormSchema = applyStandardRules(sharedBaseFormObject);
 

export type SharedBaseForm = z.infer<typeof sharedBaseFormSchema>;
export type StepId = "personal" | "social" | "details" | "media" | "legal";
