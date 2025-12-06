// src/serverFns/uploadProfilePicture.ts
import { createServerFn } from "@tanstack/react-start"; 
import { type UploadApiResponse } from "cloudinary";
  const folder = "users/avatars"; // customize

export const uploadProfilePicture = createServerFn({ method: "POST" })
  .inputValidator((data) => {
    if (!(data instanceof FormData)) {
      throw new Error("Expected FormData");
    }

    // Runtime check for file
    const file = data.get("file");
    if (!file) {
      throw new Error("Missing `file` field");
    }

    // You can also validate required fields here if you want:
    // const name = data.get("name")?.toString() ?? "";
    // ...

    // ✅ We keep returning the FormData here so `data` in the handler is still a FormData instance.
    return data as FormData;
  })
  .handler(async ({ data }) => {
        const {cloudinary} = await import("./cloudinary")
 
    // `data` is FormData (already validated above)
    const file = data.get("file");

    if (!(file instanceof File)) {
      throw new Error("`file` is not a File");
    }

 
    // Convert File -> Buffer for Cloudinary SDK
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

     const result = await new Promise<UploadApiResponse  | undefined>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      uploadStream.end(buffer);
    });

    // You can also persist here directly (Firestore, etc.)
    // or just return the Cloudinary info to the client.
    return  result
  });
