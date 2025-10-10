// api/apply.ts
import    { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import admin from "firebase-admin";

// ---------- Firebase Admin (lazy init) ----------
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}
const db = admin.firestore();


// ---------- Schema (aligns with your form) ----------
const Schema = z.object({
  name: z.string().min(2).max(120),
  email: z.email(),
  phone: z.string().trim().min(5).max(40),
  profilePictureUrl: z.string().url().optional(), // see note above
  bio: z.string().trim().max(1000).optional().default(""),
  locationYesNo: z.enum(["yes", "no"]),
  instagram: z.string().trim().optional().default(""),
  tiktok: z.string().trim().optional().default(""),
  instagramPost: z.string().trim().optional().default(""),
  additionalInfo: z.string().trim().max(2000).optional().default(""),
  
});

// ---------- Helpers ----------
const asUrl = (v) => (v && v.startsWith("http") ? v : undefined);

function normalizeIG(v) {
  if (!v) return undefined;
  const s = v.trim();
  if (!s) return undefined;
  if (s.startsWith("http")) return s;
  return `https://instagram.com/${s.replace(/^@/, "")}`;
}
function normalizeTT(v) {
  if (!v) return undefined;
  const s = v.trim();
  if (!s) return undefined;
  if (s.startsWith("http")) return s;
  return `https://tiktok.com/@${s.replace(/^@/, "")}`;
}
function normalizeIGPost(v) {
  if (!v) return undefined;
  const s = v.trim();
  if (!s) return undefined;
  return s.startsWith("http") ? s : undefined;
}
 
// ---------- Handler ----------
export default async function handler(req, res ) {
  try {
    // Basic CORS (tune ALLOW_ORIGIN for prod)
    res.setHeader("Access-Control-Allow-Origin", process.env.ALLOW_ORIGIN || "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") return res.status(204).end();
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    // If body might be stringified already by some clients:
    const raw = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const parsed = Schema.safeParse(raw);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
    }
    const d = parsed.data;

    // Rate limit by IP + email
    const ip = (req.headers["x-forwarded-for"] )?.split(",")[0].trim() || "unknown";
    

    // (Recommended) Verify Turnstile/Recaptcha token here, server-side

    // De-dupe by email and socials
    const emailQ = await db
      .collection("applications")
      .where("email", "==", d.email.toLowerCase())
      .limit(1)
      .get();
    if (!emailQ.empty) {
      return res.status(409).json({ error: "This email already applied." });
    }

    const ig = normalizeIG(d.instagram);
    if (ig) {
      const igQ = await db.collection("applications").where("instagram", "==", ig).limit(1).get();
      if (!igQ.empty) {
        return res.status(409).json({ error: "This Instagram already applied." });
      }
    }

    const tt = normalizeTT(d.tiktok);
    if (tt) {
      const ttQ = await db.collection("applications").where("tiktok", "==", tt).limit(1).get();
      if (!ttQ.empty) {
        return res.status(409).json({ error: "This TikTok already applied." });
      }
    }

    // Normalize IG post link
    const igPost = normalizeIGPost(d.instagramPost);

    // Persist
    const doc = await db.collection("applications").add({
      name: d.name,
      email: d.email.toLowerCase(),
      phone: d.phone,
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
      ipHash: ip, // consider hashing/anonymizing
    });

    // Optional: Slack/email/Airtable webhook here
    // await fetch(process.env.SLACK_WEBHOOK_URL!, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: `New application: ${d.name} (${d.email})` }) });

    return res.status(201).json({ id: doc.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
