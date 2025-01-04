'use client'

import { useState } from 'react'

type Wound = {
  id: number
  patientName: string
  location: string
  size: number
  status: 'Improving' | 'Stable' | 'Worsening'
  lastUpdated: string
}

const mockWounds: Wound[] = [
  { id: 1, patientName: 'John Doe', location: 'Left leg', size: 2.5, status: 'Improving', lastUpdated: '2023-06-01' },
  { id: 2, patientName: 'Jane Smith', location: 'Lower back', size: 3.8, status: 'Stable', lastUpdated: '2023-05-30' },
  { id: 3, patientName: 'Bob Johnson', location: 'Right foot', size: 1.2, status: 'Worsening', lastUpdated: '2023-06-02' },
]

export default function WoundCareMonitor() {
  const [wounds, setWounds] = useState<Wound[]>(mockWounds)
  const [newWound, setNewWound] = useState({ patientName: '', location: '', size: 0 })

  const handleAddWound = (e: React.FormEvent) => {
    e.preventDefault()
    setWounds(prevWounds => [
      ...prevWounds,
      {
        id: prevWounds.length + 1,
        ...newWound,
        status: 'Stable',
        lastUpdated: new Date().toISOString().split('T')[0]
      }
    ])
    setNewWound({ patientName: '', location: '', size: 0 })
  }

  const handleUpdateWound = (id: number, newStatus: 'Improving' | 'Stable' | 'Worsening') => {
    setWounds(prevWounds =>
      prevWounds.map(wound =>
        wound.id === id
          ? { ...wound, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] }
          : wound
      )
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Wound Care Monitoring Tool</h1>
      <form onSubmit={handleAddWound} className="mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Patient Name"
            value={newWound.patientName}
            onChange={e => setNewWound({ ...newWound, patientName: e.target.value })}
            className="flex-grow px-2 py-1 border rounded"
          />
          <input
            type="text"
            placeholder="Wound Location"
            value={newWound.location}
            onChange={e => setNewWound({ ...newWound, location: e.target.value })}
            className="flex-grow px-2 py-1 border rounded"
          />
          <input
            type="number"
            placeholder="Size (cm)"
            value={newWound.size}
            onChange={e => setNewWound({ ...newWound, size: parseFloat(e.target.value) })}
            className="w-24 px-2 py-1 border rounded"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Add Wound
          </button>
        </div>
      </form>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-2 text-left">Patient Name</th>
            <th className="p-2 text-left">Location</th>
            <th className="p-2 text-left">Size (cm)</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Last Updated</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {wounds.map(wound => (
            <tr key={wound.id} className={
              wound.status === 'Improving' ? 'bg-green-600' :
              wound.status === 'Worsening' ? 'bg-red-600' :
              ''
            }>
              <td className="p-2">{wound.patientName}</td>
              <td className="p-2">{wound.location}</td>
              <td className="p-2">{wound.size}</td>
              <td className="p-2">{wound.status}</td>
              <td className="p-2">{wound.lastUpdated}</td>
              <td className="p-2">
                <select
                  value={wound.status}
                  onChange={e => handleUpdateWound(wound.id, e.target.value as 'Improving' | 'Stable' | 'Worsening')}
                  className="px-2 py-1 border rounded"
                >
                  <option value="Improving">Improving</option>
                  <option value="Stable">Stable</option>
                  <option value="Worsening">Worsening</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

