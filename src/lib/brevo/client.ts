// src/lib/brevo/client.ts
import env from "@/enviroment/server";
import Brevo from "@getbrevo/brevo";

const apiKey = env.BREVO_API_KEY;
if (!apiKey) {
  throw new Error("Missing BREVO_API_KEY env var");
}

const contactsClient = new Brevo.ContactsApi();
contactsClient.setApiKey(Brevo.ContactsApiApiKeys.apiKey, apiKey);

export { contactsClient };
