import Thumbnail from "@/assets/good-faces-T4p72-fc2_A-unsplash.jpg";
import { Globe2, Link2, ShieldCheck, Zap, Layers, Compass, Cpu, Timer } from "lucide-react";
import FirstSection from "./first-section";
import SecondSection from "./second-section";
import ThirdSection from "./third-section";

export default function FeaturesWrapper() {
  const content = {
    meta: {
      version: "v3.4",
      badge: "Built for Miami creators",
    },
    section1: {
      title: "The home of Miami's top creators and brands",
      description:
        "Join the largest catalog of verified creators in Miami. Get discovered by local brands, collaborate on real campaigns, and access exclusive research tools built to grow your influence.",
      ctaPrimary: "Join the catalog",
      ctaSecondary: "Discover creators",
      features: [
        {
          icon: <Globe2 />,
          title: "Local reach, global impact",
          desc: "Be part of a focused Miami network while connecting to worldwide opportunities.",
        },
        {
          icon: <Link2 />,
          title: "Brand connections",
          desc: "Match with verified Miami-based brands and agencies looking for local talent.",
        },
        {
          icon: <ShieldCheck />,
          title: "Verified profiles",
          desc: "Every creator is reviewed to ensure trust, authenticity, and real impact.",
        },
        {
          icon: <Zap />,
          title: "Instant exposure",
          desc: "Get featured in campaigns, lists, and brand searches as soon as you join.",
        },
      ],
      stats: [
        { label: "Active creators", value: "8k+" },
        { label: "Partner brands", value: "500+" },
        { label: "Avg. match time", value: "< 3 days" },
      ],
    },
    media: {
      image: Thumbnail,
    },
  };

  return (
    <>
      <FirstSection data={content.section1} media={content.media} meta={content.meta} />
    </>
  );
}
