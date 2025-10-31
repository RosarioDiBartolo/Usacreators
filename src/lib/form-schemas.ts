// ============================================================================
// FILE: lib/form-schemas.ts
// Purpose: Central Zod schemas, types, and per-step key maps used by RHF.
// ============================================================================
import * as z from "zod";


// Shared helpers
const urlOrHandle = z
.string()
.trim()
.optional()
.transform((v) => (v === "" ? undefined : v))
.refine(
(v) =>
v === undefined ||
/^@[a-zA-Z0-9_.]{2,30}$/.test(v) ||
/^https?:\/\//.test(v),
{
message: "Enter @handle or a full URL.",
}
);


export const yesNoEnum = z.enum(["yes", "no"], {
required_error: "Please select an option.",
});
export type YesNo = z.infer<typeof yesNoEnum>;


const MAX_BIO = 1000;
const MAX_ADDITIONAL = 2000;


export const personalInfoSchema = z.object({
name: z.string().min(2, "Name must be at least 2 characters."),
email: z.string().email("Enter a valid email address."),
});


export const socialSchema = z.object({
locationYesNo: yesNoEnum,
instagram: urlOrHandle,
tiktok: urlOrHandle,
instagramPost: z
.string()
.trim()
.optional()
.transform((v) => (v === "" ? undefined : v))
.refine((v) => v === undefined || /^https?:\/\//.test(v), {
message: "Enter a valid URL.",
}),
});


export const additionalSchema = z.object({
bio: z
.string()
.max(MAX_BIO, `Max ${MAX_BIO} characters`)
.optional()
.transform((v) => (v === "" ? undefined : v)),
additionalInfo: z
.string()
.max(MAX_ADDITIONAL, `Max ${MAX_ADDITIONAL} characters`)
.optional()
.transform((v) => (v === "" ? undefined : v)),
profilePictureFile: z
.instanceof(File)
.optional()
.or(z.null())
.refine((f) => !f || (f && f.size <= 3 * 1024 * 1024), {
message: "Image must be under 3MB.",
}),
});


export const consentSchema = z.object({
termsAccepted: z
  .boolean()
  .refine((v) => v === true, { message: "You must accept terms to continue." })
});


export const fullSchema = personalInfoSchema
.merge(socialSchema)
.merge(additionalSchema)
.merge(consentSchema);


export type FormDataType = z.infer<typeof fullSchema>;


export type Step = { id: string; title: string; fields: (keyof FormDataType)[] };


export const steps: Step[] = [
{ id: "personal", title: "Personal", fields: ["name", "email"] },
{
id: "social",
title: "Social",
fields: ["locationYesNo", "instagram", "tiktok", "instagramPost"],
},
{
id: "details",
title: "Details",
fields: ["bio", "additionalInfo", "profilePictureFile"],
},
{ id: "consent", title: "Consent", fields: ["termsAccepted"] },
{ id: "done", title: "Done", fields: [] },
];


export const stepKeysMap: Record<number, (keyof FormDataType)[]> = {
0: steps[0].fields,
1: steps[1].fields,
2: steps[2].fields,
3: steps[3].fields,
};