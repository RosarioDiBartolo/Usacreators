"use client";

import React, { useEffect,   useState } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/client-only/utils";

// =============================================================================
// Types
// =============================================================================
export interface BaseNavItem {
  name: string;
  icon: LucideIcon;
}

export interface LinkItem extends BaseNavItem {
  type: "link";
  url: string;
}

export interface SectionItem extends BaseNavItem {
  type: "section";
  id: string;
}

export type NavItem = LinkItem | SectionItem;

type NavBarProps = {
  items: NavItem[];
  className?: string;
  initialActiveName?: string;
};

// =============================================================================
// Hooks
// =============================================================================
export function useIsMobile(breakpointPx = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpointPx);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpointPx]);

  return isMobile;
}

// =============================================================================
// UI Pieces
// =============================================================================
export function NavContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "fixed h-fit bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
        className
      )}
    >
      <div className="flex items-center gap-6 bg-background border border-border backdrop-blur-lg  pt-1 px-2 rounded-full shadow-lg">
        {children}
      </div>
    </div>
  );
}

export function NavActiveLamp() {
  return (
    <motion.div
      layoutId="lamp"
      className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
      initial={false}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
        <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
        <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
        <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
      </div>
    </motion.div>
  );
}

type NavItemButtonProps = {
  item: NavItem;
  isActive: boolean;
  onActivate: (item: NavItem) => void;
  isMobile: boolean;
};

export function NavItemButton({ item, isActive, onActivate }: NavItemButtonProps) {
  const Icon = item.icon;

  return (
    <Link
      to={item.type === "link" ? item.url : ""}
      onClick={(e) => {
        onActivate(item);

        if (item.type === "section") {
          e.preventDefault();
          const section = document.getElementById(item.id);
          section?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
      className={cn(
        "relative cursor-pointer text-sm font-semibold px-8 py-3 rounded-full transition-colors",
        "text-foreground/80 hover:text-primary",
        isActive && "bg-muted text-primary"
      )}
    >
      <span className="hidden md:inline">{item.name}</span>
      <span className="md:hidden">
        <Icon size={18} strokeWidth={2.5} />
      </span>

      {isActive && <NavActiveLamp />}
    </Link>
  );
}
 