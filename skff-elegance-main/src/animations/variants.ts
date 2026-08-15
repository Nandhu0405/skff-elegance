import type { Variants } from "framer-motion";

/* ─── Fade In ─────────────────────────────────────────────── */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: "easeOut" as const } },
};

/* ─── Fade Up ─────────────────────────────────────────────── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

/* ─── Slide Left (enters from right) ─────────────────────── */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

/* ─── Slide Right (enters from left) ─────────────────────── */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

/* ─── Scale In ────────────────────────────────────────────── */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

/* ─── Blur Reveal ─────────────────────────────────────────── */
export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 1, ease: "easeOut" as const } },
};

/* ─── Rotate Slight ───────────────────────────────────────── */
export const rotateSlight: Variants = {
  hidden: { opacity: 0, rotate: -4, scale: 0.95 },
  visible: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

/* ─── Stagger Container ───────────────────────────────────── */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

/* ─── Stagger Item ────────────────────────────────────────── */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

/* ─── Card Hover ──────────────────────────────────────────── */
export const cardHover = {
  rest: { y: 0, boxShadow: "0 4px 24px -4px rgba(0,0,0,0.08)" },
  hover: { y: -8, boxShadow: "0 24px 60px -12px rgba(244,140,167,0.28)", transition: { duration: 0.4, ease: "easeOut" as const } },
};
