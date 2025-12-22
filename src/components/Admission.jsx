import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, FileText, Banknote, ChevronDown, ChevronUp, GraduationCap } from 'lucide-react'
import { useState } from 'react'

export default function Admission() {
  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const eligibility = [
    { course: 'B.Tech', criteria: '10+2 with Physics, Chemistry, Math (min 60%)' },
    { course: 'MBA', criteria: 'Bachelor\'s Degree in any discipline (min 50%)' },
    { course: 'B.Sc', criteria: '10+2 with Science stream (min 55%)' },
    { course: 'B.Com', criteria: '10+2 with Commerce stream (min 50%)' },
  ]

  const documents = [
    '10th & 12th Marksheets (Original + 2 Copies)',
    'Transfer Certificate (TC) & Migration Certificate',
    'Character Certificate from last institution',
    'Caste Certificate (if applicable)',
    'Income Certificate (for scholarship)',
    '4 Passport size photographs',
    'Aadhar Card / ID Proof',
    'Entrance Exam Score Card (if applicable)',
  ]

  const fees = [
    { course: 'B.Tech', fee: '₹1,20,000' },
    { course: 'MBA', fee: '₹1,50,000' },
    { course: 'B.Sc', fee: '₹60,000' },
    { course: 'B.Com', fee: '₹50,000' },
    { course: 'Hostel & Mess', fee: '₹75,000' },
  ]

  const faqs = [
    { question: 'What is the application process?', answer: 'The application process is completely online. Visit our "Apply Now" section, fill out the form, upload the required documents, and pay the application fee.' },
    { question: 'Is there an entrance exam for admission?', answer: 'Yes, for professional courses like B.Tech and MBA, admission is based on entrance exam scores. For other courses, it is merit-based.' },
    { question: 'Are scholarships available?', answer: 'Yes, we offer scholarships based on merit, sports achievements, and financial need. Please contact the admission office for more details.' },
    { question: 'Can I pay the fees in installments?', answer: 'Yes, students can pay the fees in two installments per year (semester-wise).' },
    { question: 'Is hostel facility available for all students?', answer: 'Yes, we have separate hostels for boys and girls with 24/7 security, Wi-Fi, and mess facilities.' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 pt-32 pb-10">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Admission Information
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your gateway to a bright future. Everything you need to know about joining us.
          </p>
        </motion.div>

        {/* Quick Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { label: 'Eligibility Criteria', id: 'eligibility' },
            { label: 'Documents Required', id: 'documents' },
            { label: 'Fee Structure (Per Year)', id: 'fees' },
            { label: 'Frequently Asked Questions', id: 'faq' }
          ].map((item) => (
            <a key={item.id} href={`#${item.id}`} className="px-5 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg text-indigo-600 dark:text-indigo-400 font-medium transition-all hover:-translate-y-1">
              {item.label}
            </a>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Eligibility Criteria */}
          <motion.div 
            id="eligibility"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Eligibility Criteria</h2>
            </div>
            <div className="space-y-4">
              {eligibility.map((item, index) => (
                <div key={index} className="flex items-start p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="font-semibold text-blue-600 dark:text-blue-400 w-24 shrink-0">{item.course}</div>
                  <div className="text-gray-600 dark:text-gray-300">{item.criteria}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Documents Required */}
          <motion.div 
            id="documents"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg mr-4">
                <FileText className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Documents Required</h2>
            </div>
            <ul className="space-y-3">
              {documents.map((doc, index) => (
                <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                  {doc}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Fee Structure */}
        <motion.div 
          id="fees"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
            <div className="flex items-center justify-center mb-8">
              <Banknote className="w-10 h-10 mr-4" />
              <h2 className="text-3xl font-bold text-center">Fee Structure (Per Year)</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {fees.map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20 hover:bg-white/20 transition-colors">
                  <h3 className="text-xl font-semibold mb-2">{item.course}</h3>
                  <p className="text-2xl font-bold text-yellow-300">{item.fee}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div 
          id="faq"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-300">Find answers to common questions about the admission process</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="font-semibold text-gray-800 dark:text-white">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-indigo-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-4 text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}