import { createFileRoute } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform, useInView, animate, type Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Particles } from "@/components/site/Particles";
import skFranceLogo from "@/assets/skfrance logo.png";
import skffmeLogo from "@/assets/skffme logo.png";

export const Route = createFileRoute("/global-presence")({
  head: () => ({
    meta: [
      { title: "Global Presence — SKFF (INDIA) PVT. LTD." },
      { name: "description", content: "Extending our passion for flavours and fragrances across borders — India, France, UAE." },
    ],
  }),
  component: GlobalPresence,
});

/* ─── Animation Variants ─────────────────────────────────── */
const sectionHeader: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

const cardLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

const cardRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

const statsContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

const statItem: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

/* ─── Animated Counter ───────────────────────────────────── */
function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplayed(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, target]);

  return (
    <span ref={ref}>
      {prefix}{displayed}{suffix}
    </span>
  );
}

/* ─── World Map SVG Background ───────────────────────────── */
function WorldMapBackground({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ transform: `translate(${mouseX * 0.015}px, ${mouseY * 0.015}px)` }}
    >
      <svg
        viewBox="0 0 1200 600"
        className="w-full h-full opacity-[0.06]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Simplified world map paths */}
        {/* North America */}
        <path d="M 80,120 Q 100,100 130,110 Q 160,120 180,140 Q 200,160 190,185 Q 180,205 160,210 Q 130,215 100,200 Q 70,185 65,160 Q 60,140 80,120 Z" stroke="#E85D75" strokeWidth="1.2" />
        <path d="M 130,110 Q 160,80 200,85 Q 220,90 230,110 Q 225,130 205,140 Q 180,145 160,120 Z" stroke="#E85D75" strokeWidth="1.2" />
        {/* South America */}
        <path d="M 160,250 Q 175,235 195,240 Q 215,245 220,265 Q 225,290 215,315 Q 205,340 185,350 Q 165,355 150,340 Q 135,320 140,295 Q 145,270 160,250 Z" stroke="#E85D75" strokeWidth="1.2" />
        {/* Europe */}
        <path d="M 460,100 Q 480,85 505,88 Q 530,92 540,110 Q 545,128 530,140 Q 510,150 485,145 Q 460,138 455,120 Q 452,110 460,100 Z" stroke="#E85D75" strokeWidth="1.2" />
        <path d="M 505,88 Q 525,70 550,72 Q 570,75 575,90 Q 572,105 555,110 Q 535,112 518,100 Z" stroke="#E85D75" strokeWidth="1.2" />
        {/* Africa */}
        <path d="M 470,175 Q 495,160 525,165 Q 555,170 565,195 Q 575,225 568,255 Q 560,285 540,305 Q 515,320 490,315 Q 460,305 450,278 Q 440,250 445,220 Q 450,193 470,175 Z" stroke="#E85D75" strokeWidth="1.2" />
        {/* Asia — main landmass */}
        <path d="M 580,90 Q 630,70 700,75 Q 760,80 800,95 Q 840,112 855,135 Q 865,160 850,185 Q 830,205 800,210 Q 760,215 720,200 Q 680,185 650,165 Q 620,145 600,120 Q 582,105 580,90 Z" stroke="#E85D75" strokeWidth="1.2" />
        {/* India highlight */}
        <path d="M 680,175 Q 700,165 720,172 Q 738,180 740,200 Q 742,222 728,238 Q 712,252 694,248 Q 674,242 668,222 Q 662,200 680,175 Z" stroke="#F48CA7" strokeWidth="1.8" />
        {/* Middle East */}
        <path d="M 575,155 Q 600,145 625,150 Q 645,157 648,175 Q 648,193 630,202 Q 610,210 590,202 Q 572,193 572,175 Q 572,163 575,155 Z" stroke="#F48CA7" strokeWidth="1.5" />
        {/* France / Europe highlight */}
        <path d="M 467,112 Q 482,103 498,108 Q 513,114 515,128 Q 514,142 500,148 Q 484,152 470,143 Q 456,133 467,112 Z" stroke="#F48CA7" strokeWidth="1.8" />
        {/* Australia */}
        <path d="M 820,300 Q 855,285 900,290 Q 940,298 950,325 Q 955,350 938,370 Q 915,388 885,382 Q 852,372 835,348 Q 818,325 820,300 Z" stroke="#E85D75" strokeWidth="1.2" />
        {/* Grid lines (latitude/longitude) */}
        <line x1="0" y1="200" x2="1200" y2="200" stroke="#E85D75" strokeWidth="0.4" strokeDasharray="6 8" />
        <line x1="0" y1="300" x2="1200" y2="300" stroke="#E85D75" strokeWidth="0.4" strokeDasharray="6 8" />
        <line x1="0" y1="400" x2="1200" y2="400" stroke="#E85D75" strokeWidth="0.4" strokeDasharray="6 8" />
        <line x1="200" y1="0" x2="200" y2="600" stroke="#E85D75" strokeWidth="0.4" strokeDasharray="6 8" />
        <line x1="400" y1="0" x2="400" y2="600" stroke="#E85D75" strokeWidth="0.4" strokeDasharray="6 8" />
        <line x1="600" y1="0" x2="600" y2="600" stroke="#E85D75" strokeWidth="0.4" strokeDasharray="6 8" />
        <line x1="800" y1="0" x2="800" y2="600" stroke="#E85D75" strokeWidth="0.4" strokeDasharray="6 8" />
        <line x1="1000" y1="0" x2="1000" y2="600" stroke="#E85D75" strokeWidth="0.4" strokeDasharray="6 8" />
      </svg>
    </div>
  );
}

