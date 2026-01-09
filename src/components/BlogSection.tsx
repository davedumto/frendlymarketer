'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

interface BlogSectionProps {
  posts: BlogPost[];
}

const BlogSection = ({ posts = [] }: BlogSectionProps) => {
  // Get image URL from WordPress
  const getImageUrl = (post: BlogPost) => {
    return post.featuredImage?.node.sourceUrl || '';
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Strip HTML tags from excerpt
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '');
  };

  return (
    <section className="py-0">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Our Blogs
          </motion.h2>
          <motion.p
            className="text-primary/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Insights, trends, and thought leadership from our digital marketing experts
          </motion.p>
          <motion.div
            className="w-24 h-1 bg-accent mx-auto mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post, index) => (
            <motion.div
              key={post.id}
              className="bg-white overflow-hidden shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -10 }}
            >
              <div className="h-48 overflow-hidden bg-gray-100 relative">
                <Image
                  src={getImageUrl(post)}
                  alt={post.featuredImage?.node.altText || post.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6 text-primary">
                <p className="text-sm text-accent mb-2 font-semibold">{formatDate(post.date)}</p>
                <h3 className="text-xl font-bold mb-3 line-clamp-2 text-primary">
                  {post.title}
                </h3>
                <p className="text-primary/70 mb-4 line-clamp-2">
                  {stripHtml(post.excerpt)}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-primary font-semibold hover:text-accent transition-colors"
                >
                  Read more <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog">
            <motion.span
              className="inline-block px-8 py-3 bg-accent text-primary font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
            >
              Explore More
            </motion.span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;