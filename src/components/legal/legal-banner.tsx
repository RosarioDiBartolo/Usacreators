// components/legal/legal-terms-dialog.tsx
"use client";

import { useState } from "react";
import { useLegalDialog } from "@/lib/hooks/useLegalBanner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export function LegalTermsDialog() {
  const { open, setOpen, versions, accept } = useLegalDialog();
  const [checked, setChecked] = useState(false);

  if (!versions) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>We’ve updated our Terms</DialogTitle>
          <DialogDescription>
            You’re accepting <span className="font-medium">Terms v{versions.termsVersion}</span>.  
            Please review the latest documents before continuing to use interactive features.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <a
                className="underline"
                href={`/legal/terms/${versions.termsVersion}`}
                target="_blank"
                rel="noreferrer"
              >
                View Terms (v{versions.termsVersion})
              </a>
            </li>
            <li>
              <a
                className="underline"
                href={`/legal/privacy/${versions.privacyVersion}`}
                target="_blank"
                rel="noreferrer"
              >
                Privacy Notice (v{versions.privacyVersion})
              </a>
            </li>
          </ul>

          <label className="flex items-start gap-2">
            <Checkbox
              checked={checked}
              onCheckedChange={(v) => setChecked(Boolean(v))}
              id="accept-terms"
            />
            <span className="select-none">
              I have read and accept the Terms (v{versions.termsVersion}). I have read the Privacy Notice.
            </span>
          </label>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Not now
          </Button>
          <Button onClick={accept} disabled={!checked}>
            Accept & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
