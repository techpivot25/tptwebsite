import { useEffect, useRef } from "react";

type IconType = "cloud" | "database" | "gear" | "node";

interface SaaSNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
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
    let nodes: SaaSNode[] = [];

    const iconTypes: IconType[] = ["cloud", "database", "gear", "node", "node", "node"];

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        initNodes();
      }
    };

    const initNodes = () => {
      nodes = [];
      const { width, height } = canvas;
      const nodeCount = Math.floor((width * height) / 18000);

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: 16 + Math.random() * 12,
          phase: Math.random() * Math.PI * 2,
          opacity: 0.25 + Math.random() * 0.2,
          iconType: iconTypes[Math.floor(Math.random() * iconTypes.length)],
        });
      }
    };

    const drawCloud = (size: number, opacity: number) => {
      const scale = size / 24;
      ctx.save();
      ctx.scale(scale, scale);
      ctx.beginPath();
      ctx.arc(-4, 2, 4, Math.PI * 0.5, Math.PI * 1.5);
      ctx.arc(0, -2, 5, Math.PI, Math.PI * 1.85);
      ctx.arc(5, 0, 4, Math.PI * 1.3, Math.PI * 0.5);
      ctx.lineTo(-4, 6);
      ctx.closePath();
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.1})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;
      ctx.lineWidth = 1.2 / scale;
      ctx.stroke();
      ctx.restore();
    };

    const drawDatabase = (size: number, opacity: number) => {
      const scale = size / 24;
      ctx.save();
      ctx.scale(scale, scale);
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.1})`;
      ctx.lineWidth = 1.2 / scale;

      ctx.beginPath();
      ctx.ellipse(0, -5, 6, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-6, -5);
      ctx.lineTo(-6, 5);
      ctx.ellipse(0, 5, 6, 2.5, 0, Math.PI, 0, true);
      ctx.lineTo(6, -5);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, 0, 6, 2, 0, Math.PI, 0, true);
      ctx.stroke();
      ctx.restore();
    };

    const drawGear = (size: number, opacity: number) => {
      const scale = size / 24;
      ctx.save();
      ctx.scale(scale, scale);
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.1})`;
      ctx.lineWidth = 1.2 / scale;

      const teeth = 6;
      const outerR = 8;
      const innerR = 5;

      ctx.beginPath();
      for (let i = 0; i < teeth; i++) {
        const a1 = (i / teeth) * Math.PI * 2;
        const a2 = ((i + 0.3) / teeth) * Math.PI * 2;
        const a3 = ((i + 0.5) / teeth) * Math.PI * 2;
        const a4 = ((i + 0.8) / teeth) * Math.PI * 2;

        if (i === 0) ctx.moveTo(Math.cos(a1) * innerR, Math.sin(a1) * innerR);
        ctx.lineTo(Math.cos(a2) * innerR, Math.sin(a2) * innerR);
        ctx.lineTo(Math.cos(a2) * outerR, Math.sin(a2) * outerR);
        ctx.lineTo(Math.cos(a3) * outerR, Math.sin(a3) * outerR);
        ctx.lineTo(Math.cos(a4) * innerR, Math.sin(a4) * innerR);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    };

    const drawNode = (size: number, opacity: number) => {
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.15, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
      ctx.fill();
    };

    const drawIcon = (node: SaaSNode) => {
      ctx.save();
      ctx.translate(node.x, node.y);

      switch (node.iconType) {
        case "cloud":
          drawCloud(node.size, node.opacity);
          break;
        case "database":
          drawDatabase(node.size, node.opacity);
          break;
        case "gear":
          drawGear(node.size, node.opacity);
          break;
        case "node":
          drawNode(node.size, node.opacity);
          break;
      }

      ctx.restore();
    };

    const drawConnections = () => {
      const connectionDistance = 180;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    let time = 0;

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // Update positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Keep in bounds
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));

        // Gentle floating
        node.opacity = 0.25 + Math.sin(time * 0.5 + node.phase) * 0.1;
      });

      // Draw connections first
      drawConnections();

      // Draw icons on top
      nodes.forEach(drawIcon);

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
