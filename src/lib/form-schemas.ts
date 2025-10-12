import z from "zod";

 
export type Step = {
  id: string;
  title: string;
}

export type YesNo = "yes" | "no";
 export type FormDataType = z.infer<typeof fullSchema> & {
  profilePictureFile: File | null;
};

/* ── Validation (trim, better phone, clean optional URL, handle/URL transforms) ── */
// const phoneSchema = z
//   .string()
//   .trim()
//   .regex(/^\+?[0-9\s().-]{7,20}$/, "Enter a valid phone.")
//   .refine((v) => (v.match(/\d/g)?.length ?? 0) >= 7, "Enter a valid phone.");

export const step0Schema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid email."),
  bio: z.string().max(1000, "Max 1000 chars.").optional(),
});

export const urlOptional = z.preprocess(
  (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
  z.string().url("Enter a valid URL.").optional()
);



export function normalizeHandle(v: string, platform: "ig" | "tt") {
  const s = v.trim();
  if (!s) return "";
  try {
    const u = new URL(s);
    const ok =
      platform === "ig"
        ? /(^|\.)instagram\.com$/i.test(u.hostname)
        : /(^|\.)tiktok\.com$/i.test(u.hostname);
    if (ok) return u.toString().replace(/\/$/, ""); // remove trailing slash
  } catch {
    /* empty */
  }
  const clean = s.replace(/^@/, "");
  return platform === "ig"
    ? `https://instagram.com/${clean}`
    : `https://tiktok.com/@${clean}`;
}
export const instagramField = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? normalizeHandle(v, "ig") : v))
  .refine(
    (v) => !v || /^https?:\/\/(www\.)?instagram\.com\/[^/]+\/?$/.test(v),
    "Enter a valid IG handle/URL"
  );

export const tiktokField = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? normalizeHandle(v, "tt") : v))
  .refine(
    (v) => !v || /^https?:\/\/(www\.)?tiktok\.com\/@[^/]+\/?$/.test(v),
    "Enter a valid TikTok handle/URL"
  );

export const step1Schema = z.object({
  locationYesNo: z.enum(["yes", "no"], { message: "Select one option." }),
  instagram: instagramField,
  tiktok: tiktokField,
  instagramPost: urlOptional,
});

export const fullSchema = step0Schema.and(step1Schema).and(
  z.object({
    additionalInfo: z.string().max(2000, "Max 2000 chars.").optional(),
  })
);

/* ── Keys per step (remove ghost 'profilePictureUrl') ── */
export const stepKeysMap = [
  ["name", "email", "bio"],
  ["locationYesNo", "instagram", "tiktok", "instagramPost"],
  ["additionalInfo"],
] as const;