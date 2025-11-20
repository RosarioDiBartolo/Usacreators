import CreatorsCarousel from "@/components/creators-carousel";
import { creatorsQueryOptions } from "@/lib/creators/get-creators";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, LinkProps } from "@tanstack/react-router";
import PricingSection from "@/components/ui/pricing-section";
import { JSX } from "react";
import FloatingLines from "@/components/FloatingLines";
import Header from "@/components/header";
import Features from "@/pages/catalog/features";
import SecondSection from "@/pages/catalog/second-section";
import { motion } from "motion/react";
import CarouselHero from "@/components/creators-carousel";

export const Route = createFileRoute("/catalog")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(creatorsQueryOptions),

  component: CatalogPage,
});

export interface NavItem {
  name: string;
  link: LinkProps["to"];
  icon?: JSX.Element;
}

const navItems: NavItem[] = [
  { name: "Home", link: "/" },
  { name: "Catalog", link: "/catalog" },
];

function CatalogPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background via-amber-50/40 to-background dark:from-background dark:via-amber-950/30 dark:to-background">
      <Header />

      <main className="relative text-center overflow-hidden">
        <CarouselHero />

        {/* Sections enter with slight stagger */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SecondSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
        >
          <Features />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative"
        >
          {/* Glow above pricing */}
          <div className="pointer-events-none absolute inset-x-0 -top-10 h-32 bg-gradient-to-b from-amber-500/25 via-amber-500/5 to-transparent blur-3xl" />
          <PricingSection />
        </motion.div>
      </main>
    </div>
  );
}

export default CatalogPage;
