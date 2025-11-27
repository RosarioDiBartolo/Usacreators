import { createMiddleware } from "@tanstack/react-start";
// utils/logger.ts
import { createIsomorphicFn } from "@tanstack/react-start";

 
type LogLevel = "debug" | "info" | "warn" | "error";

function formatServerLog(level: LogLevel, message: string, data?: unknown) {
  const timestamp = new Date().toISOString();

  return {
    timestamp,
    level,
    message,
    data: data instanceof Error
      ? { message: data.message, stack: data.stack }
      : data,
    service: "tanstack-start",
    environment: process.env.NODE_ENV,
  };
}

export const logger = createIsomorphicFn()
  .server((level: LogLevel, message: string, data?: unknown) => {
    if (process.env.NODE_ENV === "development") {
      console[level](
        `[${new Date().toISOString()}] [${level.toUpperCase()}]`,
        message,
        data
      );
    } else {
      console.log(JSON.stringify(formatServerLog(level, message, data)));
    }
  })
  .client((level: LogLevel, message: string, data?: unknown) => {
    if (process.env.NODE_ENV === "development") {
      console[level](`[CLIENT] [${level.toUpperCase()}]`, message, data);
    } else {
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
