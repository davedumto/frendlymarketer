'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
const blogs = [{
  id: 1,
  title: '10 Digital Marketing Trends to Watch in 2025',
  excerpt: 'Stay ahead of the curve with these emerging trends that will shape the digital marketing landscape in the coming year.',
  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  date: 'June 15, 2025'
}, {
  id: 2,
  title: 'How to Create a Winning Social Media Strategy',
  excerpt: 'Learn the key components of an effective social media strategy that drives engagement and converts followers into customers.',
  image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  date: 'May 28, 2025'
}, {
  id: 3,
  title: 'The Psychology of Color in Web Design',
  excerpt: 'Discover how color choices impact user behavior and how to leverage color psychology to improve conversion rates.',
  image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  date: 'May 10, 2025'
}];
const BlogSection = () => {
  return <section className="py-20 bg-charcoal text-white">
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
            Our Blogs
          </motion.h2>
          <motion.p className="text-white/70 max-w-2xl mx-auto" initial={{
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
            Insights, trends, and thought leadership from our digital marketing
            experts
          </motion.p>
          <motion.div className="w-24 h-1 bg-accent mx-auto mt-4" initial={{
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
          {blogs.map((blog, index) => <motion.div key={blog.id} className="bg-white rounded-lg overflow-hidden shadow-lg" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: index * 0.1
        }} viewport={{
          once: true,
          margin: '-50px'
        }} whileHover={{
          y: -10
        }}>
              <div className="h-48 overflow-hidden">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              </div>
              <div className="p-6 text-charcoal">
                <p className="text-sm text-gray-500 mb-2">{blog.date}</p>
                <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>
                <a href="#" className="inline-flex items-center text-primary font-medium hover:text-accent transition-colors">
                  Read more <ArrowRightIcon className="w-4 h-4 ml-2" />
                </a>
              </div>
            </motion.div>)}
        </div>
        <div className="text-center mt-12">
          <motion.a href="#" className="inline-block px-8 py-3 bg-accent text-charcoal font-medium rounded-md shadow-md hover:shadow-lg transition-all" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} viewport={{
          once: true
        }} whileHover={{
          y: -3
        }}>
            Explore More
          </motion.a>
        </div>
      </div>
    </section>;
};
export default BlogSection;