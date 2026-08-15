import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Molecule {
  id: number;
  x: number;
  y: number;
  scale: number;
  duration: number;
  delay: number;
}

export function PerfumeMolecules() {
  const [molecules, setMolecules] = useState<Molecule[]>([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useSpring(mouseX, { stiffness: 50, damping: 25 });
  const parallaxY = useSpring(mouseY, { stiffness: 50, damping: 25 });

  useEffect(() => {
    const items: Molecule[] = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
      scale: 0.6 + Math.random() * 0.7,
      duration: 16 + Math.random() * 14,
      delay: Math.random() * -15,
    }));
    setMolecules(items);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(((e.clientX / innerWidth) - 0.5) * 30);
      mouseY.set(((e.clientY / innerHeight) - 0.5) * 20);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40 select-none">
      {/* Soft floating gradient blobs */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute top-10 left-10 w-96 h-96 rounded-full bg-[#FCE4EC]/60 blur-3xl"
      />
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#F48CA7]/15 blur-3xl"
      />

      {/* Floating Translucent Chemical/Aroma Molecules */}
      {molecules.map((m) => (
        <motion.div
          key={m.id}
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            x: parallaxX,
            y: parallaxY,
            scale: m.scale,
          }}
          animate={{
            y: [0, -40, 0],
            rotate: [0, 360],
          }}
          transition={{
            y: { duration: m.duration, delay: m.delay, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: m.duration * 2, delay: m.delay, repeat: Infinity, ease: "linear" },
          }}
          className="absolute"
        >
          {/* Hexagonal aroma molecule representation */}
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="opacity-45">
            <polygon
              points="30,5 52,17.5 52,42.5 30,55 8,42.5 8,17.5"
              stroke="#F48CA7"
              strokeWidth="1.5"
              strokeDasharray="4 2"
              fill="rgba(252, 228, 236, 0.2)"
            />
            <circle cx="30" cy="5" r="3" fill="#111111" />
            <circle cx="52" cy="17.5" r="3" fill="#F48CA7" />
            <circle cx="52" cy="42.5" r="3" fill="#111111" />
            <circle cx="30" cy="55" r="3" fill="#F48CA7" />
            <circle cx="8" cy="42.5" r="3" fill="#111111" />
            <circle cx="8" cy="17.5" r="3" fill="#F48CA7" />
            <line x1="30" y1="5" x2="30" y2="30" stroke="#F48CA7" strokeWidth="1" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
