import { z } from "zod";
import {
  applyStandardRules, 
  // IMPORTANT: import the pure object (no effects) so we can extend/omit/merge safely
  sharedBaseFormObject, 
  type StepId,
} from "./creators-apply-shared";
import { MAX_PIC_SIZE } from "../constants";

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

// 1) Start from the base object and extend with UI/client fields
export const clientFormObject = sharedBaseFormObject.extend({
  profilePictureFile: profilePictureClient, // optional
  termsAccepted: z.boolean().refine(
    (v) => v === true, 
  "You must accept terms to continue.",
  ),
});

// 2) Apply the always-on cross-field rule inline (now becomes ZodEffects)
export const clientSubmitSchema = applyStandardRules(clientFormObject);

// 3) UI-only stuff: outside of “contractual” data
 
 
// Types
export type ClientFormData = z.infer<typeof clientFormObject>;

// Steps: ids are UI-level; fields are actual form keys
export type Step = {
  id: StepId;
  fields: ReadonlyArray<keyof ClientFormData>;
};

export const steps = [
  { id: "personal", fields: ["name", "email", "profilePictureFile"] },
  {
    id: "social",
    fields: ["locationYesNo", "portfolio", "instagram", "tiktok"],
  },
  { id: "details", fields: [ "niches", "bio", "instagramPostUrl"] },
  { id: "legal", fields: ["termsAccepted"] },
] as const satisfies ReadonlyArray<Step>;

export const stepKeysMap: Record<number, readonly (keyof ClientFormData)[]> =
  Object.fromEntries(steps.map((s, i) => [i, s.fields]));
