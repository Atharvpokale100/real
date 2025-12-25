import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShieldCheck, Users, FileText, TrendingUp, AlertCircle, CheckCircle2, XCircle, Search, Eye, EyeOff, Lock, User, ArrowLeft } from 'lucide-react'

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Mock Data
  const applications = [
    { id: 'APP001', name: 'John Doe', course: 'Computer Science', score: 92, status: 'Pending', aiScore: 95 },
    { id: 'APP002', name: 'Jane Smith', course: 'MBA', score: 88, status: 'Approved', aiScore: 89 },
    { id: 'APP003', name: 'Mike Johnson', course: 'B.Tech', score: 75, status: 'Rejected', aiScore: 60 },
    { id: 'APP004', name: 'Sarah Wilson', course: 'Data Science', score: 95, status: 'Pending', aiScore: 98 },
  ]

  const handleLogin = (e) => {
    e.preventDefault()
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      setIsLoggedIn(true)
      setError('')
    } else {
      setError('Invalid credentials')
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <Link to="/" className="absolute top-8 left-8 text-white/70 hover:text-white flex items-center gap-2 transition-colors z-20 group">
          <div className="p-2 bg-white/10 rounded-full backdrop-blur-md group-hover:bg-white/20 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="font-medium">Back to Home</span>
        </Link>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md relative z-10"
        >
          <div className="text-center mb-8">
            <motion.div 
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform rotate-3"
            >
              <ShieldCheck className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">Admin Portal</h2>
            <p className="text-indigo-200">Secure access for authorized personnel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-indigo-200 ml-1">Admin ID</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-indigo-300 group-focus-within:text-white transition-colors" />
                </div>
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-indigo-300/30 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-white placeholder-indigo-300/50 transition-all"
                  placeholder="Enter admin ID"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-indigo-200 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-indigo-300 group-focus-within:text-white transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full pl-12 pr-12 py-4 bg-white/5 border border-indigo-300/30 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-white placeholder-indigo-300/50 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-indigo-300 hover:text-white transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button type="button" className="text-sm text-indigo-300 hover:text-white transition-colors">Forgot Password?</button>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-200 text-sm bg-red-500/20 border border-red-500/30 p-4 rounded-xl"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Sign In to Dashboard</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-indigo-300/60 text-sm">
              Protected by secure encryption
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h1>
            <p className="text-gray-500 dark:text-gray-400">Welcome back, Administrator</p>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="px-4 py-2 bg-white dark:bg-gray-800 text-red-500 rounded-lg shadow-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border border-gray-200 dark:border-gray-700"
          >
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Applications', value: '1,234', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
            { label: 'Pending Review', value: '45', icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
            { label: 'Accepted', value: '856', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
            { label: 'Avg. AI Score', value: '88%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className={`text-sm font-bold ${stat.color} bg-opacity-10 px-2 py-1 rounded-full`}>+12%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{stat.value}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Applications Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Recent Applications</h2>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search applicants..." className="pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-indigo-500 dark:text-white w-64" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Applicant ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Course</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Score</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">AI Prediction</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-indigo-600 dark:text-indigo-400">#{app.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 font-medium">{app.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{app.course}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{app.score}%</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 w-24">
                          <div className={`h-2 rounded-full ${app.aiScore > 90 ? 'bg-green-500' : app.aiScore > 70 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${app.aiScore}%` }}></div>
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{app.aiScore}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        app.status === 'Approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        app.status === 'Rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-1 hover:bg-green-100 dark:hover:bg-green-900/30 rounded text-green-600 transition-colors"><CheckCircle2 className="w-5 h-5" /></button>
                        <button className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600 transition-colors"><XCircle className="w-5 h-5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}