import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Zap, DollarSign, Users, BookOpen, TrendingUp, MessageSquare, Bell, Target } from "lucide-react";

const faqItems = [
  {
    id: "how-works",
    question: "How does the Miami Creators platform actually work?",
    icon: Zap,
    iconColor: "text-blue-500",
    answer: (
      <div className="space-y-4 text-muted-foreground">
        <p>
          Miami Creators connects local brands and real creators. We offer two
          main services to companies that want to work with creators like you:
        </p>
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-foreground">
              Catalog Access (Standard Plan)
            </h4>
            <p>
              Brands can purchase access to our creator catalog, where they can
              directly view your profile, niche, location, contact details, and
              rates. Once they have access, they can reach out to you directly,
              no middlemen, no fees, full transparency. Every time a brand
              joins, we'll notify all members here on Discord and through email,
              sharing the brand's contact info so you can reach out if you're
              interested.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">
              Custom Selection (Premium Plan)
            </h4>
            <p>
              Some brands prefer that we personally select the right creators
              for them. They tell us exactly what they're looking for, for
              example: "We need a 22–30-year-old brunette female creator who
              makes lifestyle UGC and charges up to $200 per video." In that
              case, we post the opportunity inside the specific-brand-requests
              channel and send an email with all the details. If you match the
              description, you can apply directly.
            </p>
          </div>
        </div>
        <p>
          <strong>In short:</strong> Standard: brand contacts creators. Premium:
          we choose and connect the creators.
        </p>
      </div>
    ),
  },
  {
    id: "how-earn",
    question: "How do creators make money?",
    answer: (
      <div className="space-y-3 text-muted-foreground">
        <p>
          You earn directly from the brands that contact you or select you. We
          don't take commissions, fees, or percentages, 100% of your payment
          goes to you.
        </p>
        <p>
          Depending on the campaign, you'll be paid for UGC videos, TikToks,
          product reviews, photo content, or collaborations.
        </p>
      </div>
    ),
  },
  {
    id: "why-active",
    question: "Why is it worth staying active in this community?",
    answer: (
      <div className="space-y-3 text-muted-foreground">
        <p>
          Because you'll be the first to know when new brands enter our
          ecosystem. Whenever a new company buys catalog access, we announce it
          here and send you all the contact details, this way, you can reach
          out before anyone else.
        </p>
        <p>
          And when a premium brand deal comes in, we only post it here. Staying
          active = faster access to deals, more visibility, and better
          networking opportunities with other creators living the same Miami
          energy.
        </p>
      </div>
    ),
  },
  {
    id: "what-learn",
    question: "What can I learn inside this community?",
    answer: (
      <div className="space-y-3 text-muted-foreground">
        <p>
          This isn't just a directory, it's a real creator hub. Here you'll
          learn how to:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Improve your UGC structure and portfolio</li>
          <li>Grow your TikTok/Instagram organically</li>
          <li>Turn one brand deal into recurring monthly income</li>
        </ul>
      </div>
    ),
  },
  {
    id: "increase-income",
    question:
      "How can this help me increase my income (even passively)?",
    answer: (
      <div className="space-y-3 text-muted-foreground">
        <p>
          Once you're part of the platform, brands can discover your profile
          24/7 through the catalog. Even while you're not online, your profile
          works for you, generating visibility and new paid opportunities
          automatically.
        </p>
        <p>
          Plus, the most active and reliable creators in this community are
          featured more often to brands who ask for recommendations. That means
          more campaigns and higher chances of direct brand contacts over time.
        </p>
      </div>
    ),
  },
  {
    id: "brand-requests-channel",
    question: "How does the \"specific-brand-requests\" channel work?",
    answer: (
      <div className="space-y-3 text-muted-foreground">
        <p>
          This channel is only used for premium campaigns, where we handle the
          creator selection process. We'll post detailed descriptions of what
          the brand is looking for (age, niche, payment range, style, etc.) and
          you'll be able to apply directly if you fit the profile.
        </p>
        <p>After that, we send your info straight to the brand for review.</p>
      </div>
    ),
  },
  {
    id: "notifications",
    question: "How will I be notified about new opportunities?",
    answer: (
      <div className="space-y-3 text-muted-foreground">
        <p>You'll be updated in two ways:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Discord announcements</strong> → when new brands or
            campaigns join.
          </li>
          <li>
            <strong>Email notifications</strong> → for both catalog updates and
            premium brand requests.
          </li>
        </ul>
        <p>So even if you're not online, you'll never miss a deal.</p>
      </div>
    ),
  },
  {
    id: "ultimate-goal",
    question: "What's the ultimate goal of Miami Creators?",
    answer: (
      <div className="space-y-3 text-muted-foreground">
        <p>
          To become the #1 creator network in Miami, helping local creators
          grow, connect, and get paid, without agencies taking cuts. We're not
          just a middleman. We're building a movement where creators win by
          working smarter, together.
        </p>
      </div>
    ),
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative w-full py-20">
      {/* Background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/3 top-10 h-56 w-[48rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/25 via-primary/10 to-primary/25 blur-3xl" />
      </div>

      <div className="w-full px-5 md:px-10 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-2 mb-12 max-w-4xl"
        >
          <Badge variant="secondary" className="rounded-full px-3 py-1 w-fit">
            Frequent Asked Qusetions
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
            Everything You Need to Know
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Welcome to the Miami Creators Community. Here's a full breakdown of
            how the platform works, how you earn, and why being here matters.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border border-accent/20 rounded-lg bg-gradient-to-br from-accent/5 to-tertiary/10 overflow-hidden transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:bg-gradient-to-br hover:from-accent/10 hover:to-tertiary/15"
              >
                <AccordionTrigger className="px-6 py-4 font-semibold text-foreground hover:no-underline text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-0">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
