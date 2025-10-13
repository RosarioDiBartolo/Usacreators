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
    title: "The home of Miami’s top creators and brands",
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
  section2: {
    title: "Grow faster with data and tools built for creators",
    description:
      "Understand your audience, find brand fit, and stay ahead with insights designed for Miami’s creative economy. Our tools make research, outreach, and collaborations effortless.",
    ctaPrimary: "Start your free trial",
    ctaSecondary: "See insights in action",
    features: [
      {
        icon: <Layers />,
        title: "Creator profiles",
        desc: "Showcase your work, social reach, and demographics in one verified portfolio.",
      },
      {
        icon: <Compass />,
        title: "Brand discovery",
        desc: "Explore brands by industry, size, and campaign type to find your perfect match.",
      },
      {
        icon: <Cpu />,
        title: "Smart insights",
        desc: "Track your visibility, engagement, and brand interest through real-time data.",
      },
      {
        icon: <Timer />,
        title: "Seamless onboarding",
        desc: "Join in minutes—connect your socials, upload your media kit, and go live instantly.",
      },
    ],
  },
  section3: {
    title: "Why Miami Creators choose us",
    subtitle:
      "A focused platform designed to empower creators, build trust with brands, and strengthen the Miami creative community.",
    cta: "Explore membership options",
    features: [
      {
        icon: <Zap />,
        title: "Verified network",
        desc: "Every member—creator or brand—is authenticated to ensure quality collaborations.",
      },
      {
        icon: <ShieldCheck />,
        title: "Fair visibility",
        desc: "Our search algorithm promotes active and authentic creators, not pay-to-play lists.",
      },
      {
        icon: <Layers />,
        title: "Collaboration tools",
        desc: "Chat, negotiate, and close deals directly through your dashboard.",
      },
      {
        icon: <Compass />,
        title: "Local focus",
        desc: "Exclusive access to Miami events, meetups, and brand partnerships.",
      },
      {
        icon: <Cpu />,
        title: "AI-powered recommendations",
        desc: "Smart matching that connects creators with the most relevant opportunities.",
      },
      {
        icon: <Timer />,
        title: "Analytics & reporting",
        desc: "See how often brands view your profile and how your visibility grows over time.",
      },
    ],
  },
  media: {
    image: Thumbnail,
    badge: "Now open: Miami Creator Access",
    caption: "Verified Miami creators • Real brand collaborations",
  },
};


  return (
    <>
      <FirstSection data={content.section1} media={content.media} meta={content.meta} />
      <SecondSection data={content.section2} media={content.media} />
      <ThirdSection data={content.section3} />
    </>
  );
}
