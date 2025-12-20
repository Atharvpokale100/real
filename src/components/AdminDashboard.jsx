import { useState, useEffect, useMemo } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  FileCheck,
  TrendingUp,
} from 'lucide-react'
import { getApplications, updateApplicationStatus, deleteApplication, filterApplications } from '../utils/storage'
import { generateApplicationPDF, generateReportPDF } from '../utils/pdfGenerator'
import AnimatedCounter from './AnimatedCounter'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

function AdminDashboard({ user, onLogout }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [courseFilter, setCourseFilter] = useState('')
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const apps = getApplications()
    setApplications(apps)
  }, [])

  const filteredApplications = useMemo(() => {
    return filterApplications(applications, searchTerm, statusFilter, courseFilter)
  }, [applications, searchTerm, statusFilter, courseFilter])

  const stats = useMemo(() => {
    const total = applications.length
    const pending = applications.filter((app) => app.status === 'Pending').length
    const reviewing = applications.filter((app) => app.status === 'Reviewing').length
    const accepted = applications.filter((app) => app.status === 'Accepted').length
    const rejected = applications.filter((app) => app.status === 'Rejected').length

    return { total, pending, reviewing, accepted, rejected }
  }, [applications])

  const handleStatusUpdate = (appId, newStatus) => {
    updateApplicationStatus(appId, newStatus)
    const apps = getApplications()
    setApplications(apps)
  }

  const handleDelete = (appId) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      deleteApplication(appId)
      const apps = getApplications()
      setApplications(apps)
    }
  }

  const handleViewDetails = (app) => {
    setSelectedApplication(app)
    setShowModal(true)
  }

  const handleDownloadPDF = (app) => {
    const doc = generateApplicationPDF(app)
    doc.save(`Application_${app.id}.pdf`)
  }

  const handleDownloadReport = () => {
    const doc = generateReportPDF(filteredApplications, 'Applications Report')
    doc.save(`Applications_Report_${new Date().toISOString().split('T')[0]}.pdf`)
  }

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/applications', label: 'Applications', icon: FileText },
    { path: '/admin/analytics', label: 'Analytics', icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-64 bg-white shadow-2xl min-h-screen p-6"
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-sm text-gray-600 mt-1">{user?.fullName || user?.username}</p>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-semibold">{item.label}</span>
                  </motion.div>
                </Link>
              )
            })}
          </nav>

          <button
            onClick={onLogout}
            className="mt-8 w-full flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-semibold"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Routes>
            <Route
              path="/"
              element={
                <AdminOverview
                  stats={stats}
                  applications={applications}
                  onStatusUpdate={handleStatusUpdate}
                />
              }
            />
            <Route
              path="/applications"
              element={
                <ApplicationsManagement
                  applications={filteredApplications}
                  searchTerm={searchTerm}
                  statusFilter={statusFilter}
                  courseFilter={courseFilter}
                  onSearchChange={setSearchTerm}
                  onStatusFilterChange={setStatusFilter}
                  onCourseFilterChange={setCourseFilter}
                  onViewDetails={handleViewDetails}
                  onStatusUpdate={handleStatusUpdate}
                  onDelete={handleDelete}
                  onDownloadPDF={handleDownloadPDF}
                  onDownloadReport={handleDownloadReport}
                />
              }
            />
            <Route
              path="/analytics"
              element={<AnalyticsView applications={applications} stats={stats} />}
            />
          </Routes>
        </main>
      </div>

      {/* Application Details Modal */}
      <AnimatePresence>
        {showModal && selectedApplication && (
          <ApplicationModal
            application={selectedApplication}
            onClose={() => setShowModal(false)}
            onDownloadPDF={handleDownloadPDF}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function AdminOverview({ stats, applications, onStatusUpdate }) {
  const recentApplications = applications.slice(-5).reverse()

  const statCards = [
    { icon: Users, label: 'Total Applications', value: stats.total, color: 'indigo' },
    { icon: Clock, label: 'Pending', value: stats.pending, color: 'amber' },
    { icon: FileCheck, label: 'Reviewing', value: stats.reviewing, color: 'blue' },
    { icon: CheckCircle, label: 'Accepted', value: stats.accepted, color: 'green' },
    { icon: XCircle, label: 'Rejected', value: stats.rejected, color: 'red' },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg border border-gray-100"
            >
              <stat.icon className={`w-8 h-8 text-${stat.color}-600 mb-3`} />
              <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
              <p className={`text-3xl font-bold text-${stat.color}-600 mt-2`}>
                <AnimatedCounter value={stat.value} />
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold mb-4">Recent Applications</h3>
        <div className="space-y-3">
          {recentApplications.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No applications yet</p>
          ) : (
            recentApplications.map((app) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{app.id}</span>
                    <span className={`status-badge status-${app.status.toLowerCase()}`}>
                      {app.status}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-1">{app.fullName} - {app.course}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const statuses = ['Pending', 'Reviewing', 'Accepted', 'Rejected']
                      const currentIndex = statuses.indexOf(app.status)
                      const nextStatus = statuses[(currentIndex + 1) % statuses.length]
                      onStatusUpdate(app.id, nextStatus)
                    }}
                    className="px-3 py-1 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors"
                  >
                    Update Status
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function ApplicationsManagement({
  applications,
  searchTerm,
  statusFilter,
  courseFilter,
  onSearchChange,
  onStatusFilterChange,
  onCourseFilterChange,
  onViewDetails,
  onStatusUpdate,
  onDelete,
  onDownloadPDF,
  onDownloadReport,
}) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Applications Management
          </h2>
          <button onClick={onDownloadReport} className="btn-primary">
            <Download className="w-5 h-5" />
            Download Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="input-field"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Reviewing">Reviewing</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select
            value={courseFilter}
            onChange={(e) => onCourseFilterChange(e.target.value)}
            className="input-field"
          >
            <option value="">All Courses</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Business Administration">Business Administration</option>
            <option value="Engineering">Engineering</option>
            <option value="Medicine">Medicine</option>
            <option value="Law">Law</option>
            <option value="Arts & Humanities">Arts & Humanities</option>
            <option value="Sciences">Sciences</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Course</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                    No applications found
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-semibold">{app.id}</td>
                    <td className="px-4 py-3">{app.fullName}</td>
                    <td className="px-4 py-3">{app.email}</td>
                    <td className="px-4 py-3">{app.course}</td>
                    <td className="px-4 py-3">
                      <span className={`status-badge status-${app.status.toLowerCase()}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(app.dateApplied).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => onViewDetails(app)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDownloadPDF(app)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Download PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <select
                          value={app.status}
                          onChange={(e) => onStatusUpdate(app.id, e.target.value)}
                          className="px-2 py-1 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Reviewing">Reviewing</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                        <button
                          onClick={() => onDelete(app.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function AnalyticsView({ applications, stats }) {
  const courseData = useMemo(() => {
    const courses = {}
    applications.forEach((app) => {
      courses[app.course] = (courses[app.course] || 0) + 1
    })
    return courses
  }, [applications])

  const statusData = {
    labels: ['Pending', 'Reviewing', 'Accepted', 'Rejected'],
    datasets: [
      {
        label: 'Applications',
        data: [stats.pending, stats.reviewing, stats.accepted, stats.rejected],
        backgroundColor: [
          'rgba(245, 158, 11, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgb(245, 158, 11)',
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 2,
      },
    ],
  }

  const courseChartData = {
    labels: Object.keys(courseData),
    datasets: [
      {
        label: 'Applications by Course',
        data: Object.values(courseData),
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
        ],
        borderWidth: 2,
      },
    ],
  }

  const timelineData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      return date.toISOString().split('T')[0]
    })

    const dailyCounts = last7Days.map((date) => {
      return applications.filter((app) => app.dateApplied.split('T')[0] === date).length
    })

    return {
      labels: last7Days.map((date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
      datasets: [
        {
          label: 'Applications',
          data: dailyCounts,
          borderColor: 'rgb(99, 102, 241)',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    }
  }, [applications])

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Analytics & Insights
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Status Distribution</h3>
            <Doughnut data={statusData} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Applications by Course</h3>
            <Bar
              data={courseChartData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: { display: false },
                },
              }}
            />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Application Timeline (Last 7 Days)</h3>
          <Line
            data={timelineData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: { display: false },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

function ApplicationModal({ application, onClose, onDownloadPDF }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Application Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Application ID</p>
              <p className="font-semibold text-lg">{application.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <span className={`status-badge status-${application.status.toLowerCase()}`}>
                {application.status}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-semibold">{application.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold">{application.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold">{application.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date of Birth</p>
                <p className="font-semibold">{new Date(application.dateOfBirth).toLocaleDateString()}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-semibold">{application.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">City</p>
                <p className="font-semibold">{application.city}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Country</p>
                <p className="font-semibold">{application.country}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Academic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Course</p>
                <p className="font-semibold">{application.course}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Degree Level</p>
                <p className="font-semibold">{application.degree}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Previous Qualification</p>
                <p className="font-semibold">{application.qualification}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">GPA/Percentage</p>
                <p className="font-semibold">{application.gpa}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Personal Statement</h3>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{application.statement}</p>
          </div>

          {application.documents && application.documents.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4">Documents</h3>
              <div className="space-y-2">
                {application.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <span className="text-gray-700">📄 {doc.name}</span>
                    <span className="text-gray-600 text-sm">{(doc.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-6 border-t">
            <button onClick={() => onDownloadPDF(application)} className="btn-primary">
              <Download className="w-5 h-5" />
              Download PDF
            </button>
            <button onClick={onClose} className="btn-secondary">
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AdminDashboard

