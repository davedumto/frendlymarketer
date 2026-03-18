import React from 'react';
import Link from 'next/link';

export default function FinalCTASection() {
  return (
    <section className="bg-dark py-28 lg:py-40 overflow-hidden relative">

      {/* Subtle dot texture on dark */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(211,160,50,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 relative">

        {/* Two column: text left, action right */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Heading */}
          <div>
            <span className="js-reveal block text-accent/40 text-xs font-semibold tracking-label uppercase mb-8">
              Start Today
            </span>
            <h2
              className="js-reveal font-bold leading-[0.88] tracking-display text-white"
              style={{ fontSize: 'clamp(3rem, 7vw, 7.5rem)' }}
              data-delay="1"
            >
              LET&apos;S BUILD<br />
              YOUR DIGITAL<br />
              <span className="text-accent">FUTURE.</span>
            </h2>
          </div>

          {/* Action block */}
          <div className="lg:pb-2">
            <p className="js-reveal text-white/45 text-base leading-relaxed max-w-sm mb-10" data-delay="2">
              Ready to transform your digital presence? Let&apos;s create something
              extraordinary together. No fluff, just results.
            </p>

            <div className="js-reveal flex flex-col gap-4" data-delay="3">
              <Link
                href="/consultation"
                className="btn-shimmer inline-flex items-center gap-3 px-8 py-4 bg-accent text-dark font-semibold text-sm tracking-wide hover:bg-white transition-colors duration-300 group w-fit"
              >
                Book Free Consultation
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <a
                href="mailto:info@frendlymarqeter.com"
                className="text-white/35 text-sm font-medium hover:text-white/70 transition-colors duration-200 w-fit"
              >
                Or write to us at info@frendlymarqeter.com
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
