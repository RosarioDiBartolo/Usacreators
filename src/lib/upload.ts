// src/lib/upload/direct.ts
import { createClientOnlyFn } from "@tanstack/react-start";

export type SignedUploadPolicy = {
  apiKey: string;
  signature: string;
  timestamp: number;
  folder: string;
  eager?: string;
  uploadUrl: string;
};

export type CloudinaryUploadResult = {
  asset_id: string;
  public_id: string;
  secure_url: string;
  url: string;
  resource_type: "image" | "video" | "raw";
};

export type UploadDirectOptions = {
  onProgress?: (percent: number) => void;
  signal?: AbortSignal; // <-- optional
};

export const uploadDirect = createClientOnlyFn(
  async (
    file: File,
    policy: SignedUploadPolicy,
    opts: UploadDirectOptions = {}
  ): Promise<CloudinaryUploadResult> => {
    if (!(file instanceof File)) throw new TypeError("Expected a File");

    const fd = new FormData();
    fd.append("file", file);
    fd.append("api_key", policy.apiKey);
    fd.append("timestamp", String(policy.timestamp));
    fd.append("signature", policy.signature);
    fd.append("folder", policy.folder);
    if (policy.eager) fd.append("eager", policy.eager);

    return await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", policy.uploadUrl);

      // Progress (optional)
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable && opts.onProgress) {
          opts.onProgress(Math.round((e.loaded / e.total) * 100));
        }
      };

      // Result
      xhr.onload = () => {
        const text = xhr.responseText || "";
        try {
          const json = JSON.parse(text);
          if (xhr.status >= 200 && xhr.status < 300) resolve(json);
          else reject(new Error(json?.error?.message ?? "Upload failed"));
        } catch {
          reject(new Error("Invalid Cloudinary response"));
        }
      };

      xhr.onerror = () => reject(new Error("Network error"));

      // Optional cancellation support (does nothing unless signal passed)
      if (opts.signal) {
        if (opts.signal.aborted) {
          xhr.abort();
          reject(new Error("Upload aborted"));
          return;
        }
        opts.signal.addEventListener(
          "abort",
          () => {
            xhr.abort();
            reject(new Error("Upload aborted"));
          },
          { once: true }
        );
      }

      xhr.send(fd);
    });
  }
);
