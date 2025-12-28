import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GsapHeroAnimation: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Title animation
        if (titleRef.current) {
            gsap.from(titleRef.current, {
                duration: 1.2,
                opacity: 0,
                y: 50,
                ease: 'power4.out',
            });
        }

        // Description animation
        if (descRef.current) {
            gsap.from(descRef.current, {
                duration: 1.2,
                opacity: 0,
                y: 30,
                delay: 0.2,
                ease: 'power4.out',
            });
        }

        // CTA animation
        if (ctaRef.current) {
            gsap.from(ctaRef.current, {
                duration: 1.2,
                opacity: 0,
                y: 30,
                delay: 0.4,
                ease: 'power4.out',
            });
        }

        // Floating animation
        gsap.to(containerRef.current, {
            y: 20,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        });

        return () => {
            gsap.killTweensOf([titleRef.current, descRef.current, ctaRef.current, containerRef.current]);
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full">
            {React.Children.map(children, (child, index) => {
                if (index === 0) {
                    return React.cloneElement(child as React.ReactElement, { ref: titleRef });
                }
                if (index === 1) {
                    return React.cloneElement(child as React.ReactElement, { ref: descRef });
                }
                if (index === 2) {
                    return React.cloneElement(child as React.ReactElement, { ref: ctaRef });
                }
                return child;
            })}
        </div>
    );
};

export default GsapHeroAnimation;
