'use client';

import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import { Users, FileText, FolderOpen, MessageSquare, Handshake, Mail, ArrowRight } from 'lucide-react';

const quickLinks = [
  {
    title: 'Inbox',
    description: 'Read and respond to contact form messages',
    href: '/admin/messages',
    icon: Mail,
    color: 'bg-accent',
  },
  {
    title: 'Manage Team',
    description: 'Add, edit, or remove team members',
    href: '/admin/team',
    icon: Users,
    color: 'bg-primary',
  },
  {
    title: 'Manage Blog',
    description: 'Create and manage blog posts',
    href: '/admin/blog',
    icon: FileText,
    color: 'bg-accent',
  },
  {
    title: 'Manage Portfolio',
    description: 'Update web and graphic projects',
    href: '/admin/portfolio',
    icon: FolderOpen,
    color: 'bg-primary',
  },
  {
    title: 'Manage Testimonials',
    description: 'Add and manage client testimonials',
    href: '/admin/testimonials',
    icon: MessageSquare,
    color: 'bg-accent',
  },
  {
    title: 'Manage Partners',
    description: 'Add partner logos to the homepage carousel',
    href: '/admin/partners',
    icon: Handshake,
    color: 'bg-primary',
  },
];

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome to the Frendly Marqeter admin panel
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
              >
                <div
                  className={`w-12 h-12 ${link.color} rounded-lg flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                  {link.title}
                </h3>
                <p className="text-gray-600 mb-4">{link.description}</p>
                <span className="inline-flex items-center text-primary font-medium group-hover:text-accent transition-colors">
                  Go to {link.title.split(' ')[1]}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>


      </div>
    </AdminLayout>
  );
}
