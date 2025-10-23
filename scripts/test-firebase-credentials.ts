import admin from "firebase-admin";
import { readFileSync } from "fs";

async function testFirestoreConnection(serviceAccountPath: string) {
  try {
    // Load service account credentials
    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));

    // Initialize Firebase Admin SDK
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    const db = admin.firestore();

    // Try to write a test document
    const testRef = db.collection("test_connection").doc("connection_test");
    const testData = { status: "success", timestamp: new Date().toISOString() };

    console.log("🔄 Writing test document...");
    await testRef.set(testData);

    // Try to read the document back
    const doc = await testRef.get();

    if (doc.exists && doc.data()?.status === "success") {
      console.log("✅ Firestore write/read test successful!");
    } else {
      console.error("⚠️ Firestore read/write test failed.");
    }

    // Optional cleanup
    await testRef.delete();
    console.log("🧹 Test document deleted.");
  } catch (err) {
    console.error("❌ Error testing Firestore connection:", err);
    process.exit(1);
  }
}

const SERVICE_ACCOUNT_PATH = "./api/service-account.json"; // adjust path if needed
testFirestoreConnection(SERVICE_ACCOUNT_PATH);
