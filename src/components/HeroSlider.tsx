'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
const slides = [{
  id: 1,
  title: 'Web Development',
  description: 'Custom websites that convert visitors into customers',
  image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
}, {
  id: 2,
  title: 'Digital Marketing',
  description: 'Data-driven strategies to grow your online presence',
  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
}, {
  id: 3,
  title: 'Graphic Design',
  description: 'Visual storytelling that captures your brand essence',
  image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
}, {
  id: 4,
  title: 'Video Production',
  description: 'Engaging video content that drives engagement',
  image: 'https://images.unsplash.com/photo-1601506521793-dc748fc80b67?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
}, {
  id: 5,
  title: 'Social Media',
  description: 'Build communities and drive engagement across platforms',
  image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
}, {
  id: 6,
  title: 'SEO',
  description: 'Boost visibility and climb search engine rankings',
  image: 'https://images.unsplash.com/photo-1572177812156-58036aae439c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
}];
const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);
  const nextSlide = () => {
    setCurrentSlide(prev => prev === slides.length - 1 ? 0 : prev + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1);
  };
  return <section className="relative h-screen w-full overflow-hidden pt-20 bg-primary">
      {/* Background slides with crossfade */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div key={currentSlide} className="absolute inset-0" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} transition={{
          duration: 1.2,
          ease: 'easeInOut'
        }}>
            <motion.div className="absolute inset-0 bg-cover bg-center" style={{
            backgroundImage: `url(${slides[currentSlide].image})`
          }} initial={{
            scale: 1
          }} animate={{
            scale: 1.1
          }} transition={{
            duration: 7,
            ease: 'linear'
          }} />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-white max-w-lg">
            <AnimatePresence mode="wait">
              <motion.div key={`content-${currentSlide}`} initial={{
              opacity: 0,
              y: 30
            }} animate={{
              opacity: 1,
              y: 0
            }} exit={{
              opacity: 0,
              y: -30
            }} transition={{
              duration: 0.6,
              ease: 'easeOut'
            }}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  {slides[currentSlide].title}
                </h1>
                <p className="text-xl mb-8">
                  {slides[currentSlide].description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#" className="px-6 py-3 bg-accent text-charcoal font-medium rounded-md hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-md">
                    Get Started
                  </a>
                  <a href="#" className="px-6 py-3 bg-transparent text-white border border-white font-medium rounded-md hover:bg-white/10 transition-all">
                    View Service
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* Slider Controls */}
      <div className="absolute bottom-10 left-0 right-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-2">
            {slides.map((_, index) => <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-accent w-8' : 'bg-white/50 w-2.5'}`} aria-label={`Go to slide ${index + 1}`} />)}
          </div>
          <div className="flex space-x-4">
            <button onClick={prevSlide} className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm" aria-label="Previous slide">
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button onClick={nextSlide} className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm" aria-label="Next slide">
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSlider;