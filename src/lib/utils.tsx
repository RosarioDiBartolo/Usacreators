 
import crypto from "crypto";

export function opt<T extends string | undefined>(v: T) {
return v && v.trim() !== "" ? v : undefined;
}

// ---------- Helpers ----------
export const asUrl = (v?: string | null) => {
  if (!v) return undefined;
  const s = v.trim();
  return s && /^https?:\/\//i.test(s) ? s : s ? `https://${s}` : undefined;
};

export const normalizeIG = (v?: string | null) => {
  if (!v) return undefined;
  const s = v.trim().replace(/^@/, "");
  return s ? (/^https?:\/\//i.test(s) ? s : `https://instagram.com/${s}`) : undefined;
};

export const normalizeTT = (v?: string | null) => {
  if (!v) return undefined;
    const s = v.trim().replace(/^@/, "");
  return s ? (/^https?:\/\//i.test(s) ? s : `https://tiktok.com/@${s}`) : undefined;
};

export const normalizeIGPost = (v?: string | null) => {
  if (!v) return undefined;
    const s = v.trim();
  return /^https?:\/\//i.test(s) ? s : undefined;
};


export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function hashEmail(email: string) {
  const salt = process.env.EMAIL_HASH_SALT ?? "";
  // SHA-256(salt + email)
  return crypto.createHash("sha256").update(salt + email).digest("hex");
}

export const hashIP = (ip: string) => crypto.createHash("sha256").update(ip).digest("hex");

export const RATE_WINDOW_MINUTES = Number(process.env.RATE_WINDOW_MINUTES || "5");

 


 