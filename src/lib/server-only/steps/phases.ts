// src/lib/server-kit/steps/phases.ts
export type Phase =
  | "duplicate-checks"
  | "legal-versions"
  | "build-application"
  | "persist-application"
  | "log-legal"
  | "notify-slack"
  | "newsletter"; // add as you go
