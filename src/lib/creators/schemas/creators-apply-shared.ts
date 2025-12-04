import { yesNoEnum, urlOrHandle, emptyToMissing  } from "@/lib/schemas-helpers";
import { z } from "zod";

export const MAX_BIO = 1000;
// 🔹 Cross-field rules (run after preprocess)
export const applyStandardRules = <
  TShape extends z.ZodRawShape & {
    instagram: z.ZodTypeAny;
    tiktok: z.ZodTypeAny;
  },
>(
  obj: z.ZodObject<TShape>
): z.ZodEffects<typeof obj> =>
  obj.superRefine((data, ctx) => {
    // data is typed as z.infer<typeof obj>
    const d = data as z.infer<typeof obj>;

    const hasInstagram =
      d.instagram !== undefined && d.instagram !== null && d.instagram !== "";

    const hasTiktok =
      d.tiktok !== undefined && d.tiktok !== null && d.tiktok !== "";

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

  // ✅ Instagram post URL (only posts/reels/tv)
  const instagramPostUrlRegex =  /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|tv)\/[A-Za-z0-9_\-]+\/?/i;

// --- base object (normalize early)
export const sharedBaseFormObject = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z
    .string()
    .email("Enter a valid email address.")
    .transform((e) => e.toLowerCase().trim()),
  locationYesNo: yesNoEnum.default("yes"),
  // Socials from forms may be "" → undefined
  instagram: urlOrHandle.nullable(),
  tiktok: urlOrHandle.nullable(),
  instagramPostUrl: z
    .string()
    .trim()
    .min(1, "This field is required.")
    .url("Enter a valid URL (must start with http:// or https://).")
    .regex(
      instagramPostUrlRegex,
      "Enter a valid Instagram post URL (post or reel)."
    ),

  portfolio: z
    .string()
    .trim()
    .url("Enter a valid URL (must start with http:// or https://).")
    .nullable(),
  niches: z.array(z.string().trim()).min(1, "Must select at least 1 niche."),
  bio: emptyToMissing(
    z.string().trim().max(MAX_BIO, `Max ${MAX_BIO} characters`)
  ).nullable(),
});

// ---- Final creator (strict AFTER merging)
export const applyCreatorParamsObject = sharedBaseFormObject
  .merge(
    z.object({
      profilePictureUrl: emptyToMissing(z.string().trim().url()),
      // legal block is authoritative server-side
      legal: z.object({
        termsVersion: z.string(), // current versions from server registry
        privacyVersion: z.string(),
      }),
      turnstileToken: emptyToMissing(z.string().trim()).optional(),
    })
  )
  .strict(); // << strict over the entire merged shape

export const applyCreatorParamsSchema = applyStandardRules(
  applyCreatorParamsObject
);

// Types
export type ApplyCreatorParams = z.infer<typeof applyCreatorParamsObject>;
export type StepId = "personal" | "social" | "details" | "media" | "legal";
