import { useEffect, useRef } from "react";

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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Tubes Cursor Canvas Background */}
      <canvas 
        ref={canvasRef} 
        id="tubes-canvas"
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />
    </section>
  );
};

export default Hero;
