import React from 'react';
import Navbar              from '../components/Navbar';
import Footer              from '../components/Footer';
import HeroSection         from '../components/HeroSection';
import MarqueeSection      from '../components/MarqueeSection';
import ServicesSection     from '../components/ServicesSection';
import StatsSection        from '../components/StatsSection';
import WhyChooseUsSection  from '../components/WhyChooseUsSection';
import TestimonialSection  from '../components/TestimonialSection';
import BlogSection         from '../components/BlogSection';
import PartnersSection     from '../components/PartnersSection';
import FinalCTASection     from '../components/FinalCTASection';
import ScrollReveal        from '../components/ScrollReveal';
import prisma              from '../lib/prisma';
import { getAllBlogPosts } from '../lib/blog';

export const revalidate = 60;

async function getRecentPosts(count: number) {
  try {
    const all = await getAllBlogPosts();
    return all.slice(0, count);
  } catch {
    return [];
  }
}

const hardcodedPartners = [
  { name: 'Adonar',           src: '/images/logos/adonar.png' },
  { name: 'BRV',              src: '/images/logos/brv.png' },
  { name: 'Connected Africa', src: '/images/logos/connected-africa.png' },
  { name: 'Frendly Partner',  src: '/images/logos/FRENDLY-PARTNER.webp' },
];

async function getPartners() {
  try {
    const dbPartners = await prisma.partner.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    const mapped = dbPartners.map((p) => ({ name: p.name, src: p.logoUrl }));
    return [...mapped, ...hardcodedPartners];
  } catch {
    return hardcodedPartners;
  }
}

const mockTestimonials = [
  {
    id: 'mock-1',
    title: 'Bernard',
    content:
      'Thanks to the exceptional SEO services provided by Frendly MarQeter, our online visibility skyrocketed. Their strategic approach and attention to detail helped us climb the ranks, driving significant organic traffic to our website.',
    testimonialFields: { clientName: 'Bernard', clientPosition: 'Founder', clientCompany: '', rating: 5 },
  },
  {
    id: 'mock-2',
    title: 'Clever',
    content:
      "I was thoroughly impressed by Frendly MarQeter's digital marketing expertise! Their creative strategies, timely execution, and clear understanding of our goals helped us reach a wider audience and achieve measurable growth online.",
    testimonialFields: { clientName: 'Clever', clientPosition: 'Marketing Director', clientCompany: '', rating: 5 },
  },
  {
    id: 'mock-3',
    title: 'Silvia',
    content:
      "Working with Frendly MarQeter on our website development was an absolute pleasure! Their team not only possessed technical prowess but also a keen understanding of our brand and objectives.",
    testimonialFields: { clientName: 'Silvia', clientPosition: 'CEO', clientCompany: '', rating: 5 },
  },
];

async function getTestimonials() {
  try {
    const dbTestimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    const mapped = dbTestimonials.map((t) => ({
      id: t.id,
      title: t.clientName,
      content: t.content,
      testimonialFields: {
        clientName: t.clientName,
        clientPosition: t.clientPosition || undefined,
        clientCompany: t.clientCompany || undefined,
        rating: t.rating,
      },
    }));
    return mapped.length > 0 ? [...mapped, ...mockTestimonials] : mockTestimonials;
  } catch {
    return mockTestimonials;
  }
}

export default async function Home() {
  const [posts, testimonials, partners] = await Promise.all([getRecentPosts(3), getTestimonials(), getPartners()]);

  return (
    <>
      {/* Vanilla IntersectionObserver — zero UI, activates .js-reveal classes */}
      <ScrollReveal />

      <Navbar isHomepage={true} />

      {/* 1 — Hero */}
      <HeroSection />

      {/* 2 — Services ticker */}
      <MarqueeSection />

      {/* 3 — What we do */}
      <ServicesSection />

      {/* 4 — Stats strip */}
      <StatsSection />

      {/* 5 — Partners / clients */}
      <PartnersSection partners={partners} />

      {/* 6 — Why choose us */}
      <WhyChooseUsSection />

      {/* 7 — Testimonials */}
      <TestimonialSection testimonials={testimonials} />

      {/* 8 — Blog / Insights */}
      <BlogSection posts={posts} />

      {/* 9 — Final CTA */}
      <FinalCTASection />

      <Footer />
    </>
  );
}
