// src/lib/server-kit/errors/api-error.ts
import type { Phase } from "../steps/phases";

export type ApiErrorPayload = {
  status: number;
  code: string;
  message: string;
  phase?: Phase;
  fieldErrors?: Record<string, string[]>;
  formErrors?: string[];
  requestId?: string;
};

// ---------- Types ----------
export type ApiOk = { success: true; id: string };

export class ApiErrorException extends Error {
  status: number;
  code: string;
  phase?: Phase;
  fieldErrors?: Record<string, string[]>;
  formErrors?: string[];
  requestId?: string;

  constructor(opts: ApiErrorPayload & { cause?: unknown }) {
    super(opts.message);
    this.name = "ApiErrorException";
    this.status = opts.status;
    this.code = opts.code;
    this.phase = opts.phase;
    this.fieldErrors = opts.fieldErrors;
    this.formErrors = opts.formErrors;
    this.requestId = opts.requestId;

    if (opts.cause) this.cause = opts.cause;
  }
}
