import { createServerFn } from "@tanstack/react-start";

import z from "zod";
import { formSchema } from "./schemas/creators-apply-shared";
import { ApiErrorException, ApiOk } from "../server-only/errors/api-error";
import { findCreators } from "./creators-collection";
import { notFound } from "@tanstack/react-router";
import * as Sentry from "@sentry/tanstackstart-react";
import { setResponseStatus } from "@tanstack/react-start/server";
import { getLegalVersions } from "../legal/utils";
import { createRequestContext } from "../server-only/request/request-context";
import { creatorApplicationPayloadsObject } from "./schemas/creators-apply-server";
import { setCorsHeaders, ensureNoDuplicatesOrThrow, buildApplicationRecord, persistApplication, logLegalAcceptance, notifySlackSafely } from "./subscription-steps";
 
 

 export const findCreatorByToken = createServerFn({method: "GET"}).inputValidator(z.string()).handler( async({data: confirmToken} )=>{
  const creators = await findCreators({
       limit: 1,
       where: [
         {
           field: "confirmToken",
           op: "==",
           value: confirmToken,
         },
       ],
     });
     if (creators.length === 0) {
       throw notFound();
     }
 
     const creator = creators[0];

     return creator
 })

// ---------- Convenient TS exports ----------
export type requestSubscriptionInput = z.infer<typeof formSchema>;
export type requestSubscriptionResult = ApiOk;

export const requestSubscription = createServerFn({ method: "POST" })
  .inputValidator(creatorApplicationPayloadsObject)
  .handler(async ({ data }) => {
    setCorsHeaders();

    const ctx = createRequestContext();

    try {
      // 1) Duplicate checks
      const { emailLower, normalizedInstagram, normalizedTiktok } = await ensureNoDuplicatesOrThrow(data);

      // 2) Legal versions
      const { terms: currentTerms, privacy: currentPrivacy } = await getLegalVersions();

      // 3) Build application record
      const application = buildApplicationRecord({
        data,
        emailLower,
        normalizedInstagram,
        normalizedTiktok,
        ctx,
        currentTerms,
        currentPrivacy,
      });

      // 4) Persist application
      const applicationId = await persistApplication(application);

      // 5) Log legal acceptance
      await logLegalAcceptance({
        applicationId,
        emailLower,
        ctx,
        currentTerms,
        currentPrivacy,
      });

      // 6) Slack notification (fire-and-forget-ish)
      await notifySlackSafely({
        name: data.name,
        emailLower,
        requestId: ctx.requestId,
      });

      // 7) Final response
      setResponseStatus(201);
      Sentry.logger.debug(
        `✅ [${ctx.requestId}] Completed in ${Date.now() - ctx.startedAt}ms (id=${applicationId})`
      );

      return { success: true, id: applicationId } satisfies ApiOk;
    } catch (err) {
      // Preserve explicit API errors (e.g., duplicates)
      if (err instanceof ApiErrorException) {
        Sentry.logger.error(
          Sentry.logger
            .fmt`[${ctx.requestId}] API error: ${err.code ?? "UNKNOWN"}`
        );
      } else {
        Sentry.logger.error(
          Sentry.logger.fmt`[${ctx.requestId}] Unknown error (wrapped)`
        );
      }

      throw err;
    }
  });

