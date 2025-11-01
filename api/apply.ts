import { serverSchema } from  "../src/lib/schemas/creator-form/server-schema.ts"
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import crypto from "crypto";
 import admin from "firebase-admin";
import { db } from "./firebase-admin.ts";
import {
  withId,
  hashIP,
  RATE_WINDOW_MINUTES,
  normalizeIG,
  normalizeTT,
  normalizeIGPost,
  asUrl,
} from "./utils.ts";
import { readCurrentLegal } from "./legal.ts";

// Derive server input schema from the app form schema
const ServerSchema = serverSchema.omit({ profilePictureFile: true }).extend({
  profilePictureUrl: z.string().trim().url().optional().nullable(),
  turnstileToken: z.string().optional(),
  termsVersion: z.string().optional(),
  privacyVersion: z.string().optional(),
  acceptedAt: z.string().datetime().optional(),
});

// ---------- Handler ----------
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();

  console.log(`🚀 [${requestId}] Incoming ${req.method} request to /api/apply`);

  // Defensive header fix for PowerShell "Expect: 100-continue"
  if (req.headers.expect === "100-continue") delete req.headers.expect;

  // CORS
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOW_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  // Optional hardening
  res.setHeader("Vary", "Origin");

  if (req.method === "OPTIONS") {
    console.log(`[${requestId}] 🧭 OPTIONS preflight`);
    return res.status(204).end();
  }
  if (req.method !== "POST") {
    console.warn(`[${requestId}] ⚠️ Invalid method: ${req.method}`);
    return withId(
      res,
      405,
      { success: false, message: "Method not allowed" },
      requestId
    );
  }

  try {
    // 🧩 Step 1: Parse & validate payload (USE ServerSchema)
    const parsed = ServerSchema.safeParse(req.body);
    if (!parsed.success) {
      const flat = parsed.error.flatten();
      console.warn(`[${requestId}] ⚠️ Invalid payload:`, flat);
      return withId(
        res,
        400,
        {
          success: false,
          code: "INVALID_PAYLOAD",
          message: "Invalid payload",
          details: flat, // { fieldErrors, formErrors }
        },
        requestId
      );
    }
    const d = parsed.data;
    console.log(`[${requestId}] ✅ Payload validated for ${d.email}`);

    // 🧩 Step 2: Identify IP
    const ip =
      ((req.headers["x-forwarded-for"] as string) || "")
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean)[0] ||
      (req.socket && (req.socket.remoteAddress || "")) ||
      "unknown";
    const ipHash = hashIP(ip);
    console.log(`[${requestId}] 🌐 IP hashed: ${ipHash.slice(0, 8)}…`);

    // 🧩 Step 3: Turnstile captcha (optional)
    if (d.turnstileToken) {
      console.log(`[${requestId}] 🧩 Verifying Turnstile token`);
      try {
        const verifyResp = await fetch(
          "https://challenges.cloudflare.com/turnstile/v0/siteverify",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              secret: process.env.TURNSTILE_SECRET_KEY || "",
              response: d.turnstileToken,
            }),
          }
        );

        const verifyData = (await verifyResp.json()) as { success: boolean };
        if (!verifyData.success) {
          console.warn(`[${requestId}] ❌ Turnstile verification failed`);
          return withId(
            res,
            403,
            {
              success: false,
              code: "CAPTCHA_FAILED",
              message: "Captcha verification failed",
            },
            requestId
          );
        }
        console.log(`[${requestId}] ✅ Turnstile verification passed`);
      } catch (err) {
        console.error(`[${requestId}] ⚠️ Captcha verification error:`, err);
        return withId(
          res,
          503,
          {
            success: false,
            code: "CAPTCHA_ERROR",
            message: "Captcha verification unavailable",
          },
          requestId
        );
      }
    }

    // 🧩 Step 4: Rate limiting
    try {
      if (RATE_WINDOW_MINUTES > 0) {
        const windowStart = admin.firestore.Timestamp.fromMillis(
          Date.now() - RATE_WINDOW_MINUTES * 60 * 1000
        );
        console.log(
          `[${requestId}] ⏱ Checking rate limit window (${RATE_WINDOW_MINUTES} min)`
        );

        const ipQ = await db
          .collection("applications")
          .where("ipHash", "==", ipHash)
          .where("createdAt", ">=", windowStart)
          .limit(1)
          .get();
        if (!ipQ.empty) {
          console.warn(`[${requestId}] 🚫 Rate limit: IP reuse`);
          res.setHeader("Retry-After", String(RATE_WINDOW_MINUTES * 60)); // seconds
          return withId(
            res,
            429,
            {
              success: false,
              code: "RATE_LIMIT_IP",
              message: "Too many requests from this IP. Try again later.",
            },
            requestId
          );
        }

        const emailQ = await db
          .collection("applications")
          .where("email", "==", d.email.toLowerCase())
          .where("createdAt", ">=", windowStart)
          .limit(1)
          .get();
        if (!emailQ.empty) {
          console.warn(`[${requestId}] 🚫 Rate limit: Email reuse`);
          res.setHeader("Retry-After", String(RATE_WINDOW_MINUTES * 60));
          return withId(
            res,
            429,
            {
              success: false,
              code: "RATE_LIMIT_EMAIL",
              message: "This email was used recently. Try again later.",
            },
            requestId
          );
        }
      }
    } catch (err) {
      console.error(`[${requestId}] ⚠️ Rate-limit check failed:`, err);
      // continue, but don't block the request
    }

    // 🧩 Step 5: Duplicate prevention
    console.log(`[${requestId}] 🔍 Checking duplicates`);
    try {
      const existingEmailQ = await db
        .collection("applications")
        .where("email", "==", d.email.toLowerCase())
        .limit(1)
        .get();
      if (!existingEmailQ.empty) {
        console.warn(`[${requestId}] ⚠️ Duplicate email detected`);
        return withId(
          res,
          409,
          {
            success: false,
            code: "DUPLICATE_EMAIL",
            message: "This email already applied.",
          },
          requestId
        );
      }

      const ig = normalizeIG(d.instagram);
      if (ig) {
        const igQ = await db
          .collection("applications")
          .where("instagram", "==", ig)
          .limit(1)
          .get();
        if (!igQ.empty) {
          console.warn(`[${requestId}] ⚠️ Duplicate Instagram: ${ig}`);
          return withId(
            res,
            409,
            {
              success: false,
              code: "DUPLICATE_INSTAGRAM",
              message: "This Instagram already applied.",
            },
            requestId
          );
        }
      }

      const tt = normalizeTT(d.tiktok);
      if (tt) {
        const ttQ = await db
          .collection("applications")
          .where("tiktok", "==", tt)
          .limit(1)
          .get();
        if (!ttQ.empty) {
          console.warn(`[${requestId}] ⚠️ Duplicate TikTok: ${tt}`);
          return withId(
            res,
            409,
            {
              success: false,
              code: "DUPLICATE_TIKTOK",
              message: "This TikTok already applied.",
            },
            requestId
          );
        }
      }

      const igPost = normalizeIGPost(d.instagramPost);

      const { termsVersion: currentTerms, privacyVersion: currentPrivacy } =
        readCurrentLegal();

      if (
        d.termsVersion !== currentTerms ||
        d.privacyVersion !== currentPrivacy
      ) {
        return res.status(409).json({
          reason: "version_mismatch",
          termsVersion: currentTerms,
          privacyVersion: currentPrivacy,
        });
      }

      const now = admin.firestore.FieldValue.serverTimestamp();
      const ua = String(req.headers["user-agent"] || "").slice(0, 300);
      const country = String(req.headers["x-vercel-ip-country"] || "unknown");

      // 🧩 Step 6: Save to Firestore (also store termsVersion/acceptedAt if provided)
      const docRef = await db.collection("applications").add({
        name: d.name,
        email: d.email.toLowerCase(),
        profilePictureUrl: asUrl(d.profilePictureUrl) ?? null,
        bio: d.bio || "",
        locationYesNo: d.locationYesNo,
        instagram: ig ?? null,
        tiktok: tt ?? null,
        instagramPost: igPost ?? null,
        additionalInfo: d.additionalInfo || "",
        ua,
        country,
        createdAt: now,
        source: "vercel-api",
        ipHash, // hashed, not raw IP
        legal: {
          termsVersion: currentTerms,
          privacyPolicyVersion: currentPrivacy,
          acceptedAt: now,
        },
      });

      // 5) Write *append-only audit*
      await db.collection("legal_acceptances").add({
        applicationId: docRef.id,
        context: "application_submit",
        termsVersion: currentTerms,
        privacyVersion: currentPrivacy,
        acceptedAt: now,
        ua,
        country,
      });

      console.log(`[${requestId}] ✅ Firestore document created: ${docRef.id}`);

      // 🧩 Step 7: Optional Slack webhook
      if (process.env.SLACK_WEBHOOK_URL) {
        try {
          await fetch(process.env.SLACK_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              text: `📨 New application: ${d.name} (${d.email.toLowerCase()})`,
            }),
            signal: AbortSignal.timeout(3000),
          });
          console.log(`[${requestId}] 📨 Slack notification sent`);
        } catch (err) {
          console.error(`[${requestId}] ⚠️ Slack webhook failed:`, err);
        }
      }

      console.log(
        `✅ [${requestId}] Request completed in ${Date.now() - startTime}ms`
      );
      return withId(res, 201, { success: true, id: docRef.id }, requestId);
    } catch (err) {
      console.error(`[${requestId}] ❌ Database error:`, err);
      return withId(
        res,
        500,
        {
          success: false,
          code: "DB_ERROR",
          message: "Database operation failed",
        },
        requestId
      );
    }
  } catch (err) {
    console.error(`[${requestId}] ❌ Server error:`, err);
    return withId(
      res,
      500,
      {
        success: false,
        code: "INTERNAL_ERROR",
        message: "Internal server error",
      },
      requestId
    );
  }
}
