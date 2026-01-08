'use client';
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, Palette, Code, Layers, Sparkles } from 'lucide-react';

export default function PortfolioPage() {
    const webProjects = [
        {
            id: 1,
            name: 'Harris Hawk Security',
            url: 'https://harrishawksecurity.co.ke',
            description: 'Professional security services website with modern design and user-friendly navigation.',
            image: '/images/harria-hawk.png',
        },
        {
            id: 2,
            name: 'Rivaton Translators',
            url: 'https://www.rivatontranslators.com',
            description: 'Multi-language translation platform with streamlined booking system.',
            image: '/images/rivaton.png',
        },
        {
            id: 3,
            name: 'Kuza Initiative',
            url: 'https://www.kuzainitiative.or.ke',
            description: 'Youth empowerment organization showcasing programs and impact.',
            image: '/images/kuza.png',
        },
    ];

    const graphicProjects = [
        { id: 1, image: '/images/Frendly-Marqeter-portfolio-1.png' },
        { id: 2, image: '/images/Frendly-Marqeter-portfolio-2.png' },
        { id: 3, image: '/images/Frendly-Marqeter-portfolio-3.png' },
        { id: 5, image: '/images/Frendly-Marqeter-portfolio-5.png' },
        { id: 7, image: '/images/Frendly-Marqeter-portfolio-7.png' },
        { id: 8, image: '/images/Frendly-Marqeter-portfolio-8.png' },
        { id: 9, image: '/images/Frendly-Marqeter-portfolio-9.png' },
        { id: 10, image: '/images/Frendly-Marqeter-portfolio-10.png' },
    ];

    return (
        <div>
            <Navbar />

            {/* Hero Section - Split Layout */}
            <section className="pt-24 bg-primary">
                <div className="grid md:grid-cols-2 min-h-[600px]">
                    {/* Text Side */}
                    <div className="p-12 md:p-20 flex flex-col justify-center text-white">
                        <motion.span
                            className="inline-block text-accent font-bold uppercase text-sm mb-4 tracking-wider w-fit"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Our Work
                        </motion.span>

                        <motion.h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            PROJECTS THAT<br />
                            <span className="text-accent">MAKE AN</span><br />
                            <span className="text-white">IMPACT.</span>
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Explore our successful web design and graphic design projects that helped brands grow and stand out.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Link
                                href="/consultation"
                                className="inline-flex items-center px-8 py-4 bg-accent text-primary font-bold text-lg hover:bg-white hover:text-primary transition-all w-fit"
                            >
                                START YOUR PROJECT
                                <ExternalLink className="w-5 h-5 ml-2" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Video Side */}
                    <div className="relative min-h-[600px] bg-white overflow-hidden">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                        >
                            <source src="/images/4K Digital Agency Video.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </section>

            {/* Features - Color Blocks */}
            <section className="py-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-4">
                    {/* Block 1 - Teal */}
                    <motion.div
                        className="bg-primary text-white p-8 md:p-12 min-h-[300px] flex flex-col justify-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <Code className="w-12 h-12 text-accent mb-4" />
                        <h3 className="text-2xl font-bold mb-3">Web Design</h3>
                        <p className="text-white/90">
                            3+ successful websites for diverse businesses across Kenya.
                        </p>
                    </motion.div>

                    {/* Block 2 - White */}
                    <motion.div
                        className="bg-white text-primary p-8 md:p-12 min-h-[300px] flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-100"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Palette className="w-12 h-12 text-accent mb-4" />
                        <h3 className="text-2xl font-bold mb-3">Graphic Design</h3>
                        <p className="text-primary/80">
                            8+ brand identity and marketing designs that convert.
                        </p>
                    </motion.div>

                    {/* Block 3 - Gold */}
                    <motion.div
                        className="bg-accent text-primary p-8 md:p-12 min-h-[300px] flex flex-col justify-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Layers className="w-12 h-12 text-white mb-4" />
                        <h3 className="text-2xl font-bold mb-3">Full Service</h3>
                        <p className="text-primary/90">
                            End-to-end digital solutions from concept to delivery.
                        </p>
                    </motion.div>

                    {/* Block 4 - Cream */}
                    <motion.div
                        className="bg-light text-primary p-8 md:p-12 min-h-[300px] flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-gray-200"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <Sparkles className="w-12 h-12 text-accent mb-4" />
                        <h3 className="text-2xl font-bold mb-3">Creative Excellence</h3>
                        <p className="text-primary/80">
                            Award-worthy designs that capture attention and drive results.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Web Design Projects - Cream Background */}
            <section className="py-20 bg-light">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                            WEB DESIGN
                        </h2>
                        <div className="w-24 h-1 bg-accent mx-auto mt-4" />
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {webProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all group"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                            >
                                {/* Project Image */}
                                <div className="relative h-80 overflow-hidden">
                                    <Image
                                        src={project.image}
                                        alt={project.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Link
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 bg-accent text-primary font-bold rounded-md hover:bg-white transition-colors flex items-center gap-2"
                                        >
                                            Visit Site
                                            <ExternalLink className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </div>

                                {/* Project Info */}
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                                        {project.name}
                                    </h3>
                                    <p className="text-gray-700 mb-4">{project.description}</p>
                                    <Link
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 font-bold text-primary group-hover:text-accent transition-colors"
                                    >
                                        View Project
                                        <ExternalLink className="w-5 h-5" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Graphic Design Projects - White Background */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                            GRAPHIC DESIGN
                        </h2>
                        <div className="w-24 h-1 bg-accent mx-auto mt-4" />
                    </motion.div>

                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {graphicProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className="relative aspect-square bg-light rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8 }}
                            >
                                <Image
                                    src={project.image}
                                    alt={`Graphic Design ${project.id}`}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA - Gold Background */}
            <section className="bg-accent text-primary py-32">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                        NEXT PROJECT:<br />
                        <span className="text-white">YOURS.</span>
                    </h2>
                    <p className="text-xl text-primary/80 mb-12 max-w-2xl mx-auto">
                        Ready to create something amazing? Let's bring your vision to life with stunning design.
                    </p>
                    <Link
                        href="/consultation"
                        className="inline-flex items-center justify-center px-12 py-5 bg-primary text-white font-bold text-lg hover:bg-white hover:text-primary transition-all group"
                    >
                        Book Free Consultation
                        <ExternalLink className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
