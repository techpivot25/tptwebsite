import { useEffect, useRef, useState, memo } from 'react';
import gsap from 'gsap';

interface AnimatedCounterProps {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    className?: string;
}

const AnimatedCounter = memo(({
    end,
    duration = 2,
    suffix = '',
    prefix = '',
    className = ''
}: AnimatedCounterProps) => {
    const countRef = useRef<HTMLDivElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (!countRef.current || hasAnimated) return;

        const isMobile = window.innerWidth < 768;
        const totalDuration = (isMobile ? duration * 0.8 : duration) * 1.35; // slightly slower globally

        const startAnimation = () => {
            if (!countRef.current) return;
            setHasAnimated(true);
            const tl = gsap.timeline();

            // Step 1: casino spin - random digits flicker
            const spin = { p: 0 };
            tl.to(spin, {
                p: 1,
                duration: Math.max(0.5, totalDuration * 0.6),
                ease: 'power1.inOut',
                onUpdate: () => {
                    if (!countRef.current) return;
                    const targetStr = end.toString();
                    const digits = targetStr.replace(/\D/g, '').length || targetStr.length;
                    let out = '';
                    for (let i = 0; i < digits; i++) {
                        out += Math.floor(Math.random() * 10).toString();
                    }
                    countRef.current.textContent = `${prefix}${out}${suffix}`;
                },
            });

            // Step 2: count up to final value smoothly
            const counter = { value: 0 };
            tl.to(counter, {
                value: end,
                duration: Math.max(0.7, totalDuration * 0.4),
                ease: 'power3.out',
                onUpdate: () => {
                    if (!countRef.current) return;
                    const val = Math.floor(counter.value);
                    countRef.current.textContent = `${prefix}${val.toLocaleString()}${suffix}`;
                },
            });
        };

        // Helper: is element currently in viewport
        const el = countRef.current;
        const inViewport = (node: HTMLElement) => {
            const rect = node.getBoundingClientRect();
            const vh = window.innerHeight || document.documentElement.clientHeight;
            const vw = window.innerWidth || document.documentElement.clientWidth;
            return rect.top < vh && rect.bottom > 0 && rect.left < vw && rect.right > 0;
        };

        // If visible now, start immediately
        if (inViewport(el)) {
            startAnimation();
            return;
        }

        // Otherwise observe visibility with lower threshold
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting && !hasAnimated) {
                        startAnimation();
                        observer.disconnect();
                        break;
                    }
                }
            }, { threshold: 0.2, root: null });
            observer.observe(el);
            return () => observer.disconnect();
        }

        // Fallback: start soon
        const id = requestAnimationFrame(startAnimation);
        return () => cancelAnimationFrame(id);
    }, [end, duration, suffix, prefix, hasAnimated]);

    return (
        <div ref={countRef} className={className}>
            {prefix}0{suffix}
        </div>
    );
});

AnimatedCounter.displayName = 'AnimatedCounter';

export default AnimatedCounter;
