import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Geometric shapes component
const GeometricShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large circle outline - top right */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] border border-primary/10 rounded-full" />
      <div className="absolute -top-20 -right-20 w-96 h-96 border border-border/50 rounded-full" />
      
      {/* Bottom left circle */}
      <div className="absolute -bottom-20 -left-20 w-72 h-72 border border-primary/15 rounded-full" />
      
      {/* Small accent circles */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary rounded-full" />
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-primary/60 rounded-full" />
      <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-primary/40 rounded-full" />
      
      {/* Vector lines - circuit style behind heading */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-[0.08]" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Horizontal lines */}
        <line x1="0" y1="30%" x2="25%" y2="30%" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <line x1="75%" y1="30%" x2="100%" y2="30%" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <line x1="0" y1="50%" x2="20%" y2="50%" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <line x1="80%" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <line x1="0" y1="70%" x2="15%" y2="70%" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <line x1="85%" y1="70%" x2="100%" y2="70%" stroke="currentColor" strokeWidth="1" className="text-primary" />
        
        {/* Diagonal connecting lines - left side */}
        <line x1="25%" y1="30%" x2="20%" y2="50%" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <line x1="20%" y1="50%" x2="15%" y2="70%" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <line x1="10%" y1="20%" x2="25%" y2="30%" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <line x1="5%" y1="80%" x2="15%" y2="70%" stroke="currentColor" strokeWidth="1" className="text-primary" />
        
        {/* Diagonal connecting lines - right side */}
        <line x1="75%" y1="30%" x2="80%" y2="50%" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <line x1="80%" y1="50%" x2="85%" y2="70%" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <line x1="90%" y1="20%" x2="75%" y2="30%" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <line x1="95%" y1="80%" x2="85%" y2="70%" stroke="currentColor" strokeWidth="1" className="text-primary" />
        
        {/* Node circles at intersections */}
        <circle cx="25%" cy="30%" r="4" fill="currentColor" className="text-primary" />
        <circle cx="20%" cy="50%" r="3" fill="currentColor" className="text-primary" />
        <circle cx="15%" cy="70%" r="4" fill="currentColor" className="text-primary" />
        <circle cx="75%" cy="30%" r="4" fill="currentColor" className="text-primary" />
        <circle cx="80%" cy="50%" r="3" fill="currentColor" className="text-primary" />
        <circle cx="85%" cy="70%" r="4" fill="currentColor" className="text-primary" />
        
        {/* Additional accent lines */}
        <line x1="30%" y1="25%" x2="35%" y2="35%" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
        <line x1="65%" y1="25%" x2="70%" y2="35%" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
        <line x1="28%" y1="65%" x2="32%" y2="75%" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
        <line x1="68%" y1="65%" x2="72%" y2="75%" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
      </svg>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                         linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Geometric decorations */}
      <GeometricShapes />

      {/* Hero Content */}
      <div className="relative z-10 container px-6 lg:px-12 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Main Heading - Linnify style bold uppercase */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-tight leading-[0.95] animate-fade-up">
            <span className="block text-foreground">Built By AI,</span>
            <span className="block text-gradient">Driven By Intelligence</span>
          </h1>

          {/* Core Values */}
          <div 
            className="animate-fade-up space-y-3" 
            style={{ animationDelay: "0.1s" }}
          >
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Built to Perform. Supported for Growth.
            </p>
            <p className="text-base md:text-lg text-primary font-medium tracking-wide">
              Innovation | Excellence | Collaboration | Growth
            </p>
          </div>

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

        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

export default Hero;