import React from 'react';
import Image from 'next/image';

interface PartnerItem {
  name: string;
  src: string;
}

interface PartnersSectionProps {
  partners: PartnerItem[];
}

export default function PartnersSection({ partners }: PartnersSectionProps) {
  if (partners.length === 0) return null;

  // Duplicate for seamless CSS loop (-50% = one full set)
  const loopedPartners = [...partners, ...partners];

  return (
    <section className="bg-white py-20 lg:py-28 border-t border-charcoal/[0.06]">

      {/* Header — constrained width */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 mb-14 md:mb-18">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="js-reveal block text-primary/45 text-xs font-semibold tracking-label uppercase mb-4">
              Trusted By
            </span>
            <h2
              className="js-reveal font-bold leading-[0.9] tracking-display text-dark"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 5rem)' }}
              data-delay="1"
            >
              BRANDS WE&apos;VE<br />
              <span className="text-primary">BUILT WITH.</span>
            </h2>
          </div>
          <p
            className="js-reveal max-w-xs text-charcoal/45 text-sm leading-relaxed md:text-right"
            data-delay="2"
          >
            From growing startups to established enterprises — we&apos;ve helped
            businesses across every stage scale their digital presence.
          </p>
        </div>
      </div>

      {/* Full-width carousel strip */}
      <div className="partner-carousel-wrapper js-reveal" data-delay="3">
        <div className="partner-carousel-track">
          {loopedPartners.map((partner, i) => (
            <div
              key={i}
              className="partner-logo group flex-shrink-0 flex items-center justify-center px-14 py-2"
            >
              <div
                className="partner-logo-img relative"
                style={{ width: '200px', height: '80px' }}
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="200px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
