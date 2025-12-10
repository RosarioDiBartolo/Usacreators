import { getRequest, getRequestHeader, setResponseHeader } from "@tanstack/react-start/server";
import { hashIP, normalizeIp } from "../utils";

// src/lib/server-kit/context/request-context.ts
export type RequestContext = {
  requestId: string;
  country: string;
  ua: string;
  startedAt: number;
  ipHash?: string;
  userId?: string;
  env: "development" | "production" | "test";
};


export function createRequestContext(): RequestContext {
  const request = getRequest();
  const requestId = crypto.randomUUID();
  setResponseHeader("X-Request-ID", requestId);

  const startedAt = Date.now();
  const ua = (request.headers.get("user-agent") || "").slice(0, 300);
  const country = request.headers.get("x-vercel-ip-country") || "unknown";

  // NOTE: if you actually want the IP, use x-real-ip / x-forwarded-for.
  const ip = normalizeIp(getRequestHeader("host"));
  const ipHash = hashIP(ip as string);

  return { requestId, startedAt, ua, country, ipHash, env: process.e };
}