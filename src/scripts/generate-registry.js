import fs from "fs";
import path from "path";

function generateRegistry() {
  const legalDir = path.join(process.cwd(), "public", "legal");

  function getVersions(dir) {
    return fs
      .readdirSync(path.join(legalDir, dir))
      .filter(f => f.endsWith(".md"))
      .map(f => f.replace(".md", ""))
      .sort(); // newest last
  }

  const termsVersions = getVersions("terms");
  const privacyVersions = getVersions("privacy");

  const registry = {
    terms: {
      current: termsVersions[termsVersions.length - 1], // newest file
      previous: termsVersions.slice(0, -1)
    },
    privacy: {
      current: privacyVersions[privacyVersions.length - 1],
      previous: privacyVersions.slice(0, -1)
    }
  };

  fs.writeFileSync(
    path.join(legalDir, "registry.json"),
    JSON.stringify(registry, null, 2),
    "utf8"
  );

  console.log("✅ registry.json updated");
}

generateRegistry();
