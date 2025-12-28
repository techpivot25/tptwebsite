import React, { useRef, useEffect } from 'react';

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    connections: number[];
}

interface Pulse {
    from: number;
    to: number;
    progress: number;
    speed: number;
}

const AnimatedCanvasBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nodesRef = useRef<Node[]>([]);
    const pulsesRef = useRef<Pulse[]>([]);
    const animationIdRef = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();

        // Create neural network nodes
        const createNodes = () => {
            const nodes: Node[] = [];
            // Reduce node count on mobile for better performance
            const isMobile = window.innerWidth < 768;
            const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
            const nodeCount = isMobile ? (isLowEnd ? 8 : 12) : (isLowEnd ? 15 : 25);

            for (let i = 0; i < nodeCount; i++) {
                nodes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    radius: Math.random() * 2 + 2,
                    connections: []
                });
            }

            // Create connections between nearby nodes
            nodes.forEach((node, i) => {
                nodes.forEach((otherNode, j) => {
                    if (i >= j) return;
                    const dx = node.x - otherNode.x;
                    const dy = node.y - otherNode.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 250) {
                        node.connections.push(j);
                    }
                });
            });

            return nodes;
        };

        nodesRef.current = createNodes();

        // Create initial pulses
        const createPulse = () => {
            const nodes = nodesRef.current;
            const nodeIndex = Math.floor(Math.random() * nodes.length);
            const node = nodes[nodeIndex];

            if (node.connections.length > 0) {
                const targetIndex = node.connections[Math.floor(Math.random() * node.connections.length)];
                pulsesRef.current.push({
                    from: nodeIndex,
                    to: targetIndex,
                    progress: 0,
                    speed: 0.01 + Math.random() * 0.02
                });
            }
        };

        // Animation loop
        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate);

            // Clear with slight fade
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw nodes
            nodesRef.current.forEach((node, index) => {
                // Update position
                node.x += node.vx;
                node.y += node.vy;

                // Bounce off walls
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                // Keep in bounds
                node.x = Math.max(0, Math.min(canvas.width, node.x));
                node.y = Math.max(0, Math.min(canvas.height, node.y));

                // Draw connections
                node.connections.forEach(targetIndex => {
                    const target = nodesRef.current[targetIndex];
                    const dx = target.x - node.x;
                    const dy = target.y - node.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Draw connection line
                    ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - distance / 250)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(target.x, target.y);
                    ctx.stroke();
                });

                // Draw node glow
                const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 4);
                gradient.addColorStop(0, 'rgba(6, 182, 212, 0.4)');
                gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
                ctx.fill();

                // Draw node core
                ctx.fillStyle = '#06b6d4';
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            // Update and draw pulses
            pulsesRef.current = pulsesRef.current.filter(pulse => {
                pulse.progress += pulse.speed;

                if (pulse.progress >= 1) return false;

                const from = nodesRef.current[pulse.from];
                const to = nodesRef.current[pulse.to];

                const x = from.x + (to.x - from.x) * pulse.progress;
                const y = from.y + (to.y - from.y) * pulse.progress;

                // Draw pulse glow
                const pulseGradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
                pulseGradient.addColorStop(0, 'rgba(14, 165, 233, 0.8)');
                pulseGradient.addColorStop(1, 'rgba(14, 165, 233, 0)');
                ctx.fillStyle = pulseGradient;
                ctx.beginPath();
                ctx.arc(x, y, 8, 0, Math.PI * 2);
                ctx.fill();

                // Draw pulse core
                ctx.fillStyle = '#0ea5e9';
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fill();

                return true;
            });

            // Randomly create new pulses
            if (Math.random() < 0.05 && pulsesRef.current.length < 15) {
                createPulse();
            }
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            setCanvasSize();
            nodesRef.current = createNodes();
            pulsesRef.current = [];
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationIdRef.current !== null) {
                cancelAnimationFrame(animationIdRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f0f4f8 100%)',
                opacity: 0.8,
            }}
        />
    );
};

export default AnimatedCanvasBackground;
