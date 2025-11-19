import CreatorsCarousel from "@/components/creators-carousel";
import { creatorsQueryOptions } from "@/lib/creators/get-creators";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import PricingSection from "@/components/ui/pricing-section";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { cn } from "@/lib/fe-utils";
export const Route = createFileRoute("/catalog")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(creatorsQueryOptions),

  component: CatalogPage,
});

import { LinkProps } from "@tanstack/react-router";
import { JSX } from "react";
import FloatingLines from "@/components/FloatingLines";
import Header from "@/components/header";
import Features from "@/pages/catalog/features";
import SecondSection from "@/pages/catalog/second-section";
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
  const { data: creators } = useSuspenseQuery(creatorsQueryOptions);

  return (
    <div className=" relative">
      <Header />
      {/* <FloatingNav>
        {navItems.map((navItem, idx) => (
          <Link
            key={`link=${idx}`}
            to={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}
        <Link
          to="/creators/apply"
          className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"
        >
          <span>Apply as a Creator</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </Link>
      </FloatingNav> */}

      <main
        className=" text-center
   "
      >
        <div className="  relative section-padding">
          <FloatingLines
            enabledWaves={["top", "middle", "bottom"]}
            // Array - specify line count per wave; Number - same count for all waves
            lineCount={[10, 15, 20]}
            // Array - specify line distance per wave; Number - same distance for all waves
            lineDistance={[8, 6, 4]}
            bendRadius={5.0}
            bendStrength={-0.5}
            interactive={true}
            parallax={true}
          />
          <div className=" relative z-10">
            <p className="tracking-wide bg-clip-text text-transparent bg-gradient-to-b from-amber-700 to-amber-900 text-sm uppercase">
              For Miami brands, agencies & bars
            </p>
            <h2  >
              The only up-to-date catalog of vetted Miami content creators you
              can plug into your campaigns today.
            </h2>


            <CreatorsCarousel creators={creators} />
            {/* <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Get instant access to hand-picked creators with contact info,
              niche, platform stats, pricing ranges, and example deliverables —
              without spending hours on Instagram and TikTok.
            </p> */}
          </div>
        </div>
        <SecondSection />
        <Features />

        <div className=" relative">
          <PricingSection />
        </div>
      </main>
    </div>
  );
}
