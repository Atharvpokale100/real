import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GraduationCap, Menu, X, Phone, Mail, MapPin, User, FileText, BarChart3, Bell } from 'lucide-react'
import DarkModeToggle from './DarkModeToggle'
import { useState } from 'react'

export default function Header() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigationItems = [
    { path: '/', label: 'Home', icon: GraduationCap },
    { path: '/about', label: 'About', icon: User },
    { path: '/admission', label: 'Admission', icon: FileText },
    { path: '/gallery', label: 'Gallery', icon: BarChart3 },
    { path: '/contact', label: 'Contact', icon: Phone },
  ]

  const quickLinks = [
    { path: '/track', label: 'Track Application', icon: FileText },
    { path: '/admin', label: 'Admin Portal', icon: BarChart3 },
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50"
    >
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@apnacollege.edu</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/track" className="hover:text-yellow-300 transition-colors">
                Track Application
              </Link>
              <span className="text-white/50">|</span>
              <Link to="/admin" className="hover:text-yellow-300 transition-colors">
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-lg opacity-75"></div>
              <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-2xl shadow-lg">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Apna College
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Excellence in Education Since 2010
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-indigo-600'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </motion.div>
                </Link>
              )
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <DarkModeToggle />

            {/* Quick Actions */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/track"
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Track
              </Link>
              <Link
                to="/admission"
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Apply Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <Link key={item.path} to={item.path} onClick={() => setIsMenuOpen(false)}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </motion.div>
                  </Link>
                )
              })}

              {/* Mobile Quick Actions */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-600 space-y-2">
                <Link
                  to="/track"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-xl font-semibold"
                >
                  <FileText className="w-5 h-5" />
                  Track Application
                </Link>
                <Link
                  to="/admission"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 w-full bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-3 rounded-xl font-semibold"
                >
                  <FileText className="w-5 h-5" />
                  Apply for Admission
                </Link>
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

