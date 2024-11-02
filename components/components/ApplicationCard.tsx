'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import Button from "./Button"
import { Link, Twitter } from 'lucide-react'

// Add this type to your existing types
type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

// Replace the existing sticky card with this component
const ApplicationCard = ({ date, dateTime,location, rsvpLink }: { date: string,dateTime:string, location: string, rsvpLink: string }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(dateTime).getTime() - new Date().getTime()
      if (difference <= 0) {
        setIsExpired(true)
        return null
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }

    // Initial calculation
    setTimeLeft(calculateTimeLeft())

    // Update every second
    const timer = setInterval(() => {
      const calculated = calculateTimeLeft()
      if (calculated === null) {
        clearInterval(timer)
      }
      setTimeLeft(calculated)
    }, 1000)

    return () => clearInterval(timer)
  }, [dateTime])

  return (
    <div className="lg:sticky lg:top-4">
      <div className="md:flex justify-center items-center w-full h-full p-[0.0525rem] rounded-[1.5rem] hover:bg-conic-gradient bg-n-6">
      <Card className="w-full h-full bg-black rounded-[1.4475rem] font-mono text-card-foreground">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-6">
                <Link className="text-primary w-6 h-6" />
                <Twitter className="text-primary w-6 h-6" />
              </div>
              <div className="mb-6">
                <h3 className="text-sm text-muted-foreground mb-1">RUNS FROM</h3>
                <p className="font-semibold text-xl text-primary">{date}</p>
              </div>
              <div className="mb-6">
                <h3 className="text-sm text-muted-foreground mb-1">HAPPENING</h3>
                <p className="font-semibold text-xl text-primary">{location}</p>
              </div>
              {isExpired ? (
                  <p className="font-semibold text-lg sm:text-xl text-muted-foreground">Applications Closed</p>
                ) :timeLeft?
                <div className="mb-8">
                    <h3 className="text-sm text-muted-foreground mb-1">APPLICATIONS CLOSE IN</h3>
                    <p className="font-semibold text-white text-2xl text-accent">{timeLeft.days}d:{timeLeft.hours}h:{timeLeft.minutes}m:{timeLeft.seconds}s</p>
                </div>
                :(
                <p className="text-muted-foreground">Loading...</p>
                )} 
              <Button className="text-md" href={rsvpLink}>RSVP</Button>
            </CardContent>
          </Card>
      </div>
    </div>
  )
}

export default ApplicationCard