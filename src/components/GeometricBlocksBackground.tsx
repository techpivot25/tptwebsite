import { useEffect, useRef } from "react";

interface Block {
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  depth: number;
  phase: number;
  hasIcon: boolean;
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

          // Randomly assign security icons to ~22.5% of blocks (increased by 50%)
          const hasIcon = Math.random() < 0.225;

          blocks.push({
            x,
            y,
            z: Math.random() * 30,
            width: blockWidth * widthVar,
            height: blockHeight * heightVar,
            depth: 60 * depthVar,
            phase: (x * 0.01 + y * 0.015) + Math.random() * 2,
            hasIcon,
          });
        }
      }

      // Sort by y position for proper layering
      blocks.sort((a, b) => a.y - b.y);
    };

    // Draw shield with lock icon
    const drawSecurityIcon = (centerX: number, centerY: number, size: number) => {
      ctx.save();
      ctx.translate(centerX, centerY);
      
      const scale = size / 24; // Base icon size is 24
      ctx.scale(scale, scale);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
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
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
      ctx.fill();
      ctx.stroke();

      // Lock shackle (the curved part on top)
      ctx.beginPath();
      ctx.arc(0, -1, 3, Math.PI, 0, false);
      ctx.stroke();

      // Keyhole
      ctx.beginPath();
      ctx.arc(0, 2, 1, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.fill();

      ctx.restore();
    };

    const drawBlock = (
      x: number,
      y: number,
      w: number,
      h: number,
      d: number,
      zOffset: number,
      hasIcon: boolean
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

      // Subtle shadow underneath
      ctx.beginPath();
      ctx.moveTo(bottomLeft.x + 5, bottomLeft.y + 8);
      ctx.lineTo(bottomRight.x + 5, bottomRight.y + 8);
      ctx.lineTo(bottomRight.x + depthX + 5, bottomRight.y + depthY + 8);
      ctx.lineTo(bottomLeft.x + depthX + 5, bottomLeft.y + depthY + 8);
      ctx.closePath();
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fill();

      // Top face (brightest - the main visible surface)
      ctx.beginPath();
      ctx.moveTo(topLeft.x, topLeft.y);
      ctx.lineTo(topLeft.x + depthX, topLeft.y + depthY);
      ctx.lineTo(topRight.x + depthX, topRight.y + depthY);
      ctx.lineTo(topRight.x, topRight.y);
      ctx.closePath();
      ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Right face
      ctx.beginPath();
      ctx.moveTo(topRight.x, topRight.y);
      ctx.lineTo(topRight.x + depthX, topRight.y + depthY);
      ctx.lineTo(bottomRight.x + depthX, bottomRight.y + depthY);
      ctx.lineTo(bottomRight.x, bottomRight.y);
      ctx.closePath();
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.stroke();

      // Front face (visible bottom)
      ctx.beginPath();
      ctx.moveTo(topLeft.x, topLeft.y);
      ctx.lineTo(topRight.x, topRight.y);
      ctx.lineTo(bottomRight.x, bottomRight.y);
      ctx.lineTo(bottomLeft.x, bottomLeft.y);
      ctx.closePath();
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.stroke();

      // Draw security icon on top face if this block has one
      if (hasIcon) {
        // Calculate center of the front face (more visible)
        const frontCenterX = x + w / 2;
        const frontCenterY = adjustedY + h / 2;
        
        // Larger icon size for better visibility
        const iconSize = Math.min(w, h) * 0.7;
        drawSecurityIcon(frontCenterX, frontCenterY, iconSize);
      }
    };

    let time = 0;

    const draw = () => {
      const { width, height } = canvas;
      
      // Clear canvas (transparent - keep original dark background)
      ctx.clearRect(0, 0, width, height);

      // Increased speed by 15%
      time += 0.0092;

      blocks.forEach((block) => {
        // Gentle floating animation
        const floatOffset = Math.sin(time + block.phase) * 6 + block.z;
        
        // Pulsing scale effect - blocks expand and reduce
        const scalePhase = time * 0.8 + block.phase * 0.5;
        const scaleFactor = 1 + Math.sin(scalePhase) * 0.12; // 12% size variation

        drawBlock(
          block.x,
          block.y,
          block.width * scaleFactor,
          block.height * scaleFactor,
          block.depth * scaleFactor,
          floatOffset,
          block.hasIcon
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
