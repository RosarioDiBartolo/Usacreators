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
      <FloatingNav>
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
      </FloatingNav>

      <main className="section section-padding text-center
 container mx-auto   " >

        <p className=" text-3xl">
          You just have to choose.
        </p>
        <h2
          className="
           max-w-4xl mx-auto
          bg-clip-text text-transparent 
          bg-gradient-to-b from-foreground via-amber-900 to-amber-950
          "
        >
          A curated collection of content creators and influencers from miami
        </h2>

          <h1>Take a  <span className=" bg-text bg-gradient">look</span></h1>

        <CreatorsCarousel creators={creators} />
        <Button size={"2xl"}>Explore the whole Catalog</Button>
        <div className=" relative">
          <PricingSection />
        </div>
      </main>
    </div>
  );
}
