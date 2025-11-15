import { createServerFn } from "@tanstack/react-start";
import { type UploadApiResponse } from "cloudinary";
import z from "zod";

 
export const uploadToCloudinary = createServerFn({ method: "POST" }).inputValidator(z.instanceof(FormData))
.handler( async ({data}) =>{

  const file = data.get("file") 
  if (!(file instanceof File)) throw new Error("File missing or invalid")
      const { cloudinary } = await import("@/lib/cloudinary");

  // 1. Get the raw bytes
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // 2. Wrap upload_stream in a typed Promise
  const upload = await new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "users/avatars",
        // add more options if you need (e.g. transformation, resource_type, etc.)
      },
      (error, uploadResult) => {
        if (error) return reject(error);
        if (!uploadResult) return reject(new Error("Cloudinary upload returned no result"));
        resolve(uploadResult);
      }
    );

    // 3. Actually send the bytes into the stream
    stream.end(buffer);
  });

  return upload;
})