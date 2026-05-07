'use client';
import React, { useState } from 'react';

interface Testimonial {
  id: string;
  title: string;
  content: string;
  testimonialFields?: {
    clientName?: string;
    clientPosition?: string;
    clientCompany?: string;
    rating?: number;
  };
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '');
}

export default function TestimonialSection({ testimonials = [] }: TestimonialSectionProps) {
  const [active, setActive] = useState(0);
  if (testimonials.length === 0) return null;

  const current = testimonials[active];
  const name    = current.testimonialFields?.clientName    || current.title;
  const role    = current.testimonialFields?.clientPosition || 'Customer';
  const company = current.testimonialFields?.clientCompany;

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  return (
    <section className="bg-white py-24 lg:py-32 border-t border-charcoal/[0.06]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Two-column — heading left, quote right (Ramotion pattern) */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left */}
          <div>
            <span className="js-reveal block text-primary/45 text-xs font-semibold tracking-label uppercase mb-6">
              Client Voices
            </span>

            <h2
              className="js-reveal font-bold leading-[0.9] tracking-display text-dark mb-8"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5.5rem)' }}
              data-delay="1"
            >
              WHAT OUR<br />
              CLIENTS<br />
              <span className="text-primary">SAY.</span>
            </h2>
          </div>

          {/* Right — single quote with nav */}
          <div className="flex flex-col justify-between gap-10">

            {/* Client identifier */}
            <div className="js-reveal flex items-center justify-between" data-delay="2">
              <div>
                <p className="font-semibold text-dark text-sm">{name}</p>
                <p className="text-charcoal/45 text-xs mt-0.5">
                  {role}{company ? ` · ${company}` : ''}
                </p>
              </div>
              {/* Pagination */}
              <span className="text-xs text-charcoal/35 font-medium tabular-nums">
                {String(active + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
              </span>
            </div>

            {/* Quote */}
            <blockquote
              className="js-reveal text-dark/80 text-lg md:text-xl leading-relaxed font-light border-l-2 border-accent pl-6"
              data-delay="3"
            >
              &ldquo;{stripHtml(current.content)}&rdquo;
            </blockquote>

            {/* Navigation arrows */}
            <div className="js-reveal flex items-center gap-3" data-delay="4">
              <button
                onClick={prev}
                className="w-10 h-10 border border-charcoal/15 flex items-center justify-center text-charcoal/50 hover:border-primary hover:text-primary transition-colors duration-200"
                aria-label="Previous testimonial"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
              </button>
              <button
                onClick={next}
                className="w-10 h-10 border border-charcoal/15 flex items-center justify-center text-charcoal/50 hover:border-primary hover:text-primary transition-colors duration-200"
                aria-label="Next testimonial"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              {/* Dot indicators */}
              <div className="flex gap-1.5 ml-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${i === active ? 'bg-primary w-6' : 'bg-charcoal/20 w-1.5'}`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
