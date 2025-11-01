import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Copy, ExternalLink } from "lucide-react";

/**
 * SuccessPage
 * A clean, minimal success/thank-you page for creators who just submitted the form.
 * - TailwindCSS only (no custom CSS required)
 * - Framer Motion for subtle entrance animations
 * - Lucide icons for a crisp look
 *
 * Props (optional):
 * - discordInviteUrl: string  -> invite link to your Discord
 * - onClose: () => void       -> optional handler for "Back to Home"
 */
export default function SuccessPage({
  discordInviteUrl = "https://discord.gg/your-invite",
 }: {
  discordInviteUrl?: string;
 }) {
  const [copied, setCopied] = useState(false);

  // small confetti burst using radial-gradients
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--confetti-opacity", "1");
    const t = setTimeout(() => root.style.setProperty("--confetti-opacity", "0"), 1200);
    return () => clearTimeout(t);
  }, []);

  const copyInvite = async () => {
    try {
      await navigator.clipboard.writeText(discordInviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Clipboard copy failed", e);
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full ">
      {/* Decorative top gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-[-20%] h-[50vh] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,105,0,0.15),transparent_60%)]" />
 

      <main className="relative mx-auto flex max-w-3xl flex-col items-center px-6 pb-24 pt-24 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 rounded-full px-4 py-2 text-sm  "
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          Submission received
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.45 }}
          className="mt-6 text-balance text-center   font-extralight  "
        >
         <span className=" font-semibold
         bg-text
         bg-gradient 
         "> You’re in. <br /></span> Welcome to <span className="text-neutral-700">Miami Creators</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="mt-4 max-w-xl text-pretty text-center text-base leading-relaxed  "
        >
          Thanks for applying! We’ll review your profile and reach out by email if we need anything else. In the meantime,
          join our Discord to access announcements, opportunities, and tips to optimize your creator profile.
        </motion.p>

        {/* Action Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.35 }}
          className="mt-8 w-full rounded-2xl border border-neutral-200 bg-white/60 p-6 shadow-sm backdrop-blur sm:p-8"
        >
          <div className="flex flex-col items-start gap-5 s sm:items-center sm:justify-between">
            <div>
              <h2 className="text-  font-medium tracking-[-0.01em]">Next up: join the Discord</h2>
              <p className=" max-w-prose  -sm leading-relaxed text-neutral-600">
                Get fast updates, collaborate with fellow creators, and be the first to see new brand briefs.
              </p>
            </div>

            <div className="flex w-full   gap-2    sm:items-center">
              <a
                href={discordInviteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-4 items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-secondary px-4 py-2 text-sm font-medium text-white transition hover:opacity-95 active:opacity-90"
              >
                Join Discord <ExternalLink className="h-4 w-4" />
              </a>
              <button
                onClick={copyInvite}
                className="inline-flex flex-1  items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
              >
                {copied ? (
                  <>
                    Copied!
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </>
                ) : (
                  <>
                    Copy invite
                    <Copy className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Milestone kpi="24h–72h" label="Typical review time" />
            <Milestone kpi="> 2,000" label="Creators in catalog" />
            <Milestone kpi="0 fees" label="to join & stay" />
          </div>
        </motion.div>

        {/* Secondary actions */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-neutral-900"
          >
            Back to home <ArrowRight className="h-4 w-4" />
          </a>
          <span className="hidden select-none text-neutral-300 sm:inline">•</span>
          <a
            href="/creators"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-neutral-900"
          >
            Explore the catalog <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Small print */}
        <p className="mt-10 text-center text-xs text-neutral-500">
          If you submitted by mistake or need to update details, reply to our confirmation email and we’ll help you fix it.
        </p>
      </main>
    </div>
  );
}

function Milestone({ kpi, label }: { kpi: string; label: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4">
      <div className="text-lg font-semibold tracking-tight">{kpi}</div>
      <div className="mt-0.5 text-sm text-neutral-600">{label}</div>
    </div>
  );
}
