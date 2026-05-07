import React from 'react';
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

const FALLBACK_POSTS: BlogPost[] = [
  {
    id: 'fb-1',
    title: '5 Digital Marketing Trends Reshaping How Brands Grow',
    slug: '#',
    excerpt:
      '<p>The digital landscape is evolving faster than ever. Here are the key trends shaping how brands connect with audiences and drive sustainable growth.</p>',
    date: new Date().toISOString(),
  },
  {
    id: 'fb-2',
    title: 'Why SEO Is Still Your Best Long-Term Investment',
    slug: '#',
    excerpt:
      '<p>Paid ads give you a short burst of traffic. SEO builds a compounding asset that grows in value over time — here\'s how to get it right.</p>',
    date: new Date().toISOString(),
  },
  {
    id: 'fb-3',
    title: 'Building a Brand Identity That Actually Converts',
    slug: '#',
    excerpt:
      '<p>Great branding isn\'t just aesthetics. It\'s a visual language that resonates with your audience and drives them to action at every touchpoint.</p>',
    date: new Date().toISOString(),
  },
];

function formatDate(ds: string) {
  return new Date(ds).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '');
}

export default function BlogSection({ posts = [] }: BlogSectionProps) {
  const displayPosts = posts.length > 0 ? posts.slice(0, 3) : FALLBACK_POSTS;

  return (
    <section className="bg-white py-24 lg:py-32 border-t border-charcoal/[0.06]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="js-reveal block text-primary/50 text-xs font-semibold tracking-label uppercase mb-4">
              The Frendly Blog
            </span>
            <h2
              className="js-reveal font-bold leading-[0.9] tracking-display text-dark"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 6rem)' }}
              data-delay="1"
            >
              INSIGHTS &amp;<br />PERSPECTIVES
            </h2>
          </div>
          <Link
            href="/blog"
            className="js-reveal inline-flex items-center gap-3 text-primary font-semibold text-sm tracking-wide group hover:text-accent transition-colors duration-200 self-start md:self-end"
            data-delay="2"
          >
            View all posts
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Posts grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayPosts.map((post, i) => {
            const imgSrc = post.featuredImage?.node.sourceUrl || '';
            const imgAlt = post.featuredImage?.node.altText || post.title;

            return (
              <Link
                key={post.id}
                href={post.slug === '#' ? '/blog' : `/blog/${post.slug}`}
                className="blog-card js-reveal group relative bg-white border border-charcoal/[0.08] flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_24px_60px_-24px_rgba(7,30,36,0.28)]"
                data-delay={String(i + 1)}
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/10] bg-light">
                  {imgSrc ? (
                    <Image
                      src={imgSrc}
                      alt={imgAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
                  )}
                  {/* Top accent strip — draws on hover */}
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 h-[3px] w-0 bg-accent group-hover:w-full transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col p-6 lg:p-7">
                  <span className="block text-accent text-[11px] font-semibold tracking-label uppercase mb-3">
                    {formatDate(post.date)}
                  </span>

                  <h3 className="font-bold text-dark leading-snug mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300"
                    style={{ fontSize: 'clamp(1.1rem, 1.4vw, 1.25rem)' }}
                  >
                    {post.title}
                  </h3>

                  <p className="text-charcoal/55 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                    {stripHtml(post.excerpt)}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-charcoal/[0.08]">
                    <span className="inline-flex items-center gap-2 text-primary text-xs font-semibold tracking-label uppercase group-hover:text-accent transition-colors duration-300">
                      Read article
                    </span>
                    <span className="w-9 h-9 flex items-center justify-center rounded-full border border-charcoal/15 group-hover:border-accent group-hover:bg-accent transition-all duration-400">
                      <svg
                        className="w-3.5 h-3.5 text-charcoal/55 group-hover:text-dark group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-400"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
