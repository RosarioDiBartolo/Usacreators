"use client";
import {
  BadgeDollarSign,
  HelpCircle,
  Home,
  Sparkles,
 } from "lucide-react";
 import { TbUsersPlus } from "react-icons/tb";

import { TbBrandApplePodcast } from "react-icons/tb";

import {
  NavContainer,
  NavItemButton,
  useIsMobile,
  type NavItem,
} from "@/components/ui/new-nav";
import { useState } from "react";
import { IconFirstRevealTextLink } from "./icon-links";

const navItems: NavItem[] = [
  { name: "Home", url: "/", icon: Home, type: "link" },
  { name: "Features", icon: Sparkles, id: "features", type: "section" },
  { name: "Pricing", url: "/#pricing", icon: BadgeDollarSign, type: "link" },
  { name: "FAQ", icon: HelpCircle, id: "faq", type: "section" },
];
export default function Header() {
  const isMobile = useIsMobile(768);

  const [activeTab, setActiveTab] = useState("Home");

  return (
    <NavContainer>
      {navItems.map((item) => (
        <NavItemButton
          key={item.name}
          item={item}
          isActive={activeTab === item.name}
          isMobile={isMobile}
          onActivate={(it) => setActiveTab(it.name)}
        />
      ))}

      <IconFirstRevealTextLink
        to="/creators/apply"
        icon={
          <span className="inline-flex 
      rounded-full border
      p-3  ">
            <TbUsersPlus className=" " />
          </span>
        }
        label="Become a Creator"
        buttonVariant="outline"
        buttonSize="lg"
      />
      <IconFirstRevealTextLink
        to="/catalog"
        icon={
          <span className="
          bg-secondary
          inline-flex 
      rounded-full border
      p-3  ">
            <TbBrandApplePodcast
              className=" w-5 h-5  "
            />
          </span>
        }
        label="Explore our Catalog"
        buttonVariant="secondary"
        buttonSize="lg"
      />
    </NavContainer>
  );
}
