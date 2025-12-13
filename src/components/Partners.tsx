'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
const partners = [{
  id: 1,
  name: 'Connected Africa',
  logo: '/images/logos/connected-africa.png'
}, {
  id: 2,
  name: 'BRV',
  logo: '/images/logos/brv.png'
}, {
  id: 3,
  name: 'Adonar',
  logo: '/images/logos/adonar.png'
}, {
  id: 4,
  name: 'Frendly Partner',
  logo: '/images/logos/frendlyp.jpg'
}, {
  id: 5,
  name: 'Partner 2',
  logo: '/images/logos/2.png'
}, {
  id: 6,
  name: 'Partner 4',
  logo: '/images/logos/4.png'
}];
const Partners = () => {
  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 className="text-3xl font-bold text-charcoal mb-4" initial={{
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
            Our Partners
          </motion.h2>
          <motion.div className="w-20 h-1 bg-accent mx-auto" initial={{
          width: 0
        }} whileInView={{
          width: 80
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} viewport={{
          once: true
        }} />
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner, index) => <motion.div key={partner.id} className="w-32 md:w-40 flex items-center justify-center" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.4,
          delay: index * 0.1
        }} viewport={{
          once: true
        }} whileHover={{
          scale: 1.05
        }}>
              <div className="relative w-full h-12 grayscale hover:grayscale-0 transition-all duration-300">
                <Image 
                  src={partner.logo} 
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
export default Partners;