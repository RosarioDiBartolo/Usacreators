import { motion } from "framer-motion"; 
import {
  Users,
  BadgeDollarSign,
  CheckCircle,
  ListChecks,
  Search,
  Timer,
  Workflow,
} from "lucide-react";
import Faq from "@/components/faq";
 const brandFaqItems = [
  {
    id: "how-find-creators",
    question: "How does Miami Creators help brands find creators?",
    icon: Search,
    iconColor: "text-blue-500",
    answer: (
      <div className="space-y-4 text-muted-foreground">
        <p>
          Miami Creators gives brands direct access to verified local creators —
          no agencies, no intermediaries, no added fees.
        </p>

        <p>
          You can either browse our catalog and contact creators yourself, or let
          our team handpick a curated list based on your campaign needs.
        </p>

        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Catalog Access:</strong> Browse, filter, and contact creators
            instantly.
          </li>
          <li>
            <strong>Custom Selection:</strong> Tell us your niche, age range,
            budget, and content style — we deliver a curated list.
          </li>
        </ul>
      </div>
    ),
  },

  {
    id: "catalog-vs-custom",
    question: "What is the difference between Catalog Access and Custom Selection?",
    icon: ListChecks,
    iconColor: "text-purple-500",
    answer: (
      <div className="space-y-4 text-muted-foreground">
        <div>
          <h4 className="font-semibold text-foreground">Catalog Access</h4>
          <p>
            Full access to our verified creator database. Each profile includes
            niche, style, rates, and contact information so you can reach out
            instantly.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground">Custom Selection</h4>
          <p>
            Our team selects the best creators for your campaign based on audience,
            aesthetic, niche, age range, and budget. You receive a curated list in
            3–5 business days.
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "how-collabs-work",
    question: "How do collaborations work after finding a creator?",
    icon: Workflow,
    iconColor: "text-orange-500",
    answer: (
      <div className="space-y-3 text-muted-foreground">
        <p>
          After choosing a creator, you contact them directly using the details in
          their catalog profile.
        </p>
        <p>
          You manage communication, payment, contracts, and deliverables freely.
          Miami Creators does not interfere, take commissions, or mediate deals.
        </p>
      </div>
    ),
  },

  {
    id: "fees",
    question: "Do brands pay a fee or commission per collaboration?",
    icon: BadgeDollarSign,
    iconColor: "text-green-500",
    answer: (
      <div className="space-y-3 text-muted-foreground">
        <p>No commissions. No hidden fees.</p>
        <p>
          You pay once for Catalog Access or once for a Custom Selection service.
          After that, you can work with unlimited creators without extra costs.
        </p>
      </div>
    ),
  },

  {
    id: "verified",
    question: "Are all creators verified?",
    icon: CheckCircle,
    iconColor: "text-emerald-500",
    answer: (
      <div className="space-y-3 text-muted-foreground">
        <p>
          Yes — every creator is manually verified to ensure they are active,
          authentic, local, and producing content at a quality suitable for brands.
        </p>
      </div>
    ),
  },

  {
    id: "types-creators",
    question: "What kind of creators can I find on Miami Creators?",
    icon: Users,
    iconColor: "text-cyan-500",
    answer: (
      <div className="space-y-3 text-muted-foreground">
        <p>
          Our catalog includes Miami-based creators across multiple niches:
          lifestyle, beauty, fashion, fitness, hospitality, food, travel, and more.
        </p>
        <p>
          You’ll find UGC creators, nano influencers, micro influencers, and
          mid-tier profiles.
        </p>
      </div>
    ),
  },

  {
    id: "how-long",
    question: "How long does it take to find creators?",
    icon: Timer,
    iconColor: "text-red-500",
    answer: (
      <div className="space-y-3 text-muted-foreground">
        <p>
          <strong>Catalog Access:</strong> Instant — you can contact creators right
          after purchasing access.
        </p>
        <p>
          <strong>Custom Selection:</strong> Our team delivers a curated list
          within 3–5 business days.
        </p>
      </div>
    ),
  },
];


export default function CatalogFAQ() {
  return (
    <section
      id="catalog-faq"
      className=" 
      relative w-full max-w-7xl mx-auto 
    section-padding 
     text-center
    "
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-6 mb-12"
      >
         
        <div className=" ">
          <h2 className="
            bg-text
            bg-linear-to-b from-secondary via-amber-900 to-amber-950 relative !mt-0"> 
            Got any questions?
  
          </h2>
          <p className="text-base leading-relaxed max-w-3xl mx-auto ">
            Here's a full breakdown of
            the services we offer,how the platform works, how you earn, and how we can help your business grow.
          </p>
        </div>
      </motion.div>

       <Faq faqItems={brandFaqItems}/>
    </section>
  );
}
