import { useEffect, useRef } from "react";

const GeometricBlocksBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    const drawIsometricCube = (
      x: number,
      y: number,
      size: number,
      opacity: number,
      offset: number
    ) => {
      const h = size * 0.5;
      const wobble = Math.sin(offset) * 2;

      // Top face
      ctx.beginPath();
      ctx.moveTo(x, y - h + wobble);
      ctx.lineTo(x + size, y + wobble);
      ctx.lineTo(x, y + h + wobble);
      ctx.lineTo(x - size, y + wobble);
      ctx.closePath();
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.25})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Left face
      ctx.beginPath();
      ctx.moveTo(x - size, y + wobble);
      ctx.lineTo(x, y + h + wobble);
      ctx.lineTo(x, y + h + size + wobble);
      ctx.lineTo(x - size, y + size + wobble);
      ctx.closePath();
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.08})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
      ctx.stroke();

      // Right face
      ctx.beginPath();
      ctx.moveTo(x + size, y + wobble);
      ctx.lineTo(x, y + h + wobble);
      ctx.lineTo(x, y + h + size + wobble);
      ctx.lineTo(x + size, y + size + wobble);
      ctx.closePath();
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.05})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
      ctx.stroke();
    };

    let time = 0;

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      time += 0.005;

      // Create a grid of isometric cubes
      const cubeSize = 60;
      const spacingX = cubeSize * 2;
      const spacingY = cubeSize * 1.5;

      for (let row = -2; row < height / spacingY + 2; row++) {
        for (let col = -2; col < width / spacingX + 2; col++) {
          const offsetX = row % 2 === 0 ? cubeSize : 0;
          const x = col * spacingX + offsetX;
          const y = row * spacingY;

          // Calculate distance from center for opacity falloff
          const centerX = width / 2;
          const centerY = height / 2;
          const dx = x - centerX;
          const dy = y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
          const opacity = Math.max(0.2, 1 - distance / maxDistance);

          // Animate with phase offset based on position
          const phaseOffset = time + (x + y) * 0.01;

          drawIsometricCube(x, y, cubeSize * 0.6, opacity * 0.6, phaseOffset);
        }
      }

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
      style={{ opacity: 0.7 }}
    />
  );
};

export default GeometricBlocksBackground;
