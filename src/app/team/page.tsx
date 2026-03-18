'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FinalCTASection from '../../components/FinalCTASection';
import ScrollReveal from '../../components/ScrollReveal';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Linkedin } from 'lucide-react';

interface Department { id: string; name: string; order: number; }
interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string | null;
  instagram: string | null;
  linkedin: string | null;
  departmentId: string | null;
  department: Department | null;
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [memberRes, deptRes] = await Promise.all([fetch('/api/team'), fetch('/api/departments')]);
        if (memberRes.ok) setTeamMembers(await memberRes.json());
        if (deptRes.ok) setDepartments(await deptRes.json());
      } catch {
        // silently fall through to empty state
      } finally {
        setIsLoading(false);
      }
    }
    fetchAll();
  }, []);

  return (
    <div>
      <ScrollReveal />
      <Navbar />

      {/* ── Hero ── */}
      <section className="bg-dark pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(211,160,50,0.045) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 relative">
          <span className="js-reveal inline-block text-accent/60 text-xs font-semibold tracking-label uppercase mb-8">
            Our Team
          </span>
          <h1
            className="js-reveal font-bold leading-[0.88] tracking-display text-white mb-8"
            style={{ fontSize: 'clamp(3.2rem, 8.5vw, 9rem)' }}
            data-delay="1"
          >
            MEET THE<br />
            <span className="text-accent">CREATIVE MINDS.</span>
          </h1>
          <p className="js-reveal text-white/45 text-base leading-relaxed max-w-md mb-10" data-delay="2">
            A passionate team of digital experts dedicated to transforming your brand and driving your business forward.
          </p>
          <div className="js-reveal" data-delay="3">
            <Link
              href="/consultation"
              className="btn-shimmer inline-flex items-center gap-3 px-8 py-4 bg-accent text-dark font-semibold text-sm tracking-wide hover:bg-white transition-colors duration-300 group"
            >
              Work With Us
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Team members grouped by department ── */}
      <section className="bg-light py-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="js-reveal mb-16">
            <span className="text-accent/60 text-xs font-semibold tracking-label uppercase block mb-4">The People</span>
            <h2
              className="font-bold leading-[0.9] tracking-display text-primary"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
            >
              THE TEAM.
            </h2>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/10 border border-primary/10">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white animate-pulse">
                  <div className="aspect-[5/6] bg-primary/5" />
                  <div className="p-8 space-y-3">
                    <div className="h-4 bg-primary/5 rounded w-3/4" />
                    <div className="h-3 bg-primary/5 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-24 border border-primary/10">
              <span className="text-primary/20 text-6xl font-bold tracking-display block mb-6">FM</span>
              <p className="text-charcoal/40 text-sm tracking-label uppercase">Our team page is being updated. Check back soon.</p>
            </div>
          ) : (
            <div className="space-y-20">
              {[
                ...departments.map(dept => ({
                  key: dept.id,
                  label: dept.name,
                  members: teamMembers.filter(m => m.departmentId === dept.id),
                })),
                {
                  key: 'unassigned',
                  label: null,
                  members: teamMembers.filter(m => !m.departmentId),
                },
              ].filter(group => group.members.length > 0).map(group => (
                <div key={group.key}>
                  {/* Section heading */}
                  {group.label && (
                    <div className="js-reveal flex items-center gap-6 mb-10">
                      <div>
                        <span className="text-accent/60 text-xs font-semibold tracking-label uppercase block mb-1">Department</span>
                        <h3
                          className="font-bold leading-none tracking-display text-primary"
                          style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)' }}
                        >
                          {group.label.toUpperCase()}
                        </h3>
                      </div>
                      <div className="flex-1 h-px bg-primary/10" />
                    </div>
                  )}

                  {/* Members grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/10 border border-primary/10">
                    {group.members.map((member, index) => (
                      <div
                        key={member.id}
                        className="js-reveal bg-white group overflow-hidden"
                        data-delay={String((index % 3) + 1)}
                      >
                        {/* Photo */}
                        <div className="relative aspect-[5/6] overflow-hidden bg-primary/5">
                          {member.image ? (
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-primary/15 font-bold tracking-display" style={{ fontSize: '4rem' }}>FM</span>
                            </div>
                          )}
                          {(member.instagram || member.linkedin) && (
                            <div className="absolute inset-0 bg-primary/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                              <div className="flex gap-3">
                                {member.instagram && (
                                  <a href={member.instagram} target="_blank" rel="noopener noreferrer"
                                    className="p-3 border border-white/20 text-white hover:bg-accent hover:border-accent hover:text-dark transition-colors duration-200"
                                    aria-label={`${member.name} on Instagram`}>
                                    <Instagram className="w-4 h-4" />
                                  </a>
                                )}
                                {member.linkedin && (
                                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                                    className="p-3 border border-white/20 text-white hover:bg-accent hover:border-accent hover:text-dark transition-colors duration-200"
                                    aria-label={`${member.name} on LinkedIn`}>
                                    <Linkedin className="w-4 h-4" />
                                  </a>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        {/* Info */}
                        <div className="p-8 border-t border-primary/10">
                          <h3 className="text-lg font-bold text-primary mb-1 group-hover:text-accent transition-colors duration-300">{member.name}</h3>
                          <span className="text-accent/70 text-xs font-semibold tracking-label uppercase block mb-3">{member.role}</span>
                          <p className="text-charcoal/55 text-sm leading-relaxed">{member.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Join the team ── */}
      <section className="bg-white py-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="js-reveal">
              <span className="text-accent/60 text-xs font-semibold tracking-label uppercase block mb-4">Careers</span>
              <h2
                className="font-bold leading-[0.9] tracking-display text-primary mb-6"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
              >
                WANT TO<br /><span className="text-accent">JOIN US?</span>
              </h2>
              <p className="text-charcoal/60 text-base leading-relaxed mb-10 max-w-sm">
                We&apos;re always looking for talented individuals who share our passion for digital excellence. If that&apos;s you, let&apos;s talk.
              </p>
              <Link
                href="/consultation"
                className="btn-shimmer inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-semibold text-sm tracking-wide hover:bg-accent hover:text-dark transition-colors duration-300 group"
              >
                Get In Touch
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="js-reveal border border-primary/15 p-10" data-delay="2">
              <h3 className="text-lg font-bold text-primary mb-6">What We Value</h3>
              <ul className="space-y-5">
                {[
                  'Creativity and out-of-the-box thinking',
                  'Strong communication and collaboration',
                  'Continuous learning and growth mindset',
                  'Commitment to delivering quality work',
                ].map((value) => (
                  <li key={value} className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span className="text-charcoal/65 text-sm leading-relaxed">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FinalCTASection />
      <Footer />
    </div>
  );
}
