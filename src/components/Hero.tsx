import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    TubesCursor: (canvas: HTMLCanvasElement, options: any) => any;
  }
}

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<any>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    let isMounted = true;

    const initTubesCursor = () => {
      if (canvasRef.current && window.TubesCursor && !appRef.current && isMounted) {
        appRef.current = window.TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#ff0000", "#00ff00", "#0000ff"],
            lights: {
              intensity: 250,
              colors: ["#ff0000", "#00ff00", "#0000ff", "#ff00ff"]
            }
          }
        });

        // Rainbow loop
        let hue = 0;
        const rainbowLoop = () => {
          if (!isMounted) return;
          
          hue = (hue + 1) % 360;

          const generateRainbowColors = (count: number) => {
            return Array.from({ length: count }, (_, i) => {
              const h = (hue + (i * (360 / count))) % 360;
              return `hsl(${h}, 100%, 50%)`;
            });
          };

          const tubeColors = generateRainbowColors(10);
          const lightColors = generateRainbowColors(12);

          if (appRef.current?.tubes) {
            appRef.current.tubes.setColors(tubeColors);
            appRef.current.tubes.setLightsColors(lightColors);
          }

          animationRef.current = requestAnimationFrame(rainbowLoop);
        };

        rainbowLoop();
      }
    };

    // Check if script is already loaded
    if (window.TubesCursor) {
      initTubesCursor();
    } else {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.umd.js";
      script.async = true;
      script.onload = initTubesCursor;
      document.head.appendChild(script);
    }

    return () => {
      isMounted = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (appRef.current?.destroy) {
        appRef.current.destroy();
      }
    };
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Tubes Cursor Canvas Background */}
      <canvas 
        ref={canvasRef} 
        id="tubes-canvas"
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Hero Content Overlay */}
      <div className="relative z-10 container px-6 lg:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground uppercase tracking-wide animate-fade-up drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            TechPivot
          </h1>
          
          {/* Subheading */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-primary-foreground uppercase tracking-wider animate-fade-up drop-shadow-[0_0_25px_rgba(0,0,0,0.8)]" style={{ animationDelay: "0.1s" }}>
            Technologies
          </h2>
          
          {/* Tagline */}
          <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 font-medium tracking-widest uppercase animate-fade-up drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]" style={{ animationDelay: "0.2s" }}>
            Innovate • Transform • Deliver
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button 
              size="lg" 
              className="bg-primary/80 backdrop-blur-sm hover:bg-primary text-primary-foreground border border-primary-foreground/20 px-8 py-6 text-lg font-semibold"
              onClick={() => window.location.href = "/contact"}
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 px-8 py-6 text-lg font-semibold"
              onClick={scrollToServices}
            >
              Explore Services
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer animate-bounce"
        onClick={scrollToServices}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium text-primary-foreground/70 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
            Scroll
          </span>
          <ChevronDown className="w-8 h-8 text-primary-foreground/80 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;