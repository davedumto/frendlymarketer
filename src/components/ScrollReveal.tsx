'use client';
import { useEffect } from 'react';

/**
 * ScrollReveal — zero-render client component.
 * Attaches a single IntersectionObserver that watches all
 * .js-reveal / .js-reveal-left / .js-reveal-right elements
 * and adds .is-visible when they enter the viewport.
 * CSS in landing.css handles the actual transitions.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -64px 0px' }
    );

    document
      .querySelectorAll('.js-reveal, .js-reveal-left, .js-reveal-right')
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
