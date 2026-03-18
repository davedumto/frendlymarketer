import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import FinalCTASection from '../../../components/FinalCTASection';
import ScrollReveal from '../../../components/ScrollReveal';
import Image from 'next/image';
import Link from 'next/link';

const deliverables = [
  { num: '01', title: 'Technical SEO Audits', desc: 'Find and fix the site issues holding back your rankings.' },
  { num: '02', title: 'Keyword Research', desc: 'Identify high-intent terms your ideal customers are searching for.' },
  { num: '03', title: 'On-Page Optimisation', desc: 'Title tags, content structure, and internal linking done right.' },
  { num: '04', title: 'Link Building', desc: 'Earn authoritative backlinks that signal trust to search engines.' },
  { num: '05', title: 'Local SEO', desc: 'Dominate local search results and Google Maps for your area.' },
  { num: '06', title: 'Content Optimisation', desc: 'Make existing content work harder with targeted improvements.' },
];

const process = [
  { num: '01', title: 'Audit', desc: 'Comprehensive analysis of your current SEO performance and gaps.' },
  { num: '02', title: 'Research', desc: 'In-depth keyword and competitor research to inform strategy.' },
  { num: '03', title: 'Optimise', desc: 'Implement technical, on-page, and off-page improvements.' },
  { num: '04', title: 'Monitor', desc: 'Track rankings and refine the strategy for continuous growth.' },
];

export default function SEOPage() {
  return (
    <div>
      <ScrollReveal />
      <Navbar />

      {/* ── Hero ── */}
      <section className="bg-dark pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(211,160,50,0.045) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 relative">
          <span className="js-reveal inline-block text-accent/60 text-xs font-semibold tracking-label uppercase mb-8">
            SEO Services
          </span>
          <h1
            className="js-reveal font-bold leading-[0.88] tracking-display text-white mb-8"
            style={{ fontSize: 'clamp(3.2rem, 8.5vw, 9rem)' }}
            data-delay="1"
          >
            RANK HIGHER.<br />
            <span className="text-accent">GROW FASTER.</span>
          </h1>
          <p className="js-reveal text-white/45 text-base leading-relaxed max-w-md mb-10" data-delay="2">
            Proven SEO strategies that increase organic visibility, attract qualified leads, and deliver long-term results.
          </p>
          <div className="js-reveal" data-delay="3">
            <Link
              href="/consultation"
              className="btn-shimmer inline-flex items-center gap-3 px-8 py-4 bg-accent text-dark font-semibold text-sm tracking-wide hover:bg-white transition-colors duration-300 group"
            >
              Rank Higher
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Full-bleed image strip ── */}
      <div className="relative h-[55vh] min-h-[320px] max-h-[520px] bg-charcoal overflow-hidden">
        <Image
          src="/images/SEO Stock Photo Goumbik.jpg"
          alt="SEO Services"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/40 to-transparent" />
      </div>

      {/* ── What we deliver ── */}
      <section className="bg-light py-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="js-reveal mb-16">
            <span className="text-accent/60 text-xs font-semibold tracking-label uppercase block mb-4">SEO Solutions</span>
            <h2
              className="font-bold leading-[0.9] tracking-display text-primary"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
            >
              VISIBILITY THAT<br />COMPOUNDS.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 border-t border-primary/15">
            {deliverables.map((item) => (
              <div key={item.num} className="js-reveal border-b border-primary/15 md:odd:border-r py-8 px-0 md:even:pl-10 md:odd:pr-10">
                <span className="text-accent/50 text-xs font-semibold tracking-label uppercase block mb-3">{item.num}</span>
                <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="bg-white py-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="js-reveal mb-16">
            <span className="text-accent/60 text-xs font-semibold tracking-label uppercase block mb-4">SEO Methodology</span>
            <h2
              className="font-bold leading-[0.9] tracking-display text-primary"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
            >
              THE SYSTEM.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 border-t border-primary/15">
            {process.map((step) => (
              <div key={step.num} className="js-reveal border-b md:border-b-0 md:border-r border-primary/15 last:border-r-0 py-10 px-0 md:px-8 first:pl-0">
                <span
                  className="block font-bold leading-none tracking-display text-primary/10 mb-6"
                  style={{ fontSize: 'clamp(3rem, 5vw, 5rem)' }}
                >
                  {step.num}
                </span>
                <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
                <p className="text-charcoal/55 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTASection />
      <Footer />
    </div>
  );
}
