import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import timeline1922 from "@/assets/timeline-1922.png";
import timeline1960 from "@/assets/timeline-1960.png";
import logoSkf from "@/assets/logoskf.png";
import productionPlant from "@/assets/production-plant.jpg";
import rdLab from "@/assets/rd-lab.jpg";
import grasseFrance from "@/assets/grasse-france.jpg";

export interface Milestone {
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  detailedDescription?: string;
  img: string;
  alt: string;
  isLogo?: boolean;
}

export const milestones: Milestone[] = [
  {
    year: "1922",
    title: "Establishment of S. Kushalchand in Kolkata",
    subtitle: "Roots of Natural Aroma Trade",
    description: "Founded as a traditional merchant house in Kolkata, establishing early roots in natural aroma trade.",
    detailedDescription: "Founded in 1922 as S. Kushalchand in Kolkata, our journey began with sourcing natural botanicals, essential oils, and aromatic raw materials. Over the decades, our commitment to purity, authenticity, and relationships with master cultivators laid the foundation for four generations of sensory innovation.",
    img: timeline1922,
    alt: "Establishment of S. Kushalchand in Kolkata",
  },
  {
    year: "1960",
    title: "Shift of Operations to Mumbai",
    subtitle: "Expanding Industrial Footprint",
    description: "Relocated core corporate operations to Mumbai to expand industrial footprint and supply chain network.",
    detailedDescription: "In 1960, core corporate and commercial operations were strategically relocated to Mumbai, the economic nerve center of India. This pivotal transition enabled rapid expansion across industrial supply chains, establishing direct partnerships with consumer goods manufacturers and pioneering custom formulation capabilities.",
    img: timeline1960,
    alt: "Shift of Operations to Mumbai",
  },
  {
    year: "1988",
    title: "Formation of SKFF (INDIA) PVT. LTD.",
    subtitle: "Official Corporate Identity",
    description: "Official formation of SKFF to focus on high-purity industrial flavour and fragrance formulations.",
    detailedDescription: "1988 marked the official incorporation of SKFF (INDIA) PVT. LTD. as a specialized enterprise. Combining traditional botanical craftsmanship with modern industrial technology, SKFF established modern production protocols for food-grade flavours and fine fragrance compounds.",
    img: logoSkf,
    alt: "Formation of SKFF (INDIA) PVT. LTD.",
    isLogo: true,
  },
  {
    year: "2001",
    title: "Manufacturing Facility Established at Boisar",
    subtitle: "75,000 sq. ft. State-of-the-Art Infrastructure",
    description: "75,000 sq.ft state-of-the-art manufacturing facility.",
    detailedDescription: "Commissioned in 2001, our 75,000 sq. ft. eco-conscious manufacturing plant in Boisar features dedicated, isolated suites for flavours and fragrances. Built with GMP compliance and automated dosing technology, it ensures total elimination of cross-contamination and uncompromised batch-to-batch consistency.",
    img: productionPlant,
    alt: "Manufacturing Facility Established at Boisar",
  },
  {
    year: "2017",
    title: "Advanced Application Centre & R&D Laboratory",
    subtitle: "Sensory Innovation Hub",
    description: "State-of-the-art research and innovation centre.",
    detailedDescription: "Launched in 2017, our Application Laboratory in Andheri and R&D Centre in Boisar house state-of-the-art gas chromatography-mass spectrometry (GC-MS), pilot plant simulation lines, and sensory panels to create and validate bespoke taste and aroma profiles.",
    img: rdLab,
    alt: "Advanced Application Centre & R&D Laboratory",
  },
  {
    year: "2018",
    title: "SK France Established in Grasse",
    subtitle: "Connecting with the Perfume Capital of the World",
    description: "Expansion into the perfume capital of the world.",
    detailedDescription: "In 2018, SK France was established in Grasse, France—the historic cradle of international perfumery. This global presence bridges European creative perfumery with our Asian manufacturing excellence, sourcing rare natural extracts directly from Grasse fields.",
    img: grasseFrance,
    alt: "SK France Established in Grasse",
  },
];

