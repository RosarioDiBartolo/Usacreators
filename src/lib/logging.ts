import { createMiddleware } from "@tanstack/react-start";
import * as Sentry from "@sentry/tanstackstart-react";

export const requestLogger = createMiddleware().server(
  async ({ next, request }) => {
    const startTime = Date.now();

    // Low-level: useful in dev/preview, can be filtered out in beforeSendLog
    Sentry.logger.debug("Incoming request", {
      method: request.method,
      url: request.url,
    });

    try {
      const result = await next();
      const duration = Date.now() - startTime;

      const status = result.response?.status ?? 0;
      
      // Choose log level based on outcome
      const level: "info" | "warn" | "error" =
      status >= 500 ? "error" : status >= 400 ? "warn" : "info";
    
      Sentry.logger[level]("Request completed", {
        method: request.method,
        url: request.url,
        status,
        durationMs: duration,
      });

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;

      // Proper captureException usage: pass the error, then context
      Sentry.captureException(error, {
        level: "error",
        extra: {
          method: request.method,
          url: request.url,
          durationMs: duration,
        },
      });

      // Re-throw so the framework still sees the error
      throw error;
    }
  }
);
