import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import FloatingIcons from "@/components/FloatingIcons";
import { useLanguage } from "@/contexts/LanguageContext";

// Network node type
interface NetworkNode {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

// Animated network background component
const NetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<NetworkNode[]>([]);
  const animationRef = useRef<number>(0);
  const initializedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastWidth = 0;
    let lastHeight = 0;

    const initNodes = (width: number, height: number) => {
      const nodeCount = width < 768 ? 40 : 70;
      const nodes: NetworkNode[] = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 4 + 2,
        });
      }
      nodesRef.current = nodes;
    };

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const newWidth = rect.width;
      const newHeight = rect.height;
      canvas.width = newWidth;
      canvas.height = newHeight;
      const widthChange = Math.abs(newWidth - lastWidth);
      const heightChange = Math.abs(newHeight - lastHeight);
      if (!initializedRef.current || widthChange > 100 || heightChange > 100) {
        initNodes(newWidth, newHeight);
        initializedRef.current = true;
        lastWidth = newWidth;
        lastHeight = newHeight;
      } else {
        const scaleX = newWidth / (lastWidth || newWidth);
        const scaleY = newHeight / (lastHeight || newHeight);
        nodesRef.current.forEach(node => {
          node.x = Math.min(newWidth, Math.max(0, node.x * scaleX));
          node.y = Math.min(newHeight, Math.max(0, node.y * scaleY));
        });
        lastWidth = newWidth;
        lastHeight = newHeight;
      }
    };

    resizeCanvas();

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);
      const nodes = nodesRef.current;
      const connectionDistance = width < 768 ? 120 : 180;

      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = `rgba(45, 156, 157, ${opacity * 0.25})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach(node => {
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 2);
        gradient.addColorStop(0, 'rgba(45, 156, 157, 0.9)');
        gradient.addColorStop(0.5, 'rgba(45, 156, 157, 0.4)');
        gradient.addColorStop(1, 'rgba(45, 156, 157, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(45, 156, 157, 1)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

// Animated text with word-by-word reveal
const AnimatedHeadingLine = ({ 
  children, 
  delay = 0,
  className = ""
}: { 
  children: string; 
  delay?: number;
  className?: string;
}) => {
  const words = children.split(" ");
  return (
    <motion.span className={`block ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: delay + wordIndex * 0.1,
              ease: [0.33, 1, 0.68, 1]
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      <NetworkBackground />
      <FloatingIcons />

      {/* Hero Content */}
      <div className="relative z-10 container px-6 lg:px-12 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-tight leading-[0.95]">
            <AnimatedHeadingLine delay={0.05} className="text-foreground">
              {t("hero.line1")}
            </AnimatedHeadingLine>
            <AnimatedHeadingLine delay={0.15} className="text-gradient">
              {t("hero.line2")}
            </AnimatedHeadingLine>
          </h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-3"
          >
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <motion.p 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="text-base md:text-lg text-primary font-medium tracking-wide"
            >
              {t("hero.values")}
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Button 
              size="lg" 
              className="px-8 py-6 text-base font-semibold group magnetic-hover"
              asChild
            >
              <Link to="/contact">
                {t("hero.cta.start")}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform icon-hover" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-6 text-base font-semibold magnetic-hover"
              onClick={() => {
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                  servicesSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {t("hero.cta.services")}
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent origin-center" 
      />
    </section>
  );
};

export default Hero;
