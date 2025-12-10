import env from "@/enviroment/server";
import crypto from "crypto";

// utils/getClientIp.ts
export function normalizeIp(ip: string | null | undefined): string | null {
  if (!ip) return null;
  // If header contains comma-separated list, take first
  ip = ip.split(",")[0].trim();
  // Remove IPv6 prefix for IPv4-mapped addresses ::ffff:127.0.0.1
  if (ip.startsWith("::ffff:")) ip = ip.replace("::ffff:", "");
  // Remove port if present (e.g., 1.2.3.4:56789 or [::1]:56789)
  ip = ip.replace(/^\[?(.*?)]?:\d+$/, "$1");
  return ip || null;
}

export function extractClientIp(
  headers: Record<string, string | string[] | undefined>,
  remoteAddr?: string | null
): string | null {
  // normalize header lookup to lowercase keys
  const get = (k: string) => {
    const v = headers[k] ?? headers[k.toLowerCase()];
    return Array.isArray(v) ? v.join(",") : (v as string | undefined);
  };

  const candidates = [
    get("x-client-ip"),
    get("x-forwarded-for"),
    get("cf-connecting-ip"),
    get("true-client-ip"),
    get("fastly-client-ip"),
    get("x-real-ip"),
    get("forwarded"),
  ];

  // handle Forwarded: for=...
  const forwarded = get("forwarded");
  if (forwarded) {
    const m = forwarded.match(/for="?([^;," ]+)"?/i);
    if (m && m[1]) candidates.unshift(m[1]);
  }

  for (const c of candidates) {
    const ip = normalizeIp(c);
    if (ip) return ip;
  }

  // fallback to socket remote address
  return normalizeIp(remoteAddr ?? null);
}
export const hashIP = (ip: string) =>
  crypto.createHash("sha256").update(ip).digest("hex");

export function hashEmail(email: string) {
  const salt = env.EMAIL_HASH_SALT ?? "";
  // SHA-256(salt + email)
  return crypto.createHash("sha256").update(salt + email).digest("hex");
}