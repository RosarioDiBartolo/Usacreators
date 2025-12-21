import * as React from "react";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/client-only/utils";

type LogoIconProps = React.ComponentPropsWithoutRef<"img"> & {
  size?: number;
};

const LogoIcon = React.forwardRef<HTMLImageElement, LogoIconProps>(
  (
    {
      src = logo,
      alt = "logo",
      size = 42,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={cn("rounded-full", className)}
        {...props}
      />
    );
  }
);

LogoIcon.displayName = "LogoIcon";

export default LogoIcon;
