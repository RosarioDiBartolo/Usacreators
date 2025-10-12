import Thumbnail from "@/assets/good-faces-T4p72-fc2_A-unsplash.jpg";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  Link2,
  ShieldCheck,
  Sparkles,
  Zap,
  Layers,
  Compass,
  Cpu,
  Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Globe2 className="h-5 w-5" aria-hidden />,
      title: "Cross‑platform reach",
      desc: "Publish once across web, mobile, and AR.",
    },
    {
      icon: <Link2 className="h-5 w-5" aria-hidden />,
      title: "Seamless linking",
      desc: "Deep links that just work—share and track.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5" aria-hidden />,
      title: "Privacy‑first",
      desc: "GDPR‑ready with roles and encryption.",
    },
    {
      icon: <Zap className="h-5 w-5" aria-hidden />,
      title: "Real‑time sync",
      desc: "Instant updates with conflict‑free merges.",
    },
  ];

  const moreFeatures = [
    {
      icon: <Layers className="h-5 w-5" aria-hidden />,
      title: "Composable blocks",
      desc: "Drag‑and‑drop building blocks for rapid shipping.",
    },
    {
      icon: <Compass className="h-5 w-5" aria-hidden />,
      title: "Guided onboarding",
      desc: "Opinionated defaults; customize when you need.",
    },
    {
      icon: <Cpu className="h-5 w-5" aria-hidden />,
      title: "Edge‑ready",
      desc: "Streamed rendering and smart caching at the edge.",
    },
    {
      icon: <Timer className="h-5 w-5" aria-hidden />,
      title: "Usage analytics",
      desc: "Understand behavior with privacy‑safe insights.",
    },
  ];

  const stats = [
    { label: "Avg. setup time", value: "< 7 min" },
    { label: "Active orgs", value: "12k+" },
    { label: "Uptime", value: "99.99%" },
  ];

  return (
    <>
      {/* SECTION 1 — Original (image right) */}
      <section id="features" className="relative w-full py-20  ">
        {/* Background glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-10 h-56 w-[48rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/25 via-primary/10 to-primary/25 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-2">
          {/* Media */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-2 lg:order-2"
          >
            <div className="group relative overflow-hidden rounded-3xl border bg-muted/20 shadow-2xl ring-1 ring-foreground/10">
              <img
                src={Thumbnail}
                alt="People collaborating between digital and physical worlds"
                className="h-[460px] w-full object-cover"
              />

              {/* Corner badge */}
              <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border bg-background/90 px-3 py-1 text-xs shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <Sparkles className="h-4 w-4" aria-hidden />
                <span>New: Spaces 2.0</span>
              </div>

              {/* Bottom ribbon */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-6">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5" aria-hidden />
                  <p className="text-muted-foreground">Verified creators • Real‑time presence</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="order-1 flex flex-col gap-6 lg:order-1"
          >
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-full px-3 py-1">
                Built for creators
              </Badge>
              <span className="text-xs text-muted-foreground">v3.4</span>
            </div>

            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                We connect realities
              </span>
            </h2>

            <p className="max-w-prose text-base leading-relaxed text-muted-foreground md:text-[17px]">
              Create living experiences that bridge physical and digital. Onboard in minutes,
              go live everywhere, and keep full control over your brand, data, and monetization.
            </p>

            {/* Feature list */}
            <ul className="grid gap-4 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f.title} className="flex items-start gap-3 rounded-xl border p-4">
                  <div className="mt-0.5 rounded-md bg-primary/10 p-2 text-primary">{f.icon}</div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium leading-none">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA & Social proof */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button className="h-11 gap-2 text-base">
                Get started
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button variant="outline" className="h-11 text-base">
                See how it works
              </Button>
            </div>

            {/* Stats + Guarantee card */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid grid-cols-3 gap-3 rounded-2xl border p-4">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-lg font-semibold">{s.value}</div>
                    <div className="text-[11px] text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>

              <Card className="overflow-hidden">
                <CardContent className="flex items-start gap-3 p-4">
                  <div className="rounded-md bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="h-5 w-5" aria-hidden />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">No lock‑in</p>
                    <p className="text-sm text-muted-foreground">Export anytime. Your data, your rules.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
                <div className="bg-gradient-to-t from-orange-500 to-orange-700  text-primary-foreground"> 
      {/* SECTION 2 — Mirrored (image left) */}
      <section className="relative w-full py-20  ">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-2">
          {/* Media left */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <div className="relative overflow-hidden rounded-3xl border bg-muted/20 shadow-2xl ring-1 ring-foreground/10">
              <img src={Thumbnail} alt="Showcasing product in action" className="h-[420px] w-full object-cover" />
              <div className="absolute left-4 top-4 rounded-full border bg-background/90 px-3 py-1 text-xs shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
                Beta access
              </div>
            </div>
          </motion.div>

          {/* Content right */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="order-1 flex flex-col gap-6 lg:order-2"
          >
            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">From idea to live in days, not weeks</h3>
            <p className="max-w-prose text-stone-300">
              Templates, presets, and integrations help you ship faster. Start simple and scale
              when you need—without rewriting your stack.
            </p>

            <ul className="grid gap-4 sm:grid-cols-2">
              {moreFeatures.map((f) => (
                <li key={f.title} className="flex bg-white/20 items-start gap-3 rounded-xl border p-4">
                  <div className="mt-0.5 rounded-md bg-primary p-2 text-primary-foreground">{f.icon}</div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium leading-none">{f.title}</h4>
                    <p className="text-sm text-stone-300">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex gap-3">
              <Button variant="outline" className="h-11 text-base">Browse templates</Button>
              <Button className="h-11 gap-2 text-base">
                Start building
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — Feature Showcase grid */}
      <section className="w-full py-16   ">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight md:text-3xl bg-clip-text text-transparent bg-gradient-to-t from-stone-400 to-stone-100">What makes it different</h3>
              <p className="mt-2 max-w-prose text-stone-300">A focused set of capabilities to get you from 0 → 1 → scale without friction.</p>
            </div>
            <Button variant="ghost" className="hidden sm:inline-flex bg-clip-text text-transparent bg-gradient-to-t from-stone-400 to-stone-100">
              Explore docs <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Zap className="h-5 w-5" aria-hidden />,
                title: "Live preview",
                desc: "See changes instantly across environments with hot‑swap deploys.",
              },
              {
                icon: <ShieldCheck className="h-5 w-5" aria-hidden />,
                title: "Role‑based access",
                desc: "Granular permissions for teams, clients, and guests.",
              },
              {
                icon: <Layers className="h-5 w-5" aria-hidden />,
                title: "Blocks marketplace",
                desc: "Install audited community components in one click.",
              },
              {
                icon: <Compass className="h-5 w-5" aria-hidden />,
                title: "Content modeling",
                desc: "Design structures once, reuse across apps and surfaces.",
              },
              {
                icon: <Cpu className="h-5 w-5" aria-hidden />,
                title: "AI assistants",
                desc: "Generate copy, transform media, and automate workflows.",
              },
              {
                icon: <Timer className="h-5 w-5" aria-hidden />,
                title: "Backed SLAs",
                desc: "Enterprise‑grade reliability with proactive monitoring.",
              },
            ].map((f) => (
              <Card key={f.title} className="group">
                <CardContent className="flex gap-3 p-5">
                  <div className="rounded-md bg-primary/10 p-2 text-primary">{f.icon}</div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium leading-none">{f.title}</h4>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
       </div>
    </>
  );
}
