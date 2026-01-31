import { useEffect, useRef } from "react";

interface Block {
  x: number;
  y: number;
  size: number;
  baseY: number;
  phase: number;
  speed: number;
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
    let blocks: Block[] = [];

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        initBlocks();
      }
    };

    const initBlocks = () => {
      blocks = [];
      const { width, height } = canvas;
      const cubeSize = 50;
      const spacingX = cubeSize * 2.2;
      const spacingY = cubeSize * 1.8;

      for (let row = -2; row < height / spacingY + 3; row++) {
        for (let col = -2; col < width / spacingX + 3; col++) {
          const offsetX = row % 2 === 0 ? cubeSize : 0;
          const x = col * spacingX + offsetX;
          const y = row * spacingY;

          // Calculate distance from center for opacity
          const centerX = width / 2;
          const centerY = height / 2;
          const dx = x - centerX;
          const dy = y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
          const opacity = Math.max(0.15, 0.8 - (distance / maxDistance) * 0.6);

          blocks.push({
            x,
            y,
            baseY: y,
            size: cubeSize * 0.55,
            phase: (x + y) * 0.02 + Math.random() * 0.5,
            speed: 0.3 + Math.random() * 0.2,
            opacity,
          });
        }
      }
    };

    const drawIsometricCube = (
      x: number,
      y: number,
      size: number,
      opacity: number
    ) => {
      const h = size * 0.5;

      // Top face (brightest)
      ctx.beginPath();
      ctx.moveTo(x, y - h);
      ctx.lineTo(x + size, y);
      ctx.lineTo(x, y + h);
      ctx.lineTo(x - size, y);
      ctx.closePath();
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.18})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Left face
      ctx.beginPath();
      ctx.moveTo(x - size, y);
      ctx.lineTo(x, y + h);
      ctx.lineTo(x, y + h + size * 0.8);
      ctx.lineTo(x - size, y + size * 0.8);
      ctx.closePath();
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.1})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.22})`;
      ctx.stroke();

      // Right face (darkest)
      ctx.beginPath();
      ctx.moveTo(x + size, y);
      ctx.lineTo(x, y + h);
      ctx.lineTo(x, y + h + size * 0.8);
      ctx.lineTo(x + size, y + size * 0.8);
      ctx.closePath();
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.05})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.22})`;
      ctx.stroke();
    };

    let time = 0;

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      time += 0.015;

      // Sort blocks by y position for proper layering
      const sortedBlocks = [...blocks].sort((a, b) => {
        const aY = a.baseY + Math.sin(time * a.speed + a.phase) * 12;
        const bY = b.baseY + Math.sin(time * b.speed + b.phase) * 12;
        return aY - bY;
      });

      sortedBlocks.forEach((block) => {
        // Smooth wave animation
        const waveOffset = Math.sin(time * block.speed + block.phase) * 12;
        const currentY = block.baseY + waveOffset;

        // Subtle opacity variation based on wave position
        const opacityMod = 0.85 + Math.sin(time * block.speed + block.phase) * 0.15;

        drawIsometricCube(
          block.x,
          currentY,
          block.size,
          block.opacity * opacityMod
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
      style={{ opacity: 0.75 }}
    />
  );
};

export default GeometricBlocksBackground;
