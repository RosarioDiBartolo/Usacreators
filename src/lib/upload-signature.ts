// /src/server/get-upload-signature.ts
import { createServerFn } from "@tanstack/react-start";
 
import { z } from "zod";

// Allow only transforms you actually use
const EAGER_ALLOWLIST = new Set([
  "c_fill,w_768,h_768,q_auto,f_auto",
  "c_fill,w_512,h_512,q_auto,f_auto",
  "q_auto,f_auto",
]);

// Input schema (single data object)
const Input = z.object({
  folder: z
    .string()
    .regex(/^[a-z0-9/_-]+$/i, "Invalid folder")
    .default("users/avatars"),
  eager: z
    .string()
    .refine((v) => EAGER_ALLOWLIST.has(v), "Unsupported eager transform")
    .optional(),
});
export type GetUploadSignatureInput = z.infer<typeof Input>;

export type SignedUploadPolicy = {
   signature: string;
  timestamp: number;
  folder: string;
  eager?: string;
  uploadUrl: string;
};

// Idiomatic server fn: validate on the wire, get { data } in handler
export const getUploadSignature = createServerFn({ method: "POST" })
  .inputValidator(Input)
  .handler(async ({ data }): Promise<SignedUploadPolicy> => {
    const {cloudinary} = await import("./cloudinary")
    const { folder, eager } = data;
    const timestamp = Math.floor(Date.now() / 1000);

    const paramsToSign: Record<string, string | number> = { timestamp, folder };
    if (eager) paramsToSign.eager = eager;

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!
    );

    return {
       signature,
      timestamp,
      folder,
      eager,
      uploadUrl: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/auto/upload`,
    };
  });
