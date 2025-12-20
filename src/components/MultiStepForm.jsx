import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, CheckCircle, Upload, X, FileText } from 'lucide-react'
import { saveApplication, generateAppId } from '../utils/storage'
import Confetti from './Confetti'
import SuccessModal from './SuccessModal'

const steps = [
  { id: 1, title: 'Personal Info', icon: '👤' },
  { id: 2, title: 'Academic Details', icon: '🎓' },
  { id: 3, title: 'Documents', icon: '📄' },
  { id: 4, title: 'Review', icon: '✓' },
]

export default function MultiStepForm({ onSuccess }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    // Step 2
    course: '',
    degree: '',
    qualification: '',
    gpa: '',
    statement: '',
    // Step 3
    documents: [],
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [files, setFiles] = useState([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [submittedAppId, setSubmittedAppId] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validateStep = (step) => {
    const newErrors = {}
    
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
      if (!formData.address.trim()) newErrors.address = 'Address is required'
      if (!formData.city.trim()) newErrors.city = 'City is required'
      if (!formData.country.trim()) newErrors.country = 'Country is required'
    }
    
    if (step === 2) {
      if (!formData.course) newErrors.course = 'Course selection is required'
      if (!formData.degree) newErrors.degree = 'Degree level is required'
      if (!formData.qualification.trim()) newErrors.qualification = 'Previous qualification is required'
      if (!formData.gpa) newErrors.gpa = 'GPA/Percentage is required'
      else if (parseFloat(formData.gpa) < 0 || parseFloat(formData.gpa) > 100) {
        newErrors.gpa = 'GPA must be between 0 and 100'
      }
      if (!formData.statement.trim()) newErrors.statement = 'Personal statement is required'
      else if (formData.statement.trim().length < 100) {
        newErrors.statement = 'Personal statement must be at least 100 characters'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles([...files, ...selectedFiles])
  }

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (!validateStep(4)) return

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const appId = generateAppId()
    const application = {
      id: appId,
      ...formData,
      documents: files.map((f) => ({ name: f.name, size: f.size })),
      status: 'Pending',
      dateApplied: new Date().toISOString(),
    }

    saveApplication(application)
    
    setIsSubmitting(false)
    setSubmittedAppId(appId)
    setShowConfetti(true)
    setShowSuccessModal(true)
    if (onSuccess) onSuccess(appId)
    
    // Reset form after modal closes (35 seconds to allow modal to auto-close)
    setTimeout(() => {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
        course: '',
        degree: '',
        qualification: '',
        gpa: '',
        statement: '',
        documents: [],
      })
      setFiles([])
      setCurrentStep(1)
      setSubmittedAppId(null)
      setShowSuccessModal(false)
    }, 35000)
  }

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  }

  const handleCloseModal = () => {
    setShowSuccessModal(false)
    setShowConfetti(false)
  }

  return (
    <>
      <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />
      <SuccessModal
        isOpen={showSuccessModal}
        applicationId={submittedAppId || ''}
        onClose={handleCloseModal}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card max-w-4xl mx-auto"
      >
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <motion.div
                  initial={false}
                  animate={{
                    scale: currentStep === step.id ? 1.1 : 1,
                    backgroundColor: currentStep >= step.id ? '#6366f1' : '#e5e7eb',
                  }}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mb-2 relative z-10"
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <span>{step.icon}</span>
                  )}
                </motion.div>
                <span className="text-sm font-medium text-gray-700">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-2 mb-6 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: currentStep > step.id ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-primary-600"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
          />
        </div>
      </div>

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
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
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.fullName}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email Address <span className="text-red-500">*</span>
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
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Phone Number <span className="text-red-500">*</span>
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
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.phone}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={`input-field ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                />
                {errors.dateOfBirth && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.dateOfBirth}
                  </motion.p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className={`input-field ${errors.address ? 'border-red-500' : ''}`}
                />
                {errors.address && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.address}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`input-field ${errors.city ? 'border-red-500' : ''}`}
                />
                {errors.city && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.city}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`input-field ${errors.country ? 'border-red-500' : ''}`}
                />
                {errors.country && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.country}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold mb-6">Academic Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.course}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Degree Level <span className="text-red-500">*</span>
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
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.degree}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Previous Qualification <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  placeholder="e.g., High School Diploma"
                  className={`input-field ${errors.qualification ? 'border-red-500' : ''}`}
                />
                {errors.qualification && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.qualification}
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
                  placeholder="e.g., 3.5 or 85"
                  className={`input-field ${errors.gpa ? 'border-red-500' : ''}`}
                />
                {errors.gpa && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.gpa}
                  </motion.p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">
                  Personal Statement <span className="text-red-500">*</span>
                  <span className="text-gray-500 text-xs font-normal ml-2">
                    ({formData.statement.length} / 100 minimum)
                  </span>
                </label>
                <textarea
                  name="statement"
                  value={formData.statement}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Tell us about yourself, your goals, and why you want to join this program..."
                  className={`input-field ${errors.statement ? 'border-red-500' : ''}`}
                />
                {errors.statement && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.statement}
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold mb-6">Upload Documents</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary-500 transition-colors">
              <input
                type="file"
                id="documents"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="documents" className="cursor-pointer">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center"
                >
                  <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 font-semibold text-lg">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500 mt-2">PDF, DOC, DOCX, JPG, PNG (Max 10MB each)</p>
                </motion.div>
              </label>
            </div>

            {files.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2 mt-6"
              >
                {files.map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="font-medium text-gray-800">{file.name}</p>
                        <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}

        {currentStep === 4 && (
          <motion.div
            key="step4"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold mb-6">Review Your Application</h2>
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-3">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Name:</strong> {formData.fullName}</div>
                  <div><strong>Email:</strong> {formData.email}</div>
                  <div><strong>Phone:</strong> {formData.phone}</div>
                  <div><strong>Date of Birth:</strong> {new Date(formData.dateOfBirth).toLocaleDateString()}</div>
                  <div className="col-span-2"><strong>Address:</strong> {formData.address}</div>
                  <div><strong>City:</strong> {formData.city}</div>
                  <div><strong>Country:</strong> {formData.country}</div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-lg mb-3">Academic Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Course:</strong> {formData.course}</div>
                  <div><strong>Degree:</strong> {formData.degree}</div>
                  <div><strong>Qualification:</strong> {formData.qualification}</div>
                  <div><strong>GPA:</strong> {formData.gpa}</div>
                  <div className="col-span-2"><strong>Statement:</strong> {formData.statement.substring(0, 100)}...</div>
                </div>
              </div>

              {files.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-lg mb-3">Documents ({files.length})</h3>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="text-sm text-gray-700">• {file.name}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </motion.button>

        {currentStep < steps.length ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="btn-primary flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Application
                <CheckCircle className="w-5 h-5" />
              </>
            )}
          </motion.button>
        )}
      </div>
      </motion.div>
    </>
  )
}

