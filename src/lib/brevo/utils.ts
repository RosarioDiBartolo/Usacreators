import { CreateContact } from "@getbrevo/brevo";
import { contactsClient } from "./client";
import env from "@/enviroment/server";
import z from "zod";
import { brevoContactSchema } from "./schema";
export const TemporaryListId = Number(env.BREVO_NEWSLETTER_LIST_ID);
export  async function isContactInList(email: string, listId: number) {
  try {
    const contact = (await contactsClient.getContactInfo(email)).body;

    const listIds = contact.listIds ?? [];

    return listIds.includes(listId);
  } catch (err) {
    // Brevo throws 404 if contact does NOT exist
    if (err.status === 404) {
      return false;
    }

    throw err; // real error
  }
}
export const subscribeToNewsletter = async ({
  email,
  phone,
  name,
  niches,
  locationYesNo,
  docId,
}: z.infer<typeof brevoContactSchema>) => {
  const contact = new CreateContact();

  contact.email = email;

  contact.attributes = {
    SMS: phone,
    FIRSTNAME: name,
    NICHES: niches.join(","),
    FIRESTORE_ID: docId,
    IN_MIAMI: locationYesNo === "yes",
    // any other attributes you configured in Brevo
  };

  contact.listIds = [TemporaryListId];

  return await contactsClient.createContact(contact);
};
