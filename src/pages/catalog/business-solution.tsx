import * as React from "react";
import { Button } from "@/components/ui/button";
import { CalendarRange, PhoneCall, Target, CheckCircle2, MessageCircle } from "lucide-react";

function BusinessSolution() {
  return (
    <section className="px-4 py-16 md:py-20 max-w-5xl mx-auto">
      <h2 className="bg-text bg-linear-to-b from-secondary via-amber-900 to-amber-950">
        Book a Free Strategy Call
      </h2>

      <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto text-center">
        Not sure where to start with UGC in Miami? In 20–30 minutes we&apos;ll
        map out how Miami Creators could plug into your current marketing mix
        and what a first test campaign could look like.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-stretch rounded-3xl border border-amber-200/70 bg-amber-50/70 p-6 md:p-10 shadow-[0_22px_80px_rgba(0,0,0,0.12)] dark:border-amber-900/70 dark:bg-amber-950/40">
        {/* Left: what we do on the call */}
        <div className="flex flex-col justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-amber-900/85 dark:bg-black/40 dark:text-amber-100">
              <Target className="h-3.5 w-3.5" />
              <span>What we cover together</span>
            </div>

            <h3 className="mt-4 text-xl md:text-2xl font-semibold text-[#2A1F1D] dark:text-amber-50">
              A concrete plan, not a generic sales pitch.
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-amber-950/80 dark:text-amber-50/90">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                <span>
                  <strong>Audit your current content &amp; funnel</strong>{" "}
                  to understand where UGC could have the biggest impact.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                <span>
                  <strong>Define your ideal creator profile</strong> by niche,
                  platform, budget and deliverables.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                <span>
                  <strong>Outline a first test campaign</strong> including
                  timeline, asset volume and success metrics.
                </span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs md:text-sm">
            <Stat label="Typical call length" value="25 minutes" />
            <Stat label="Platform fee for creators" value="0%" />
            <Stat label="Best for" value="Founders &amp; CMOs" />
          </div>
        </div>

        {/* Right: CTA card */}
        <div className="relative flex flex-col justify-between rounded-3xl bg-gradient-to-br from-amber-900 via-amber-800 to-black px-6 py-7 md:px-7 md:py-8 text-left text-amber-50 overflow-hidden">
          <div className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-amber-500/40 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-24 rounded-full bg-amber-300/20 blur-2xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]">
              <CalendarRange className="h-3.5 w-3.5" />
              <span>Slots available this week</span>
            </div>

            <h3 className="mt-4 text-lg md:text-xl font-semibold">
              Ready to see if it&apos;s a fit?
            </h3>
            <p className="mt-3 text-sm text-amber-100/90">
              Share a bit about your brand and goals, and we&apos;ll confirm a
              time that actually works for your schedule.
            </p>

            <ul className="mt-4 space-y-2 text-xs text-amber-100/80">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                No commitment · No hidden fees · No “hard close”
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                You&apos;ll leave with a clear next step — even if we&apos;re
                not the right partner.
              </li>
            </ul>
          </div>

          <div className="relative mt-6 flex flex-col gap-3">
            <Button className="w-full inline-flex items-center justify-center gap-2 bg-amber-100 text-amber-900 hover:bg-amber-200">
              <PhoneCall className="h-4 w-4" />
              Book my free strategy call
            </Button>
            <Button
              variant="outline"
              className="w-full border-amber-200/80 bg-white/5 text-amber-50 hover:bg-white/10"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Share details via email instead
            </Button>
            <p className="mt-1 text-[11px] text-amber-100/70">
              We typically reply within one business day with available time
              slots and next steps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-amber-200/70 bg-background/70 px-3 py-3 text-left dark:border-amber-900/60 dark:bg-black/40">
      <p className="text-[11px] uppercase tracking-[0.16em] text-amber-700/90 dark:text-amber-200/90 mb-1">
        {label}
      </p>
      <p className="text-sm font-semibold text-[#2A1F1D] dark:text-amber-50">
        {value}
      </p>
    </div>
  );
}

export default BusinessSolution;
