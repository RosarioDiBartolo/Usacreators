import * as React from "react";
import { Link as TanstackLink } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/client-only/utils";

const MotionLink = motion.create(TanstackLink);

type RevealIconProps = {
  Icon: LucideIcon;
  iconClassName?: string;
  wrapperClassName?: string;
  width?: number; // px
};

function RevealIcon({
  Icon,
  width = 20,
  iconClassName,
  wrapperClassName,
}: RevealIconProps) {
  return (
    <motion.span
      aria-hidden="true"
      className={cn("inline-flex items-center overflow-hidden", wrapperClassName)}
      variants={{
        rest: { width: 0, opacity: 0 },
        hover: { width, opacity: 1 },
      }}
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
    >
      <Icon className={cn("h-5 w-5 shrink-0", iconClassName)} />
    </motion.span>
  );
}

type AnimatedActionLinkProps = React.ComponentProps<typeof TanstackLink> & {
  label: React.ReactNode;
  icon?: LucideIcon;
  buttonVariant?: Parameters<typeof buttonVariants>[0]["variant"];
  buttonSize?: Parameters<typeof buttonVariants>[0]["size"];
  buttonClassName?: string;

  labelClassName?: string;

  iconWidth?: number;
  iconClassName?: string;
  iconWrapperClassName?: string;

  // motion tweaks
  labelShiftOnHover?: number; // px
};

export function AnimatedActionLink({
  label,
  icon: Icon,
  buttonVariant = "secondary",
  buttonSize = "lg",
  buttonClassName,

  labelClassName,

  iconWidth = 20,
  iconClassName,
  iconWrapperClassName,

  labelShiftOnHover = 0,

  className,
  ...linkProps
}: AnimatedActionLinkProps) {
  return (
    <MotionLink
      {...linkProps}
      className={cn(
        buttonVariants({
          variant: buttonVariant,
          size: buttonSize,
          className: buttonClassName,
        }),
        className
      )}
      whileHover="hover"
      whileFocus="hover"
      initial="rest"
      animate="rest"
    >
      <motion.span
        className={cn("whitespace-nowrap", labelClassName)}
        variants={{
          rest: { x: 0 },
          hover: { x: labelShiftOnHover },
        }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
      >
        {label}
      </motion.span>

      {Icon ? (
        <RevealIcon
          Icon={Icon}
          width={iconWidth}
          iconClassName={iconClassName}
          wrapperClassName={iconWrapperClassName}
        />
      ) : null}
    </MotionLink>
  );
}
