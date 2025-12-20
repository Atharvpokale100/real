import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Upload, X } from 'lucide-react'
import { saveApplication, generateAppId } from '../utils/storage'

export default function ApplicationForm() {
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
  const [showSuccess, setShowSuccess] = useState(false)
  const [applicationId, setApplicationId] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles(selectedFiles)
  }

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const appId = generateAppId()
    const application = {
      id: appId,
      ...formData,
      status: 'Pending',
      dateApplied: new Date().toISOString(),
      documents: files.map((f) => ({ name: f.name, size: f.size })),
    }

    saveApplication(application)
    setApplicationId(appId)
    setShowSuccess(true)
    setIsSubmitting(false)

    // Reset form
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
      setShowSuccess(false)
    }, 5000)
  }

  const resetForm = () => {
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
    setShowSuccess(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card max-w-5xl mx-auto"
    >
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-semibold text-green-800">
                Application submitted successfully!
              </p>
              <p className="text-green-700">Your Application ID: <strong>{applicationId}</strong></p>
            </div>
          </div>
        </motion.div>
      )}

      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Application Form
      </h2>

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
              required
              className="input-field"
            />
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
              required
              className="input-field"
            />
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
              required
              className="input-field"
            />
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
              required
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Course <span className="text-red-500">*</span>
            </label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              className="input-field"
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
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Degree Level <span className="text-red-500">*</span>
            </label>
            <select
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">Select Degree</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Graduate">Graduate</option>
              <option value="Doctorate">Doctorate</option>
            </select>
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
              required
              placeholder="e.g., High School Diploma"
              className="input-field"
            />
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
              required
              placeholder="e.g., 3.5 or 85"
              className="input-field"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="3"
              className="input-field"
            />
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
              required
              className="input-field"
            />
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
              required
              className="input-field"
            />
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

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2">
              Personal Statement <span className="text-red-500">*</span>
            </label>
            <textarea
              name="statement"
              value={formData.statement}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Tell us about yourself, your goals, and why you want to join this program..."
              className="input-field"
            />
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
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                  >
                    <span className="text-sm text-gray-700">
                      📄 {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4 justify-end pt-6 border-t">
          <button type="button" onClick={resetForm} className="btn-secondary">
            Reset Form
          </button>
          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </span>
            ) : (
              'Submit Application'
            )}
          </button>
        </div>
      </form>
    </motion.div>
  )
}

