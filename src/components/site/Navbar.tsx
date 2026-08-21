import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import logo from "@/assets/logoskf.png";

export interface SubMenuItem {
  label: string;
  to: string;
  hash?: string;
}

export interface NavItem {
  label: string;
  to: string;
  children?: SubMenuItem[];
}

export const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Home" },
  {
    to: "/about",
    label: "About Us",
    children: [
      { label: "Our Journey", to: "/about", hash: "evolution" },
      { label: "Our Commitments", to: "/about", hash: "commitments" },
      { label: "Infrastructure", to: "/about", hash: "infrastructure" },
      { label: "Certifications", to: "/about", hash: "certifications" },
    ],
  },
  {
    to: "/flavours",
    label: "Flavours",
    children: [
      { label: "Confectionery", to: "/flavours", hash: "confectionery" },
      { label: "Dairy", to: "/flavours", hash: "dairy" },
      { label: "Bakery", to: "/flavours", hash: "bakery" },
      { label: "Culinary & Savory", to: "/flavours", hash: "culinary-savory" },
      { label: "Beverages", to: "/flavours", hash: "beverages" },
      { label: "Pharmaceuticals", to: "/flavours", hash: "pharmaceuticals" },
      { label: "Instant & Health Drinks", to: "/flavours", hash: "instant-health-drinks" },
    ],
  },
  {
    to: "/fragrances",
    label: "Fragrances",
    children: [
      { label: "Home Care", to: "/fragrances", hash: "home-care" },
      { label: "Personal Care", to: "/fragrances", hash: "personal-care" },
      { label: "Fabric Care", to: "/fragrances", hash: "fabric-care" },
      { label: "Fine Fragrances", to: "/fragrances", hash: "fine-fragrances" },
    ],
  },
  { to: "/global-presence", label: "Global Presence" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const { location } = useRouterState();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    setOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Handle hash navigation on route change or initial load
  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.hash]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const toggleMobileSubmenu = (label: string) => {
    setMobileExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleSubItemClick = (hash?: string) => {
    setActiveDropdown(null);
    setOpen(false);
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-white/85 backdrop-blur-[18px] border-b border-border/60 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-luxury flex items-center justify-between py-4 md:py-5" ref={navContainerRef}>
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="SKFF Logo"
            className="w-[120px] md:w-[140px] lg:w-[160px] h-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navbar */}
        <nav className="hidden lg:flex items-center gap-7 lg:gap-8">
          {NAV_ITEMS.map((item) => {
            const active =
              item.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.to);
            const hasChildren = Boolean(item.children && item.children.length > 0);
            const isOpen = activeDropdown === item.label;

            return (
              <div
                key={item.label}
                className="relative py-2"
                onMouseEnter={() => hasChildren && handleMouseEnter(item.label)}
                onMouseLeave={() => hasChildren && handleMouseLeave()}
              >
                <div className="flex items-center gap-1">
                  <Link
                    to={item.to}
                    onClick={() => {
                      if (hasChildren) {
                        setActiveDropdown((prev) => (prev === item.label ? null : item.label));
                      }
                    }}
                    className="group relative text-[13px] tracking-[0.14em] uppercase text-charcoal/85 hover:text-charcoal transition-colors py-1 flex items-center gap-1.5"
                  >
                    <span>{item.label}</span>
                    {hasChildren && (
                      <HiChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-[#E85D75]" : "text-charcoal/50 group-hover:text-charcoal"
                        }`}
                      />
                    )}
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] bg-[#F48CA7] transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 h-[2px] w-full bg-[#F48CA7]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </div>

                {/* Dropdown Menu Panel */}
                <AnimatePresence>
                  {hasChildren && isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 min-w-[250px] pointer-events-auto"
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="bg-white/95 backdrop-blur-2xl rounded-2xl p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-black/5 ring-1 ring-black/5 flex flex-col gap-1">
                        {item.children!.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.to}
                            hash={sub.hash}
                            onClick={() => handleSubItemClick(sub.hash)}
                            className="px-4 py-2.5 text-[13px] tracking-[0.03em] font-medium text-charcoal/80 hover:text-[#E85D75] hover:bg-[#F48CA7]/10 rounded-xl transition-all duration-200 flex items-center justify-between group/sub"
                          >
                            <span>{sub.label}</span>
                            <span className="opacity-0 group-hover/sub:opacity-100 -translate-x-1 group-hover/sub:translate-x-0 transition-all duration-200 text-[#E85D75] text-xs font-bold">→</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 text-charcoal focus:outline-none"
          aria-label="Toggle menu"
        >
          {open ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 top-[72px] z-40 bg-white/95 backdrop-blur-2xl flex flex-col justify-start items-center lg:hidden overflow-y-auto px-6 py-8"
          >
            <nav className="flex flex-col items-center gap-6 w-full max-w-md my-auto">
              {NAV_ITEMS.map((item, idx) => {
                const active =
                  item.to === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.to);
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const isExpanded = Boolean(mobileExpanded[item.label]);

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * idx, duration: 0.3 }}
                    className="w-full flex flex-col items-center"
                  >
                    <div className="flex items-center justify-center gap-2 w-full">
                      {hasChildren ? (
                        <button
                          type="button"
                          onClick={() => toggleMobileSubmenu(item.label)}
                          className={`text-lg sm:text-xl tracking-[0.16em] uppercase font-light transition-colors flex items-center gap-2 focus:outline-none ${
                            active ? "text-[#E85D75] font-medium" : "text-charcoal hover:text-[#E85D75]"
                          }`}
                        >
                          <span>{item.label}</span>
                          <HiChevronDown
                            className={`w-5 h-5 transition-transform duration-300 ${
                              isExpanded ? "rotate-180 text-[#E85D75]" : "text-charcoal/60"
                            }`}
                          />
                        </button>
                      ) : (
                        <Link
                          to={item.to}
                          onClick={() => setOpen(false)}
                          className={`text-lg sm:text-xl tracking-[0.16em] uppercase font-light transition-colors ${
                            active ? "text-[#E85D75] font-medium" : "text-charcoal hover:text-[#E85D75]"
                          }`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>

                    {/* Mobile Accordion Submenu */}
                    <AnimatePresence>
                      {hasChildren && isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden flex flex-col items-center gap-3 pt-3 pb-2 w-full bg-[#F48CA7]/8 rounded-2xl my-2 border border-[#F48CA7]/15"
                        >
                          {item.children!.map((sub) => (
                            <Link
                              key={sub.label}
                              to={sub.to}
                              hash={sub.hash}
                              onClick={() => handleSubItemClick(sub.hash)}
                              className="text-xs sm:text-sm tracking-[0.1em] uppercase font-medium text-charcoal/80 hover:text-[#E85D75] transition-colors py-1.5 px-4 text-center w-full"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
