import { motion, type Variants } from "framer-motion";
import { Particles } from "@/components/site/Particles";

/* ------------------------------------------------------------------ */
/*  Timeline Milestones Data                                          */
/* ------------------------------------------------------------------ */
const timelineMilestones = [
  {
    year: "1922",
    title: "Founded as ",
    boldText: "S. Kushalchand",
    subText: " in Kolkata",
  },
  {
    year: "1960",
    title: "Operations shifted to ",
    boldText: "Mumbai",
    subText: " to expand market presence",
  },
  {
    year: "1988",
    title: "",
    boldText: "SKFF",
    subText: " officially established for industrial manufacturing",
  },
  {
    year: "2001",
    title: "",
    boldText: "75,000 sq.ft",
    subText: " Manufacturing Facility established in Boisar",
  },
  {
    year: "2017",
    title: "Application Centre in Andheri and ",
    boldText: "R&D Laboratory",
    subText: " in Boisar launched",
  },
  {
    year: "2018",
    title: "",
    boldText: "SK France",
    subText: " established in Grasse, France",
  },
  {
    year: "Today",
    title: "",
    boldText: "Global leader",
    subText: " in world-class Flavours & Fragrances",
  },
];

/* ------------------------------------------------------------------ */
/*  Framer Motion Variants                                           */
/* ------------------------------------------------------------------ */
const sectionVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" as const },
  },
};

const videoVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: "easeOut" as const, delay: 0.15 },
  },
};

const contentVariant: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: "easeOut" as const, delay: 0.25 },
  },
};

const timelineListVariant: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.35 },
  },
};

const timelineItemVariant: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Component: AboutEvolutionSection                                  */
/* ------------------------------------------------------------------ */
export function AboutEvolutionSection() {
  return (
    <section
      id="our-evolution"
      className="relative overflow-hidden pt-8 pb-[80px] md:pt-[30px] md:pb-[100px] px-4 sm:px-8 md:px-[60px]"
      style={{
        background:
          "linear-gradient(180deg, #FFF9F7 0%, #FFF9F6 40%, #FDECEF 75%, #FFFFFF 100%)",
      }}
    >
      {/* Abstract Fragrance Wave Circles & Soft Glows */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-[480px] w-[480px] rounded-full opacity-60 blur-[90px]"
        style={{ background: "radial-gradient(circle, rgba(213,61,90,0.12) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-28 -right-28 h-[520px] w-[520px] rounded-full opacity-70 blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(248,215,226,0.5) 0%, transparent 70%)" }}
      />

      {/* Floating Tiny Particles */}
      <Particles count={15} />

      {/* Main Container — Maximum 1200px, Horizontally Centered */}
      <motion.div
        className="relative z-10 mx-auto max-w-[1200px]"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-[60px]">
          {/* ════════════════════════════════════════════════════════
              LEFT SIDE: VIDEO PRESENTATION (48% Width)
              ════════════════════════════════════════════════════════ */}
          <motion.div className="w-full lg:w-[48%]" variants={videoVariant}>
            <div className="relative group">
              {/* Soft Pink Glow Behind Video */}
              <div className="pointer-events-none absolute -inset-3.5 rounded-[30px] bg-[#d53d5a]/15 blur-2xl opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Video Container Frame */}
              <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[480px] rounded-[24px] overflow-hidden bg-white border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_30px_70px_rgba(213,61,90,0.2)]">
                <video
                  src="/videos/skff-corporate.mp4"
                  autoPlay
                  muted
                  loop
                  controls
                  playsInline
                  className="w-full h-full object-cover rounded-[24px]"
                />
              </div>
            </div>
          </motion.div>

          {/* ════════════════════════════════════════════════════════
              RIGHT SIDE: CONTENT GLASS CARDS & TIMELINE (52% Width)
              ════════════════════════════════════════════════════════ */}
          <motion.div className="w-full lg:w-[52%]" variants={contentVariant}>
            <div
              className="max-w-[520px] rounded-[24px] p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white/40 font-sans"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.65)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              {/* Title Header */}
              <h2 className="text-[32px] sm:text-[40px] lg:text-[44px] font-bold text-[#111111] leading-tight tracking-tight font-sans">
                Our Journey
              </h2>

              {/* Subtitle */}
              <p className="text-[16px] sm:text-[19px] lg:text-[22px] font-normal text-[#666666] mt-2 mb-6 leading-snug">
                A Century of Innovation, Growth &amp; Excellence
              </p>

              {/* Intro Paragraph */}
              <p className="text-[16px] md:text-[18px] leading-[1.9] text-[#555555] mb-6 font-normal">
                The story of <strong className="text-[#111111] font-semibold">SKFF (INDIA) PVT. LTD.</strong> is built on over a century of sensory mastery, continuous innovation, and global expansion.
              </p>

              {/* Vertical Timeline */}
              <motion.div className="relative pl-6 space-y-4" variants={timelineListVariant}>
                {/* Connecting Vertical Pink Line */}
                <div className="absolute left-[7px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#d53d5a] via-[#d53d5a]/40 to-[#d53d5a]/10" />

                {timelineMilestones.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={timelineItemVariant}
                    className="relative flex items-start gap-3.5 group cursor-default transition-all duration-300 hover:-translate-y-[2px] p-1.5 rounded-xl hover:bg-white/40"
                  >
                    {/* Pink Circular Icon Dot */}
                    <div className="absolute -left-[23px] top-1.5 w-4 h-4 rounded-full bg-[#d53d5a] ring-4 ring-[#d53d5a]/20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-125">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>

                    {/* Timeline Event Content */}
                    <div className="text-[15px] md:text-[16px] leading-[1.6] text-[#555555]">
                      <span className="font-bold text-[#d53d5a] text-[16px] md:text-[17px] mr-2">
                        {item.year}
                      </span>
                      <span>{item.title}</span>
                      {item.boldText && (
                        <strong className="text-[#111111] font-semibold">
                          {item.boldText}
                        </strong>
                      )}
                      <span>{item.subText}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
