import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    useEffect(() => {
        // Create smooth scroller
        const smoother = ScrollSmoother.create({
            smooth: 2, // Smoothness factor (higher = smoother)
            effects: true,
            onUpdate: (self) => {
                // Update scroll trigger animations
                ScrollTrigger.update();
            },
        });

        return () => {
            // Cleanup
            if (smoother) {
                smoother.kill();
            }
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
