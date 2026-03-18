import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ScrollReveal from '../../components/ScrollReveal';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon } from 'lucide-react';

import { getAllBlogPosts } from '../../lib/blog';

async function getAllPosts() {
  return getAllBlogPosts();
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '');

  const getImageUrl = (post: any) => post.featuredImage?.node.sourceUrl || '';

  return (
    <div>
      <ScrollReveal />
      <Navbar />

      {/* ── Hero ── */}
      <section className="bg-dark pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(211,160,50,0.045) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 relative">
          <span className="js-reveal inline-block text-accent/60 text-xs font-semibold tracking-label uppercase mb-8">
            Insights &amp; Ideas
          </span>
          <h1
            className="js-reveal font-bold leading-[0.88] tracking-display text-white mb-4"
            style={{ fontSize: 'clamp(3.2rem, 8.5vw, 9rem)' }}
            data-delay="1"
          >
            THE BLOG.
          </h1>
          <p className="js-reveal text-white/45 text-base leading-relaxed max-w-md" data-delay="2">
            Thought leadership and practical insights from our digital marketing experts.
          </p>
        </div>
      </section>

      {/* ── Blog grid ── */}
      <main className="bg-light py-24 min-h-[40vh]">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: any, index: number) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="js-reveal group bg-white hover:bg-light border border-primary/10 transition-colors duration-300 flex flex-col"
                  data-delay={String((index % 3) + 1)}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-gray-100 flex-shrink-0">
                    {getImageUrl(post) ? (
                      <Image
                        src={getImageUrl(post)}
                        alt={post.featuredImage?.node.altText || post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                        <span className="text-primary/20 text-5xl font-bold tracking-display">FM</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-4 text-xs text-charcoal/40">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      <span>{formatDate(post.date)}</span>
                      {post.categories?.nodes?.length > 0 && (
                        <span className="text-accent/70 font-semibold tracking-label uppercase">
                          {post.categories.nodes[0].name}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-bold text-primary mb-3 leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-300">
                      {post.title}
                    </h2>

                    <p className="text-charcoal/55 text-sm leading-relaxed line-clamp-3 flex-1 mb-6">
                      {stripHtml(post.excerpt)}
                    </p>

                    <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-label uppercase text-primary group-hover:text-accent transition-colors duration-300">
                      Read More
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-primary/10">
              <span className="text-primary/20 text-6xl font-bold tracking-display block mb-6">FM</span>
              <p className="text-charcoal/40 text-sm tracking-label uppercase">No posts yet — check back soon.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
