import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const dotX = useMotionValue(-200);
  const dotY = useMotionValue(-200);

  const sx = useSpring(x, { stiffness: 140, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 140, damping: 22, mass: 0.5 });
  const sDotX = useSpring(dotX, { stiffness: 400, damping: 28 });
  const sDotY = useSpring(dotY, { stiffness: 400, damping: 28 });

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y, dotX, dotY]);

  if (!enabled) return null;
  return (
    <>
      {/* Soft Luxury Glow Ring */}
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-[400px] w-[400px] rounded-full opacity-35 mix-blend-multiply"
      >
        <div className="h-full w-full rounded-full bg-gradient-to-br from-[#F48CA7]/30 via-[#FCE4EC]/40 to-transparent blur-3xl" />
      </motion.div>

      {/* Precision Luxury Pink Cursor Dot */}
      <motion.div
        aria-hidden
        style={{ x: sDotX, y: sDotY }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-[#F48CA7] shadow-[0_0_8px_rgba(244,140,167,0.8)]"
      />
    </>
  );
}
