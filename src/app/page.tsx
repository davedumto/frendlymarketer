import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import BlogSection from '../components/BlogSection';
import FinalCTASection from '../components/FinalCTASection';
import TestimonialSection from '../components/TestimonialSection';

// Fetch recent posts from both WordPress and local database
async function getRecentPosts(count: number) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/all`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return [];
    }

    const allPosts = await response.json();
    return allPosts.slice(0, count); // Get first N posts (already sorted by date)
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    return [];
  }
}

export default async function Home() {
  const posts = await getRecentPosts(3);

  // Hardcoded testimonials
  const testimonials = [
    {
      id: '1',
      title: 'Bernard',
      content: 'Thanks to the exceptional SEO services provided by Frendly MarQeter, our online visibility skyrocketed. Their strategic approach and attention to detail helped us climb the ranks, driving significant organic traffic to our website.',
      testimonialFields: {
        clientName: 'Bernard',
        clientPosition: 'Customer',
        clientCompany: '',
        rating: 5
      }
    },
    {
      id: '2',
      title: 'Clever',
      content: 'I was thoroughly impressed by Frendly MarQeter\'s digital marketing expertise! Their creative strategies, timely execution, and clear understanding of our goals helped us reach a wider audience and achieve measurable growth online.',
      testimonialFields: {
        clientName: 'Clever',
        clientPosition: 'Customer',
        clientCompany: '',
        rating: 5
      }
    },
    {
      id: '3',
      title: 'Silvia',
      content: 'Working with Frendly MarQeter on our website development was an absolute pleasure! Their team not only possessed technical prowess but also a keen understanding of our brand and objectives.',
      testimonialFields: {
        clientName: 'Silvia',
        clientPosition: 'Customer',
        clientCompany: '',
        rating: 5
      }
    }
  ];

  return (
    <div className="bg-white">
      <Navbar isHomepage={true} />

      {/* Hero Section with Video Background */}
      <HeroSection />

      {/* Services Section - Color Block Style */}
      <ServicesSection />

      {/* Why Choose Us - Split Section */}
      <WhyChooseUsSection />

      {/* Blog Section */}
      <section className="bg-light py-20">
        <BlogSection posts={posts} />
      </section>

      {/* Testimonials Section */}
      <TestimonialSection testimonials={testimonials} />

      {/* Final CTA Section */}
      <FinalCTASection />

      <Footer />
    </div>
  );
}