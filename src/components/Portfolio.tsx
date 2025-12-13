'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const categories = ['All', 'Graphic Design', 'Web Development', 'Digital Marketing'];
const projects = [{
  id: 1,
  title: 'Eco-Friendly Brand Identity',
  category: 'Graphic Design',
  image: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
}, {
  id: 2,
  title: 'E-commerce Website Redesign',
  category: 'Web Development',
  image: 'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
}, {
  id: 3,
  title: 'Social Media Campaign',
  category: 'Digital Marketing',
  image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
}, {
  id: 4,
  title: 'Product Packaging Design',
  category: 'Graphic Design',
  image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
}, {
  id: 5,
  title: 'Corporate Website',
  category: 'Web Development',
  image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
}, {
  id: 6,
  title: 'Email Marketing Campaign',
  category: 'Digital Marketing',
  image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
}];
const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const filteredProjects = activeCategory === 'All' ? projects : projects.filter(project => project.category === activeCategory);
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
            Recent Works
          </motion.h2>
          <motion.div className="w-24 h-1 bg-accent mx-auto mb-8" initial={{
          width: 0
        }} whileInView={{
          width: 96
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} viewport={{
          once: true
        }} />
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category, index) => <motion.button key={category} className={`px-4 py-2 rounded-md transition-all ${activeCategory === category ? 'bg-primary text-white' : 'bg-light text-gray-700 hover:bg-gray-200'}`} onClick={() => setActiveCategory(category)} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.3,
            delay: 0.1 + index * 0.1
          }} viewport={{
            once: true
          }} whileHover={{
            y: -2
          }} whileTap={{
            scale: 0.98
          }}>
                {category}
              </motion.button>)}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map(project => <motion.div key={project.id} layout initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} exit={{
            opacity: 0,
            scale: 0.9
          }} transition={{
            duration: 0.4
          }} className="group relative overflow-hidden rounded-lg shadow-md">
                <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {project.title}
                    </h3>
                    <p className="text-white/80 text-sm">{project.category}</p>
                  </div>
                </div>
              </motion.div>)}
          </AnimatePresence>
        </div>
      </div>
    </section>;
};
export default Portfolio;