import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';

const HeroRealityWrapper = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);

    // Parallax background over the combined height
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

    // Mouse tracking for spotlight effect via MotionValue (no React re-renders)
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);

    const maskImage = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, black, transparent)`;
    const webkitMaskImage = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top } = ref.current.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            className="relative bg-black group overflow-hidden"
        >
            {/* Dynamic Background that scrolls across both Hero and Reality */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 z-0 pointer-events-none"
            >
                {/* Base Grid (Dim) */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                {/* Interactive Spotlight Grid (Bright) */}
                <motion.div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#a78bfa_1px,transparent_1px),linear-gradient(to_bottom,#a78bfa_1px,transparent_1px)] bg-[size:24px_24px] opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                    style={{
                        maskImage: maskImage,
                        WebkitMaskImage: webkitMaskImage
                    }}
                ></motion.div>

                {/* Radial Gradient overlay pinned to top for Hero glow */}
                <div className="absolute top-0 left-0 right-0 h-[1000px] bg-[radial-gradient(circle_800px_at_50%_200px,#1a0b2e80,transparent)]"></div>
            </motion.div>

            {children}
        </div>
    );
};

export default HeroRealityWrapper;
