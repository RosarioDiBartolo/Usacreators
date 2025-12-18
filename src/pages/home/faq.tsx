import { motion } from "framer-motion"; 
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
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
const faqItems = [
  {
    id: "how-works",
    question: "How does the Miami Creators platform actually work?",
    icon: Zap,
    iconColor: "text-blue-500",
    answer: (
      <div className="  text-muted-foreground">
        <p>
          Miami Creators connects brands and creators directly — no agencies, no
          middlemen. We offer two main services for companies looking to
          collaborate with local talent:
        </p>
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-foreground">Catalog Access</h4>
            <p>
              Brands can purchase access to our creator catalog, view verified
              profiles, and contact creators directly using the contact details
              provided. No platform fees or commissions — just direct
              collaborations between brands and creators.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Custom Selection</h4>
            <p>
              For brands that want extra support, our team handpicks creators
              that match their campaign goals — whether it’s niche, style,
              audience, or budget. Once selected, brands contact the creators
              directly to negotiate and collaborate.
            </p>
          </div>
        </div>
        <p>
      <span className="font-medium text-foreground">In both cases:</span>{" "}
      brands contact creators directly, and creators keep 100% of what they earn.
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
      <div className="space-y-3 text-muted-foreground">
        <p>
          Creators earn by collaborating directly with brands that discover them
          through our catalog or selection process. There are no commissions, no
          platform fees, and no cuts — 100% of your earnings go to you.
        </p>
        <p>
          You get paid for the content you create: UGC videos, TikToks, product
          reviews, lifestyle photos, and more.
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
      <div className="space-y-3 text-muted-foreground">
        <p>
          Miami Creators gives you real exposure and local credibility. Every
          time a brand joins our platform, you gain new potential collaborations
          and more visibility in the Miami creator scene.
        </p>
        <p>
          Beyond deals, you’ll also be part of a growing community of creators
          sharing insights, tips, and opportunities to grow together.
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
      <div className="space-y-3 text-muted-foreground">
        <p>You’ll learn how to:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Build a professional creator portfolio</li>
          <li>Negotiate better rates with brands</li>
          <li>Communicate and close deals effectively</li>
          <li>Turn one-time collaborations into long-term partnerships</li>
        </ul>
        <p>
          Our community and resources are built to help creators grow faster and
          work smarter.
        </p>
      </div>
    ),
  },
  {
    id: "increase-income",
    question: "How can Miami Creators help me increase my income (even passively)?",
    icon: TrendingUp,
    iconColor: "text-emerald-500",
    answer: (
      <div className="space-y-3 text-muted-foreground">
        <p>
          Once you’re listed in the catalog, brands can find your profile anytime
          — even while you’re offline. That means your presence can generate new
          paid opportunities passively.
        </p>
        <p>
          The more active and professional you are, the more visible you become
          to companies joining our network, increasing your chances for ongoing
          collaborations.
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
      <div className="space-y-3 text-muted-foreground">
        <p>You’ll be notified in two main ways:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Email notifications</strong> → whenever new brands or
            campaigns join the platform.
          </li>
          <li>
            <strong>Discord community</strong> → optional space where creators
            can connect, share experiences, and stay updated with the latest
            collaborations.
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
      <div className="space-y-3 text-muted-foreground">
        <p>
          Our mission is to build the leading creator hub in Miami, where
          authentic creators and brands connect easily — without fees, barriers,
          or intermediaries.
        </p>
        <p>
          We’re here to make collaborations faster, fairer, and more human. 🌴
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
        relative w-full max-w-7xl mx-auto
         
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl text-center"
      >
        <h2
          className="
             text-balance
             
           
            bg-clip-text text-transparent
            bg-linear-to-b from-orange-900   to-foreground
          "
        >
          Everything You Need to Know
        </h2>

        <p
          className="
            mt-4
            text-pretty
            text-base
            sm:text-lg
            leading-relaxed
            text-foreground
          "
        >
          Welcome to the Miami Creators Community. Here's a full breakdown of how
          the platform works, how you earn, and why being here matters.
        </p>
      </motion.div>

      <div className="mt-10">
        <Faq faqItems={faqItems} />
      </div>
    </section>
  );
}
