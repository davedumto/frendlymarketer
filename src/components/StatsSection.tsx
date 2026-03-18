'use client';
import React, { useEffect, useRef } from 'react';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  caption: string;
}

const stats: StatItem[] = [
  { value: 10,  suffix: '+', label: 'Years of Experience',  caption: 'In the industry'        },
  { value: 123, suffix: '+', label: 'Happy Clients',        caption: 'Brands grown & scaled'  },
  { value: 145, suffix: '+', label: 'Projects Delivered',   caption: 'End-to-end'              },
  { value: 15,  suffix: '+', label: 'Team Members',         caption: 'In your corner'          },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !doneRef.current) {
          doneRef.current = true;
          observer.unobserve(el);

          let start: number | null = null;
          const duration = 2000;

          const step = (ts: number) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased    = 1 - Math.pow(1 - progress, 3);
            el.textContent  = Math.floor(eased * value) + suffix;
            if (progress < 1) requestAnimationFrame(step);
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, suffix]);

  return (
    <span ref={spanRef} className="stat-number">
      0{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-white py-20 lg:py-28 border-t border-b border-charcoal/[0.06]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-y-2 lg:divide-y-0 lg:divide-x divide-charcoal/[0.06]">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="js-reveal px-0 lg:px-12 py-10 lg:py-0 first:lg:pl-0 last:lg:pr-0"
              data-delay={String(i + 1)}
            >
              <div
                className="font-bold text-dark leading-none tracking-display mb-2"
                style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)' }}
              >
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-charcoal/80 text-sm font-semibold mb-1">
                {stat.label}
              </p>
              <p className="text-charcoal/35 text-xs">
                {stat.caption}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
