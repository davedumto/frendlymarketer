'use client';
import React from 'react';
import { motion } from 'framer-motion';
interface CTABandProps {
  heading: string;
  subheading: string;
  buttonText: string;
  darkBackground?: boolean;
}
const CTABand = ({
  heading,
  subheading,
  buttonText,
  darkBackground = false
}: CTABandProps) => {
  return <section className={`py-16 ${darkBackground ? 'bg-primary text-white' : 'bg-light text-charcoal'}`}>
      <div className="container mx-auto px-4 text-center">
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
          {heading}
        </motion.h2>
        <motion.p className={`text-lg mb-8 max-w-2xl mx-auto ${darkBackground ? 'text-white/80' : 'text-gray-600'}`} initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.1
      }} viewport={{
        once: true
      }}>
          {subheading}
        </motion.p>
        <motion.a href="#" className={`inline-block px-8 py-3 ${darkBackground ? 'bg-accent text-charcoal hover:bg-accent/90' : 'bg-accent text-charcoal hover:bg-accent/90'} font-medium rounded-md shadow-md hover:shadow-lg transition-all`} initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.2
      }} viewport={{
        once: true
      }} whileHover={{
        y: -3,
        transition: {
          duration: 0.2
        }
      }}>
          {buttonText}
        </motion.a>
      </div>
    </section>;
};
export default CTABand;