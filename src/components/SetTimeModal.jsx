import { useState } from 'react'
import './SetTimeModal.css'

function SetTimeModal({ tableNumber, currentTime, onConfirm, onClose }) {
  const [minutes, setMinutes] = useState(Math.floor(currentTime / 60))
  const [seconds, setSeconds] = useState(currentTime % 60)

  const handleConfirm = () => {
    const totalSeconds = minutes * 60 + seconds
    if (totalSeconds > 0) {
      onConfirm(totalSeconds)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Table {tableNumber}</h2>
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
        <div className="modal-buttons">
          <button className="confirm-btn" onClick={handleConfirm}>Confirm</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default SetTimeModal
