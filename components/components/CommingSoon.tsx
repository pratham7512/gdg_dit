'use client'

import { useState, useEffect } from 'react'
import { Code, Calendar, MapPin } from 'lucide-react'

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date('2024-11-28T17:00:00+05:30') // Set your launch date here

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-pulse">
          Google Developers Group
        </h1>
        <p className="text-xl md:text-2xl mb-12">
          Our website is launching soon. Stay tuned!
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div 
              key={unit} 
              className="bg-white bg-opacity-10 rounded-lg p-6 shadow-md transition-transform transform hover:scale-105"
            >
              <div className="text-4xl md:text-6xl font-extrabold">{value}</div>
              <div className="text-sm uppercase mt-2 text-gray-400">{unit}</div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
          <div className="flex items-center gap-3 text-lg">
            <Calendar className="w-7 h-7 text-blue-400" />
            <span>Monthly Meetups</span>
          </div>
          <div className="flex items-center gap-3 text-lg">
            <Code className="w-7 h-7 text-green-400" />
            <span>Coding Workshops</span>
          </div>
          <div className="flex items-center gap-3 text-lg">
            <MapPin className="w-7 h-7 text-red-400" />
            <span>Local Tech Events</span>
          </div>
        </div>
        
        <div className="text-sm">
          <p className="mb-2">Join our mailing list to stay updated:</p>
          <form className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-full md:w-auto max-w-sm bg-white bg-opacity-10 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-r-lg hover:bg-blue-600 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
