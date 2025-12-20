import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Home from './components/Home'
import Gallery from './components/Gallery'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'
import ApplicationForm from './components/ApplicationForm'
import MultiStepForm from './components/MultiStepForm'
import TrackApplication from './components/TrackApplication'
import Dashboard from './components/Dashboard'
import AdminDashboard from './components/AdminDashboard'
import Login from './components/Login'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth')
    const userData = localStorage.getItem('admin_user')
    if (auth === 'true' && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogin = (userData) => {
    setIsAuthenticated(true)
    setUser(userData)
    localStorage.setItem('admin_auth', 'true')
    localStorage.setItem('admin_user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('admin_auth')
    localStorage.removeItem('admin_user')
  }

  const handleApplicationSuccess = (appId) => {
    // Application submitted successfully - you can add other logic here if needed
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/admin" replace /> : <Login onLogin={handleLogin} />
            } />
            <Route path="/admin/*" element={
              isAuthenticated ? (
                <AdminDashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            } />
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                <Header />
                <main className="flex-1">
                  <Home />
                </main>
                <Footer />
              </motion.div>
            } />
            <Route path="/gallery" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                <Header />
                <main className="flex-1 container mx-auto px-4 py-8">
                  <Gallery />
                </main>
                <Footer />
              </motion.div>
            } />
            <Route path="/about" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                <Header />
                <main className="flex-1">
                  <About />
                </main>
                <Footer />
              </motion.div>
            } />
            <Route path="/contact" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                <Header />
                <main className="flex-1 container mx-auto px-4 py-8">
                  <Contact />
                </main>
                <Footer />
              </motion.div>
            } />
            <Route path="/admission" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                <Header />
                <main className="flex-1 container mx-auto px-4 py-8">
                  <MultiStepForm onSuccess={handleApplicationSuccess} />
                </main>
              </motion.div>
            } />
            <Route path="/simple" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                <Header />
                <main className="flex-1 container mx-auto px-4 py-8">
                  <ApplicationForm />
                </main>
                <Footer />
              </motion.div>
            } />
            <Route path="/track" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                <Header />
                <main className="flex-1 container mx-auto px-4 py-8">
                  <TrackApplication />
                </main>
                <Footer />
              </motion.div>
            } />
            <Route path="/dashboard" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                <Header />
                <main className="flex-1 container mx-auto px-4 py-8">
                  <Dashboard />
                </main>
                <Footer />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </div>
      <ChatBot />
    </Router>
  )
}

export default App

