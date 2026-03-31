'use client';
import React, { useEffect, useState, useRef } from 'react';
import { ChevronDownIcon, MenuIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  isHomepage?: boolean;
}

export default function Navbar({ isHomepage = false }: NavbarProps) {
  const [isScrolled, setIsScrolled]             = useState(false);
  const [mobileOpen, setMobileOpen]             = useState(false);
  const [servicesOpen, setServicesOpen]         = useState(false);
  const dropdownRef                             = useRef<HTMLDivElement>(null);
  const pathname                                = usePathname();

  /* ── scroll detection ── */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── close dropdown when clicking outside ── */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  /* ── close mobile menu on route change ── */
  useEffect(() => { setMobileOpen(false); setServicesOpen(false); }, [pathname]);

  const onWhite   = !isHomepage || isScrolled;
  const isActive  = (path: string) => path === '/' ? pathname === '/' : pathname.startsWith(path);

  const navLinkBase = `relative font-medium text-sm transition-colors duration-200`;
  const navLinkColor = onWhite ? 'text-charcoal hover:text-primary' : 'text-white/90 hover:text-white';

  return (
    <header
      className={`site-nav fixed top-0 left-0 right-0 z-50 ${
        onWhite
          ? 'bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full px-6 lg:px-10 xl:px-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/images/logos/logos.png"
            alt="Frendly MarQeter"
            width={160}
            height={52}
            priority
            className={`h-10 w-auto transition-all duration-300 ${!onWhite ? 'brightness-0 invert' : ''}`}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">

          <Link href="/about" className={`${navLinkBase} ${navLinkColor} ${isActive('/about') ? '!text-primary' : ''}`}>
            Who We Are
            <span className={`absolute -bottom-0.5 left-0 right-0 h-px bg-accent origin-left transition-transform duration-300 ${isActive('/about') ? 'scale-x-100' : 'scale-x-0'}`} />
          </Link>

          {/* Services dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setServicesOpen((v) => !v)}
              className={`${navLinkBase} ${navLinkColor} flex items-center gap-1 ${pathname.startsWith('/services') ? '!text-primary' : ''}`}
            >
              Services
              <ChevronDownIcon
                className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
              />
              <span className={`absolute -bottom-0.5 left-0 right-0 h-px bg-accent origin-left transition-transform duration-300 ${pathname.startsWith('/services') ? 'scale-x-100' : 'scale-x-0'}`} />
            </button>

            <div className={`nav-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-white shadow-xl border border-gray-100/80 py-1.5 ${servicesOpen ? 'is-open' : ''}`}>
              {[
                { href: '/services/web-development',   label: 'Web Development'  },
                { href: '/services/digital-marketing', label: 'Digital Marketing' },
                { href: '/services/graphic-design',    label: 'Graphic Design'    },
                { href: '/services/video-production',  label: 'Video Production'  },
                { href: '/services/social-media',      label: 'Social Media'      },
                { href: '/services/seo',               label: 'SEO'               },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="block px-4 py-2.5 text-sm text-charcoal hover:bg-light hover:text-primary transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/portfolio" className={`${navLinkBase} ${navLinkColor} ${isActive('/portfolio') ? '!text-primary' : ''}`}>
            Portfolio
            <span className={`absolute -bottom-0.5 left-0 right-0 h-px bg-accent origin-left transition-transform duration-300 ${isActive('/portfolio') ? 'scale-x-100' : 'scale-x-0'}`} />
          </Link>

          <Link href="/blog" className={`${navLinkBase} ${navLinkColor} ${isActive('/blog') ? '!text-primary' : ''}`}>
            Blogs
            <span className={`absolute -bottom-0.5 left-0 right-0 h-px bg-accent origin-left transition-transform duration-300 ${isActive('/blog') ? 'scale-x-100' : 'scale-x-0'}`} />
          </Link>

          <Link
            href="/consultation"
            className="btn-shimmer ml-2 px-5 py-2.5 bg-accent text-dark text-sm font-semibold tracking-wide hover:bg-accent/90 transition-colors"
          >
            Free Consultation
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className={`md:hidden p-1 transition-colors ${onWhite ? 'text-charcoal' : 'text-white'}`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu md:hidden bg-white border-t border-gray-100 ${mobileOpen ? 'is-open' : ''}`}>
        <div className="w-full px-6 py-5 flex flex-col gap-1">
          <Link href="/about" className="py-2.5 text-sm font-medium text-charcoal hover:text-primary transition-colors">
            Who We Are
          </Link>

          <div>
            <button
              onClick={() => setServicesOpen((v) => !v)}
              className="flex items-center gap-1 py-2.5 text-sm font-medium text-charcoal hover:text-primary w-full text-left transition-colors"
            >
              Services
              <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`mobile-menu pl-4 ${servicesOpen ? 'is-open' : ''}`}>
              {[
                { href: '/services/web-development',   label: 'Web Development'   },
                { href: '/services/digital-marketing', label: 'Digital Marketing'  },
                { href: '/services/graphic-design',    label: 'Graphic Design'     },
                { href: '/services/video-production',  label: 'Video Production'   },
                { href: '/services/social-media',      label: 'Social Media'       },
                { href: '/services/seo',               label: 'SEO'                },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="block py-2 text-sm text-charcoal/70 hover:text-primary transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/portfolio" className="py-2.5 text-sm font-medium text-charcoal hover:text-primary transition-colors">
            Portfolio
          </Link>
          <Link href="/blog" className="py-2.5 text-sm font-medium text-charcoal hover:text-primary transition-colors">
            Insights
          </Link>
          <Link
            href="/consultation"
            className="mt-3 px-5 py-3 bg-accent text-dark text-sm font-semibold text-center tracking-wide hover:bg-accent/90 transition-colors"
          >
            Free Consultation
          </Link>
        </div>
      </div>
    </header>
  );
}
