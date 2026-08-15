import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import heroFloral from "@/assets/hero-floral.jpg";

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: "petal" | "dust" | "sparkle" | "glow";
  rotation: number;
}

export function HeroFloralBackground() {
  const [particles, setParticles] = useState<FloatingParticle[]>([]);

  // Mouse Parallax Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 60, damping: 30, mass: 0.8 };
  const parallaxX = useSpring(mouseX, springConfig);
  const parallaxY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Generate 35 floating particles (petals, sparkles, dust, glow)
    const items: FloatingParticle[] = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() > 0.6 ? 12 + Math.random() * 16 : 4 + Math.random() * 8,
      duration: 18 + Math.random() * 16,
      delay: Math.random() * -20,
      type: i % 4 === 0 ? "petal" : i % 4 === 1 ? "sparkle" : i % 4 === 2 ? "dust" : "glow",
      rotation: Math.random() * 360,
    }));
    setParticles(items);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xNorm = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const yNorm = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

      mouseX.set(xNorm * 25); // Parallax offset max 25px
      mouseY.set(yNorm * 20); // Parallax offset max 20px
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div aria-hidden className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* 1. Ultra-HD Crisp Flower Background Image with Soft Zoom & Parallax */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        animate={{
          scale: [1, 1.08, 1],
          x: [0, 12, -12, 0],
          y: [0, -10, 10, 0],
        }}
        transition={{
          scale: { duration: 25, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 22, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={heroFloral}
          alt="SKFF Cherry Blossom Background"
          className="w-full h-full object-cover object-center contrast-[1.08] saturate-[1.05]"
          loading="eager"
        />
      </motion.div>

      {/* 2. Soft Luxury Non-Darkening Gradient Overlay (Max 18% opacity, non-darkening) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(255, 249, 247, 0.18), rgba(255, 249, 247, 0.05))",
        }}
      />

      {/* 3. Soft Ambient Luxury Blobs with Parallax */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute top-1/4 -left-32 w-[550px] h-[550px] rounded-full bg-[#F48CA7]/25 blur-3xl opacity-35 animate-pulse duration-10000"
      />
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-[#FCE4EC]/50 blur-3xl opacity-30"
      />

      {/* 4. Floating Elements Layer (Petals, Sparkles, Light Dust, Glows) */}
      {particles.map((p) => {
        if (p.type === "petal") {
          return (
            <motion.div
              key={p.id}
              className="absolute pointer-events-none opacity-30"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size * 0.7,
                background: "linear-gradient(135deg, #F48CA7 0%, #FCE4EC 100%)",
                borderRadius: "60% 40% 60% 40% / 50% 60% 40% 50%",
                boxShadow: "0 2px 8px rgba(244, 140, 167, 0.2)",
              }}
              animate={{
                y: [0, -120, 0],
                x: [0, (p.id % 2 === 0 ? 40 : -40), 0],
                rotate: [p.rotation, p.rotation + 360],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        }

        if (p.type === "sparkle") {
          return (
            <motion.div
              key={p.id}
              className="absolute pointer-events-none opacity-35"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{
                scale: [0.6, 1.2, 0.6],
                opacity: [0.15, 0.35, 0.15],
              }}
              transition={{
                duration: p.duration / 3,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg viewBox="0 0 24 24" fill="#F48CA7" className="w-full h-full">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </motion.div>
          );
        }

        if (p.type === "glow") {
          return (
            <motion.span
              key={p.id}
              className="absolute rounded-full bg-[#FCE4EC]/60 blur-[1px] opacity-25"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size * 2,
                height: p.size * 2,
              }}
              animate={{
                y: [0, -60, 0],
                opacity: [0.2, 0.35, 0.2],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        }

        // Dust
        return (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-[#111111]/15 opacity-25"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
