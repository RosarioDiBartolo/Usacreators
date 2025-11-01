// hooks/useLegalDialog.ts
import { useEffect, useState, useCallback } from "react";

type Versions = { termsVersion: string; privacyVersion: string };

async function fetchLegalVersions(): Promise<Versions> {
  const r = await fetch("/legal/registry.json", { cache: "no-store" });
  if (!r.ok) throw new Error("Failed to fetch legal registry");
  const j = await r.json();
  return {
    termsVersion: String(j?.terms?.current ?? ""),
    privacyVersion: String(j?.privacy?.current ?? ""),
  };
}

export function useLegalDialog() {
  const [open, setOpen] = useState(false);
  const [versions, setVersions] = useState<Versions | null>(null);

  useEffect(() => {
    fetchLegalVersions()
      .then(v => {
        setVersions(v);
        const last = localStorage.getItem("legal:lastSeenTerms") || "";
        if (v.termsVersion && v.termsVersion !== last) setOpen(true);
      })
      .catch(() => {});
  }, []);

  const accept = useCallback(async () => {
    if (!versions?.termsVersion) return;
    // 1) Persist locally (device-level)
    localStorage.setItem("legal:lastSeenTerms", versions.termsVersion);

    // 2) Optional anonymous audit (non-blocking)
    try {
      await fetch("/api/legal/accept-anon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          termsVersion: versions.termsVersion,
          privacyVersion: versions.privacyVersion,
          context: "site_dialog",
        }),
        keepalive: true,
      });
    } catch {
      // ignore – server enforcement happens at transactional endpoints anyway
    }

    setOpen(false);
  }, [versions]);

  return { open, setOpen, versions, accept };
}
