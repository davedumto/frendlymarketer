import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-dark">

      {/* ── Background video ── */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Gradient: heavy bottom-left for text legibility, transparent top-right */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark/90 via-dark/70 to-dark/40" />
        {/* Subtle grain for texture */}
        <div className="noise-overlay" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10 w-full pb-20 md:pb-28 pt-36 md:pt-44">

        {/* Two-column: headline left, desc+cta right (bottom-aligned) */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-20">

          {/* Headline */}
          <div className="flex-1">
            <span className="hero-label inline-block mb-7 text-accent/80 text-xs font-semibold tracking-label uppercase">
              Digital Marketing Partners
            </span>

            <h1
              className="font-bold leading-[0.88] tracking-display text-white"
              style={{ fontSize: 'clamp(3.6rem, 10.5vw, 11rem)' }}
            >
              <span className="hero-line-wrap">
                <span className="hero-line-1 block">WE BUILD</span>
              </span>
              <span className="hero-line-wrap">
                <span className="hero-line-2 block">DIGITAL</span>
              </span>
              <span className="hero-line-wrap">
                <span className="hero-line-3 block text-accent">FUTURES.</span>
              </span>
            </h1>
          </div>

          {/* Description + CTAs */}
          <div className="lg:max-w-xs lg:pb-1">
            <p className="hero-sub text-white/55 text-base leading-relaxed mb-8">
              Transform your brand with strategic digital marketing that delivers
              measurable results and sustainable growth.
            </p>

            <div className="hero-cta flex flex-col gap-3.5">
              <Link
                href="/consultation"
                className="btn-shimmer inline-flex items-center gap-3 px-7 py-3.5 bg-accent text-dark font-semibold text-sm tracking-wide hover:bg-white transition-colors duration-300 group w-fit"
              >
                Get Started
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-white/40 hover:text-white/80 transition-colors duration-200 w-fit"
              >
                Learn about us →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom meta bar */}
        <div className="hero-scroll mt-16 md:mt-20 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 md:gap-10 text-[11px] text-white/25 tracking-label uppercase font-medium">
              <span>Est. 2014</span>
              <span className="hidden md:inline text-white/15">—</span>
              <span className="hidden md:inline">Nairobi, Kenya</span>
              <span className="hidden md:inline text-white/15">—</span>
              <span className="hidden md:inline">Digital Agency</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-white/25 tracking-label uppercase font-medium">
              <span>Scroll</span>
              <span className="scroll-indicator inline-block">↓</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
