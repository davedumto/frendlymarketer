import React from 'react';
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
  return (
    <section className="bg-light py-24 lg:py-32">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Header */}
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
          <p
            className="js-reveal max-w-sm text-charcoal/55 text-sm leading-relaxed md:text-right"
            data-delay="2"
          >
            Six disciplines, one focused mission — making your brand impossible to ignore in the digital world.
          </p>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <Link
              key={service.num}
              href={service.href}
              className="js-reveal services-card group relative bg-white border border-charcoal/[0.08] flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_24px_60px_-24px_rgba(7,30,36,0.28)]"
              data-delay={String((i % 3) + 1)}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3] bg-charcoal/5">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                  priority={i < 3}
                />
                {/* Number badge */}
                <span className="absolute top-4 left-4 bg-dark/75 backdrop-blur-md text-accent text-[11px] font-bold tracking-widest px-3 py-1.5">
                  {service.num}
                </span>
                {/* Top accent strip — draws on hover */}
                <span
                  aria-hidden
                  className="absolute top-0 left-0 h-[3px] w-0 bg-accent group-hover:w-full transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col p-6 lg:p-7">
                <span className="block text-[11px] font-semibold tracking-label uppercase text-accent/85 mb-3">
                  {service.sub}
                </span>

                <h3 className="font-bold tracking-display leading-tight text-dark group-hover:text-primary transition-colors duration-300 mb-3"
                  style={{ fontSize: 'clamp(1.4rem, 2vw, 1.75rem)' }}
                >
                  {service.title}
                </h3>

                <p className="text-charcoal/55 text-sm leading-relaxed mb-6 flex-1">
                  {service.desc}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-charcoal/[0.08]">
                  <span className="inline-flex items-center gap-2 text-primary text-xs font-semibold tracking-label uppercase group-hover:text-accent transition-colors duration-300">
                    Explore
                  </span>
                  <span className="w-9 h-9 flex items-center justify-center rounded-full border border-charcoal/15 group-hover:border-accent group-hover:bg-accent transition-all duration-400">
                    <svg
                      className="w-3.5 h-3.5 text-charcoal/55 group-hover:text-dark group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-400"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View-all CTA */}
        <div className="mt-12 lg:mt-16 js-reveal" data-delay="2">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 text-primary font-semibold text-sm group hover:text-dark transition-colors duration-200"
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
    </section>
  );
}
