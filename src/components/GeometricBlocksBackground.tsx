import { useEffect, useRef } from "react";

interface Block {
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  depth: number;
  phase: number;
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

      // Create large architectural blocks in a staggered grid
      const blockWidth = 120;
      const blockHeight = 80;
      const spacingX = blockWidth * 1.4;
      const spacingY = blockHeight * 1.2;

      for (let row = -3; row < height / spacingY + 4; row++) {
        for (let col = -3; col < width / spacingX + 4; col++) {
          // Stagger alternate rows
          const offsetX = row % 2 === 0 ? blockWidth * 0.7 : 0;
          const x = col * spacingX + offsetX;
          const y = row * spacingY;

          // Vary block dimensions for visual interest
          const widthVar = 0.8 + Math.random() * 0.4;
          const heightVar = 0.6 + Math.random() * 0.8;
          const depthVar = 0.5 + Math.random() * 0.5;

          blocks.push({
            x,
            y,
            z: Math.random() * 30,
            width: blockWidth * widthVar,
            height: blockHeight * heightVar,
            depth: 60 * depthVar,
            phase: (x * 0.01 + y * 0.015) + Math.random() * 2,
          });
        }
      }

      // Sort by y position for proper layering
      blocks.sort((a, b) => a.y - b.y);
    };

    const drawBlock = (
      x: number,
      y: number,
      w: number,
      h: number,
      d: number,
      zOffset: number
    ) => {
      // Isometric projection angles
      const isoX = 0.7;
      const isoY = 0.4;

      // Apply z offset for floating effect
      const adjustedY = y - zOffset;

      // Calculate 3D corners
      const topLeft = { x: x, y: adjustedY };
      const topRight = { x: x + w, y: adjustedY };
      const bottomLeft = { x: x, y: adjustedY + h };
      const bottomRight = { x: x + w, y: adjustedY + h };

      // 3D offset for depth
      const depthX = d * isoX;
      const depthY = -d * isoY;

      // Top face (brightest - the main visible surface)
      ctx.beginPath();
      ctx.moveTo(topLeft.x, topLeft.y);
      ctx.lineTo(topLeft.x + depthX, topLeft.y + depthY);
      ctx.lineTo(topRight.x + depthX, topRight.y + depthY);
      ctx.lineTo(topRight.x, topRight.y);
      ctx.closePath();
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.fill();
      ctx.strokeStyle = "rgba(200, 200, 200, 0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Right face
      ctx.beginPath();
      ctx.moveTo(topRight.x, topRight.y);
      ctx.lineTo(topRight.x + depthX, topRight.y + depthY);
      ctx.lineTo(bottomRight.x + depthX, bottomRight.y + depthY);
      ctx.lineTo(bottomRight.x, bottomRight.y);
      ctx.closePath();
      ctx.fillStyle = "rgba(240, 240, 240, 0.9)";
      ctx.fill();
      ctx.strokeStyle = "rgba(180, 180, 180, 0.3)";
      ctx.stroke();

      // Front face (visible bottom)
      ctx.beginPath();
      ctx.moveTo(topLeft.x, topLeft.y);
      ctx.lineTo(topRight.x, topRight.y);
      ctx.lineTo(bottomRight.x, bottomRight.y);
      ctx.lineTo(bottomLeft.x, bottomLeft.y);
      ctx.closePath();
      ctx.fillStyle = "rgba(250, 250, 250, 0.85)";
      ctx.fill();
      ctx.strokeStyle = "rgba(200, 200, 200, 0.35)";
      ctx.stroke();

      // Subtle shadow underneath
      ctx.beginPath();
      ctx.moveTo(bottomLeft.x + 5, bottomLeft.y + 8);
      ctx.lineTo(bottomRight.x + 5, bottomRight.y + 8);
      ctx.lineTo(bottomRight.x + depthX + 5, bottomRight.y + depthY + 8);
      ctx.lineTo(bottomLeft.x + depthX + 5, bottomLeft.y + depthY + 8);
      ctx.closePath();
      ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
      ctx.fill();
    };

    let time = 0;

    const draw = () => {
      const { width, height } = canvas;
      
      // Light gray background
      ctx.fillStyle = "rgba(245, 245, 247, 1)";
      ctx.fillRect(0, 0, width, height);

      time += 0.008;

      blocks.forEach((block) => {
        // Gentle floating animation
        const floatOffset = Math.sin(time + block.phase) * 6 + block.z;

        drawBlock(
          block.x,
          block.y,
          block.width,
          block.height,
          block.depth,
          floatOffset
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
