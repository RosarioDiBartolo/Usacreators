// src/lib/security/tokens.ts
import { randomBytes } from "node:crypto";

/**
 * Generates a secure random token.
 * @param bytes Number of random bytes (32 bytes ≈ 256 bits)
 */
export function generateSecureToken(bytes: number = 32): string {
  // base64url => URL-safe, no + / =
  return randomBytes(bytes).toString("base64url");
}