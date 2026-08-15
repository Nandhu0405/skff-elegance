import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { FloralBackdrop } from "@/components/site/FloralBackdrop";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import grasse from "@/assets/grasse-france.jpg";
import workshop from "@/assets/align-workshop.jpg";
import products from "@/assets/align-products.jpg";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Notes — SKFF" },
      { name: "description", content: "SK France in Grasse, our social responsibility initiative Align, and the handcrafted products it creates." },
      { property: "og:title", content: "News & Notes — SKFF" },
      { property: "og:description", content: "SK France in Grasse and the Align social responsibility initiative." },
    ],
  }),
  component: News,
});

// Elegant image frame with parallax + hover zoom + shimmer overlay
function EditorialImage({
  src,
  alt,
  aspect = "aspect-[4/3]",
  caption,
  captionPosition = "bottom-left",
  badge,
}: {
  src: string;
  alt: string;
  aspect?: string;
  caption?: string;
  captionPosition?: "bottom-left" | "top-right";
  badge?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.02, 1.08]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
      className="relative group"
    >
      {/* Decorative offset frame */}
      <motion.div
        aria-hidden
        className="absolute -inset-3 md:-inset-4 rounded-3xl border border-rose/30"
        initial={{ opacity: 0, x: -12, y: 12 }}
        whileInView={{ opacity: 1, x: -8, y: 8 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
      />
      <div className={`relative rounded-3xl overflow-hidden shadow-2xl ${aspect}`}>
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          style={{ y, scale }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
        {/* Shimmer sweep on hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1600ms] ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        {caption && (
          <div
            className={`absolute ${
              captionPosition === "bottom-left" ? "bottom-5 left-5" : "top-5 right-5"
            } bg-cream/90 backdrop-blur px-4 py-2 rounded-full text-[0.65rem] uppercase tracking-[0.28em] text-charcoal shadow-md`}
          >
            {caption}
          </div>
        )}
        {badge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute top-5 right-5 bg-rose text-cream px-4 py-2 rounded-full text-[0.65rem] uppercase tracking-[0.28em] shadow-lg"
          >
            {badge}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// Animated ornamental divider
function Ornament({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
      className={`flex items-center gap-3 origin-left ${className}`}
    >
      <span className="h-px w-16 bg-rose/60" />
      <span className="h-1.5 w-1.5 rounded-full bg-rose" />
      <span className="h-px w-8 bg-rose/40" />
    </motion.div>
  );
}

// Word-by-word heading reveal
function StaggerHeading({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const words = children.split(" ");
  return (
    <h2 className={className} aria-label={children}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
          className="inline-block mr-[0.25em]"
        >
          {w === "Grasse" || w === "Align" || w === "care," ? (
            <em className="italic font-light text-rose">{w}</em>
          ) : (
            w
          )}
        </motion.span>
      ))}
    </h2>
  );
}

function News() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0.3]);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative py-32 md:py-44 overflow-hidden bg-lavender/40">
        <FloralBackdrop density={10} />
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container-luxury relative z-10">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-rose" />
              <span className="eyebrow !mt-0">Journal · Volume I</span>
            </div>
            <h1 className="text-hero mt-8 max-w-4xl leading-[1.05]">
              Notes from the{" "}
              <em className="italic font-light text-rose relative">
                houses
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-rose/40 origin-left"
                />
              </em>
              .
            </h1>
            <p className="mt-8 max-w-2xl text-lg md:text-xl text-grey leading-relaxed font-light">
              Milestones, places and people that shape the world of SKFF — from the perfume capital of Grasse to a small, purposeful workshop in Mumbai.
            </p>
            <Ornament className="mt-10" />
          </Reveal>
        </motion.div>

        {/* Floating index chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9 }}
          className="container-luxury relative z-10 mt-16 hidden md:flex gap-6 text-xs uppercase tracking-[0.28em] text-grey"
        >
          <span>01 · Grasse</span>
          <span className="text-rose">02 · Align</span>
          <span>03 · Handmade</span>
        </motion.div>
      </section>

      {/* STORY 01 — SK France, Grasse */}
      <section className="relative py-28 md:py-40 overflow-hidden">
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
          className="absolute -top-10 right-0 text-[16rem] md:text-[22rem] font-light leading-none text-rose/[0.06] select-none pointer-events-none"
        >
          01
        </motion.div>

        <div className="container-luxury relative">
          <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-center">
            <div className="md:col-span-6">
              <EditorialImage
                src={grasse}
                alt="International Presences — SK France, Grasse"
                caption="International Presences · Grasse"
              />
            </div>
            <div className="md:col-span-6">
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase tracking-[0.32em] text-rose">Milestone</span>
                  <span className="h-px w-8 bg-rose/50" />
                <span className="text-xs uppercase tracking-[0.32em] text-grey">2018</span>
                </div>
              </Reveal>
              <StaggerHeading className="text-display mt-6 leading-[1.1]">
                International Presences.
              </StaggerHeading>
              <Reveal delay={0.3}>
                <p className="mt-8 text-grey leading-relaxed text-lg font-light">
                  2018 marked an important year as we decided to expand our footprint and set up our facility, <span className="text-charcoal">SK France</span>, at Grasse. Universally regarded as the birthplace and the capital of perfumery, Grasse continues to be the hub where the finest fragrances of the world are crafted.
                </p>
              </Reveal>
              <Reveal delay={0.45}>
                <p className="mt-5 text-grey leading-relaxed text-lg font-light">
                  Our perfumers are a part of this cultural legacy of Grasse and are passionate to bring the richness of their expertise into our products.
                </p>
              </Reveal>
              <Reveal delay={0.6}>
                <div className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-rose/20">
                  {[
                    { k: "2018", v: "Established" },
                    { k: "300+", v: "Years of craft" },
                    { k: "1", v: "Capital of scent" },
                  ].map((s) => (
                    <div key={s.v}>
                      <div className="text-2xl md:text-3xl font-light text-charcoal">{s.k}</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.22em] text-grey">{s.v}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* STORY 02 — Align */}
      <section className="relative py-28 md:py-40 bg-lavender/30 overflow-hidden">
        <FloralBackdrop density={6} />
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
          className="absolute -top-10 left-0 text-[16rem] md:text-[22rem] font-light leading-none text-rose/[0.06] select-none pointer-events-none"
        >
          02
        </motion.div>

        <div className="container-luxury relative z-10">
          <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-center">
            <div className="md:col-span-6 md:order-2">
              <EditorialImage
                src={workshop}
                alt="Align Workshop"
                caption="Est. July 2012"
              />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="mt-10 rounded-2xl bg-cream/90 backdrop-blur border border-rose/20 p-7 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-rose" />
                  <div className="text-[0.65rem] uppercase tracking-[0.3em] text-rose">Align Workshop</div>
                </div>
                <p className="mt-4 text-charcoal leading-relaxed font-light">
                  Plot 25 C/D, Laxmi Industrial Estate<br />
                  New Link Road, Andheri (W)<br />
                  Mumbai — 400053
                </p>
              </motion.div>
            </div>
            <div className="md:col-span-6 md:order-1">
              <Reveal>
                <span className="eyebrow">Social Responsibility</span>
              </Reveal>
              <StaggerHeading className="text-display mt-6 leading-[1.1]">
                Align — a difference, made by hand.
              </StaggerHeading>
              <Reveal delay={0.3}>
                <p className="mt-8 text-grey leading-relaxed text-lg font-light">
                  <span className="text-rose text-3xl leading-none font-serif italic mr-1">“</span>
                  Align was created in July 2012 with the sole purpose of making a difference. It has been created for a special cause by extremely special people.
                </p>
              </Reveal>
              <Reveal delay={0.45}>
                <p className="mt-5 text-grey leading-relaxed text-lg font-light">
                  All the products are made by the people who have special needs and are differently abled. We hope to reach out to as many people as we can in many walks of life.
                </p>
              </Reveal>
              <Ornament className="mt-10" />
            </div>
          </div>
        </div>
      </section>

      {/* STORY 03 — Align Products */}
      <section className="relative py-28 md:py-40 overflow-hidden">
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
          className="absolute -top-10 right-0 text-[16rem] md:text-[22rem] font-light leading-none text-rose/[0.06] select-none pointer-events-none"
        >
          03
        </motion.div>

        <div className="container-luxury relative">
          <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-center">
            <div className="md:col-span-6">
              <Reveal>
                <span className="eyebrow">Align Products</span>
              </Reveal>
              <StaggerHeading className="text-display mt-6 leading-[1.1]">
                Crafted with care, given with meaning.
              </StaggerHeading>
              <Reveal delay={0.3}>
                <p className="mt-8 text-grey leading-relaxed text-lg font-light">
                  Each Align piece is made slowly, by hand, and carries the intent of the people who made it.
                </p>
              </Reveal>
              <ul className="mt-10 space-y-1">
                {[
                  { n: "01", t: "Handcrafted, perfumed candles" },
                  { n: "02", t: "Personal care — aroma soaps, shower gels & bath" },
                  { n: "03", t: "Bath salts and signature perfumes" },
                  { n: "04", t: "Customized gifts — our key strength" },
                ].map((item, i) => (
                  <motion.li
                    key={item.n}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.7, delay: 0.4 + i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
                    className="group flex gap-6 items-center py-5 border-b border-rose/15 cursor-default"
                  >
                    <span className="text-xs uppercase tracking-[0.3em] text-rose min-w-[2rem] group-hover:translate-x-1 transition-transform duration-500">
                      {item.n}
                    </span>
                    <span className="text-lg text-charcoal font-light flex-1 group-hover:text-rose transition-colors duration-500">
                      {item.t}
                    </span>
                    <span className="text-rose opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                      →
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-6">
              <EditorialImage
                src={products}
                alt="Align handcrafted products"
                aspect="aspect-[4/5]"
                badge="Handmade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Closing note */}
      <section className="relative py-24 md:py-32 bg-lavender/40 overflow-hidden">
        <FloralBackdrop density={4} />
        <div className="container-luxury relative z-10 text-center">
          <Reveal>
            <Ornament className="!justify-center mx-auto w-fit" />
            <p className="mt-8 max-w-2xl mx-auto text-2xl md:text-3xl font-light italic text-charcoal leading-relaxed">
              “A house is remembered for its milestones, but defined by its intentions.”
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.32em] text-grey">— SKFF Journal</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
