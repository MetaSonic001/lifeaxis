'use client'

import { useState } from 'react'

type TherapySession = {
  id: number
  patientName: string
  date: string
  notes: string
  moodScore: number
}

export default function AITherapyAssistant() {
  const [sessions, setSessions] = useState<TherapySession[]>([
    { id: 1, patientName: 'Alice Johnson', date: '2023-06-15', notes: 'Patient reported improved sleep patterns', moodScore: 7 },
    { id: 2, patientName: 'Bob Smith', date: '2023-06-16', notes: 'Discussed coping strategies for anxiety', moodScore: 5 },
  ])
  const [newSession, setNewSession] = useState({ patientName: '', notes: '', moodScore: 5 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const date = new Date().toISOString().split('T')[0]
    setSessions([...sessions, { ...newSession, id: sessions.length + 1, date }])
    setNewSession({ patientName: '', notes: '', moodScore: 5 })
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">AI Therapy Assistant</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">Patient Name</label>
          <input
            type="text"
            id="patientName"
            value={newSession.patientName}
            onChange={(e) => setNewSession({ ...newSession, patientName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Session Notes</label>
          <textarea
            id="notes"
            value={newSession.notes}
            onChange={(e) => setNewSession({ ...newSession, notes: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows={3}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="moodScore" className="block text-sm font-medium text-gray-700">Mood Score (1-10)</label>
          <input
            type="number"
            id="moodScore"
            min="1"
            max="10"
            value={newSession.moodScore}
            onChange={(e) => setNewSession({ ...newSession, moodScore: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add Session
        </button>
      </form>
      <h2 className="text-xl font-semibold mb-2">Recent Sessions</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Patient</th>
            <th className="p-2 text-left">Notes</th>
            <th className="p-2 text-left">Mood Score</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map(session => (
            <tr key={session.id} className="border-b">
              <td className="p-2">{session.date}</td>
              <td className="p-2">{session.patientName}</td>
              <td className="p-2">{session.notes}</td>
              <td className="p-2">{session.moodScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

