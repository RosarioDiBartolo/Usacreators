 // src/server/apply.ts
import { z } from "zod";
import crypto from "crypto";
import { normalizeIG, normalizeTT, asUrl } from "@/lib/utils";
import { setResponseHeader } from "@tanstack/react-start/server";

import * as Sentry from "@sentry/tanstackstart-react";
import env from "@/enviroment/server";
import { db } from "@/lib/firebase/admin";
import admin from "firebase-admin";
import { CreatorRecord, creatorsRepo } from "./creators-collection";
 import { ApiErrorException } from "../server-only/errors/api-error";
import { RequestContext } from "../server-only/request/request-context";
import {
  creatorApplicationPayloadsObject,
  FirestoreCreatorRecord,
 } from "./schemas/creators-apply-server";
import {
  isContactInList,
  subscribeToNewsletter,
  TemporaryListId,
} from "../brevo/utils";
import { generateSecureToken } from "../security";

// ---------- CORS helpers ----------
export function setCorsHeaders() {
  setResponseHeader("Access-Control-Allow-Origin", env.ALLOW_ORIGIN || "*");
  setResponseHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  setResponseHeader("Access-Control-Allow-Headers", "Content-Type");
  setResponseHeader("Vary", "Origin");
}

export const ensureNoDuplicatesOrThrow = async (
  data: z.infer<typeof creatorApplicationPayloadsObject>
) => {
  const emailLower = data.email.toLowerCase();

  // email
  const existingEmailQ = await db
    .collection("applications")
    .where("email", "==", emailLower)
    .limit(1)
    .get();

  if (!existingEmailQ.empty) {
    throw new ApiErrorException({
      status: 409,
      code: "DUPLICATE_EMAIL",
      message: "This email already applied.",
    });
  }
  const inTemporary = await isContactInList(emailLower, TemporaryListId);
  if (inTemporary) {
    throw new ApiErrorException({
      status: 409,
      code: "SUBSCRIPTION_REATTEMPT",
      message:
        "This email has alredy tried to subscribe to our service, and a confirmation email was sent alredy.",
    });
  }
  // instagram
  const ig = normalizeIG(data.instagram);
  if (ig) {
    const igQ = await db
      .collection("applications")
      .where("instagram", "==", ig)
      .limit(1)
      .get();
    if (!igQ.empty) {
      throw new ApiErrorException({
        status: 409,
        code: "DUPLICATE_INSTAGRAM",
        message: "This Instagram already applied.",
      });
    }
  }

  // tiktok
  const tt = normalizeTT(data.tiktok);
  if (tt) {
    const ttQ = await db
      .collection("applications")
      .where("tiktok", "==", tt)
      .limit(1)
      .get();
    if (!ttQ.empty) {
      throw new ApiErrorException({
        status: 409,
        code: "DUPLICATE_TIKTOK",
        message: "This TikTok already applied.",
      });
    }
  }

  return {
    emailLower,
    normalizedInstagram: ig,
    normalizedTiktok: tt,
  };
};

export const buildApplicationRecord = (params: {
  data: z.infer<typeof creatorApplicationPayloadsObject>;
  emailLower: string;
  normalizedInstagram: string | null;
  normalizedTiktok: string | null;
  ctx: RequestContext;
  currentTerms: string;
  currentPrivacy: string;
}): FirestoreCreatorRecord => {
  const {
    data,
    emailLower,
    normalizedInstagram,
    normalizedTiktok,
    ctx,
    currentTerms,
    currentPrivacy,
  } = params;

  const now = admin.firestore.FieldValue.serverTimestamp();
  const profilePictureUrl = data.profilePictureUrl;

  const application = {
    ...data,
    email: emailLower,
    profilePictureUrl: asUrl(profilePictureUrl),
    instagram: normalizedInstagram,
    tiktok: normalizedTiktok,
    ua: ctx.ua,
    country: ctx.country,
    createdAt: now,
    source: "server-fn",
    ipHash: ctx.ipHash,
    confirmToken: generateSecureToken(),
    status: "pending",
    legal: {
      termsVersion: currentTerms,
      privacyVersion: currentPrivacy,
      acceptedAt: now,
    },
  } satisfies FirestoreCreatorRecord;

  return application;
};

export const persistApplication = async (
  application: FirestoreCreatorRecord
): Promise<string> => {
  const docRef = await creatorsRepo.add(application);

  const { email, phone, name, niches, locationYesNo } = application;
  await subscribeToNewsletter({
    email,
    phone,
    name,
    niches,
    locationYesNo,
    docId: docRef.id,
  });
  return docRef.id;
};

export const logLegalAcceptance = async (params: {
  applicationId: string;
  emailLower: string;
  ctx: RequestContext;
  currentTerms: string;
  currentPrivacy: string;
}) => {
  const { applicationId, emailLower, ctx, currentTerms, currentPrivacy } =
    params;

  const now = admin.firestore.FieldValue.serverTimestamp();

  const emailHash = crypto
    .createHash("sha256")
    .update((env.EMAIL_HASH_SALT || "") + emailLower)
    .digest("hex");

  await db.collection("legal_acceptances").add({
    subjectType: "application",
    subjectId: applicationId,
    context: "application_submit",
    emailHash,
    ipHash: ctx.ipHash,
    userAgent: ctx.ua,
    country: ctx.country,
    termsVersion: currentTerms,
    privacyVersion: currentPrivacy,
    acceptedAt: now,
  });
};

export const notifySlackSafely = async (params: {
  name: string;
  emailLower: string;
  requestId: string;
}) => {
  if (!env.SLACK_WEBHOOK_URL) return;

  const { name, emailLower, requestId } = params;

  try {
    await fetch(env.SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `📨 New application: ${name} (${emailLower})`,
      }),
      signal: AbortSignal.timeout(3000),
    });
  } catch (err) {
    Sentry.logger.error(`[${requestId}] Slack webhook failed`, err);
    Sentry.captureException(err);
  }
};

export const confirmSubscriptionStep = async(id: string)=>{
  
    await creatorsRepo.updateById( id, {
    status: "confirmed"
  }) 
}
export { ApiErrorException };
