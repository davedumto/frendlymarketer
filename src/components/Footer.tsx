import React from 'react';
import { MapPinIcon, MailIcon, PhoneIcon, FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from 'lucide-react';
import Image from 'next/image';
const Footer = () => {
  return <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-6">
              <Image
                src="/images/logos/logo.png"
                alt="Frendly MarQeter Logo"
                width={150}
                height={50}
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-white/80 mb-6 max-w-xs">
              We're a digital marketing agency dedicated to helping businesses
              grow through innovative digital strategies and creative solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/80 hover:text-accent transition-colors" aria-label="Facebook">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-accent transition-colors" aria-label="Twitter">
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-accent transition-colors" aria-label="Instagram">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-accent transition-colors" aria-label="LinkedIn">
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6">Important Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/80 hover:text-accent transition-colors">
                  Who We Are
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-accent transition-colors">
                  What We Offer
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-accent transition-colors">
                  Blogs
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-accent transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-accent transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6">What We Offer</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/80 hover:text-accent transition-colors">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-accent transition-colors">
                  Digital Marketing
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-accent transition-colors">
                  Graphic Design
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-accent transition-colors">
                  Video Production
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-accent transition-colors">
                  Social Media
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-accent transition-colors">
                  SEO
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPinIcon className="w-5 h-5 mr-3 text-accent shrink-0 mt-0.5" />
                <span className="text-white/80">
                  123 Marketing Street, Digital City, DC 10101
                </span>
              </li>
              <li className="flex items-center">
                <MailIcon className="w-5 h-5 mr-3 text-accent shrink-0" />
                <a href="mailto:info@frendlymarqeter.com" className="text-white/80 hover:text-accent transition-colors">
                  info@frendlymarqeter.com
                </a>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="w-5 h-5 mr-3 text-accent shrink-0" />
                <a href="tel:+11234567890" className="text-white/80 hover:text-accent transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Frendly MarQeter. All rights
              reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/70 text-sm hover:text-accent transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white/70 text-sm hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/70 text-sm hover:text-accent transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;