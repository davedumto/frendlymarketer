'use client';
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactForm from '../../components/ContactForm';
import LocationMap from '../../components/LocationMap';
import { motion } from 'framer-motion';

export default function ConsultationPage() {
  return (
    <div>
      <Navbar />

      {/* Hero Section - Teal Background */}
      <section className="pt-24 pb-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            BOOK A FREE<br />
            <span className="text-accent">CONSULTATION</span>
          </motion.h1>
          <motion.p
            className="text-xl text-white/90 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Let's discuss how we can help transform your digital presence. We'll get back to you within 24 hours.
          </motion.p>
          <motion.div
            className="w-24 h-1 bg-accent mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
      </section>

      {/* Split Section - Teal Left with Info + Map, White Right with Form */}
      <section className="bg-white">
        <div className="grid lg:grid-cols-2">
          {/* Left Side - Teal with Contact Info + Map */}
          <div className="bg-primary p-12 md:p-16 space-y-8">
            <motion.div
              className="text-white space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl font-bold">
                LET'S WORK<br />
                <span className="text-accent">TOGETHER</span>
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-accent font-bold text-xl mb-2">Email Us</h3>
                  <p className="text-white/90 text-lg">info@frendlymarqeter.com</p>
                </div>

                <div>
                  <h3 className="text-accent font-bold text-xl mb-2">Visit Our Office</h3>
                  <p className="text-white/90 text-lg">
                    Keystones Park, Riverside Drive<br />
                    Baraza Media Lab<br />
                    Nairobi, Kenya
                  </p>
                </div>

                <div>
                  <h3 className="text-accent font-bold text-xl mb-2">Working Hours</h3>
                  <p className="text-white/90 text-lg">
                    Monday - Friday: 9AM - 6PM<br />
                    Weekend: Closed
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Map on Left */}
            <motion.div
              className="rounded-lg overflow-hidden h-[400px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <LocationMap
                address="Keystones Park, Riverside Drive, Baraza Media Lab offices, Nairobi, Kenya"
                email="info@frendlymarqeter.com"
                hours="Mon-Fri: 9AM - 6PM"
              />
            </motion.div>
          </div>

          {/* Right Side - White with Form */}
          <motion.div
            className="bg-white p-12 md:p-16 flex items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-full">
              <h3 className="text-3xl font-bold text-primary mb-6">Send Message</h3>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us - Color Blocks */}
      <section className="py-0">
        <div className="grid md:grid-cols-3">
          {/* Block 1 - Teal */}
          <motion.div
            className="bg-accent text-white p-12 min-h-[280px] flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Fast Response</h3>
            <p className="text-white/90">
              We respond to all inquiries within 24 hours, ensuring you get the help you need quickly.
            </p>
          </motion.div>

          {/* Block 2 - White */}
          <motion.div
            className="bg-white text-primary p-12 min-h-[280px] flex flex-col justify-center border-t md:border-t-0 md:border-x border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Expert Team</h3>
            <p className="text-primary/80">
              Our dedicated team of digital marketing experts brings years of experience to your project.
            </p>
          </motion.div>

          {/* Block 3 - Gold */}
          <motion.div
            className="bg-accent text-primary p-12 min-h-[280px] flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Proven Results</h3>
            <p className="text-primary/90">
              We've helped 250+ businesses achieve their digital marketing goals with measurable results.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
