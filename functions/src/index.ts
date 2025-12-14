import {
  onDocumentCreated,
  onDocumentDeleted,
  onDocumentUpdated,
} from "firebase-functions/v2/firestore";
import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { ContactsApi, ContactsApiApiKeys, CreateContact } from "@getbrevo/brevo";

// -------------------- Config --------------------
const COLLECTION_PATH = "applications/{applicationId}";

// -------------------- Types --------------------
type CreatorDoc = {
  email?: string | null;
  name?: string | null;
  phone?: string | null;
  niches?: unknown;
  locationYesNo?: string | null;
};

type BrevoPayload = {
  email: string;
  attributes: {
    SMS?: string;
    FIRSTNAME?: string;
    NICHES?: string;
    FIRESTORE_ID: string;
    IN_MIAMI: boolean;
  };
  listIds: number[];
  updateEnabled: true;
};

// -------------------- Env / Config (Spark-compatible) --------------------
function readFunctionsConfig(): any {
  // In Functions v2, `firebase functions:config:set` ends up in FUNCTIONS_CONFIG (JSON string)
  const raw = process.env.FUNCTIONS_CONFIG;
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    logger.warn("Failed to parse process.env.FUNCTIONS_CONFIG (expected JSON)");
    return {};
  }
}

/**
 * Priority:
 * 1) process.env.BREVO_API_KEY / BREVO_NEWSLETTER_LIST_ID (great for local dev)
 * 2) firebase functions:config:set brevo.api_key / brevo.list_id (Spark-friendly)
 */
function getBrevoConfigFromEnv() {
  const cfg = readFunctionsConfig();

  const apiKey =
    process.env.BREVO_API_KEY ||
    cfg?.brevo?.api_key ||
    cfg?.brevo?.apikey; // tiny extra tolerance

  const listId = Number(
    process.env.BREVO_NEWSLETTER_LIST_ID ?? cfg?.brevo?.list_id
  );

  if (!apiKey) {
    throw new Error("Missing Brevo API key (set env BREVO_API_KEY or functions:config brevo.api_key)");
  }
  if (!Number.isFinite(listId)) {
    throw new Error("Missing/invalid Brevo list ID (set env BREVO_NEWSLETTER_LIST_ID or functions:config brevo.list_id)");
  }

  return { apiKey, listId };
}

// -------------------- Brevo Client (lazy) --------------------
function makeBrevoClient(apiKey: string) {
  const client = new ContactsApi();
  client.setApiKey(ContactsApiApiKeys.apiKey, apiKey);
  return client;
}

// -------------------- Helpers --------------------
const normalizeNiches = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map((v) => (typeof v === "string" ? v.trim() : String(v)))
    .map((s) => s.trim())
    .filter(Boolean);
};

const pickBrevoPayload = (
  data: CreatorDoc,
  docId: string,
  listId: number
): BrevoPayload | null => {
  const email = (data.email ?? "").trim();
  const name = (data.name ?? "").trim();
  if (!email || !name) return null;

  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  const niches = normalizeNiches(data.niches);
  const locationYesNo = (data.locationYesNo ?? "").toLowerCase();

  return {
    email,
    attributes: {
      SMS: phone || undefined,
      FIRSTNAME: name || undefined,
      NICHES: niches.length ? niches.join(",") : undefined,
      FIRESTORE_ID: docId,
      IN_MIAMI: locationYesNo === "yes",
    },
    listIds: [listId],
    updateEnabled: true,
  };
};

const nichesChanged = (a: unknown, b: unknown) => {
  const A = normalizeNiches(a);
  const B = normalizeNiches(b);

  if (A.length !== B.length) return true;
  // If you want order-insensitive compare, sort both arrays here.
  return A.some((value, idx) => value !== B[idx]);
};

const hasRelevantChanges = (before: CreatorDoc, after: CreatorDoc) => {
  return (
    (before.email ?? "").trim() !== (after.email ?? "").trim() ||
    (before.name ?? "").trim() !== (after.name ?? "").trim() ||
    (before.phone ?? "").trim() !== (after.phone ?? "").trim() ||
    (before.locationYesNo ?? "").toLowerCase() !==
      (after.locationYesNo ?? "").toLowerCase() ||
    nichesChanged(before.niches, after.niches)
  );
};

async function syncBrevo(
  client: ContactsApi,
  action: "upsert" | "delete",
  payload: BrevoPayload | string
) {
  try {
    if (action === "upsert") {
      const body = payload as BrevoPayload;

      const contact = new CreateContact();
      contact.email = body.email;
      contact.listIds = body.listIds;
      contact.updateEnabled = true;
      contact.attributes = body.attributes;

      await client.createContact(contact);
      return;
    }

    const email = payload as string;
    await client.deleteContact(email);
  } catch (err: any) {
    const status =
      err?.status ??
      err?.response?.statusCode ??
      err?.response?.status ??
      err?.code;

    const error: Error & { status?: number } =
      err instanceof Error ? err : new Error(String(err));

    if (status) error.status = Number(status);
    throw error;
  }
}

// -------------------- Firestore Triggers --------------------
export const addApplicationToBrevo = onDocumentCreated(
  COLLECTION_PATH,
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const { apiKey, listId } = getBrevoConfigFromEnv();
    const client = makeBrevoClient(apiKey);

    const payload = pickBrevoPayload(
      snap.data() as CreatorDoc,
      event.params.applicationId,
      listId
    );

    if (!payload) {
      logger.warn("Brevo sync skipped (missing name or email)", {
        applicationId: event.params.applicationId,
      });
      return;
    }

    await syncBrevo(client, "upsert", payload);

    logger.info("Brevo contact created/synced", {
      applicationId: event.params.applicationId,
      email: payload.email,
    });
  }
);

export const updateApplicationInBrevo = onDocumentUpdated(
  COLLECTION_PATH,
  async (event) => {
    const beforeSnap = event.data?.before;
    const afterSnap = event.data?.after;
    if (!beforeSnap || !afterSnap) return;

    const before = beforeSnap.data() as CreatorDoc;
    const after = afterSnap.data() as CreatorDoc;

    // Can't sync without email
    if (!(after?.email ?? "").trim()) return;

    // Avoid unnecessary calls
    if (!hasRelevantChanges(before, after)) return;

    const { apiKey, listId } = getBrevoConfigFromEnv();
    const client = makeBrevoClient(apiKey);

    const payload = pickBrevoPayload(after, event.params.applicationId, listId);
    if (!payload) {
      logger.warn("Brevo update skipped (missing name or email)", {
        applicationId: event.params.applicationId,
      });
      return;
    }

    await syncBrevo(client, "upsert", payload);

    logger.info("Brevo contact updated/synced", {
      applicationId: event.params.applicationId,
      email: payload.email,
    });
  }
);

export const deleteApplicationFromBrevo = onDocumentDeleted(
  COLLECTION_PATH,
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const data = snap.data() as CreatorDoc;
    const email = (data?.email ?? "").trim();
    if (!email) return;

    const { apiKey } = getBrevoConfigFromEnv();
    const client = makeBrevoClient(apiKey);

    try {
      await syncBrevo(client, "delete", email);
      logger.info("Brevo contact deleted", {
        applicationId: event.params.applicationId,
        email,
      });
    } catch (err: any) {
      if (err?.status === 404) {
        logger.warn("Brevo contact not found during delete", {
          applicationId: event.params.applicationId,
          email,
        });
        return;
      }
      logger.error("Failed to delete Brevo contact", {
        applicationId: event.params.applicationId,
        email,
        err,
      });
      throw err;
    }
  }
);

// -------------------- Test HTTP --------------------
export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});
