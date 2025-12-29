import * as React from "react";
import { cn } from "@/lib/utils";

interface NeumorphicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "primary";
}

const NeumorphicButton = React.forwardRef<HTMLButtonElement, NeumorphicButtonProps>(
  ({ className, children, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "neumorphic-button",
          "relative px-8 py-4 rounded-2xl font-semibold uppercase tracking-wider",
          "transition-all duration-300 ease-out",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
          variant === "primary" && "neumorphic-button-primary",
          className
        )}
        {...props}
      >
        <span className="neumorphic-button-text relative z-10">
          {children}
        </span>
      </button>
    );
  }
);

NeumorphicButton.displayName = "NeumorphicButton";

export { NeumorphicButton };
