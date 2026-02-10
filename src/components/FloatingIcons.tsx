import { useEffect, useRef, useCallback } from "react";
import { Bot, Sparkles, Cloud, Globe, Smartphone, Shield, Code, Cpu, Lightbulb, Boxes } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";

interface FloatingIcon {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  svgData: string;
  opacity: number;
}

const iconComponents = [Bot, Sparkles, Cloud, Globe, Smartphone, Shield, Code, Cpu, Lightbulb, Boxes];

const FloatingIcons = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<FloatingIcon[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef(false);

  const initIcons = useCallback((width: number, height: number) => {
    const count = width < 768 ? 8 : 14;
    const icons: FloatingIcon[] = [];

    for (let i = 0; i < count; i++) {
      const IconComp = iconComponents[i % iconComponents.length];
      const svgMarkup = renderToStaticMarkup(
        <IconComp width={32} height={32} stroke="currentColor" strokeWidth={1.2} fill="none" />
      );
      const colored = svgMarkup.replace('currentColor', 'rgba(45,156,157,0.5)');

      icons.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 28 + Math.random() * 16,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.5,
        svgData: colored,
        opacity: 0.15 + Math.random() * 0.2,
      });
    }
    iconsRef.current = icons;

    // Pre-render SVG to images
    imagesRef.current = icons.map((icon) => {
      const img = new Image();
      const blob = new Blob([icon.svgData], { type: "image/svg+xml" });
      img.src = URL.createObjectURL(blob);
      return img;
    });
    loadedRef.current = true;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      if (!loadedRef.current) initIcons(rect.width, rect.height);
    };
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resize);

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const icons = iconsRef.current;
      const mouse = mouseRef.current;

      icons.forEach((icon, i) => {
        // Mouse repulsion
        const dx = icon.x - mouse.x;
        const dy = icon.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 150;

        if (dist < repelRadius && dist > 0) {
          const force = (repelRadius - dist) / repelRadius * 2;
          icon.vx += (dx / dist) * force * 0.1;
          icon.vy += (dy / dist) * force * 0.1;
        }

        // Damping
        icon.vx *= 0.98;
        icon.vy *= 0.98;

        // Restore velocity if too slow
        if (Math.abs(icon.vx) < 0.1) icon.vx += (Math.random() - 0.5) * 0.05;
        if (Math.abs(icon.vy) < 0.1) icon.vy += (Math.random() - 0.5) * 0.05;

        icon.x += icon.vx;
        icon.y += icon.vy;
        icon.rotation += icon.rotationSpeed;

        // Bounce
        if (icon.x < 0 || icon.x > width) icon.vx *= -1;
        if (icon.y < 0 || icon.y > height) icon.vy *= -1;
        icon.x = Math.max(0, Math.min(width, icon.x));
        icon.y = Math.max(0, Math.min(height, icon.y));

        // Draw
        const img = imagesRef.current[i];
        if (img && img.complete) {
          ctx.save();
          ctx.globalAlpha = icon.opacity;
          ctx.translate(icon.x, icon.y);
          ctx.rotate((icon.rotation * Math.PI) / 180);
          ctx.drawImage(img, -icon.size / 2, -icon.size / 2, icon.size, icon.size);
          ctx.restore();
        }
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
      // Cleanup blob URLs
      imagesRef.current.forEach((img) => URL.revokeObjectURL(img.src));
    };
  }, [initIcons]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default FloatingIcons;
