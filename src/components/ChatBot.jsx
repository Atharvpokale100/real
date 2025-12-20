import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, GraduationCap, BookOpen, Users, MapPin, Phone, Mail, Calendar, Award } from 'lucide-react'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Apna College assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickQueries = [
    { id: 'courses', label: 'Available Courses', icon: BookOpen },
    { id: 'admission', label: 'Admission Process', icon: GraduationCap },
    { id: 'facilities', label: 'Campus Facilities', icon: MapPin },
    { id: 'contact', label: 'Contact Information', icon: Phone },
    { id: 'events', label: 'Upcoming Events', icon: Calendar },
    { id: 'achievements', label: 'College Achievements', icon: Award },
  ]

  const responses = {
    courses: {
      text: "We offer a wide range of programs including:\n\n🎓 Computer Science & Engineering\n🎓 Business Administration\n🎓 Mechanical Engineering\n🎓 Electrical Engineering\n🎓 Civil Engineering\n🎓 Data Science & Analytics\n\nEach program includes hands-on training, industry projects, and placement assistance.",
      options: ['View Course Details', 'Check Eligibility', 'Fee Structure']
    },
    admission: {
      text: "Our admission process is simple and straightforward:\n\n1. 📝 Fill out the online application form\n2. 📎 Upload required documents\n3. 💰 Pay application fee\n4. 📞 Attend counseling session\n5. ✅ Receive admission confirmation\n\nApplication deadline: March 31st, 2025\nEntrance exam: April 15th, 2025",
      options: ['Apply Now', 'Required Documents', 'Important Dates']
    },
    facilities: {
      text: "Our modern campus features:\n\n🏫 State-of-the-art classrooms\n📚 Central library with 50K+ books\n💻 Computer labs with latest technology\n⚽ Sports complex & gymnasium\n🍽️ Modern cafeteria\n🏢 Student hostels\n🚗 Parking facilities\n🌐 Wi-Fi campus",
      options: ['Virtual Tour', 'Hostel Details', 'Sports Facilities']
    },
    contact: {
      text: "Get in touch with us:\n\n📍 Address: 123 Education Street, Knowledge City, State 12345\n📞 Phone: +1 (555) 123-4567\n📧 Email: info@apnacollege.edu\n🌐 Website: www.apnacollege.edu\n\n📝 Admissions: admissions@apnacollege.edu\n📞 Helpline: +1 (555) 123-HELP",
      options: ['Visit Campus', 'Schedule Meeting', 'Send Email']
    },
    events: {
      text: "Upcoming events and activities:\n\n📅 Fresher's Welcome: January 15th\n🎓 Tech Fest 2025: February 20-22\n🏆 Annual Sports Meet: March 10-15\n🎭 Cultural Fest: April 5-7\n📚 Career Fair: April 20th\n🎓 Graduation Ceremony: May 25th\n\nStay tuned for more updates!",
      options: ['Register for Events', 'Event Schedule', 'Club Activities']
    },
    achievements: {
      text: "Our proud achievements:\n\n🏆 95% Placement Rate\n👥 5000+ Alumni Worldwide\n📚 50+ Research Papers Published\n🤝 25+ Industry Partnerships\n⭐ ISO 9001:2015 Certified\n🎖️ Best Educational Institution 2024\n🌟 98% Student Satisfaction\n💼 100+ Top Company Recruiters",
      options: ['Alumni Success Stories', 'Research Highlights', 'Industry Partnerships']
    }
  }

  const handleQuickQuery = (queryId) => {
    const response = responses[queryId]
    const botMessage = {
      id: Date.now(),
      text: response.text,
      sender: 'bot',
      timestamp: new Date(),
      options: response.options
    }
    setMessages(prev => [...prev, botMessage])
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: "Thank you for your message! Our team will get back to you soon. For immediate assistance, please check our frequently asked questions or contact us directly.",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Apna College Assistant</h3>
                  <p className="text-sm opacity-90">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded-lg p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`p-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    {/* Quick Options */}
                    {message.options && (
                      <div className="mt-2 space-y-1">
                        {message.options.map((option, index) => (
                          <button
                            key={index}
                            className="block w-full text-left p-2 text-sm bg-gray-50 dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-lg transition-colors"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Queries */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Questions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickQueries.map((query) => (
                    <button
                      key={query.id}
                      onClick={() => handleQuickQuery(query.id)}
                      className="flex items-center gap-2 p-2 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <query.icon className="w-4 h-4" />
                      <span className="truncate">{query.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot