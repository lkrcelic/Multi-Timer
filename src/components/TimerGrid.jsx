import TimerCard from './TimerCard'
import './TimerGrid.css'

function TimerGrid({ timers, showTableLabels, onUpdateTimer, onDeleteTimer }) {
  const getGridClass = () => {
    const count = timers.length
    if (count === 1) return 'grid-1'
    if (count === 2) return 'grid-2'
    if (count === 3) return 'grid-3'
    if (count === 4) return 'grid-4'
    if (count <= 6) return 'grid-6'
    if (count <= 8) return 'grid-8'
    return 'grid-10'
  }

  return (
    <div className={`timer-grid ${getGridClass()}`}>
      {timers.map(timer => (
        <TimerCard
          key={timer.id}
          timer={timer}
          showTableLabel={showTableLabels}
          onUpdate={onUpdateTimer}
          onDelete={onDeleteTimer}
        />
      ))}
    </div>
  )
}

export default TimerGrid
