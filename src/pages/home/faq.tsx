import { motion } from "framer-motion";

import {
  Zap,
  DollarSign,
  Users,
  BookOpen,
  TrendingUp,
  Bell,
  Target,
} from "lucide-react";
import Faq from "@/components/faq";
import { badgeVariants } from "@/components/ui/badge";
const faqItems = [
  {
    id: "how-works",
    question: "How does the Miami Creators platform actually work?",
    icon: Zap,
    iconColor: "text-blue-500",
    answer: (
      <div className="space-y-4 text-sm sm:text-base text-muted-foreground">
        <p>
          Miami Creators connects brands and creators directly — no agencies, no
          middlemen. We offer two main services:
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="text-base font-semibold text-foreground">
              Catalog Access
            </h4>
            <p className="mt-1">
              Brands access a verified creator catalog and contact creators
              directly. No platform fees, no commissions.
            </p>
          </div>

          <div>
            <h4 className="text-base font-semibold text-foreground">
              Custom Selection
            </h4>
            <p className="mt-1">
              Our team handpicks creators based on campaign goals. Brands then
              collaborate directly with the selected creators.
            </p>
          </div>
        </div>

        <p>
          <span className="font-medium text-foreground">In both cases:</span>{" "}
          creators keep 100% of what they earn.
        </p>
      </div>
    ),
  },
  {
    id: "how-earn",
    question: "How do creators make money?",
    icon: DollarSign,
    iconColor: "text-green-500",
    answer: (
      <div className="space-y-3 text-sm sm:text-base text-muted-foreground">
        <p>
          Creators earn by collaborating directly with brands that discover them
          through the platform.
        </p>
        <p>
          There are no commissions or platform fees —
          <span className="font-medium text-foreground">
            {" "}100% of earnings go to creators.
          </span>
        </p>
      </div>
    ),
  },
  {
    id: "why-join",
    question: "Why is it worth joining the community?",
    icon: Users,
    iconColor: "text-purple-500",
    answer: (
      <div className="space-y-3 text-sm sm:text-base text-muted-foreground">
        <p>
          Miami Creators gives you visibility with local brands and real
          collaboration opportunities.
        </p>
        <p>
          You also become part of a growing community of creators sharing
          insights, deals, and growth strategies.
        </p>
      </div>
    ),
  },
  {
    id: "what-learn",
    question: "What can I learn by joining Miami Creators?",
    icon: BookOpen,
    iconColor: "text-orange-500",
    answer: (
      <div className="space-y-4 text-sm sm:text-base text-muted-foreground">
        <p>You’ll learn how to:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Build a professional creator portfolio</li>
          <li>Negotiate better rates with brands</li>
          <li>Communicate and close deals effectively</li>
          <li>Turn collaborations into long-term partnerships</li>
        </ul>
        <p>
          Everything is designed to help you grow faster and work smarter.
        </p>
      </div>
    ),
  },
  {
    id: "increase-income",
    question:
      "How can Miami Creators help me increase my income (even passively)?",
    icon: TrendingUp,
    iconColor: "text-emerald-500",
    answer: (
      <div className="space-y-3 text-sm sm:text-base text-muted-foreground">
        <p>
          Once listed, brands can find your profile at any time — even while
          you’re offline.
        </p>
        <p>
          A strong profile increases visibility and unlocks recurring
          opportunities.
        </p>
      </div>
    ),
  },
  {
    id: "notifications",
    question: "How will I be notified about new opportunities?",
    icon: Bell,
    iconColor: "text-red-500",
    answer: (
      <div className="space-y-4 text-sm sm:text-base text-muted-foreground">
        <p>You’ll be notified through:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <span className="font-medium text-foreground">Email</span> —
            notifications when new brands join.
          </li>
          <li>
            <span className="font-medium text-foreground">Discord</span> —
            optional community for updates and networking.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "ultimate-goal",
    question: "What’s the ultimate goal of Miami Creators?",
    icon: Target,
    iconColor: "text-cyan-500",
    answer: (
      <div className="space-y-3 text-sm sm:text-base text-muted-foreground">
        <p>
          Our mission is to build the leading creator hub in Miami — where brands
          and creators connect without friction.
        </p>
        <p className="font-medium text-foreground">
          Faster. Fairer. More human. 🌴
        </p>
      </div>
    ),
  },
];


export default function HomeFAQ() {
  return (
    <section
      id="faq"
      className="
        relative  text-foreground w-full max-w-6xl mx-auto
         
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto  px-6 
        text-center
        "
      >
        <h2
          className={badgeVariants({
            variant: "default",
            className:" my-2"
          })}
        >
          Frequently Asked Questions
        </h2>
        <p
          className="

            text-balance
            
            text-4xl md:text-5xl
            leading-tight
            font-bold
          
               
          "
        >
          Everything You Need to Know
        </p>

        <p
          className="
            body
          "
        >
          Welcome to the Miami Creators Community. Here's a full breakdown of
          how the platform works, how you earn, and why being here matters.
        </p>
      </motion.div>

      <Faq faqItems={faqItems} />
    </section>
  );
}
