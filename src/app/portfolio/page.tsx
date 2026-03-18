'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FinalCTASection from '../../components/FinalCTASection';
import ScrollReveal from '../../components/ScrollReveal';
import Image from 'next/image';
import Link from 'next/link';

export default function PortfolioPage() {
  const [allWebProjects, setAllWebProjects] = useState<any[]>([]);
  const [allGraphicProjects, setAllGraphicProjects] = useState<any[]>([]);

  const hardcodedWebProjects = [
    { id: 'hardcoded-1', name: 'Harris Hawk Security', url: 'https://harrishawksecurity.co.ke', description: 'Professional security services website with modern design and user-friendly navigation.', image: '/images/harria-hawk.png', order: 1 },
    { id: 'hardcoded-2', name: 'Rivaton Translators', url: 'https://www.rivatontranslators.com', description: 'Multi-language translation platform with streamlined booking system.', image: '/images/rivaton.png', order: 2 },
    { id: 'hardcoded-3', name: 'Kuza Initiative', url: 'https://www.kuzainitiative.or.ke', description: 'Youth empowerment organization showcasing programs and impact.', image: '/images/kuza.png', order: 3 },
  ];

  const hardcodedGraphicProjects = [
    { id: 'hardcoded-1', image: '/images/Frendly-Marqeter-portfolio-1.png', order: 1 },
    { id: 'hardcoded-2', image: '/images/Frendly-Marqeter-portfolio-2.png', order: 2 },
    { id: 'hardcoded-3', image: '/images/Frendly-Marqeter-portfolio-3.png', order: 3 },
    { id: 'hardcoded-5', image: '/images/Frendly-Marqeter-portfolio-5.png', order: 5 },
    { id: 'hardcoded-7', image: '/images/Frendly-Marqeter-portfolio-7.png', order: 7 },
    { id: 'hardcoded-8', image: '/images/Frendly-Marqeter-portfolio-8.png', order: 8 },
    { id: 'hardcoded-9', image: '/images/Frendly-Marqeter-portfolio-9.png', order: 9 },
    { id: 'hardcoded-10', image: '/images/Frendly-Marqeter-portfolio-10.png', order: 10 },
  ];

  useEffect(() => {
    async function fetchProjects() {
      try {
        const [webRes, graphicRes] = await Promise.all([
          fetch('/api/portfolio/web'),
          fetch('/api/portfolio/graphic'),
        ]);
        const adminWeb = webRes.ok ? (await webRes.json()).filter((p: any) => p.isActive) : [];
        const adminGraphic = graphicRes.ok ? (await graphicRes.json()).filter((p: any) => p.isActive) : [];
        setAllWebProjects([...adminWeb, ...hardcodedWebProjects].sort((a, b) => a.order - b.order));
        setAllGraphicProjects([...adminGraphic, ...hardcodedGraphicProjects].sort((a, b) => a.order - b.order));
      } catch {
        setAllWebProjects(hardcodedWebProjects);
        setAllGraphicProjects(hardcodedGraphicProjects);
      }
    }
    fetchProjects();
  }, []);

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
            Our Work
          </span>
          <h1
            className="js-reveal font-bold leading-[0.88] tracking-display text-white mb-8"
            style={{ fontSize: 'clamp(3.2rem, 8.5vw, 9rem)' }}
            data-delay="1"
          >
            PROJECTS THAT<br />
            <span className="text-accent">MAKE AN IMPACT.</span>
          </h1>
          <p className="js-reveal text-white/45 text-base leading-relaxed max-w-md mb-10" data-delay="2">
            Explore our web design and graphic design projects — work that helped brands grow and stand out.
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

      {/* ── Web design projects ── */}
      <section className="bg-light py-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="js-reveal mb-16">
            <span className="text-accent/60 text-xs font-semibold tracking-label uppercase block mb-4">Web Design</span>
            <h2
              className="font-bold leading-[0.9] tracking-display text-primary"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
            >
              WEBSITES THAT<br />CONVERT.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-primary/10 border border-primary/10">
            {allWebProjects.map((project: any, index: number) => (
              <div
                key={project.id}
                className="js-reveal bg-white group overflow-hidden"
                data-delay={String((index % 2) + 1)}
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden bg-gray-100">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-dark font-semibold text-sm tracking-wide transition-colors duration-200"
                    >
                      Visit Site
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Info */}
                <div className="p-8 border-t border-primary/10">
                  <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">{project.name}</h3>
                  <p className="text-charcoal/55 text-sm leading-relaxed mb-4">{project.description}</p>
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-label uppercase text-primary/50 hover:text-accent transition-colors duration-300"
                  >
                    View Project
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Graphic design projects ── */}
      <section className="bg-white py-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="js-reveal mb-16">
            <span className="text-accent/60 text-xs font-semibold tracking-label uppercase block mb-4">Graphic Design</span>
            <h2
              className="font-bold leading-[0.9] tracking-display text-primary"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
            >
              VISUALS THAT<br />LEAVE A MARK.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-primary/10 border border-primary/10">
            {allGraphicProjects.map((project: any, index: number) => (
              <div
                key={project.id}
                className="js-reveal relative aspect-square overflow-hidden bg-light group"
                data-delay={String((index % 4) + 1)}
              >
                <Image
                  src={project.image}
                  alt={`Graphic Design ${project.order}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
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
