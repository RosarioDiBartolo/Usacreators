// src/router.tsx
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { QueryClient } from "@tanstack/react-query";
import * as Sentry from "@sentry/tanstackstart-react";

const vercelEnv = process.env.VERCEL_ENV; // 'development' | 'preview' | 'production' | undefined
const nodeEnv = process.env.NODE_ENV; // 'development' | 'production' | 'test'

const isLocalDev = !vercelEnv && nodeEnv === "development";
Sentry.init({
  environment: vercelEnv ?? nodeEnv,
  dsn: "https://bf8a6fd4a7f1544ba2a10c0459dffe8a@o4510416369418240.ingest.de.sentry.io/4510450042863696",
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
  integrations: [],
  enableLogs: true,
  beforeSendLog: (log) => {
    const logLevel =
      log.level === "fatal"
        ? "error"
        : log.level === "trace"
          ? "log"
          : log.level === "info"
            ? "log"
            : log.level;
    console[logLevel](log.message, log.attributes);

    if (["debug", "info"].includes(log.level) || isLocalDev) {
      // Filter out all info logs
      return null;
    }

    return log;
  },
});
export function getRouter() {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreload: "intent",
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
    // optional:
    // handleRedirects: true,
    // wrapQueryClient: true,
  });
  return router;
}

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
