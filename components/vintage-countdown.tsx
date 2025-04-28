"use client"

import { useEffect, useState, useRef } from "react"

export default function VintageCountdown({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [flipping, setFlipping] = useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: false,
  })

  // Use refs to store previous values for comparison
  const prevTimeRef = useRef(timeLeft)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)

        const prevTime = prevTimeRef.current

        // Trigger flip animation when values change
        if (seconds !== prevTime.seconds) {
          setFlipping((prev) => ({ ...prev, seconds: true }))
          setTimeout(() => setFlipping((prev) => ({ ...prev, seconds: false })), 500)
        }

        if (minutes !== prevTime.minutes) {
          setFlipping((prev) => ({ ...prev, minutes: true }))
          setTimeout(() => setFlipping((prev) => ({ ...prev, minutes: false })), 500)
        }

        if (hours !== prevTime.hours) {
          setFlipping((prev) => ({ ...prev, hours: true }))
          setTimeout(() => setFlipping((prev) => ({ ...prev, hours: false })), 500)
        }

        if (days !== prevTime.days) {
          setFlipping((prev) => ({ ...prev, days: true }))
          setTimeout(() => setFlipping((prev) => ({ ...prev, days: false })), 500)
        }

        const newTimeLeft = { days, hours, minutes, seconds }
        setTimeLeft(newTimeLeft)
        prevTimeRef.current = newTimeLeft
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate]) // Remove timeLeft from dependencies

  const padWithZero = (num: number) => {
    return num.toString().padStart(2, "0")
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl font-bold mb-3">OFFERTA VALIDA FINO AL</h3>
      <div className="flex justify-center gap-2 md:gap-4">
        <div className="flex flex-col items-center">
          <div className={`vintage-flip-card ${flipping.days ? "flipping" : ""}`}>
            <div className="vintage-flip-card-inner">
              <div className="vintage-flip-card-front">{padWithZero(timeLeft.days)}</div>
            </div>
          </div>
          <span className="text-xs mt-1">GIORNI</span>
        </div>

        <div className="vintage-separator">:</div>

        <div className="flex flex-col items-center">
          <div className={`vintage-flip-card ${flipping.hours ? "flipping" : ""}`}>
            <div className="vintage-flip-card-inner">
              <div className="vintage-flip-card-front">{padWithZero(timeLeft.hours)}</div>
            </div>
          </div>
          <span className="text-xs mt-1">ORE</span>
        </div>

        <div className="vintage-separator">:</div>

        <div className="flex flex-col items-center">
          <div className={`vintage-flip-card ${flipping.minutes ? "flipping" : ""}`}>
            <div className="vintage-flip-card-inner">
              <div className="vintage-flip-card-front">{padWithZero(timeLeft.minutes)}</div>
            </div>
          </div>
          <span className="text-xs mt-1">MINUTI</span>
        </div>

        <div className="vintage-separator">:</div>

        <div className="flex flex-col items-center">
          <div className={`vintage-flip-card ${flipping.seconds ? "flipping" : ""}`}>
            <div className="vintage-flip-card-inner">
              <div className="vintage-flip-card-front">{padWithZero(timeLeft.seconds)}</div>
            </div>
          </div>
          <span className="text-xs mt-1">SECONDI</span>
        </div>
      </div>

      <style jsx>{`
        .vintage-flip-card {
          background-color: rgba(0, 0, 0, 0.3);
          width: 60px;
          height: 80px;
          perspective: 1000px;
          border-radius: 8px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3), inset 0 0 5px rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Courier New', monospace;
          font-weight: bold;
          font-size: 2.5rem;
          color: white;
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
          transition: transform 0.5s;
        }
        
        @media (max-width: 640px) {
          .vintage-flip-card {
            width: 40px;
            height: 60px;
            font-size: 1.8rem;
          }
        }
        
        .vintage-flip-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
        }
        
        .vintage-flip-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
        }
        
        .vintage-flip-card.flipping {
          animation: flip 0.5s;
        }
        
        @keyframes flip {
          0% {
            transform: rotateX(0);
          }
          50% {
            transform: rotateX(90deg);
          }
          100% {
            transform: rotateX(0);
          }
        }
        
        .vintage-separator {
          font-size: 2.5rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          color: rgba(255, 255, 255, 0.7);
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
        }
        
        @media (max-width: 640px) {
          .vintage-separator {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  )
}
