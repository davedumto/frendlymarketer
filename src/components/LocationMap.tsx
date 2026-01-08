'use client';
import React from 'react';
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon } from 'lucide-react';

interface LocationMapProps {
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
}

export default function LocationMap({
  address = "123 Business Street, Lagos, Nigeria",
  phone = "+234 123 456 7890",
  email = "info@frendlymarqeter.com",
  hours = "Mon-Fri: 9AM - 6PM"
}: LocationMapProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Map Embed */}
      <div className="w-full h-64 md:h-80 bg-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7976536794387!2d36.8062!3d-1.2667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1a6bf7445dc7%3A0x940b62a4c8efde4c!2sRiverside%20Drive%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1704728000000"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location"
        />
      </div>

      {/* Contact Info */}
      <div className="p-6 md:p-8 space-y-4">
        <h3 className="text-2xl font-bold text-charcoal mb-6">Get In Touch</h3>
        
        <div className="flex items-start gap-3">
          <MapPinIcon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-charcoal">Address</p>
            <p className="text-gray-600">{address}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <PhoneIcon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-charcoal">Phone</p>
            <a href={`tel:${phone}`} className="text-gray-600 hover:text-primary transition-colors">
              {phone}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MailIcon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-charcoal">Email</p>
            <a href={`mailto:${email}`} className="text-gray-600 hover:text-primary transition-colors">
              {email}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <ClockIcon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-charcoal">Business Hours</p>
            <p className="text-gray-600">{hours}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
