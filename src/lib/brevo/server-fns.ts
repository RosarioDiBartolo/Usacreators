 
import { createServerFn } from "@tanstack/react-start"; 
import * as Sentry from "@sentry/tanstackstart-react";

import { brevoContactSchema } from "./schema";
import { subscribeToNewsletter } from "./utils";

export const subscribeToNewsletterFunction = createServerFn({ method: "POST" })
  .inputValidator(brevoContactSchema)
  .handler(async ({ data }) => {
    subscribeToNewsletter(data);

    Sentry.logger.info(`[${data.docId}] Added contact to Brevo list`);
  });
