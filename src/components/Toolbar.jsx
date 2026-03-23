import { useState } from 'react'
import SetTimeModal from './SetTimeModal'
import './Toolbar.css'

function Toolbar({ onAddTimer, onExit, canAddTimer }) {
  const [showAddModal, setShowAddModal] = useState(false)

  const handleAddTimer = (time) => {
    onAddTimer(time)
    setShowAddModal(false)
  }

  return (
    <>
      {canAddTimer && (
        <button className="add-timer-btn" onClick={() => setShowAddModal(true)}>
          +
        </button>
      )}

      <button className="exit-btn" onClick={onExit}>
        ×
      </button>

      {showAddModal && (
        <SetTimeModal
          tableNumber="New"
          currentTime={900}
          onConfirm={handleAddTimer}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </>
  )
}

export default Toolbar
