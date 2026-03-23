import { useState, useCallback } from 'react'
import SetupModal from './components/SetupModal'
import TimerGrid from './components/TimerGrid'
import Toolbar from './components/Toolbar'
import './App.css'

function App() {
  const [isSetup, setIsSetup] = useState(false)
  const [timers, setTimers] = useState([])
  const [showTableLabels, setShowTableLabels] = useState(true)

  const handleSetup = (count, initialTime, showLabels) => {
    const newTimers = Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      tableNumber: i + 1,
      setTime: initialTime,
      currentTime: initialTime,
      isRunning: false,
      isExpired: false
    }))
    setTimers(newTimers)
    setShowTableLabels(showLabels)
    setIsSetup(true)
  }

  const handleExit = () => {
    setIsSetup(false)
    setTimers([])
  }

  const handleAddTimer = (setTime) => {
    if (timers.length >= 10) return
    const newTimer = {
      id: timers.length + 1,
      tableNumber: timers.length + 1,
      setTime,
      currentTime: setTime,
      isRunning: false,
      isExpired: false
    }
    setTimers([...timers, newTimer])
  }

  const handleDeleteTimer = (id) => {
    setTimers(prev => prev.filter(t => t.id !== id))
  }

  const updateTimer = useCallback((id, updates) => {
    setTimers(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
  }, [])

  if (!isSetup) {
    return <SetupModal onSetup={handleSetup} />
  }

  return (
    <div className="app">
      <TimerGrid 
        timers={timers}
        showTableLabels={showTableLabels}
        onUpdateTimer={updateTimer}
        onDeleteTimer={handleDeleteTimer}
      />
      <Toolbar 
        onAddTimer={handleAddTimer}
        onExit={handleExit}
        canAddTimer={timers.length < 10}
      />
    </div>
  )
}

export default App
