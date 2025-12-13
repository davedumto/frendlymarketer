'use client';
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AwardIcon, UsersIcon, FolderIcon, BriefcaseIcon } from 'lucide-react';
const stats = [{
  icon: <AwardIcon className="w-8 h-8 text-primary" />,
  value: 10,
  label: 'Years of Experience',
  suffix: '+'
}, {
  icon: <UsersIcon className="w-8 h-8 text-primary" />,
  value: 123,
  label: 'Happy Clients',
  suffix: '+'
}, {
  icon: <FolderIcon className="w-8 h-8 text-primary" />,
  value: 145,
  label: 'Projects',
  suffix: '+'
}, {
  icon: <BriefcaseIcon className="w-8 h-8 text-primary" />,
  value: 15,
  label: 'Experts',
  suffix: '+'
}];
const CountUp = ({
  end,
  suffix = ''
}: {
  end: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, {
    once: true,
    margin: '-100px'
  });
  useEffect(() => {
    if (!inView) return;
    let startTime: number;
    const duration = 2000;
    const startValue = 0;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(progress * (end - startValue) + startValue);
      setCount(currentCount);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, inView]);
  return <span ref={nodeRef} className="text-3xl font-bold text-charcoal">
      {count}
      {suffix}
    </span>;
};
const StatsStrip = () => {
  return <section className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => <motion.div key={index} className="bg-light rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: index * 0.1
        }} viewport={{
          once: true,
          margin: '-50px'
        }}>
              <div className="mb-4">{stat.icon}</div>
              <CountUp end={stat.value} suffix={stat.suffix} />
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
export default StatsStrip;