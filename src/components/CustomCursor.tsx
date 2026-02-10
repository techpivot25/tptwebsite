import { useEffect, useRef, useCallback } from "react";

interface TrailPoint {
  x: number;
  y: number;
  alpha: number;
  size: number;
}

const CustomCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const animRef = useRef<number>(0);
  const isTouchDevice = useRef(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
    trailRef.current.push({
      x: e.clientX,
      y: e.clientY,
      alpha: 1,
      size: 6,
    });
    if (trailRef.current.length > 30) {
      trailRef.current.shift();
    }
  }, []);

  useEffect(() => {
    // Detect touch device
    isTouchDevice.current = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const trail = trailRef.current;

      // Draw trail
      for (let i = 0; i < trail.length; i++) {
        const point = trail[i];
        point.alpha -= 0.035;
        point.size *= 0.97;

        if (point.alpha <= 0) {
          trail.splice(i, 1);
          i--;
          continue;
        }

        // Glow effect
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, point.size * 3
        );
        gradient.addColorStop(0, `rgba(45, 156, 157, ${point.alpha * 0.6})`);
        gradient.addColorStop(0.5, `rgba(45, 156, 157, ${point.alpha * 0.2})`);
        gradient.addColorStop(1, `rgba(45, 156, 157, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw main cursor dot
      const { x, y } = mouseRef.current;
      if (x > 0 && y > 0) {
        const dotGradient = ctx.createRadialGradient(x, y, 0, x, y, 12);
        dotGradient.addColorStop(0, "rgba(45, 156, 157, 0.8)");
        dotGradient.addColorStop(0.4, "rgba(45, 156, 157, 0.3)");
        dotGradient.addColorStop(1, "rgba(45, 156, 157, 0)");
        ctx.fillStyle = dotGradient;
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = "rgba(45, 156, 157, 0.9)";
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [handleMouseMove]);

  if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default CustomCursor;
