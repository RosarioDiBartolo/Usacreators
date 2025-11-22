"use client";

import * as React from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import {
  BarChart3,
  Megaphone,
  HandCoins,
  Clock,
  Sparkles,
  Percent,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Section() {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useSpring(useTransform(scrollYProgress, [0, 1], [-70, 70]), {
    bounce: 0,
  });
  const decoTopY = useTransform(scrollYProgress, [0, 1], [100, -200]);
  const decoBottomY = useTransform(scrollYProgress, [0, 1], [-10, 20]);

  return (
    <motion.section
      ref={ref}
      className="section-padding relative w-full max-w-none text-start overflow-hidden bg-radial from-tertiary to-primary py-12 md:py-20"
    >
      {/* Top-left decorative border */}
      <motion.div className="absolute -left-7 -top-12 bg-background h-30 w-20 rotate-45" />

      {/* Bottom-right decorative border */}
      <motion.div className="absolute -bottom-12 -right-7 h-30 w-20 bg-background rotate-45" />

      <div className="container max-w-[90rem] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left content */}
          <div className="relative z-10 flex-1">
            <Badge variant={"secondary"} className="   border border-accent/70 bg-secondary/60 hover:bg-secondary   text-xs font-medium ">
              <Megaphone className="h-3.5 w-3.5" />
              <span>Why Miami brands are switching to UGC</span>
            </Badge>

            <h2 className="mt-4 font-bold text-3xl md:text-4xl lg:text-5xl leading-tight lg:leading-[70px] mb-4 lg:mb-6 bg-gradient-to-r from-[#2A1F1D] via-[#7B3306] to-[#461901] bg-clip-text text-transparent">
              10x More Efficient
              <br />
              Than Traditional Media.
            </h2>

           

            <ul className="space-y-4 text-base lg:space-y-3 max-w-xl">
              <li className="flex items-start gap-4 lg:gap-5">
                <CheckGradientIcon />
                <span className="bg-gradient-to-r from-[#2A1F1D] via-[#7B3306] to-[#461901] bg-clip-text text-transparent">
                  Save on media costs while boosting campaign ROI thanks to
                  content that doesn&apos;t feel like an ad.
                </span>
              </li>

              <li className="flex items-start gap-4 lg:gap-5">
                <CheckGradientIcon id="paint0_linear_check2" />
                <span className="bg-gradient-to-r from-[#2A1F1D] via-[#7B3306] to-[#461901] bg-clip-text text-transparent">
                  Reach your exact target audience through creators who already
                  speak to them every day.
                </span>
              </li>

              <li className="flex items-start gap-4 lg:gap-5">
                <CheckGradientIcon id="paint0_linear_check3" />
                <span className="bg-gradient-to-r from-[#2A1F1D] via-[#7B3306] to-[#461901] bg-clip-text text-transparent">
                  Turn every collaboration into a content engine you can reuse
                  across paid, organic, email and your website.
                </span>
              </li>
            </ul>

            
          </div>

          {/* Right content - Laptop image */}
          <div className="relative flex-1 max-w-2xl max-h-[450px] flex justify-center items-center">
            <motion.img
              style={{ y: imageY }}
              src="https://api.builder.io/api/v1/image/assets/TEMP/8d03c2cc651fa4b2844c91423f5bf1f476e83369?width=1590"
              alt="Miami Creators dashboard comparing UGC vs traditional media performance"
              className="object-cover w-full h-auto -rotate-[10deg] rounded-3xl "
            />
            <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1 text-xs shadow-md">
              <BarChart3 className="h-3.5 w-3.5 text-amber-700" />
              <span className="font-medium text-xs text-amber-900">
                Live performance metrics included
              </span>
            </div>
            <div className="absolute top-5 right-5 inline-flex items-center gap-2 rounded-xl bg-amber-900 text-amber-50 px-3 py-1.5 text-[11px] shadow-lg">
              <HandCoins className="h-3.5 w-3.5" />
              <span>Made for founders &amp; CMOs</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-muted/50  bg-secondary text-secondary-foreground px-3 py-3 ">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="h-3.5 w-3.5 text-amber-700   " />
        <span className="font-medium uppercase tracking-[0.12em] text-[10px]">
          {label}
        </span>
      </div>
      <p className="text-sm mx-3 text-accent font-semibold ">
        {value}
      </p>
    </div>
  );
}

function CheckGradientIcon({ id = "paint0_linear_check1" }: { id?: string }) {
  return (
    <svg
      className="w-4 h-[26px] flex-shrink-0 mt-1"
      viewBox="0 0 36 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M35.2467 0.7616C36.2511 1.77707 36.2511 3.42618 35.2467 4.44165L14.6776 25.2384C13.6733 26.2539 12.0422 26.2539 11.0378 25.2384L0.753264 14.84C-0.251088 13.8246 -0.251088 12.1754 0.753264 11.16C1.75762 10.1445 3.38868 10.1445 4.39304 11.16L12.8617 19.7143L31.615 0.7616C32.6194 -0.253867 34.2504 -0.253867 35.2548 0.7616H35.2467Z"
        fill={`url(#${id})`}
      />
      <defs>
        <linearGradient
          id={id}
          x1="29.8414"
          y1="1.70857"
          x2="1.25942"
          y2="1.60308"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2A1F1D" />
          <stop offset="0.5" stopColor="#7B3306" />
          <stop offset="1" stopColor="#461901" />
        </linearGradient>
      </defs>
    </svg>
  );
}
