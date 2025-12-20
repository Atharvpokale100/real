import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
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
import { TrendingUp, Users, CheckCircle, XCircle, Clock } from 'lucide-react'
import { getApplications, filterApplications } from '../utils/storage'
import AnimatedCounter from './AnimatedCounter'
import ApplicationAnalytics from './ApplicationAnalytics'

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

export default function Dashboard() {
  const [applications, setApplications] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [courseFilter, setCourseFilter] = useState('')

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

  const statCards = [
    { icon: Users, label: 'Total Applications', value: stats.total, color: 'indigo' },
    { icon: Clock, label: 'Pending Review', value: stats.pending, color: 'amber' },
    { icon: CheckCircle, label: 'Accepted', value: stats.accepted, color: 'green' },
    { icon: XCircle, label: 'Rejected', value: stats.rejected, color: 'red' },
  ]

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="card"
          >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className={`text-4xl font-bold text-${stat.color}-600 mt-2`}>
                    <AnimatedCounter value={stat.value} />
                  </p>
                </div>
                <stat.icon className={`w-12 h-12 text-${stat.color}-600 opacity-20`} />
              </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <h3 className="text-xl font-bold mb-4">Application Status Distribution</h3>
          <Doughnut data={statusData} options={{ responsive: true, maintainAspectRatio: true }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
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
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card"
      >
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name, email, or application ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field flex-1"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
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
            onChange={(e) => setCourseFilter(e.target.value)}
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
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">App ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Course</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date Applied</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                    No applications found
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
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
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

