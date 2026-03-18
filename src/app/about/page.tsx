import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FinalCTASection from '../../components/FinalCTASection';
import ScrollReveal from '../../components/ScrollReveal';
import Image from 'next/image';
import Link from 'next/link';

const pillars = [
  { num: '01', title: 'Strategy First', desc: 'Every campaign starts with rigorous research into your market, audience, and competitors before a single asset is created.' },
  { num: '02', title: 'Creative Excellence', desc: 'Standout design and content that earns attention in crowded digital spaces — not just impressions, but impact.' },
  { num: '03', title: 'Measurable Results', desc: 'We track what matters: leads, revenue, and growth — not vanity metrics. Transparent reporting, always.' },
  { num: '04', title: 'Long-Term Partnerships', desc: 'We build relationships, not transactions. Your success compounds when we grow together over time.' },
];

const services = [
  { title: 'Web Development', href: '/services/web-development' },
  { title: 'Digital Marketing', href: '/services/digital-marketing' },
  { title: 'SEO', href: '/services/seo' },
  { title: 'Social Media', href: '/services/social-media' },
  { title: 'Graphic Design', href: '/services/graphic-design' },
  { title: 'Video Production', href: '/services/video-production' },
];

export default function AboutPage() {
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
            Who We Are
          </span>
          <h1
            className="js-reveal font-bold leading-[0.88] tracking-display text-white mb-8"
            style={{ fontSize: 'clamp(3.2rem, 8.5vw, 9rem)' }}
            data-delay="1"
          >
            PARTNERS IN<br />
            <span className="text-accent">YOUR SUCCESS.</span>
          </h1>
          <p className="js-reveal text-white/45 text-base leading-relaxed max-w-md mb-10" data-delay="2">
            We transform brands through strategic digital marketing that delivers measurable results and sustainable growth.
          </p>
          <div className="js-reveal" data-delay="3">
            <Link
              href="/consultation"
              className="btn-shimmer inline-flex items-center gap-3 px-8 py-4 bg-accent text-dark font-semibold text-sm tracking-wide hover:bg-white transition-colors duration-300 group"
            >
              Get Started
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
          src="/images/brand-identity.png"
          alt="About Frendly Marqeter"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/50 to-transparent" />
      </div>

      {/* ── Mission statement ── */}
      <section className="bg-white py-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="js-reveal">
              <span className="text-accent/60 text-xs font-semibold tracking-label uppercase block mb-4">Our Mission</span>
              <h2
                className="font-bold leading-[0.9] tracking-display text-primary"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
              >
                EMPOWER. GROW.<br />DELIVER.
              </h2>
            </div>
            <div className="js-reveal" data-delay="2">
              <p className="text-charcoal/70 text-lg leading-relaxed mb-6">
                To empower businesses with innovative digital marketing solutions that drive growth, enhance brand visibility, and create lasting connections with their audience.
              </p>
              <p className="text-charcoal/70 text-lg leading-relaxed">
                We believe in delivering measurable results through data-driven strategies, creative excellence, and unwavering commitment to our clients&apos; success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our pillars ── */}
      <section className="bg-light py-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="js-reveal mb-16">
            <span className="text-accent/60 text-xs font-semibold tracking-label uppercase block mb-4">What We Stand For</span>
            <h2
              className="font-bold leading-[0.9] tracking-display text-primary"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
            >
              HOW WE WORK.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 border-t border-primary/15">
            {pillars.map((item) => (
              <div key={item.num} className="js-reveal border-b border-primary/15 md:odd:border-r py-8 px-0 md:even:pl-10 md:odd:pr-10">
                <span className="text-accent/50 text-xs font-semibold tracking-label uppercase block mb-3">{item.num}</span>
                <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services overview ── */}
      <section className="bg-white py-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="js-reveal mb-16">
            <span className="text-accent/60 text-xs font-semibold tracking-label uppercase block mb-4">What We Do</span>
            <h2
              className="font-bold leading-[0.9] tracking-display text-primary"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
            >
              FULL-SERVICE<br />DIGITAL AGENCY.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-primary/15">
            {services.map((service, i) => (
              <Link
                key={service.title}
                href={service.href}
                className="js-reveal group border-b border-r border-primary/15 lg:[&:nth-child(3n)]:border-r-0 md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r py-8 px-6 first:pl-0 flex items-center justify-between"
                data-delay={String((i % 3) + 1)}
              >
                <span className="text-lg font-bold text-primary group-hover:text-accent transition-colors duration-300">{service.title}</span>
                <svg className="w-4 h-4 text-accent/40 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team teaser ── */}
      <section className="bg-primary py-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="js-reveal">
              <span className="text-accent/60 text-xs font-semibold tracking-label uppercase block mb-6">The People Behind The Work</span>
              <h2
                className="font-bold leading-[0.9] tracking-display text-white mb-6"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
              >
                MEET OUR<br /><span className="text-accent">TEAM.</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-10 max-w-sm">
                Behind every successful project is a team of passionate experts. Get to know the creative minds who bring your vision to life.
              </p>
              <Link
                href="/team"
                className="btn-shimmer inline-flex items-center gap-3 px-8 py-4 bg-accent text-dark font-semibold text-sm tracking-wide hover:bg-white transition-colors duration-300 group"
              >
                View Our Team
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="js-reveal" data-delay="2">
              <div className="grid grid-cols-3 gap-1">
                {[
                  { label: '10+', sub: 'Years Experience' },
                  { label: '250+', sub: 'Brands Served' },
                  { label: '98%', sub: 'Client Retention' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 border border-white/10 p-6 text-center">
                    <span
                      className="block font-bold leading-none tracking-display text-accent"
                      style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)' }}
                    >
                      {stat.label}
                    </span>
                    <span className="text-white/40 text-xs tracking-label uppercase mt-2 block">{stat.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTASection />
      <Footer />
    </div>
  );
}
