import * as React from "react";
import type { LucideIcon } from "lucide-react";
import {
  Users,
  MapPin,
  Sparkles,
  Zap,
  Database,
  Filter,
} from "lucide-react";

interface FeatureData {
  icon: LucideIcon;
  title: string;
  description: string;
  helper?: string;
}

export default function Features() {
  return (
    <section className="relative w-full max-w-[960px] mx-auto px-4 py-12 md:py-20">
      <p className="text-[11px] font-medium text-amber-900  tracking-[0.4em] mb-3">
        BUILT TO SCALE WITH YOU
      </p>
      <h2 className=" h2  ">
        Miami Creators features for brands
      </h2>

      <p className=" body   ">
        Stop scrolling hashtags and DMing random profiles. Our catalog gives
        you a clean, structured view of Miami-based creators so you can
        shortlist, brief and launch campaigns in days, not months.
      </p>

      <div className="mt-10 md:mt-14 p-4 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-24 gap-y-10 md:gap-y-14">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: FeatureData }) {
  const Icon = feature.icon;

  return (
    <div className="relative flex flex-col items-center text-center">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 rounded-full opacity-70 bg-gradient-to-b from-[#FF9D00] to-transparent mix-blend-plus-lighter blur-[22px]" />
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-amber-200/60 bg-amber-50/70 shadow-sm dark:border-amber-900/60 dark:bg-amber-950/40">
          <Icon className="h-5 w-5 text-amber-900 dark:text-amber-50" />
        </div>
      </div>
      <h3 className="mt-3 text-[20px] md:text-[22px] leading-[26px] font-semibold tracking-[-0.4px] mb-2 bg-gradient-to-r from-[#2A1F1D] via-[#7B3306] to-[#461901] bg-clip-text text-transparent">
        {feature.title}
      </h3>
      <p className="text-[14px] leading-[20.63px] font-normal tracking-[-0.2px] text-amber-950/80 dark:text-amber-50/90">
        {feature.description}
      </p>
      {feature.helper && (
        <p className="mt-2 text-[12px] leading-[18px] font-light tracking-[-0.15px] text-muted-foreground">
          {feature.helper}
        </p>
      )}
    </div>
  );
}

const features: FeatureData[] = [
  {
    icon: Users,
    title: "Curated Miami creators",
    description:
      "Every profile is vetted — we prioritize real people, strong content quality and reliable communication.",
    helper: "No more wasting hours on ghosted DMs or fake engagement.",
  },
  {
    icon: MapPin,
    title: "Neighborhood-level insight",
    description:
      "Find creators who actually live in Wynwood, Brickell, South Beach and more.",
    helper:
      "Perfect for hyper-local launches, openings and city-focused campaigns.",
  },
  {
    icon: Sparkles,
    title: "Content-first profiles",
    description:
      "See example deliverables, hooks and formats before you even jump on a call.",
    helper:
      "You instantly understand how a creator could plug into your brand story.",
  },
  {
    icon: Zap,
    title: "Fast recruitment",
    description:
      "Get a shortlist of matched creators in 2–4 business days, not weeks.",
    helper: "We handle the heavy lifting so your team can focus on strategy.",
  },
  {
    icon: Database,
    title: "Constant catalog updates",
    description:
      "New vetted Miami creators are added weekly to keep your options fresh.",
    helper:
      "Come back each month and you’ll always find new faces and formats to test.",
  },
  {
    icon: Filter,
    title: "Smart filtering",
    description:
      "Filter by niche, platform, average views, age and more in a few clicks.",
    helper: "Search less, brief more, launch faster.",
  },
];
