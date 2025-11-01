import type { VercelResponse } from "@vercel/node";
import crypto from "crypto";

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

export const hashIP = (ip: string) => crypto.createHash("sha256").update(ip).digest("hex");

export const RATE_WINDOW_MINUTES = Number(process.env.RATE_WINDOW_MINUTES || "5");

// small helper to include requestId in every response
export function withId(res: VercelResponse, status: number, body: object, requestId: string) {
  return res.status(status).json({ requestId, ...body });
}


 