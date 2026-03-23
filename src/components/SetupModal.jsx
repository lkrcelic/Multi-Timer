import { useState } from 'react'
import './SetupModal.css'

function SetupModal({ onSetup }) {
  const [selectedCount, setSelectedCount] = useState(4)
  const [minutes, setMinutes] = useState(15)
  const [seconds, setSeconds] = useState(0)
  const [showLabels, setShowLabels] = useState(true)

  const handleStart = () => {
    const totalSeconds = minutes * 60 + seconds
    if (totalSeconds > 0) {
      onSetup(selectedCount, totalSeconds, showLabels)
    }
  }

  return (
    <div className="setup-modal">
      <div className="setup-content">
        <h1>Multi-Timer Setup</h1>
        
        <div className="setup-section">
          <h2>Number of Tables</h2>
          <div className="number-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <button
                key={num}
                className={`number-btn ${selectedCount === num ? 'active' : ''}`}
                onClick={() => setSelectedCount(num)}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div className="setup-section">
          <h2>Initial Time</h2>
          <div className="time-inputs">
            <div className="time-input-group">
              <label>Minutes</label>
              <input
                type="number"
                min="0"
                max="99"
                value={minutes}
                onChange={(e) => setMinutes(Math.max(0, Math.min(99, parseInt(e.target.value) || 0)))}
              />
            </div>
            <span className="time-separator">:</span>
            <div className="time-input-group">
              <label>Seconds</label>
              <input
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
              />
            </div>
          </div>
        </div>

        <div className="setup-section">
          <h2>Show Table Labels</h2>
          <div className="toggle-container">
            <button
              className={`toggle-btn ${showLabels ? 'active' : ''}`}
              onClick={() => setShowLabels(!showLabels)}
            >
              {showLabels ? 'YES' : 'NO'}
            </button>
          </div>
        </div>

        <button className="start-btn" onClick={handleStart}>
          Start
        </button>
      </div>
    </div>
  )
}

export default SetupModal
