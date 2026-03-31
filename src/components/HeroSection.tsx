import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col bg-dark overflow-hidden">

      {/* Subtle dot-grid texture on the left side only */}
      <div
        className="absolute inset-y-0 left-0 w-full lg:w-[58%] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(211,160,50,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Main grid: text left / video right ── */}
      <div className="flex-1 grid lg:grid-cols-[1fr_50%] xl:grid-cols-[1fr_52%] min-h-screen">

        {/* ──────────── LEFT: Content ──────────── */}
        <div className="relative flex flex-col justify-center px-6 lg:px-10 xl:px-16 pb-10 lg:pb-16 md:pb-24 pt-8 lg:pt-36 lg:md:pt-44 z-10">

          {/* Thin vertical accent rule — desktop separator */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

          {/* Agency badge */}
          <div className="hero-label flex items-center gap-3 mb-8">
            <div className="w-6 h-px bg-accent/60" />
            <span className="text-accent/70 text-[11px] font-semibold tracking-label uppercase">
              Digital Marketing Agency
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-bold leading-[0.88] tracking-display text-white mb-10"
            style={{ fontSize: 'clamp(3.2rem, 9vw, 10rem)' }}
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

          {/* Description + CTAs */}
          <div className="hero-sub max-w-xs mb-14">
            <p className="text-white/45 text-sm leading-relaxed mb-8">
              Transform your brand with strategic digital marketing that delivers
              measurable results and sustainable growth.
            </p>
            <div className="hero-cta flex flex-col sm:flex-row gap-3.5">
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
                className="self-center text-sm font-medium text-white/35 hover:text-white/75 transition-colors duration-200"
              >
                Learn about us →
              </Link>
            </div>
          </div>

          {/* Bottom meta bar */}
          <div className="hero-scroll pt-5 border-t border-white/[0.08]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 md:gap-8 text-[10px] text-white/20 tracking-label uppercase font-medium">
                <span>Est. 2014</span>
                <span className="hidden sm:inline text-white/10">—</span>
                <span className="hidden sm:inline">Nairobi, Kenya</span>
                <span className="hidden md:inline text-white/10">—</span>
                <span className="hidden md:inline">Digital Agency</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-white/20 tracking-label uppercase font-medium">
                <span>Scroll</span>
                <span className="scroll-indicator inline-block">↓</span>
              </div>
            </div>
          </div>
        </div>

        {/* ──────────── RIGHT: Video panel ──────────── */}
        <div className="hidden lg:flex relative items-start justify-center px-6 xl:px-10 pt-36 md:pt-44 pb-16">

          {/* Landscape video — contained at 16:9, no cropping */}
          <div className="relative w-full overflow-hidden mt-[2.8em]" style={{ aspectRatio: '16/9' }}>

            <video
              autoPlay loop muted playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/hero.webm" type="video/webm" />
            </video>

            {/* Subtle bottom fade */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-dark/60 to-transparent pointer-events-none" />

            {/* Corner bracket — top left */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/50 pointer-events-none" />
            {/* Corner bracket — top right */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent/50 pointer-events-none" />
            {/* Corner bracket — bottom left */}
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent/50 pointer-events-none" />
            {/* Corner bracket — bottom right */}
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent/50 pointer-events-none" />
          </div>

          {/* Live badge — floats outside the video, top area */}
          <div className="absolute top-16 left-8 flex items-center gap-2.5 pointer-events-none">
          </div>

          {/* Service tick marks — floats below video */}
          <div className="absolute bottom-16 left-8 flex items-center gap-3 pointer-events-none">
            <span className="text-[10px] font-semibold tracking-label uppercase text-white/20">
              6 Services
            </span>
            <div className="flex gap-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-4 h-px bg-white/15" />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Mobile video strip ── */}
      <div className="lg:hidden relative w-full overflow-hidden flex-shrink-0 order-first mt-16" style={{ aspectRatio: '16/9' }}>
        <video
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-transparent to-dark/80 pointer-events-none" />
      </div>

    </section>
  );
}
