import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ScrollReveal from '../../../components/ScrollReveal';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon, UserIcon } from 'lucide-react';
import prisma from '@/lib/prisma';
import { getAllPostSlugs as getWordPressPostSlugs } from '../../../lib/api';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const wordpressSlugs = await getWordPressPostSlugs();
    const localPosts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      select: { slug: true },
    });
    const localSlugs = localPosts.map((post: { slug: string }) => post.slug);
    return [...wordpressSlugs, ...localSlugs].map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export default async function BlogPost({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/unified/${slug}`, {
    cache: 'no-store',
  }).then(res => res.ok ? res.json() : null).catch(() => null);

  if (!post) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-light">
          <div className="text-center">
            <span className="text-primary/15 font-bold tracking-display block mb-6" style={{ fontSize: 'clamp(4rem, 10vw, 10rem)' }}>404</span>
            <h1 className="text-2xl font-bold text-primary mb-4">Post Not Found</h1>
            <Link href="/blog" className="text-accent hover:text-primary text-sm font-semibold tracking-label uppercase transition-colors">
              ← Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div>
      <ScrollReveal />
      <Navbar />

      {/* ── Article header ── */}
      <header className="bg-dark pt-32 pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(211,160,50,0.045) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 relative">
          <Link
            href="/blog"
            className="js-reveal inline-flex items-center gap-2 text-white/35 hover:text-white/70 text-xs font-semibold tracking-label uppercase transition-colors mb-10"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Blog
          </Link>

          {post.categories?.nodes?.length > 0 && (
            <span className="js-reveal inline-block text-accent/60 text-xs font-semibold tracking-label uppercase mb-6">
              {post.categories.nodes[0].name}
            </span>
          )}

          <h1
            className="js-reveal font-bold leading-[0.92] tracking-display text-white mb-8"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 6rem)' }}
            data-delay="1"
          >
            {post.title}
          </h1>

          <div className="js-reveal flex flex-wrap items-center gap-6 text-white/30 text-xs" data-delay="2">
            <span className="flex items-center gap-2">
              <CalendarIcon className="w-3.5 h-3.5" />
              {formatDate(post.date)}
            </span>
            {post.author && (
              <span className="flex items-center gap-2">
                <UserIcon className="w-3.5 h-3.5" />
                {post.author.node.name}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ── Featured image ── */}
      {post.featuredImage && (
        <div className="relative h-[55vh] min-h-[300px] max-h-[520px] bg-charcoal overflow-hidden">
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* ── Article content ── */}
      <main className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-primary
              prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
              prose-p:text-charcoal/70 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-primary prose-a:underline hover:prose-a:text-accent
              prose-strong:text-charcoal prose-strong:font-semibold
              prose-ul:my-6 prose-ul:space-y-2 prose-li:text-charcoal/70
              prose-ol:my-6 prose-ol:space-y-2
              prose-img:my-8
              prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-charcoal/60
              [&>p]:mb-6 [&>h2]:mt-12 [&>h3]:mt-8
              whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />

          {/* Tags */}
          {post.tags?.nodes?.length > 0 && (
            <div className="mt-16 pt-8 border-t border-primary/10">
              <span className="text-xs font-semibold tracking-label uppercase text-charcoal/40 block mb-4">Tags</span>
              <div className="flex flex-wrap gap-2">
                {post.tags.nodes.map((tag: any) => (
                  <span
                    key={tag.slug}
                    className="px-3 py-1.5 border border-primary/15 text-primary/60 text-xs font-medium hover:border-accent hover:text-accent transition-colors cursor-default"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back link */}
          <div className="mt-16 pt-8 border-t border-primary/10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-label uppercase text-primary/50 hover:text-accent transition-colors"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              All Posts
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
