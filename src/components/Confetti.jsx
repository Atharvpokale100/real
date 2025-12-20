import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6']

export default function Confetti({ show, onComplete }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (show) {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
      }))
      setParticles(newParticles)

      const timer = setTimeout(() => {
        setParticles([])
        if (onComplete) onComplete()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  if (!show) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: particle.color,
            left: `${particle.x}%`,
          }}
          initial={{
            y: particle.y,
            rotate: particle.rotation,
            scale: 0,
          }}
          animate={{
            y: window.innerHeight + 100,
            rotate: particle.rotation + 360,
            scale: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: particle.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

