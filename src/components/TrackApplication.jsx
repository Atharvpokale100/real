import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, CheckCircle, Clock, AlertCircle, FileCheck, QrCode } from 'lucide-react'
import { getApplication } from '../utils/storage'
import QRCodeModal from './QRCodeModal'
import ApplicationChecklist from './ApplicationChecklist'

export default function TrackApplication() {
  const [appId, setAppId] = useState('')
  const [email, setEmail] = useState('')
  const [application, setApplication] = useState(null)
  const [error, setError] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)

  // Check for URL parameters (for QR code links)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const appId = urlParams.get('appId')
    const email = urlParams.get('email')
    if (appId && email) {
      setAppId(appId)
      setEmail(email)
      setTimeout(() => {
        const foundApp = getApplication(appId, email)
        if (foundApp) {
          setApplication(foundApp)
        }
      }, 500)
    }
  }, [])

  const handleSearch = async () => {
    if (!appId.trim() || !email.trim()) {
      setError('Please fill in both fields')
      return
    }

    setIsSearching(true)
    setError('')
    setApplication(null)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    const foundApp = getApplication(appId, email)
    
    if (foundApp) {
      setApplication(foundApp)
    } else {
      setError('Application not found. Please check your Application ID and Email address.')
    }

    setIsSearching(false)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Accepted':
        return <CheckCircle className="w-6 h-6 text-green-600" />
      case 'Rejected':
        return <AlertCircle className="w-6 h-6 text-red-600" />
      case 'Reviewing':
        return <FileCheck className="w-6 h-6 text-blue-600" />
      default:
        return <Clock className="w-6 h-6 text-amber-600" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'status-accepted'
      case 'Rejected':
        return 'status-rejected'
      case 'Reviewing':
        return 'status-reviewing'
      default:
        return 'status-pending'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card max-w-4xl mx-auto"
    >
      <div className="flex items-center gap-3 mb-6">
        <Search className="w-8 h-8 text-primary-600" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Track Your Application
        </h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold mb-2">
            Application ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            placeholder="Enter your Application ID"
            className="input-field"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            className="input-field"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
      </div>

      <button
        onClick={handleSearch}
        disabled={isSearching}
        className="btn-primary w-full md:w-auto"
      >
        {isSearching ? (
          <span className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Searching...
          </span>
        ) : (
          <>
            <Search className="w-5 h-5" />
            Track Application
          </>
        )}
      </button>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 bg-red-50 border-2 border-red-500 rounded-lg"
        >
          <p className="text-red-800 font-semibold">{error}</p>
        </motion.div>
      )}

      {application && (
        <>
          <div className="mt-8 space-y-6">
            <ApplicationChecklist application={application} />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl border-2 border-primary-200 dark:border-primary-800"
            >
              <div className="flex items-center gap-4 mb-6">
                {getStatusIcon(application.status)}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Application Status</h3>
                  <p className="text-gray-600 dark:text-gray-400">Application ID: {application.id}</p>
                </div>
              </div>

              <div className="mb-4">
                <span className={`status-badge ${getStatusColor(application.status)} text-lg`}>
                  {application.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Full Name</p>
                  <p className="font-semibold text-lg dark:text-white">{application.fullName}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Course</p>
                  <p className="font-semibold text-lg dark:text-white">{application.course}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Degree Level</p>
                  <p className="font-semibold text-lg dark:text-white">{application.degree}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Date Applied</p>
                  <p className="font-semibold text-lg dark:text-white">
                    {new Date(application.dateApplied).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowQRModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  <QrCode className="w-5 h-5" />
                  Generate QR Code
                </motion.button>
              </div>
            </motion.div>
          </div>

          <QRCodeModal
            isOpen={showQRModal}
            applicationId={application.id}
            email={email}
            onClose={() => setShowQRModal(false)}
          />
        </>
      )}
    </motion.div>
  )
}

