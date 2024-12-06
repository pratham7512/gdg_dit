import { motion } from 'framer-motion'

export function LeaderboardSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-8 h-8 border-2 border-blue-700 border-t-transparent rounded-full"
    />
  </div>
  )
}