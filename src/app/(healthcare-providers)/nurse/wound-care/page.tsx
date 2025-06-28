"use client"

import type React from "react"

import { useState } from "react"

type Wound = {
  id: number
  patientName: string
  location: string
  size: number
  status: "Improving" | "Stable" | "Worsening"
  lastUpdated: string
}

const mockWounds: Wound[] = [
  { id: 1, patientName: "John Doe", location: "Left leg", size: 2.5, status: "Improving", lastUpdated: "2023-06-01" },
  { id: 2, patientName: "Jane Smith", location: "Lower back", size: 3.8, status: "Stable", lastUpdated: "2023-05-30" },
  {
    id: 3,
    patientName: "Bob Johnson",
    location: "Right foot",
    size: 1.2,
    status: "Worsening",
    lastUpdated: "2023-06-02",
  },
]

export default function WoundCareMonitor() {
  const [wounds, setWounds] = useState<Wound[]>(mockWounds)
  const [newWound, setNewWound] = useState({ patientName: "", location: "", size: 0 })

  const handleAddWound = (e: React.FormEvent) => {
    e.preventDefault()
    setWounds((prevWounds) => [
      ...prevWounds,
      {
        id: prevWounds.length + 1,
        ...newWound,
        status: "Stable",
        lastUpdated: new Date().toISOString().split("T")[0],
      },
    ])
    setNewWound({ patientName: "", location: "", size: 0 })
  }

  const handleUpdateWound = (id: number, newStatus: "Improving" | "Stable" | "Worsening") => {
    setWounds((prevWounds) =>
      prevWounds.map((wound) =>
        wound.id === id ? { ...wound, status: newStatus, lastUpdated: new Date().toISOString().split("T")[0] } : wound,
      ),
    )
  }

  const getStatusStyle = (status: "Improving" | "Stable" | "Worsening") => {
    switch (status) {
      case "Improving":
        return "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
      case "Worsening":
        return "bg-gradient-to-r from-red-50 to-rose-50 border-red-200"
      default:
        return "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Wound Care Monitoring Tool</h1>
        <p className="text-slate-600">Track and monitor patient wound healing progress</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Add New Wound Record</h2>
        <form onSubmit={handleAddWound} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Patient Name"
              value={newWound.patientName}
              onChange={(e) => setNewWound({ ...newWound, patientName: e.target.value })}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            <input
              type="text"
              placeholder="Wound Location"
              value={newWound.location}
              onChange={(e) => setNewWound({ ...newWound, location: e.target.value })}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Size (cm)"
                value={newWound.size}
                onChange={(e) => setNewWound({ ...newWound, size: Number.parseFloat(e.target.value) })}
                className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 font-medium shadow-sm"
              >
                Add Wound
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">Wound Records</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Patient Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Location</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Size (cm)</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Last Updated</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {wounds.map((wound) => (
                <tr key={wound.id} className={`${getStatusStyle(wound.status)} hover:bg-opacity-80 transition-colors`}>
                  <td className="px-6 py-4 text-slate-800 font-medium">{wound.patientName}</td>
                  <td className="px-6 py-4 text-slate-700">{wound.location}</td>
                  <td className="px-6 py-4 text-slate-700">{wound.size}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        wound.status === "Improving"
                          ? "bg-green-100 text-green-700"
                          : wound.status === "Worsening"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {wound.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700">{wound.lastUpdated}</td>
                  <td className="px-6 py-4">
                    <select
                      value={wound.status}
                      onChange={(e) =>
                        handleUpdateWound(wound.id, e.target.value as "Improving" | "Stable" | "Worsening")
                      }
                      className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
      </div>
    </div>
  )
}
