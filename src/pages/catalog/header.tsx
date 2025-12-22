 
 
import {
  Home,
  HelpCircle,
  Calendar,
  Layers, 
} from "lucide-react";
 

import {
  NavContainer,
  NavItemButton,
  useIsMobile,
  type NavItem,
} from "@/components/ui/new-nav";
import { useState } from "react"; 
import ExploreCatalogLink from "@/components/explore-catalog-link";
import { BecomeCreatorLink } from "@/components/become-creator-link";
const navItems: NavItem[] = [
  { name: "Home", icon: Home, url: "/", type: "link" },
  { name: "Services", icon: Layers, id: "services", type: "section" },
  { name: "FAQ", icon: HelpCircle, id: "faq", type: "section" },
  { name: "Book a call", icon: Calendar, id: "booking", type: "section" },
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
      <BecomeCreatorLink     />
      <ExploreCatalogLink />
    </NavContainer>
  );
}
