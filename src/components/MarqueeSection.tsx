import React from 'react';

const items = [
  'Web Development',
  'Digital Marketing',
  'Graphic Design',
  'SEO Services',
  'Social Media',
  'Video Production',
];

export default function MarqueeSection() {
  // Duplicate for seamless loop
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="bg-primary py-5 overflow-hidden marquee-wrapper select-none">
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span className="text-white/80 text-xs font-semibold tracking-label uppercase whitespace-nowrap px-6">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-accent/60 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
