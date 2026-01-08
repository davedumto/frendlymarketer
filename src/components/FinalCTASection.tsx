import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';

export default function FinalCTASection() {
  return (
    <section className="bg-accent text-primary py-32">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          LET'S BUILD YOUR<br />
          <span className="text-white">DIGITAL FUTURE</span>
        </h2>
        <p className="text-xl text-primary/80 mb-12 max-w-2xl mx-auto">
          Ready to transform your digital presence? Let's create something extraordinary together.
        </p>
        <Link
          href="/consultation"
          className="inline-flex items-center justify-center px-12 py-5 bg-primary text-white font-bold text-lg hover:bg-white hover:text-primary transition-all group"
        >
          Book Free Consultation
          <ArrowRightIcon className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
