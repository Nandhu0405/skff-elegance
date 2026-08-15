import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Particles } from "@/components/site/Particles";
import { Reveal } from "@/components/site/Reveal";
import whoWeAreImg from "@/assets/who-we-are-lab.png";

/* ------------------------------------------------------------------ */
/*  Framer Motion variants                                            */
/* ------------------------------------------------------------------ */
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeInOut" as const } },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeInOut" as const } },
};

const staggerBtns: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const btnItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

/* ------------------------------------------------------------------ */
/*  Floating botanical leaf SVG decoration                            */
/* ------------------------------------------------------------------ */
function FloatingLeaf({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{ y: [0, -18, 0], rotate: [0, 8, -6, 0], opacity: [0.45, 0.75, 0.45] }}
      transition={{ duration: 7, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <path
          d="M22 4C22 4 10 14 10 26C10 32 15.4 38 22 40C28.6 38 34 32 34 26C34 14 22 4 22 4Z"
          fill="url(#leafGrad)"
          opacity="0.35"
        />
        <defs>
          <linearGradient id="leafGrad" x1="10" y1="4" x2="34" y2="40">
            <stop stopColor="#F48CA7" />
            <stop offset="1" stopColor="#FCE4EC" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  WhoWeAre — About Hero Section                                    */
/* ------------------------------------------------------------------ */
export function WhoWeAre() {
  /* Mouse parallax for image */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 100, damping: 16 });
  const springY = useSpring(my, { stiffness: 100, damping: 16 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 14);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 14);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      className="relative overflow-hidden pt-28 pb-8 md:pt-36 md:pb-10"
      style={{ backgroundColor: "#FFF9F7" }}
    >
      {/* Soft blush pink animated gradient — top left */}
      <motion.div
        className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #F48CA7 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.35, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Soft blush pink animated gradient — bottom right */}
      <motion.div
        className="absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #FCE4EC 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.28, 0.18] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Floating flower particles */}
      <Particles count={12} />

      {/* Floating botanical leaf decorations */}
      <FloatingLeaf className="top-16 left-[8%] rotate-12" delay={0} />
      <FloatingLeaf className="top-[40%] right-[6%] -rotate-12 scale-75" delay={2} />
      <FloatingLeaf className="bottom-20 left-[15%] rotate-45 scale-90" delay={4} />

      {/* Two-column grid — 50/50 */}
      <motion.div
        className="container-luxury relative z-10 grid items-center gap-14 md:grid-cols-2 lg:gap-20"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* ─── LEFT: Content (slides from left) ─── */}
        <motion.div variants={slideLeft} className="space-y-7">
          {/* Label */}
          <Reveal>
            <span className="eyebrow tracking-[0.25em] text-rose">ABOUT SKFF</span>
          </Reveal>

          {/* Heading — line by line */}
          <div className="space-y-1">
            <Reveal>
              <h1 className="text-4xl md:text-[2.8rem] lg:text-5xl font-light leading-[1.15] tracking-tight text-charcoal">
                Leading the Future of
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <h1 className="text-4xl md:text-[2.8rem] lg:text-5xl leading-[1.15] tracking-tight">
                <em className="italic font-light text-rose">Flavours &amp; Fragrances</em>
              </h1>
            </Reveal>
            <Reveal delay={0.24}>
              <h1 className="text-4xl md:text-[2.8rem] lg:text-5xl font-light leading-[1.15] tracking-tight text-charcoal">
                Since 1922
              </h1>
            </Reveal>
          </div>

          {/* Paragraph */}
          <Reveal delay={0.3}>
            <p className="text-base md:text-lg text-grey leading-relaxed max-w-prose">
              SKFF (INDIA) PVT. LTD. is a leading organization in the Indian
              subcontinent in the field of Flavours and Fragrances. We are engaged in the creation,
              development, manufacturing and supplying of an extensive range of Flavours and
              Fragrances for our customers in the food, beverage, pharmaceutical, nutraceutical,
              consumer goods and cosmetic industries.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="text-base md:text-lg text-grey leading-relaxed max-w-prose">
              We are a family‑run organization, committed to our independence and take pride in
              our freedom to excel. We strive to reach out to as many consumers as we can through
              our products.
            </p>
          </Reveal>

          {/* Premium Buttons — stagger */}
          <motion.div
            variants={staggerBtns}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap gap-4 pt-3"
          >
            <motion.div variants={btnItem}>
              <Link
                to="/about"
                hash="evolution"
                className="group relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.04]"
                style={{
                  background: "linear-gradient(135deg, #F48CA7 0%, #e8758f 100%)",
                }}
              >
                Explore Our Journey
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            <motion.div variants={btnItem}>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full border border-rose/40 bg-white/80 backdrop-blur px-7 py-3.5 text-sm font-medium tracking-wide text-charcoal shadow-soft transition-all duration-300 hover:border-rose/70 hover:shadow-lg hover:scale-[1.04]"
              >
                Contact Us
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ─── RIGHT: Premium Image (slides from right) ─── */}
        <motion.div
          variants={slideRight}
          className="relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Soft decorative ring behind image */}
          <div
            className="absolute -inset-4 rounded-[36px] opacity-30 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(244,140,167,0.25), rgba(252,228,236,0.15), transparent)",
            }}
          />

          <motion.div
            className="relative overflow-hidden rounded-[30px] shadow-luxury"
            style={{ x: springX, y: springY }}
          >
            <motion.img
              src={whoWeAreImg}
              alt="SKFF premium flavour and fragrance research laboratory with scientists, perfume bottles, essential oils, and natural ingredients"
              loading="eager"
              className="h-[480px] w-full object-cover md:h-[580px] lg:h-[650px]"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            {/* Very subtle bottom gradient for visual depth — no darkening */}
            <div
              className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(255,249,247,0.3), transparent)",
              }}
            />
          </motion.div>

          {/* Floating botanical petal near image */}
          <motion.div
            className="absolute -bottom-6 -left-6 pointer-events-none"
            animate={{ rotate: [0, 15, -10, 0], y: [0, -8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <ellipse cx="28" cy="28" rx="22" ry="12" fill="#F48CA7" opacity="0.18" transform="rotate(-30 28 28)" />
              <ellipse cx="28" cy="28" rx="22" ry="12" fill="#FCE4EC" opacity="0.14" transform="rotate(30 28 28)" />
            </svg>
          </motion.div>

          {/* Floating accent dot */}
          <motion.div
            className="absolute -top-4 -right-4 h-5 w-5 rounded-full pointer-events-none"
            style={{ background: "linear-gradient(135deg, #F48CA7, #FCE4EC)" }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
