import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { Reveal } from "@/components/site/Reveal";
import { ContactBackground } from "@/components/site/ContactBackground";
import { HiOutlineOfficeBuilding, HiOutlineBeaker, HiOutlineCog, HiOutlineGlobeAlt } from "react-icons/hi";
import { FaMapMarkerAlt } from "react-icons/fa";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SKFF — Mumbai · Boisar · Grasse" },
      { name: "description", content: "Get in touch with SKFF. Corporate office in Goregaon, laboratory in Andheri, manufacturing in Boisar and SK France in Grasse." },
      { property: "og:title", content: "Contact SKFF" },
      { property: "og:description", content: "Corporate office, laboratory, manufacturing and SK France." },
    ],
  }),
  component: Contact,
});

const locations = [
  {
    icon: HiOutlineOfficeBuilding,
    tag: "Corporate Office",
    lines: [
      "G-1601/1602, Lotus Corporate Park,",
      "Graham Firth Steel Compound,",
      "Next to Jai Coach Signal,",
      "Opp. Western Express Highway,",
      "Goregaon (East), Mumbai — 400063",
    ],
  },
  {
    icon: HiOutlineCog,
    tag: "Manufacturing Unit",
    lines: [
      "J-138/1, MIDC-Tarapur, Boisar,",
      "Dist. Palghar, Maharashtra — 401506",
      "+91 2525 66 1188 / 89",
    ],
  },
  {
    icon: HiOutlineBeaker,
    tag: "SKFF Laboratory",
    lines: [
      "Unit No. 25/B, Laxmi Industrial Estate,",
      "New Link Road, Andheri West,",
      "Mumbai — 400053",
      "022 6236 2747",
    ],
  },
  {
    icon: FaMapMarkerAlt,
    tag: "SK France",
    lines: [
      "Zi le bois de Grasse,",
      "39 Avenue Louison Bobet — 06130,",
      "Grasse, France",
    ],
  },
];

/* ——— International locations ——— */
interface InternationalLocation {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  tag: string;
  location: string;
  contacts: { name: string; phones: { label?: string; number: string }[] }[];
}

const internationalLocations: InternationalLocation[] = [
  {
    icon: HiOutlineGlobeAlt,
    tag: "Russia",
    location: "Moscow",
    contacts: [
      {
        name: "Alexandra Morozova",
        phones: [
          { label: "Phone 1", number: "+7 917 543-46-66" },
          { label: "Phone 2", number: "+7 916 340-19-88" },
        ],
      },
    ],
  },
  {
    icon: HiOutlineGlobeAlt,
    tag: "PT SKF",
    location: "Tangerang, Jakarta",
    contacts: [
      {
        name: "Heni Widiastuti",
        phones: [
          { number: "+62 812-9564-080" },
        ],
      },
    ],
  },
  {
    icon: HiOutlineGlobeAlt,
    tag: "SKFF Middle East",
    location: "Sharjah Media City\nTareeq Al Hareer\nSharjah",
    contacts: [
      {
        name: "Ronak Brahmbhatt",
        phones: [],
      },
      {
        name: "Keenan Monserate",
        phones: [
          { number: "+971 54 705 5111" },
        ],
      },
    ],
  },
];

/* ——— Form types ——— */
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

/* ——— Shared styles ——— */
const SECTION_GAP = "py-20 md:py-24";

const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.60)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.75)",
  boxShadow: "0 4px 24px rgba(244,140,167,0.07)",
  position: "relative",
  overflow: "hidden",
};

const cardHover = {
  y: -6,
  boxShadow: "0 14px 40px rgba(244,140,167,0.18)",
  border: "1px solid rgba(244,140,167,0.35)",
  transition: { duration: 0.35, ease: "easeOut" },
};

/* ——— Glass reflection overlay ——— */
function GlassReflection() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "-60%",
        width: "50%",
        height: "100%",
        background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.05) 55%, transparent 60%)",
        transform: "skewX(-15deg)",
        pointerEvents: "none",
        transition: "left 0.6s ease",
      }}
      className="glass-reflection"
    />
  );
}

