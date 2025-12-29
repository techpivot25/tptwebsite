import * as React from "react";
import { cn } from "@/lib/utils";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  size?: number;
  color?: string;
}

const HamburgerMenu = React.forwardRef<HTMLButtonElement, HamburgerMenuProps>(
  ({ isOpen, onClick, className, size = 24, color = "currentColor" }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          "relative flex items-center justify-center",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-md",
          "p-2",
          className
        )}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* Top line */}
          <line
            x1="3"
            y1="6"
            x2="21"
            y2="6"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            className={cn(
              "origin-center transition-all duration-300 ease-out",
              isOpen && "translate-y-[6px] rotate-45"
            )}
            style={{
              transformOrigin: "center",
              transform: isOpen ? "translateY(6px) rotate(45deg)" : "translateY(0) rotate(0deg)",
            }}
          />
          {/* Middle line */}
          <line
            x1="3"
            y1="12"
            x2="21"
            y2="12"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
            style={{
              opacity: isOpen ? 0 : 1,
              transform: isOpen ? "scaleX(0)" : "scaleX(1)",
            }}
          />
          {/* Bottom line */}
          <line
            x1="3"
            y1="18"
            x2="21"
            y2="18"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            className={cn(
              "origin-center transition-all duration-300 ease-out",
              isOpen && "-translate-y-[6px] -rotate-45"
            )}
            style={{
              transformOrigin: "center",
              transform: isOpen ? "translateY(-6px) rotate(-45deg)" : "translateY(0) rotate(0deg)",
            }}
          />
        </svg>
      </button>
    );
  }
);

HamburgerMenu.displayName = "HamburgerMenu";

export { HamburgerMenu };
