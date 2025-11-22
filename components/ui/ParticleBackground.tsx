"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ParticleBackground() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    // Reduced particles from 30 to 10 for better performance
    const particles = Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 12 + 3,
        duration: Math.random() * 15 + 15, // Slower for less CPU usage
        delay: Math.random() * 5,
        opacity: Math.random() * 0.4 + 0.1,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating Particles */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-white blur-[1px]"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                        opacity: particle.opacity,
                    }}
                    animate={{
                        y: [0, -80, 0],
                        x: [0, 20, -20, 0],
                        opacity: [particle.opacity, particle.opacity * 1.3, particle.opacity],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "linear", // Changed from easeInOut to linear for better performance
                    }}
                />
            ))}
        </div>
    );
}
