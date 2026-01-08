import React from 'react';
import { getAllPostSlugs, getPostBySlug } from '../../../lib/api';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeftIcon, CalendarIcon, UserIcon } from 'lucide-react';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function BlogPost({ params }: BlogPostPageProps) {
  // Await params for Next.js 16 compatibility
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-charcoal mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-primary hover:text-accent">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div>
      <Navbar />
      <main className="py-20 bg-white">
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center text-primary hover:text-accent mb-8 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="w-full h-96 rounded-2xl overflow-hidden mb-8 relative bg-gray-100">
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText || post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
            {post.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              <span>{formatDate(post.date)}</span>
            </div>
            {post.author && (
              <div className="flex items-center gap-2">
                <UserIcon className="w-5 h-5" />
                <span>{post.author.node.name}</span>
              </div>
            )}
            {post.categories && post.categories.nodes.length > 0 && (
              <div className="flex items-center gap-2">
                {post.categories.nodes.map((category) => (
                  <span
                    key={category.slug}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none 
              prose-headings:text-charcoal prose-headings:font-bold prose-headings:mb-4 prose-headings:mt-8
              prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-primary prose-a:underline hover:prose-a:text-accent 
              prose-strong:text-charcoal prose-strong:font-semibold
              prose-ul:my-6 prose-ul:space-y-2 prose-li:text-gray-700
              prose-ol:my-6 prose-ol:space-y-2
              prose-img:rounded-lg prose-img:shadow-md prose-img:my-8
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
              [&>p]:mb-6 [&>h2]:mt-10 [&>h3]:mt-8"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />

          {/* Tags */}
          {post.tags && post.tags.nodes.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-charcoal mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.nodes.map((tag) => (
                  <span
                    key={tag.slug}
                    className="px-4 py-2 bg-light text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
