import { createServerFn } from "@tanstack/react-start";

import z from "zod";
import { sentryMiddleware } from "../server-only/logging";
import { creatorApplicationPayloadsObject } from "./schemas/creator-apply-server";
import { formSteps } from "./schemas/creators-apply-shared";
import {
  setCorsHeaders,
  createRequestContext,
  ensureNoDuplicatesOrThrow,
  buildApplicationRecord,
  persistApplication,
  logLegalAcceptance,
  notifySlackSafely,
  ApiOk,
  ApiErrorException,
  ApiError,
} from "./subscription-steps";
import { getLegalVersions } from "../legal/utils";
import * as Sentry from "@sentry/tanstackstart-react";
import { setResponseStatus } from "@tanstack/react-start/server";

export const submitCreatorApplication = createServerFn({ method: "POST" })
  .middleware([sentryMiddleware])
  .inputValidator(creatorApplicationPayloadsObject)
  .handler(async ({ data }) => {
    setCorsHeaders();

    const ctx = createRequestContext();

    try {
      // 1) Duplicate checks
      const { emailLower, normalizedInstagram, normalizedTiktok } =
        await ensureNoDuplicatesOrThrow(data);

      // 2) Legal versions
      const { terms: currentTerms, privacy: currentPrivacy } =
        await getLegalVersions();

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
        `✅ [${ctx.requestId}] Completed in ${Date.now() - ctx.started}ms (id=${applicationId})`
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

// ---------- Convenient TS exports ----------
export type SubmitCreatorApplicationInput = z.infer<typeof formSteps>;
export type SubmitCreatorApplicationResult = ApiOk | ApiError;
