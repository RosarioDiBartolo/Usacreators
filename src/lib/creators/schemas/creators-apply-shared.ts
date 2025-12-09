import { yesNoEnum, urlOrHandle, emptyToMissing } from "@/lib/schemas-helpers";
import { z } from "zod";
import { MAX_PIC_SIZE } from "../constants";

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
const instagramPostUrlRegex =
  /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|tv)\/[A-Za-z0-9_\-]+\/?/i;
// Client-only file field (optional)
const profilePictureClient = z
  .instanceof(File)
  .optional()
  .refine((f) => f !== undefined, "A profile picture is required.")
  .refine(
    (f) => !f || ["image/jpeg", "image/png", "image/webp"].includes(f.type),
    "Allowed: JPG, PNG, WEBP."
  )
  .refine(
    (f) => !f || f.size <= MAX_PIC_SIZE * 1024 * 1024,
    `Max size is ${MAX_PIC_SIZE} MB.`
  );

export const formSteps = z.object({
  personal: z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters."),
    email: z
      .string()
      .email("Enter a valid email address.")
      .transform((e) => e.toLowerCase().trim()),

    locationYesNo: yesNoEnum.default("yes"),
  }),

  social: z.object({
    portfolio: z
      .string()
      .trim()
      .url("Enter a valid URL (must start with http:// or https://).")
      .nullable(),
    instagram: urlOrHandle.nullable(),
    tiktok: urlOrHandle.nullable(),
    instagramPostUrl: z
      .string()
      .trim()
      .min(1, "This field is required.")
      .regex(
        instagramPostUrlRegex,
        "Enter a valid Instagram post URL (post or reel)."
      ),
  }),

  details: z.object({
    profilePictureFile: profilePictureClient,
    niches: z.array(z.string().trim()).min(1, "Must select at least 1 niche."),
    bio: emptyToMissing(
      z.string().trim().max(MAX_BIO, `Max ${MAX_BIO} characters`)
    ).nullable(),
  }),
  legal: z.object({
    newsletter: z.boolean() ,
    termsAccepted: z
      .boolean()
      .refine((v) => v === true, "You must accept terms to continue."),
  }),
});
// --- Types based on the schema ---
type FormStepsShape = typeof formSteps.shape;

// "personal" | "social" | "details" | "legal"
export type StepId = keyof FormStepsShape;

// For each step, get the keys of its inner .shape ("name", "email", etc.)
type StepFieldKeys = {
  readonly [K in StepId]: keyof FormStepsShape[K]["shape"];
};

// --- Runtime values + types ---

// ✅ Typed, readonly array of step ids
export const steps = Object.freeze(
  Object.keys(formSteps.shape)
) as readonly StepId[];

// ✅ Readonly map: step -> readonly array of its field keys
export type StepKeysMap = {
  readonly [K in StepId]: readonly StepFieldKeys[K][];
};

export const stepKeysMap: StepKeysMap = Object.freeze(
  Object.fromEntries(
    Object.entries(formSteps.shape).map(([step, fields]) => {
      const key = step as StepId;

      const fieldKeys = Object.freeze(
        Object.keys(fields.shape) as StepFieldKeys[typeof key][]
      ) as readonly StepFieldKeys[typeof key][];

      return [key, fieldKeys];
    })
  ) as StepKeysMap
);
