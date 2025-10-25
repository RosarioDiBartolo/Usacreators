import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Carousel from "../carousel";
import type { JSX } from "react";

export default function FeaturesSection({
  data,
  meta,
}: {
  data: {
    title: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    features: {
      icon: JSX.Element;
      title: string;
      desc: string;
    }[];
    stats: {
      label: string;
      value: string;
    }[];
  };
  meta: {
    version: string;
    badge: string;
  };
}) {
  return (
    <section
      id="features"
      className=" flex flex-col justify-center gap-12"
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none  absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-10 h-56 w-[48rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/25 via-primary/10 to-primary/25 blur-3xl" />
      </div>

      <div className="w-full lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl w-full lg:order-2 overflow-hidden px-4 mx-auto"
        >
          <Carousel />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-6 lg:order-1 w-full"
        >
          <div className="flex items-center gap-2 w-full">
            <Badge variant="secondary" className="rounded-full px-3 py-1">
              {meta.badge}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {meta.version}
            </span>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
              {data.title}
            </h2>

            <p className="text-base leading-relaxed text-muted-foreground">
              {data.description}
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {data.features.map((f) => (
              <li
                key={f.title}
                className="flex items-start gap-3 rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 to-tertiary/10 p-5 transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:bg-gradient-to-br hover:from-accent/10 hover:to-tertiary/15"
              >
                <div className="rounded-lg bg-primary/10 p-3 text-primary flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-foreground text-base font-semibold">
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row pt-2">
            <Button className="h-11 gap-2 text-base rounded-lg">
              {data.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-11 text-base rounded-lg">
              {data.ctaSecondary}
            </Button>
          </div>

          <div className="grid gap-4 pt-4">
            <div className="grid grid-cols-3 gap-4 rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 to-tertiary/5 p-6">
              {data.stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold text-foreground">
                    {s.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
