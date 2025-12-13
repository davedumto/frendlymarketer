'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { TrophyIcon, LightbulbIcon, HeadphonesIcon } from 'lucide-react';
const features = [{
  icon: <TrophyIcon className="w-10 h-10 text-accent" />,
  title: 'Guaranteed Success',
  description: "We don't just promise results - we guarantee them. Our performance-based approach ensures you see measurable outcomes from our partnership."
}, {
  icon: <LightbulbIcon className="w-10 h-10 text-accent" />,
  title: 'Creative Approach',
  description: "Our team of creative experts brings fresh, innovative ideas to every project, helping your brand stand out in today's crowded digital landscape."
}, {
  icon: <HeadphonesIcon className="w-10 h-10 text-accent" />,
  title: 'Dedicated Support',
  description: "We're with you every step of the way, providing responsive support and strategic guidance throughout our partnership."
}];
const WhyChooseUs = () => {
  return <section className="py-20 bg-gradient-to-br from-primary/95 to-primary/80 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-4" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} viewport={{
          once: true
        }}>
            Why Choose Us
          </motion.h2>
          <motion.div className="w-24 h-1 bg-accent mx-auto" initial={{
          width: 0
        }} whileInView={{
          width: 96
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} viewport={{
          once: true
        }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => <motion.div key={index} className="bg-white rounded-lg p-8 shadow-md text-charcoal" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: index * 0.2
        }} viewport={{
          once: true,
          margin: '-50px'
        }}>
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
export default WhyChooseUs;