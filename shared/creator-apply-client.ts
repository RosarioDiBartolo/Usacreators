import { z } from "zod";
import {
  sharedBaseFormSchema,
  requireAtLeastOneSocial,
  emptyToUndef,
  type StepId,
} from "./shared-creators-apply";

// Client-only file field
const profilePictureClient = z
  .instanceof(File)
  .optional()
  .refine((f) => !f || f.size <= 3 * 1024 * 1024, { message: "Image must be under 3MB." });

 

 
// Apply cross-field rule once, at the top level
 // 1) NON unire più consentClientSchema nel clientFormSchema
const baseClientObj =  sharedBaseFormSchema
  .merge(z.object({ profilePictureFile: profilePictureClient }));
export const clientFormSchema =  baseClientObj ;

// 2) Mantieni i valori nel payload, ma fuori dalla validazione client
export const clientUiOnlySchema = z.object({
  turnstileToken: emptyToUndef(z.string().optional()),
  // (se vuoi, potresti tenerli qui come opzionali, ma NON obbligatori)
});
export const clientSubmitSchema = baseClientObj
  .omit({ profilePictureFile: true })
  .merge(clientUiOnlySchema);



export const fullSchema = requireAtLeastOneSocial(clientFormSchema); // <-- ora non richiede le versioni

// RHF types
export type ClientFormData = z.infer<typeof clientFormSchema>;

// Steps: ids are UI-level; fields are actual form keys
export type Step = {
  id: StepId;
  fields: ReadonlyArray<keyof ClientFormData>;
};

export const steps = [
  { id: "personal", fields: ["name", "email", "profilePictureFile"] },
  { id: "social",   fields: ["locationYesNo", "instagram", "tiktok", "instagramPost"] },
  { id: "details",  fields: ["bio", "additionalInfo"] },
   { id: "legal",    fields: ["termsAccepted"] },
] as const satisfies ReadonlyArray<Step>;

export const stepKeysMap: Record<number, readonly (keyof ClientFormData)[]> =
  Object.fromEntries(steps.map((s, i) => [i, s.fields])) ;

 