import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Circle, Target, TrendingUp } from 'lucide-react'

const checklistItems = [
  { id: 1, label: 'Complete Application Form', key: 'formCompleted' },
  { id: 2, label: 'Upload Required Documents', key: 'documentsUploaded' },
  { id: 3, label: 'Submit Application', key: 'applicationSubmitted' },
  { id: 4, label: 'Receive Application ID', key: 'applicationIdReceived' },
  { id: 5, label: 'Application Under Review', key: 'underReview' },
  { id: 6, label: 'Decision Received', key: 'decisionReceived' },
]

export default function ApplicationChecklist({ application }) {
  const [completed, setCompleted] = useState({
    formCompleted: true,
    documentsUploaded: application?.documents?.length > 0,
    applicationSubmitted: !!application?.id,
    applicationIdReceived: !!application?.id,
    underReview: application?.status === 'Reviewing' || application?.status === 'Accepted' || application?.status === 'Rejected',
    decisionReceived: application?.status === 'Accepted' || application?.status === 'Rejected',
  })

  const progress = Object.values(completed).filter(Boolean).length
  const progressPercentage = (progress / checklistItems.length) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Target className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h3 className="text-xl font-bold dark:text-white">Application Progress</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{progress}/{checklistItems.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Steps Completed</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
          />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {progressPercentage.toFixed(0)}% Complete
        </p>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {checklistItems.map((item, index) => {
          const isCompleted = completed[item.key]
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isCompleted
                  ? 'bg-green-50 dark:bg-green-900/20'
                  : 'bg-gray-50 dark:bg-gray-700/50'
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
              ) : (
                <Circle className="w-6 h-6 text-gray-400 flex-shrink-0" />
              )}
              <span
                className={`flex-1 ${
                  isCompleted
                    ? 'text-green-800 dark:text-green-300 line-through'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {item.label}
              </span>
            </motion.div>
          )
        })}
      </div>

      {progress === checklistItems.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 bg-gradient-to-r from-green-400 to-green-600 rounded-lg text-white text-center"
        >
          <TrendingUp className="w-8 h-8 mx-auto mb-2" />
          <p className="font-bold">Congratulations! Your application process is complete!</p>
        </motion.div>
      )}
    </motion.div>
  )
}


