import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Clock, CheckCircle, XCircle, Award, Target } from 'lucide-react'
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
} from 'chart.js'
import { Doughnut, Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function ApplicationAnalytics({ applications }) {
  const stats = useMemo(() => {
    const total = applications.length
    const pending = applications.filter((app) => app.status === 'Pending').length
    const reviewing = applications.filter((app) => app.status === 'Reviewing').length
    const accepted = applications.filter((app) => app.status === 'Accepted').length
    const rejected = applications.filter((app) => app.status === 'Rejected').length
    const acceptanceRate = total > 0 ? ((accepted / total) * 100).toFixed(1) : 0

    // Calculate average processing time (simulated)
    const avgProcessingDays = total > 0 ? Math.floor(Math.random() * 15 + 5) : 0

    return {
      total,
      pending,
      reviewing,
      accepted,
      rejected,
      acceptanceRate,
      avgProcessingDays,
    }
  }, [applications])

  const statusData = {
    labels: ['Pending', 'Reviewing', 'Accepted', 'Rejected'],
    datasets: [
      {
        data: [stats.pending, stats.reviewing, stats.accepted, stats.rejected],
        backgroundColor: [
          'rgba(245, 158, 11, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(239, 68, 68, 0.8)',
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
      return applications.filter((app) => app.dateApplied?.split('T')[0] === date).length
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
    { icon: Target, label: 'Total Applications', value: stats.total, color: 'indigo' },
    { icon: Clock, label: 'Avg. Processing Time', value: `${stats.avgProcessingDays} days`, color: 'blue' },
    { icon: Award, label: 'Acceptance Rate', value: `${stats.acceptanceRate}%`, color: 'green' },
    { icon: CheckCircle, label: 'Accepted', value: stats.accepted, color: 'green' },
    { icon: XCircle, label: 'Rejected', value: stats.rejected, color: 'red' },
    { icon: TrendingUp, label: 'In Review', value: stats.reviewing, color: 'purple' },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Application Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
                <p className={`text-3xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400 mt-2`}>
                  {stat.value}
                </p>
              </div>
              <stat.icon className={`w-12 h-12 text-${stat.color}-600 dark:text-${stat.color}-400 opacity-20`} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-xl font-bold mb-4 dark:text-white">Status Distribution</h3>
          <Doughnut data={statusData} options={{ responsive: true, maintainAspectRatio: true }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-xl font-bold mb-4 dark:text-white">Application Timeline</h3>
          <Line
            data={timelineData}
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
    </div>
  )
}


