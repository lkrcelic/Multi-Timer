import { useEffect, useRef, useState } from 'react'
import FlipClock from './FlipClock'
import SetTimeModal from './SetTimeModal'
import './TimerCard.css'

function TimerCard({ timer, showTableLabel, onUpdate, onDelete }) {
  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 })
  const [showSetTime, setShowSetTime] = useState(false)
  const clickTimeoutRef = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (timer.isRunning && timer.currentTime > 0) {
      intervalRef.current = setInterval(() => {
        onUpdate(timer.id, {
          currentTime: Math.max(0, timer.currentTime - 1),
          isExpired: timer.currentTime - 1 === 0
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [timer.isRunning, timer.currentTime, timer.id, onUpdate])

  const handleClick = (e) => {
    if (e.detail === 1) {
      clickTimeoutRef.current = setTimeout(() => {
        if (timer.isExpired) {
          onUpdate(timer.id, { isExpired: false, isRunning: false })
        } else {
          onUpdate(timer.id, { isRunning: !timer.isRunning })
        }
      }, 200)
    }
  }

  const handleDoubleClick = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current)
    }
    onUpdate(timer.id, {
      currentTime: timer.setTime,
      isRunning: false,
      isExpired: false
    })
  }

  const handleContextMenu = (e) => {
    e.preventDefault()
    setContextMenuPos({ x: e.clientX, y: e.clientY })
    setShowContextMenu(true)
  }

  const handleSetTime = (newTime) => {
    onUpdate(timer.id, {
      setTime: newTime,
      currentTime: newTime,
      isRunning: false,
      isExpired: false
    })
    setShowSetTime(false)
  }

  useEffect(() => {
    const handleClickOutside = () => setShowContextMenu(false)
    if (showContextMenu) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showContextMenu])

  return (
    <>
      <div
        className={`timer-card ${timer.isExpired ? 'expired' : ''}`}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleContextMenu}
      >
        {showTableLabel && (
          <div className="table-label">Table {timer.tableNumber}</div>
        )}
        <FlipClock time={timer.currentTime} isExpired={timer.isExpired} />
      </div>

      {showContextMenu && (
        <div
          className="context-menu"
          style={{ left: contextMenuPos.x, top: contextMenuPos.y }}
        >
          <button onClick={() => { setShowSetTime(true); setShowContextMenu(false) }}>
            Set Time
          </button>
          <button onClick={() => { onDelete(timer.id); setShowContextMenu(false) }}>
            Delete Timer
          </button>
        </div>
      )}

      {showSetTime && (
        <SetTimeModal
          tableNumber={timer.tableNumber}
          currentTime={timer.setTime}
          onConfirm={handleSetTime}
          onClose={() => setShowSetTime(false)}
        />
      )}
    </>
  )
}

export default TimerCard
