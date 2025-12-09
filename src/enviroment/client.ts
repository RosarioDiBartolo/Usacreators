// env.client.ts
import z from "zod";

const clientEnvSchema = z
  .object({
    VITE_DOMAIN_URL: z.string().url(),
  })
  .passthrough();

const parsed = clientEnvSchema.safeParse(import.meta.env);

if (!parsed.success) {
  throw new Error("Invalid client environment variables");
}

const clientEnv = parsed.data;

export default clientEnv;
