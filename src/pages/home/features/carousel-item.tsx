import * as React from "react";
import { cn } from "@/lib/client-only/utils";

export interface CarouselItemProps {
  title: string;
  description: string;
  image?: string;
  className?: string;
}

export function CarouselItem({
  title,
  description,
  image,
  className,
}: CarouselItemProps) {
  return (
    <article
      className={cn(
        "relative h-full w-full overflow-hidden",
        "rounded-3xl",
        className
      )}
    >
      {/* Background image */}
      {image ? (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Better than blur: crisp image + layered gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_20%,rgba(255,255,255,0.10),transparent_55%)]" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-muted/60 to-muted" />
      )}

      {/* Content */}
      <div className="relative z-10 flex h-full items-end">
        <div className="w-full px-6 pb-8 pt-20 md:px-10 md:pb-10">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-balance text-3xl font-bold leading-tight text-white md:text-6xl">
              {title}
            </h3>

            <p className="mt-3 text-balance text-base leading-relaxed text-white/80 md:text-lg">
              {description}
            </p>

            {/* subtle bottom divider */}
            <div className="mx-auto mt-6 h-px w-24 bg-white/20" />
          </div>
        </div>
      </div>
    </article>
  );
}
