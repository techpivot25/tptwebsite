import { useEffect, useRef } from "react";

type IconType = "cloud" | "dashboard" | "api" | "database" | "chart" | "users" | "subscription" | "gear";

interface SaaSIcon {
  x: number;
  y: number;
  size: number;
  phase: number;
  rotationSpeed: number;
  floatSpeed: number;
  opacity: number;
  iconType: IconType;
}

const SaaSIconsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let icons: SaaSIcon[] = [];

    const iconTypes: IconType[] = ["cloud", "dashboard", "api", "database", "chart", "users", "subscription", "gear"];

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

      const spacingX = 260;
      const spacingY = 200;

      for (let row = -1; row < height / spacingY + 2; row++) {
        for (let col = -1; col < width / spacingX + 2; col++) {
          const offsetX = row % 2 === 0 ? spacingX * 0.5 : 0;
          const x = col * spacingX + offsetX + (Math.random() - 0.5) * 50;
          const y = row * spacingY + (Math.random() - 0.5) * 40;

          icons.push({
            x,
            y,
            size: 30 + Math.random() * 18,
            phase: Math.random() * Math.PI * 2,
            rotationSpeed: 0.3 + Math.random() * 0.4,
            floatSpeed: 0.4 + Math.random() * 0.5,
            opacity: 0.3 + Math.random() * 0.25,
            iconType: iconTypes[Math.floor(Math.random() * iconTypes.length)],
          });
        }
      }
    };

    const drawCloud = (ctx: CanvasRenderingContext2D, opacity: number) => {
      ctx.beginPath();
      ctx.arc(-5, 2, 5, Math.PI * 0.5, Math.PI * 1.5);
      ctx.arc(0, -3, 6, Math.PI, Math.PI * 1.85);
      ctx.arc(6, 0, 5, Math.PI * 1.3, Math.PI * 0.5);
      ctx.lineTo(-5, 7);
      ctx.closePath();
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
      ctx.fill();
      ctx.stroke();

      // Upload arrow
      ctx.beginPath();
      ctx.moveTo(0, 6);
      ctx.lineTo(0, -1);
      ctx.moveTo(-3, 2);
      ctx.lineTo(0, -1);
      ctx.lineTo(3, 2);
      ctx.stroke();
    };

    const drawDashboard = (ctx: CanvasRenderingContext2D, opacity: number) => {
      // Dashboard frame
      ctx.beginPath();
      ctx.roundRect(-10, -8, 20, 16, 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.12})`;
      ctx.fill();
      ctx.stroke();

      // Charts inside
      ctx.beginPath();
      ctx.rect(-8, -2, 4, 6);
      ctx.rect(-3, -4, 4, 8);
      ctx.rect(2, 0, 4, 4);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
      ctx.fill();
    };

    const drawApi = (ctx: CanvasRenderingContext2D, opacity: number) => {
      // API brackets
      ctx.beginPath();
      ctx.moveTo(-8, -8);
      ctx.lineTo(-11, -8);
      ctx.lineTo(-11, 8);
      ctx.lineTo(-8, 8);
      ctx.moveTo(8, -8);
      ctx.lineTo(11, -8);
      ctx.lineTo(11, 8);
      ctx.lineTo(8, 8);
      ctx.stroke();

      // Connection dots
      ctx.beginPath();
      ctx.arc(-4, 0, 2, 0, Math.PI * 2);
      ctx.arc(4, 0, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.4})`;
      ctx.fill();

      // Connection line
      ctx.beginPath();
      ctx.moveTo(-2, 0);
      ctx.lineTo(2, 0);
      ctx.stroke();
    };

    const drawDatabase = (ctx: CanvasRenderingContext2D, opacity: number) => {
      // Cylinder shape
      ctx.beginPath();
      ctx.ellipse(0, -7, 8, 3, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-8, -7);
      ctx.lineTo(-8, 7);
      ctx.ellipse(0, 7, 8, 3, 0, Math.PI, 0, true);
      ctx.lineTo(8, -7);
      ctx.stroke();

      // Middle lines
      ctx.beginPath();
      ctx.ellipse(0, -1, 8, 2.5, 0, Math.PI, 0, true);
      ctx.stroke();
    };

    const drawChart = (ctx: CanvasRenderingContext2D, opacity: number) => {
      // Axes
      ctx.beginPath();
      ctx.moveTo(-10, -10);
      ctx.lineTo(-10, 8);
      ctx.lineTo(10, 8);
      ctx.stroke();

      // Line chart
      ctx.beginPath();
      ctx.moveTo(-8, 4);
      ctx.lineTo(-4, -2);
      ctx.lineTo(0, 2);
      ctx.lineTo(4, -6);
      ctx.lineTo(8, -4);
      ctx.stroke();

      // Dots
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
      [-8, -4, 0, 4, 8].forEach((x, i) => {
        const y = [4, -2, 2, -6, -4][i];
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawUsers = (ctx: CanvasRenderingContext2D, opacity: number) => {
      // Main user
      ctx.beginPath();
      ctx.arc(0, -5, 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, 5, 6, 5, 0, Math.PI, 0, true);
      ctx.stroke();

      // Side user (smaller)
      ctx.beginPath();
      ctx.arc(9, -3, 2.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(9, 4, 4, 3.5, 0, Math.PI, 0, true);
      ctx.stroke();
    };

    const drawSubscription = (ctx: CanvasRenderingContext2D, opacity: number) => {
      // Credit card shape
      ctx.beginPath();
      ctx.roundRect(-10, -6, 20, 12, 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.12})`;
      ctx.fill();
      ctx.stroke();

      // Stripe
      ctx.beginPath();
      ctx.rect(-10, -3, 20, 3);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.25})`;
      ctx.fill();

      // Recurring symbol
      ctx.beginPath();
      ctx.arc(5, 3, 2, 0, Math.PI * 1.5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(5, 1);
      ctx.lineTo(7, 1);
      ctx.lineTo(5, -1);
      ctx.stroke();
    };

    const drawGear = (ctx: CanvasRenderingContext2D, opacity: number) => {
      const teeth = 8;
      const outerR = 10;
      const innerR = 6;

      ctx.beginPath();
      for (let i = 0; i < teeth; i++) {
        const angle1 = (i / teeth) * Math.PI * 2;
        const angle2 = ((i + 0.35) / teeth) * Math.PI * 2;
        const angle3 = ((i + 0.5) / teeth) * Math.PI * 2;
        const angle4 = ((i + 0.85) / teeth) * Math.PI * 2;

        if (i === 0) {
          ctx.moveTo(Math.cos(angle1) * innerR, Math.sin(angle1) * innerR);
        }
        ctx.lineTo(Math.cos(angle2) * innerR, Math.sin(angle2) * innerR);
        ctx.lineTo(Math.cos(angle2) * outerR, Math.sin(angle2) * outerR);
        ctx.lineTo(Math.cos(angle3) * outerR, Math.sin(angle3) * outerR);
        ctx.lineTo(Math.cos(angle4) * innerR, Math.sin(angle4) * innerR);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.12})`;
      ctx.fill();
      ctx.stroke();

      // Center hole
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
      ctx.fill();
      ctx.stroke();
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

      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.65})`;
      ctx.lineWidth = 1.5 / scale;

      switch (iconType) {
        case "cloud":
          drawCloud(ctx, opacity);
          break;
        case "dashboard":
          drawDashboard(ctx, opacity);
          break;
        case "api":
          drawApi(ctx, opacity);
          break;
        case "database":
          drawDatabase(ctx, opacity);
          break;
        case "chart":
          drawChart(ctx, opacity);
          break;
        case "users":
          drawUsers(ctx, opacity);
          break;
        case "subscription":
          drawSubscription(ctx, opacity);
          break;
        case "gear":
          drawGear(ctx, opacity);
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
        const floatY = Math.sin(time * icon.floatSpeed + icon.phase) * 10;
        const floatX = Math.cos(time * icon.floatSpeed * 0.7 + icon.phase) * 5;
        const pulseOpacity = icon.opacity * (0.75 + Math.sin(time * 0.7 + icon.phase) * 0.25);
        const pulseSize = icon.size * (0.92 + Math.sin(time * 0.5 + icon.phase) * 0.08);
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

export default SaaSIconsBackground;
