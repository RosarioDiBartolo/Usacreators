import { useEffect, useState } from "react";
import { DISCORD_INVITE_URL } from "@/lib/creators/constants";
import { CreatorRecord } from "@/lib/creators/creators-collection";
import { Button } from "@/components/ui/button";
import { GrFormNextLink } from "react-icons/gr";

import { AnimatedCheckIcon } from "./success-icon";

/**
 * SuccessPage
 * A clean, minimal success/thank-you page for creators who just submitted the form.
 * - TailwindCSS only (no custom CSS required)
 * - Framer Motion for subtle entrance animations
 * - Lucide icons for a crisp look
 *
 * Props (optional):
 * - discordInviteUrl: string  -> invite link to your Discord
 * - onClose: () => void       -> optional handler for "Back to Home"
 */
export default function SuccessPage({ user }: { user: CreatorRecord }) {
  const [ setCopied] = useState(false);

  // small confetti burst using radial-gradients
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--confetti-opacity", "1");
    const t = setTimeout(
      () => root.style.setProperty("--confetti-opacity", "0"),
      1200
    );
    return () => clearTimeout(t);
  }, []);

  const copyInvite = async () => {
    try {
      await navigator.clipboard.writeText(DISCORD_INVITE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Clipboard copy failed", e);
    }
  };

  return (
    <main className=" flex items-center h-screen">
      <div
        className="
      
      flex flex-col items-center  h-fit 
      
      container 
    
      mx-auto text-center"
      >
        <AnimatedCheckIcon size={180} strokeWidth={2} />
         <h1>
          Welcome <span className=" capitalize
          
          bg-text
          bg-linear-to-b from-blue-900 to-blue-300
          ">{user.name}.</span>
        </h1>
        <h2 className=" text-7xl">
          You Email has been <span className=" text-green-500"> Verified!</span>{" "}
          </h2>

        
        <p className=" mt-2 mb-10 text-2xl">
          You have successflly joined our platform.{" "}
        </p>

        <Button size={"2xl"}>Next Step <GrFormNextLink   /></Button> 
      </div>
    </main>
  );
}
 