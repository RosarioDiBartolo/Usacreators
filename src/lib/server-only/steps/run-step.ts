// src/lib/server-kit/steps/run-step.ts
import * as Sentry from "@sentry/tanstackstart-react";
import type { Phase } from "./phases";
import type { RequestContext } from "@/lib/server-only/request/request-context";
import { ApiErrorException } from "@/lib/server-only/errors/api-error";

export async function runStep<T>(
  phase: Phase,
  ctx: RequestContext,
  fn: () => Promise<T>
): Promise<T> {
  const start = Date.now();
  try {
    const result = await fn();
    Sentry.logger.debug(
      Sentry.logger.fmt`[${ctx.requestId}] ✅ ${phase} in ${
        Date.now() - start
      }ms`
    );
    return result;
  } catch (err) {
    if (err instanceof ApiErrorException) {
      if (!err.phase) err.phase = phase;
      throw err;
    }

    const wrapped = new ApiErrorException({
      success: false,
      status: 500,
      code: "INTERNAL_ERROR",
      message: "Internal error",
      phase,
      requestId: ctx.requestId,
      formErrors: ["Unexpected server error."],
      cause: err,
    });

    Sentry.logger.error(
      Sentry.logger.fmt`[${ctx.requestId}] ❌ ${phase} failed`
    );
    throw wrapped;
  }
}
