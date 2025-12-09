import * as fs from "node:fs";
import * as path from "node:path";
  

import * as crypto from "node:crypto";
import { Timestamp } from "firebase-admin/firestore";
import { db } from "@/lib/firebase/admin";
import { env } from "@/enviroment/client";

type Version = string; // "YYYY-MM-DD"

type Artifact = {
  versionYMD: Version;
  url: string; // public URL (immutable)
  sha256: string; // 64-hex
  size: number; // bytes
  contentFormat: "markdown";
  publishedAt: FirebaseFirestore.Timestamp;
};

type HistoryDoc = {
  terms: Artifact;
  privacy: Artifact;
  archivedAt?: FirebaseFirestore.Timestamp; // unused; kept for future
};

type RegistryDoc = {
  currentVersion: Version;
  terms: Artifact;
  privacy: Artifact;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
};

const must = (v: unknown, m: string) => {
  if (v === undefined || v === null || v === "") throw new Error(m);
  return v as string;
};

const isVersion = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);

const sha256Hex = (buf: Buffer) =>
  crypto.createHash("sha256").update(buf).digest("hex");

const readBuffer = (p: string) => fs.readFileSync(p);

const joinUrl = (base: string, pathPart: string) =>
  `${base.replace(/\/+$/, "")}/${pathPart.replace(/^\/+/, "")}`;

(async () => {
  try {
    // ----- resolve env early & validate -----
    const versionYMD = must(process.argv[2], "Pass version as YYYY-MM-DD");
    const baseUrl = must(
      env.VITE_DOMAIN_URL,
      "Missing VITE_DOMAIN_URL (e.g. https://yourdomain.com)"
    );

    if (!isVersion(versionYMD))
      throw new Error("Version must be YYYY-MM-DD (UTC)");

    // ----- files -----
    const termsFile = path.resolve(`public/legal/terms_${versionYMD}.md`);
    const privacyFile = path.resolve(`public/legal/privacy_${versionYMD}.md`);
    for (const p of [termsFile, privacyFile]) {
      if (!fs.existsSync(p)) throw new Error(`Missing file: ${p}`);
    }

    // ----- read & hash -----
    const termsBuf = readBuffer(termsFile);
    const privacyBuf = readBuffer(privacyFile);
    const publishedAt = Timestamp.now();

    // make BOTH absolute
    const terms: Artifact = {
      versionYMD,
      url: joinUrl(baseUrl, `legal/terms/terms_${versionYMD}.md`),
      sha256: sha256Hex(termsBuf),
      size: termsBuf.byteLength,
      contentFormat: "markdown",
      publishedAt,
    };

    const privacy: Artifact = {
      versionYMD,
      url: joinUrl(baseUrl, `legal/terms/privacy_${versionYMD}.md`),
      sha256: sha256Hex(privacyBuf),
      size: privacyBuf.byteLength,
      contentFormat: "markdown",
      publishedAt,
    };

    // ----- Firestore refs (Option 1: subcollection) -----
    const historyRef = db.doc(`legal/history/versions/${versionYMD}`); // ✅ even segments
    const registryRef = db.doc("legal/registry");

    await db.runTransaction(async (tx) => {
      const [histSnap, regSnap] = await Promise.all([
        tx.get(historyRef),
        tx.get(registryRef),
      ]);
      if (histSnap.exists)
        throw new Error(`History for version ${versionYMD} already exists.`);

      // 1) append-only snapshot
      const historyDoc: HistoryDoc = { terms, privacy };
      tx.set(historyRef, historyDoc);

      // 2) registry pointer
      const now = Timestamp.now();
      if (!regSnap.exists) {
        const registryDoc: RegistryDoc = {
          currentVersion: versionYMD,
          terms,
          privacy,
          createdAt: now,
          updatedAt: now,
        };
        tx.set(registryRef, registryDoc);
      } else {
        tx.update(registryRef, {
          currentVersion: versionYMD,
          terms,
          privacy,
          updatedAt: now,
        });
      }
    });
    console.log("✅ Synced legal Markdown to Firestore");
    console.log(" Version:", versionYMD);
    console.log(" Terms:", {
      url: terms.url,
      sha256: terms.sha256,
      size: terms.size,
    });
    console.log(" Privacy:", {
      url: privacy.url,
      sha256: privacy.sha256,
      size: privacy.size,
    });
    console.log(" Wrote: legal/history/%s and legal/registry", versionYMD);
  } catch (err) {
    console.error("❌ Failed to sync legal docs:", err?.message || err);
    process.exit(1);
  }
})();
