import React, { useEffect, useRef } from "react";

// Canvas-based flame/glare trail that follows the cursor with glow, taper, and particles.
const RainbowCursor: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const sizeRef = useRef({ w: window.innerWidth, h: window.innerHeight });
    const targetRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const headRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const lastRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; hue: number }>>([]);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        // Skip on coarse/touch pointers for performance
        const isCoarse = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
        if (isCoarse) return;

        const canvas = document.createElement("canvas");
        canvasRef.current = canvas;
        Object.assign(canvas.style, {
            position: "fixed",
            top: "0px",
            left: "0px",
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: "9999",
        });
        document.body.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        if (!ctx) return () => { };
        ctxRef.current = ctx;

        const resize = () => {
            sizeRef.current = { w: window.innerWidth, h: window.innerHeight };
            canvas.width = sizeRef.current.w;
            canvas.height = sizeRef.current.h;
        };
        resize();
        window.addEventListener("resize", resize);

        const spawnParticlesAlong = (from: { x: number; y: number }, to: { x: number; y: number }) => {
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const dist = Math.hypot(dx, dy);
            const steps = Math.min(24, Math.floor(dist / 8));
            for (let i = 0; i < steps; i++) {
                const t = i / steps;
                const px = from.x + dx * t + (Math.random() - 0.5) * 6;
                const py = from.y + dy * t + (Math.random() - 0.5) * 6;
                const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.6;
                const speed = 0.6 + Math.random() * 1.2;
                const hue = 285 + Math.random() * 50; // purple -> pink spectrum
                particlesRef.current.push({ x: px, y: py, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 0, max: 30 + Math.random() * 25, size: 6 + Math.random() * 8, hue });
                if (particlesRef.current.length > 160) particlesRef.current.shift();
            }
        };

        // Head glow removed to eliminate cursor circle

        const drawTaperedStroke = (from: { x: number; y: number }, to: { x: number; y: number }) => {
            const ctx = ctxRef.current!;
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const dist = Math.max(1, Math.hypot(dx, dy));
            const angle = Math.atan2(dy, dx);
            ctx.save();
            ctx.globalCompositeOperation = "lighter";
            const grad = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
            grad.addColorStop(0, "rgba(168,85,247,0.85)"); // violet
            grad.addColorStop(0.6, "rgba(236,72,153,0.75)"); // pink
            grad.addColorStop(1, "rgba(6,182,212,0.55)"); // cyan tail
            ctx.strokeStyle = grad;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.lineWidth = Math.min(28, 10 + dist * 0.2);
            // Taper by drawing multiple strokes reducing width
            for (let i = 0; i < 4; i++) {
                ctx.globalAlpha = 0.25 - i * 0.05;
                ctx.beginPath();
                ctx.moveTo(from.x, from.y);
                ctx.lineTo(to.x, to.y);
                ctx.stroke();
            }
            ctx.restore();
        };

        const step = () => {
            rafRef.current = requestAnimationFrame(step);
            const ctx = ctxRef.current!;
            const { w, h } = sizeRef.current;
            // Transparent fade: reduce existing pixels' alpha without whitening the page
            ctx.globalCompositeOperation = "destination-out";
            ctx.fillStyle = "rgba(0,0,0,0.12)";
            ctx.fillRect(0, 0, w, h);

            // Move head toward target
            const { x, y } = headRef.current;
            const { x: tx, y: ty } = targetRef.current;
            headRef.current.x += (tx - x) * 0.25;
            headRef.current.y += (ty - y) * 0.25;

            // Stroke from last to head
            drawTaperedStroke(lastRef.current, headRef.current);

            // Particles update/draw
            ctx.globalCompositeOperation = "lighter";
            for (let i = particlesRef.current.length - 1; i >= 0; i--) {
                const p = particlesRef.current[i];
                p.life++;
                p.x += p.vx;
                p.y += p.vy;
                const lifeRatio = p.life / p.max;
                const alpha = Math.max(0, 1 - lifeRatio);
                const r = p.size * (1 - lifeRatio * 0.8);
                const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
                g.addColorStop(0, `hsla(${p.hue}, 90%, 65%, ${0.9 * alpha})`);
                g.addColorStop(0.6, `hsla(${p.hue + 20}, 90%, 60%, ${0.5 * alpha})`);
                g.addColorStop(1, "rgba(255,255,255,0)");
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
                ctx.fill();
                if (p.life >= p.max) particlesRef.current.splice(i, 1);
            }

            // Head glow removed
        };

        const onMouseMove = (e: MouseEvent) => {
            const now = { x: e.clientX, y: e.clientY };
            spawnParticlesAlong(lastRef.current, now);
            lastRef.current = now;
            targetRef.current = now;
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        rafRef.current = requestAnimationFrame(step);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            canvas.remove();
        };
    }, []);

    return null;
};

export default RainbowCursor;
