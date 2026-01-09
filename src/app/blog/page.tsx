import React from 'react';
import { getAllPosts } from '../../lib/api';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon, CalendarIcon } from 'lucide-react';

export default async function BlogPage() {
  const posts = await getAllPosts();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '');
  };

  const getImageUrl = (post: any) => {
    return post.featuredImage?.node.sourceUrl || '';
  };

  return (
    <div>
      <Navbar />
      <main className="py-20 bg-light min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
              Our Blog
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Insights, trends, and thought leadership from our digital marketing experts
            </p>
            <div className="w-24 h-1 bg-accent mx-auto mt-6" />
          </div>

          {/* Blog Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <div className="bg-white  overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    {/* Image */}
                    <div className="h-56 overflow-hidden relative bg-gray-100">
                      <Image
                        src={getImageUrl(post)}
                        alt={post.featuredImage?.node.altText || post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Date and Categories */}
                      <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                        {post.categories && post.categories.nodes.length > 0 && (
                          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                            {post.categories.nodes[0].name}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-semibold text-charcoal mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                        {stripHtml(post.excerpt)}
                      </p>

                      {/* Read More Link */}
                      <div className="inline-flex items-center text-primary font-medium group-hover:text-accent transition-colors">
                        Read more
                        <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">No blog posts found.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
