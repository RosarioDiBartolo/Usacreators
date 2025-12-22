import React from "react";
import { IconFirstRevealTextLink } from "./icon-links";
import { TbUsersPlus } from "react-icons/tb";
export function BecomeCreatorLink( ) {
  return <IconFirstRevealTextLink to="/creators/apply" icon={<span className="
          inline-flex 
      rounded-full border
      bg-background
      p-3  ">
            <TbUsersPlus className="w-5 h-5" />
          </span>} buttonClassName=" my-1" label="Become a Creator" buttonVariant="outline" buttonSize="lg" />;
}
  