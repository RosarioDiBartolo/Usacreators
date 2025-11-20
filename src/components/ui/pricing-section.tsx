import {
  ModernPricingPage,
  PricingCardProps,
} from "@/components/pricing/animated-glassy-pricing";

const myPricingPlans: PricingCardProps[] = [
  {
    planName: "Basic",
    description: "Perfect for personal projects and hobbyists.",
    price: "0",
    features: ["1 User", "1GB Storage", "Community Forum"],
    buttonText: "Get Started",
    buttonVariant: "secondary",
  },
  {
    planName: "Team",
    description: "Collaborate with your team on multiple projects.",
    price: "49",
    features: [
      "10 Users",
      "100GB Storage",
      "Email Support",
      "Shared Workspaces",
    ],
    buttonText: "Choose Team Plan",
    isPopular: true,
    buttonVariant: "primary",
  },
  {
    planName: "Agency",
    description: "Manage all your clients under one roof.",
    price: "149",
    features: [
      "Unlimited Users",
      "1TB Storage",
      "Dedicated Support",
      "Client Invoicing",
    ],
    buttonText: "Contact Us",
    buttonVariant: "primary",
  },
];

const PricingSection = () => {
  return (
    <section className="relative w-full   ">
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-32 bg-gradient-to-b from-amber-500/25 via-amber-500/5 to-transparent blur-3xl" />
      <ModernPricingPage
        title={
          <>
            Find the <span className="text-tertiary">Perfect Plan</span> for
            Your Business
          </>
        }
        subtitle="Start for free, then grow with us. Flexible plans for projects of all sizes."
        plans={myPricingPlans}
        showAnimatedBackground={true}
      />
    </section>
  );
};

export default PricingSection;
