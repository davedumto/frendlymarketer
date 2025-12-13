'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon, MenuIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <motion.header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`} initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    duration: 0.5
  }}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="flex items-center">
            <Image
              src="/images/logos/logo.png"
              alt="Frendly MarQeter Logo"
              width={180}
              height={60}
              priority
              className="h-12 w-auto"
            />
          </a>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className={`font-medium hover:text-primary transition-colors ${isScrolled ? 'text-charcoal' : 'text-white'}`}>
            Who We Are
          </a>
          <div className="relative">
            <button className={`flex items-center font-medium hover:text-primary transition-colors ${isScrolled ? 'text-charcoal' : 'text-white'}`} onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}>
              Services <ChevronDownIcon className="ml-1 w-4 h-4" />
            </button>
            {servicesDropdownOpen && <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                <a href="#" className="block px-4 py-2 hover:bg-light hover:text-primary transition-colors">
                  Web Development
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-light hover:text-primary transition-colors">
                  Digital Marketing
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-light hover:text-primary transition-colors">
                  Graphic Design
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-light hover:text-primary transition-colors">
                  Video Production
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-light hover:text-primary transition-colors">
                  Social Media
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-light hover:text-primary transition-colors">
                  SEO
                </a>
              </div>}
          </div>
          <a href="#" className={`font-medium hover:text-primary transition-colors ${isScrolled ? 'text-charcoal' : 'text-white'}`}>
            Portfolio
          </a>
          <a href="#" className={`font-medium hover:text-primary transition-colors ${isScrolled ? 'text-charcoal' : 'text-white'}`}>
            Blogs
          </a>
          <a href="#" className="ml-4 px-6 py-2 bg-accent text-charcoal font-medium rounded-md hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-sm">
            Free Consultation
          </a>
        </nav>
        {/* Mobile Menu Button */}
        <button className={`md:hidden transition-colors ${isScrolled ? 'text-charcoal' : 'text-white'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && <motion.div className="md:hidden bg-white shadow-lg" initial={{
      opacity: 0,
      height: 0
    }} animate={{
      opacity: 1,
      height: 'auto'
    }} exit={{
      opacity: 0,
      height: 0
    }} transition={{
      duration: 0.3
    }}>
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#" className="font-medium py-2 hover:text-primary transition-colors">
              Who We Are
            </a>
            <div>
              <button className="flex items-center font-medium w-full text-left py-2 hover:text-primary transition-colors" onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}>
                Services <ChevronDownIcon className="ml-1 w-4 h-4" />
              </button>
              {servicesDropdownOpen && <div className="pl-4 mt-2 space-y-2">
                  <a href="#" className="block py-1 hover:text-primary transition-colors">
                    Web Development
                  </a>
                  <a href="#" className="block py-1 hover:text-primary transition-colors">
                    Digital Marketing
                  </a>
                  <a href="#" className="block py-1 hover:text-primary transition-colors">
                    Graphic Design
                  </a>
                  <a href="#" className="block py-1 hover:text-primary transition-colors">
                    Video Production
                  </a>
                  <a href="#" className="block py-1 hover:text-primary transition-colors">
                    Social Media
                  </a>
                  <a href="#" className="block py-1 hover:text-primary transition-colors">
                    SEO
                  </a>
                </div>}
            </div>
            <a href="#" className="font-medium py-2 hover:text-primary transition-colors">
              Portfolio
            </a>
            <a href="#" className="font-medium py-2 hover:text-primary transition-colors">
              Blogs
            </a>
            <a href="#" className="px-6 py-2 bg-accent text-charcoal font-medium rounded-md hover:bg-opacity-90 transition-all text-center">
              Free Consultation
            </a>
          </div>
        </motion.div>}
    </motion.header>;
};
export default Navbar;