"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { PhoneCall } from "lucide-react";
import { motion } from "motion/react";
import { Dispatch, SetStateAction, useState } from "react";

type AdditionalButtonsProps = {
  setIsMobileMenuOpen?: Dispatch<SetStateAction<boolean>>;
  layout?: "row" | "column";
};

const AdditionalButtons = ({
  setIsMobileMenuOpen,
  layout = "row",
}: AdditionalButtonsProps) => {
  const onClick = () => {
    if (setIsMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const wrapperClasses =
    layout === "row"
      ? "flex items-center gap-3"
      : "flex w-full flex-col gap-3";

  return (
    <div className={wrapperClasses}>
      <NavbarButton
        onClick={onClick}
        variant="outline"
        className="gap-2 text-sm md:text-[0.9rem]"
      >
        Book a call
        <PhoneCall size={18} className="shrink-0" />
      </NavbarButton>

      <NavbarButton
        href="/creators/apply"
        onClick={onClick}
        variant="gradient"
        className="text-sm md:text-[0.9rem]"
      >
        Become a Creator
      </NavbarButton>
    </div>
  );
};

export default function NavbarDemo() {
  const navItems = [
    {
      name: "Features",
      link: "/#features",
    },
    {
      name: "Pricing",
      link: "/#pricing",
    },
    {
      name: "FAQ",
      link: "/#faq",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <Navbar visible={visible} setVisible={setVisible}>
      {/* Desktop Navigation */}
      <NavBody>
                <motion.div layout>

        <NavbarLogo />
        </motion.div>
        <motion.div layout>
        <div className="hidden md:flex items-center gap-8">
          <NavItems items={navItems} />
        </div>
        </motion.div>
        <motion.div layout>

        <div className="hidden md:flex items-center gap-4">
          <AdditionalButtons />
        </div>
</motion.div>
        {/* On very small screens NavBody still renders,
            but main actions move to MobileNav */}
                <motion.div layout className=" md:hidden ">

        <div className="flex items-center gap-2">
          <MobileNavToggle
            visible={visible}
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          />
        </div>
        </motion.div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />

          <MobileNavToggle
            visible={visible}
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full flex-col gap-1">
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <AdditionalButtons
              setIsMobileMenuOpen={setIsMobileMenuOpen}
              layout="column"
            />
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
