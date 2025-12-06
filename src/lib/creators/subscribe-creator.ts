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
import {
  creatorApplicationPayloadsObject,
   creatorApplicationSchema,
   FirestoreCreatorRecord,
} from "./schemas/creator-apply-server";
import { normalizeIp } from "../ip";
import * as Sentry from "@sentry/tanstackstart-react";
import { formSteps } from "./schemas/creators-apply-shared";
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
  .inputValidator(creatorApplicationPayloadsObject)
  .handler(async ({ data }) => {
    const { db, admin } = await import("@/lib/firebase/admin");
    setCorsHeaders();
    const request = getRequest();

    const requestId = crypto.randomUUID();
    setResponseHeader("X-Request-ID", requestId);
    const started = Date.now();

    try {
      const ip = normalizeIp(getRequestHeader("host"));
      const ipHash = hashIP(ip as string);

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

        // ---- Persist
        const now = admin.firestore.FieldValue.serverTimestamp();
        const ua = (request.headers.get("user-agent") || "").slice(0, 300);
        const country = request.headers.get("x-vercel-ip-country") || "unknown";
        const profilePictureUrl = data.profilePictureUrl;
        const application = {
          ...data,

          email: emailLower,

          profilePictureUrl: asUrl(profilePictureUrl),
          instagram: ig,
          tiktok: tt,
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
        } satisfies FirestoreCreatorRecord;
        const parsedApplication = await creatorApplicationSchema.parseAsync(application)
        const docRef = await db
          .collection("applications")
          .add(parsedApplication );

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
            Sentry.logger.error(`[${requestId}] Slack webhook failed`, err);
            Sentry.captureException(err);
          }
        }

        setResponseStatus(201);
        Sentry.logger.debug(
          `✅ [${requestId}] Completed in ${Date.now() - started}ms (id=${docRef.id})`
        );
        return { success: true, id: docRef.id } satisfies ApiOk;
      } catch (err) {
        Sentry.captureException(err);
        Sentry.logger.error(Sentry.logger.fmt`[${requestId}] DB error`);
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
export type SubmitCreatorApplicationInput = z.infer<typeof formSteps>;
export type SubmitCreatorApplicationResult = ApiOk | ApiError;
