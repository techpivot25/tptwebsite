import { useEffect, useRef } from "react";

interface SecurityIcon {
  x: number;
  y: number;
  size: number;
  phase: number;
  rotationSpeed: number;
  floatSpeed: number;
  opacity: number;
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

      // Create a grid of security icons
      const spacingX = 180;
      const spacingY = 140;

      for (let row = -1; row < height / spacingY + 2; row++) {
        for (let col = -1; col < width / spacingX + 2; col++) {
          // Stagger alternate rows
          const offsetX = row % 2 === 0 ? spacingX * 0.5 : 0;
          const x = col * spacingX + offsetX + (Math.random() - 0.5) * 40;
          const y = row * spacingY + (Math.random() - 0.5) * 30;

          icons.push({
            x,
            y,
            size: 28 + Math.random() * 16,
            phase: Math.random() * Math.PI * 2,
            rotationSpeed: 0.3 + Math.random() * 0.4,
            floatSpeed: 0.5 + Math.random() * 0.5,
            opacity: 0.3 + Math.random() * 0.3,
          });
        }
      }
    };

    // Draw shield with lock icon
    const drawSecurityIcon = (
      centerX: number,
      centerY: number,
      size: number,
      opacity: number,
      rotation: number
    ) => {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation * 0.1); // Subtle rotation

      const scale = size / 24;
      ctx.scale(scale, scale);

      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
      ctx.lineWidth = 1.5 / scale;

      // Shield outline
      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.bezierCurveTo(-8, -8, -10, -4, -10, 2);
      ctx.bezierCurveTo(-10, 8, -4, 12, 0, 14);
      ctx.bezierCurveTo(4, 12, 10, 8, 10, 2);
      ctx.bezierCurveTo(10, -4, 8, -8, 0, -10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Lock body
      ctx.beginPath();
      ctx.roundRect(-4, -1, 8, 6, 1);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
      ctx.fill();
      ctx.stroke();

      // Lock shackle
      ctx.beginPath();
      ctx.arc(0, -1, 3, Math.PI, 0, false);
      ctx.stroke();

      // Keyhole
      ctx.beginPath();
      ctx.arc(0, 2, 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;
      ctx.fill();

      ctx.restore();
    };

    let time = 0;

    const draw = () => {
      const { width, height } = canvas;

      ctx.clearRect(0, 0, width, height);

      time += 0.016;

      icons.forEach((icon) => {
        // Floating animation
        const floatY = Math.sin(time * icon.floatSpeed + icon.phase) * 12;
        const floatX = Math.cos(time * icon.floatSpeed * 0.7 + icon.phase) * 6;

        // Pulsing opacity
        const pulseOpacity =
          icon.opacity * (0.7 + Math.sin(time * 0.8 + icon.phase) * 0.3);

        // Pulsing size
        const pulseSize =
          icon.size * (0.9 + Math.sin(time * 0.6 + icon.phase) * 0.1);

        // Rotation based on time
        const rotation = Math.sin(time * icon.rotationSpeed + icon.phase);

        drawSecurityIcon(
          icon.x + floatX,
          icon.y + floatY,
          pulseSize,
          pulseOpacity,
          rotation
        );
      });

      animationId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
};

export default GeometricBlocksBackground;
