import { createMiddleware } from "@tanstack/react-start";
// utils/logger.ts
import { createIsomorphicFn } from "@tanstack/react-start";

type LogLevel = "debug" | "info" | "warn" | "error";

export const logger = createIsomorphicFn()
  .server((level: LogLevel, message: string, data?: unknown) => {
    const timestamp = new Date().toISOString();

    if (process.env.NODE_ENV === "development") {
      // Development: Detailed console logging
      console[level](`[${timestamp}] [${level.toUpperCase()}]`, message, data);
    } else {
      // Production: Structured JSON logging
      logger(
        "info",
        JSON.stringify({
          timestamp,
          level,
          message,
          data,
          service: "tanstack-start",
          environment: process.env.NODE_ENV,
        })
      );
    }
  })
  .client((level: LogLevel, message: string, data?: unknown) => {
    if (process.env.NODE_ENV === "development") {
      console[level](`[CLIENT] [${level.toUpperCase()}]`, message, data);
    } else {
      // Production: Send to analytics service
      // analytics.track('client_log', { level, message, data })
    }
  });

export const requestLogger = createMiddleware().server(
  async ({ next, request }) => {
    const startTime = Date.now();

    logger("info", "Incoming request", {
      method: request.method,
      url: request.url,
    });

    try {
      const result = await next();
      const duration = Date.now() - startTime;

      logger("debug", "Request processed:", {
        method: request.method,
        url: request.url,
        duration: `${duration}ms`,
        status: result.response.status,
      });

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      logger("error", "An error occurred during request processing:", {
        method: request.method,
        url: request.url,
        duration: `${duration}ms`,
        error,
      });
      throw error;
    }
  }
);