/* ─── Animated Connection Lines ──────────────────────────── */
function ConnectionLines() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
      <svg viewBox="0 0 1200 400" className="w-full h-full" fill="none" aria-hidden="true">
        {/* India → France curve */}
        <motion.path
          d="M 710 210 Q 590 100 492 130"
          stroke="url(#lineGrad1)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
        />
        {/* India → UAE curve */}
        <motion.path
          d="M 710 210 Q 660 230 620 195"
          stroke="url(#lineGrad2)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.8 }}
        />
        {/* France → UAE curve */}
        <motion.path
          d="M 492 130 Q 555 80 620 195"
          stroke="url(#lineGrad3)"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, ease: "easeInOut", delay: 1.2 }}
        />
        {/* Glowing dots */}
        <motion.circle cx="710" cy="210" r="5" fill="#F48CA7"
          animate={{ r: [4, 7, 4], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle cx="492" cy="130" r="4" fill="#E85D75"
          animate={{ r: [3, 6, 3], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 0.4 }}
        />
        <motion.circle cx="620" cy="195" r="4" fill="#F59E0B"
          animate={{ r: [3, 6, 3], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.9, repeat: Infinity, delay: 0.8 }}
        />
        <defs>
          <linearGradient id="lineGrad1" x1="710" y1="210" x2="492" y2="130" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F48CA7" />
            <stop offset="100%" stopColor="#E85D75" />
          </linearGradient>
          <linearGradient id="lineGrad2" x1="710" y1="210" x2="620" y2="195" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F48CA7" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="lineGrad3" x1="492" y1="130" x2="620" y2="195" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E85D75" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ─── Premium Global Card ────────────────────────────────── */
interface GlobalCardProps {
  logo: string;
  logoAlt: string;
  title: string;
  description1: string;
  description2: string;
  location: string;
  country: string;
  flagEmoji: string;
  accentColor: string;
  glowColor: string;
  variants: Variants;
}

function GlobalCard({
  logo, logoAlt, title, description1, description2,
  location, country, flagEmoji, accentColor, glowColor, variants,
}: GlobalCardProps) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ y: -10, transition: { duration: 0.4, ease: "easeOut" as const } }}
      className="relative flex flex-col rounded-[2rem] overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.62)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.82)",
        boxShadow: "0 8px 40px rgba(244,140,167,0.10), 0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* Gradient border overlay */}
      <div
        className="absolute inset-0 rounded-[2rem] pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${accentColor}28 0%, transparent 60%, ${accentColor}14 100%)`,
        }}
      />
      {/* Hover glow */}
      <motion.div
        className="absolute -inset-px rounded-[2rem] pointer-events-none opacity-0"
        style={{ boxShadow: `0 0 40px 4px ${glowColor}` }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative z-10 flex flex-col flex-1 p-10 md:p-12">
        {/* Logo and Thin Line */}
        <div className="mb-8 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <img
              src={logo}
              alt={logoAlt}
              className="h-16 w-auto max-w-[200px] object-contain mb-4"
              loading="lazy"
              style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.10))" }}
            />
          </motion.div>
          <motion.div
            className="h-[1px] rounded-full"
            style={{ background: `linear-gradient(to right, transparent, ${accentColor}, transparent)` }}
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-display font-light text-charcoal mb-5 leading-tight">
          {title}
        </h2>

        {/* Description */}
        <div className="space-y-4 text-grey font-light leading-[1.85] text-[15px] flex-1">
          <p>{description1}</p>
          <p>{description2}</p>
        </div>

        {/* Location + Learn More */}
        <div className="mt-10 pt-6 border-t border-gray-100/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true">
              <path d="M7 0C3.13 0 0 3.13 0 7c0 5.25 7 11 7 11s7-5.75 7-11c0-3.87-3.13-7-7-7zm0 9.5C5.62 9.5 4.5 8.38 4.5 7S5.62 4.5 7 4.5 9.5 5.62 9.5 7 8.38 9.5 7 9.5z"
                fill={accentColor} opacity="0.85" />
            </svg>
            <span className="text-sm font-medium text-charcoal tracking-wide">{location}</span>
          </div>
          <motion.a
            href="#"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300"
            style={{ color: accentColor }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.25 }}
          >
            Learn More
            <motion.span
              className="transition-transform duration-300 group-hover:translate-x-1"
            >→</motion.span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Curved Connector ───────────────────────────────────── */
