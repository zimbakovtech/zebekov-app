'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const contactInfo = [
  {
    icon: PhoneIcon,
    title: 'Phone',
    details: [
      { label: 'Skopje', value: '+389 70 123 456', href: 'tel:+38970123456' },
      { label: 'Ohrid', value: '+389 70 123 457', href: 'tel:+38970123457' },
    ],
  },
  {
    icon: EnvelopeIcon,
    title: 'Email',
    details: [
      { label: 'General', value: 'info@zebekov.mk', href: 'mailto:info@zebekov.mk' },
      { label: 'Appointments', value: 'appointments@zebekov.mk', href: 'mailto:appointments@zebekov.mk' },
    ],
  },
  {
    icon: MapPinIcon,
    title: 'Locations',
    details: [
      { label: 'Skopje', value: 'Ul. Makedonija 15, 1000 Skopje', href: '/locations' },
      { label: 'Ohrid', value: 'Ul. Kej Makedonija 8, 6000 Ohrid', href: '/locations' },
    ],
  },
];

const workingHours = [
  { day: 'Monday - Friday', hours: '8:00 - 20:00' },
  { day: 'Saturday', hours: '9:00 - 15:00' },
  { day: 'Sunday', hours: 'Closed' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    location: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        location: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#44B0B6] to-[#3A9BA1] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Contact us"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">Us</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Ready to schedule your appointment? Get in touch with us today.
              We're here to answer your questions and help you achieve your perfect smile.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Book Your <span className="gradient-text">Appointment</span>
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you within 24 hours
                to confirm your appointment.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600">
                    Your message has been sent successfully. We'll contact you soon!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#44B0B6] focus:border-transparent transition-all duration-200"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#44B0B6] focus:border-transparent transition-all duration-200"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#44B0B6] focus:border-transparent transition-all duration-200"
                        placeholder="+389 70 123 456"
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Location
                      </label>
                      <select
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#44B0B6] focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select location</option>
                        <option value="skopje">Skopje Center</option>
                        <option value="ohrid">Ohrid Branch</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      Service Needed
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#44B0B6] focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select service</option>
                      <option value="general">General Dentistry</option>
                      <option value="cosmetic">Cosmetic Dentistry</option>
                      <option value="orthodontics">Orthodontics</option>
                      <option value="surgery">Oral Surgery</option>
                      <option value="pediatric">Pediatric Dentistry</option>
                      <option value="emergency">Emergency Care</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#44B0B6] focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Tell us about your dental needs or any questions you have..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#44B0B6] to-[#3A9BA1] text-white font-semibold py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Get in <span className="gradient-text">Touch</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We're here to help you with all your dental needs. Contact us
                  through any of the methods below or visit us at one of our
                  convenient locations.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-br from-[#44B0B6] to-[#3A9BA1] rounded-xl p-3">
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {info.title}
                        </h3>
                        <div className="space-y-2">
                          {info.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">{detail.label}:</span>
                              <a
                                href={detail.href}
                                className="text-[#44B0B6] hover:text-[#3A9BA1] transition-colors font-medium"
                              >
                                {detail.value}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Working Hours */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-[#44B0B6] to-[#3A9BA1] rounded-xl p-3">
                    <ClockIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Working Hours
                    </h3>
                    <div className="space-y-2">
                      {workingHours.map((schedule, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-gray-700">{schedule.day}</span>
                          <span className="text-[#44B0B6] font-medium">{schedule.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Emergency Contact</h3>
                <p className="mb-3">For dental emergencies outside business hours:</p>
                <a
                  href="tel:+38970123999"
                  className="text-2xl font-bold hover:underline"
                >
                  +389 70 123 999
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Visit Our <span className="gradient-text">Locations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find us at our convenient locations in Skopje and Ohrid.
              Both clinics offer the same high-quality care and modern facilities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Skopje Center</h3>
                <p className="text-gray-600">Ul. Makedonija 15, 1000 Skopje</p>
              </div>
              <div className="h-64 bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2965.0824050173574!2d21.433108315545!3d41.99646597922131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1354149f0000000%3A0x0!2zNDHCsDU5JzQ3LjMiTiAyMcKwMjYnMDMuMiJF!5e0!3m2!1sen!2smk!4v1234567890123!5m2!1sen!2smk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Ohrid Branch</h3>
                <p className="text-gray-600">Ul. Kej Makedonija 8, 6000 Ohrid</p>
              </div>
              <div className="h-64 bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2965.0824050173574!2d20.801168315545!3d41.11646597922131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1354149f0000000%3A0x0!2zNDHCsDU5JzQ3LjMiTiAyMcKwMjYnMDMuMiJF!5e0!3m2!1sen!2smk!4v1234567890123!5m2!1sen!2smk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}