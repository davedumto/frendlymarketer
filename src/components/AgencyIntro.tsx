'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';

const AgencyIntro = () => {
  return (
    <section className="py-24 lg:py-32 bg-light">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-primary font-semibold mb-4 tracking-wide uppercase text-sm">
              About Us
            </p>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-[1.15] mb-6">
              We're your partners in digital success
            </h2>

            <div className="space-y-4 text-gray-600 text-lg leading-relaxed mb-8">
              <p>
                We collaborate closely with our clients to understand their unique 
                challenges and goals, crafting tailored strategies that drive 
                measurable results and sustainable growth.
              </p>
              <p>
                Our team brings together expertise in design, development, and marketing 
                to deliver solutions that make a real impact on your business.
              </p>
            </div>

            {/* Simple stats row */}
            <div className="flex gap-12 mb-10 py-6 border-y border-gray-200">
              <div>
                <p className="text-4xl font-bold text-charcoal">10+</p>
                <p className="text-gray-500 text-sm mt-1">Years Experience</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-charcoal">150+</p>
                <p className="text-gray-500 text-sm mt-1">Projects Delivered</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-charcoal">98%</p>
                <p className="text-gray-500 text-sm mt-1">Client Satisfaction</p>
              </div>
            </div>

            <motion.a
              href="#"
              className="inline-flex items-center gap-3 text-charcoal font-semibold group"
              whileHover={{ x: 5 }}
            >
              <span className="border-b-2 border-accent pb-1">Learn more about us</span>
              <ArrowRightIcon className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Right Content - Single Clean Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Team collaboration"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AgencyIntro;