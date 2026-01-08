import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon } from 'lucide-react';

export default function WhyChooseUsSection() {
  return (
    <section className="bg-white">
      <div className="grid md:grid-cols-2">
        {/* Text Side - BOLD TEAL */}
        <div className="p-12 md:p-20 flex flex-col justify-center bg-primary text-white">
          <span className="text-accent font-bold uppercase text-sm mb-4 tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
            We're More Than<br />
            Just an Agency
          </h2>
          <p className="text-white/90 text-lg mb-8 leading-relaxed">
            We're your partners in success. With a track record of delivering exceptional results, we've helped countless businesses thrive in the digital landscape.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary text-sm font-bold">✓</span>
              </div>
              <span className="text-white">Dedicated team of digital experts</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary text-sm font-bold">✓</span>
              </div>
              <span className="text-white">Data-driven strategies that deliver results</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary text-sm font-bold">✓</span>
              </div>
              <span className="text-white">Transparent communication & reporting</span>
            </li>
          </ul>
          <Link
            href="/about"
            className="inline-flex items-center text-accent font-bold hover:gap-3 transition-all w-fit text-lg"
          >
            Learn About Us
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>

        {/* Image Side - Full Image */}
        <div className="relative min-h-[500px] bg-white">
          <Image
            src="/images/brand-identity.png"
            alt="Brand Identity"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
