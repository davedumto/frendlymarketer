'use client';
import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon, CheckCircleIcon, Target, TrendingUp, Users, BarChart } from 'lucide-react';

export default function DigitalMarketingPage() {
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
              Digital Marketing
            </motion.span>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              STRATEGIC<br />
              <span className="text-accent">CAMPAIGNS THAT</span><br />
              <span className="text-white">CONVERT.</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Drive growth and maximize ROI with data-driven digital marketing strategies that reach your target audience and deliver measurable results.
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
                GROW YOUR BUSINESS
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          </div>

          {/* Image Side */}
          <div className="relative min-h-[600px] bg-white">
            <Image
              src="/images/Digital Marketing Photo.jpg"
              alt="Digital Marketing"
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
            <Target className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-3">Targeted Campaigns</h3>
            <p className="text-white/90">
              Reach the right audience at the right time with precision-targeted campaigns.
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
            <BarChart className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-3">Data-Driven</h3>
            <p className="text-primary/80">
              Every decision backed by analytics and performance data for maximum ROI.
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
            <TrendingUp className="w-12 h-12 text-white mb-4" />
            <h3 className="text-2xl font-bold mb-3">Growth Focused</h3>
            <p className="text-primary/90">
              Strategies designed to scale your business and increase revenue.
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
            <Users className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-3">Multi-Channel</h3>
            <p className="text-primary/80">
              Comprehensive approach across all digital marketing channels.
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
              OUR SERVICES
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mt-4" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              "Social Media Marketing",
              "PPC Advertising", 
              "Email Marketing",
              "Content Strategy",
              "SEO & SEM",
              "Marketing Automation"
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
                <p className="text-gray-700">Strategic campaigns designed to maximize your digital presence.</p>
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
              OUR APPROACH
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mt-4" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { step: "01", title: "Research", description: "Deep dive into your market, audience, and competitive landscape." },
              { step: "02", title: "Strategy", description: "Develop comprehensive marketing plan tailored to your goals." },
              { step: "03", title: "Execute", description: "Launch campaigns across all relevant digital channels." },
              { step: "04", title: "Optimize", description: "Continuously test, analyze, and refine for better results." }
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
            <span className="text-white">DOMINATE DIGITAL?</span>
          </h2>
          <p className="text-xl text-primary/80 mb-12 max-w-2xl mx-auto">
            Let's create marketing campaigns that drive real results. Book your free strategy session today.
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
