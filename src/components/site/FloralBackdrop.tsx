import { useEffect, useState } from "react";

type Petal = { left: number; size: number; delay: number; duration: number; dx: number; hue: string };

/** Soft floating petals background — client-only to avoid SSR hydration mismatches. */
export function FloralBackdrop({ density = 14 }: { density?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);
  useEffect(() => {
    setPetals(
      Array.from({ length: density }).map(() => ({
        left: Math.random() * 100,
        size: 8 + Math.random() * 18,
        delay: Math.random() * -18,
        duration: 16 + Math.random() * 14,
        dx: (Math.random() - 0.5) * 200,
        hue: Math.random() > 0.5 ? "#f6cfd5" : "#efe0ea",
      })),
    );
  }, [density]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* soft floral gradient blobs */}
      <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-pink/60 blur-3xl animate-shimmer" />
      <div className="absolute top-1/3 -right-24 h-[420px] w-[420px] rounded-full bg-lavender/60 blur-3xl animate-shimmer" style={{ animationDelay: "-3s" }} />
      <div className="absolute bottom-0 left-1/4 h-[360px] w-[360px] rounded-full bg-mint/50 blur-3xl animate-shimmer" style={{ animationDelay: "-6s" }} />

      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute -top-10 block rounded-full opacity-70"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.7,
            background: p.hue,
            filter: "blur(0.4px)",
            animation: `drift ${p.duration}s linear ${p.delay}s infinite`,
            // @ts-expect-error custom prop
            "--dx": `${p.dx}px`,
            borderRadius: "60% 40% 60% 40% / 50% 60% 40% 50%",
          }}
        />
      ))}
    </div>
  );
}
