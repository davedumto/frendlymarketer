import React from 'react';
import Navbar from '../components/Navbar';
import HeroSlider from '../components/HeroSlider';
import StatsStrip from '../components/StatsStrip';
import AgencyIntro from '../components/AgencyIntro';
import ServicesGrid from '../components/ServicesGrid';
import WhyChooseUs from '../components/WhyChooseUs';
import CTABand from '../components/CTABand';
import Portfolio from '../components/Portfolio';
import BlogSection from '../components/BlogSection';
import Testimonials from '../components/Testimonials';
import Partners from '../components/Partners';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <HeroSlider />
        <StatsStrip />
        <AgencyIntro />
        <ServicesGrid />
        <WhyChooseUs />
        <CTABand 
          heading="Ready to work with us?" 
          subheading="Let's transform your digital presence together." 
          buttonText="Get Started" 
        />
        <Portfolio />
        <BlogSection />
        <Testimonials />
        <Partners />
        <CTABand 
          heading="Join us on a journey of change and growth." 
          subheading="Experience the difference of working with a dedicated team of digital experts." 
          buttonText="Get Started" 
          darkBackground={true} 
        />
      </main>
      <Footer />
    </div>
  );
}