/* ——— Floating particles (very low opacity) ——— */
function FloatingParticles() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: 3 + Math.random() * 4,
    x: 10 + Math.random() * 80,
    delay: Math.random() * 4,
    duration: 6 + Math.random() * 6,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(244,140,167,0.12)",
          }}
          animate={{ y: [0, -600], opacity: [0, 0.6, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

/* ——— Toast component ——— */
function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);

  const bg = type === "success"
    ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
    : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)";
  const icon = type === "success" ? "✓" : "✕";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      style={{
        position: "fixed",
        bottom: 32,
        right: 32,
        zIndex: 9999,
        background: bg,
        color: "#fff",
        padding: "16px 28px",
        borderRadius: "16px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        fontWeight: 500,
        fontSize: "0.95rem",
        maxWidth: "calc(100vw - 48px)",
      }}
    >
      <span style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.25)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.85rem",
        fontWeight: 700,
        flexShrink: 0,
      }}>
        {icon}
      </span>
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          marginLeft: 8,
          background: "rgba(255,255,255,0.2)",
          border: "none",
          color: "#fff",
          borderRadius: "50%",
          width: 24,
          height: 24,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.75rem",
          flexShrink: 0,
        }}
        aria-label="Dismiss"
      >
        ✕
      </button>
    </motion.div>
  );
}

