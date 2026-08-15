import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CitrusParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: "citrus" | "vanilla" | "spice";
}

export function FlavoursBackground() {
  const [items, setItems] = useState<CitrusParticle[]>([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useSpring(mouseX, { stiffness: 50, damping: 25 });
  const parallaxY = useSpring(mouseY, { stiffness: 50, damping: 25 });

  useEffect(() => {
    const list: CitrusParticle[] = Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: i % 3 === 0 ? 24 + Math.random() * 20 : 6 + Math.random() * 8,
      duration: 16 + Math.random() * 14,
      delay: Math.random() * -16,
      type: i % 3 === 0 ? "citrus" : i % 3 === 1 ? "vanilla" : "spice",
    }));
    setItems(list);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(((e.clientX / innerWidth) - 0.5) * 24);
      mouseY.set(((e.clientY / innerHeight) - 0.5) * 18);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Soft warm citrus glow */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute top-10 left-1/4 w-[500px] h-[500px] rounded-full bg-[#FFF3E0]/70 blur-3xl opacity-40"
      />
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-[#FCE4EC]/50 blur-3xl opacity-35"
      />

      {items.map((p) => {
        if (p.type === "citrus") {
          return (
            <motion.div
              key={p.id}
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                x: parallaxX,
                y: parallaxY,
                width: p.size,
                height: p.size,
              }}
              animate={{
                y: [0, -50, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute opacity-30"
            >
              {/* Floating Citrus Slice SVG */}
              <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                <circle cx="20" cy="20" r="18" fill="#FFA726" fillOpacity="0.2" stroke="#FB8C00" strokeWidth="1.5" />
                <circle cx="20" cy="20" r="14" stroke="#FFF3E0" strokeWidth="1" strokeDasharray="3 2" />
                <line x1="20" y1="6" x2="20" y2="34" stroke="#FB8C00" strokeWidth="1" />
                <line x1="6" y1="20" x2="34" y2="20" stroke="#FB8C00" strokeWidth="1" />
              </svg>
            </motion.div>
          );
        }

        if (p.type === "vanilla") {
          return (
            <motion.span
              key={p.id}
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                x: parallaxX,
                y: parallaxY,
                width: p.size,
                height: p.size * 2,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.15, 0.35, 0.15],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute rounded-full bg-[#FFE0B2]/60 blur-[0.5px]"
            />
          );
        }

        return (
          <motion.span
            key={p.id}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              x: parallaxX,
              y: parallaxY,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-[#F48CA7]/30 blur-[0.4px]"
          />
        );
      })}
    </div>
  );
}
