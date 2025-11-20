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
import { Dispatch, SetStateAction, useState } from "react";

const AdditionalButtons = ({
  setIsMobileMenuOpen,
}: {
  setIsMobileMenuOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const onClick = () => setIsMobileMenuOpen && setIsMobileMenuOpen(false);
  return (
    <>
      <NavbarButton onClick={onClick} variant="outline">
        Book a call <PhoneCall size={20} />
      </NavbarButton>
      <NavbarButton onClick={onClick} variant="gradient">
        Become a Creator
      </NavbarButton>
    </>
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
      link: "#pricing",
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
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-4">
          <AdditionalButtons />
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            visible={visible}
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </a>
          ))}
          <div className="flex w-full flex-col gap-4">
            <AdditionalButtons setIsMobileMenuOpen={setIsMobileMenuOpen} />
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
