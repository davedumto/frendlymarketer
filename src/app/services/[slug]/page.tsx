import React from 'react';
import { getPageBySlug } from '../../../lib/api';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

// Generate static paths for service pages
export async function generateStaticParams() {
  const services = ['digital-marketing', 'graphic-design', 'seo', 'social-media', 'video-production', 'web-development'];
  return services.map((slug) => ({
    slug: slug,
  }));
}

export default async function ServicePage({ params }: ServicePageProps) {
  // Await params for Next.js 16 compatibility
  const { slug } = await params;
  
  // Try to fetch the service page from WordPress
  const page = await getPageBySlug(slug);

  if (!page) {
    return (
      <div>
        <Navbar />
        <main className="py-20 bg-white min-h-screen">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-charcoal mb-4">Service Not Found</h1>
            <Link href="/" className="text-primary hover:text-accent">
              ← Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="py-20 bg-white min-h-screen">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <Link 
            href="/#services" 
            className="inline-flex items-center text-primary hover:text-accent mb-8 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Services
          </Link>

          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6">
              {page.title}
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto" />
          </div>

          {/* Featured Image */}
          {page.featuredImage && (
            <div className="w-full max-w-5xl mx-auto h-96 rounded-2xl overflow-hidden mb-12 shadow-xl">
              <img
                src={page.featuredImage.node.sourceUrl}
                alt={page.featuredImage.node.altText || page.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="max-w-4xl mx-auto">
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
                [&>p]:mb-6 [&>h2]:mt-10 [&>h3]:mt-8"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>

          {/* CTA Section */}
          <div className="max-w-3xl mx-auto mt-16">
            <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to elevate your {page.title.toLowerCase()}?
              </h2>
              <p className="mb-6 text-white/90 text-lg">
                Let's work together to achieve your digital marketing goals
              </p>
              <Link
                href="/consultation"
                className="inline-block px-8 py-3 bg-white text-primary font-medium rounded-md shadow-md hover:shadow-lg transition-all hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
