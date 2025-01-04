'use client'

import { useState, useEffect } from 'react'

type EmergencyCall = {
  id: number
  location: string
  description: string
  priority: 'Low' | 'Medium' | 'High'
  status: 'Pending' | 'Dispatched' | 'Resolved'
  assignedTeam?: string
}

export default function SmartDispatchSystem() {
  const [calls, setCalls] = useState<EmergencyCall[]>([
    { id: 1, location: '123 Main St', description: 'Chest pain', priority: 'High', status: 'Pending' },
    { id: 2, location: '456 Elm St', description: 'Minor injury', priority: 'Low', status: 'Pending' },
  ])

  const [teams] = useState(['Team A', 'Team B', 'Team C'])

  useEffect(() => {
    // In a real application, you would fetch emergency calls data here
  }, [])

  const handleDispatch = (id: number, team: string) => {
    setCalls(prevCalls =>
      prevCalls.map(call =>
        call.id === id ? { ...call, status: 'Dispatched', assignedTeam: team } : call
      )
    )
  }

  const handleResolve = (id: number) => {
    setCalls(prevCalls =>
      prevCalls.map(call =>
        call.id === id ? { ...call, status: 'Resolved' } : call
      )
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Smart Incident Report and Dispatch System</h1>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Location</th>
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-left">Priority</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Assigned Team</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {calls.map(call => (
            <tr key={call.id} className={
              call.priority === 'High' ? 'bg-red-100' :
              call.priority === 'Medium' ? 'bg-yellow-100' :
              'bg-green-100'
            }>
              <td className="p-2">{call.location}</td>
              <td className="p-2">{call.description}</td>
              <td className="p-2">{call.priority}</td>
              <td className="p-2">{call.status}</td>
              <td className="p-2">{call.assignedTeam || 'Unassigned'}</td>
              <td className="p-2">
                {call.status === 'Pending' && (
                  <select
                    onChange={(e) => handleDispatch(call.id, e.target.value)}
                    className="p-1 border rounded mr-2"
                  >
                    <option value="">Assign Team</option>
                    {teams.map(team => (
                      <option key={team} value={team}>{team}</option>
                    ))}
                  </select>
                )}
                {call.status === 'Dispatched' && (
                  <button
                    onClick={() => handleResolve(call.id)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Resolve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

