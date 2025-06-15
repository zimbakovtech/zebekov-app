"use client";

import { motion } from "framer-motion";
import {
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  EnvelopeIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

const locations = [
  {
    id: 1,
    name: "Skopje Center",
    address: "Ul. Makedonija 15, 1000 Skopje",
    phone: "+389 70 123 456",
    email: "skopje@zebekov.mk",
    hours: {
      weekdays: "Monday - Friday: 8:00 - 20:00",
      saturday: "Saturday: 9:00 - 15:00",
      sunday: "Sunday: Closed",
    },
    parking: "Free parking available",
    image:
      "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2965.0824050173574!2d21.433108315545!3d41.99646597922131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1354149f0000000%3A0x0!2zNDHCsDU5JzQ3LjMiTiAyMcKwMjYnMDMuMiJF!5e0!3m2!1sen!2smk!4v1234567890123!5m2!1sen!2smk",
    features: [
      "Digital X-Ray",
      "Modern Equipment",
      "Comfortable Waiting Area",
      "Wheelchair Accessible",
    ],
  },
  {
    id: 2,
    name: "Ohrid Branch",
    address: "Ul. Kej Makedonija 8, 6000 Ohrid",
    phone: "+389 70 123 457",
    email: "ohrid@zebekov.mk",
    hours: {
      weekdays: "Monday - Friday: 9:00 - 18:00",
      saturday: "Saturday: 10:00 - 14:00",
      sunday: "Sunday: Closed",
    },
    parking: "Street parking available",
    image:
      "https://images.pexels.com/photos/6812540/pexels-photo-6812540.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2965.0824050173574!2d20.801168315545!3d41.11646597922131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1354149f0000000%3A0x0!2zNDHCsDU5JzQ3LjMiTiAyMcKwMjYnMDMuMiJF!5e0!3m2!1sen!2smk!4v1234567890123!5m2!1sen!2smk",
    features: [
      "Scenic Lake View",
      "Tourist-Friendly",
      "Modern Facilities",
      "Emergency Services",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export default function LocationsPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#44B0B6] to-[#3A9BA1] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Our locations"
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
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">
                Locations
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Visit us at our convenient locations in Skopje and Ohrid. Modern
              facilities with the latest dental technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Locations */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-20"
          >
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                variants={itemVariants}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Location Image */}
                <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                    <img
                      src={location.image}
                      alt={location.name}
                      className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-6 left-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {location.name}
                      </h3>
                      <div className="flex items-center space-x-2 text-white/90">
                        <MapPinIcon className="h-5 w-5" />
                        <span>{location.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Details */}
                <div
                  className={`space-y-8 ${
                    index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                  }`}
                >
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                      {location.name}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Experience exceptional dental care at our{" "}
                      {location.name.toLowerCase()} location. Our modern
                      facility is equipped with the latest technology to ensure
                      your comfort and the best possible treatment outcomes.
                    </p>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <MapPinIcon className="h-6 w-6 text-[#44B0B6] mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            Address
                          </h4>
                          <p className="text-gray-600">{location.address}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <PhoneIcon className="h-6 w-6 text-[#44B0B6] mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Phone</h4>
                          <a
                            href={`tel:${location.phone}`}
                            className="text-[#44B0B6] hover:text-[#3A9BA1] transition-colors"
                          >
                            {location.phone}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <EnvelopeIcon className="h-6 w-6 text-[#44B0B6] mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Email</h4>
                          <a
                            href={`mailto:${location.email}`}
                            className="text-[#44B0B6] hover:text-[#3A9BA1] transition-colors"
                          >
                            {location.email}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <ClockIcon className="h-6 w-6 text-[#44B0B6] mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Hours</h4>
                          <div className="text-gray-600 space-y-1">
                            <p>{location.hours.weekdays}</p>
                            <p>{location.hours.saturday}</p>
                            <p>{location.hours.sunday}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <TruckIcon className="h-6 w-6 text-[#44B0B6] mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            Parking
                          </h4>
                          <p className="text-gray-600">{location.parking}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Features
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {location.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-2 h-2 bg-[#44B0B6] rounded-full"></div>
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="btn-primary">Book Appointment</button>
                    <button className="btn-secondary">Get Directions</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
              Find Us on the <span className="gradient-text">Map</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Both of our locations are easily accessible and offer convenient
              parking options for our patients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {locations.map((location) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {location.name}
                  </h3>
                  <p className="text-gray-600">{location.address}</p>
                </div>
                <div className="h-64 bg-gray-200">
                  <iframe
                    src={location.mapEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  ></iframe>
                </div>
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
              Visit Us Today
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Choose the location that's most convenient for you and experience
              the difference of quality dental care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#44B0B6] font-semibold py-4 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Schedule Appointment
              </button>
              <button className="border-2 border-white text-white font-semibold py-4 px-8 rounded-full hover:bg-white hover:text-[#44B0B6] transition-all duration-300">
                Call Us Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
