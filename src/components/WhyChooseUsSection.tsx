import React from 'react';
import Link from 'next/link';

const points = [
  {
    title: 'Dedicated digital experts',
    body:  'A cross-disciplinary team of strategists, designers, and engineers fully committed to your growth.',
  },
  {
    title: 'Data-driven by default',
    body:  "Every decision is grounded in analytics — no guesswork, only strategies that move the needle.",
  },
  {
    title: 'Transparent at every step',
    body:  "You always know what we're doing and why. Clear reporting, honest timelines, no surprises.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="bg-light py-24 lg:py-32">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Two-column grid: heading left, content right */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — editorial heading */}
          <div className="lg:sticky lg:top-32">
            <span className="js-reveal-left block text-primary/45 text-xs font-semibold tracking-label uppercase mb-6">
              Why Choose Us
            </span>

            <h2
              className="js-reveal-left font-bold leading-[0.9] tracking-display text-dark mb-8"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5.5rem)' }}
              data-delay="1"
            >
              MORE THAN<br />
              JUST AN<br />
              <span className="text-primary">AGENCY.</span>
            </h2>

            <div className="js-reveal-left mb-8" data-delay="2">
              <div className="line-reveal h-px w-16 bg-primary/30" />
            </div>

            <p className="js-reveal-left text-charcoal/50 text-sm leading-relaxed max-w-xs" data-delay="3">
              We're your partners in success. With a track record of delivering exceptional results,
              we've helped countless businesses thrive in the digital landscape.
            </p>
          </div>

          {/* Right — feature points */}
          <div className="space-y-0">
            {points.map((pt, i) => (
              <div
                key={i}
                className="js-reveal-right py-8 border-t border-charcoal/[0.08] first:border-t-0"
                data-delay={String(i + 1)}
              >
                <div className="flex gap-6">
                  <span className="flex-shrink-0 text-xs font-bold text-primary/40 tracking-widest pt-0.5 w-6">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="font-semibold text-dark text-base mb-2">{pt.title}</h4>
                    <p className="text-charcoal/50 text-sm leading-relaxed">{pt.body}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="js-reveal-right pt-10 border-t border-charcoal/[0.08]" data-delay="4">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-primary font-semibold text-sm tracking-wide group hover:text-dark transition-colors duration-200"
              >
                Learn about us
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
