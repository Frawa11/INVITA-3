"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ParticleBackground() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    if (!isClient) return null;

    // Generate random particles (Bubbles/Stars)
    const particles = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 15 + 2, // Varied sizes
        duration: Math.random() * 10 + 10, // Slower movement
        delay: Math.random() * 5,
        opacity: Math.random() * 0.5 + 0.1,
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
                        y: [0, -100, 0],
                        x: [0, 30, -30, 0],
                        opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Interactive Light/Glow following mouse */}
            <motion.div
                className="absolute w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"
                animate={{
                    x: mousePosition.x - 250,
                    y: mousePosition.y - 250,
                }}
                transition={{
                    type: "spring",
                    damping: 50,
                    stiffness: 400,
                    mass: 0.5
                }}
                style={{ pointerEvents: "none" }}
            />
        </div>
    );
}
