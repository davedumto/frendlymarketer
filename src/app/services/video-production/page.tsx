'use client';
import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon, CheckCircleIcon, Video, Play, Film, Zap } from 'lucide-react';

export default function VideoProductionPage() {
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
              Video Production
            </motion.span>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              COMPELLING<br />
              <span className="text-accent">STORIES THAT</span><br />
              <span className="text-white">ENGAGE.</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Create powerful video content that captures attention, tells your story, and drives action with professional production quality.
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
                TELL YOUR STORY
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          </div>

          {/* Image Side */}
          <div className="relative min-h-[600px] bg-white">
            <Image
              src="/images/Video Production Photo.jpg"
              alt="Video Production"
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
            <Video className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-3">Professional Quality</h3>
            <p className="text-white/90">
              Cinema-grade equipment and experienced crew for stunning results.
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
            <Play className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-3">Engaging Content</h3>
            <p className="text-primary/80">
              Videos that capture attention and drive audience engagement.
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
            <Film className="w-12 h-12 text-white mb-4" />
            <h3 className="text-2xl font-bold mb-3">Full Production</h3>
            <p className="text-primary/90">
              End-to-end video production from concept to final delivery.
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
            <Zap className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-3">Fast Turnaround</h3>
            <p className="text-primary/80">
              Efficient workflow to deliver your videos on time and on budget.
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
              VIDEO SERVICES
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mt-4" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              "Corporate Videos",
              "Product Demos", 
              "Social Media Content",
              "Promotional Videos",
              "Event Coverage",
              "Animation & Motion Graphics"
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
                <p className="text-gray-700">High-quality video production tailored to your needs.</p>
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
              PRODUCTION PROCESS
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mt-4" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { step: "01", title: "Pre-Production", description: "Develop concepts, scripts, and detailed storyboards." },
              { step: "02", title: "Production", description: "Film with professional equipment and experienced crew." },
              { step: "03", title: "Post-Production", description: "Edit, color grade, and add effects for perfect results." },
              { step: "04", title: "Delivery", description: "Provide final videos optimized for all platforms." }
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
            <span className="text-white">GO VIRAL?</span>
          </h2>
          <p className="text-xl text-primary/80 mb-12 max-w-2xl mx-auto">
            Let's create videos that captivate your audience and drive results. Book your free consultation today.
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
