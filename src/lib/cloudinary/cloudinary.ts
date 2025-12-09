import { env } from "@/enviroment/enviroment";
import { v2 as cloudinary } from "cloudinary";
 
// Disable Vercel's default body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// Configure Cloudinary
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
}); 
 
export   {cloudinary};