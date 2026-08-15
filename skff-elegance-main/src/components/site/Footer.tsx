import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import logo from "@/assets/logoskf.png";

export function Footer() {
  // Tiny floating stars
  const stars = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 3,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * -4,
  }));

  return (
    <footer className="relative bg-gradient-to-b from-[#181617] via-[#111111] to-[#080808] text-white overflow-hidden border-t border-white/10 mt-24">
      {/* Soft Ambient Glowing Accents */}
      <div aria-hidden className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#F48CA7]/10 blur-3xl pointer-events-none" />
      <div aria-hidden className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#FCE4EC]/5 blur-3xl pointer-events-none" />

      {/* Floating Tiny Stars */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map((s) => (
          <motion.span
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              boxShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container-luxury relative z-10 py-16 md:py-20">
        {/* Animated gradient divider at top */}
        <motion.div
          className="mb-14 h-px w-full"
          style={{ background: "linear-gradient(to right, transparent, rgba(244,140,167,0.5), transparent)" }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" as const }}
        />

        <div className="grid gap-12 md:grid-cols-12">
          {/* Logo & Description */}
          <motion.div
            className="md:col-span-4 flex flex-col gap-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Link to="/" className="inline-block bg-white/90 p-3 rounded-2xl w-fit shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                src={logo}
                alt="SKFF Logo"
                className="w-[120px] md:w-[140px] h-auto object-contain"
              />
            </Link>
            <p className="text-white/70 text-sm max-w-xs leading-relaxed font-body">
              SKFF (INDIA) PVT. LTD. — crafting extraordinary tastes and scents inspired by nature and backed by science since 1922.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h4 className="eyebrow mb-5 text-[#F48CA7] font-heading font-semibold tracking-[0.2em]">Quick Links</h4>
            <ul className="space-y-3 text-sm text-white/70 font-body">
              <li><Link to="/" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Home</Link></li>
              <li><Link to="/about" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">About Us</Link></li>
              <li><Link to="/flavours" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Flavours</Link></li>
              <li><Link to="/fragrances" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Fragrances</Link></li>
              <li><Link to="/global-presence" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Global Presence</Link></li>
              <li><Link to="/news" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">News</Link></li>
              <li><Link to="/contact" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Contact</Link></li>
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h4 className="eyebrow mb-5 text-[#F48CA7] font-heading font-semibold tracking-[0.2em]">Products</h4>
            <ul className="space-y-3 text-sm text-white/70 font-body">
              <li><Link to="/flavours" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Food &amp; Beverage Flavours</Link></li>
              <li><Link to="/flavours" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Confectionery &amp; Bakery Notes</Link></li>
              <li><Link to="/fragrances" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Fine Fragrances &amp; Perfumery</Link></li>
              <li><Link to="/fragrances" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Personal &amp; Home Care Scents</Link></li>
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h4 className="eyebrow mb-5 text-[#F48CA7] font-heading font-semibold tracking-[0.2em]">Contact</h4>
            <p className="text-sm text-white/70 leading-relaxed font-body mb-4">
              Lotus Corporate Park, Goregaon (East),<br />
              Mumbai — 400063, India<br />
              <a href="mailto:info@skff.co.in" className="hover:text-[#F48CA7] transition-colors mt-1 inline-block text-white/90">info@skff.co.in</a>
            </p>
            <div className="flex gap-3 text-white/70">
              {[
                { href: "#", label: "LinkedIn", Icon: FaLinkedin },
                { href: "#", label: "Instagram", Icon: FaInstagram },
                { href: "#", label: "Facebook", Icon: FaFacebook },
              ].map(({ href, label, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
                  whileHover={{
                    scale: 1.15,
                    background: "rgba(244,140,167,0.25)",
                    borderColor: "rgba(244,140,167,0.6)",
                    boxShadow: "0 0 16px rgba(244,140,167,0.35)",
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <Icon size={16} className="text-white/80" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/50 font-body">
          <div>© {new Date().getFullYear()} SKFF (INDIA) PVT. LTD. All rights reserved.</div>
          <div>Mumbai · Boisar · Grasse</div>
        </div>
      </div>
    </footer>
  );
}
