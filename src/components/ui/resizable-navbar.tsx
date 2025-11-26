"use client";
import { cn } from "@/lib/fe-utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import logo from "@/assets/logo.png";
import React, { useRef, useState, type SetStateAction } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
  visible: boolean;
  setVisible: React.Dispatch<SetStateAction<boolean>>;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose?: () => void;
}

export const Navbar = ({
  children,
  className,
  visible,
  setVisible,
}: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastY.current;
    const diff = latest - prev;
    lastY.current = latest;

    // Small hysteresis to avoid flicker and over-triggering
    if (latest <= 40) {
      // Near top: show the "hero" version (visible = false)
      if (visible) setVisible(false);
      return;
    }

    // Scrolling down → compact sticky navbar
    if (diff > 4 && latest > 80) {
      if (!visible) setVisible(true);
    }

    // Scrolling up near top → relax back to hero mode
    if (diff < -4 && latest < 160) {
      if (visible) setVisible(false);
    }
  });

  return (
    <div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-40 w-full pointer-events-none",
        className
      )}
    >
      <div className="pointer-events-auto mx-auto w-full max-w-7xl px-3 md:px-4 md:pt-4">
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(
                child as React.ReactElement<{ visible?: boolean }>,
                { visible }
              )
            : child
        )}
      </div>
    </div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      layout
      style={{
        justifyContent: visible ? "space-between" : "center",
      }}
      animate={{
        backdropFilter: visible ? "blur(14px)" : "blur(0px)",
        boxShadow: visible
          ? "0 8px 24px rgba(0,0,0,0.08)"
          : "0 0 0 rgba(0,0,0,0)",
        opacity: visible ? 1 : 0.98,
      }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={cn(
        "hidden md:flex z-[60] mx-auto w-full flex-row items-center gap-10 rounded-full px-6 py-3 transition-colors",
        visible
          ? "bg-background/70 text-foreground border border-border/60"
          : "bg-transparent text-muted-foreground",
        className
      )}
    >
      {children}          
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.nav
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "flex flex-row items-center justify-center gap-1 text-sm font-medium",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          key={`link-${idx}`}
          href={item.link}
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-3 py-2 text-sm font-semibold rounded-full text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          <AnimatePresence>
            {hovered === idx && (
              <motion.div
                layoutId="nav-hover-pill"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="absolute inset-0 h-full w-full rounded-full bg-gradient-to-t from-primary to-tertiary"
                transition={{ duration: 0.15 }}
              />
            )}
          </AnimatePresence>
          <span
            className={cn(
              "relative z-10",
              hovered === idx && "text-primary-foreground"
            )}
          >
            {item.name}
          </span>
        </a>
      ))}
    </motion.nav>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(12px)" : "blur(4px)",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "0 0 0 0 rgba(0, 0, 0, 0)",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className={cn(
        "relative z-50 flex w-full flex-col items-center justify-between rounded-b-2xl border-b border-border/60 bg-background/70 backdrop-blur md:hidden px-3 py-2",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between gap-2",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0, scale: 0.98 }}
          animate={{ opacity: 1, height: "auto", scale: 1 }}
          exit={{ opacity: 0, height: 0, scale: 0.98 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={cn(
            "flex w-full flex-col items-start gap-4 px-1 pt-2 pb-2 overflow-hidden",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  visible?: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="z-50 inline-flex items-center justify-center rounded-lg p-2 transition-colors duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.18 }}
          >
            <IconX className="h-6 w-6 text-foreground" />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.18 }}
          >
            <IconMenu2 className="h-6 w-6 text-foreground" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="/"
      className="relative z-20 flex items-center space-x-2 text-sm font-medium text-foreground"
    >
      <img
        className="rounded-full"
        src={logo}
        alt="logo"
        width={42}
        height={42}
      />
      {/* If you ever want text: */}
      {/* <span className="tracking-tight">Miami Creators</span> */}
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold relative cursor-pointer whitespace-nowrap transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const variantStyles: Record<string, string> = {
    outline:
      "border border-border bg-background/20  text-foreground/80 shadow-none hover:bg-white/20 hover:backdrop-blur-xl hover:text-foreground",
    primary:
      "bg-primary text-primary-foreground shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset] hover:bg-primary/90",
    secondary:
      "bg-secondary text-secondary-foreground shadow-none hover:bg-accent hover:text-accent-foreground",
    dark:
      "bg-black text-white shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset] hover:bg-black/90",
    gradient:
      "bg-gradient-to-t from-primary to-tertiary text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] hover:brightness-[1.05]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
