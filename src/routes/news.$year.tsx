import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { NewsBackground } from "@/components/site/NewsBackground";
import { milestones } from "@/components/site/EvolutionTimeline";

// Assets
import timeline1922 from "@/assets/timeline-1922.png";
import timeline1960 from "@/assets/timeline-1960.png";
import logoSkf from "@/assets/logoskf.png";
import productionPlant from "@/assets/production-plant.jpg";
import rdLab from "@/assets/rd-lab.jpg";
import grasseFrance from "@/assets/grasse-france.jpg";
import qcLab from "@/assets/qc-lab.jpg";
import applicationLab from "@/assets/application-lab.jpg";
import labFacility from "@/assets/lab-facility.jpg";
import customerMeeting from "@/assets/customer-meeting.jpg";
import alignProducts from "@/assets/align-products.jpg";
import flavoursHero from "@/assets/flavours-hero.jpg";
import fragrancesHero from "@/assets/fragrances-hero.jpg";
import alignWorkshop from "@/assets/align-workshop.jpg";

export const Route = createFileRoute("/news/$year")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.year} — SKFF Historical Evolution` },
      { name: "description", content: `Discover SKFF's historical milestone in ${params.year}.` },
    ],
  }),
  component: NewsMilestonePage,
});

interface MilestoneDetail {
  year: string;
  title: string;
  category: string;
  heroImg: string;
  subtitle: string;
  paragraphs: string[];
  gallery: { img: string; caption: string }[];
  prevYear: string | null;
  nextYear: string | null;
}

const milestoneDetails: Record<string, MilestoneDetail> = {
  "1922": {
    year: "1922",
    title: "Establishment of S. Kushalchand in Kolkata",
    category: "Heritage & Foundations",
    heroImg: timeline1922,
    subtitle: "Laying the groundwork for a century of sensory craftsmanship.",
    paragraphs: [
      "In 1922, S. Kushalchand was established in Kolkata as a traditional merchant house trading in fine essential oils, natural botanical extracts, and rare aromatic compounds. Founded with an unwavering commitment to quality and ethical trade, the house built enduring relationships with local spice growers and international distillers.",
      "Over the decades, the family's passion for natural aromatics transformed a modest merchant enterprise into a respected name across the Indian subcontinent, setting the high standards of purity that define SKFF today.",
    ],
    gallery: [
      { img: timeline1922, caption: "Historical Portrait of Founder S. Kushalchand (1922)" },
      { img: labFacility, caption: "Early Distillation & Testing Instruments" },
      { img: rdLab, caption: "Centennial Heritage Records" },
    ],
    prevYear: null,
    nextYear: "1960",
  },
  "1960": {
    year: "1960",
    title: "Shift of Operations to Mumbai",
    category: "Industrial Expansion",
    heroImg: timeline1960,
    subtitle: "Moving to India's economic epicenter to power industrial growth.",
    paragraphs: [
      "Recognizing the rapidly expanding consumer and industrial market of post-independence India, S. Kushalchand relocated its corporate headquarters and core manufacturing operations to Mumbai in 1960.",
      "Situated at the commercial crossroads of South Asia, the strategic move enabled the company to build dedicated quality control laboratories, scale up essential oil processing, and supply national beverage and confectionery pioneers.",
    ],
    gallery: [
      { img: timeline1960, caption: "Industrial Leadership & Corporate Headquarters (1960)" },
      { img: customerMeeting, caption: "Collaborative Formulation with Industry Leaders" },
      { img: productionPlant, caption: "First Scale Processing Units in Mumbai" },
    ],
    prevYear: "1922",
    nextYear: "1988",
  },
  "1988": {
    year: "1988",
    title: "Formation of SKFF (INDIA) PVT. LTD.",
    category: "Rebranding & Modernization",
    heroImg: logoSkf,
    subtitle: "Unifying decades of sensory expertise under a modern industrial banner.",
    paragraphs: [
      "In 1988, the company formally incorporated as SKFF (INDIA) PVT. LTD. This pivotal landmark consolidated over six decades of botanical mastery into a modern science-driven house.",
      "With distinct units created for food & beverage flavours and fine perfumery, SKFF expanded its scientific team and introduced advanced synthetic aroma compounding alongside natural extracts.",
    ],
    gallery: [
      { img: logoSkf, caption: "Official SKFF Corporate Identity" },
      { img: alignProducts, caption: "Handcrafted Product Lines & Samples" },
      { img: flavoursHero, caption: "Sensory Innovation for Global Palates" },
    ],
    prevYear: "1960",
    nextYear: "2001",
  },
  "2001": {
    year: "2001",
    title: "State-of-the-Art Manufacturing Facility at Boisar",
    category: "Infrastructure & Scale",
    heroImg: productionPlant,
    subtitle: "A 75,000 sq.ft modern manufacturing complex built for global compliance.",
    paragraphs: [
      "To serve international food, pharmaceutical, and cosmetic leaders, SKFF inaugurated its flagship 75,000 sq.ft manufacturing facility in Boisar, Maharashtra in 2001.",
      "Featuring segregated hygienic suites for flavours and fragrances to eliminate cross-contamination, the plant introduced automated batching systems, stainless-steel mixing vessels, and strict ISO/GMP compliance.",
    ],
    gallery: [
      { img: productionPlant, caption: "75,000 Sq. Ft. Boisar Production Complex" },
      { img: qcLab, caption: "Quality Control & Analytical Assurance" },
      { img: applicationLab, caption: "Sensory Application Trial Suites" },
    ],
    prevYear: "1988",
    nextYear: "2017",
  },
  "2017": {
    year: "2017",
    title: "Advanced Application Centre & R&D Laboratory",
    category: "Scientific Innovation",
    heroImg: rdLab,
    subtitle: "Combining gas chromatography with master flavourist evaluation.",
    paragraphs: [
      "In 2017, SKFF opened its cutting-edge Application Centre and expanded R&D innovation center in Andheri, Mumbai.",
      "Equipped with advanced GC-MS equipment, high-performance liquid chromatography, and specialized sensory evaluation booths, the facility empowers flavorists and perfumers to simulate real-world shelf-life and thermal stability across confectionery, dairy, beverages, and personal care.",
    ],
    gallery: [
      { img: rdLab, caption: "R&D Analytical Innovation Suite" },
      { img: applicationLab, caption: "Beverage & Dairy Trial Kitchens" },
      { img: qcLab, caption: "Analytical Testing & Chromatographic Assurance" },
    ],
    prevYear: "2001",
    nextYear: "2018",
  },
  "2018": {
    year: "2018",
    title: "Incorporation of SK France in Grasse",
    category: "Global Reach & Heritage",
    heroImg: grasseFrance,
    subtitle: "Establishing presence in the perfume capital of the world.",
    paragraphs: [
      "2018 marked a major international milestone with the incorporation of SK France in Grasse, France—the globally acknowledged cradle of modern perfumery.",
      "By establishing a creative presence in Grasse, SKFF bridged timeless French olfactory tradition with rapid South Asian market innovation, creating bespoke scents for global fine fragrance and home care brands.",
    ],
    gallery: [
      { img: grasseFrance, caption: "Grasse, France — World Perfumery Capital" },
      { img: fragrancesHero, caption: "Fine Fragrance Botanical Distillates" },
      { img: alignWorkshop, caption: "Artisanal Formulation Workshop" },
    ],
    prevYear: "2017",
    nextYear: null,
  },
};

