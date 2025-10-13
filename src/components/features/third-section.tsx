import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ShowcaseSection({ data }) {
  return (
    <section className="w-full py-16 bg-gradient-to-t from-orange-700 to-orange-500 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl bg-clip-text text-transparent bg-gradient-to-t from-stone-400 to-stone-100">
              {data.title}
            </h3>
            <p className="mt-2 max-w-prose text-stone-300">{data.subtitle}</p>
          </div>
          <Button
            variant="ghost"
            className="hidden sm:inline-flex bg-clip-text text-transparent bg-gradient-to-t from-stone-400 to-stone-100"
          >
            {data.cta} <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.features.map((f) => (
            <Card key={f.title} className="group shadow-2xl text-stone-100 bg-white/30 border-white/20">
              <CardContent className="flex gap-5 items-center p-5">
                <div className="rounded-md shadow-lg  h-fit bg-primary p-2 text-primary-foreground">
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-sm font-medium leading-none">
                    {f.title}
                  </h4>
                  <p className="text-sm text-stone-300">{f.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
