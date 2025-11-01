import fs from "fs";
import path from "path";

export function readCurrentLegal() {
  const p = path.join(process.cwd(), "public", "legal", "registry.json");
  const reg = JSON.parse(fs.readFileSync(p, "utf8"));
  return {
    termsVersion: String(reg.terms.current),
    privacyVersion: String(reg.privacy.current),
  };
}