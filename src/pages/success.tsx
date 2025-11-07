import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Copy, ExternalLink } from "lucide-react";
import LightRays from "../components/lights";
import { DISCORD_INVITE_URL } from "@/lib/creators/constants";

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
export default function SuccessPage( ) {
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
      await navigator.clipboard.writeText(DISCORD_INVITE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Clipboard copy failed", e);
    }
  };

  return (
    <div className="  bg-secondary text-background  relative min-h-[100dvh] w-full ">
      {/* Decorative top gradient */}
  <LightRays
    raysOrigin="top-center"
     raysSpeed={1.5}
    lightSpread={0.8}
    rayLength={1.2}
    followMouse={true}
    mouseInfluence={0.1}
    noiseAmount={0.1}
    distortion={0.05}
    className="custom-rays h-full"
  />
      <main className=" section-padding text-center absolute z-50 inset-0 mx-auto flex max-w-4xl flex-col items-center px-6   ">
 
         <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.45 }}
          className="  md:text-6xl"
        >
          Joined Successfully.
        
        </motion.h1>
 

        {/* Action Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.35 }}
          className="mt-8 w-full rounded-2xl border border-neutral-200 bg-background/20   p-6 shadow-sm backdrop-blur sm:p-8"
        >
          <div className="flex flex-col items-start gap-5 s sm:items-center sm:justify-between">
            <div>
              <h2 className=" bg-text bg-gradient-to-br from-background    to-background/20  font-medium tracking-[-0.01em]">
              <span className=" text-secondary"> Next up: </span> join the Discord</h2>
              <p className=" font-extralight">
                Get fast updates, collaborate with fellow creators, and be the first to see new brand briefs.
              </p>
            </div>

            <div className="flex w-full   gap-2    sm:items-center">
              <a
                href={DISCORD_INVITE_URL}
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

          <div className=" hidden md:grid mt-6  gap-4 sm:grid-cols-3">
            <Milestone kpi="24h–72h" label="Typical review time" />
            <Milestone kpi="> 2,000" label="Creators in catalog" />
            <Milestone kpi="0 fees" label="to join & stay" />
          </div>
        </motion.div>

        {/* Secondary actions */}
        <div className="mt-8 flex   items-center gap-3  flex-row">
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
    <div className="rounded-xl border border-neutral-200 bg-background/60  text-foreground p-4">
      <div className="text-lg font-semibold tracking-tight">{kpi}</div>
      <div className="mt-0.5 text-sm text-neutral-600">{label}</div>
    </div>
  );
}
