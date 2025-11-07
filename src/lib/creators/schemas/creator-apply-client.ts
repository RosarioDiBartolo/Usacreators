import { z } from "zod";
import {
  applyStandardRules,
  emptyToUndef,
  // IMPORTANT: import the pure object (no effects) so we can extend/omit/merge safely
  sharedBaseFormObject,
  type StepId,
} from "./creators-apply-shared";
import { MAX_PIC_SIZE } from "../constants";

// Client-only file field (optional)
const profilePictureClient = z
  .instanceof(File)
  .optional()
  .refine(
    (f) => !f || ["image/jpeg", "image/png", "image/webp"].includes(f.type),
    "Allowed: JPG, PNG, WEBP."
  )
  .refine(
    (f) => !f || f.size <= MAX_PIC_SIZE * 1024 * 1024,
    `Max size is ${MAX_PIC_SIZE} MB.`
  );

// 1) Start from the base object and extend with UI/client fields
const clientFormObject = sharedBaseFormObject.extend({
  profilePictureFile: profilePictureClient, // optional
});

// 2) Apply the always-on cross-field rule inline (now becomes ZodEffects)
export const clientFormSchema =   applyStandardRules(clientFormObject);


// 3) UI-only stuff: outside of “contractual” data
export const clientUiOnlySchema = z.object({
  turnstileToken: emptyToUndef(z.string().optional()),
});

// 4) Submit payload (strip the File, then add UI-only token) — compose on objects first
const clientSubmitObject = clientFormObject
  .omit({ profilePictureFile: true })
  .merge(clientUiOnlySchema);

// 5) Apply the same always-on rule to the submit payload
export const clientSubmitSchema = applyStandardRules(clientSubmitObject);


// Types
export type ClientFormData = z.infer<typeof clientFormSchema>;

// Steps: ids are UI-level; fields are actual form keys
export type Step = {
  id: StepId;
  fields: ReadonlyArray<keyof ClientFormData>;
};

export const steps = [
  { id: "personal", fields: ["name", "email", "profilePictureFile"] },
  { id: "social", fields: ["locationYesNo", "instagram", "tiktok", "instagramPost"] },
  { id: "details", fields: ["bio", "additionalInfo"] },
  { id: "legal", fields: ["termsAccepted"] },
] as const satisfies ReadonlyArray<Step>;

export const stepKeysMap: Record<number, readonly (keyof ClientFormData)[]> =
  Object.fromEntries(steps.map((s, i) => [i, s.fields]));