function NewsMilestonePage() {
  const { year } = Route.useParams();
  const navigate = useNavigate();
  const detail = milestoneDetails[year] || milestoneDetails["1922"];

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <div className="bg-[#FFF9F7] text-[#1F1F1F] font-sans selection:bg-[#F48CA7]/30 min-h-screen relative overflow-hidden">
      {/* Background Effect */}
      <NewsBackground />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="container-luxury max-w-6xl relative z-10">
          {/* Back to Timeline Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] font-semibold text-[#555555] hover:text-[#F48CA7] transition-colors"
            >
              ← Back to Timeline
            </Link>
          </motion.div>

          {/* Category & Year */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="text-4xl md:text-6xl font-bold font-heading text-[#F48CA7]">{detail.year}</span>
            <span className="h-px w-10 bg-[#F48CA7]/50" />
            <span className="eyebrow text-xs tracking-[0.28em] font-semibold text-[#555555] uppercase">
              {detail.category}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading text-[#1F1F1F] leading-tight max-w-4xl mb-6"
          >
            {detail.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-[#555555] font-body max-w-2xl leading-relaxed italic"
          >
            "{detail.subtitle}"
          </motion.p>
        </div>

        {/* Large Parallax Hero Image Frame */}
        <div className="container-luxury max-w-6xl mt-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="relative h-[360px] md:h-[500px] lg:h-[580px] rounded-[30px] overflow-hidden shadow-2xl bg-[#FAF6F4]"
          >
            <motion.img
              src={detail.heroImg}
              alt={detail.title}
              style={{ y: heroY, scale: heroScale }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Historical Story Content */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
        <div className="container-luxury max-w-4xl mx-auto">
          <div className="flex flex-col gap-8 text-[#555555] font-body text-base md:text-lg leading-[1.85]">
            {detail.paragraphs.map((p, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className={idx === 0 ? "first-letter:text-5xl first-letter:font-bold first-letter:text-[#F48CA7] first-letter:mr-2 first-letter:float-left" : ""}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery Stagger Animation */}
      <section className="py-16 md:py-24 bg-white border-y border-[#ECECEC]">
        <div className="container-luxury max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="eyebrow text-[#F48CA7] font-semibold text-xs tracking-[0.28em] block mb-2">
              HISTORICAL GALLERY
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#1F1F1F]">
              Archival Imagery &amp; Visual Evidence
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {detail.gallery.map((g, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="group relative rounded-[24px] overflow-hidden shadow-lg bg-cream flex flex-col"
              >
                <div className="h-[240px] overflow-hidden relative">
                  <img
                    src={g.img}
                    alt={g.caption}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-in-out"
                  />
                </div>
                <div className="p-5 bg-white flex-1 border-t border-[#ECECEC]">
                  <p className="text-xs font-semibold text-[#555555] uppercase tracking-[0.18em]">
                    {g.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestone Navigation Footer */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-[#FFF9F7]">
        <div className="container-luxury max-w-4xl flex items-center justify-between border-t border-[#ECECEC] pt-12">
          {detail.prevYear ? (
            <Link
              to="/news/$year"
              params={{ year: detail.prevYear }}
              className="group flex flex-col items-start"
            >
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#F48CA7]">← PREVIOUS MILESTONE</span>
              <span className="text-xl font-bold font-heading text-[#1F1F1F] group-hover:text-[#F48CA7] transition-colors">
                {detail.prevYear} Milestone
              </span>
            </Link>
          ) : (
            <div />
          )}

          <Link
            to="/about"
            className="px-6 py-3 rounded-full bg-[#111111] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#F48CA7] transition-all"
          >
            All Milestones
          </Link>

          {detail.nextYear ? (
            <Link
              to="/news/$year"
              params={{ year: detail.nextYear }}
              className="group flex flex-col items-end text-right"
            >
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#F48CA7]">NEXT MILESTONE →</span>
              <span className="text-xl font-bold font-heading text-[#1F1F1F] group-hover:text-[#F48CA7] transition-colors">
                {detail.nextYear} Milestone
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </div>
  );
}
