"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Check,
  ArrowRight,
  Play,
  Download,
  Star,
  Shield,
  Zap,
} from "lucide-react";

// ── animation variant ─────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 px-4 pt-4">
      <div className="max-w-5xl mx-auto backdrop-blur-md bg-[#080808]/80 border border-white/[0.06] rounded-full px-6 py-3 flex items-center justify-between">
        <span className="text-xs font-black tracking-[0.2em] text-white uppercase">
          Irreverent Marketing
        </span>
        <a
          href="#products"
          className="text-xs font-bold text-white bg-gradient-to-r from-[#FF4500] to-[#FF007A] rounded-full px-5 py-2 hover:opacity-90 transition-opacity"
        >
          Shop Now
        </a>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-24 overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#FF4500]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] left-[35%] w-[500px] h-[500px] bg-[#FF007A]/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Eyebrow pill */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-white/50 uppercase mb-8"
        >
          <Zap className="w-3 h-3 text-[#FF4500]" />
          For marketers done with boring
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[86px] font-black leading-[0.92] tracking-tight text-white mb-7"
        >
          Stop making ads
          <br />
          <span className="bg-gradient-to-r from-[#FF4500] via-[#FF2060] to-[#FF007A] bg-clip-text text-transparent">
            that get ignored.
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-lg md:text-xl text-white/45 max-w-lg mx-auto leading-relaxed mb-10"
        >
          Two no-BS resources for performance marketers who want results,
          not participation trophies.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#products"
            className="group flex items-center gap-2.5 bg-gradient-to-r from-[#FF4500] to-[#FF007A] text-white font-bold rounded-full px-8 py-4 text-sm tracking-wide hover:opacity-90 transition-all shadow-[0_0_50px_rgba(255,69,0,0.25)]"
          >
            Shop Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#products"
            className="text-sm text-white/45 font-medium hover:text-white/70 transition-colors"
          >
            See what&apos;s inside ↓
          </a>
        </motion.div>

        {/* Trust row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 mt-14 text-xs text-white/35 font-medium"
        >
          <span className="flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-[#FF4500]" />
            Instant Access
          </span>
          <span className="w-px h-3 bg-white/10" />
          <span className="flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-[#FF4500]" />
            30-Day Guarantee
          </span>
          <span className="w-px h-3 bg-white/10" />
          <span className="flex items-center gap-1.5">
            <Star className="w-3 h-3 text-[#FF4500]" />
            4.9 / 5 Rating
          </span>
        </motion.div>
      </div>
    </section>
  );
}

// ── Product Card ──────────────────────────────────────────────────────────────
interface ProductCardProps {
  badge: string;
  title: string;
  tagline: string;
  price: string;
  originalPrice?: string;
  description: string;
  features: string[];
  cta: string;
  // Replace these with your real Stan store product URLs
  href: string;
  featured?: boolean;
  icon: React.ReactNode;
  coverGradient: string;
  accentColor: string;
  delay?: number;
}

function ProductCard({
  badge,
  title,
  tagline,
  price,
  originalPrice,
  description,
  features,
  cta,
  href,
  featured = false,
  icon,
  coverGradient,
  accentColor,
  delay = 0,
}: ProductCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      className={`relative flex flex-col rounded-2xl overflow-hidden bg-[#0d0d0d] ${
        featured
          ? "border border-[#FF4500]/30 shadow-[0_0_70px_rgba(255,69,0,0.1)]"
          : "border border-white/[0.06]"
      }`}
    >
      {/* Most popular badge */}
      {featured && (
        <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-[#FF4500] to-[#FF007A] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.12em]">
          Most Popular
        </div>
      )}

      {/* Cover */}
      <div
        className={`relative h-52 flex items-center justify-center overflow-hidden ${coverGradient}`}
      >
        {/* Cover grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Icon container */}
        <div className="relative z-10 w-16 h-16 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
          {icon}
        </div>
        {/* Bottom glow */}
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-56 h-24 rounded-full blur-3xl"
          style={{ backgroundColor: `${accentColor}30` }}
        />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-7">
        <span
          className="text-[10px] font-black tracking-[0.2em] uppercase mb-3"
          style={{ color: accentColor }}
        >
          {badge}
        </span>

        <h3 className="text-[22px] font-black text-white leading-tight mb-1.5">
          {title}
        </h3>
        <p className="text-sm text-white/40 mb-5">{tagline}</p>

        {/* Price */}
        <div className="flex items-baseline gap-3 mb-5">
          <span className="text-4xl font-black text-white">{price}</span>
          {originalPrice && (
            <span className="text-sm text-white/25 line-through">
              {originalPrice}
            </span>
          )}
        </div>

        <p className="text-sm text-white/45 leading-relaxed mb-6">
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-2.5 mb-8 flex-1">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-white/65">
              <Check
                className="w-4 h-4 mt-0.5 shrink-0"
                style={{ color: accentColor }}
              />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full text-center font-bold py-4 rounded-full text-sm tracking-wide transition-all ${
            featured
              ? "bg-gradient-to-r from-[#FF4500] to-[#FF007A] text-white hover:opacity-90 shadow-[0_0_35px_rgba(255,69,0,0.2)]"
              : "bg-white/[0.06] text-white border border-white/[0.07] hover:bg-white/[0.1]"
          }`}
        >
          {cta} →
        </a>
      </div>
    </motion.div>
  );
}

// ── Products Section ──────────────────────────────────────────────────────────
function ProductsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="products" className="px-6 py-24 md:py-32">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className="text-center mb-16">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0}
            className="text-[10px] font-black tracking-[0.2em] text-[#FF4500] uppercase mb-4"
          >
            What we sell
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={1}
            className="text-4xl md:text-5xl font-black text-white leading-tight"
          >
            Pick your weapon.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* ── COURSE ────────────────────────────────────────────────────── */}
          <ProductCard
            badge="Course · 8 Modules"
            title="The Irreverent Ads Course"
            tagline="From blank brief to scroll-stopping creative"
            price="$297"
            originalPrice="$497"
            description="The complete creative playbook for performance marketers. Learn the exact frameworks behind scroll-stopping ads that drive real revenue — no fluff, no theory."
            features={[
              "8 in-depth video modules (4+ hours of content)",
              "Done-for-you creative brief templates",
              "50+ real ad deconstructions",
              "Hook formulas that stop the scroll",
              "Lifetime access + all future updates",
              "Private community access",
            ]}
            cta="Enroll Now"
            // TODO: Replace with your Stan store course URL
            href="https://stan.store/"
            featured={true}
            icon={<Play className="w-8 h-8 text-white" />}
            coverGradient="bg-gradient-to-br from-[#1c0900] to-[#2a0018]"
            accentColor="#FF4500"
            delay={0}
          />

          {/* ── DIGITAL PRODUCT ───────────────────────────────────────────── */}
          <ProductCard
            badge="Digital Download"
            title="The Creative Weapons Kit"
            tagline="Swipe files, hooks & frameworks top brands use"
            price="$47"
            description="A battle-tested collection of the exact templates and frameworks DTC's top performers use to build their highest-converting ads. Download today. Deploy tomorrow."
            features={[
              "100+ scroll-stopping hook templates",
              "20 creative brief frameworks",
              "500+ ad swipe file (competitor research)",
              "Ad angle ideation guide",
              "Instant download — use it immediately",
            ]}
            cta="Get Instant Access"
            // TODO: Replace with your Stan store digital product URL
            href="https://stan.store/"
            featured={false}
            icon={<Download className="w-8 h-8 text-white" />}
            coverGradient="bg-gradient-to-br from-[#08081c] to-[#18002c]"
            accentColor="#FF007A"
            delay={1}
          />
        </div>
      </div>
    </section>
  );
}

// ── Stats ─────────────────────────────────────────────────────────────────────
function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const stats = [
    { value: "2,400+", label: "Students enrolled" },
    { value: "4.9 / 5", label: "Average rating" },
    { value: "$1M+", label: "Student revenue generated" },
  ];

  return (
    <section ref={ref} className="px-6 py-20 border-y border-white/[0.04]">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
            >
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#FF4500] to-[#FF007A] bg-clip-text text-transparent mb-2">
                {s.value}
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.15em] text-white/35">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote:
      "I made back my investment on the course within the first week of applying the hook frameworks. This is the stuff agencies charge $10k to teach.",
    name: "Jordan M.",
    role: "DTC Brand Owner",
  },
  {
    quote:
      "The Creative Weapons Kit alone is worth 10x the price. I used to spend hours on briefs — now I'm done in 20 minutes and the output is better.",
    name: "Sarah K.",
    role: "Performance Marketer",
  },
  {
    quote:
      "Refreshingly no-BS. No hype, no fluff. Just real frameworks that work. My CTR went from 0.8% to 2.4% in three weeks.",
    name: "Marcus T.",
    role: "Media Buyer",
  },
];

function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-6 py-24 md:py-32">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0}
            className="text-[10px] font-black tracking-[0.2em] text-[#FF4500] uppercase mb-4"
          >
            Don&apos;t take our word for it
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={1}
            className="text-4xl md:text-5xl font-black text-white"
          >
            Real results.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
              className="flex flex-col bg-[#0d0d0d] border border-white/[0.06] rounded-2xl p-6"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-3.5 h-3.5 fill-[#FF4500] text-[#FF4500]"
                  />
                ))}
              </div>
              <p className="text-sm text-white/60 leading-relaxed mb-6 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-sm font-bold text-white">{t.name}</p>
                <p className="text-xs text-white/35">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Guarantee ─────────────────────────────────────────────────────────────────
function GuaranteeSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="px-6 py-24 border-t border-white/[0.04]"
    >
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FF4500]/10 border border-[#FF4500]/20 mb-8"
        >
          <Shield className="w-7 h-7 text-[#FF4500]" />
        </motion.div>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={1}
          className="text-3xl md:text-4xl font-black text-white mb-5"
        >
          30-Day Money-Back Guarantee
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={2}
          className="text-base text-white/45 leading-relaxed"
        >
          If you go through the material and don&apos;t think it was worth every
          penny, email us within 30 days for a full refund. No questions, no
          hoops. We stand behind everything we make.
        </motion.p>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="px-6 py-10 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 text-xs text-white/30">
        <span className="font-black tracking-[0.2em] uppercase text-white/50">
          Irreverent Marketing
        </span>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white/70 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white/70 transition-colors">
            Terms
          </a>
          <a
            href="mailto:hello@irreverentmarketing.com"
            className="hover:text-white/70 transition-colors"
          >
            Contact
          </a>
        </div>
        <span>© {new Date().getFullYear()} Irreverent Marketing. All rights reserved.</span>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <Nav />
      <HeroSection />
      <ProductsSection />
      <StatsSection />
      <TestimonialsSection />
      <GuaranteeSection />
      <Footer />
    </div>
  );
}
