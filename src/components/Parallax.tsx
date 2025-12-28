import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxProps {
    children: React.ReactNode;
    speed?: number;
    className?: string;
}

const Parallax: React.FC<ParallaxProps> = ({ children, speed = 0.5, className = '' }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Check if device is mobile
        const isMobile = window.innerWidth < 768;
        if (isMobile) return; // Skip parallax on mobile for performance

        const ctx = gsap.context(() => {
            gsap.to(containerRef.current, {
                y: (i, target) => {
                    return gsap.getProperty(target, 'offsetHeight') as number * speed;
                },
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top center',
                    end: 'bottom center',
                    scrub: 1,
                    markers: false,
                },
            });
        });

        return () => ctx.revert();
    }, [speed]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
};

export default Parallax;
