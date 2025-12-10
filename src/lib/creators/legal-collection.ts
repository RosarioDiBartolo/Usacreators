import { createTypedCollection } from "../firebase/utils";
import { LegalAcceptanceSchema } from "./schemas/creators-apply-server";

export const legalCollection = createTypedCollection({
  collection: "legal_acceptances",
  schema: LegalAcceptanceSchema,
});