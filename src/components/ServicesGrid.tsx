'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { GlobeIcon, LineChartIcon, PenToolIcon, VideoIcon, InstagramIcon, SearchIcon, ArrowRightIcon } from 'lucide-react';
const services = [{
  icon: <GlobeIcon className="w-8 h-8" />,
  title: 'Web Development',
  description: 'Custom websites built for performance and conversions'
}, {
  icon: <LineChartIcon className="w-8 h-8" />,
  title: 'Digital Marketing',
  description: 'Data-driven strategies that deliver measurable results'
}, {
  icon: <PenToolIcon className="w-8 h-8" />,
  title: 'Graphic Design',
  description: "Visuals that communicate your brand's unique story"
}, {
  icon: <VideoIcon className="w-8 h-8" />,
  title: 'Video Production',
  description: 'Engaging video content that captivates your audience'
}, {
  icon: <InstagramIcon className="w-8 h-8" />,
  title: 'Social Media',
  description: 'Strategic presence across all relevant platforms'
}, {
  icon: <SearchIcon className="w-8 h-8" />,
  title: 'SEO',
  description: 'Improve visibility and drive organic traffic growth'
}];
const ServicesGrid = () => {
  return <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4" initial={{
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
            Our Services
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => <motion.div key={index} className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.4,
          delay: index * 0.1
        }} viewport={{
          once: true,
          margin: '-50px'
        }} whileHover={{
          y: -5
        }}>
              <div className="text-primary mb-5 group-hover:text-accent transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-charcoal">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <a href="#" className="inline-flex items-center text-primary font-medium hover:text-accent transition-colors group-hover:translate-x-1 duration-300">
                Learn more <ArrowRightIcon className="w-4 h-4 ml-2" />
              </a>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
export default ServicesGrid;