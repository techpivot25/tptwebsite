import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import vectorBg from "@/assets/vector-bg.jpg";

// Geometric shapes component
const GeometricShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large circle outline - top right */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -top-32 -right-32 w-[500px] h-[500px] border border-primary/10 rounded-full" 
      />
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        className="absolute -top-20 -right-20 w-96 h-96 border border-border/50 rounded-full" 
      />
      
      {/* Bottom left circle */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        className="absolute -bottom-20 -left-20 w-72 h-72 border border-primary/15 rounded-full" 
      />
      
      {/* Small accent circles with floating animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -10, 0] }}
        transition={{ opacity: { duration: 0.5, delay: 0.8 }, y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary rounded-full" 
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { duration: 0.5, delay: 1 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute top-1/3 right-1/3 w-2 h-2 bg-primary/60 rounded-full" 
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -6, 0] }}
        transition={{ opacity: { duration: 0.5, delay: 1.2 }, y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-primary/40 rounded-full" 
      />
      
      {/* Vector lines - circuit style behind heading */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-[0.08]" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Horizontal lines */}
        <motion.line 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          x1="0" y1="30%" x2="25%" y2="30%" stroke="currentColor" strokeWidth="1" className="text-primary" 
        />
        <motion.line 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          x1="75%" y1="30%" x2="100%" y2="30%" stroke="currentColor" strokeWidth="1" className="text-primary" 
        />
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

// Animated text with letter-by-letter reveal
const AnimatedHeadingLine = ({ 
  children, 
  delay = 0,
  className = ""
}: { 
  children: string; 
  delay?: number;
  className?: string;
}) => {
  const words = children.split(" ");
  
  return (
    <motion.span className={`block ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: delay + wordIndex * 0.1,
              ease: [0.33, 1, 0.68, 1]
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Vector Background Image with parallax */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-bg"
        style={{ backgroundImage: `url(${vectorBg})` }}
      />
      
      {/* Geometric decorations */}
      <GeometricShapes />

      {/* Hero Content */}
      <div className="relative z-10 container px-6 lg:px-12 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Main Heading - Animated word-by-word */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-tight leading-[0.95]">
            <AnimatedHeadingLine delay={0.2} className="text-foreground">
              Built By AI,
            </AnimatedHeadingLine>
            <AnimatedHeadingLine delay={0.5} className="text-gradient">
              Driven By Intelligence
            </AnimatedHeadingLine>
          </h1>

          {/* Core Values */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="space-y-3"
          >
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Built to Perform. Supported for Growth.
            </p>
            <motion.p 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="text-base md:text-lg text-primary font-medium tracking-wide"
            >
              Innovation | Excellence | Collaboration | Growth
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Button 
              size="lg" 
              className="px-8 py-6 text-base font-semibold group magnetic-hover"
              asChild
            >
              <Link to="/contact">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform icon-hover" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-6 text-base font-semibold magnetic-hover"
              asChild
            >
              <Link to="/#services">
                View Our Services
              </Link>
            </Button>
          </motion.div>

        </div>
      </div>

      {/* Bottom line */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent origin-center" 
      />
    </section>
  );
};

export default Hero;
