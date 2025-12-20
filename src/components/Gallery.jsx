import { motion } from 'framer-motion'
import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const galleryItems = [
    {
      src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600',
      alt: 'Modern Campus Building',
      category: 'Campus',
      title: 'State-of-the-Art Facilities'
    },
    {
      src: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=600',
      alt: 'Computer Lab',
      category: 'Technology',
      title: 'Advanced Computer Labs'
    },
    {
      src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600',
      alt: 'Library',
      category: 'Learning',
      title: 'Extensive Library Collection'
    },
    {
      src: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600',
      alt: 'Sports Complex',
      category: 'Sports',
      title: 'World-Class Sports Facilities'
    },
    {
      src: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600',
      alt: 'Auditorium',
      category: 'Events',
      title: 'Grand Auditorium'
    },
    {
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600',
      alt: 'Student Activities',
      category: 'Community',
      title: 'Vibrant Student Life'
    },
    {
      src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600',
      alt: 'Engineering Workshop',
      category: 'Engineering',
      title: 'Engineering Workshops'
    },
    {
      src: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600',
      alt: 'Research Lab',
      category: 'Research',
      title: 'Cutting-Edge Research Labs'
    },
    {
      src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600',
      alt: 'Cafeteria',
      category: 'Campus',
      title: 'Modern Cafeteria'
    },
  ]

  const categories = ['All', 'Campus', 'Technology', 'Learning', 'Sports', 'Events', 'Community', 'Engineering', 'Research']
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredImages = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory)

  const openModal = (index) => {
    setCurrentIndex(index)
    setSelectedImage(filteredImages[index])
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % filteredImages.length
    setCurrentIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }

  const prevImage = () => {
    const newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Campus Gallery
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our beautiful campus, state-of-the-art facilities, and vibrant community through our photo gallery
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredImages.map((item, index) => (
            <motion.div
              key={`${activeCategory}-${index}`}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={() => openModal(index)}
            >
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 bg-primary-500 text-white text-sm font-semibold rounded-full mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-white text-xl font-bold">{item.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
                <span className="inline-block px-3 py-1 bg-primary-500 text-white text-sm font-semibold rounded-full mb-2">
                  {selectedImage.category}
                </span>
                <h3 className="text-white text-xl font-bold">{selectedImage.title}</h3>
                <p className="text-gray-300 text-sm mt-1">
                  {currentIndex + 1} of {filteredImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Campus Highlights</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-secondary-100">Buildings</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100+</div>
              <div className="text-secondary-100">Labs</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">25+</div>
              <div className="text-secondary-100">Sports Facilities</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">500K+</div>
              <div className="text-secondary-100">Books</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}