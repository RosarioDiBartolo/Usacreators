import type { VercelRequest, VercelResponse } from "@vercel/node";
import admin from "firebase-admin";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { z } from "zod";
import { db } from "../firebase-admin.js";

 const now = () => admin.firestore.FieldValue.serverTimestamp();

const Body = z.object({
  termsVersion: z.string(),
  privacyVersion: z.string().optional(),
  context: z.string().default("site_banner"),
});

function readCurrent() {
  const p = path.join(process.cwd(), "public", "legal", "registry.json");
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function getOrCreateAnonId(req: VercelRequest) {
  const cookie = String(req.headers.cookie || "");
  const m = cookie.match(/(?:^|;\s*)anonId=([^;]+)/);
  if (m?.[1]) return m[1];
  // 16 bytes random, hex
  return crypto.randomBytes(16).toString("hex");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const parsed = Body.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { termsVersion , context } = parsed.data;

  // Server-side verify against current (prevents stale banner accepts)
  const reg = readCurrent();
  const currentTerms = String(reg?.terms?.current ?? "");
  const currentPrivacy = String(reg?.privacy?.current ?? "");
  if (termsVersion !== currentTerms) {
    return res.status(409).json({
      reason: "version_mismatch",
      termsVersion: currentTerms,
      privacyVersion: currentPrivacy,
    });
  }

  const anonId = getOrCreateAnonId(req);
  const ua = String(req.headers["user-agent"] || "").slice(0, 300);
  const country = String(req.headers["x-vercel-ip-country"] || "unknown");

  await db.collection("legal_acceptances").add({
    anonId,
    context,
    termsVersion: currentTerms,
    privacyVersion: currentPrivacy,
    acceptedAt: now(),
    userAgent: ua,
    country,
  });

  // Set anonId cookie if we just created it (HttpOnly, 180 days)
  const cookieHeader = `anonId=${anonId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 180}`;
  res.setHeader("Set-Cookie", cookieHeader);
  return res.status(200).json({ ok: true });
}
