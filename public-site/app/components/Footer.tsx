'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const footerLinks = {
  services: [
    'General Dentistry',
    'Cosmetic Dentistry',
    'Orthodontics',
    'Oral Surgery',
    'Preventive Care',
    'Emergency Care',
  ],
  quickLinks: [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Locations', href: '/locations' },
    { name: 'Contact', href: '/contact' },
  ],
};

const contactInfo = [
  {
    icon: PhoneIcon,
    label: 'Phone',
    value: '+389 70 123 456',
    href: 'tel:+38970123456',
  },
  {
    icon: EnvelopeIcon,
    label: 'Email',
    value: 'info@zebekov.mk',
    href: 'mailto:info@zebekov.mk',
  },
  {
    icon: MapPinIcon,
    label: 'Address',
    value: 'Skopje & Ohrid, Macedonia',
    href: '/locations',
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <img
                  src="https://www.zebekov.mk/assets/official_logo.svg"
                  alt="Dental Center Zebekov"
                  className="h-10 w-auto filter brightness-0 invert"
                />
                <div>
                  <h3 className="text-lg font-bold">
                    Dental Center <span className="text-[#44B0B6]">Zebekov</span>
                  </h3>
                </div>
              </Link>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your trusted partner for comprehensive dental care. We provide
                exceptional dental services with a focus on comfort, quality,
                and patient satisfaction.
              </p>
              <div className="flex items-center space-x-2 text-gray-400">
                <ClockIcon className="h-5 w-5 text-[#44B0B6]" />
                <span className="text-sm">
                  Mon-Fri: 8:00-20:00 | Sat: 9:00-15:00
                </span>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Our Services</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((service) => (
                  <li key={service}>
                    <Link
                      href="/services"
                      className="text-gray-400 hover:text-[#44B0B6] transition-colors duration-200"
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {footerLinks.quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#44B0B6] transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
              <ul className="space-y-4">
                {contactInfo.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="flex items-start space-x-3 text-gray-400 hover:text-[#44B0B6] transition-colors duration-200 group"
                    >
                      <item.icon className="h-5 w-5 text-[#44B0B6] mt-0.5 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="text-sm font-medium text-gray-300">
                          {item.label}
                        </p>
                        <p className="text-sm">{item.value}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Dental Center Zebekov. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-[#44B0B6] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-[#44B0B6] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}