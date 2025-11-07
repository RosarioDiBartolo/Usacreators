import { z } from "zod";
import {
  sharedBaseFormSchema,
  requireAtLeastOneSocial,
  emptyToUndef,
  type StepId,
} from "./creators-apply-shared";
import { MAX_PIC_SIZE } from "../constants";

// Client-only file field (opzionale)
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

// Base client: NON includere qui i legal versions
const baseClientObj = sharedBaseFormSchema.merge(
  z.object({
    profilePictureFile: profilePictureClient, // opzionale
  })
);

// ✅ Schema del form sul client (singolo-step / field-level validators useranno questo)
export const clientFormSchema = baseClientObj;

// ✅ UI-only stuff: fuori dalla validazione dei dati “contrattuali”
export const clientUiOnlySchema = z.object({
  turnstileToken: emptyToUndef(z.string().optional()),
});

// ✅ Payload di submit dal client (esempio: se vuoi togliere il File nativo)
export const clientSubmitSchema = baseClientObj
  .omit({ profilePictureFile: true })
  .merge(clientUiOnlySchema);

// ✅ Cross-field: “almeno un social” (solo al submit)
export const fullSchema = requireAtLeastOneSocial(clientFormSchema);

// Types
export type ClientFormData = z.infer<typeof clientFormSchema>;

// Steps: ids are UI-level; fields are actual form keys
export type Step = {
  id: StepId;
  fields: ReadonlyArray<keyof ClientFormData>;
};

export const steps = [
  { id: "personal", fields: ["name", "email", "profilePictureFile"] },
  {
    id: "social",
    fields: ["locationYesNo", "instagram", "tiktok", "instagramPost"],
  },
  { id: "details", fields: ["bio", "additionalInfo"] },
  { id: "legal", fields: ["termsAccepted"] },
] as const satisfies ReadonlyArray<Step>;

export const stepKeysMap: Record<number, readonly (keyof ClientFormData)[]> =
  Object.fromEntries(steps.map((s, i) => [i, s.fields]));
