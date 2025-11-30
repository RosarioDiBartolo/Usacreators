import * as Sentry from "@sentry/tanstackstart-react";
Sentry.init({
  dsn: "https://bf8a6fd4a7f1544ba2a10c0459dffe8a@o4510416369418240.ingest.de.sentry.io/4510450042863696",
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
    enableLogs: true,

});