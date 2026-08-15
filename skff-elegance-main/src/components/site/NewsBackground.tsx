import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface NewsDot {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function NewsBackground() {
  const [dots, setDots] = useState<NewsDot[]>([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useSpring(mouseX, { stiffness: 50, damping: 25 });
  const parallaxY = useSpring(mouseY, { stiffness: 50, damping: 25 });

  useEffect(() => {
    const list: NewsDot[] = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 3 + Math.random() * 5,
      duration: 12 + Math.random() * 10,
      delay: Math.random() * -12,
    }));
    setDots(list);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(((e.clientX / innerWidth) - 0.5) * 20);
      mouseY.set(((e.clientY / innerHeight) - 0.5) * 15);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Historical soft timeline ambient glow */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute top-20 left-10 w-[500px] h-[500px] rounded-full bg-[#FCE4EC]/40 blur-3xl opacity-35"
      />
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute bottom-20 right-10 w-[450px] h-[450px] rounded-full bg-[#F48CA7]/15 blur-3xl opacity-30"
      />

      {/* Floating grid particles */}
      {dots.map((d) => (
        <motion.span
          key={d.id}
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            x: parallaxX,
            y: parallaxY,
            width: d.size,
            height: d.size,
          }}
          animate={{
            opacity: [0.1, 0.4, 0.1],
            y: [0, -30, 0],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-[#111111]/20"
        />
      ))}
    </div>
  );
}
