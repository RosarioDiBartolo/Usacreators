import {
  yesNoEnum,
  urlOrHandle,
  emptyToMissing,
  mustBeTrue,
  phone,
} from "@/lib/schemas-helpers";
import { z } from "zod";
import { MAX_PIC_SIZE } from "../constants"; 
import legal from "./legal-sub";

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
export const formSteps = {
  personal: {
    title: "Let's start simple",
    subTitle: "We need your basic info so we know who we're speaking with.",
    schema: z.object({
      name: z.string().trim().min(2, "Name must be at least 2 characters."),
      phone: phone(z.string()),
      email: z
        .string()
        .email("Enter a valid email address.")
        .transform((e) => e.toLowerCase().trim()),
      locationYesNo: yesNoEnum.default("yes"),
    }),
  },

  social: {
    title: "Make yourself reachable",
    subTitle:
      "Share your social handles so brands can understand your style and reach.",
    schema: z.object({
      portfolio: z.string().trim().url().nullable(),
      instagram: urlOrHandle.nullable(),
      tiktok: urlOrHandle.nullable(),
      instagramPostUrl: z
        .string()
        .trim()
        .min(1, "This field is required.")
        .regex(
          instagramPostUrlRegex,
          "Enter a valid Instagram post URL."
        ),
    }),
  },

  details: {
    title: "Some details about you",
    subTitle:
      "Tell us what niche you work in and upload your profile picture so brands can get a better sense of you.",
    schema: z.object({
      profilePictureFile: profilePictureClient,
      niches: z.array(z.string().trim()).min(1, "Must select at least 1 niche."),
      bio: emptyToMissing(
        z.string().trim().max(MAX_BIO, `Max ${MAX_BIO} characters`)
      ).nullable(),
    }),
  },

  legal: {
    title: "Legals",
    subTitle: legal ,
    schema: z.object({
      newsLetter: mustBeTrue,
      termsAccepted: mustBeTrue,
    }),
  },

  confirm: {
    title: "Check your Email",
    subTitle:
      "We've sent you a confirmation email. Open it to complete your application.",
    schema: null,
  },
} as const;

type FormSteps = typeof formSteps;

// Only keep steps where `schema` is a Zod schema, skip the `null` one
type FormSchemaShape = {
  [K in keyof FormSteps as FormSteps[K]["schema"] extends z.ZodTypeAny
    ? K
    : never]: Extract<FormSteps[K]["schema"], z.ZodTypeAny>;
};

// Union of step names that actually have a schema
export type StepWithSchemaName = keyof FormSchemaShape;

const schemaShape = Object.fromEntries(
  Object.entries(formSteps)
    .filter(([, v]) => v.schema)
    .map(([k, v]) => [k, v.schema!])
) as FormSchemaShape;

export const formSchema: z.ZodObject<FormSchemaShape> = z.object(schemaShape);
// --- Types based on the schema ---
type formSchemaShape = typeof formSchema.shape;

// "personal" | "social" | "details" | "legal"
export type StepId = keyof typeof formSteps;

// For each step, get the keys of its inner .shape ("name", "email", etc.)
type StepFieldKeys = {
  readonly [K in keyof formSchemaShape]: keyof formSchemaShape[K]["shape"];
};

// --- Runtime values + types ---

// ✅ Typed, readonly array of step ids
export const  Steps = Object.freeze(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Object.entries(formSteps).map( ([stepId, step])=> ({
    id: stepId as StepId, ...step
  }) )
) ;
 

// ✅ Readonly map: step -> readonly array of its field keys
export type StepKeysMap = {
  readonly [K in keyof formSchemaShape]: readonly StepFieldKeys[K][];
};

export const stepKeysMap: StepKeysMap = Object.freeze(
  Object.fromEntries(
    Object.entries(formSchema.shape).map(([step, fields]) => {
      const key = step as keyof formSchemaShape;

      const fieldKeys = Object.freeze(
        Object.keys(fields.shape) as StepFieldKeys[typeof key][]
      ) as readonly StepFieldKeys[typeof key][];

      return [key, fieldKeys];
    })
  ) as StepKeysMap
);


