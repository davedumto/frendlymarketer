'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/images/4K Digital Agency Video (1).mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay - Dark for logo visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Large Editorial Typography */}
          <div className="mb-16">
            <span className="text-accent font-medium tracking-wider uppercase text-sm mb-4 block animate-fade-in">
              Digital Marketing Agency
            </span>
            <h1 className="text-[clamp(3rem,12vw,10rem)] font-bold leading-[0.9] tracking-tight text-white mb-8 animate-slide-up">
              WE BUILD<br />
              DIGITAL<br />
              <span className="text-accent">FUTURES</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed animate-fade-in-delayed">
              Transform your brand with strategic digital marketing that delivers measurable results and sustainable growth.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delayed-2">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent text-primary font-semibold text-lg hover:bg-white transition-all group"
            >
              Get Started
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold text-lg hover:bg-white hover:text-primary transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
