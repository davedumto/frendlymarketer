'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    num: '01',
    title: 'Web Development',
    sub: 'Design & Engineering',
    desc: 'Powerful websites engineered to convert visitors into customers with seamless user experiences.',
    href: '/services/web-development',
    image: '/images/Web Development Photo 1181675.jpg',
  },
  {
    num: '02',
    title: 'Digital Marketing',
    sub: 'Strategy & Growth',
    desc: 'Data-driven campaigns that amplify your brand and drive measurable growth across every channel.',
    href: '/services/digital-marketing',
    image: '/images/Digital Marketing Photo.jpg',
  },
  {
    num: '03',
    title: 'Graphic Design',
    sub: 'Brand Identity & Visual',
    desc: 'Visual identities that capture attention and communicate your brand story with precision.',
    href: '/services/graphic-design',
    image: '/images/Graphic Design Photo 55570.jpg',
  },
  {
    num: '04',
    title: 'SEO Services',
    sub: 'Search & Visibility',
    desc: 'Dominate search rankings, drive high-intent organic traffic, and build lasting authority.',
    href: '/services/seo',
    image: '/images/SEO Stock Photo Goumbik.jpg',
  },
  {
    num: '05',
    title: 'Social Media',
    sub: 'Community & Engagement',
    desc: 'Build engaged communities and turn your social presence into a meaningful revenue channel.',
    href: '/services/social-media',
    image: '/images/Social Media Photo 221179.jpg',
  },
  {
    num: '06',
    title: 'Video Production',
    sub: 'Storytelling & Content',
    desc: 'Compelling video content that tells your brand story and drives deeper audience connection.',
    href: '/services/video-production',
    image: '/images/Video Production Photo.jpg',
  },
];

export default function ServicesSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-light py-24 lg:py-32">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="js-reveal block text-xs font-semibold tracking-label uppercase text-primary/55 mb-4">
              Our Capabilities
            </span>
            <h2
              className="js-reveal font-bold leading-[0.9] tracking-display text-dark"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 6rem)' }}
              data-delay="1"
            >
              WHAT<br />WE DO
            </h2>
          </div>
          <p className="js-reveal max-w-sm text-charcoal/50 text-sm leading-relaxed md:text-right" data-delay="2">
            Six disciplines, one focused mission — making your brand impossible to ignore in the digital world.
          </p>
        </div>

        {/* Two-column: list left, image right */}
        <div className="grid lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-start">

          {/* ── Services list ── */}
          <div className="js-reveal" data-delay="2">
            {services.map((service, i) => {
              const isActive = active === i;
              return (
                <Link
                  key={service.num}
                  href={service.href}
                  onMouseEnter={() => setActive(i)}
                  className={`group flex items-center gap-6 md:gap-10 px-0 py-6 md:py-7 border-t first:border-t-0 transition-colors duration-300 ${
                    isActive
                      ? 'border-primary/20 bg-primary -mx-6 px-6 md:-mx-10 md:px-10'
                      : 'border-charcoal/[0.08]'
                  }`}
                  style={{ textDecoration: 'none' }}
                >
                  {/* Number */}
                  <span
                    className={`flex-shrink-0 text-xs font-bold tracking-widest w-8 transition-colors duration-300 ${
                      isActive ? 'text-accent/60' : 'text-primary/35'
                    }`}
                  >
                    {service.num}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3
                        className={`font-bold tracking-display leading-none transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-dark'
                        }`}
                        style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.4rem)' }}
                      >
                        {service.title}
                      </h3>
                      <span
                        className={`text-[11px] font-semibold tracking-label uppercase transition-colors duration-300 ${
                          isActive ? 'text-white/45' : 'text-charcoal/35'
                        }`}
                      >
                        {service.sub}
                      </span>
                    </div>

                    {/* Description — expands on active */}
                    <div
                      style={{
                        maxHeight: isActive ? '64px' : '0',
                        opacity: isActive ? 1 : 0,
                        overflow: 'hidden',
                        transition: 'max-height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease',
                      }}
                    >
                      <p className="text-white/60 text-sm leading-relaxed mt-2.5 pr-8">
                        {service.desc}
                      </p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div
                    className="flex-shrink-0"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translate(4px, -4px)' : 'translate(0,0)',
                      transition: 'opacity 0.3s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  >
                    <svg
                      className="w-5 h-5 text-accent"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* ── Image panel — sticky, desktop only ── */}
          <div className="hidden lg:block sticky top-28 self-start">
            <div className="relative overflow-hidden bg-charcoal/5" style={{ aspectRatio: '3/4' }}>

              {/* All images stacked, only active is visible */}
              {services.map((service, i) => (
                <Image
                  key={service.num}
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1280px) 360px, 420px"
                  className="object-cover"
                  style={{
                    opacity: active === i ? 1 : 0,
                    transition: 'opacity 0.55s cubic-bezier(0.16,1,0.3,1)',
                  }}
                  priority={i === 0}
                />
              ))}

              {/* Bottom overlay — service info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-dark/75 to-transparent pointer-events-none">
                <p className="text-white/45 text-[11px] tracking-label uppercase font-semibold mb-1">
                  {services[active].sub}
                </p>
                <p className="text-white font-bold text-xl tracking-display leading-tight">
                  {services[active].title}
                </p>
              </div>
            </div>

            {/* Bottom CTA below image */}
            <div className="mt-6">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm group hover:text-dark transition-colors duration-200"
              >
                View all services
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

        {/* Mobile-only bottom CTA */}
        <div className="mt-12 lg:hidden js-reveal" data-delay="2">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 text-primary font-semibold text-sm group hover:text-dark transition-colors duration-200"
          >
            View all services
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
