import { v2 as cloudinary } from "cloudinary";
import formidable, {  type Files,type Fields} from "formidable";
import fs from "fs";
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Disable Vercel's default body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const form = formidable({ multiples: false });

    const {   files }: {files: Files<string>, fields:  Fields<string>} = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });
 
    const file = files.file; // expecting a field named "file"
    
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
  const filePath = file[0].filepath;
 

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: "uploads", // optional: specify folder in your Cloudinary
    });

    // Clean up temporary file
    fs.unlinkSync(filePath);

    return res.status(200).json({
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Upload failed" });
  }
}
