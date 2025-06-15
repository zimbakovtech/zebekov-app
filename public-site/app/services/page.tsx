'use client';

import { motion } from 'framer-motion';
import {
  SparklesIcon,
  HeartIcon,
  ShieldCheckIcon,
  CogIcon,
  UserGroupIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const services = [
  {
    id: 1,
    name: 'General Dentistry',
    description: 'Comprehensive dental care including cleanings, fillings, and routine checkups.',
    icon: ShieldCheckIcon,
    duration: '30-60 min',
    price: 'From €50',
    features: ['Regular Checkups', 'Dental Cleanings', 'Cavity Fillings', 'Oral Health Assessment'],
    image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Cosmetic Dentistry',
    description: 'Transform your smile with our advanced cosmetic dental procedures.',
    icon: SparklesIcon,
    duration: '60-120 min',
    price: 'From €200',
    features: ['Teeth Whitening', 'Veneers', 'Bonding', 'Smile Makeover'],
    image: 'https://images.pexels.com/photos/6812540/pexels-photo-6812540.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'Orthodontics',
    description: 'Straighten your teeth with traditional braces or modern clear aligners.',
    icon: CogIcon,
    duration: '45-90 min',
    price: 'From €1500',
    features: ['Traditional Braces', 'Clear Aligners', 'Retainers', 'Bite Correction'],
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  },
  {
    id: 4,
    name: 'Oral Surgery',
    description: 'Expert surgical procedures including extractions and implant placement.',
    icon: HeartIcon,
    duration: '60-180 min',
    price: 'From €300',
    features: ['Tooth Extractions', 'Dental Implants', 'Wisdom Teeth', 'Bone Grafting'],
    image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  },
  {
    id: 5,
    name: 'Pediatric Dentistry',
    description: 'Gentle, specialized dental care designed specifically for children.',
    icon: UserGroupIcon,
    duration: '30-45 min',
    price: 'From €40',
    features: ['Child-Friendly Care', 'Preventive Treatments', 'Fluoride Applications', 'Sealants'],
    image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  },
  {
    id: 6,
    name: 'Emergency Care',
    description: '24/7 emergency dental services for urgent dental problems.',
    icon: ClockIcon,
    duration: '30-90 min',
    price: 'From €80',
    features: ['24/7 Availability', 'Pain Relief', 'Emergency Repairs', 'Urgent Treatments'],
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#44B0B6] to-[#3A9BA1] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Dental services"
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
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">Services</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Comprehensive dental care with state-of-the-art technology and
              personalized treatment plans for every patient.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
              >
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                      <service.icon className="h-6 w-6 text-[#44B0B6]" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {service.duration}
                    </span>
                    <span className="bg-[#44B0B6] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {service.price}
                    </span>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#44B0B6] rounded-full"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className="w-full bg-gradient-to-r from-[#44B0B6] to-[#3A9BA1] text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    Book Appointment
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="gradient-text">Our Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine advanced technology with personalized care to deliver
              exceptional dental experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheckIcon,
                title: 'Advanced Technology',
                description: 'State-of-the-art equipment for precise and comfortable treatments.',
              },
              {
                icon: HeartIcon,
                title: 'Personalized Care',
                description: 'Tailored treatment plans designed specifically for your needs.',
              },
              {
                icon: UserGroupIcon,
                title: 'Expert Team',
                description: 'Experienced professionals with specialized training and certifications.',
              },
              {
                icon: ClockIcon,
                title: 'Flexible Scheduling',
                description: 'Convenient appointment times that fit your busy lifestyle.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="bg-gradient-to-br from-[#44B0B6] to-[#3A9BA1] rounded-2xl p-6 mb-4 inline-block group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-[#44B0B6] to-[#3A9BA1] text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Smile?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Schedule your consultation today and take the first step towards
              optimal oral health and a beautiful smile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#44B0B6] font-semibold py-4 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Book Consultation
              </button>
              <button className="border-2 border-white text-white font-semibold py-4 px-8 rounded-full hover:bg-white hover:text-[#44B0B6] transition-all duration-300">
                Call Now: +389 70 123 456
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}