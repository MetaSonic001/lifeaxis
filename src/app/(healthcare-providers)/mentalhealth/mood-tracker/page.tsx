'use client'

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type MoodEntry = {
  date: string
  mood: number
  notes: string
}

export default function MoodTracker() {
  const [entries, setEntries] = useState<MoodEntry[]>([
    { date: '2023-06-01', mood: 7, notes: 'Feeling pretty good today' },
    { date: '2023-06-02', mood: 5, notes: 'Neutral day' },
    { date: '2023-06-03', mood: 8, notes: 'Had a great time with friends' },
    { date: '2023-06-04', mood: 4, notes: 'Feeling a bit down' },
    { date: '2023-06-05', mood: 6, notes: 'Better than yesterday' },
  ])
  const [newEntry, setNewEntry] = useState({ date: '', mood: 5, notes: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEntries([...entries, newEntry])
    setNewEntry({ date: '', mood: 5, notes: '' })
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mood Tracker</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex space-x-2">
          <input
            type="date"
            value={newEntry.date}
            onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
            className="px-2 py-1 border rounded"
            required
          />
          <input
            type="range"
            min="1"
            max="10"
            value={newEntry.mood}
            onChange={(e) => setNewEntry({ ...newEntry, mood: parseInt(e.target.value) })}
            className="w-48"
          />
          <input
            type="text"
            placeholder="Notes"
            value={newEntry.notes}
            onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
            className="flex-grow px-2 py-1 border rounded"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Add Entry
          </button>
        </div>
      </form>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={entries}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[1, 10]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="mood" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Recent Entries</h2>
        <ul>
          {entries.slice(-5).reverse().map((entry, index) => (
            <li key={index} className="mb-2">
              <strong>{entry.date}:</strong> Mood - {entry.mood}/10, Notes: {entry.notes}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