/* ——— Spinner ——— */
function Spinner() {
  return (
    <motion.span
      style={{
        display: "inline-block",
        width: 18,
        height: 18,
        border: "2.5px solid rgba(255,255,255,0.3)",
        borderTopColor: "#fff",
        borderRadius: "50%",
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
    />
  );
}

/* ——— Validation helpers ——— */
function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Full name is required";
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = "Name must be at least 2 characters";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  if (data.phone.trim() && !/^[+\d\s()-]{7,20}$/.test(data.phone.trim())) {
    errors.phone = "Please enter a valid phone number";
  }

  if (!data.subject.trim()) {
    errors.subject = "Subject is required";
  }

  if (!data.message.trim()) {
    errors.message = "Message is required";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
}

function isFormValid(data: FormData, errors: FormErrors): boolean {
  return (
    data.fullName.trim().length > 0 &&
    data.email.trim().length > 0 &&
    data.subject.trim().length > 0 &&
    data.message.trim().length > 0 &&
    Object.keys(errors).length === 0
  );
}

/* ——— 3D tilt card wrapper ——— */
function TiltCard({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg) translateY(0px)`;
  }, [reduced]);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)";
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transition: "transform 0.4s ease, box-shadow 0.35s ease, border-color 0.35s ease",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

/* ——— Stagger wrapper ——— */
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const } },
};

/* ——— Phone number helpers ——— */
function extractPhones(line: string): { text: string; tel: string }[] {
  const phoneRegex = /(\+?\d[\d\s/()-]{6,})/g;
  const matches = line.match(phoneRegex);
  if (!matches) return [];
  return matches.map(m => ({
    text: m.trim(),
    tel: m.replace(/[\s()/-]/g, ""),
  }));
}

function renderLinesWithClickablePhones(lines: string[]) {
  return lines.map((line, idx) => {
    const phones = extractPhones(line);
    if (phones.length === 0) {
      return <span key={idx}>{line}{"\n"}</span>;
    }
    // Replace phone numbers in the line with clickable links
    let remaining = line;
    const parts: React.ReactNode[] = [];
    phones.forEach((p, pi) => {
      const phoneIdx = remaining.indexOf(p.text);
      if (phoneIdx > 0) {
        parts.push(<span key={`${idx}-pre-${pi}`}>{remaining.slice(0, phoneIdx)}</span>);
      }
      parts.push(
        <a
          key={`${idx}-phone-${pi}`}
          href={`tel:${p.tel}`}
          className="transition-colors duration-200"
          style={{ textDecoration: "none", color: "inherit" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#E85D75")}
          onMouseLeave={e => (e.currentTarget.style.color = "")}
        >
          {p.text}
        </a>
      );
      remaining = remaining.slice(phoneIdx + p.text.length);
    });
    if (remaining) parts.push(<span key={`${idx}-end`}>{remaining}</span>);
    parts.push(<span key={`${idx}-nl`}>{"\n"}</span>);
    return <span key={idx}>{parts}</span>;
  });
}

/* ——— Main Contact component ——— */
function Contact() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const reduced = useReducedMotion();

  const handleChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value };
      setErrors(prevErrors => {
        const newErrors = validateForm(next);
        const filtered: FormErrors = {};
        for (const key of Object.keys(prevErrors) as (keyof FormErrors)[]) {
          if (newErrors[key]) filtered[key] = newErrors[key];
        }
        if (newErrors[field]) filtered[field] = newErrors[field];
        else delete filtered[field];
        return filtered;
      });
      return next;
    });
  }, []);

  const handleBlur = useCallback((field: keyof FormData) => {
    setTouched(prev => new Set(prev).add(field));
    const fieldErrors = validateForm(formData);
    setErrors(prev => {
      if (fieldErrors[field]) return { ...prev, [field]: fieldErrors[field] };
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, [formData]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(new Set(["fullName", "email", "phone", "subject", "message"]));
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.1) resolve(true);
          else reject(new Error("Network error"));
        }, 1800);
      });
      setToast({ message: "Message sent successfully! We'll get back to you shortly.", type: "success" });
      setFormData({ fullName: "", email: "", phone: "", subject: "", message: "" });
      setTouched(new Set());
      setErrors({});
    } catch {
      setToast({ message: "Failed to send message. Please try again.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const formIsValid = isFormValid(formData, errors);

  const motionProps = reduced
    ? {}
    : { initial: { opacity: 0, y: 30 } as const, whileInView: { opacity: 1, y: 0 } as const, viewport: { once: true } as const, transition: { duration: 0.6 } };

  return (
    <>
      {/* ═══ Inline styles for glass reflection hover & reduced-motion ═══ */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
        .contact-card:hover .glass-reflection {
          left: 110% !important;
        }
        .contact-card:hover .card-icon {
          transform: scale(1.15);
        }
        .card-icon {
          transition: transform 0.35s ease;
        }
      `}</style>

      {/* ═══ Hero Section ═══ */}
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #FFFBF9 0%, #FFF0F3 50%, #FFFBF9 100%)" }}
      >
        <ContactBackground />
        <FloatingParticles />
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none animate-blob" style={{ background: "radial-gradient(circle, rgba(244,140,167,0.15) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none animate-blob-delay-2" style={{ background: "radial-gradient(circle, rgba(200,180,255,0.12) 0%, transparent 70%)", filter: "blur(50px)" }} />
        <div className="container-luxury max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <motion.span
              className="inline-block eyebrow text-[#E85D75] tracking-[0.32em]"
              {...motionProps}
            >Contact</motion.span>
            <h1 className="text-hero mt-6 max-w-3xl">
              Let's <em className="italic font-light text-rose">talk</em>.
            </h1>
            <motion.div
              className="h-[2px] w-0 rounded-full mt-4 mb-6"
              style={{ background: "linear-gradient(to right, #F48CA7, transparent)" }}
              whileInView={{ width: 100 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            />
            <p className="text-lg text-grey max-w-xl leading-relaxed">
              A brief, a curiosity, a partnership — we'd like to hear from you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ Main Contact Section: Form (60%) + India Information Cards (40%) ═══ */}
      <section className="py-20 md:py-24">
        <div className="container-luxury max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Side: Contact Form (60% width = col-span-7) */}
            <div className="lg:col-span-7 w-full">
              <Reveal>
                <motion.div
                  className="rounded-[2rem] p-6 sm:p-8 md:p-10 lg:p-12 w-full h-full flex flex-col justify-between"
                  style={{
                    background: "rgba(255,255,255,0.65)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(255,255,255,0.8)",
                    boxShadow: "0 8px 40px rgba(244,140,167,0.10)",
                  }}
                  whileHover={{ boxShadow: "0 16px 60px rgba(244,140,167,0.18)" }}
                  transition={{ duration: 0.4 }}
                >
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal">Send a message</h2>
                    <motion.div
                      className="h-[2px] w-12 rounded-full mt-3 mb-8"
                      style={{ background: "linear-gradient(to right, #F48CA7, transparent)" }}
                    />
                  </div>

                  <form
                    className="flex flex-col gap-6 w-full"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Full Name" error={touched.has("fullName") ? errors.fullName : undefined}>
                        <input
                          required
                          className={inputCls(touched.has("fullName") && !!errors.fullName)}
                          placeholder="Your full name"
                          value={formData.fullName}
                          onChange={e => handleChange("fullName", e.target.value)}
                          onBlur={() => handleBlur("fullName")}
                          disabled={isSubmitting}
                        />
                      </Field>
                      <Field label="Email" error={touched.has("email") ? errors.email : undefined}>
                        <input
                          type="email"
                          required
                          className={inputCls(touched.has("email") && !!errors.email)}
                          placeholder="you@company.com"
                          value={formData.email}
                          onChange={e => handleChange("email", e.target.value)}
                          onBlur={() => handleBlur("email")}
                          disabled={isSubmitting}
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Phone" error={touched.has("phone") ? errors.phone : undefined}>
                        <input
                          type="tel"
                          className={inputCls(touched.has("phone") && !!errors.phone)}
                          placeholder="+91 00000 00000"
                          value={formData.phone}
                          onChange={e => handleChange("phone", e.target.value)}
                          onBlur={() => handleBlur("phone")}
                          disabled={isSubmitting}
                        />
                      </Field>
                      <Field label="Subject" error={touched.has("subject") ? errors.subject : undefined}>
                        <input
                          required
                          className={inputCls(touched.has("subject") && !!errors.subject)}
                          placeholder="What is this regarding?"
                          value={formData.subject}
                          onChange={e => handleChange("subject", e.target.value)}
                          onBlur={() => handleBlur("subject")}
                          disabled={isSubmitting}
                        />
                      </Field>
                    </div>

                    <Field label="Message" error={touched.has("message") ? errors.message : undefined}>
                      <textarea
                        rows={5}
                        required
                        className={inputCls(touched.has("message") && !!errors.message)}
                        placeholder="Tell us about your project or inquiry..."
                        value={formData.message}
                        onChange={e => handleChange("message", e.target.value)}
                        onBlur={() => handleBlur("message")}
                        disabled={isSubmitting}
                        style={{ resize: "vertical", minHeight: "140px" }}
                      />
                    </Field>

                    <motion.button
                      className="mt-2 btn-primary"
                      whileHover={formIsValid && !isSubmitting ? { scale: 1.04 } : {}}
                      whileTap={formIsValid && !isSubmitting ? { scale: 0.97 } : {}}
                      type="submit"
                      disabled={!formIsValid || isSubmitting}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        opacity: (!formIsValid || isSubmitting) ? 0.55 : 1,
                        cursor: (!formIsValid || isSubmitting) ? "not-allowed" : "pointer",
                        transition: "opacity 0.3s ease",
                        alignSelf: "flex-start",
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner /> Sending…
                        </>
                      ) : (
                        "Send message →"
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              </Reveal>
            </div>

            {/* Right Side: Contact Information Cards (40% width = col-span-5) */}
            <motion.div
              className="lg:col-span-5 flex flex-col gap-6 w-full"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {locations.map((l) => (
                <motion.div key={l.tag} variants={fadeUpItem} className="w-full">
                  <TiltCard
                    className="contact-card rounded-[1.5rem] p-7 sm:p-8 w-full"
                    style={cardStyle}
                  >
                    <GlassReflection />
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="card-icon w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "rgba(244,140,167,0.12)" }}
                      >
                        <l.icon className="text-[#E85D75]" size={16} />
                      </div>
                      <span className="eyebrow text-[#E85D75]" style={{ fontWeight: 700, letterSpacing: "0.15em" }}>
                        {l.tag}
                      </span>
                    </div>
                    <p className="text-grey leading-relaxed text-sm whitespace-pre-line">
                      {renderLinesWithClickablePhones(l.lines)}
                    </p>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ International Contacts Section ═══ */}
      <section className="py-20 md:py-24">
        <div className="container-luxury max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-10">
              <motion.span
                className="inline-block eyebrow text-[#E85D75] tracking-[0.32em] mb-2"
                {...motionProps}
              >
                INTERNATIONAL REACH
              </motion.span>
              <h2 className="text-3xl sm:text-4xl font-bold text-charcoal tracking-tight">
                Global Contact Offices
              </h2>
              <motion.div
                className="h-[2px] w-0 rounded-full mt-4"
                style={{ background: "linear-gradient(to right, #F48CA7, transparent)" }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </Reveal>

          {/* Clean 3-Column Responsive Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {internationalLocations.map((loc) => (
              <motion.div key={loc.tag} variants={fadeUpItem} className="flex w-full">
                <TiltCard
                  className="contact-card rounded-[1.5rem] p-7 sm:p-8 flex flex-col justify-between w-full h-full"
                  style={cardStyle}
                >
                  <GlassReflection />
                  <div>
                    {/* Header Icon + Tag */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="card-icon w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "rgba(244,140,167,0.12)" }}
                      >
                        <loc.icon className="text-[#E85D75]" size={16} />
                      </div>
                      <span className="eyebrow text-[#E85D75]" style={{ fontWeight: 700, letterSpacing: "0.15em" }}>
                        {loc.tag}
                      </span>
                    </div>

                    {/* Location */}
                    <p className="text-grey leading-relaxed text-sm whitespace-pre-line mb-6 font-normal min-h-[42px]">
                      {loc.location}
                    </p>
                  </div>

                  {/* Contacts Area */}
                  <div className="space-y-4 pt-4 border-t border-white/60 mt-auto">
                    {loc.contacts.map((c) => (
                      <div key={c.name} className="flex flex-col gap-1">
                        <p className="text-sm text-charcoal font-semibold">{c.name}</p>
                        {c.phones.map((p) => (
                          <a
                            key={p.number}
                            href={`tel:${p.number.replace(/[\s()-]/g, "")}`}
                            className="text-grey text-sm leading-relaxed block transition-colors duration-200"
                            style={{ textDecoration: "none" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "#E85D75")}
                            onMouseLeave={e => (e.currentTarget.style.color = "")}
                          >
                            {p.label ? `${p.label}: ${p.number}` : p.number}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ Google Maps Section ═══ */}
      <section className="pb-20 md:pb-24">
        <div className="container-luxury max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <motion.div
              className="relative rounded-[2rem] overflow-hidden w-full"
              style={{
                border: "1px solid rgba(244,140,167,0.2)",
                boxShadow: "0 8px 40px rgba(244,140,167,0.10)",
                aspectRatio: "16 / 7",
                minHeight: "340px",
              }}
              whileHover={{ boxShadow: "0 16px 60px rgba(244,140,167,0.18)" }}
              transition={{ duration: 0.4 }}
            >
              <iframe
                title="SKFF (INDIA) PVT. LTD. — Boisar, Maharashtra"
                src="https://www.google.com/maps?q=SKFF+India+Pvt+Ltd+MIDC+Boisar+Industrial+Area+Boisar+Palghar+Maharashtra+401506+India&output=embed"
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
                allowFullScreen
              />
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ═══ Toast ═══ */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ——— Input class helper ——— */
function inputCls(hasError?: boolean): string {
  const base =
    "w-full rounded-xl border px-4 py-3 text-sm text-charcoal placeholder:text-grey/70 outline-none transition-all duration-300" +
    " bg-white/70 backdrop-blur";
  if (hasError) {
    return base + " border-red-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]";
  }
  return base + " border-white/60 focus:border-[#F48CA7] focus:shadow-[0_0_0_3px_rgba(244,140,167,0.12)]";
}

/* ——— Field wrapper with error display ——— */
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm" style={{ position: "relative" }}>
      <span className="text-xs uppercase tracking-[0.2em] text-charcoal">{label}</span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-xs"
            style={{ color: "#ef4444", marginTop: "-2px" }}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}
