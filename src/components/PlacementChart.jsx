import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  BarController,
  LineController,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Building2, Award, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  BarController,
  LineController,
  Title,
  Tooltip,
  Legend
)

export default function PlacementChart() {
  const [chartData, setChartData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchPlacementData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500)) // Mock delay
      
      setChartData({
        labels: ['2019', '2020', '2021', '2022', '2023'],
        datasets: [
          {
            type: 'bar',
            label: 'Highest Package (LPA)',
            data: [18, 22, 28, 35, 45],
            backgroundColor: 'rgba(99, 102, 241, 0.8)',
            borderColor: 'rgba(99, 102, 241, 1)',
            borderWidth: 1,
            borderRadius: 6,
            order: 2,
          },
          {
            type: 'line',
            label: 'Average Package (LPA)',
            data: [6.5, 7.2, 8.5, 10.5, 12.8],
            borderColor: 'rgba(168, 85, 247, 1)',
            backgroundColor: 'rgba(168, 85, 247, 0.5)',
            borderWidth: 3,
            tension: 0.4,
            pointBackgroundColor: '#fff',
            pointBorderColor: 'rgba(168, 85, 247, 1)',
            pointRadius: 4,
            pointHoverRadius: 6,
            order: 1,
          },
        ],
      })
      setLoading(false)
    }

    fetchPlacementData()
  }, [])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { family: "'Inter', sans-serif", size: 12 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 13, family: "'Inter', sans-serif" },
        bodyFont: { size: 12, family: "'Inter', sans-serif" },
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: { font: { family: "'Inter', sans-serif" } }
      },
      x: {
        grid: { display: false },
        ticks: { font: { family: "'Inter', sans-serif" } }
      }
    }
  }

  const stats = [
    { label: 'Placement Rate', value: '95%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
    { label: 'Recruiters', value: '150+', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { label: 'Students Placed', value: '2k+', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    { label: 'Highest Package', value: '45 LPA', icon: Award, color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Placement <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Analytics</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">Our consistent track record of placements in top-tier companies speaks for the quality of education we provide.</p>
        </motion.div>
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.bg}`}><stat.icon className={`w-6 h-6 ${stat.color}`} /></div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 h-[400px]">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              </div>
            ) : (
              <Chart type='bar' data={chartData} options={options} />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}