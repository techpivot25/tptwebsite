import { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealTextProps {
    children: React.ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right';
    duration?: number;
    delay?: number;
    className?: string;
}

const ScrollRevealText = memo(({
    children,
    direction = 'up',
    duration = 0.8,
    delay = 0,
    className = ''
}: ScrollRevealTextProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Reduce animation complexity on mobile
        const isMobile = window.innerWidth < 768;
        const animDuration = isMobile ? duration * 0.7 : duration;

        const ctx = gsap.context(() => {
            const fromVars: any = {
                opacity: 0,
                duration: animDuration,
                delay,
                ease: 'power2.out',
            };

            switch (direction) {
                case 'up':
                    fromVars.y = 40;
                    break;
                case 'down':
                    fromVars.y = -40;
                    break;
                case 'left':
                    fromVars.x = 40;
                    break;
                case 'right':
                    fromVars.x = -40;
                    break;
            }

            gsap.fromTo(
                containerRef.current,
                fromVars,
                {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 85%',
                        once: true, // Only animate once
                        toggleActions: 'play none none none',
                    },
                }
            );
        });

        return () => ctx.revert();
    }, [direction, duration, delay]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
});

ScrollRevealText.displayName = 'ScrollRevealText';

export default ScrollRevealText;
