import { FormType } from "@/lib/creators/use-application-form";
import React from "react";
import { MailCheck } from "lucide-react";

function ConfirmStep({ form }: { form: FormType }) {
  // avoid unused param warning if you’re not using `form` (optional)
  void form;

  return (
    <div className="flex min-h-[320px] w-full items-center justify-center px-4">
      <div
        className="
          relative w-full max-w-md overflow-hidden rounded-3xl 
          border border-emerald-400/40 bg-gradient-to-b 
          from-emerald-500 via-emerald-600 to-emerald-900
          shadow-xl shadow-emerald-900/40 p-8 text-white
        "
      >
        {/* Glow blob */}
        <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-emerald-300/30 blur-3xl" />

        <div className="relative space-y-5">
          {/* Icon */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
              <MailCheck className="h-6 w-6" />
            </div>
            <div className="text-sm uppercase tracking-[0.15em] text-emerald-100/80">
              Final step
            </div>
          </div>

          {/* Title + subtitle */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">
              Check your email to finish up
            </h2>
            <p className="text-sm leading-relaxed text-emerald-50/80">
              We’ve sent you an email to confirm your subscription to our
              service and our newsletter. Once you confirm, you’ll start
              receiving important deals, updates, and opportunities from our
              brand.
            </p>
          </div>

          {/* Mini checklist */}
          <div className="space-y-2 rounded-2xl bg-black/15 p-4 text-sm backdrop-blur">
            <p className="font-medium text-emerald-50">
              What you need to do now:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-emerald-50/85">
              <li>Open your inbox and find our email.</li>
              <li>Click the confirmation button inside the email.</li>
              <li>
                That’s it — your application and newsletter subscription will be
                confirmed.
              </li>
            </ul>
          </div>

          {/* Hint / fallback */}
          <div className="text-xs text-emerald-100/80">
            Didn’t get the email? Check your spam or promotions folder, or wait
            a couple of minutes and refresh your inbox.
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmStep;
