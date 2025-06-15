'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const teamMembers = [
  {
    id: 1,
    name: 'Dr. Marko Zebekov',
    title: 'Chief Dental Officer',
    specialty: 'General & Cosmetic Dentistry',
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    experience: '15+ years',
    description: 'Leading expert in cosmetic dentistry with a passion for creating beautiful smiles.',
  },
  {
    id: 2,
    name: 'Dr. Ana Petrovska',
    title: 'Senior Orthodontist',
    specialty: 'Orthodontics & Alignment',
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    experience: '12+ years',
    description: 'Specialized in modern orthodontic treatments and invisible aligners.',
  },
  {
    id: 3,
    name: 'Dr. Stefan Nikolov',
    title: 'Oral Surgeon',
    specialty: 'Oral & Maxillofacial Surgery',
    image: 'https://images.pexels.com/photos/6812540/pexels-photo-6812540.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    experience: '10+ years',
    description: 'Expert in complex oral surgeries and dental implant procedures.',
  },
  {
    id: 4,
    name: 'Dr. Elena Stojanovic',
    title: 'Pediatric Dentist',
    specialty: 'Children\'s Dentistry',
    image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    experience: '8+ years',
    description: 'Gentle care specialist focused on making dental visits fun for children.',
  },
  {
    id: 5,
    name: 'Dr. Aleksandar Mitrev',
    title: 'Periodontist',
    specialty: 'Gum Disease Treatment',
    image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    experience: '11+ years',
    description: 'Specialized in treating gum diseases and maintaining oral health.',
  },
];

export default function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet Our <span className="gradient-text">Expert Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our experienced dental professionals are committed to providing you with
            the highest quality care in a comfortable and welcoming environment.
          </p>
        </motion.div>

        {/* Team Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {teamMembers.map((member, index) => (
                <div key={member.id} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 lg:p-16">
                    {/* Image */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-96 lg:h-[500px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#44B0B6]/20 to-transparent"></div>
                      </div>
                      {/* Floating badge */}
                      <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#44B0B6]">
                            {member.experience}
                          </div>
                          <div className="text-sm text-gray-600">Experience</div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                          {member.name}
                        </h3>
                        <p className="text-xl text-[#44B0B6] font-semibold mb-2">
                          {member.title}
                        </p>
                        <p className="text-lg text-gray-600">
                          {member.specialty}
                        </p>
                      </div>

                      <p className="text-gray-700 text-lg leading-relaxed">
                        {member.description}
                      </p>

                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-1 bg-[#44B0B6] rounded-full"></div>
                        <span className="text-sm text-gray-500 uppercase tracking-wide">
                          Dental Professional
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-700" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3 mt-8">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-[#44B0B6] scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
        >
          {[
            { number: '5', label: 'Expert Dentists' },
            { number: '50+', label: 'Combined Years' },
            { number: '15+', label: 'Specializations' },
            { number: '100%', label: 'Patient Satisfaction' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#44B0B6] mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}