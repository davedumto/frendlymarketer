'use client';
import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon, CheckCircleIcon, Search, TrendingUp, Target, Award } from 'lucide-react';

export default function SEOPage() {
  return (
    <div>
      <Navbar />

      {/* Hero Section - Split Layout */}
      <section className="pt-24 bg-primary">
        <div className="grid md:grid-cols-2 min-h-[600px]">
          {/* Text Side */}
          <div className="p-12 md:p-20 flex flex-col justify-center text-white">
            <motion.span
              className="inline-block text-accent font-bold uppercase text-sm mb-4 tracking-wider w-fit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              SEO Services
            </motion.span>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              DOMINATE<br />
              <span className="text-accent">SEARCH RANKINGS &</span><br />
              <span className="text-white">DRIVE TRAFFIC.</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Increase your organic visibility and attract qualified leads with proven SEO strategies that deliver long-term results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="/consultation"
                className="inline-flex items-center px-8 py-4 bg-accent text-primary font-bold text-lg hover:bg-white hover:text-primary transition-all w-fit"
              >
                RANK HIGHER
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          </div>

          {/* Image Side */}
          <div className="relative min-h-[600px] bg-white">
            <Image
              src="/images/SEO Stock Photo Goumbik.jpg"
              alt="SEO Services"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features - Color Blocks */}
      <section className="py-0">
        <div className="grid md:grid-cols-2 lg:grid-cols-4">
          {/* Block 1 - Teal */}
          <motion.div
            className="bg-primary text-white p-8 md:p-12 min-h-[300px] flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Search className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-3">Keyword Mastery</h3>
            <p className="text-white/90">
              Target the right keywords to attract your ideal customers.
            </p>
          </motion.div>

          {/* Block 2 - White */}
          <motion.div
            className="bg-white text-primary p-8 md:p-12 min-h-[300px] flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <TrendingUp className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-3">Organic Growth</h3>
            <p className="text-primary/80">
              Sustainable traffic growth that compounds over time.
            </p>
          </motion.div>

          {/* Block 3 - Gold */}
          <motion.div
            className="bg-accent text-primary p-8 md:p-12 min-h-[300px] flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Target className="w-12 h-12 text-white mb-4" />
            <h3 className="text-2xl font-bold mb-3">Targeted Traffic</h3>
            <p className="text-primary/90">
              High-intent visitors actively searching for your solutions.
            </p>
          </motion.div>

          {/* Block 4 - Cream */}
          <motion.div
            className="bg-light text-primary p-8 md:p-12 min-h-[300px] flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-gray-200"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Award className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-3">Authority Building</h3>
            <p className="text-primary/80">
              Establish your brand as the go-to expert in your industry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Offer - Cream Background */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              SEO SOLUTIONS
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mt-4" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              "Technical SEO Audits",
              "Keyword Research", 
              "On-Page Optimization",
              "Link Building",
              "Local SEO",
              "Content Optimization"
            ].map((service, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <CheckCircleIcon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-bold text-primary mb-2">{service}</h3>
                <p className="text-gray-700">Comprehensive SEO services that improve your search rankings.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - White Background */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              SEO METHODOLOGY
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mt-4" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { step: "01", title: "Audit", description: "Comprehensive analysis of your current SEO performance." },
              { step: "02", title: "Research", description: "In-depth keyword and competitor research for strategy." },
              { step: "03", title: "Optimize", description: "Implement technical, on-page, and off-page improvements." },
              { step: "04", title: "Monitor", description: "Track rankings and refine strategy for continuous growth." }
            ].map((process, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary">{process.step}</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">{process.title}</h3>
                <p className="text-gray-700 leading-relaxed">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Gold Background */}
      <section className="bg-accent text-primary py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            READY TO<br />
            <span className="text-white">RANK #1?</span>
          </h2>
          <p className="text-xl text-primary/80 mb-12 max-w-2xl mx-auto">
            Let's boost your search rankings and drive organic traffic that converts. Book your free SEO audit today.
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

      <Footer />
    </div>
  );
}
