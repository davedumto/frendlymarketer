'use client';
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon, CheckCircleIcon, Target, Users, Lightbulb, Trophy } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      <Navbar />

      {/* Hero Section - Clean with Image */}
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
              Who We Are
            </motion.span>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              WE'RE YOUR<br />
              <span className="text-accent">PARTNERS IN</span><br />
              <span className="text-white">SUCCESS.</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Join us on a journey of change and growth. We transform brands through strategic digital marketing that delivers measurable results.
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
                GET STARTED
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          </div>

          {/* Image Side */}
          <div className="relative min-h-[600px] bg-white">
            <Image
              src="/images/brand-identity.png"
              alt="About Us"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Mission - Split Section */}
      <section className="bg-white">
        <div className="grid md:grid-cols-2">
          {/* Image Side */}
          <div className="relative min-h-[500px] bg-light">
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <Target className="w-64 h-64 text-primary/20" />
            </div>
          </div>

          {/* Text Side */}
          <div className="p-12 md:p-20 flex flex-col justify-center bg-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-primary">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              To empower businesses with innovative digital marketing solutions that drive growth, enhance brand visibility, and create lasting connections with their audience.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe in delivering measurable results through data-driven strategies, creative excellence, and unwavering commitment to our clients' success.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Color Blocks */}
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
            <Users className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-3">Expert Team</h3>
            <p className="text-white/90">
              Dedicated professionals with years of experience in digital marketing and brand strategy.
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
            <Lightbulb className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-3">Creative Solutions</h3>
            <p className="text-primary/80">
              Innovative ideas that capture attention and deliver results beyond expectations.
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
            <Trophy className="w-12 h-12 text-white mb-4" />
            <h3 className="text-2xl font-bold mb-3">Proven Results</h3>
            <p className="text-primary/90">
              Track record of delivering measurable growth and ROI for 250+ brands worldwide.
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
            <CheckCircleIcon className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-3">Client-Focused</h3>
            <p className="text-primary/80">
              Your success is our priority. We build partnerships, not just business relationships.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Do - Cream Background */}
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
              WHAT WE DO
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mt-4" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Card 1 */}
            <motion.div
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-primary mb-4">
                Strategy & Planning
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We develop comprehensive digital marketing strategies tailored to your business goals, ensuring every campaign is data-driven and results-focused.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-primary mb-4">
                Creative Execution
              </h3>
              <p className="text-gray-700 leading-relaxed">
                From web design to video production, our creative team brings your brand to life with stunning visuals and compelling content.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA - Gold Background */}
      <section className="bg-accent text-primary py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            READY TO GROW<br />
            <span className="text-white">YOUR BUSINESS?</span>
          </h2>
          <p className="text-xl text-primary/80 mb-12 max-w-2xl mx-auto">
            Let's create something extraordinary together. Book your free consultation today.
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
