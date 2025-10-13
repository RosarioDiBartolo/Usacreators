import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BuildFasterSection({ data, media }) {
  return (
    <div className="bg-gradient-to-t from-orange-500 to-orange-700 text-primary-foreground">
      <section className="relative w-full py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-2">
          {/* Media left */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="relative overflow-hidden rounded-3xl border bg-muted/20 shadow-2xl ring-1 ring-foreground/10">
              <img
                src={media.image}
                alt="Showcasing product in action"
                className="h-[420px] w-full object-cover"
              />
              <div className="absolute left-4 top-4 rounded-full border bg-background/90 px-3 py-1 text-xs shadow backdrop-blur">
                Beta access
              </div>
            </div>
          </motion.div>

          {/* Content right */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="order-1 flex flex-col gap-6 lg:order-2"
          >
            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {data.title}
            </h3>
            <p className="max-w-prose text-stone-300">{data.description}</p>

            <ul className="grid gap-4 sm:grid-cols-2">
              {data.features.map((f) => (
                <li
                  key={f.title}
                  className="flex bg-white/20 items-start gap-3 rounded-xl border p-4"
                >
                  <div className="mt-0.5 rounded-md bg-primary p-2 text-primary-foreground">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium leading-none">
                      {f.title}
                    </h4>
                    <p className="text-sm text-stone-300">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex gap-3">
              <Button variant="outline" className="h-11 text-base">
                {data.ctaSecondary}
              </Button>
              <Button className="h-11 gap-2 text-base">
                {data.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
