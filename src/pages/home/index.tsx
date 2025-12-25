import { lazy, Suspense } from "react";
import Footer from "@/pages/home/footer";
import Hero from "@/pages/home/hero";
import Header from "@/pages/home/header";
import {
  ModernPricingPage,
  type PricingCardProps,
} from "@/components/pricing/animated-glassy-pricing";
import SkeletonLoader from "@/components/ui/skeleton-loader";

const Videos = lazy(() => import("@/pages/home/videos"));
const Features = lazy(() => import("@/pages/home/features"));
const FAQ = lazy(() => import("@/pages/home/faq"));
const CreatorsBrands = lazy(() => import("@/pages/home/creator-brand"));

const plans: PricingCardProps[] = [
  {
    planName: "Basic",
    description: "For starters who want to experience the future.",
    price: "29",
    features: ["AI-powered chatbot", "Basic analytics", "Email support"],
    buttonText: "Get Started",
    buttonVariant: "secondary",
  },
  {
    planName: "Pro",
    description: "For creators who want to take it to the next level.",
    price: "79",
    features: [
      "Everything in Basic",
      "Advanced AI capabilities",
      "Priority support",
      "Integration APIs",
    ],
    buttonText: "Go Pro",
    isPopular: true,
  },
  {
    planName: "Enterprise",
    description: "For large-scale businesses with custom needs.",
    price: "Custom",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom feature development",
      "On-premise deployment",
    ],
    buttonText: "Contact Us",
    buttonVariant: "secondary",
  },
];

function Home() {
  return (
    <>
      <Header />

      <main className="flex flex-col gap-y-24">
        <Hero />
        <Suspense fallback={<SkeletonLoader />}>
          <Videos />
        </Suspense>

        <Suspense fallback={<SkeletonLoader />}>
          <Features />
        </Suspense>
        <section id="pricing">
          <ModernPricingPage
            title="Pricing Plans"
            subtitle="Choose the best plan for your needs. All plans come with a 7-day free trial."
            plans={plans}
          />
        </section>
        <Suspense fallback={<SkeletonLoader />}>
          <FAQ />
        </Suspense>
        <Suspense fallback={<SkeletonLoader />}>
          <CreatorsBrands />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default Home;
