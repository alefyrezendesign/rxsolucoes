import React from 'react';

interface GradientTextProps {
    children: React.ReactNode;
    className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({ children, className = "" }) => {
    return (
        <span className={`text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-white ${className}`}>
            {children}
        </span>
    );
};

export default GradientText;
