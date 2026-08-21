import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/site/Reveal";
import { FlavoursBackground } from "@/components/site/FlavoursBackground";
import confectionery from "@/assets/cat-confectionery.jpg";
import dairy from "@/assets/cat-dairy.jpg";
import bakery from "@/assets/cat-bakery.jpg";
import culinary from "@/assets/cat-culinary.jpg";
import beverages from "@/assets/cat-beverages.jpg";
import pharma from "@/assets/cat-pharma.jpg";
import health from "@/assets/cat-health.jpg";
import flavoursHero from "@/assets/flavours-hero.jpg";

export const Route = createFileRoute("/flavours")({
  head: () => ({
    meta: [
      { title: "Flavours — SKFF" },
      { name: "description", content: "SKFF crafts flavours for confectionery, dairy, bakery, culinary, beverages, pharmaceuticals and instant health drinks." },
      { property: "og:title", content: "Flavours — SKFF" },
      { property: "og:description", content: "Flavours crafted for the palate of a changing world." },
    ],
  }),
  component: Flavours,
});

const cats = [
  {
    h: "Confectionery",
    sub: "Creating Delight in Every Bite",
    img: confectionery,
    p: "We develop premium flavour solutions for chocolates, candies, chewing gums, jellies, and confectionery products. Our expertise enables brands to deliver rich taste profiles, consistent quality, and memorable consumer experiences.",
  },
  {
    h: "Dairy",
    sub: "Authentic Flavours for Dairy Applications",
    img: dairy,
    p: "Our dairy flavour portfolio is designed for milk, yoghurt, ice cream, cheese, desserts, and other dairy-based products. We create authentic and well-balanced flavour profiles that enhance product quality and consumer satisfaction.",
  },
  {
    h: "Bakery",
    sub: "Flavours Crafted for Baking Excellence",
    img: bakery,
    p: "We provide innovative flavour solutions for cakes, breads, pastries, cookies, biscuits, and baked goods. Each formulation is carefully developed to deliver exceptional taste, aroma, and consistency across every application.",
  },
  {
    h: "Culinary & Savory",
    sub: "Elevating Savory Experiences",
    img: culinary,
    p: "Our culinary and savory flavours are tailored for sauces, soups, seasonings, snacks, ready-to-cook, and ready-to-eat products. We combine technical expertise with market insights to create authentic and globally inspired taste experiences.",
  },
  {
    h: "Beverages",
    sub: "Refreshing Flavours for Modern Beverages",
    img: beverages,
    p: "We offer customized flavour solutions for carbonated beverages, fruit drinks, dairy beverages, functional drinks, energy drinks, and health beverages. Our formulations are designed to deliver refreshing taste, stability, and lasting consumer appeal.",
  },
  {
    h: "Pharmaceuticals",
    sub: "Enhancing Healthcare Through Taste",
    img: pharma,
    p: "Our pharmaceutical flavour solutions improve the sensory experience of syrups, oral suspensions, chewable tablets, nutraceuticals, and healthcare formulations. We develop flavours that enhance palatability while maintaining product performance and quality.",
  },
  {
    h: "Instant & Health Drinks",
    sub: "Balanced Flavours for Nutritional Products",
    img: health,
    p: "We create specialized flavour solutions for instant beverages, malt-based drinks, protein supplements, wellness formulations, and nutritional products. Our focus is on delivering balanced taste profiles that complement functional ingredients and encourage consumer acceptance.",
  },
];

function Flavours() {
  const getCategoryId = (h: string) => {
    if (h.includes("Confectionery")) return "confectionery";
    if (h.includes("Dairy")) return "dairy";
    if (h.includes("Bakery")) return "bakery";
    if (h.includes("Culinary")) return "culinary-savory";
    if (h.includes("Beverages")) return "beverages";
    if (h.includes("Pharmaceuticals")) return "pharmaceuticals";
    if (h.includes("Instant")) return "instant-health-drinks";
    return undefined;
  };

  return (
    <>
      <section id="food-beverage" className="relative py-32 md:py-40 overflow-hidden bg-cream">
        <FlavoursBackground />
        {/* Gradient blob */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none animate-blob" style={{ background: "radial-gradient(circle, rgba(244,140,167,0.13) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="container-luxury relative z-10 grid md:grid-cols-12 gap-10 items-center">
          <Reveal className="md:col-span-7">
            <motion.span
              className="inline-block eyebrow text-[#E85D75] tracking-[0.32em]"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >Flavour Solutions</motion.span>
            <h1 className="text-hero mt-6">Flavour Solutions</h1>
            <motion.div
              className="h-[2px] w-0 rounded-full mt-4 mb-8"
              style={{ background: "linear-gradient(to right, #F48CA7, transparent)" }}
              whileInView={{ width: 100 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            />
            <p className="text-lg text-grey leading-relaxed max-w-xl">
              At SKFF (INDIA) PVT. LTD., we combine innovation, scientific expertise, and market intelligence to develop customized flavour solutions for the food, beverage, pharmaceutical, and nutraceutical industries. Every formulation is crafted to deliver exceptional taste, consistent quality, and enhanced consumer experiences while meeting the evolving demands of global markets.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-5">
            <div className="relative rounded-[2rem] overflow-hidden shadow-luxury group">
              <img src={flavoursHero} alt="Natural flavour ingredients" loading="lazy" className="w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" width={1600} height={1000} />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E85D75]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24" style={{ background: "linear-gradient(180deg, #FFFBF9 0%, #FFF8F5 100%)" }}>
        <div className="container-luxury">
          <div className="space-y-24">
            {cats.map((c, i) => (
              <Reveal key={c.h} delay={(i % 2) * 0.08}>
                <motion.article
                  id={getCategoryId(c.h)}
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
                    {/* Category badge */}
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
        </div>
      </section>
    </>
  );
}
