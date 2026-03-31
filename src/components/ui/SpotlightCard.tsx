import React, { useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
    children,
    className = "",
    spotlightColor = "rgba(139, 92, 246, 0.15)" // Primary purple
}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);
    const opacityValue = useMotionValue(0);

    const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 40%)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const div = divRef.current;
        const rect = div.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const handleFocus = () => opacityValue.set(1);
    const handleBlur = () => opacityValue.set(0);
    const handleMouseEnter = () => opacityValue.set(1);
    const handleMouseLeave = () => opacityValue.set(0);

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden rounded-xl border border-white/10 bg-gray-900/50 px-5 md:px-8 py-5 md:py-16 shadow-2xl ${className}`}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px transition duration-300"
                style={{
                    opacity: opacityValue,
                    background: background,
                }}
            />
            <div className="relative h-full">
                {children}
            </div>
        </div>
    );
};

export default SpotlightCard;
