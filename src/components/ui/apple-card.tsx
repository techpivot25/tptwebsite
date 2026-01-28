import { motion } from "framer-motion";
import { LucideIcon, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AppleCardProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  href?: string;
  gradient?: string;
  className?: string;
  iconSize?: "sm" | "md" | "lg";
  layout?: "default" | "compact" | "feature";
}

const gradients = [
  "from-violet-500/10 to-purple-500/10",
  "from-pink-500/10 to-rose-500/10",
  "from-blue-500/10 to-cyan-500/10",
  "from-emerald-500/10 to-teal-500/10",
  "from-orange-500/10 to-amber-500/10",
  "from-red-500/10 to-orange-500/10",
  "from-indigo-500/10 to-blue-500/10",
  "from-fuchsia-500/10 to-pink-500/10",
  "from-cyan-500/10 to-blue-500/10",
  "from-yellow-500/10 to-orange-500/10",
];

const getRandomGradient = (index?: number) => {
  if (index !== undefined) {
    return gradients[index % gradients.length];
  }
  return gradients[Math.floor(Math.random() * gradients.length)];
};

const iconSizes = {
  sm: { wrapper: "w-12 h-12", icon: "w-6 h-6" },
  md: { wrapper: "w-16 h-16", icon: "w-8 h-8" },
  lg: { wrapper: "w-20 h-20", icon: "w-10 h-10" },
};

export const AppleCard = ({
  icon: Icon,
  title,
  subtitle,
  description,
  features,
  href,
  gradient,
  className,
  iconSize = "lg",
  layout = "default",
}: AppleCardProps) => {
  const sizes = iconSizes[iconSize];
  const cardGradient = gradient || getRandomGradient();

  const CardContent = () => (
    <motion.div
      className={cn(
        "relative h-full bg-[#f5f5f7] dark:bg-card rounded-2xl p-6 overflow-hidden transition-all duration-500",
        className
      )}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)",
      }}
    >
      {/* Gradient overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${cardGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Title at top - Apple style */}
        <div className="mb-auto">
          <h3 className="text-xl font-semibold text-foreground mb-1 tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {/* Icon in center */}
        {Icon && (
          <div className="flex justify-center py-6">
            <motion.div
              className={cn(
                sizes.wrapper,
                "rounded-2xl bg-background/80 dark:bg-background/50 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300"
              )}
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon
                className={cn(
                  sizes.icon,
                  "text-foreground group-hover:text-primary transition-colors duration-300"
                )}
                strokeWidth={1.5}
              />
            </motion.div>
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {description}
          </p>
        )}

        {/* Features list */}
        {features && features.length > 0 && (
          <ul className="space-y-2 mb-4">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {/* Learn more link - Apple style */}
        {href && (
          <div className="flex items-center gap-1 text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-auto">
            <span>Learn more</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Link to={href} className="group block h-full">
        <CardContent />
      </Link>
    );
  }

  return (
    <div className="group h-full">
      <CardContent />
    </div>
  );
};

// Compact variant for smaller cards
export const AppleCardCompact = ({
  icon: Icon,
  title,
  description,
  gradient,
  className,
}: AppleCardProps) => {
  const cardGradient = gradient || getRandomGradient();

  return (
    <div className="group h-full">
      <motion.div
        className={cn(
          "relative h-full bg-[#f5f5f7] dark:bg-card rounded-2xl p-6 overflow-hidden transition-all duration-500",
          className
        )}
        whileHover={{
          y: -6,
          boxShadow: "0 16px 32px -12px rgba(0,0,0,0.1)",
        }}
      >
        {/* Gradient overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${cardGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          {Icon && (
            <motion.div
              className="w-12 h-12 rounded-xl bg-background/80 dark:bg-background/50 flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon
                className="w-6 h-6 text-foreground group-hover:text-primary transition-colors duration-300"
                strokeWidth={1.5}
              />
            </motion.div>
          )}

          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Feature card with larger content area
export const AppleCardFeature = ({
  icon: Icon,
  title,
  description,
  features,
  gradient,
  className,
}: AppleCardProps) => {
  const cardGradient = gradient || getRandomGradient();

  return (
    <div className="group h-full">
      <motion.div
        className={cn(
          "relative h-full bg-[#f5f5f7] dark:bg-card rounded-2xl p-8 overflow-hidden transition-all duration-500",
          className
        )}
        whileHover={{
          y: -8,
          boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)",
        }}
      >
        {/* Gradient overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${cardGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon and title row */}
          <div className="flex items-center gap-4 mb-4">
            {Icon && (
              <motion.div
                className="w-14 h-14 rounded-xl bg-background/80 dark:bg-background/50 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon
                  className="w-7 h-7 text-foreground group-hover:text-primary transition-colors duration-300"
                  strokeWidth={1.5}
                />
              </motion.div>
            )}
            <h3 className="text-xl font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
              {title}
            </h3>
          </div>

          {/* Description */}
          {description && (
            <p className="text-muted-foreground leading-relaxed mb-4">
              {description}
            </p>
          )}

          {/* Features list */}
          {features && features.length > 0 && (
            <ul className="space-y-2">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AppleCard;
