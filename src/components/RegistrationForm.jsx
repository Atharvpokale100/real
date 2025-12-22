import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Phone, Calendar, BookOpen, Send, CheckCircle, FileUp, Trash2, School, Award, AlertTriangle } from 'lucide-react'
import { saveApplication, generateAppId } from '../utils/storage'

const Stepper = ({ steps, currentStep }) => (
  <div className="flex justify-between items-start mb-8 overflow-x-auto pb-2">
    {steps.map((step, index) => {
      const stepNumber = index + 1
      const isActive = stepNumber === currentStep
      const isCompleted = stepNumber < currentStep

      return (
        <div key={step} className={`flex items-center ${index > 0 ? 'flex-1' : ''}`}>
          {index > 0 && <div className={`flex-1 h-0.5 transition-colors duration-300 ${isCompleted || isActive ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}></div>}
          <div className="flex flex-col items-center mx-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                isActive ? 'bg-indigo-600 text-white scale-110' : isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300'
              }`}
            >
              {isCompleted ? <CheckCircle size={16} /> : stepNumber}
            </div>
            <div className={`mt-2 text-xs font-medium text-center ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}>{step}</div>
          </div>
        </div>
      )
    })}
  </div>
)

const ConfirmationModal = ({ onCancel, onConfirm, isSubmitting }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-sm w-full"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Confirm Submission</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Please ensure all details are correct. You cannot edit the application after submission.
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={onCancel} className="px-6 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
              Cancel
            </button>
            <button onClick={onConfirm} disabled={isSubmitting} className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70">
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Confirm & Submit'
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    qualification: '',
    gpa: '',
    course: '',
    files: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [applicationId, setApplicationId] = useState(null)
  const [errors, setErrors] = useState({})
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const steps = ['Personal Info', 'Academic Details', 'Course Selection', 'Documents', 'Review & Submit']

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null })
    }
  }

  const processFiles = (files) => {
    const selectedFiles = Array.from(files)
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png']
    const validFiles = []
    let fileError = null

    selectedFiles.forEach(file => {
      if (validTypes.includes(file.type)) {
        validFiles.push(file)
      } else {
        fileError = 'Invalid file type. Only PDF, DOC, DOCX, JPG, and PNG are allowed.'
      }
    })

    if (fileError) {
      setErrors(prev => ({ ...prev, files: fileError }))
    } else {
      setErrors(prev => ({ ...prev, files: null }))
      setFormData(prev => ({ ...prev, files: [...prev.files, ...validFiles] }))
    }
  }

  const handleFileChange = (e) => {
    processFiles(e.target.files)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    processFiles(e.dataTransfer.files)
  }

  const removeFile = (index) => {
    setFormData({ ...formData, files: formData.files.filter((_, i) => i !== index) })
  }

  const validateStep = () => {
    const newErrors = {}
    let isValid = true

    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required'
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format'
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
      if (!formData.dob) newErrors.dob = 'Date of Birth is required'
    } else if (currentStep === 2) {
      if (!formData.qualification.trim()) newErrors.qualification = 'Qualification is required'
      if (!formData.gpa.trim()) newErrors.gpa = 'GPA is required'
    } else if (currentStep === 3) {
      if (!formData.course) newErrors.course = 'Please select a course'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      isValid = false
    }
    return isValid
  }

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length))
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const executeSubmit = async () => {
    setIsConfirmModalOpen(false)
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    const id = generateAppId()
    const { files, ...restData } = formData
    const application = {
      id,
      ...restData,
      status: 'Pending',
      dateApplied: new Date().toISOString(),
      documents: files.map(f => ({ name: f.name, size: f.size }))
    }
    saveApplication(application)
    setApplicationId(id)

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentStep === steps.length) {
      setIsConfirmModalOpen(true)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Personal Info
        return (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
              <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${errors.fullName ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-gray-900/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all`} placeholder="John Doe" /></div>
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
              <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="email" name="email" required value={formData.email} onChange={handleChange} className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-gray-900/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all`} placeholder="john@example.com" /></div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number</label>
              <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-gray-900/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all`} placeholder="+1 (555) 000-0000" /></div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Date of Birth</label>
              <div className="relative"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="date" name="dob" required value={formData.dob} onChange={handleChange} className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${errors.dob ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-gray-900/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all`} /></div>
              {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
            </div>
          </div>
        )
      case 2: // Academic Details
        return (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Previous Qualification</label>
              <div className="relative"><School className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" name="qualification" required value={formData.qualification} onChange={handleChange} className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${errors.qualification ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-gray-900/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all`} placeholder="e.g., High School Diploma" /></div>
              {errors.qualification && <p className="text-red-500 text-xs mt-1">{errors.qualification}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">GPA / Percentage</label>
              <div className="relative"><Award className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" name="gpa" required value={formData.gpa} onChange={handleChange} className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${errors.gpa ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-gray-900/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all`} placeholder="e.g., 3.8 or 92%" /></div>
              {errors.gpa && <p className="text-red-500 text-xs mt-1">{errors.gpa}</p>}
            </div>
          </div>
        )
      case 3: // Course Selection
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Interested Course</label>
            <div className="relative"><BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><select name="course" required value={formData.course} onChange={handleChange} className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${errors.course ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-gray-900/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all appearance-none`}><option value="">Select a course</option><option value="B.Tech">B.Tech</option><option value="MBA">MBA</option><option value="B.Sc">B.Sc</option><option value="B.Com">B.Com</option></select></div>
            {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course}</p>}
          </div>
        )
      case 4: // Documents
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Upload Documents</label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDragging
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-indigo-500'
              }`}
            >
              <input type="file" id="documents" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={handleFileChange} className="hidden" />
              <label htmlFor="documents" className="cursor-pointer"><FileUp className="w-10 h-10 mx-auto mb-3 text-gray-400" /><p className="text-gray-600 dark:text-gray-300 font-semibold">Click to upload or drag and drop</p><p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, JPG, PNG</p></label>
            </div>
            {errors.files && <p className="text-red-500 text-sm mt-2 text-center">{errors.files}</p>}
            {formData.files.length > 0 && (
              <div className="mt-4 space-y-2">{formData.files.map((file, index) => (<motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg"><span className="text-sm text-gray-700 dark:text-gray-200 truncate">📄 {file.name}</span><button type="button" onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50"><Trash2 className="w-4 h-4" /></button></motion.div>))}</div>
            )}
          </div>
        )
      case 5: // Review & Submit
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Review Your Information</h3>
            {Object.entries(formData).map(([key, value]) => {
              if (key === 'files') return null
              return (<div key={key} className="flex justify-between items-center text-sm p-2 bg-gray-50 dark:bg-gray-700/50 rounded-md"><span className="font-medium text-gray-600 dark:text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span><span className="text-gray-800 dark:text-white">{value || 'Not provided'}</span></div>)
            })}
            {formData.files.length > 0 && (
              <div><h4 className="font-medium text-gray-600 dark:text-gray-300 text-sm mb-1">Documents:</h4><ul className="list-disc list-inside text-sm text-gray-800 dark:text-white">{formData.files.map(f => <li key={f.name}>{f.name}</li>)}</ul></div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 pt-32 pb-20 px-4">
      <AnimatePresence>
        {isConfirmModalOpen && (
          <ConfirmationModal
            onCancel={() => setIsConfirmModalOpen(false)}
            onConfirm={executeSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </AnimatePresence>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" /></div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Registration Successful!</h3>
              <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-2">Application ID: {applicationId}</p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Thank you for registering. Please save your Application ID to track your admission status.</p>
              <button onClick={() => { setIsSubmitted(false); setCurrentStep(1); }} className="text-indigo-600 hover:text-indigo-700 font-medium">Register another student</button>
            </motion.div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">Student Registration</h1>
                <p className="text-gray-600 dark:text-gray-300">Complete the steps to join our academic community.</p>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-6">
                <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${(currentStep / steps.length) * 100}%` }}></div>
              </div>

              <Stepper steps={steps} currentStep={currentStep} />

              <form onSubmit={handleSubmit} className="space-y-5">
                <AnimatePresence mode="wait">
                  <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    {renderStepContent()}
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-between pt-4">
                  {currentStep > 1 && (
                    <button type="button" onClick={handleBack} className="px-6 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">Back</button>
                  )}
                  {currentStep < steps.length && (
                    <button type="button" onClick={handleNext} className="ml-auto px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all">Next</button>
                  )}
                  {currentStep === steps.length && (
                    <button type="submit" disabled={isSubmitting} className="ml-auto w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70">
                      {isSubmitting ? (<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />) : (<><span>Review & Submit</span><Send className="w-4 h-4" /></>)}
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}