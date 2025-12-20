import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GraduationCap, Menu, X } from 'lucide-react'
import DarkModeToggle from './DarkModeToggle'
import { useState } from 'react'

export default function Header() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const tabs = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/gallery', label: 'Gallery', icon: '🖼️' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
    { path: '/contact', label: 'Contact Us', icon: '📞' },
    { path: '/admission', label: 'Admission', icon: '📝' },
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg shadow-2xl p-6 mb-8 mx-4 mt-4 rounded-3xl border border-white/20 dark:border-gray-700/20"
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-lg opacity-75"></div>
              <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-xl">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Apna College
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm hidden md:block">Empowering Education Through Innovation</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <DarkModeToggle />
            <Link
              to="/admin"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Admin Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex gap-2 bg-gray-100/80 dark:bg-gray-700/80 p-2 rounded-2xl backdrop-blur-sm">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path
            return (
              <Link key={tab.path} to={tab.path} className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-600/80 hover:shadow-md'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </motion.button>
              </Link>
            )
          })}
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 bg-gray-100 dark:bg-gray-700 rounded-2xl p-4"
          >
            <div className="space-y-2">
              {tabs.map((tab) => {
                const isActive = location.pathname === tab.path
                return (
                  <Link key={tab.path} to={tab.path} onClick={() => setIsMenuOpen(false)}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-600'
                      }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.label}
                    </motion.button>
                  </Link>
                )
              })}
              <div className="flex items-center justify-between pt-4 border-t border-gray-300 dark:border-gray-600">
                <DarkModeToggle />
                <Link
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  Admin
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}