function CardConnector() {
  return (
    <div className="flex items-center justify-center" aria-hidden="true">
      <div className="relative w-16 flex flex-col items-center gap-3">
        <motion.div
          className="w-px bg-gradient-to-b from-transparent via-[#F48CA7] to-transparent"
          initial={{ height: 0 }}
          whileInView={{ height: 80 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 }}
        />
        <motion.div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "rgba(244,140,167,0.12)", border: "1.5px solid rgba(244,140,167,0.3)" }}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <circle cx="6" cy="6" r="2.5" fill="#F48CA7" />
            <circle cx="6" cy="6" r="5" stroke="#F48CA7" strokeWidth="1" opacity="0.4" />
          </svg>
        </motion.div>
        <motion.div
          className="w-px bg-gradient-to-b from-[#F48CA7] via-[#F48CA7] to-transparent"
          initial={{ height: 0 }}
          whileInView={{ height: 80 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.7 }}
        />
      </div>
    </div>
  );
}


/* ─── Main Page ──────────────────────────────────────────── */
function GlobalPresence() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 30 });
  const [mxVal, setMxVal] = useState(0);
  const [myVal, setMyVal] = useState(0);

  useEffect(() => {
    const unsub1 = springX.on("change", setMxVal);
    const unsub2 = springY.on("change", setMyVal);
    return () => { unsub1(); unsub2(); };
  }, [springX, springY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const blobX1 = useTransform(springX, [-400, 400], [-20, 20]);
  const blobY1 = useTransform(springY, [-300, 300], [-15, 15]);
  const blobX2 = useTransform(springX, [-400, 400], [15, -15]);
  const blobY2 = useTransform(springY, [-300, 300], [10, -10]);

  return (
    <div
      className="min-h-screen overflow-hidden"
      style={{ background: "linear-gradient(135deg, #FFFBF9 0%, #FFF0ED 40%, #FFF8F5 70%, #FDEEF2 100%)" }}
      onMouseMove={handleMouseMove}
    >
      {/* Animated gradient blobs */}
      <motion.div
        className="fixed top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(244,140,167,0.18) 0%, transparent 70%)",
          x: blobX1,
          y: blobY1,
          filter: "blur(60px)",
        }}
      />
      <motion.div
        className="fixed bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(251,191,36,0.12) 0%, transparent 70%)",
          x: blobX2,
          y: blobY2,
          filter: "blur(50px)",
        }}
      />
      <motion.div
        className="fixed top-[40%] right-[20%] w-[300px] h-[300px] rounded-full pointer-events-none animate-blob-delay-2"
        style={{
          background: "radial-gradient(circle, rgba(244,140,167,0.10) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Particles count={18} />
      </div>

      {/* World map + connection lines (decorative) */}
      <WorldMapBackground mouseX={mxVal} mouseY={myVal} />
      <ConnectionLines />

      {/* ── CONTENT ── */}
      <div className="container-luxury relative z-10 pt-32 pb-24 md:pt-44 md:pb-36">

        {/* Section Header */}
        <motion.div
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-2xl mx-auto mb-24"
        >
          <motion.span
            className="inline-block eyebrow text-[#F48CA7] font-semibold tracking-[0.32em] text-xs mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            OUR GLOBAL FOOTPRINT
          </motion.span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-charcoal mb-6 leading-[1.08]">
            Global Presence
          </h1>
          {/* Animated underline */}
          <motion.div
            className="h-[2px] mx-auto mb-8 rounded-full"
            style={{ background: "linear-gradient(to right, transparent, #F48CA7, transparent)" }}
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          />
          <p className="text-lg text-grey font-light tracking-wide leading-relaxed">
            Extending our passion for flavours and fragrances across borders — from the heart of Mumbai to Grasse and the Gulf.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-4 items-start mb-20">
          {/* SK FRANCE Card */}
          <div id="france">
            <GlobalCard
              logo={skFranceLogo}
              logoAlt="SK FRANCE Logo"
              title="SK FRANCE"
              description1="SK FRANCE is an associate of S. Kushalchand & Co. and SK Flavours & Fragrances, with roots dating back to 1922. Based in Grasse, France, the company brings together expertise in perfumery, aroma chemicals, food ingredients and essential oils."
              description2="Its R&D presence in Grasse strengthens our connection to the world's renowned fragrance capital. With a strong commitment to quality, creativity and performance, SK FRANCE contributes to developing refined fragrance solutions for global markets."
              location="Grasse, France"
              country="France"
              flagEmoji="🇫🇷"
              accentColor="#E85D75"
              glowColor="rgba(232,93,117,0.22)"
              variants={cardLeft}
            />
          </div>

          {/* Connector */}
          <div className="hidden lg:block pt-40">
            <CardConnector />
          </div>

          {/* SKFFME Card */}
          <div id="skffme">
            <GlobalCard
              logo={skffmeLogo}
              logoAlt="SKFFME Logo"
              title="SKFFME"
              description1="SKFFME represents SKFF's growing presence in the Gulf region, with its sales office located in Sharjah, United Arab Emirates. Established to strengthen our international reach, SKFFME connects our flavour and fragrance expertise with customers across the Middle East."
              description2="With a focus on quality, responsiveness and customer partnership, it supports SKFF's vision of delivering reliable sensory solutions to diverse global markets."
              location="Sharjah, United Arab Emirates"
              country="UAE"
              flagEmoji="🇦🇪"
              accentColor="#F59E0B"
              glowColor="rgba(245,158,11,0.20)"
              variants={cardRight}
            />
          </div>
        </div>

        {/* Gradient divider */}
        <div className="gradient-divider mb-20" />

        {/* Statistics */}
        <motion.div
          id="worldwide"
          variants={statsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {[
            { target: 1922, suffix: "", prefix: "", label: "Founded", sublabel: "Year of Establishment" },
            { target: 100, suffix: "+", prefix: "", label: "Years of Heritage", sublabel: "Generations of Excellence" },
            { target: 3, suffix: "", prefix: "", label: "Global Offices", sublabel: "India · France · UAE" },
            { target: 50, suffix: "+", prefix: "", label: "Countries Reached", sublabel: "Worldwide Business Reach" },
          ].map(({ target, suffix, prefix, label, sublabel }) => (
            <motion.div
              key={label}
              variants={statItem}
              className="stat-card group transition-all duration-500"
              style={{
                boxShadow: "0 4px 20px rgba(244,140,167,0.10)",
              }}
              whileHover={{
                y: -6,
                boxShadow: "0 16px 40px rgba(244,140,167,0.20)",
                transition: { duration: 0.35 },
              }}
            >
              <span className="text-3xl md:text-4xl font-display font-light text-[#E85D75] leading-none">
                <AnimatedCounter target={target} suffix={suffix} prefix={prefix} />
              </span>
              <span className="text-sm font-semibold text-charcoal mt-2 tracking-wide">{label}</span>
              <span className="text-[11px] text-grey font-light tracking-wider mt-0.5">{sublabel}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* India HQ note */}
        <motion.div
          id="india"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm text-grey font-light"
            style={{
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(244,140,167,0.2)",
            }}
          >
            <span>🇮🇳</span>
            <span>Headquartered in <strong className="text-charcoal font-medium">Mumbai, India</strong> since 1922</span>
            <span className="text-[#F48CA7]">•</span>
            <span>Manufacturing in <strong className="text-charcoal font-medium">Boisar, Maharashtra</strong></span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
