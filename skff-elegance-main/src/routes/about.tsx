import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/site/Reveal";
import { FloralBackdrop } from "@/components/site/FloralBackdrop";
import { Particles } from "@/components/site/Particles";
import { EvolutionTimeline } from "@/components/site/EvolutionTimeline";
import { WhoWeAre } from "@/components/site/WhoWeAre";
import { AboutEvolutionSection } from "@/components/site/AboutEvolutionSection";

import qcLab from "@/assets/qc-lab.jpg";
import applicationLab from "@/assets/application-lab.jpg";
import rdLab from "@/assets/rd-lab.jpg";
import productionPlant from "@/assets/production-plant.jpg";
import certificationsBanner from "@/assets/certifications-banner.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SKFF — Our Story, Vision & Values" },
      { name: "description", content: "SKFF is a family run pioneer in flavours and fragrances since 1922. Discover our vision, mission, values, state-of-the-art facilities, and international certifications." },
      { property: "og:title", content: "About SKFF — Our Story" },
      { property: "og:description", content: "A family run pioneer in flavours and fragrances since 1922." },
    ],
  }),
  component: About,
});

/* ------------------------------------------------------------------ */
/*  Facilities Data (Official Company Profile Images Only)            */
/* ------------------------------------------------------------------ */
const facilitiesList = [
  {
    title: "Quality Control Department",
    img: qcLab,
    category: "QUALITY ASSURANCE",
    desc: "Rigorous testing of raw materials and finished formulations using advanced quality assurance systems, gas chromatography, and analytical instrumentation to guarantee uncompromised international purity and consistency.",
  },
  {
    title: "Application Laboratory",
    img: applicationLab,
    category: "SENSORY EVALUATION",
    desc: "Modern sensory evaluation and product trial facilities dedicated to testing flavour performance across finished food, beverage, confectionery, dairy, and oral care applications.",
  },
  {
    title: "Research & Development Center",
    img: rdLab,
    category: "INNOVATION & CREATION",
    desc: "State-of-the-art analytical equipment, organic synthesis labs, and fragrance creation stations where our senior perfumers and flavorists create unique, nature-inspired aroma formulations.",
  },
  {
    title: "Production Plant",
    img: productionPlant,
    category: "MANUFACTURING EXCELLENCE",
    desc: "Hygienic, automated 75,000 sq. ft. manufacturing facilities in Boisar featuring strictly separated production units for flavours and fragrances to completely eliminate cross-contamination.",
  },
];

/* ------------------------------------------------------------------ */
/*  Commitments Data                                                  */
/* ------------------------------------------------------------------ */
const commitments = [
  {
    h: "Vision & Mission",
    p: "To be a global provider of high quality flavours and fragrances. We endeavour to work alongside our customers to create products that cater to the ever-evolving tastes of society, believing that business success is built on mutual growth, sustainability, and ethical values.",
  },
  {
    h: "Passion",
    p: "We are committed to delivering high-quality products that align perfectly with the sensory demands of our customers, driven continuously to exceed expectations by learning, adapting, and creating alongside industry developments.",
  },
  {
    h: "Integrity",
    p: "Our relationships within the organization, and with our customers and suppliers, are built entirely on trust and transparency — the twin pillars that have successfully carried our family-run house into its fourth generation.",
  },
  {
    h: "Innovation",
    p: "As modern consumers demand superior quality, health-conscious foods, and premium personal care products, we collaborate directly with leading brands to research and formulate next-generation flavours and fragrances.",
  },
];

