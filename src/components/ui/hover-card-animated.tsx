import * as React from "react";
import { cn } from "@/lib/utils";

interface HoverCardAnimatedProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  imageUrl?: string;
  imageAlt?: string;
}

const HoverCardAnimated = React.forwardRef<HTMLDivElement, HoverCardAnimatedProps>(
  ({ className, children, imageUrl, imageAlt, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-2xl",
          "bg-card border border-border/50",
          "transition-all duration-300 ease-out",
          "hover:-translate-y-2",
          "hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]",
          "dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]",
          className
        )}
        {...props}
      >
        {imageUrl && (
          <div className="relative overflow-hidden">
            <img
              src={imageUrl}
              alt={imageAlt || ""}
              className={cn(
                "w-full h-48 object-cover",
                "transition-transform duration-500 ease-out",
                "group-hover:scale-105"
              )}
            />
            <div className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent",
              "opacity-0 transition-opacity duration-300",
              "group-hover:opacity-100"
            )} />
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </div>
    );
  }
);

HoverCardAnimated.displayName = "HoverCardAnimated";

export { HoverCardAnimated };
