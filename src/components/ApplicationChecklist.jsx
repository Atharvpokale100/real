import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Clock } from 'lucide-react'

export default function ApplicationChecklist({ application }) {
  const steps = [
    { id: 'submitted', label: 'Application Submitted', date: application.dateApplied },
    { id: 'review', label: 'Under Review', date: null },
    { id: 'decision', label: 'Decision Made', date: null },
  ]

  // Determine current step index based on status
  let currentStep = 0
  if (application.status === 'Reviewing') currentStep = 1
  if (application.status === 'Accepted' || application.status === 'Rejected') currentStep = 2

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Application Timeline</h3>
      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

        <div className="space-y-8">
          {steps.map((step, index) => {
            const isCompleted = index <= currentStep
            const isCurrent = index === currentStep

            return (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-start gap-4"
              >
                <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  isCompleted 
                    ? 'bg-green-100 border-green-500 text-green-600 dark:bg-green-900/30' 
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-300'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                </div>
                <div className="flex-1 pt-1">
                  <h4 className={`font-semibold ${isCompleted ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                    {step.label}
                  </h4>
                  {step.date && (
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(step.date).toLocaleDateString()}
                    </p>
                  )}
                  {isCurrent && application.status === 'Reviewing' && index === 1 && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full w-fit">
                      <Clock className="w-4 h-4 animate-spin-slow" />
                      In Progress
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}