'use client';

import { motion } from 'framer-motion';
import {
  HeartIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  AcademicCapIcon,
  TrophyIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const values = [
  {
    icon: HeartIcon,
    title: 'Patient-Centered Care',
    description: 'Every decision we make is focused on what\'s best for our patients\' health and comfort.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Quality & Safety',
    description: 'We maintain the highest standards of quality and safety in all our treatments.',
  },
  {
    icon: UserGroupIcon,
    title: 'Professional Excellence',
    description: 'Our team continuously updates their skills to provide the most advanced care.',
  },
  {
    icon: AcademicCapIcon,
    title: 'Continuous Learning',
    description: 'We stay at the forefront of dental innovation through ongoing education.',
  },
];

const achievements = [
  {
    icon: TrophyIcon,
    title: 'Award-Winning Practice',
    description: 'Recognized for excellence in dental care and patient satisfaction.',
  },
  {
    icon: SparklesIcon,
    title: 'Modern Technology',
    description: 'Equipped with the latest dental technology for optimal results.',
  },
  {
    icon: UserGroupIcon,
    title: '5000+ Happy Patients',
    description: 'Trusted by thousands of patients across Macedonia.',
  },
  {
    icon: ShieldCheckIcon,
    title: '15+ Years Experience',
    description: 'Over a decade of providing exceptional dental care.',
  },
];

const timeline = [
  {
    year: '2008',
    title: 'Foundation',
    description: 'Dr. Marko Zebekov established the first clinic in Skopje with a vision to provide world-class dental care.',
  },
  {
    year: '2012',
    title: 'Expansion',
    description: 'Opened our second location in Ohrid to serve patients across Macedonia.',
  },
  {
    year: '2016',
    title: 'Technology Upgrade',
    description: 'Invested in state-of-the-art digital equipment and modern treatment methods.',
  },
  {
    year: '2020',
    title: 'Team Growth',
    description: 'Expanded our team with specialized dentists in various fields of dentistry.',
  },
  {
    year: '2024',
    title: 'Innovation Leader',
    description: 'Became the leading dental practice in Macedonia with cutting-edge treatments.',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#44B0B6] to-[#3A9BA1] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="About us"
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
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">Zebekov</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Dedicated to providing exceptional dental care with compassion,
              expertise, and the latest technology for over 15 years.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our <span className="gradient-text">Story</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Founded in 2008 by Dr. Marko Zebekov, Dental Center Zebekov began
                  with a simple yet powerful vision: to provide world-class dental
                  care that combines advanced technology with genuine compassion.
                </p>
                <p>
                  What started as a small practice in Skopje has grown into Macedonia's
                  premier dental center, serving thousands of patients across two
                  convenient locations. Our commitment to excellence has never wavered,
                  and we continue to invest in the latest technology and training
                  to ensure our patients receive the best possible care.
                </p>
                <p>
                  Today, we're proud to be recognized as leaders in dental innovation,
                  offering comprehensive services from routine cleanings to complex
                  surgical procedures, all delivered with the personal touch that
                  has made us a trusted name in Macedonian dentistry.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="Dr. Marko Zebekov"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#44B0B6]/20 to-transparent"></div>
              </div>
              {/* Floating stats */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#44B0B6] mb-1">15+</div>
                  <div className="text-sm text-gray-600">Years of Excellence</div>
                </div>
              </div>
              <div className="absolute -top-8 -right-8 bg-white rounded-2xl p-6 shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#44B0B6] mb-1">5000+</div>
                  <div className="text-sm text-gray-600">Happy Patients</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape the exceptional
              experience we provide to every patient.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-2"
              >
                <div className="bg-gradient-to-br from-[#44B0B6] to-[#3A9BA1] rounded-2xl p-4 inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
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
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to becoming Macedonia's leading dental practice,
              here's our story of growth and innovation.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#44B0B6] to-[#3A9BA1] rounded-full"></div>

            <div className="space-y-16">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="text-2xl font-bold text-[#44B0B6] mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="relative z-10 w-6 h-6 bg-[#44B0B6] rounded-full border-4 border-white shadow-lg"></div>

                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="gradient-text">Achievements</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Recognition and milestones that reflect our commitment to excellence
              in dental care and patient satisfaction.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-2"
              >
                <div className="bg-gradient-to-br from-[#44B0B6] to-[#3A9BA1] rounded-2xl p-4 inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                  <achievement.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {achievement.description}
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
              Join Our Dental Family
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Experience the difference that personalized, professional dental care
              can make. Schedule your appointment today and discover why thousands
              of patients trust us with their smiles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#44B0B6] font-semibold py-4 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Schedule Consultation
              </button>
              <button className="border-2 border-white text-white font-semibold py-4 px-8 rounded-full hover:bg-white hover:text-[#44B0B6] transition-all duration-300">
                Learn More About Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}