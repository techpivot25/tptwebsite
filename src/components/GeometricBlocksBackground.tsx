import { useEffect, useRef } from "react";

type IconType = "shield" | "cloud" | "key" | "lock" | "fingerprint" | "server";

interface SecurityIcon {
  x: number;
  y: number;
  size: number;
  phase: number;
  rotationSpeed: number;
  floatSpeed: number;
  opacity: number;
  iconType: IconType;
}

const GeometricBlocksBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let icons: SecurityIcon[] = [];

    const iconTypes: IconType[] = ["shield", "cloud", "key", "lock", "fingerprint", "server"];

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        initIcons();
      }
    };

    const initIcons = () => {
      icons = [];
      const { width, height } = canvas;

      // Increased spacing to reduce count by 60%
      const spacingX = 280;
      const spacingY = 220;

      for (let row = -1; row < height / spacingY + 2; row++) {
        for (let col = -1; col < width / spacingX + 2; col++) {
          const offsetX = row % 2 === 0 ? spacingX * 0.5 : 0;
          const x = col * spacingX + offsetX + (Math.random() - 0.5) * 60;
          const y = row * spacingY + (Math.random() - 0.5) * 50;

          icons.push({
            x,
            y,
            size: 32 + Math.random() * 20,
            phase: Math.random() * Math.PI * 2,
            rotationSpeed: 0.3 + Math.random() * 0.4,
            floatSpeed: 0.5 + Math.random() * 0.5,
            opacity: 0.35 + Math.random() * 0.25,
            iconType: iconTypes[Math.floor(Math.random() * iconTypes.length)],
          });
        }
      }
    };

    const drawShield = (ctx: CanvasRenderingContext2D, opacity: number) => {
      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.bezierCurveTo(-8, -8, -10, -4, -10, 2);
      ctx.bezierCurveTo(-10, 8, -4, 12, 0, 14);
      ctx.bezierCurveTo(4, 12, 10, 8, 10, 2);
      ctx.bezierCurveTo(10, -4, 8, -8, 0, -10);
      ctx.closePath();
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
      ctx.fill();
      ctx.stroke();

      // Checkmark inside
      ctx.beginPath();
      ctx.moveTo(-4, 1);
      ctx.lineTo(-1, 4);
      ctx.lineTo(5, -3);
      ctx.stroke();
    };

    const drawCloud = (ctx: CanvasRenderingContext2D, opacity: number) => {
      ctx.beginPath();
      ctx.arc(-4, 2, 5, Math.PI * 0.5, Math.PI * 1.5);
      ctx.arc(0, -3, 5, Math.PI, Math.PI * 1.85);
      ctx.arc(5, 0, 4, Math.PI * 1.3, Math.PI * 0.5);
      ctx.lineTo(-4, 7);
      ctx.closePath();
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
      ctx.fill();
      ctx.stroke();
    };

    const drawKey = (ctx: CanvasRenderingContext2D, opacity: number) => {
      // Key head (circle)
      ctx.beginPath();
      ctx.arc(-5, 0, 5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
      ctx.fill();
      ctx.stroke();

      // Key hole
      ctx.beginPath();
      ctx.arc(-5, 0, 2, 0, Math.PI * 2);
      ctx.stroke();

      // Key shaft
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(10, 0);
      ctx.moveTo(7, 0);
      ctx.lineTo(7, 4);
      ctx.moveTo(10, 0);
      ctx.lineTo(10, 3);
      ctx.stroke();
    };

    const drawLock = (ctx: CanvasRenderingContext2D, opacity: number) => {
      // Lock body
      ctx.beginPath();
      ctx.roundRect(-6, 0, 12, 10, 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
      ctx.fill();
      ctx.stroke();

      // Shackle
      ctx.beginPath();
      ctx.arc(0, 0, 5, Math.PI, 0, false);
      ctx.stroke();

      // Keyhole
      ctx.beginPath();
      ctx.arc(0, 5, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
      ctx.fill();
    };

    const drawFingerprint = (ctx: CanvasRenderingContext2D) => {
      // Concentric arcs for fingerprint
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(0, 4, i * 2.5, Math.PI * 1.2, Math.PI * 1.8);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(0, -2, 3, Math.PI * 0.3, Math.PI * 0.7, true);
      ctx.stroke();
    };

    const drawServer = (ctx: CanvasRenderingContext2D, opacity: number) => {
      // Server rack
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.roundRect(-8, -8 + i * 7, 16, 6, 1);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
        ctx.fill();
        ctx.stroke();

        // LED lights
        ctx.beginPath();
        ctx.arc(-5, -5 + i * 7, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;
        ctx.fill();
      }
    };

    const drawIcon = (
      centerX: number,
      centerY: number,
      size: number,
      opacity: number,
      rotation: number,
      iconType: IconType
    ) => {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation * 0.08);

      const scale = size / 24;
      ctx.scale(scale, scale);

      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.7})`;
      ctx.lineWidth = 1.5 / scale;

      switch (iconType) {
        case "shield":
          drawShield(ctx, opacity);
          break;
        case "cloud":
          drawCloud(ctx, opacity);
          break;
        case "key":
          drawKey(ctx, opacity);
          break;
        case "lock":
          drawLock(ctx, opacity);
          break;
        case "fingerprint":
          drawFingerprint(ctx);
          break;
        case "server":
          drawServer(ctx, opacity);
          break;
      }

      ctx.restore();
    };

    let time = 0;

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      icons.forEach((icon) => {
        const floatY = Math.sin(time * icon.floatSpeed + icon.phase) * 12;
        const floatX = Math.cos(time * icon.floatSpeed * 0.7 + icon.phase) * 6;
        const pulseOpacity = icon.opacity * (0.7 + Math.sin(time * 0.8 + icon.phase) * 0.3);
        const pulseSize = icon.size * (0.9 + Math.sin(time * 0.6 + icon.phase) * 0.1);
        const rotation = Math.sin(time * icon.rotationSpeed + icon.phase);

        drawIcon(
          icon.x + floatX,
          icon.y + floatY,
          pulseSize,
          pulseOpacity,
          rotation,
          icon.iconType
        );
      });

      animationId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => resizeCanvas(), 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
  );
};

export default GeometricBlocksBackground;
