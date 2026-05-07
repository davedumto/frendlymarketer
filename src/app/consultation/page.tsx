'use client';
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ScrollReveal from '../../components/ScrollReveal';
import ContactForm from '../../components/ContactForm';
import LocationMap from '../../components/LocationMap';

export default function ConsultationPage() {
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
            Free Consultation
          </span>
          <h1
            className="js-reveal font-bold leading-[0.88] tracking-display text-white mb-6"
            style={{ fontSize: 'clamp(3.2rem, 8.5vw, 9rem)' }}
            data-delay="1"
          >
            LET&apos;S TALK<br />
            <span className="text-accent">ABOUT YOUR BRAND.</span>
          </h1>
          <p className="js-reveal text-white/45 text-base leading-relaxed max-w-md" data-delay="2">
            Tell us about your project. We&apos;ll respond within 24 hours with ideas on how we can help you grow.
          </p>
        </div>
      </section>

      {/* ── Main content: info left + form right ── */}
      <section className="bg-white">
        <div className="grid lg:grid-cols-2">

          {/* Left: contact info + map */}
          <div className="bg-primary p-12 md:p-16 lg:p-20 space-y-12">
            <div>
              <span className="text-accent/60 text-xs font-semibold tracking-label uppercase block mb-8">Get In Touch</span>
              <h2
                className="js-reveal font-bold leading-[0.9] tracking-display text-white mb-12"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)' }}
              >
                LET&apos;S WORK<br /><span className="text-accent">TOGETHER.</span>
              </h2>

              <div className="space-y-8">
                <div className="js-reveal border-t border-white/10 pt-6">
                  <span className="text-accent/70 text-xs font-semibold tracking-label uppercase block mb-2">Email</span>
                  <a href="mailto:info@frendlymarqeter.com" className="text-white text-lg font-medium hover:text-accent transition-colors">
                    info@frendlymarqeter.com
                  </a>
                </div>

                <div className="js-reveal border-t border-white/10 pt-6" data-delay="1">
                  <span className="text-accent/70 text-xs font-semibold tracking-label uppercase block mb-2">Nairobi Office Phone</span>
                  <a href="tel:140959665" className="text-white text-lg font-medium hover:text-accent transition-colors">
                    140959665
                  </a>
                </div>

                <div className="js-reveal border-t border-white/10 pt-6" data-delay="2">
                  <span className="text-accent/70 text-xs font-semibold tracking-label uppercase block mb-2">Office</span>
                  <p className="text-white/70 leading-relaxed">
                    Keystones Park, Riverside Drive<br />
                    Baraza Media Lab<br />
                    Nairobi, Kenya
                  </p>
                </div>

                <div className="js-reveal border-t border-white/10 pt-6" data-delay="3">
                  <span className="text-accent/70 text-xs font-semibold tracking-label uppercase block mb-2">Hours</span>
                  <p className="text-white/70 leading-relaxed">
                    Monday – Friday: 9AM – 6PM<br />
                    Weekend: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="js-reveal overflow-hidden h-[360px] border border-white/10" data-delay="4">
              <LocationMap
                address="Keystones Park, Riverside Drive, Baraza Media Lab offices, Nairobi, Kenya"
                email="info@frendlymarqeter.com"
                hours="Mon-Fri: 9AM - 6PM"
              />
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-light p-12 md:p-16 lg:p-20">
            <span className="text-accent/60 text-xs font-semibold tracking-label uppercase block mb-8">Send a Message</span>
            <h3
              className="js-reveal font-bold leading-[0.9] tracking-display text-primary mb-10"
              style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.5rem)' }}
            >
              TELL US ABOUT<br />YOUR PROJECT.
            </h3>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── Trust indicators ── */}
      <section className="bg-white py-0 border-t border-primary/10">
        <div className="grid md:grid-cols-3">
          <div className="js-reveal border-r border-primary/10 last:border-r-0 p-12 md:p-16">
            <span
              className="block font-bold leading-none tracking-display text-accent mb-3"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}
            >
              24h
            </span>
            <h3 className="text-lg font-bold text-primary mb-2">Fast Response</h3>
            <p className="text-charcoal/55 text-sm leading-relaxed">We respond to all enquiries within 24 hours, guaranteed.</p>
          </div>

          <div className="js-reveal border-r border-primary/10 last:border-r-0 p-12 md:p-16" data-delay="1">
            <span
              className="block font-bold leading-none tracking-display text-accent mb-3"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}
            >
              25+
            </span>
            <h3 className="text-lg font-bold text-primary mb-2">Brands Served</h3>
            <p className="text-charcoal/55 text-sm leading-relaxed">Our team brings deep experience from dozens of client partnerships.</p>
          </div>

          <div className="js-reveal p-12 md:p-16" data-delay="2">
            <span
              className="block font-bold leading-none tracking-display text-accent mb-3"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}
            >
              Free
            </span>
            <h3 className="text-lg font-bold text-primary mb-2">No Obligation</h3>
            <p className="text-charcoal/55 text-sm leading-relaxed">Your initial consultation is completely free — no commitment required.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
