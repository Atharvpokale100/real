import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Share2 } from 'lucide-react'
import { generateApplicationQR } from '../utils/qrGenerator'

export default function QRCodeModal({ isOpen, applicationId, email, onClose }) {
  const [qrUrl, setQrUrl] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isOpen && applicationId && email) {
      setLoading(true)
      generateApplicationQR(applicationId, email).then((url) => {
        setQrUrl(url)
        setLoading(false)
      })
    }
  }, [isOpen, applicationId, email])

  const handleDownload = () => {
    if (qrUrl) {
      const link = document.createElement('a')
      link.href = qrUrl
      link.download = `application-${applicationId}-qr.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleShare = async () => {
    const trackingUrl = `${window.location.origin}/track?appId=${applicationId}&email=${encodeURIComponent(email)}`
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Application QR Code',
          text: `Track my application: ${applicationId}`,
          url: trackingUrl,
        })
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(trackingUrl)
      alert('Tracking URL copied to clipboard!')
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">QR Code for Tracking</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="bg-white p-4 rounded-lg mb-6 flex justify-center">
                <img src={qrUrl} alt="QR Code" className="w-64 h-64" />
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
                Scan this QR code to quickly access your application tracking page
              </p>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </motion.button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}


