import env  from "@/enviroment/server";
import admin, { type ServiceAccount } from "firebase-admin";
 
const base64 = env.FIREBASE_SERVICE_ACCOUNT;
if (!base64) {
  throw new Error("Missing FIREBASE_SERVICE_ACCOUNT env variable");
}

 const serviceAccount = JSON.parse(Buffer.from(base64, "base64").toString("utf8"));
  

// ---------- Firebase Initialization ----------
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
    });
    console.log("✅ Firebase Admin initialized successfully");
  } catch (err) {
    console.error("❌ Invalid FIREBASE_SERVICE_ACCOUNT JSON:", err);
    throw new Error("Failed to initialize Firebase Admin.");
  }
}
  const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true, preferRest: true, // <-- key line
 })

 export { db  }
 