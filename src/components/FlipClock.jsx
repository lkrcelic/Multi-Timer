import { useState, useEffect, useRef } from 'react'
import './FlipClock.css'

function FlipCard({ value, isExpired }) {
  const [display, setDisplay] = useState(value)
  const [prevDisplay, setPrevDisplay] = useState(value)
  const [flipping, setFlipping] = useState(false)
  const prevRef = useRef(value)

  useEffect(() => {
    if (value !== prevRef.current) {
      setPrevDisplay(prevRef.current)
      setFlipping(true)
      
      const timer = setTimeout(() => {
        setDisplay(value)
        setFlipping(false)
      }, 300)
      
      prevRef.current = value
      return () => clearTimeout(timer)
    }
  }, [value])

  const fmt = (n) => String(n).padStart(2, '0')

  return (
    <div className={`flip-card ${isExpired ? 'expired' : ''}`}>
      {/* Top half - shows new value behind the flip */}
      <div className="card-top">
        <span>{fmt(flipping ? value : display)}</span>
      </div>

      {/* Bottom half - shows current value, new value slides in */}
      <div className="card-bottom">
        <span>{fmt(display)}</span>
      </div>

      {/* Flip overlay top - old value flips away */}
      {flipping && (
        <div className="flip-top" key={`ft-${value}`}>
          <span>{fmt(prevDisplay)}</span>
        </div>
      )}

      {/* Flip overlay bottom - new value flips in */}
      {flipping && (
        <div className="flip-bottom" key={`fb-${value}`}>
          <span>{fmt(value)}</span>
        </div>
      )}

      {/* Center divider line */}
      <div className="card-divider"></div>
    </div>
  )
}

function FlipClock({ time, isExpired }) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  return (
    <div className="flip-clock">
      <FlipCard value={minutes} isExpired={isExpired} />
      <div className="flip-colon">:</div>
      <FlipCard value={seconds} isExpired={isExpired} />
    </div>
  )
}

export default FlipClock
