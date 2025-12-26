import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Geometric shapes component
const GeometricShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large circle outline - top right */}
      <div className="absolute -top-20 -right-20 w-96 h-96 border border-primary/20 rounded-full" />
      <div className="absolute -top-10 -right-10 w-72 h-72 border border-secondary/15 rounded-full" />
      
      {/* Triangle - bottom left */}
      <div className="absolute bottom-20 left-10 w-0 h-0 border-l-[60px] border-l-transparent border-b-[100px] border-b-accent/10 border-r-[60px] border-r-transparent" />
      
      {/* Small circles */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary/30 rounded-full" />
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-secondary/40 rounded-full" />
      <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-accent/50 rounded-full" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                         linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />
    </div>
  );
};

// Trust badges
const TrustBadges = () => {
  const badges = [
    { rating: "5.0", label: "Clutch Reviews" },
    { rating: "98%", label: "Client Satisfaction" },
    { rating: "500+", label: "Projects Delivered" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-10">
      {badges.map((badge, index) => (
        <div 
          key={badge.label}
          className="flex items-center gap-2 animate-fade-up"
          style={{ animationDelay: `${0.5 + index * 0.1}s` }}
        >
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="font-bold text-foreground">{badge.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">{badge.label}</span>
        </div>
      ))}
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Geometric decorations */}
      <GeometricShapes />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-transparent to-accent/5 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 container px-6 lg:px-12 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Eyebrow text */}
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 text-sm font-medium text-muted-foreground">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              GLOBAL TECHNOLOGY PARTNER
            </span>
          </div>

          {/* Main Heading - Linnify style bold uppercase */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-tight leading-[0.9] animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="block text-foreground">We Help Brands</span>
            <span className="block text-foreground">Accelerate Their</span>
            <span className="block text-gradient">Digital Initiatives</span>
          </h1>

          {/* Subheading */}
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up" 
            style={{ animationDelay: "0.2s" }}
          >
            Your trusted partner in delivering on your most ambitious AI and digital transformation initiatives. From strategy to execution.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-up" 
            style={{ animationDelay: "0.3s" }}
          >
            <Button 
              size="lg" 
              className="px-8 py-6 text-base font-semibold group"
              asChild
            >
              <Link to="/contact">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-6 text-base font-semibold"
              asChild
            >
              <Link to="/#services">
                View Our Services
              </Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="pt-12 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <TrustBadges />
          </div>
        </div>
      </div>

      {/* Bottom geometric accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

export default Hero;