'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon, MenuIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  isHomepage?: boolean;
}

const Navbar = ({ isHomepage = false }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // For non-homepage, always show white background
  const shouldBeWhite = !isHomepage || isScrolled;

  // Check if link is active
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return <motion.header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${shouldBeWhite ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`} initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    duration: 0.5
  }}>
    <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logos/logos.png"
            alt="Frendly MarQeter Logo"
            width={180}
            height={60}
            priority
            className="h-12 w-auto"
          />
        </Link>
      </div>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        <Link href="/about" className={`font-medium hover:text-accent transition-colors relative ${shouldBeWhite ? 'text-charcoal' : 'text-white'} ${isActive('/about') ? 'text-primary' : ''}`}>
          Who We Are
          {isActive('/about') && (
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
              layoutId="navbar-indicator"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </Link>
        <div className="relative">
          <button className={`flex items-center font-medium hover:text-accent transition-colors relative ${shouldBeWhite ? 'text-charcoal' : 'text-white'} ${pathname.startsWith('/services') ? 'text-primary' : ''}`} onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}>
            Services <ChevronDownIcon className="ml-1 w-4 h-4" />
            {pathname.startsWith('/services') && (
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                layoutId="navbar-indicator"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
          {servicesDropdownOpen && <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
            <Link href="/services/web-development" className="block px-4 py-2 hover:bg-light hover:text-accent transition-colors">
              Web Development
            </Link>
            <Link href="/services/digital-marketing" className="block px-4 py-2 hover:bg-light hover:text-accent transition-colors">
              Digital Marketing
            </Link>
            <Link href="/services/graphic-design" className="block px-4 py-2 hover:bg-light hover:text-accent transition-colors">
              Graphic Design
            </Link>
            <Link href="/services/video-production" className="block px-4 py-2 hover:bg-light hover:text-accent transition-colors">
              Video Production
            </Link>
            <Link href="/services/social-media" className="block px-4 py-2 hover:bg-light hover:text-accent transition-colors">
              Social Media
            </Link>
            <Link href="/services/seo" className="block px-4 py-2 hover:bg-light hover:text-accent transition-colors">
              SEO
            </Link>
          </div>}
        </div>
        <Link href="/portfolio" className={`font-medium hover:text-accent transition-colors relative ${shouldBeWhite ? 'text-charcoal' : 'text-white'} ${isActive('/portfolio') ? 'text-primary' : ''}`}>
          Portfolio
          {isActive('/portfolio') && (
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
              layoutId="navbar-indicator"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </Link>
        <Link href="/blog" className={`font-medium hover:text-accent transition-colors relative ${shouldBeWhite ? 'text-charcoal' : 'text-white'} ${isActive('/blog') ? 'text-primary' : ''}`}>
          Blogs
          {isActive('/blog') && (
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
              layoutId="navbar-indicator"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </Link>
        <Link href="/consultation" className="ml-4 px-6 py-2 bg-accent text-charcoal font-medium  hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-sm">
          Free Consultation
        </Link>
      </nav>
      {/* Mobile Menu Button */}
      <button className={`md:hidden transition-colors ${shouldBeWhite ? 'text-charcoal' : 'text-white'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
        <Link href="/about" className="font-medium py-2 hover:text-accent transition-colors">
          Who We Are
        </Link>
        <div>
          <button className="flex items-center font-medium w-full text-left py-2 hover:text-accent transition-colors" onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}>
            Services <ChevronDownIcon className="ml-1 w-4 h-4" />
          </button>
          {servicesDropdownOpen && <div className="pl-4 mt-2 space-y-2">
            <Link href="/services/web-development" className="block py-1 hover:text-accent transition-colors">
              Web Development
            </Link>
            <Link href="/services/digital-marketing" className="block py-1 hover:text-accent transition-colors">
              Digital Marketing
            </Link>
            <Link href="/services/graphic-design" className="block py-1 hover:text-accent transition-colors">
              Graphic Design
            </Link>
            <Link href="/services/video-production" className="block py-1 hover:text-accent transition-colors">
              Video Production
            </Link>
            <Link href="/services/social-media" className="block py-1 hover:text-accent transition-colors">
              Social Media
            </Link>
            <Link href="/services/seo" className="block py-1 hover:text-accent transition-colors">
              SEO
            </Link>
          </div>}
        </div>
        <Link href="/#portfolio" className="font-medium py-2 hover:text-accent transition-colors">
          Portfolio
        </Link>
        <Link href="/blog" className="font-medium py-2 hover:text-accent transition-colors">
          Blogs
        </Link>
        <Link href="/consultation" className="px-6 py-2 bg-accent text-charcoal font-medium hover:bg-opacity-90 transition-all text-center">
          Free Consultation
        </Link>
      </div>
    </motion.div>}
  </motion.header>;
};
export default Navbar;