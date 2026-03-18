import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import FinalCTASection from '../../../components/FinalCTASection';
import ScrollReveal from '../../../components/ScrollReveal';
import Image from 'next/image';
import Link from 'next/link';

const deliverables = [
  { num: '01', title: 'E-commerce Platforms', desc: 'Fully featured online stores built to convert visitors into customers.' },
  { num: '02', title: 'Business Websites', desc: 'Professional sites that establish credibility and drive leads.' },
  { num: '03', title: 'Portfolio Sites', desc: 'Showcase your work with elegance and purpose.' },
  { num: '04', title: 'Content Management Systems', desc: 'Edit your content with ease — no developer required.' },
  { num: '05', title: 'Landing Pages', desc: 'High-converting single pages built around one clear goal.' },
  { num: '06', title: 'Web Applications', desc: 'Custom tools and dashboards tailored to your workflows.' },
];

const process = [
  { num: '01', title: 'Discovery', desc: 'We analyse your business needs and define exact project requirements.' },
  { num: '02', title: 'Design', desc: 'Wireframes and visual designs that reflect your brand identity.' },
  { num: '03', title: 'Develop', desc: 'Built with modern frameworks, optimised for speed and accessibility.' },
  { num: '04', title: 'Launch', desc: 'Deploy, test, and fine-tune for performance and search ranking.' },
];

export default function WebDevelopmentPage() {
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
            Web Development
          </span>
          <h1
            className="js-reveal font-bold leading-[0.88] tracking-display text-white mb-8"
            style={{ fontSize: 'clamp(3.2rem, 8.5vw, 9rem)' }}
            data-delay="1"
          >
            MODERN WEBSITES<br />
            <span className="text-accent">THAT PERFORM.</span>
          </h1>
          <p className="js-reveal text-white/45 text-base leading-relaxed max-w-md mb-10" data-delay="2">
            Responsive, fast, and user-friendly websites that transform your digital presence and convert visitors into customers.
          </p>
          <div className="js-reveal" data-delay="3">
            <Link
              href="/consultation"
              className="btn-shimmer inline-flex items-center gap-3 px-8 py-4 bg-accent text-dark font-semibold text-sm tracking-wide hover:bg-white transition-colors duration-300 group"
            >
              Start Your Project
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
          src="/images/Web Development Photo by Luis Gomes.jpg"
          alt="Web Development"
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
            <span className="text-accent/60 text-xs font-semibold tracking-label uppercase block mb-4">What We Deliver</span>
            <h2
              className="font-bold leading-[0.9] tracking-display text-primary"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
            >
              BUILT FOR YOUR<br />BUSINESS GOALS.
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
            <span className="text-accent/60 text-xs font-semibold tracking-label uppercase block mb-4">How We Work</span>
            <h2
              className="font-bold leading-[0.9] tracking-display text-primary"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
            >
              OUR PROCESS.
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
