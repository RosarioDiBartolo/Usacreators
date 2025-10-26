import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative overflow-visible isolate  inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-invalid:ring-2 aria-invalid:ring-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-t from-primary to-tertiary text-primary-foreground shadow-sm hover:opacity-90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        black:
          "bg-black text-white border border-input shadow-sm hover:bg-black/90 dark:bg-zinc-950 dark:hover:bg-zinc-900",
        outline:
          "border border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        none: "",
        xs: "h-7 px-2.5 text-xs",
        sm: "h-9 px-3 text-sm",
        default: "h-10 px-4 py-2",
        lg: "h-11 px-8 text-base",
        xl: "h-12 px-10 text-lg",
        "2xl": "h-14 px-12 text-xl",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const glowColors = {
  default: "rgba(var(--primary), 0.5)",
  destructive: "rgba(239, 68, 68, 0.5)",
  black: "rgba(255, 255, 255, 0.3)",
  outline: "rgba(var(--primary), 0.3)",
  secondary: "rgba(var(--secondary), 0.4)",
  ghost: "rgba(var(--accent), 0.3)",
  link: "transparent",
};

function Button({
  className,
  variant = "default",
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  const showGlow = variant !== "link" && variant !== "ghost";

  return (
    <Comp
  data-slot="button"
  className={ 
     buttonVariants({ variant, size, className })
  }
  {...props}
>
      {showGlow && (
        <motion.span
  className="absolute -inset-0.5 rounded-full blur-md"
  initial={{ opacity: 0.5 }}
  animate={{
    opacity: [0.4, 0.7, 0.4],
    scale: [0.95, 1.05, 0.95],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  style={{
    background: glowColors[variant as keyof typeof glowColors],
    filter: "blur(8px)",
  }}
  aria-hidden="true"
/>

      )}
 {props.children} 
    </Comp>
  );
}

export { Button, buttonVariants };
