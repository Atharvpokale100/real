import { motion } from 'framer-motion'
import { MapPin, Phone, Mail } from 'lucide-react'

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-12"
    >
      <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">Contact Us</h2>
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="w-6 h-6 text-primary-600 mr-4" />
                <span className="text-gray-600 dark:text-gray-300">
                  123 Education Street, Knowledge City, State 12345
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-primary-600 mr-4" />
                <span className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-6 h-6 text-primary-600 mr-4" />
                <span className="text-gray-600 dark:text-gray-300">info@apnacollege.edu</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <textarea
                  rows="4"
                  placeholder="Your Message"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  )
}