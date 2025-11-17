import CreatorsCarousel from "@/components/creators-carousel";
import { creatorsQueryOptions } from "@/lib/creators/get-creators";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import PricingSection from "@/components/ui/pricing-section";
export const Route = createFileRoute("/catalog")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(creatorsQueryOptions),

  component: CatalogPage,
});

function CatalogPage() {
  const { data: creators } = useSuspenseQuery(creatorsQueryOptions);

  return (
    <>
       <main className=" pt-20  text-center">
        <h2>We already acquired the best content creators.</h2>
        <h1>You just have to choose...</h1>
        <CreatorsCarousel creators={creators} />
        <Button size={"2xl"}>Find the creator for your need.</Button>
        <div className=" relative">
          <PricingSection />
        </div>
      </main>
    </>
  );
}
