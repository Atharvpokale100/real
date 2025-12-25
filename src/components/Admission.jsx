import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, FileText, Banknote, ChevronDown, ChevronUp, GraduationCap, Calculator, RefreshCcw, AlertCircle, Coins, Scan, Upload, FileCheck, Loader2, QrCode, Download } from 'lucide-react'
import { useState } from 'react'

export default function Admission() {
  const [openFaq, setOpenFaq] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [predInput, setPredInput] = useState({ course: '', marks: '' })
  const [scholarshipInput, setScholarshipInput] = useState({ marks: '', income: '' })
  const [scholarshipResult, setScholarshipResult] = useState(null)
  const [verificationStatus, setVerificationStatus] = useState('idle') // idle, scanning, verified
  const [scannedData, setScannedData] = useState(null)
  const [gatePassInput, setGatePassInput] = useState({ name: '', phone: '' })
  const [gatePassUrl, setGatePassUrl] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const calculateChance = () => {
    if (!predInput.course || !predInput.marks) return
    
    const marks = parseFloat(predInput.marks)
    let chance = 0
    let message = ''
    let color = ''

    // Mock Algorithm for Hackathon Demo
    const cutoffs = { 'B.Tech': 85, 'MBA': 70, 'B.Sc': 65, 'B.Com': 60 }
    const cutoff = cutoffs[predInput.course] || 60

    if (marks >= cutoff + 10) {
      chance = 95 + Math.random() * 4
      message = 'High Probability! You are a top candidate.'
      color = 'text-green-600'
    } else if (marks >= cutoff) {
      chance = 75 + Math.random() * 15
      message = 'Good Chance. Your profile meets our standards.'
      color = 'text-blue-600'
    } else if (marks >= cutoff - 10) {
      chance = 40 + Math.random() * 20
      message = 'Moderate. It might depend on seat availability.'
      color = 'text-yellow-600'
    } else {
      chance = 10 + Math.random() * 15
      message = 'Low Probability. We recommend checking other streams.'
      color = 'text-red-600'
    }

    setPrediction({ score: Math.round(chance), message, color })
  }

  const calculateScholarship = () => {
    const marks = parseFloat(scholarshipInput.marks)
    const income = parseFloat(scholarshipInput.income)
    
    if (!marks || !income) return

    let amount = 0
    let type = ''

    if (marks >= 95) { amount = 100; type = 'Merit Excellence' }
    else if (marks >= 90) { amount = 50; type = 'Merit Gold' }
    else if (marks >= 85) { amount = 25; type = 'Merit Silver' }

    if (income < 500000) {
      amount += 10
      type += (type ? ' + ' : '') + 'Financial Aid'
    }

    setScholarshipResult({ percentage: Math.min(amount, 100), type: type || 'Standard Admission' })
  }

  const handleDocumentScan = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setVerificationStatus('scanning')
    // Simulate OCR Processing Delay
    setTimeout(() => {
      setVerificationStatus('verified')
      setScannedData({
        name: 'Verified Candidate',
        docType: 'Class XII Marksheet',
        score: '92.5%',
        id: 'DOC-' + Math.floor(Math.random() * 10000)
      })
    }, 2500)
  }

  const generateGatePass = () => {
    if (!gatePassInput.name || !gatePassInput.phone) return
    const data = `VISITOR:${gatePassInput.name},PHONE:${gatePassInput.phone},DATE:${new Date().toISOString().split('T')[0]},VALID:TRUE`
    setGatePassUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`)
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
            { label: 'AI Predictor', id: 'predictor' },
            { label: 'Documents Required', id: 'documents' },
            { label: 'Auto-Verifier', id: 'verifier' },
            { label: 'Gate Pass', id: 'gatepass' },
            { label: 'Scholarship Calc', id: 'scholarship' },
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

          {/* AI Admission Predictor */}
          <motion.div 
            id="predictor"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-indigo-900 to-purple-900 p-8 rounded-2xl shadow-xl text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-white/20 rounded-lg mr-4">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Admission Predictor</h2>
              </div>
              <p className="text-indigo-200 mb-6">Check your admission chances instantly with our AI-powered tool.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-indigo-200 mb-1">Select Course</label>
                  <select 
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50 option:text-gray-900"
                    value={predInput.course}
                    onChange={(e) => setPredInput({...predInput, course: e.target.value})}
                  >
                    <option value="" className="text-gray-900">Select a course</option>
                    {eligibility.map(e => <option key={e.course} value={e.course} className="text-gray-900">{e.course}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-200 mb-1">Your Percentage / GPA</label>
                  <input 
                    type="number" 
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-indigo-300/50"
                    placeholder="e.g. 85"
                    value={predInput.marks}
                    onChange={(e) => setPredInput({...predInput, marks: e.target.value})}
                  />
                </div>
                
                {!prediction ? (
                  <button 
                    onClick={calculateChance}
                    className="w-full py-3 bg-white text-indigo-900 font-bold rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 mt-4"
                  >
                    <Calculator className="w-5 h-5" /> Calculate Probability
                  </button>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/95 backdrop-blur-sm rounded-xl p-4 mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600 font-medium">Admission Chance</span>
                      <button onClick={() => setPrediction(null)}><RefreshCcw className="w-4 h-4 text-gray-400 hover:text-indigo-600" /></button>
                    </div>
                    <div className="text-4xl font-bold text-indigo-600 mb-1">{prediction.score}%</div>
                    <div className={`text-sm font-medium ${prediction.color === 'text-green-600' ? 'text-green-600' : prediction.color === 'text-blue-600' ? 'text-blue-600' : prediction.color === 'text-yellow-600' ? 'text-yellow-600' : 'text-red-600'}`}>
                      {prediction.message}
                    </div>
                  </motion.div>
                )}
              </div>
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

        {/* Auto-Verification OCR Tool */}
        <motion.div 
          id="verifier"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
        >
          <div className="p-8 md:p-12 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg mr-4">
                  <Scan className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Smart Document Verifier</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                Skip the manual checks! Upload your marksheet or ID proof, and our <strong>OCR Technology</strong> will automatically verify your details and eligibility in seconds.
              </p>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-indigo-500 transition-colors relative">
                  <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleDocumentScan}
                    accept="image/*,.pdf"
                  />
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-gray-400 font-medium">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-400">Supports JPG, PNG, PDF</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden border border-gray-200 dark:border-gray-700">
              {verificationStatus === 'idle' && (
                <div className="text-center text-gray-400">
                  <Scan className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Waiting for document...</p>
                </div>
              )}

              {verificationStatus === 'scanning' && (
                <div className="w-full h-full absolute inset-0 flex flex-col items-center justify-center bg-black/5 z-10">
                  <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-1 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.6)] z-20"
                  />
                  <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                  <p className="text-indigo-600 font-semibold animate-pulse">Scanning Document...</p>
                  <p className="text-xs text-gray-500 mt-2">Extracting text & validating...</p>
                </div>
              )}

              {verificationStatus === 'verified' && scannedData && (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <FileCheck className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-1">Verification Successful</h3>
                  <p className="text-center text-green-600 font-medium mb-6">Document Validated</p>
                  
                  <div className="space-y-3 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Document Type</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{scannedData.docType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Extracted Name</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{scannedData.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Detected Score</span>
                      <span className="font-semibold text-indigo-600">{scannedData.score}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Reference ID</span>
                      <span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{scannedData.id}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Digital Gate Pass Generator */}
        <motion.div 
          id="gatepass"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-gradient-to-br from-gray-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white shadow-2xl"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="p-3 bg-white/10 rounded-lg mr-4">
                  <QrCode className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold">Digital Gate Pass</h2>
              </div>
              <p className="text-gray-300 text-lg mb-6">
                Planning a campus visit? Generate your instant <strong>Visitor Gate Pass</strong> here. Save the QR code and show it at the security checkpoint for hassle-free entry.
              </p>
              <div className="space-y-4 max-w-md">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={gatePassInput.name}
                  onChange={(e) => setGatePassInput({...gatePassInput, name: e.target.value})}
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={gatePassInput.phone}
                  onChange={(e) => setGatePassInput({...gatePassInput, phone: e.target.value})}
                />
                <button onClick={generateGatePass} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-colors shadow-lg">
                  Generate QR Pass
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-64">
                {gatePassUrl ? (
                  <>
                    <img src={gatePassUrl} alt="Gate Pass QR" className="w-full h-auto mb-4 rounded-lg" />
                    <p className="text-gray-800 font-bold text-lg">{gatePassInput.name}</p>
                    <p className="text-gray-500 text-sm mb-3">Visitor Pass</p>
                    <div className="flex items-center justify-center gap-2 text-xs text-green-600 font-semibold bg-green-50 py-1 rounded">
                      <CheckCircle2 className="w-3 h-3" /> Valid for Today
                    </div>
                  </>
                ) : (
                  <div className="h-52 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                    <QrCode className="w-12 h-12 mb-2 opacity-20" />
                    <span className="text-sm">QR will appear here</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scholarship Calculator (Unique Idea) */}
        <motion.div 
          id="scholarship"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="p-3 bg-white/20 rounded-lg mr-4">
                  <Coins className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold">Scholarship Calculator</h2>
              </div>
              <p className="text-emerald-100 text-lg mb-6">
                We believe education should be accessible to everyone. Use our smart calculator to check your eligibility for merit-based and financial aid scholarships.
              </p>
              <ul className="space-y-2 text-emerald-100">
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 mr-2" /> Up to 100% Merit Scholarship</li>
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 mr-2" /> Need-based Financial Support</li>
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 mr-2" /> Sports Quota Benefits</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-emerald-100 mb-1">Previous Year Marks (%)</label>
                  <input type="number" placeholder="e.g. 92" className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-white/50" value={scholarshipInput.marks} onChange={(e) => setScholarshipInput({...scholarshipInput, marks: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-emerald-100 mb-1">Annual Family Income (₹)</label>
                  <input type="number" placeholder="e.g. 400000" className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-white/50" value={scholarshipInput.income} onChange={(e) => setScholarshipInput({...scholarshipInput, income: e.target.value})} />
                </div>
                <button onClick={calculateScholarship} className="w-full bg-white text-emerald-700 font-bold py-3 rounded-lg hover:bg-emerald-50 transition-colors shadow-lg">Check Eligibility</button>
                
                {scholarshipResult && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-lg p-4 mt-4 text-center">
                    <div className="text-gray-600 text-sm font-medium mb-1">Estimated Scholarship</div>
                    <div className="text-3xl font-bold text-emerald-600 mb-1">{scholarshipResult.percentage}%</div>
                    <div className="text-xs text-emerald-700 font-semibold bg-emerald-100 inline-block px-2 py-1 rounded">{scholarshipResult.type}</div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

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