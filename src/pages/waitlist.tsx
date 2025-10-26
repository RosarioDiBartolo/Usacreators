import { useState } from "react";
import { motion } from "framer-motion";
import WaitlistForm from "@/components/waitlist-form";
import CountdownTimer from "@/components/countdown-timer";
import RandomCircles from "@/components/ui/random-circles";
import { HeroSection } from "@/components/ui/carousel";
import { CheckCircle2, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

function WaitlistPage() {
  const [signedUp, setSignedUp] = useState(false);
  const [remainingSpots] = useState(() => Math.floor(Math.random() * 50) + 25);

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="relative w-screen min-h-screen bg-gradient-to-b from-secondary to-secondary/80 text-foreground">
      <RandomCircles count={12} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6 lg:px-8 pt-20 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

        <motion.div
          className="relative z-10 w-full max-w-6xl mx-auto"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text & Form */}
            <div className="text-center lg:text-left">
              <motion.div
                className="mb-6 inline-block"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 text-primary font-semibold text-sm">
                  Launching Soon
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                Get Whitelisted:<br />
                <span className="bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
                  The Miami Creator Catalog
                </span>
              </h1>

              <motion.p
                className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed"
                variants={itemVariants}
              >
                Stop wasting time on generic platforms. Get early access to the exclusive directory connecting local brands with Miami's top creators.
              </motion.p>

              <motion.div
                className="relative z-20 max-w-sm mx-auto lg:mx-0"
                variants={itemVariants}
              >
                <WaitlistForm onSuccess={() => setSignedUp(true)} />
              </motion.div>
            </div>

            {/* Carousel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-fit"
            >
              <HeroSection
                heroTitle=""
                subtitle=""
                images={[
                  {
                    src: "https://images.pexels.com/photos/8368744/pexels-photo-8368744.jpeg",
                    alt: "Young adults recording an energetic video with smartphones",
                  },
                  {
                    src: "https://images.pexels.com/photos/5325763/pexels-photo-5325763.jpeg",
                    alt: "Vibrant group of teenagers in colorful outfits posing with accessories",
                  },
                  {
                    src: "https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg",
                    alt: "Diverse content creators collaborating together",
                  },
                  {
                    src: "https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg",
                    alt: "Young creators using smartphones for content creation",
                  },
                ]}
                className="!bg-transparent !p-0 !min-h-auto"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Value Proposition Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8">
        <motion.div
          className="max-w-5xl mx-auto"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-16">
            Why Join the Miami Creators Founders' Circle?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-10 h-10" />,
                title: "First to Be Seen",
                description:
                  "Your profile is automatically highlighted to local brands for the first 90 days.",
              },
              {
                icon: <Users className="w-10 h-10" />,
                title: "Shape the Platform",
                description:
                  "Direct channel to the developers to request the features you actually need.",
              },
              {
                icon: <CheckCircle2 className="w-10 h-10" />,
                title: "Private Networking",
                description:
                  "Exclusive invite to our private Telegram group for early collaborators and feedback.",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors"
                variants={itemVariants}
                custom={index * 0.2}
              >
                <div className="text-primary mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Problem/Solution Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-secondary/50 via-secondary to-secondary/50">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white text-left mb-12">
            Stop Wasting Time on Generic Gigs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              className="space-y-6 flex flex-col justify-start items-start"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold text-white mb-5">The Problem</h3>
              <p className="text-lg text-white/70 leading-relaxed">
                Tired of low-ball offers from brands outside of Miami who don't understand your local audience? Generic platforms treat all creators the same, ignoring the unique culture and value of Miami's creative community.
              </p>
              <ul className="space-y-3">
                {[
                  "Competing with thousands of generic profiles",
                  "Brands who don't get local culture",
                  "Hidden in algorithm-driven feeds",
                  "No control over how you're discovered",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-white/70">
                    <span className="text-destructive mt-1">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="space-y-6"
              variants={itemVariants}
              custom={0.2}
            >
              <h3 className="text-2xl font-bold text-white mb-5">The Solution</h3>
              <p className="text-lg text-white/70 leading-relaxed">
                Connect directly with vetted, serious Miami-based businesses looking for local influence. Our platform celebrates the unique content culture of South Florida and connects you with brands that actually understand your audience.
              </p>
              <ul className="space-y-3">
                {[
                  "Curated local brand connections",
                  "Brands who understand Miami culture",
                  "Authentic partnership opportunities",
                  "Transparent, fair collaboration terms",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-white/70">
                    <span className="text-primary mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Urgency & Scarcity Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Launch in T-minus...
            </h2>
            <p className="text-xl text-white/70">
              Spots are extremely limited. Priority access will be granted on a first-come, first-served basis.
            </p>
          </div>

          <div className="bg-gradient-to-b from-white/10 to-white/5 rounded-3xl p-12 border border-white/10">
            <CountdownTimer />
          </div>

          <motion.div
            className="text-center mt-12"
            variants={itemVariants}
          >
            <p className="text-lg font-semibold text-primary mb-6">
              Only {remainingSpots} early access spots remaining
            </p>
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-amber-400 rounded-full blur-xl opacity-30" />
              <p className="relative text-white/80">
                Don't miss your chance to shape the future of creator collaboration in Miami.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Creator Promise Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-transparent to-tertiary/10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="bg-white/5 border border-white/10 rounded-2xl p-10 md:p-14"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
              Built By Creators, For Miami
            </h2>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed -mt-1">
              Our goal is simple: to create the most efficient, transparent, and high-quality collaboration platform that actually celebrates the unique content culture of South Florida. We're not just another platform—we're built by creators who understand the Miami community.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer CTA Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h3 className="text-3xl md:text-4xl font-black text-white mb-6">
            Ready to Secure Your Spot?
          </h3>

          <p className="text-lg text-white/70 mb-10">
            Join hundreds of Miami creators on the waitlist and be among the first to access the platform.
          </p>

          {!signedUp ? (
            <div className="max-w-lg mx-auto">
              <WaitlistForm onSuccess={() => setSignedUp(true)} />
            </div>
          ) : (
            <motion.div
              className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-2xl p-10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle2 className="w-16 h-16 mx-auto text-primary mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">
                You're In!
              </h3>
              <p className="text-white/70 mb-6">
                Check your email for confirmation and exclusive updates about the launch.
              </p>
              <Button variant="default" size="lg" className="rounded-full">
                Share with Fellow Creators
              </Button>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Background gradient accent */}
      <div className="fixed top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl -z-10" />
      <div className="fixed bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-primary/5 to-transparent rounded-full blur-3xl -z-10" />
    </div>
  );
}

export default WaitlistPage;
