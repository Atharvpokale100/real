import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Menu, X, Phone, User, FileText, BarChart3, Home, ShieldCheck, Search } from 'lucide-react'
import DarkModeToggle from './DarkModeToggle'
import { useState, useEffect } from 'react'

export default function Header() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigationItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: User },
    { path: '/admission', label: 'Admission', icon: FileText },
    { path: '/track', label: 'Track', icon: Search },
    { path: '/gallery', label: 'Gallery', icon: BarChart3 },
    { path: '/contact', label: 'Contact', icon: Phone },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-0 md:py-3' : 'py-0 md:py-5'
        }`}
    >
      <div className="container mx-auto px-0 md:px-4">
        <div className={`
          relative flex items-center justify-between px-4 py-3 transition-all duration-300
          w-full md:max-w-6xl md:mx-auto md:rounded-2xl
          ${scrolled
            ? 'bg-white dark:bg-gray-900 md:bg-white/70 md:dark:bg-gray-900/70 md:backdrop-blur-md shadow-lg border-b md:border border-gray-200/50 dark:border-gray-700/50'
            : 'bg-white dark:bg-gray-900 md:bg-white/70 md:dark:bg-gray-900/70 md:backdrop-blur-sm border-b md:border border-white/20 dark:border-gray-700/30'
          }
        `}>
          {/* Logo Section */}
          <Link to="/" className="group">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-40 rounded-full group-hover:opacity-60 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600 p-2.5 rounded-xl shadow-lg text-white">
                  <GraduationCap className="w-6 h-6" />
                </div>
              </motion.div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Apna College
                </h1>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    initial="initial"
                    whileHover="hover"
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${isActive
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 shadow-sm'
                        : 'text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                      }`}
                  >
                    <motion.div
                      variants={{
                        initial: { rotate: 0 },
                        hover: { rotate: -15, scale: 1.1, y: -2 }
                      }}
                    >
                      <item.icon className="w-4 h-4" />
                    </motion.div>
                    <span>{item.label}</span>
                  </motion.div>
                </Link>
              )
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <DarkModeToggle />

            {/* Admin Link */}
            <Link to="/admin" className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all" title="Admin Portal">
              <ShieldCheck className="w-5 h-5" />
            </Link>

            <div className="hidden md:flex items-center gap-2">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-indigo-500/30 group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Apply Now
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear", repeatDelay: 1 }}
                  />
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="xl:hidden p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="xl:hidden absolute top-full left-0 right-0 mx-4 mt-2 p-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
            >
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.path
                  return (
                    <Link key={item.path} to={item.path} onClick={() => setIsMenuOpen(false)}>
                      <motion.div
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive
                            ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </motion.div>
                    </Link>
                  )
                })}

                <div className="h-px bg-gray-100 dark:bg-gray-800 my-6" />

                <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <ShieldCheck className="w-5 h-5" />
                    Admin Portal
                  </div>
                </Link>

                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <div className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-3 rounded-xl font-semibold shadow-lg">
                    Apply Now
                  </div>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
