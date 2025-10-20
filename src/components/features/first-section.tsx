import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Carousel from "../carousel";

export default function FeaturesSection({ data, media, meta }) {
  return (
    <section id="features" className="relative w-full py-20">
      {/* Background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-10 h-56 w-[48rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/25 via-primary/10 to-primary/25 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-3">
        {/* Image */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="">
          <Carousel/>
        </motion.div>

        {/* Text */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="flex flex-col gap-3 col-span-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="rounded-full px-3 py-1">
              {meta.badge}
            </Badge>
            <span className="text-xs text-muted-foreground">{meta.version}</span>
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            {data.title}
          </h2>

          <p className=" ">{data.description}</p>

          <ul className="grid gap-4 sm:grid-cols-2">
            {data.features.map((f) => (
              <li key={f.title} className="flex items-start gap-3 rounded-xl border p-4">
                <div className="mt-0.5 rounded-md bg-primary/10 p-2 text-primary">{f.icon}</div>
                <div>
                  <h3 className=" font-bold">{f.title}</h3>
                  <p className=" text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="h-11 gap-2 text-base">
              {data.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-11 text-base">
              {data.ctaSecondary}
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid grid-cols-3 gap-3 rounded-2xl border p-4">
              {data.stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-lg font-semibold">{s.value}</div>
                  <div className="text-[11px] text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>

            <Card className="">
              <CardContent className="flex items-start gap-3 p-4">
                <div className="rounded-md bg-emerald-500/10 p-2 text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">No lock-in</p>
                  <p className="text-sm text-muted-foreground">Export anytime. Your data, your rules.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
