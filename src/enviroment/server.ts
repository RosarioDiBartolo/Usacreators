// env.server.ts
import z from "zod";

const serverEnvSchema = z
  .object({ 
    ANALYZE: z.coerce.boolean().optional().default(false),
    SENTRY_AUTH_TOKEN: z.string().trim(),
    EMAIL_HASH_SALT: z.string().trim().optional(),
    BREVO_API_KEY: z.string().trim(),
    BREVO_NEWSLETTER_LIST_ID: z.string().trim(),
    CLOUDINARY_CLOUD_NAME: z.string().trim(),
    CLOUDINARY_API_KEY: z.string().trim(),
    CLOUDINARY_API_SECRET: z.string().trim(),
    ALLOW_ORIGIN: z.string().trim().optional().default("*"),
    SLACK_WEBHOOK_URL: z.string().trim().optional(),
    VITE_DOMAIN_URL: z.string().trim().url(), // can still exist server-side too
    FIREBASE_SERVICE_ACCOUNT: z.string(),
  })
  .passthrough();

const parsed = serverEnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid server env", parsed.error.flatten());
  process.exit(1);
}
export const enviroment: "production" | "development" | "test"  =  process.env.VERCEL_ENV || process.env.NODE_ENV
const env = parsed.data;

export default env;
