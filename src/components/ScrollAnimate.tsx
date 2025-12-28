import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimateProps {
    children: React.ReactNode;
    className?: string;
    animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scale' | 'rotate';
}

const ScrollAnimate: React.FC<ScrollAnimateProps> = ({
    children,
    className = '',
    animation = 'fadeInUp',
}) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!elementRef.current) return;

        const element = elementRef.current;

        // Set initial state based on animation type
        const initialState = {
            fadeInUp: { opacity: 0, y: 50 },
            fadeInLeft: { opacity: 0, x: -50 },
            fadeInRight: { opacity: 0, x: 50 },
            scale: { opacity: 0, scale: 0.8 },
            rotate: { opacity: 0, rotation: -15 },
        };

        gsap.set(element, initialState[animation]);

        // Create scroll trigger animation
        gsap.to(element, {
            opacity: 1,
            ...(() => {
                switch (animation) {
                    case 'fadeInUp':
                        return { y: 0 };
                    case 'fadeInLeft':
                        return { x: 0 };
                    case 'fadeInRight':
                        return { x: 0 };
                    case 'scale':
                        return { scale: 1 };
                    case 'rotate':
                        return { rotation: 0 };
                    default:
                        return {};
                }
            })(),
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse',
                markers: false,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [animation]);

    return (
        <div ref={elementRef} className={className}>
            {children}
        </div>
    );
};

export default ScrollAnimate;
