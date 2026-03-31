import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import About from './About';
import HowItWorks from './HowItWorks';

gsap.registerPlugin(ScrollTrigger);

const CinematicScrollScene = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const mechanicsRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Timeline tied to the wrapper (400vh tall)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top top",
                end: "bottom bottom", 
                scrub: 0.4, // Resposta rápida ao scroll
                invalidateOnRefresh: true,
            }
        });

        // Phase 1: About exits upward with scale reduction
        tl.to(aboutRef.current, {
            yPercent: -100, // Move it completely off-screen upwards
            scale: 0.85,
            autoAlpha: 0, // Automatically adds visibility:hidden when 0 to prevent render bugs
            ease: "power2.inOut",
            duration: 1 
        }, 0);

        // Phase 1b: Mechanics enters shortly after, with strong overlap
        tl.fromTo(mechanicsRef.current, {
            yPercent: 80,
            scale: 0.85,
            opacity: 0,
        }, {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            ease: "none",
            duration: 0.85
        }, 0.15);

        // Phase 2: Horizontal scroll for Mechanics
        if (trackRef.current) {
            tl.to(trackRef.current, {
                x: () => -(trackRef.current!.scrollWidth - window.innerWidth),
                ease: "none",
                duration: 3
            });
        }

        // Phase 3: Dead Zone mínima — apenas o suficiente para não sobrepor
        tl.to({}, { duration: 0.85 });

    }, { scope: wrapperRef });

    return (
        <div id="sobre" ref={wrapperRef} className="relative w-full z-10" style={{ height: '700vh' }}>
            {/* O container pegajoso. Fica preso no topo enquanto o wrapper escorre por 400vh. */}
            <div ref={containerRef} className="sticky top-0 left-0 w-full h-screen bg-[#040409] overflow-hidden rounded-t-[2.5rem] shadow-[0_-5px_25px_rgba(0,0,0,0.4)] z-[1]">
                
                {/* Mechanics Layer (behind, z-10) */}
                <div ref={mechanicsRef} className="absolute inset-0 w-full h-full bg-transparent z-10 overflow-hidden">
                    <HowItWorks ref={trackRef} />
                </div>

                {/* About Layer (on top, z-20 — exits upward revealing Mechanics) */}
                <div ref={aboutRef} className="absolute inset-0 w-full h-full bg-[#040409] z-20 flex items-center justify-center pointer-events-none">
                    <About />
                </div>
                
            </div>
        </div>
    );
};

export default CinematicScrollScene;
