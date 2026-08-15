import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function ContactBackground() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useSpring(mouseX, { stiffness: 50, damping: 25 });
  const parallaxY = useSpring(mouseY, { stiffness: 50, damping: 25 });

  useEffect(() => {
    const list: Ripple[] = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      size: 140 + Math.random() * 120,
      duration: 6 + Math.random() * 6,
      delay: Math.random() * -6,
    }));
    setRipples(list);

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
      {/* Floating soft pastel blobs */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute top-1/4 left-10 w-[500px] h-[500px] rounded-full bg-[#FCE4EC]/60 blur-3xl opacity-40 animate-pulse duration-7000"
      />
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-[#F48CA7]/20 blur-3xl opacity-35"
      />

      {/* Ripple Animation Rings */}
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          style={{
            left: `${r.x}%`,
            top: `${r.y}%`,
            x: parallaxX,
            y: parallaxY,
            width: r.size,
            height: r.size,
          }}
          animate={{
            scale: [0.6, 1.4, 0.6],
            opacity: [0.1, 0.35, 0.1],
          }}
          transition={{
            duration: r.duration,
            delay: r.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full border border-[#F48CA7]/30 pointer-events-none -translate-x-1/2 -translate-y-1/2"
        />
      ))}
    </div>
  );
}
