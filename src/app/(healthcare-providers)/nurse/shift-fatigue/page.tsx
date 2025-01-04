'use client'

import { useState, useEffect } from 'react'

type Nurse = {
  id: number
  name: string
  shiftStart: string
  fatigueLevel: number
  lastBreak: string
}

const mockNurses: Nurse[] = [
  { id: 1, name: 'Alice Johnson', shiftStart: '07:00', fatigueLevel: 2, lastBreak: '10:30' },
  { id: 2, name: 'Bob Smith', shiftStart: '19:00', fatigueLevel: 4, lastBreak: '22:15' },
  { id: 3, name: 'Carol Williams', shiftStart: '15:00', fatigueLevel: 3, lastBreak: '18:45' },
]

export default function ShiftFatigueMonitor() {
  const [nurses, setNurses] = useState<Nurse[]>(mockNurses)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      // Simulate increasing fatigue levels over time
      setNurses(prevNurses =>
        prevNurses.map(nurse => ({
          ...nurse,
          fatigueLevel: Math.min(10, nurse.fatigueLevel + Math.random() * 0.5)
        }))
      )
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  const handleBreak = (id: number) => {
    setNurses(prevNurses =>
      prevNurses.map(nurse =>
        nurse.id === id
          ? { ...nurse, fatigueLevel: Math.max(1, nurse.fatigueLevel - 2), lastBreak: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
          : nurse
      )
    )
  }

  const getFatigueColor = (level: number) => {
    if (level <= 3) return 'bg-green-600'
    if (level <= 6) return 'bg-yellow-600'
    return 'bg-red-600'
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Shift Fatigue Monitor</h1>
      <p className="mb-4">Current Time: {currentTime.toLocaleTimeString()}</p>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Shift Start</th>
            <th className="p-2 text-left">Fatigue Level</th>
            <th className="p-2 text-left">Last Break</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {nurses.map(nurse => (
            <tr key={nurse.id} className={getFatigueColor(nurse.fatigueLevel)}>
              <td className="p-2">{nurse.name}</td>
              <td className="p-2">{nurse.shiftStart}</td>
              <td className="p-2">
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <div
                    className="bg-blue-700 h-2.5 rounded-full"
                    style={{ width: `${nurse.fatigueLevel * 10}%` }}
                  ></div>
                </div>
                <span className="text-sm">{nurse.fatigueLevel.toFixed(1)} / 10</span>
              </td>
              <td className="p-2">{nurse.lastBreak}</td>
              <td className="p-2">
                <button
                  onClick={() => handleBreak(nurse.id)}
                  className="px-4 py-2 bg-blue-900 text-white rounded"
                >
                  Take Break
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

