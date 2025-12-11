import { z } from "zod";

// --- enums & shared
export const yesNoEnum = z.enum(["yes", "no"]);
export type YesNo = z.infer<typeof yesNoEnum>;

// --- helpers
// Only use this on string-based schemas.
export const emptyToMissing = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? null : v),
    schema
  ) as unknown as z.ZodEffects<T, z.output<T>, string>;

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
// helper: same default for "missing" or "invalid"


  export const mustBeTrue = z
      .boolean()
      .refine((v) => v === true, "You must accept this to continue.")
 
      export const withDefault = <T extends z.ZodTypeAny>(
  schema: T,
  defaultValue: z.infer<T>
) => schema.default(defaultValue).catch(defaultValue);
