import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import { MessageCircle, X, Send, GraduationCap, BookOpen, Users, MapPin, Phone, Mail, Calendar, Award, Bot, Search } from 'lucide-react'

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
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const dragControls = useDragControls()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    if (messages.length > 1) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.sender === 'bot') {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3')
        audio.volume = 0.5
        audio.play().catch(err => console.log('Audio play failed', err))
      }
    }
  }, [messages])

  const quickQueries = [
    { id: 'courses', label: 'Available Courses', icon: BookOpen },
    { id: 'admission', label: 'Admission Process', icon: GraduationCap },
    { id: 'facilities', label: 'Campus Facilities', icon: MapPin },
    { id: 'contact', label: 'Contact Information', icon: Phone },
    { id: 'track', label: 'Track Admission', icon: Search },
    { id: 'achievements', label: 'College Achievements', icon: Award },
  ]

  const responses = {
    courses: {
      text: "Unlock your potential with our world-class programs designed for future leaders:\n\n🎓 Computer Science & Engineering\n🎓 Business Administration\n🎓 Mechanical Engineering\n🎓 Electrical Engineering\n🎓 Civil Engineering\n🎓 Data Science & Analytics\n\nExperience a curriculum that blends academic rigor with real-world application, featuring hands-on training, live industry projects, and dedicated placement support.",
      options: ['View Course Details', 'Check Eligibility', 'Fee Structure']
    },
    admission: {
      text: "Embark on your journey with us through a seamless admission experience:\n\n1. 📝 Fill out the online application form\n2. 📎 Upload required documents\n3. 💰 Pay application fee\n4. 📞 Attend counseling session\n5. ✅ Receive admission confirmation\n\nWe've streamlined every step to ensure your transition is smooth.\n\n📅 Application deadline: March 31st, 2025\n📅 Entrance exam: April 15th, 2025",
      options: ['Apply Now', 'Required Documents', 'Important Dates']
    },
    facilities: {
      text: "Immerse yourself in a campus designed for innovation and comfort:\n\n🏫 State-of-the-art smart classrooms\n📚 Central library with 50K+ resources\n💻 High-tech computer labs\n⚽ World-class sports complex & gymnasium\n🍽️ Modern, hygienic cafeteria\n🏢 Comfortable student hostels\n🚗 Ample parking facilities\n🌐 High-speed Wi-Fi enabled campus",
      options: ['Virtual Tour', 'Hostel Details', 'Sports Facilities']
    },
    contact: {
      text: "We'd love to hear from you! Connect with us:\n\n📍 Address: 123 Education Street, Knowledge City, State 12345\n📞 Phone: +1 (555) 123-4567\n📧 Email: info@apnacollege.edu\n🌐 Website: www.apnacollege.edu\n\nOur dedicated team is ready to assist you.\n📝 Admissions: admissions@apnacollege.edu\n📞 Helpline: +1 (555) 123-HELP",
      options: ['Visit Campus', 'Schedule Meeting', 'Send Email']
    },
    track: {
      text: "Stay updated on your application journey:\n\n🔍 Track your status easily using your Application ID and registered Gmail.\n\n📋 **Simple Steps:**\n1. Visit our admission portal\n2. Enter your Application ID\n3. Enter your registered Gmail\n4. View real-time status\n\n📍 **Portal Link:** https://apnacollege.edu/track-admission\n\n💡 **Note:** Applications submitted on weekends (Saturday & Sunday) are processed on the next business day. We appreciate your patience!",
      options: ['Go to Tracking Portal', 'Contact Admissions', 'Check Status']
    },
    achievements: {
      text: "Celebrating a legacy of excellence and milestones:\n\n🏆 95% Placement Rate\n👥 5000+ Alumni Worldwide\n📚 50+ Research Papers Published\n🤝 25+ Industry Partnerships\n⭐ ISO 9001:2015 Certified\n🎖️ Best Educational Institution 2024\n🌟 98% Student Satisfaction\n💼 100+ Top Company Recruiters",
      options: ['Alumni Success Stories', 'Research Highlights', 'Industry Partnerships']
    }
  }

  // Training data for keyword-based responses
  const trainingData = [
    {
      keywords: ['hello', 'hi', 'hey', 'greetings'],
      response: "Hello! Welcome to Apna College. I'm here to guide you towards your future. How can I assist you today?"
    },
    {
      keywords: ['fee', 'fees', 'cost', 'price', 'tuition', 'payment'],
      response: "Investing in your future is important. Our fee structure is competitive and transparent:\n\n🎓 Engineering Programs: $8,000 - $12,000/year\n🎓 Business Programs: $6,000 - $9,000/year\n🎓 Computer Science: $10,000 - $15,000/year\n\nWe also offer merit-based scholarships to reward talent. Contact admissions for a detailed breakdown."
    },
    {
      keywords: ['placement', 'job', 'career', 'employment', 'recruitment'],
      response: "Launch your career with confidence! Our stellar placement record speaks for itself:\n\n🏆 95% placement success rate\n💼 Average package: $75,000/year\n🏢 Elite recruiters: Google, Microsoft, Amazon, TCS, Infosys\n📈 Highest package: $150,000/year\n\nOur comprehensive career services include resume building, mock interviews, and exclusive job fairs."
    },
    {
      keywords: ['hostel', 'accommodation', 'residence', 'stay', 'living'],
      response: "Your home away from home! Experience comfort and community in our well-equipped hostels:\n\n🏢 Separate, secure hostels for boys and girls\n🍽️ Mess serving nutritious, homestyle meals\n🛡️ 24/7 security & surveillance\n🌐 High-speed Wi-Fi\n🏋️ Gym and recreational zones\n💰 Affordable rates: $2,000 - $3,000/year\n\nSpaces fill up fast—we recommend applying early!"
    },
    {
      keywords: ['scholarship', 'financial aid', 'grant', 'discount'],
      response: "We believe talent deserves support. Explore our diverse scholarship opportunities:\n\n🎓 Merit-based: Up to 50% waiver for top performers\n💰 Need-based: Support for economically weaker sections\n🏆 Sports/Achievement: Rewarding outstanding talents\n🌟 Alumni: Special benefits for family members\n\nApply during the admission process with your credentials."
    },
    {
      keywords: ['exam', 'test', 'entrance', 'eligibility', 'requirements'],
      response: "Here is your roadmap to joining us. Admission requirements include:\n\n📚 12th grade completion (min 60%)\n📝 Entrance exam (optional for specific programs)\n🎯 English proficiency test\n📋 Medical fitness certificate\n🆔 Valid ID proof\n\nDirect admission is available for eligible candidates. A counseling session is mandatory to guide your path."
    },
    {
      keywords: ['faculty', 'teacher', 'professor', 'staff', 'instructor'],
      response: "Learn from the masters! Our distinguished faculty brings years of expertise:\n\n👨‍🏫 200+ experienced professors\n🎓 PhD qualified educators\n🏆 Industry leaders as guest lecturers\n📊 Personalized 15:1 student-teacher ratio\n⭐ Average experience: 12+ years\n\nWe ensure continuous development through regular workshops."
    },
    {
      keywords: ['library', 'books', 'study', 'reading', 'research'],
      response: "Dive into a world of knowledge. Our library is a treasure trove of resources:\n\n📚 50,000+ books across disciplines\n📰 200+ international journals and magazines\n💻 Digital library with vast online resources\n📖 24/7 quiet study zones\n🖥️ High-speed computer access\n📄 Extensive research archives\n\nOpen extended hours during exams to support your preparation."
    },
    {
      keywords: ['sports', 'gym', 'fitness', 'games', 'athletics'],
      response: "Unleash your inner champion! Our world-class sports facilities cater to every passion:\n\n⚽ Professional courts for Football, Basketball, Volleyball\n🏸 Indoor arena for Badminton and Table Tennis\n🏊 Olympic-sized swimming pool\n🏋️ Modern, fully-equipped gymnasium\n🎾 Lawn Tennis courts\n🏃 Professional track and field\n\nJoin our regular inter-college tournaments and annual sports meets."
    },
    {
      keywords: ['transport', 'bus', 'travel', 'commute'],
      response: "Commute with ease. Our comprehensive transport network ensures a safe journey:\n\n🚌 Fleet of college buses covering major routes\n🚗 Secure student parking (paid)\n🚇 Proximity to metro station\n🛵 Dedicated bike parking\n🚕 Easy access to local transit\n\nBus routes cover a 20km radius. Monthly passes are available for convenience."
    },
    {
      keywords: ['thank', 'thanks', 'appreciate'],
      response: "You're most welcome! It's a pleasure assisting you. If you have any more questions about your future at Apna College, feel free to ask!"
    },
    {
      keywords: ['bye', 'goodbye', 'see you'],
      response: "Goodbye! Thank you for connecting with us. We look forward to welcoming you to the Apna College family soon!"
    },
    {
      keywords: ['canteen', 'food', 'cafeteria', 'lunch', 'mess'],
      response: "Savor the flavor! Our cafeteria serves a delightful array of nutritious and hygienic meals:\n\n🍽️ Multi-cuisine options: North Indian, South Indian, Chinese & more\n🥗 Fresh and healthy ingredients\n☕ Coffee bar and snack counters\n\nOpen from 8 AM to 8 PM to fuel your day."
    }
  ]

  const handleQuickQuery = (queryId) => {
    setIsTyping(true)
    setTimeout(() => {
      const response = responses[queryId]
      const botMessage = {
        id: Date.now(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        options: response.options
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
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
    setIsTyping(true)

    // Find matching response based on keywords
    const userInput = inputMessage.toLowerCase()
    let matchedResponse = null

    for (const item of trainingData) {
      const hasKeyword = item.keywords.some(keyword => userInput.includes(keyword))
      if (hasKeyword) {
        matchedResponse = item.response
        break
      }
    }

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: matchedResponse || "Thank you for your message! Our team will get back to you soon. For immediate assistance, please check our frequently asked questions or contact us directly at info@apnacollege.edu.",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
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
        onClick={() => {
          if (isOpen) {
            setMessages([
              {
                id: 1,
                text: "Hello! I'm your Apna College assistant. How can I help you today?",
                sender: 'bot',
                timestamp: new Date()
              }
            ])
          }
          setIsOpen(!isOpen)
        }}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragListener={false}
            dragControls={dragControls}
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-20 right-4 left-4 md:left-auto md:bottom-24 md:right-6 w-auto md:w-96 h-[60vh] md:h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div onPointerDown={(e) => dragControls.start(e)} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 flex items-center justify-between cursor-move">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Apna College Assistant</h3>
                  <p className="text-sm opacity-90 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false)
                  setMessages([
                    {
                      id: 1,
                      text: "Hello! I'm your Apna College assistant. How can I help you today?",
                      sender: 'bot',
                      timestamp: new Date()
                    }
                  ])
                }}
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
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
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

            {/* Contextual Options after Bot Response - Compact */}
            {messages.length > 1 && messages[messages.length - 1].sender === 'bot' && (
              <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-1">
                  {quickQueries.slice(0, 4).map((query) => (
                    <button
                      key={query.id}
                      onClick={() => handleQuickQuery(query.id)}
                      className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors"
                    >
                      <query.icon className="w-3 h-3" />
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