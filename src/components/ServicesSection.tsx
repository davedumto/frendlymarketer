'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon } from 'lucide-react';

interface ServiceBlockProps {
    href: string;
    title: string;
    description: string;
    bgColor: string;
    textColor: string;
    imageSrc: string;
    buttonBorderColor: string;
    buttonBgColor: string;
    buttonTextColor: string;
}

function ServiceBlock({ href, title, description, bgColor, textColor, imageSrc, buttonBorderColor, buttonBgColor, buttonTextColor }: ServiceBlockProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            href={href}
            className="group relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background Image */}
            <div className={`absolute inset-0 transition-opacity duration-500 z-0 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover"
                />
                {/* Dark Overlay on Image */}
                <div className="absolute inset-0 bg-black/70" />
            </div>

            {/* Content */}
            <div className={`${!isHovered ? bgColor : ''} ${textColor} p-12 md:p-16 min-h-[500px] flex flex-col justify-between relative z-10 transition-all duration-500`}>
                <div>
                    <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${isHovered ? 'text-white' : ''} transition-colors duration-300`}>
                        {title.split(' ').map((word, i) => (
                            <React.Fragment key={i}>
                                {word}{i === 0 && <br />}
                                {i > 0 && ' '}
                            </React.Fragment>
                        ))}
                    </h3>
                    <p className={`text-lg leading-relaxed ${isHovered ? 'text-white/90' : ''} transition-colors duration-300`}>
                        {description}
                    </p>
                </div>
                <div className={`flex items-center font-semibold group-hover:translate-x-2 transition-transform group-hover:text-accent px-6 py-3 border-2 ${buttonBorderColor} ${buttonBgColor} ${buttonTextColor} w-fit`}>
                    Explore Service
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                </div>
            </div>
        </Link>
    );
}

export default function ServicesSection() {
    return (
        <section className="py-0">
            <div className="grid md:grid-cols-3">
                {/* Service Block 1 - Web Development (WHITE to break up teal) */}
                <ServiceBlock
                    href="/services/web-development"
                    title="Web Development"
                    description="Build powerful, modern websites that convert visitors into customers with seamless user experiences."
                    bgColor="bg-white"
                    textColor="text-primary"
                    imageSrc="/images/Web Development Photo 1181675.jpg"
                    buttonBorderColor="border-primary"
                    buttonBgColor="bg-primary"
                    buttonTextColor="text-white"
                />

                {/* Service Block 2 - Digital Marketing */}
                <ServiceBlock
                    href="/services/digital-marketing"
                    title="Digital Marketing"
                    description="Data-driven strategies that amplify your brand and drive measurable growth across all digital channels."
                    bgColor="bg-primary"
                    textColor="text-white"
                    imageSrc="/images/Digital Marketing Photo.jpg"
                    buttonBorderColor="border-white"
                    buttonBgColor="bg-white"
                    buttonTextColor="text-primary"
                />

                {/* Service Block 3 - Graphic Design */}
                <ServiceBlock
                    href="/services/graphic-design"
                    title="Graphic Design"
                    description="Create visual identities that capture attention and communicate your brand message effectively."
                    bgColor="bg-accent"
                    textColor="text-primary"
                    imageSrc="/images/Graphic Design Photo 55570.jpg"
                    buttonBorderColor="border-primary"
                    buttonBgColor="bg-primary"
                    buttonTextColor="text-white"
                />
            </div>

            {/* More Services Row */}
            <div className="grid md:grid-cols-3">
                <Link href="/services/seo" className="group relative bg-light hover:bg-white transition-all p-12 border-t border-gray-200 overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                        <Image
                            src="/images/SEO Stock Photo Goumbik.jpg"
                            alt="SEO Services"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <h4 className="text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                                SEO Services
                            </h4>
                            <p className="text-gray-600">Dominate search rankings & drive organic traffic</p>
                        </div>
                        <div className="w-12 h-12 border-2 border-primary group-hover:border-primary group-hover:bg-primary flex items-center justify-center transition-all">
                            <ArrowRightIcon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                        </div>
                    </div>
                </Link>

                <Link href="/services/social-media" className="group relative bg-white hover:bg-light transition-all p-12 border-t border-l border-gray-200 overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                        <Image
                            src="/images/Social Media Photo 221179.jpg"
                            alt="Social Media"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <h4 className="text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                                Social Media
                            </h4>
                            <p className="text-gray-600">Build communities & drive engagement</p>
                        </div>
                        <div className="w-12 h-12  border-2 border-accent group-hover:bg-primary flex items-center justify-center transition-all">
                            <ArrowRightIcon className="w-5 h-5 text-accent transition-colors" />
                        </div>
                    </div>
                </Link>

                <Link href="/services/video-production" className="group relative bg-light hover:bg-white transition-all p-12 border-t border-l border-gray-200 overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                        <Image
                            src="/images/Video Production Photo.jpg"
                            alt="Video Production"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <h4 className="text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                                Video Production
                            </h4>
                            <p className="text-gray-600">Tell your story through compelling video</p>
                        </div>
                        <div className="w-12 h-12 border-2 border-primary group-hover:bg-primary flex items-center justify-center transition-all">
                            <ArrowRightIcon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    );
}
