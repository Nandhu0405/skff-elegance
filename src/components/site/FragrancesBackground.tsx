import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MistParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: "mist" | "petal" | "smoke";
}

export function FragrancesBackground() {
  const [items, setItems] = useState<MistParticle[]>([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useSpring(mouseX, { stiffness: 50, damping: 25 });
  const parallaxY = useSpring(mouseY, { stiffness: 50, damping: 25 });

  useEffect(() => {
    const list: MistParticle[] = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: i % 3 === 0 ? 40 + Math.random() * 60 : 10 + Math.random() * 16,
      duration: 18 + Math.random() * 14,
      delay: Math.random() * -18,
      type: i % 3 === 0 ? "smoke" : i % 3 === 1 ? "mist" : "petal",
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
      {/* Soft lavender perfume glow */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute top-1/4 -right-20 w-[550px] h-[550px] rounded-full bg-[#E1BEE7]/30 blur-3xl opacity-35"
      />
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full bg-[#FCE4EC]/50 blur-3xl opacity-30"
      />

      {items.map((p) => {
        if (p.type === "smoke") {
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
                y: [0, -80, 0],
                scale: [0.8, 1.4, 0.8],
                opacity: [0.1, 0.25, 0.1],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute rounded-full bg-gradient-to-tr from-[#F48CA7]/20 via-[#FCE4EC]/30 to-transparent blur-2xl"
            />
          );
        }

        if (p.type === "mist") {
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
                opacity: [0.15, 0.35, 0.15],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute rounded-full bg-white/70 blur-[1px]"
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
              height: p.size * 0.75,
              borderRadius: "60% 40% 60% 40% / 50% 60% 40% 50%",
            }}
            animate={{
              y: [0, -70, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bg-gradient-to-br from-[#F48CA7]/40 to-[#FCE4EC]/50 opacity-30 shadow-sm"
          />
        );
      })}
    </div>
  );
}