export function EvolutionTimeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative py-20 md:py-28 bg-[#FFF9F7] text-[#1F1F1F] font-body overflow-hidden">
      {/* Header */}
      <div className="container-luxury max-w-4xl text-center mb-14 md:mb-18">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="eyebrow text-[#F48CA7] font-semibold tracking-[0.3em] text-xs uppercase block mb-2"
        >
          OUR JOURNEY
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold font-heading text-[#1F1F1F] tracking-tight"
        >
          Our Evolution
        </motion.h2>
      </div>

      {/* Timeline Wrapper - Compact Height */}
      <div className="container-luxury max-w-5xl relative">
        {/* Center Vertical Timeline Line */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-8 w-[2px] -translate-x-1/2 bg-[#111111]/10 pointer-events-none">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="w-full h-full bg-[#111111] origin-top"
          />
        </div>

        {/* Milestone Cards - Reduced Spacing */}
        <div className="space-y-10 md:space-y-14">
          {milestones.map((item, index) => {
            const isEven = index % 2 === 0;
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={item.year}
                className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center"
              >
                {/* Timeline Pulsing Node */}
                <div className="absolute left-6 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                  <span
                    className={`absolute w-6 h-6 rounded-full bg-[#F48CA7]/30 ${
                      isExpanded ? "scale-150 bg-[#F48CA7]/60" : "animate-ping"
                    }`}
                  />
                  <span
                    className={`w-4 h-4 rounded-full border-2 border-white ring-4 ring-[#F48CA7]/50 shadow-md z-10 transition-all duration-300 ${
                      isExpanded ? "bg-[#F48CA7] scale-125" : "bg-[#111111]"
                    }`}
                  />
                </div>

                {/* Left/Right Column */}
                <div
                  className={`pl-14 md:pl-0 ${
                    isEven
                      ? "md:order-1 md:flex md:justify-end"
                      : "md:order-2 md:col-start-2 md:flex md:justify-start"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                      delay: index * 0.1,
                    }}
                    className="w-full max-w-[360px]"
                  >
                    {/* Card Container */}
                    <div
                      role="button"
                      tabIndex={0}
                      aria-expanded={isExpanded}
                      aria-controls={`expanded-panel-${item.year}`}
                      aria-label={`${isExpanded ? "Collapse" : "Expand"} detailed information for milestone ${item.year}`}
                      onClick={() => toggleExpand(index)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleExpand(index);
                        }
                      }}
                      className={`group relative block bg-white/90 backdrop-blur-xl rounded-[24px] p-5 border shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(244,140,167,0.2)] transition-all duration-500 ease-in-out overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F48CA7] ${
                        isExpanded
                          ? "border-[#F48CA7] shadow-[0_16px_36px_rgba(244,140,167,0.25)] ring-2 ring-[#F48CA7]/30"
                          : "border-white hover:border-[#F48CA7]/60 hover:-translate-y-2"
                      }`}
                    >
                      {/* Soft Active Glow on Hover */}
                      <div className="absolute -inset-10 bg-gradient-to-r from-[#F48CA7]/0 via-[#F48CA7]/15 to-[#FCE4EC]/0 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      {/* Timeline Image Container */}
                      <div
                        className="relative w-full h-[180px] rounded-[16px] overflow-hidden mb-4 bg-[#FAF6F4] flex items-center justify-center cursor-pointer group/img active:scale-[0.98] transition-transform duration-200"
                      >
                        <img
                          src={item.img}
                          alt={item.alt}
                          loading="lazy"
                          className={`w-full h-full ${
                            item.isLogo
                              ? "object-contain p-6 group-hover/img:scale-110"
                              : "object-cover group-hover/img:scale-110"
                          } transition-transform duration-500 ease-in-out`}
                        />

                        {/* Interactive Click-to-Expand Indicator Overlay */}
                        <div className="absolute top-2.5 right-2.5 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium tracking-wide flex items-center gap-1.5 opacity-90 group-hover/img:opacity-100 group-hover/img:bg-[#F48CA7] transition-all duration-300 shadow-sm">
                          <span>{isExpanded ? "Close" : "Expand"}</span>
                          <span className="text-xs">{isExpanded ? "▲" : "🔍"}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col items-start relative z-10">
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className="text-2xl md:text-3xl font-bold font-heading text-[#111111] tracking-tight group-hover:text-[#F48CA7] transition-all duration-300">
                            {item.year}
                          </span>
                          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#F48CA7] group-hover:underline">
                            {isExpanded ? "COLLAPSE ▲" : "EXPAND DETAILS ▼"}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold font-heading text-[#1F1F1F] leading-snug mb-2 group-hover:text-[#111111] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-[#555555] font-body text-xs md:text-sm leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Empty column for balance on desktop */}
                <div
                  className={`hidden md:block ${
                    isEven ? "md:order-2" : "md:order-1"
                  }`}
                />

                {/* Expanded Detail Panel directly below clicked item */}
                <AnimatePresence mode="wait">
                  {isExpanded && (
                    <motion.div
                      id={`expanded-panel-${item.year}`}
                      key={`expanded-${item.year}`}
                      initial={{ opacity: 0, height: 0, y: -15, scale: 0.95 }}
                      animate={{ opacity: 1, height: "auto", y: 0, scale: 1 }}
                      exit={{ opacity: 0, height: 0, y: -15, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="col-span-1 md:col-span-2 w-full z-30 pt-4 pb-2"
                    >
                      <div className="relative bg-white/95 backdrop-blur-2xl rounded-[28px] p-6 sm:p-8 md:p-10 border border-[#F48CA7]/40 shadow-[0_20px_50px_rgba(244,140,167,0.18)] overflow-hidden">
                        {/* Close button (×) */}
                        <button
                          type="button"
                          onClick={() => setExpandedIndex(null)}
                          aria-label={`Close expanded details for ${item.year}`}
                          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-10 h-10 rounded-full bg-[#FAF6F4] text-[#111111] hover:bg-[#F48CA7] hover:text-white transition-all duration-300 flex items-center justify-center text-xl font-semibold shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F48CA7]"
                        >
                          ×
                        </button>

                        {/* 2-Column Responsive Layout (45% image / 55% content) */}
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-center justify-between">
                          {/* Left Column (45% Width): Enlarged version of selected image */}
                          <div className="w-full lg:w-[45%] shrink-0">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.90 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.45, ease: "easeOut" }}
                              className="relative w-full h-[240px] sm:h-[300px] lg:h-[360px] rounded-[22px] overflow-hidden bg-[#FAF6F4] shadow-md border border-[#ECECEC] group"
                            >
                              <img
                                src={item.img}
                                alt={item.alt}
                                className={`w-full h-full ${
                                  item.isLogo ? "object-contain p-8" : "object-cover"
                                } transition-transform duration-700 ease-out group-hover:scale-105`}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                            </motion.div>
                          </div>

                          {/* Right Column (55% Width): Title, Year, Subtitle & Full Detailed Content */}
                          <div className="w-full lg:w-[55%] flex flex-col items-start justify-center">
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
                              className="w-full"
                            >
                              {/* Year Badge */}
                              <div className="flex items-center gap-3 mb-3">
                                <span className="px-4 py-1 rounded-full bg-[#F48CA7]/15 text-[#F48CA7] font-bold text-xs tracking-widest uppercase font-heading">
                                  {item.year} MILESTONE
                                </span>
                                <span className="h-px flex-1 bg-gradient-to-r from-[#F48CA7]/30 to-transparent" />
                              </div>

                              {/* Title */}
                              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#111111] leading-tight mb-2">
                                {item.title}
                              </h3>

                              {/* Subtitle */}
                              {item.subtitle && (
                                <p className="text-sm sm:text-base font-semibold text-[#F48CA7] mb-4 font-body tracking-wide">
                                  {item.subtitle}
                                </p>
                              )}

                              {/* Description */}
                              <p className="text-[#555555] font-body text-sm sm:text-base leading-relaxed">
                                {item.detailedDescription || item.description}
                              </p>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
