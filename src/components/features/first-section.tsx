import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function FeaturesSection({ data, media, meta }) {
  return (
    <section id="features" className="relative w-full py-20">
      {/* Background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-10 h-56 w-[48rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/25 via-primary/10 to-primary/25 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-2">
        {/* Image */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="order-2">
          <div className="group relative overflow-hidden rounded-3xl border bg-muted/20 shadow-2xl ring-1 ring-foreground/10">
            <img src={media.image} alt="Collaboration" className="h-[460px] w-full object-cover" />
            <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border bg-background/90 px-3 py-1 text-xs shadow backdrop-blur">
              <Sparkles className="h-4 w-4" />
              <span>{media.badge}</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-6">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5" />
                <p className="text-muted-foreground">{media.caption}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="rounded-full px-3 py-1">
              {meta.badge}
            </Badge>
            <span className="text-xs text-muted-foreground">{meta.version}</span>
          </div>

          <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            {data.title}
          </h2>

          <p className="max-w-prose text-base leading-relaxed text-muted-foreground md:text-[17px]">{data.description}</p>

          <ul className="grid gap-4 sm:grid-cols-2">
            {data.features.map((f) => (
              <li key={f.title} className="flex items-start gap-3 rounded-xl border p-4">
                <div className="mt-0.5 rounded-md bg-primary/10 p-2 text-primary">{f.icon}</div>
                <div>
                  <h3 className="text-sm font-medium">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
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

            <Card>
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
