import * as React from "react";
import { Link as TanstackLink } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/client-only/utils";

const MotionLink = motion.create(TanstackLink);

type IconFirstRevealTextLinkProps =
  React.ComponentProps<typeof TanstackLink> & {
    label: React.ReactNode;
    icon: LucideIcon;

    buttonVariant?: Parameters<typeof buttonVariants>[0]["variant"];
    buttonSize?: Parameters<typeof buttonVariants>[0]["size"];
    buttonClassName?: string;

    iconClassName?: string;
    labelClassName?: string;

    textWidth?: number; // px
    gap?: number; // px
  };

export function IconFirstRevealTextLink({
  label,
  icon: Icon,

  buttonVariant = "secondary",
  buttonSize = "lg",
  buttonClassName,

  iconClassName,
  labelClassName,

  textWidth = 140,
 
  className,
  ...linkProps
}: IconFirstRevealTextLinkProps) {
  return (
    <MotionLink
      {...linkProps}
      className={cn(
        buttonVariants({
          variant: buttonVariant,
          size: buttonSize,
          className: buttonClassName,
        }),
        "flex items-center justify-center gap-0 !px-2 p-7",
        className
      )}
      whileHover="hover"
      whileFocus="hover"
      initial="rest"
      animate="rest"
    >
      {/* Icon always visible */}
      <span className="inline-flex bg-background text-secondary rounded-full p-3  ">
        <Icon className={cn("h-5 w-5", iconClassName)} />
      </span>
 

      {/* Revealing text */}
      <motion.span
        className={cn(
          "overflow-hidden   whitespace-nowrap inline-flex items-center",
          labelClassName
        )}
        variants={{
          rest: { width: 0, opacity: 0 },
          hover: { width: textWidth, opacity: 1, marginLeft: "1rem" },
        }}
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
      >
        {label}
      </motion.span>
    </MotionLink>
  );
}
