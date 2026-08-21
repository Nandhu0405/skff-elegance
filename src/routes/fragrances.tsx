import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/site/Reveal";
import { FragrancesBackground } from "@/components/site/FragrancesBackground";
import homecare from "@/assets/frag-homecare.jpg";
import personal from "@/assets/frag-personal.jpg";
import fabric from "@/assets/frag-fabric.jpg";
import fine from "@/assets/frag-fine.jpg";
import fragHero from "@/assets/fragrances-hero.jpg";

export const Route = createFileRoute("/fragrances")({
  head: () => ({
    meta: [
      { title: "Fragrances — SKFF" },
      { name: "description", content: "SKFF fragrances span Home Care, Personal Care, Fabric Care and Fine Fragrance — crafted with the cultural legacy of Grasse." },
      { property: "og:title", content: "Fragrances — SKFF" },
      { property: "og:description", content: "Fragrance for home care, personal care, fabric care and fine fragrance." },
    ],
  }),
  component: Fragrances,
});

const cats = [
  {
    h: "Home Care",
    sub: "Creating Freshness for Everyday Living",
    img: homecare,
    p: "Our Home Care fragrances are thoughtfully developed to enhance household cleaning products with long-lasting freshness and superior olfactory performance. Designed for products such as surface cleaners, dishwashing liquids, detergents, and air fresheners, our fragrances create a clean and refreshing environment while meeting evolving consumer preferences.",
  },
  {
    h: "Personal Care",
    sub: "Enhancing Everyday Personal Experiences",
    img: personal,
    p: "We create sophisticated fragrance solutions for personal care products including soaps, shampoos, body washes, lotions, creams, and deodorants. Combining creativity with technical expertise, our fragrances deliver exceptional sensory experiences while complementing premium personal care formulations.",
  },
  {
    h: "Fabric Care",
    sub: "Long-Lasting Freshness for Fabrics",
    img: fabric,
    p: "Our Fabric Care fragrances are specially formulated to provide enduring freshness and comfort across detergents, fabric conditioners, and laundry care products. Each fragrance is designed to maintain its character throughout the washing process, leaving fabrics with a pleasant and lasting fragrance.",
  },
  {
    h: "Fine Fragrances",
    sub: "Inspired by Elegance, Crafted with Excellence",
    img: fine,
    p: "Our Fine Fragrance creations blend innovation, artistry, and premium ingredients to develop distinctive perfumes, body mists, and luxury fragrance applications. Inspired by global trends and refined craftsmanship, every fragrance is designed to deliver sophistication, individuality, and lasting appeal.",
  },
];

function Fragrances() {
  const getFragranceId = (h: string) => {
    if (h.includes("Home")) return "home-care";
    if (h.includes("Personal")) return "personal-care";
    if (h.includes("Fabric")) return "fabric-care";
    if (h.includes("Fine")) return "fine-fragrances";
    return undefined;
  };

  return (
    <>
      <section id="solutions" className="relative py-32 md:py-40 overflow-hidden bg-pink/40">
        <FragrancesBackground />
        {/* Gradient blob */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none animate-blob" style={{ background: "radial-gradient(circle, rgba(244,140,167,0.15) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="container-luxury relative z-10 grid md:grid-cols-12 gap-10 items-center">
          <Reveal className="md:col-span-7">
            <motion.span
              className="inline-block eyebrow text-[#E85D75] tracking-[0.32em]"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >Fragrance Solutions</motion.span>
            <h1 className="text-hero mt-6">Fragrance Solutions</h1>
            <motion.div
              className="h-[2px] w-0 rounded-full mt-4 mb-8"
              style={{ background: "linear-gradient(to right, #F48CA7, transparent)" }}
              whileInView={{ width: 100 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            />
            <p className="text-lg text-grey leading-relaxed max-w-xl">
              At SKFF (INDIA) PVT. LTD., we develop innovative fragrance solutions
              that enrich everyday products across multiple industries. From household essentials
              and personal care to fabric care and fine fragrances, our expertise combines
              creativity, advanced research, and quality manufacturing to create memorable
              sensory experiences that inspire consumers worldwide.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-5">
            <div className="relative rounded-[2rem] overflow-hidden shadow-luxury group">
              <img
                src={fragHero}
                alt="Fine fragrance bottles"
                loading="lazy"
                className="w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                width={1600}
                height={1000}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E85D75]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </Reveal>
        </div>
      </section>


      <section className="py-24" style={{ background: "linear-gradient(180deg, #FFFBF9 0%, #FFF5F7 100%)" }}>
        <div className="container-luxury space-y-24">
          {cats.map((c, i) => (
            <Reveal key={c.h} delay={(i % 2) * 0.08}>
              <motion.article
                id={getFragranceId(c.h)}
                className={`grid md:grid-cols-12 gap-10 items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              >
                <div className="md:col-span-7 relative rounded-[2rem] overflow-hidden bg-cream aspect-[16/10] group shadow-luxury">
                  <img
                    src={c.img}
                    alt={c.h}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                    width={1000}
                    height={800}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#E85D75]/12 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute top-5 left-5">
                    <span className="px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] text-white"
                      style={{ background: "rgba(232,93,117,0.80)", backdropFilter: "blur(8px)" }}
                    >0{i + 1}</span>
                  </div>
                </div>
                <div className="md:col-span-5">
                  <motion.span
                    className="inline-block eyebrow text-[#E85D75]"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >0{i + 1} — {c.h}</motion.span>
                  <h2 className="text-display mt-4">{c.sub}</h2>
                  <motion.div
                    className="h-[2px] w-0 rounded-full my-5"
                    style={{ background: "linear-gradient(to right, #F48CA7, transparent)" }}
                    whileInView={{ width: 60 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                  <p className="text-grey text-[15px] leading-[1.85]">{c.p}</p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
