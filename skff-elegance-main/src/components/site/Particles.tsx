import { useEffect, useState } from "react";

type P = { x: number; y: number; s: number; d: number; delay: number };

export function Particles({ count = 30 }: { count?: number }) {
  const [ps, setPs] = useState<P[]>([]);
  useEffect(() => {
    setPs(
      Array.from({ length: count }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: 2 + Math.random() * 4,
        d: 8 + Math.random() * 14,
        delay: Math.random() * -14,
      })),
    );
  }, [count]);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {ps.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-rose/50"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            filter: "blur(0.5px)",
            animation: `float-slow ${p.d}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
