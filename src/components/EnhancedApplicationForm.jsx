import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import { saveApplication, generateAppId } from '../utils/storage'
import ImagePreview from './ImagePreview'
import Confetti from './Confetti'

export default function EnhancedApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    course: '',
    degree: '',
    qualification: '',
    gpa: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    statement: '',
  })
  const [files, setFiles] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.course) newErrors.course = 'Course is required'
    if (!formData.degree) newErrors.degree = 'Degree is required'
    if (!formData.gpa) newErrors.gpa = 'GPA is required'
    if (!formData.statement.trim()) newErrors.statement = 'Personal statement is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles([...files, ...selectedFiles])
  }

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const appId = generateAppId()
    const application = {
      id: appId,
      ...formData,
      status: 'Pending',
      dateApplied: new Date().toISOString(),
      documents: files.map((f) => ({ name: f.name, size: f.size })),
    }

    saveApplication(application)
    setIsSubmitting(false)
    setShowConfetti(true)

    setTimeout(() => {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        course: '',
        degree: '',
        qualification: '',
        gpa: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
        statement: '',
      })
      setFiles([])
      setShowConfetti(false)
    }, 5000)
  }

  return (
    <>
      <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card max-w-5xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-8 h-8 text-primary-600" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Application Form
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`input-field ${errors.fullName ? 'border-red-500' : ''}`}
              />
              {errors.fullName && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.fullName}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`input-field ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
              />
              {errors.phone && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.phone}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Course <span className="text-red-500">*</span>
              </label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className={`input-field ${errors.course ? 'border-red-500' : ''}`}
              >
                <option value="">Select Course</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Engineering">Engineering</option>
                <option value="Medicine">Medicine</option>
                <option value="Law">Law</option>
                <option value="Arts & Humanities">Arts & Humanities</option>
                <option value="Sciences">Sciences</option>
              </select>
              {errors.course && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.course}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Degree <span className="text-red-500">*</span>
              </label>
              <select
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className={`input-field ${errors.degree ? 'border-red-500' : ''}`}
              >
                <option value="">Select Degree</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Graduate">Graduate</option>
                <option value="Doctorate">Doctorate</option>
              </select>
              {errors.degree && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.degree}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                GPA/Percentage <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="gpa"
                value={formData.gpa}
                onChange={handleChange}
                step="0.01"
                min="0"
                max="100"
                className={`input-field ${errors.gpa ? 'border-red-500' : ''}`}
              />
              {errors.gpa && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.gpa}
                </motion.p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">
                Personal Statement <span className="text-red-500">*</span>
              </label>
              <textarea
                name="statement"
                value={formData.statement}
                onChange={handleChange}
                rows="5"
                className={`input-field ${errors.statement ? 'border-red-500' : ''}`}
              />
              {errors.statement && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.statement}
                </motion.p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">Upload Documents</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
                <input
                  type="file"
                  id="documents"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="documents" className="cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 font-semibold">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500 mt-2">PDF, DOC, DOCX, JPG, PNG (Max 10MB each)</p>
                </label>
              </div>
              {files.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {files.map((file, index) => (
                    <ImagePreview key={index} file={file} onRemove={() => removeFile(index)} />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 justify-end pt-6 border-t">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setFormData({
                  fullName: '',
                  email: '',
                  phone: '',
                  dateOfBirth: '',
                  course: '',
                  degree: '',
                  qualification: '',
                  gpa: '',
                  address: '',
                  city: '',
                  country: '',
                  postalCode: '',
                  statement: '',
                })
                setFiles([])
                setErrors({})
              }}
              className="btn-secondary"
            >
              Reset
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Submit Application
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </>
  )
}

