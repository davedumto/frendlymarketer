'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

interface Testimonial {
    id: string;
    title: string;
    content: string;
    testimonialFields?: {
        clientName?: string;
        clientPosition?: string;
        clientCompany?: string;
        rating?: number;
    };
}

interface TestimonialSectionProps {
    testimonials: Testimonial[];
}

const TestimonialSection = ({ testimonials = [] }: TestimonialSectionProps) => {
    // Strip HTML tags from content
    const stripHtml = (html: string) => {
        return html.replace(/<[^>]*>/g, '');
    };

    return (
        <section className="py-20 bg-primary">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        WHAT OUR CLIENTS SAY
                    </motion.h2>
                    <motion.div
                        className="w-24 h-1 bg-accent mx-auto mt-4"
                        initial={{ width: 0 }}
                        whileInView={{ width: 96 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    />
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {testimonials.slice(0, 3).map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            className="bg-white p-8 shadow-lg relative"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {/* Quote Icon */}
                            <Quote className="w-10 h-10 text-accent/20 absolute top-6 right-6" />

                            {/* Rating Stars */}
                            {testimonial.testimonialFields?.rating && (
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < (testimonial.testimonialFields?.rating || 0)
                                                ? 'text-accent fill-accent'
                                                : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Testimonial Content */}
                            <p className="text-gray-700 mb-6 leading-relaxed line-clamp-4">
                                "{stripHtml(testimonial.content)}"
                            </p>

                            {/* Client Info */}
                            <div className="border-t border-gray-100 pt-6">
                                <h4 className="font-bold text-primary">
                                    {testimonial.testimonialFields?.clientName || testimonial.title}
                                </h4>
                                {testimonial.testimonialFields?.clientPosition && (
                                    <p className="text-sm text-gray-600">
                                        {testimonial.testimonialFields.clientPosition}
                                        {testimonial.testimonialFields.clientCompany &&
                                            ` at ${testimonial.testimonialFields.clientCompany}`}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {testimonials.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-white/70 text-lg">No testimonials available yet.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TestimonialSection;
