import { getRequestHeader } from "@tanstack/react-start/server";
// src/server/apply.ts
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import crypto from "crypto";
import { hashIP, normalizeIG, normalizeTT, asUrl } from "@/lib/utils";
import { getLegalVersions } from "@/lib/legal/utils";
import {
  setResponseStatus,
  setResponseHeader,
  getRequest,
} from "@tanstack/react-start/server";
import { PersistRecord, persistSchema } from "./schemas/creator-apply-server";
import { Payload, payloadSchema } from "./schemas/creators-apply-shared";
import { normalizeIp } from "../ip";

// ---------- Types ----------
type ApiOk = { success: true; id: string };

// ---- Types ----
export type ApiError = {
  success?: boolean;
  code?: string;
  message?: string;
  details?: { fieldErrors?: Record<string, string[]>; formErrors?: string[] };
  requestId?: string;
  reason?: string; // e.g., "version_mismatch"
  termsVersion?: string;
  privacyVersion?: string;
};
// Utility to emit JSON errors with a status
const jsonErr = (
  status: number,
  body: Omit<ApiError, "success"> & { success?: false }
): ApiError => {
  setResponseStatus(status);
  return { success: false, ...body };
};

// ---------- CORS helpers ----------
function setCorsHeaders() {
  setResponseHeader(
    "Access-Control-Allow-Origin",
    process.env.ALLOW_ORIGIN || "*"
  );
  setResponseHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  setResponseHeader("Access-Control-Allow-Headers", "Content-Type");
  setResponseHeader("Vary", "Origin");
}
// ---------- Main submit function ----------
export const submitCreatorApplication = createServerFn({ method: "POST" })
  // Accept a single `data` object, validated here per docs
  .inputValidator(payloadSchema)
  .handler(async ({ data }: { data: Payload }) => {
    const { db, admin } = await import("@/lib/firebase/admin");
    setCorsHeaders();
    const request = getRequest();

    const requestId = crypto.randomUUID();
    setResponseHeader("X-Request-ID", requestId);
    const started = Date.now();

    try {
      const ip = normalizeIp(getRequestHeader("host"));
      const ipHash = hashIP(ip as string);

      // ---- Turnstile (optional)
      if (data.turnstileToken) {
        try {
          const resp = await fetch(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                secret: process.env.TURNSTILE_SECRET_KEY || "",
                response: data.turnstileToken,
              }),
            }
          );
          const out = (await resp.json()) as { success: boolean };
          if (!out.success) {
            return jsonErr(403, {
              code: "CAPTCHA_FAILED",
              message: "Captcha verification failed",
              requestId,
            });
          }
        } catch (err) {
          console.error(`[${requestId}] Turnstile error`, err);
          return jsonErr(503, {
            code: "CAPTCHA_ERROR",
            message: "Captcha verification unavailable",
            requestId,
          });
        }
      }

      // // ---- Rate limiting window
      // try {
      //   if (RATE_WINDOW_MINUTES > 0) {
      //     const windowStart = admin.firestore.Timestamp.fromMillis(
      //       Date.now() - RATE_WINDOW_MINUTES * 60 * 1000,
      //     )

      //     const ipQ = await db
      //       .collection('applications')
      //       .where('ipHash', '==', ipHash)
      //       .where('createdAt', '>=', windowStart)
      //       .limit(1)
      //       .get()
      //     if (!ipQ.empty) {
      //       setResponseHeader('Retry-After', String(RATE_WINDOW_MINUTES * 60))
      //       return jsonErr(429, {
      //         code: 'RATE_LIMIT_IP',
      //         message: 'Too many requests from this IP. Try again later.',
      //         requestId,
      //       })
      //     }

      //     const emailQ = await db
      //       .collection('applications')
      //       .where('email', '==', data.email.toLowerCase())
      //       .where('createdAt', '>=', windowStart)
      //       .limit(1)
      //       .get()
      //     if (!emailQ.empty) {
      //       setResponseHeader('Retry-After', String(RATE_WINDOW_MINUTES * 60))
      //       return jsonErr(429, {
      //         code: 'RATE_LIMIT_EMAIL',
      //         message: 'This email was used recently. Try again later.',
      //         requestId,
      //       })
      //     }
      //   }
      // } catch (err) {
      //   console.error(`[${requestId}] Rate-limit check failed`, err)
      //   // continue
      // }

      // ---- Duplicate checks
      try {
        const emailLower = data.email.toLowerCase();

        const existingEmailQ = await db
          .collection("applications")
          .where("email", "==", emailLower)
          .limit(1)
          .get();
        if (!existingEmailQ.empty) {
          return jsonErr(409, {
            code: "DUPLICATE_EMAIL",
            message: "This email already applied.",
            requestId,
          });
        }

        const ig = normalizeIG(data.instagram);
        if (ig) {
          const igQ = await db
            .collection("applications")
            .where("instagram", "==", ig)
            .limit(1)
            .get();
          if (!igQ.empty) {
            return jsonErr(409, {
              code: "DUPLICATE_INSTAGRAM",
              message: "This Instagram already applied.",
              requestId,
            });
          }
        }

        const tt = normalizeTT(data.tiktok);
        if (tt) {
          const ttQ = await db
            .collection("applications")
            .where("tiktok", "==", tt)
            .limit(1)
            .get();
          if (!ttQ.empty) {
            return jsonErr(409, {
              code: "DUPLICATE_TIKTOK",
              message: "This TikTok already applied.",
              requestId,
            });
          }
        }

        // ---- Legal version check
        const { terms: currentTerms, privacy: currentPrivacy } =
          await getLegalVersions();

        if (
          data.termsVersion !== currentTerms ||
          data.privacyVersion !== currentPrivacy
        ) {
          setResponseStatus(409);
          return {
            success: false,
            reason: "version_mismatch",
            termsVersion: currentTerms,
            privacyVersion: currentPrivacy,
            code: "LEGAL_VERSION_MISMATCH",
            message: "Submitted legal versions are outdated.",
            requestId,
          } satisfies ApiError;
        }

        // ---- Persist
        const now = admin.firestore.FieldValue.serverTimestamp();
        const ua = (request.headers.get("user-agent") || "").slice(0, 300);
        const country = request.headers.get("x-vercel-ip-country") || "unknown";

        const application = {
          name: data.name,
          locationYesNo: data.locationYesNo,
          portfolio: data.portfolio,
          niches: data.niches,
          email: emailLower,
          profilePictureUrl: asUrl(data.profilePictureUrl) ?? null,

          instagram: ig ?? null,
          tiktok: tt ?? null,
          ua,
          country,
          createdAt: now,
          source: "server-fn",
          ipHash,
          legal: {
            termsVersion: currentTerms,
            privacyVersion: currentPrivacy,
            acceptedAt: now,
          },
        } satisfies PersistRecord;

        const docRef = await db
          .collection("applications")
          .add(await persistSchema.parseAsync(application));

        // ---- Legal acceptance log (hashed email)
        const emailHash = crypto
          .createHash("sha256")
          .update((process.env.EMAIL_HASH_SALT || "") + emailLower)
          .digest("hex");

        await db.collection("legal_acceptances").add({
          subjectType: "application",
          subjectId: docRef.id,
          context: "application_submit",
          emailHash,
          ipHash,
          userAgent: ua,
          country,
          termsVersion: currentTerms,
          privacyVersion: currentPrivacy,
          acceptedAt: now,
        });

        // ---- Slack webhook (optional)
        if (process.env.SLACK_WEBHOOK_URL) {
          try {
            await fetch(process.env.SLACK_WEBHOOK_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                text: `📨 New application: ${data.name} (${emailLower})`,
              }),
              signal: AbortSignal.timeout(3000),
            });
          } catch (err) {
            console.error(`[${requestId}] Slack webhook failed`, err);
          }
        }

        setResponseStatus(201);
        console.log(
          `✅ [${requestId}] Completed in ${Date.now() - started}ms (id=${docRef.id})`
        );
        return { success: true, id: docRef.id } satisfies ApiOk;
      } catch (err) {
        console.error(`[${requestId}] DB error`, err);
        return jsonErr(500, {
          code: "DB_ERROR",
          message: "Database operation failed",
          requestId,
        });
      }
    } catch (err) {
      console.error(`[${requestId}] Internal error`, err);
      return jsonErr(500, {
        code: "INTERNAL_ERROR",
        message: "Internal server error",
        requestId,
      });
    }
  });

// ---------- Convenient TS exports ----------
export type SubmitCreatorApplicationInput = z.infer<typeof payloadSchema>;
export type SubmitCreatorApplicationResult = ApiOk | ApiError;