/* ------------------------------------------------------------------ */
/*  About Page Component                                              */
/* ------------------------------------------------------------------ */
function About() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════
          SECTION 1 — Hero Section (Company Introduction + Image)
          ════════════════════════════════════════════════════════════════ */}
      <div id="overview">
        <WhoWeAre />
      </div>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 2 & 3 — Our Journey (Video + Timeline)
          ════════════════════════════════════════════════════════════════ */}
      <div id="evolution">
        <AboutEvolutionSection />
        <EvolutionTimeline />
      </div>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 4 — Our Commitments (Vision, Passion, Integrity, Innovation)
          ════════════════════════════════════════════════════════════════ */}
      <section id="commitments" className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FFFBF9 0%, #FFF5F7 100%)" }}>
        <Particles count={12} />
        {/* Gradient blob */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none animate-blob-delay-2" style={{ background: "radial-gradient(circle, rgba(244,140,167,0.12) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="container-luxury relative z-10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <motion.span
                className="inline-block eyebrow tracking-[0.3em] text-[#E85D75] uppercase font-semibold text-xs"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >OUR COMMITMENTS</motion.span>
              <h2 className="text-display mt-4">The principles that guide our work.</h2>
              <motion.div
                className="h-[2px] w-0 mx-auto rounded-full mt-4"
                style={{ background: "linear-gradient(to right, transparent, #F48CA7, transparent)" }}
                whileInView={{ width: 100 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {commitments.map((v, i) => (
              <Reveal key={v.h} delay={i * 0.1}>
                <motion.div
                  className="group h-full rounded-[1.75rem] p-8 border transition-all duration-500"
                  style={{
                    background: "rgba(255,255,255,0.70)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.80)",
                    boxShadow: "0 4px 24px rgba(244,140,167,0.08)",
                  }}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 20px 50px rgba(244,140,167,0.20)",
                    border: "1px solid rgba(244,140,167,0.35)",
                    transition: { duration: 0.35 },
                  }}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-4xl text-[#F48CA7] font-light opacity-70">0{i + 1}</span>
                  </div>
                  <h3 className="text-xl mt-4 font-medium text-charcoal">{v.h}</h3>
                  <motion.div
                    className="mt-3 h-px w-0 rounded-full"
                    style={{ background: "linear-gradient(to right, #F48CA7, transparent)" }}
                    whileInView={{ width: 40 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                  />
                  <p className="mt-4 text-grey leading-relaxed text-sm">{v.p}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 5 — Facilities (Alternating 2-Column Luxury Layout)
          ════════════════════════════════════════════════════════════════ */}
      <section id="infrastructure" className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #FFF9F7 0%, #FFFBF9 100%)" }}>
        <FloralBackdrop density={6} />
        <div className="mx-auto max-w-[1200px] px-6 md:px-12 lg:px-16 relative z-10">
          {/* Section Header */}
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-20">
              <motion.span
                className="inline-block eyebrow tracking-[0.25em] text-[#E85D75] uppercase font-semibold text-xs"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >INFRASTRUCTURE</motion.span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-light text-charcoal mt-3">
                State-of-the-Art Facilities
              </h2>
              <motion.div
                className="h-[2px] w-0 mx-auto rounded-full mt-4"
                style={{ background: "linear-gradient(to right, transparent, #F48CA7, transparent)" }}
                whileInView={{ width: 100 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
              />
              <p className="mt-4 text-grey text-base md:text-lg">Where analytical science meets sensory artistry.</p>
            </div>
          </Reveal>

          {/* Alternating Facility Items */}
          <div className="space-y-[80px]">
            {facilitiesList.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <Reveal key={item.title} delay={index * 0.1}>
                  <motion.div
                    className="group grid gap-10 lg:grid-cols-12 items-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                  >
                    {/* Facility Image */}
                    <div
                      className={`lg:col-span-6 overflow-hidden rounded-[2rem] bg-white border border-white/80 ${
                        isEven ? "lg:order-1" : "lg:order-2"
                      }`}
                      style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.10)" }}
                    >
                      <div className="relative aspect-[16/9] w-full overflow-hidden">
                        <img
                          src={item.img}
                          alt={item.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-transparent pointer-events-none" />
                        {/* Category badge */}
                        <div className="absolute top-5 left-5">
                          <span className="px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] text-white"
                            style={{ background: "rgba(232,93,117,0.82)", backdropFilter: "blur(8px)" }}
                          >{item.category}</span>
                        </div>
                      </div>
                    </div>

                    {/* Facility Text */}
                    <div
                      className={`lg:col-span-6 flex flex-col justify-center ${
                        isEven ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-light text-charcoal mb-4 leading-tight">
                        {item.title}
                      </h3>
                      <motion.div
                        className="h-[2px] w-0 rounded-full mb-5"
                        style={{ background: "linear-gradient(to right, #F48CA7, transparent)" }}
                        whileInView={{ width: 60 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      />
                      <p className="text-grey text-base md:text-[15px] leading-[1.85] font-sans">{item.desc}</p>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 6 — Certifications (Full-Width Clean Banner Image)
          ════════════════════════════════════════════════════════════════ */}
      <section id="certifications" className="py-[60px] relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #FFF9F7 100%)" }}>
        <Particles count={8} />
        <div className="mx-auto max-w-[1200px] px-6 relative z-10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <motion.span
                className="inline-block eyebrow tracking-[0.25em] text-[#E85D75] uppercase font-semibold text-xs"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >CERTIFICATIONS</motion.span>
              <h2 className="text-3xl md:text-4xl font-display font-light text-charcoal mt-2">
                Globally Recognized Quality Standards
              </h2>
              <motion.div
                className="h-[2px] w-0 mx-auto rounded-full mt-4"
                style={{ background: "linear-gradient(to right, transparent, #F48CA7, transparent)" }}
                whileInView={{ width: 100 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <motion.div
              className="mx-auto max-w-[1100px] overflow-hidden rounded-[1.75rem] bg-white p-3 md:p-5"
              style={{
                border: "1px solid rgba(244,140,167,0.18)",
                boxShadow: "0 8px 40px rgba(244,140,167,0.10)",
              }}
              whileHover={{
                boxShadow: "0 16px 60px rgba(244,140,167,0.22)",
                transition: { duration: 0.4 },
              }}
            >
              <img
                src={certificationsBanner}
                alt="SKFF Globally Recognized Quality Certifications — GMP, ISO 9001:2015, ISO 22000:2018, HACCP, HALAL, SME"
                loading="lazy"
                className="w-full h-auto object-contain rounded-[1.25rem] block"
              />
            </motion.div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
