import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'

export default function ImagePreview({ file, onRemove }) {
  const [preview, setPreview] = useState(null)
  const [showFullPreview, setShowFullPreview] = useState(false)

  useEffect(() => {
    if (file instanceof File) {
      if (file.type && file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result)
        }
        reader.readAsDataURL(file)
      } else {
        setPreview(null)
      }
    }
  }, [file])

  if (!file) return null

  const isImage = file.type?.startsWith('image/') || file.name?.match(/\.(jpg|jpeg|png|gif)$/i)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative group"
      >
        <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 hover:border-primary-500 transition-colors">
          {isImage && preview ? (
            <div className="relative">
              <img
                src={preview}
                alt={file.name}
                className="w-full h-32 object-cover cursor-pointer"
                onClick={() => setShowFullPreview(true)}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ) : (
            <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">📄</div>
                <p className="text-xs text-gray-600 truncate px-2">{file.name}</p>
              </div>
            </div>
          )}
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
        <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
      </motion.div>

      <AnimatePresence>
        {showFullPreview && preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setShowFullPreview(false)}
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={preview}
              alt={file.name}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setShowFullPreview(false)}
              className="absolute top-4 right-4 bg-white text-black rounded-full p-2 hover:bg-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

