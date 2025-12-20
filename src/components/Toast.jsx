import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

const toastTypes = {
  success: { icon: CheckCircle, bgColor: 'bg-green-500', textColor: 'text-green-800', borderColor: 'border-green-500' },
  error: { icon: AlertCircle, bgColor: 'bg-red-500', textColor: 'text-red-800', borderColor: 'border-red-500' },
  warning: { icon: AlertTriangle, bgColor: 'bg-amber-500', textColor: 'text-amber-800', borderColor: 'border-amber-500' },
  info: { icon: Info, bgColor: 'bg-blue-500', textColor: 'text-blue-800', borderColor: 'border-blue-500' },
}

export default function Toast({ toasts, removeToast }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 w-full max-w-md">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function ToastItem({ toast, onClose }) {
  const { icon: Icon, bgColor, textColor, borderColor } = toastTypes[toast.type] || toastTypes.info

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, toast.duration)

      return () => clearTimeout(timer)
    }
  }, [toast.duration, onClose])

  return (
    <motion.div
      initial={{ opacity: 0, x: 400, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 400, scale: 0.8 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={`${bgColor} text-white rounded-lg shadow-2xl border-2 ${borderColor} overflow-hidden`}
    >
      <div className="p-4 flex items-start gap-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring' }}
        >
          <Icon className="w-6 h-6 flex-shrink-0 mt-0.5" />
        </motion.div>
        <div className="flex-1">
          {toast.title && (
            <h4 className="font-bold text-sm mb-1">{toast.title}</h4>
          )}
          <p className="text-sm">{toast.message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:bg-white/20 rounded-lg p-1 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      {toast.duration && toast.duration > 0 && (
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: 0 }}
          transition={{ duration: toast.duration / 1000, ease: 'linear' }}
          className="h-1 bg-white/30"
        />
      )}
    </motion.div>
  )
}

