import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Share2 } from 'lucide-react'

export default function QRCodeModal({ isOpen, onClose, applicationId, email }) {
  if (!isOpen) return null

  // Generate tracking URL
  const trackingUrl = `${window.location.origin}/track?appId=${applicationId}&email=${encodeURIComponent(email)}`
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(trackingUrl)}`

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Application QR Code</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 mb-6 flex justify-center">
            <img src={qrUrl} alt="Tracking QR Code" className="w-48 h-48" />
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
            Scan this QR code to instantly track your application status on any device.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => window.open(qrUrl, '_blank')}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(trackingUrl)
                alert('Tracking link copied to clipboard!')
              }}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Copy Link
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}