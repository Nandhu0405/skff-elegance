import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import { HeroFloralBackground } from "@/components/site/HeroFloralBackground";
import { FloralBackdrop } from "@/components/site/FloralBackdrop";
import { Particles } from "@/components/site/Particles";
import { PerfumeMolecules } from "@/components/site/PerfumeMolecules";
import flavoursHero from "@/assets/flavours-hero.jpg";
import fragrancesHero from "@/assets/fragrances-hero.jpg";
import aboutCorporate from "@/assets/about-corporate.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SKFF — Craft of Flavour & Poetry of Fragrance since 1922" },
      { name: "description", content: "SKFF (INDIA) PVT. LTD. — Four generations of curiosity, rooted in nature. Bespoke taste and scent creation for global brands." },
      { property: "og:title", content: "SKFF — Passion to Perform" },
      { property: "og:description", content: "The Craft of Flavour & The Poetry of Fragrance." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

function AnniversaryAnnouncement() {
  const shouldReduceMotion = useReducedMotion();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  return (
    <>
      <style>{`
        header.fixed {
          top: 40px !important;
          transition: top 0.4s ease;
        }
        @media (min-width: 768px) {
          header.fixed { top: 44px !important; }
        }
        @media (min-width: 1024px) {
          header.fixed { top: 48px !important; }
        }
        .gold-shine {
          background: linear-gradient(120deg, #B8860B 0%, #FFD700 30%, #FFF8D6 50%, #FFD700 70%, #B8860B 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gold-shine-anim 6s linear infinite;
        }
        @keyframes gold-shine-anim {
          0% { background-position: 200% center; }
          100% { background-position: 0% center; }
        }
        .bg-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .banner-breathing-glow {
          animation: breathe 4s ease-in-out infinite;
        }
        @keyframes breathe {
          0%, 100% { box-shadow: 0 4px 20px rgba(244,140,167,0.1), inset 0 1px 1px rgba(255,255,255,0.6); }
          50% { box-shadow: 0 4px 30px rgba(244,140,167,0.25), inset 0 1px 1px rgba(255,255,255,0.8); }
        }
      `}</style>

      <motion.div
        initial={{ y: -48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={(e) => {
          if (shouldReduceMotion) return;
          const rect = e.currentTarget.getBoundingClientRect();
          setMouse({
            x: (e.clientX - rect.left) / rect.width - 0.5,
            y: (e.clientY - rect.top) / rect.height - 0.5,
          });
        }}
        onMouseLeave={() => setMouse({ x: 0, y: 0 })}
        className="group fixed inset-x-0 top-0 z-[60] h-[40px] md:h-[44px] lg:h-[48px] flex items-center justify-center bg-gradient-to-r from-[#FFFDFB]/95 via-[#FDECEF]/95 to-[#FDFBF7]/95 bg-shift backdrop-blur-[18px] border-b border-white/60 rounded-b-[16px] overflow-hidden banner-breathing-glow hover:-translate-y-[2px] transition-transform duration-500 cursor-default"
      >
        {/* Parallax Container */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          animate={{ x: mouse.x * -20, y: mouse.y * -20 }}
          transition={{ type: "spring", stiffness: 100, damping: 25 }}
        >
          {/* Subtle Floral Watermark */}
          <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/floral-flourishes.png')] mix-blend-multiply pointer-events-none" />

          {/* Premium Light Rays */}
          <div className="absolute top-[-50%] left-[20%] w-[100px] h-[200px] bg-white/25 blur-[24px] rotate-45 transform pointer-events-none" />
          <div className="absolute top-[-50%] right-[20%] w-[120px] h-[200px] bg-white/25 blur-[24px] -rotate-45 transform pointer-events-none" />

          {/* Soft Glowing Orbs (Bokeh) */}
          <motion.div animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.25, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[30%] top-1/2 -mt-4 w-12 h-12 rounded-full bg-[#F48CA7]/15 blur-[12px]" />
          <motion.div animate={{ opacity: [0.1, 0.5, 0.1], scale: [1, 1.4, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute right-[35%] top-1/2 -mt-4 w-16 h-16 rounded-full bg-[#E8D070]/15 blur-[16px]" />

          {/* Floating Sakura Petals & Fragrance Particles */}
          {!shouldReduceMotion && (
            <>
              <motion.div animate={{ x: ["-10vw", "110vw"], y: [0, -10, 5, 0], rotate: [0, 180, 360] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} className="absolute top-[20%] w-2 h-2 bg-[#F48CA7]/30 rounded-full blur-[1px]" />
              <motion.div animate={{ x: ["-10vw", "110vw"], y: [0, 15, -5, 0], rotate: [0, -180, -360] }} transition={{ duration: 28, repeat: Infinity, ease: "linear", delay: 5 }} className="absolute top-[60%] w-[14px] h-[8px] bg-[#F48CA7]/25 rounded-full blur-[1.5px]" />
              <motion.div animate={{ x: ["-10vw", "110vw"], y: [0, -8, 10, 0], rotate: [0, 90, 180] }} transition={{ duration: 32, repeat: Infinity, ease: "linear", delay: 10 }} className="absolute top-[40%] w-[10px] h-[10px] bg-white/40 rounded-full blur-[1px]" />
            </>
          )}

          {/* Gold Sparkle Particles & Twinkling Stars */}
          <motion.div animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[15%] top-[30%] w-1.5 h-1.5 bg-[#E8D070] rounded-full blur-[0.5px] shadow-[0_0_6px_#E8D070]" />
          <motion.div animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute right-[18%] top-[60%] w-2 h-2 bg-white rounded-full blur-[0.5px] shadow-[0_0_8px_#fff]" />
          <motion.div animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute left-[65%] top-[40%] w-1.5 h-1.5 bg-[#E8D070] rounded-full blur-[0.5px] shadow-[0_0_5px_#E8D070]" />
          <motion.div animate={{ opacity: [0, 0.9, 0], scale: [0.4, 1.2, 0.4] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 3 }} className="absolute right-[45%] top-[25%] w-1 h-1 bg-white rounded-full blur-[0.5px]" />
        </motion.div>

        {/* Faint Laurel Branches on both ends */}
        <div className="absolute inset-y-0 left-2 md:left-8 flex items-center pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-700">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12" stroke="#B8860B" strokeWidth="0.75" strokeLinecap="round" strokeDasharray="1 3"/>
            <path d="M12 20V12" stroke="#B8860B" strokeWidth="0.75" strokeLinecap="round"/>
            <path d="M12 16C10.5 15 9 13.5 9 12M12 16C13.5 15 15 13.5 15 12" stroke="#B8860B" strokeWidth="0.75" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="absolute inset-y-0 right-2 md:right-8 flex items-center pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-700 scale-x-[-1]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12" stroke="#B8860B" strokeWidth="0.75" strokeLinecap="round" strokeDasharray="1 3"/>
            <path d="M12 20V12" stroke="#B8860B" strokeWidth="0.75" strokeLinecap="round"/>
            <path d="M12 16C10.5 15 9 13.5 9 12M12 16C13.5 15 15 13.5 15 12" stroke="#B8860B" strokeWidth="0.75" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Main Text */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1, delay: 0.3 }}
          className="relative overflow-hidden px-10 md:px-20 h-full flex items-center justify-center w-full"
        >
          <p 
            className="text-[10px] sm:text-[12px] md:text-[15px] lg:text-[16px] font-heading font-medium text-[#2B2B2B] uppercase text-center relative z-10 w-full truncate md:overflow-visible md:whitespace-normal leading-[1.2]"
            style={{ letterSpacing: '6px' }}
          >
            ✨ <span className="gold-shine font-semibold">A CENTURY OF EXPERTISE</span> IN FRAGRANCE &amp; FLAVOUR ✨
          </p>

          {/* Luxury Shimmer passing across text every 8s */}
          {!shouldReduceMotion && (
            <motion.div
              animate={{ x: ["-200%", "300%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 8, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 left-0 w-[40%] bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-12 z-20 pointer-events-none group-hover:duration-[1.5s]"
            />
          )}
        </motion.div>
      </motion.div>
    </>
  );
}

export function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Framer Motion Animation Variants
  const lineVariant: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    }),
  };

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  return (
    <div className="bg-[#FFF9F7] text-[#1F1F1F] font-sans selection:bg-[#F48CA7]/30">
      <AnniversaryAnnouncement />
      {/* ==================================================
          HERO SECTION — LUXURY INTERNATIONAL CORPORATE
          ================================================== */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen w-full flex items-center justify-start overflow-hidden pt-28 pb-20 px-6 md:px-12 lg:px-20 bg-[#FFF9F7]"
      >
        {/* Crisp Unblurred Cherry Blossom Background with Parallax, Soft Zoom & 18% Overlay */}
        <HeroFloralBackground />

        {/* Hero Left Aligned Content */}
        <div className="container-luxury relative z-10 max-w-5xl text-left">
          {/* Small Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-[#F48CA7]" />
            <span className="eyebrow text-xs tracking-[0.3em] font-semibold text-[#1F1F1F]/80">
              SINCE 1922 &nbsp;•&nbsp; PASSION TO PERFORM
            </span>
          </motion.div>

          {/* Large Heading with Shimmer & Glow Highlights */}
          <h1 className="text-hero font-heading font-light tracking-tight text-[#1F1F1F] leading-[1.05]">
            <motion.span custom={0} variants={lineVariant} initial="hidden" animate="visible" className="block">
              The Craft of
            </motion.span>
            <motion.span custom={1} variants={lineVariant} initial="hidden" animate="visible" className="block">
              <span className="inline-block bg-gradient-to-r from-[#F48CA7] via-[#E85D75] to-[#F48CA7] bg-clip-text text-transparent italic font-serif font-normal animate-shimmer-text animate-pulse-glow pr-3 transition-transform duration-300 hover:scale-105 cursor-pointer">
                Flavour
              </span>{" "}
              &amp;
            </motion.span>
            <motion.span custom={2} variants={lineVariant} initial="hidden" animate="visible" className="block">
              The Poetry of
            </motion.span>
            <motion.span custom={3} variants={lineVariant} initial="hidden" animate="visible" className="block">
              <span className="inline-block bg-gradient-to-r from-[#F48CA7] via-[#E85D75] to-[#F48CA7] bg-clip-text text-transparent italic font-serif font-normal animate-shimmer-text animate-pulse-glow transition-transform duration-300 hover:scale-105 cursor-pointer">
                Fragrance
              </span>
            </motion.span>
          </h1>

          {/* Short company description */}
          <motion.p
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.85 }}
            className="mt-8 text-base md:text-lg lg:text-xl text-[#555] max-w-2xl leading-relaxed font-body"
          >
            For over a century, SKFF has blended nature’s finest botanicals with cutting-edge analytical science to formulate signature taste and scent solutions for global leaders in food, beverage, and fine perfumery.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.8, ease: "easeOut" }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <Link
              to="/about"
              className="px-8 py-4 rounded-full bg-[#111111] text-white text-xs uppercase tracking-[0.24em] font-medium hover:bg-[#F48CA7] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Our Story
            </Link>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full border border-[#111111]/30 bg-white/60 backdrop-blur-md text-[#111111] text-xs uppercase tracking-[0.24em] font-medium hover:border-[#111111] hover:bg-white transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>

      {/* ==================================================
          ABOUT SECTION — WITH FLOATING BOTANICAL PETALS
          ================================================== */}
      <section className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20 bg-white border-y border-[#ECECEC] overflow-hidden">
        {/* Soft floating flower petals & glassmorphism circles */}
        <FloralBackdrop density={12} />

        <div className="container-luxury max-w-7xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column: Premium Corporate Image */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="group"
            >
              <div className="relative rounded-[30px] overflow-hidden shadow-luxury h-[480px] md:h-[580px] lg:h-[650px]">
                <img
                  src={aboutCorporate}
                  alt="SKFF (INDIA) PVT. LTD. — Natural ingredients, perfume bottles, and laboratory glassware"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-in-out group-hover:scale-105"
                  loading="lazy"
                  width={1200}
                  height={800}
                />
              </div>
            </motion.div>

            {/* Right Column: Heritage Content */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: "easeInOut", delay: 0.15 }}
              className="flex flex-col items-start"
            >
              <span className="eyebrow text-[#F48CA7] font-semibold tracking-[0.28em] text-xs uppercase">
                OUR HERITAGE
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-[#1F1F1F] leading-tight mt-5">
                Four generations of curiosity, rooted in nature.
              </h2>
              <div className="mt-8 flex flex-col gap-5 text-[#555] font-body text-base md:text-[17px] leading-[1.8]">
                <p>
                  SKFF (INDIA) PVT. LTD. is a leading organization in the Indian subcontinent, engaged in the creation, development, manufacturing and supply of flavours and fragrances for the food, beverage, pharmaceutical, nutraceutical, consumer goods and cosmetic industries.
                </p>
                <p>
                  We are a family-run organization, committed to our independence and proud of the freedom to excel. Through innovation, quality, and customer-focused solutions, we continue to create exceptional sensory experiences that inspire brands and consumers around the world.
                </p>
              </div>
              <Link
                to="/about"
                className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#1F1F1F] hover:text-[#F48CA7] transition-colors duration-300"
              >
                Read Our Story <span className="text-sm">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================================================
          PRODUCT SECTION — WITH FLOATING PERFUME MOLECULES
          ================================================== */}
      <section className="relative py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-[#FFF8F5] overflow-hidden">
        {/* Translucent Aroma Molecules Background Effect */}
        <PerfumeMolecules />

        <div className="container-luxury max-w-7xl relative z-10">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {/* Left Card: Flavours */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <Link
                to="/flavours"
                className="group relative block h-[480px] md:h-[540px] lg:h-[620px] rounded-[30px] overflow-hidden hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-[8px]"
              >
                <img
                  src={flavoursHero}
                  alt="Flavours"
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.08]"
                  loading="lazy"
                />
                {/* Very soft bottom gradient — max 12% opacity so image stays bright */}
                <div className="absolute bottom-0 left-0 w-full h-[35%] bg-gradient-to-t from-black/[0.12] to-transparent pointer-events-none" />
                {/* Text overlay with shadow for readability */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                  <div className="flex flex-col items-start gap-2" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.45), 0 2px 12px rgba(0,0,0,0.25)" }}>
                    <span className="text-xs uppercase tracking-[0.28em] font-semibold text-white">TASTE</span>
                    <h3 className="text-[32px] md:text-[42px] lg:text-[56px] font-bold font-heading text-white leading-tight">Flavours</h3>
                    <p className="text-white font-body text-sm md:text-base leading-relaxed max-w-[380px] mt-1 mb-4">
                      From confectionary and dairy to pharma and health drinks— flavours built for the palate of a changing world.
                    </p>
                    <span className="relative inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-white">
                      <span className="relative py-1">
                        EXPLORE
                        <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
                      </span>
                      <span className="text-base transition-transform duration-300 ease-in-out group-hover:translate-x-2">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Right Card: Fragrances */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
            >
              <Link
                to="/fragrances"
                className="group relative block h-[480px] md:h-[540px] lg:h-[620px] rounded-[30px] overflow-hidden hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-[8px]"
              >
                <img
                  src={fragrancesHero}
                  alt="Fragrances"
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.08]"
                  loading="lazy"
                />
                {/* Very soft bottom gradient — max 12% opacity so image stays bright */}
                <div className="absolute bottom-0 left-0 w-full h-[35%] bg-gradient-to-t from-black/[0.12] to-transparent pointer-events-none" />
                {/* Text overlay with shadow for readability */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                  <div className="flex flex-col items-start gap-2" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.45), 0 2px 12px rgba(0,0,0,0.25)" }}>
                    <span className="text-xs uppercase tracking-[0.28em] font-semibold text-white">SCENT</span>
                    <h3 className="text-[32px] md:text-[42px] lg:text-[56px] font-bold font-heading text-white leading-tight">
                      Fragrances
                    </h3>
                    <p className="text-white font-body text-sm md:text-base leading-relaxed max-w-[380px] mt-1 mb-4">
                      Home care, personal care, fabric care and fine fragrance -- scents crafted with the legacy of Grasse.
                    </p>
                    <span className="relative inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-white">
                      <span className="relative py-1">
                        EXPLORE
                        <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full" />
                      </span>
                      <span className="text-base transition-transform duration-300 ease-in-out group-hover:translate-x-2">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================================================
          CTA SECTION — WITH MOVING PASTEL GRADIENT
          ================================================== */}
      <section id="contact" className="pt-8 pb-20 md:pt-12 md:pb-28 px-6 md:px-12 lg:px-20 bg-[#FFF8F5]">
        <div className="container-luxury max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[2.5rem] p-12 md:p-20 text-center overflow-hidden bg-gradient-to-r from-[#FCE4EC] via-[#FFF9F7] to-[#F48CA7]/25 border border-[#ECECEC] shadow-soft"
          >
            <Particles count={20} />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-8">
              <span className="eyebrow text-[#F48CA7] font-semibold text-xs tracking-[0.3em]">
                START A CREATIVE JOURNEY
              </span>
              <h2 className="text-3xl md:text-5xl font-heading font-light text-[#1F1F1F] leading-tight">
                Let's create something the world will remember by its aroma.
              </h2>
              <Link
                to="/contact"
                className="mt-2 inline-block px-10 py-4 rounded-full bg-[#111111] text-white text-xs uppercase tracking-[0.24em] font-medium hover:scale-105 hover:bg-[#F48CA7] hover:shadow-xl transition-all duration-300"
              >
                Start a Conversation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
