import { cn } from "@/lib/client-only/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { motion } from "motion/react";
import React from "react";

const buttonVariants = cva(
  "relative isolate border inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap transition-all disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "rounded-full  bg-gradient-to-t from-primary to-tertiary text-primary-foreground hover:opacity-90",
        destructive:
          "rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90",
        black:
          "rounded-full bg-black text-white   border-input hover:bg-black/90 dark:bg-zinc-950 dark:hover:bg-zinc-900",
        outline:
          "rounded-full hover:border-primary border  bg-background/40 text-foreground backdrop-blur  hover:fill-primary hover:text-accent-foreground",
        secondary:
          "rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "rounded-full bg-transparent text-foreground hover:bg-muted/30",
        link: "text-primary underline-offset-4 hover:underline rounded-none",
      },
      size: {
        none: "",
        xs: "h-7 px-3 text-xs",
        sm: "h-9 px-4 text-sm",
        default: "h-10 px-5",
        lg: "h-11 px-7 text-base",
        xl: "h-12 px-8 text-lg",
        "2xl": "h-14 px-10 text-xl",
        icon: "size-10 [&>svg]:stroke-1",
        "icon-sm": "size-8  ",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// cleaner, correct rgba tokens
const glowColors = {
  default: "rgba(var(--primary-rgb), 0.35)",
  destructive: "rgba(239, 68, 68, 0.35)",
  black: "rgba(255, 255, 255, 0.25)",
  outline: "rgba(var(--primary-rgb), 0.25)",
  secondary: "rgba(var(--secondary-rgb), 0.3)",
  ghost: "rgba(var(--accent-rgb), 0.25)",
  link: "transparent",
};
export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const showGlow = !["ghost", "link"].includes(variant);

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {showGlow && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full pointer-events-none"
            initial={{ opacity: 0.4 }}
            animate={{
              opacity: [0.35, 0.55, 0.35],
              scale: [0.97, 1.03, 0.97],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: glowColors[variant],
              filter: "blur(12px)",
            }}
          />
        )}

        {children}
      </Comp>
    );
  }
);


export { Button, buttonVariants };