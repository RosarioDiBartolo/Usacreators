import { createTypedCollection } from "../firebase/utils";
import { LegalAcceptanceSchema } from "./schemas/creator-apply-server";

export const legalCollection = createTypedCollection({
  collection: "legal_acceptances",
  schema: LegalAcceptanceSchema,
});