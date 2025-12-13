'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: 'Working with Frendly MarQeter transformed our online presence completely. Their strategic approach to digital marketing helped us increase our conversion rate by 150% in just three months.',
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechStart Inc.',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    rating: 5,
  },
  {
    id: 2,
    quote: 'The team at Frendly MarQeter consistently delivers outstanding results. Their web development expertise and creative design skills have given our brand a competitive edge in a crowded market.',
    name: 'Michael Chen',
    role: 'CEO',
    company: 'Innovate Solutions',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    rating: 5,
  },
  {
    id: 3,
    quote: "I've worked with several marketing agencies before, but none have delivered the level of personalized service and measurable results that Frendly MarQeter provides. They truly understand our business goals.",
    name: 'Emma Rodriguez',
    role: 'Founder',
    company: 'Green Earth Products',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    rating: 5,
  },
  {
    id: 4,
    quote: 'Their SEO expertise is unmatched. We saw a 200% increase in organic traffic within the first quarter. The team is responsive, professional, and truly cares about client success.',
    name: 'David Park',
    role: 'Head of Growth',
    company: 'NextLevel Tech',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 5,
  },
  {
    id: 5,
    quote: 'From branding to social media management, they handle everything seamlessly. Our engagement rates have never been higher, and our brand recognition has grown exponentially.',
    name: 'Lisa Thompson',
    role: 'Brand Manager',
    company: 'Luxe Fashion Co.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
  },
];

const TestimonialCard = ({ 
  testimonial, 
  isActive 
}: { 
  testimonial: typeof testimonials[0]; 
  isActive: boolean;
}) => {
  return (
    <div
      className={`relative bg-white rounded-2xl p-6 md:p-8 transition-all duration-500 ease-out h-full ${
        isActive 
          ? 'shadow-2xl border-2 border-accent/30' 
          : 'shadow-lg opacity-60 scale-95'
      }`}
    >
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-t-2xl" />
      
      {/* Quote mark */}
      <div className="absolute -top-4 left-6">
        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg">
          <span className="text-charcoal text-xl font-serif">"</span>
        </div>
      </div>

      {/* Rating stars */}
      <div className="flex gap-1 mb-3 mt-1">
        {[...Array(testimonial.rating)].map((_, i) => (
          <StarIcon key={i} className="w-4 h-4 fill-accent text-accent" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-gray-600 leading-relaxed mb-5 text-sm md:text-base">
        {testimonial.quote}
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-light"
        />
        <div>
          <p className="font-semibold text-charcoal text-sm">{testimonial.name}</p>
          <p className="text-xs text-primary font-medium">{testimonial.role}</p>
          <p className="text-xs text-gray-500">{testimonial.company}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const getVisibleIndices = () => {
    const prev = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    const next = (currentIndex + 1) % testimonials.length;
    return { prev, current: currentIndex, next };
  };

  const { prev, current, next } = getVisibleIndices();

  return (
    <section className="py-20 bg-gradient-to-b from-light to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            className="inline-block px-4 py-2 bg-primary/10 text-primary font-medium rounded-full text-sm mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Testimonials
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Don't just take our word for it. Here's what our clients have to say about their experience working with us.
          </motion.p>
        </div>

        {/* Desktop: 3 cards */}
        <div className="hidden lg:block relative max-w-6xl mx-auto px-12">
          <div className="grid grid-cols-3 gap-6">
            {/* Left Card */}
            <motion.div
              key={`left-${prev}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="h-[320px]"
            >
              <TestimonialCard testimonial={testimonials[prev]} isActive={false} />
            </motion.div>

            {/* Center Card */}
            <motion.div
              key={`center-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-[320px]"
            >
              <TestimonialCard testimonial={testimonials[current]} isActive={true} />
            </motion.div>

            {/* Right Card */}
            <motion.div
              key={`right-${next}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="h-[320px]"
            >
              <TestimonialCard testimonial={testimonials[next]} isActive={false} />
            </motion.div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile: Single card */}
        <div className="lg:hidden relative max-w-md mx-auto px-8">
          <motion.div
            key={`mobile-${current}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <TestimonialCard testimonial={testimonials[current]} isActive={true} />
          </motion.div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg text-primary hover:bg-primary hover:text-white transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg text-primary hover:bg-primary hover:text-white transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'bg-accent w-8'
                  : 'bg-gray-300 w-2 hover:bg-primary/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>


      </div>
    </section>
  );
};

export default Testimonials;