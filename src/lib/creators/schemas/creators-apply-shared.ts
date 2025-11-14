import { z } from "zod";

// --- enums & shared
export const yesNoEnum = z.enum(["yes", "no"]);
export type YesNo = z.infer<typeof yesNoEnum>;

// --- helpers
// Only use this on string-based schemas.
export const emptyToUndef = <T extends z.ZodTypeAny>(
  schema: T
) =>
  z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
    schema
    // Zod types this as input = unknown; we narrow it for our use case:
  ) as unknown as z.ZodEffects<
    T,
    z.output<T>,          // output type = whatever the inner schema outputs
    string | undefined    // input type = what our form actually passes
  >;

// Accept either @handle (2-30) or a full URL.
// NOTE: this is a *validator*, not optional by itself.
const handleRegex = /^@[a-zA-Z0-9_.]{2,30}$/;
export const urlOrHandle = z
  .string()
  .trim()
  .refine(
    (v) => handleRegex.test(v) || /^https?:\/\/[^\s]+$/i.test(v),
    "Enter @handle or a full URL."
  );

// Convenience: optional social field coming from forms ("" -> undefined)
export const optionalUrlOrHandle = urlOrHandle.optional();

// If you want a *required* URL (e.g., portfolio), validate real URLs
export const requiredUrl = z
  .string()
  .trim()
  .url("Enter a valid URL (must start with http:// or https://).");

export const MAX_BIO = 1000;
 // 🔹 Cross-field rules (run after preprocess)
export const applyStandardRules = <
  TShape extends z.ZodRawShape & {
    instagram: z.ZodTypeAny;
    tiktok: z.ZodTypeAny;
  }
>(
  obj: z.ZodObject<TShape>
): z.ZodEffects<typeof obj> =>
  obj.superRefine((data, ctx) => {
    // data is typed as z.infer<typeof obj>
    const d = data as z.infer<typeof obj>;

    const hasInstagram =
      d.instagram !== undefined &&
      d.instagram !== null &&
      d.instagram !== "";

    const hasTiktok =
      d.tiktok !== undefined &&
      d.tiktok !== null &&
      d.tiktok !== "";

    if (!hasInstagram && !hasTiktok) {
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
// --- base object (normalize early)
export const sharedBaseFormObject = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z
    .string()
    .email("Enter a valid email address.")
    .transform((e) => e.toLowerCase().trim()),
  locationYesNo: yesNoEnum,
  // Socials from forms may be "" → undefined
  instagram: optionalUrlOrHandle,
  tiktok: optionalUrlOrHandle,
  // Portfolio REQUIRED and must be a real URL
  portfolio: requiredUrl,
  niches: z
    .array(z.string().trim())
    .min(1, "Must select at least 1 niche."),
  bio: emptyToUndef(z.string().trim().max(MAX_BIO, `Max ${MAX_BIO} characters`)).optional(),
});

// ---- Versions (optional but, if present, must be YYYY-MM-DD)
export const consentServerAdditions = z.object({
  termsVersion: emptyToUndef(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional(),
  privacyVersion: emptyToUndef(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional(),
});

// ---- Final creator (strict AFTER merging)
export const payloadObject = sharedBaseFormObject
  .merge(consentServerAdditions)
  .merge(
    z.object({
      profilePictureUrl: emptyToUndef(z.string().trim().url()).optional().nullable(),
      // profilePicture: uploadMetaSchema.optional(),
      turnstileToken: emptyToUndef(z.string().trim()).optional(),
    })
  )
  .strict(); // << strict over the entire merged shape

export const payloadSchema = applyStandardRules(payloadObject);

// Types
export type Payload = z.infer<typeof payloadObject>;
export type StepId = "personal" | "social" | "details" | "media" | "legal";
