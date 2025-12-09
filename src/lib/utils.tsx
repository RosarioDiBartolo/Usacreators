 
import env from "@/enviroment/server";
import crypto from "crypto";

 

// ---------- Helpers ----------
export const asUrl = (v : string ) => {
 
   const s = v.trim();
  return /^https?:\/\//i.test(s) ? s : `https://${s}` ;
};

export const normalizeIG = (v : string | null ) => {
  if (!v) return null;
  const s = v.trim().replace(/^@/, "");
  return s ? (/^https?:\/\//i.test(s) ? s : `https://instagram.com/${s}`) : null;
};

export const normalizeTT = (v : string | null ) => {
  if (!v) return null;
    const s = v.trim().replace(/^@/, "");
  return s ? (/^https?:\/\//i.test(s) ? s : `https://tiktok.com/@${s}`) : null;
};

 

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function hashEmail(email: string) {
  const salt = env.EMAIL_HASH_SALT ?? "";
  // SHA-256(salt + email)
  return crypto.createHash("sha256").update(salt + email).digest("hex");
}

export const hashIP = (ip: string) => crypto.createHash("sha256").update(ip).digest("hex");
 


 