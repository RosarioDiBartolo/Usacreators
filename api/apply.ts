import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import crypto from "crypto";
import admin, { type ServiceAccount } from "firebase-admin";
import path from "path";
import { readFileSync } from "fs";

const jsonPath = path.join("./api", "service-account.json");
const rawData = readFileSync(jsonPath, "utf8");
const serviceAccount = JSON.parse(rawData);

// ---------- Environment Safety Check ----------
const requiredEnv = ["ALLOW_ORIGIN"];
for (const key of requiredEnv) {
  if (!process.env[key]) {
    console.error(`❌ Missing environment variable: ${key}`);
  }
}

// ---------- Firebase Initialization ----------
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
    });
    console.log("✅ Firebase Admin initialized successfully");
  } catch (err) {
    console.error("❌ Invalid FIREBASE_SERVICE_ACCOUNT JSON:", err);
    throw new Error("Failed to initialize Firebase Admin.");
  }
}
const db = admin.firestore();

// ---------- Schema ----------
const Schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  profilePictureUrl: z.string().trim().optional().nullable(),
  bio: z.string().trim().max(1000).optional().default(""),
  locationYesNo: z.enum(["yes", "no"]),
  instagram: z.string().trim().optional().default(""),
  tiktok: z.string().trim().optional().default(""),
  instagramPost: z.string().trim().optional().default(""),
  additionalInfo: z.string().trim().max(2000).optional().default(""),
  turnstileToken: z.string().optional(),
});

// ---------- Helpers ----------
const asUrl = (v?: string | null) => {
  if (!v) return undefined;
  const s = v.trim();
  return s && /^https?:\/\//i.test(s) ? s : s ? `https://${s}` : undefined;
};

const normalizeIG = (v?: string | null) => {
  if (!v) return undefined;
  const s = v.trim().replace(/^@/, "");
  return s ? (/^https?:\/\//i.test(s) ? s : `https://instagram.com/${s}`) : undefined;
};

const normalizeTT = (v?: string | null) => {
  if (!v) return undefined;
  const s = v.trim().replace(/^@/, "");
  return s ? (/^https?:\/\//i.test(s) ? s : `https://tiktok.com/@${s}`) : undefined;
};

const normalizeIGPost = (v?: string | null) => {
  if (!v) return undefined;
  const s = v.trim();
  return /^https?:\/\//i.test(s) ? s : undefined;
};

const hashIP = (ip: string) => crypto.createHash("sha256").update(ip).digest("hex");

const RATE_WINDOW_MINUTES = Number(process.env.RATE_WINDOW_MINUTES || "5");

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

  if (req.method === "OPTIONS") {
    console.log(`[${requestId}] 🧭 OPTIONS preflight`);
    return res.status(204).end();
  }
  if (req.method !== "POST") {
    console.warn(`[${requestId}] ⚠️ Invalid method: ${req.method}`);
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    // 🧩 Step 1: Parse & validate payload
    const parsed = Schema.safeParse(req.body);
    if (!parsed.success) {
      console.warn(`[${requestId}] ⚠️ Invalid payload:`, parsed.error.flatten());
      return res.status(400).json({
        success: false,
        code: "INVALID_PAYLOAD",
        message: "Invalid payload",
        details: parsed.error.flatten(),
      });
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

    // 🧩 Step 3: Turnstile captcha
    if (d.turnstileToken) {
      console.log(`[${requestId}] 🧩 Verifying Turnstile token`);
      try {
        const verifyResp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: process.env.TURNSTILE_SECRET_KEY || "",
            response: d.turnstileToken,
          }),
        });

        const verifyData = await verifyResp.json();
        if (!verifyData.success) {
          console.warn(`[${requestId}] ❌ Turnstile verification failed`);
          return res.status(403).json({
            success: false,
            code: "CAPTCHA_FAILED",
            message: "Captcha verification failed",
          });
        }
        console.log(`[${requestId}] ✅ Turnstile verification passed`);
      } catch (err) {
        console.error(`[${requestId}] ⚠️ Captcha verification error:`, err);
        return res.status(503).json({
          success: false,
          code: "CAPTCHA_ERROR",
          message: "Captcha verification unavailable",
        });
      }
    }

    // 🧩 Step 4: Rate limiting
    try {
      if (RATE_WINDOW_MINUTES > 0) {
        const windowStart = admin.firestore.Timestamp.fromMillis(
          Date.now() - RATE_WINDOW_MINUTES * 60 * 1000
        );
        console.log(`[${requestId}] ⏱ Checking rate limit window (${RATE_WINDOW_MINUTES} min)`);

        const ipQ = await db
          .collection("applications")
          .where("ipHash", "==", ipHash)
          .where("createdAt", ">=", windowStart)
          .limit(1)
          .get();
        if (!ipQ.empty) {
          console.warn(`[${requestId}] 🚫 Rate limit: IP reuse`);
          return res.status(429).json({
            success: false,
            code: "RATE_LIMIT_IP",
            message: "Too many requests from this IP. Try again later.",
          });
        }

        const emailQ = await db
          .collection("applications")
          .where("email", "==", d.email.toLowerCase())
          .where("createdAt", ">=", windowStart)
          .limit(1)
          .get();
        if (!emailQ.empty) {
          console.warn(`[${requestId}] 🚫 Rate limit: Email reuse`);
          return res.status(429).json({
            success: false,
            code: "RATE_LIMIT_EMAIL",
            message: "This email was used recently. Try again later.",
          });
        }
      }
    } catch (err) {
      console.error(`[${requestId}] ⚠️ Rate-limit check failed:`, err);
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
        return res.status(409).json({
          success: false,
          code: "DUPLICATE_EMAIL",
          message: "This email already applied.",
        });
      }

      const ig = normalizeIG(d.instagram);
      if (ig) {
        const igQ = await db.collection("applications").where("instagram", "==", ig).limit(1).get();
        if (!igQ.empty) {
          console.warn(`[${requestId}] ⚠️ Duplicate Instagram: ${ig}`);
          return res.status(409).json({
            success: false,
            code: "DUPLICATE_INSTAGRAM",
            message: "This Instagram already applied.",
          });
        }
      }

      const tt = normalizeTT(d.tiktok);
      if (tt) {
        const ttQ = await db.collection("applications").where("tiktok", "==", tt).limit(1).get();
        if (!ttQ.empty) {
          console.warn(`[${requestId}] ⚠️ Duplicate TikTok: ${tt}`);
          return res.status(409).json({
            success: false,
            code: "DUPLICATE_TIKTOK",
            message: "This TikTok already applied.",
          });
        }
      }

      const igPost = normalizeIGPost(d.instagramPost);

      // 🧩 Step 6: Save to Firestore
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
        ua: String(req.headers["user-agent"] || "").slice(0, 300),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        source: "vercel-api",
        ipHash,
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

      console.log(`✅ [${requestId}] Request completed in ${Date.now() - startTime}ms`);
      return res.status(201).json({ success: true, id: docRef.id });
    } catch (err) {
      console.error(`[${requestId}] ❌ Database error:`, err);
      return res.status(500).json({
        success: false,
        code: "DB_ERROR",
        message: "Database operation failed",
      });
    }
  } catch (err) {
    console.error(`[${requestId}] ❌ Server error:`, err);
    return res.status(500).json({
      success: false,
      code: "INTERNAL_ERROR",
      message: "Internal server error",
    });
  }
}
