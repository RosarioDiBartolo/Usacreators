// /api/upload.js  (ESM)
export const config = { runtime: "nodejs" };

import { v2 as cloudinary } from "cloudinary";
import Busboy from "busboy";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const bb =  Busboy({
      headers: req.headers,
      limits: { fileSize: 5 * 1024 * 1024, files: 1 }, // 5MB, 1 file
    });

    let gotFile = false;

    const upload = new Promise((resolve, reject) => {
      bb.on("file", (_name, file /*, info*/) => {
        gotFile = true;

        const cld = cloudinary.uploader.upload_stream(
          {
            folder: "miami-creators/profiles",
            public_id: `profile_${Date.now()}`,
            resource_type: "image",
            transformation: [{ width: 600, height: 600, crop: "fill", gravity: "auto" }],
          },
          (err, result) => (err ? reject(err) : resolve(result))
        );

        file.on("limit", () => {
          cld.destroy();                // abort upstream if too big
          reject(new Error("File too large"));
        });

        file.pipe(cld);
      });

      bb.on("error", reject);
      bb.on("finish", () => {
        if (!gotFile) reject(new Error("No file uploaded"));
      });
    });

    req.pipe(bb);
    const r = await upload;

    return res.status(200).json({
      url: r.secure_url,
      public_id: r.public_id,
      width: r.width,
      height: r.height,
      format: r.format,
    });
  } catch (e) {
    console.error("Upload error:", e);
    return res.status(500).json({ error: e.message || "Upload failed" });
  }
}
