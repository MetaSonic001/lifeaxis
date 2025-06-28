"use client"

import { useState, useEffect } from "react"

type IVFluid = {
  id: number
  patientName: string
  fluidType: string
  totalVolume: number
  remainingVolume: number
  flowRate: number
  status: "Normal" | "Low" | "Critical"
}

const mockIVFluids: IVFluid[] = [
  {
    id: 1,
    patientName: "John Doe",
    fluidType: "Saline",
    totalVolume: 1000,
    remainingVolume: 750,
    flowRate: 100,
    status: "Normal",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    fluidType: "Lactated Ringer's",
    totalVolume: 500,
    remainingVolume: 100,
    flowRate: 150,
    status: "Low",
  },
  {
    id: 3,
    patientName: "Bob Johnson",
    fluidType: "Dextrose 5%",
    totalVolume: 1000,
    remainingVolume: 50,
    flowRate: 200,
    status: "Critical",
  },
]

export default function IVFluidMonitor() {
  const [ivFluids, setIVFluids] = useState<IVFluid[]>(mockIVFluids)

  useEffect(() => {
    const interval = setInterval(() => {
      setIVFluids((prevFluids) =>
        prevFluids.map((fluid) => {
          const newRemainingVolume = Math.max(0, fluid.remainingVolume - fluid.flowRate / 60)
          let newStatus: "Normal" | "Low" | "Critical" = "Normal"
          if (newRemainingVolume <= 0) {
            newStatus = "Critical"
          } else if (newRemainingVolume / fluid.totalVolume <= 0.2) {
            newStatus = "Low"
          }

          return {
            ...fluid,
            remainingVolume: newRemainingVolume,
            status: newStatus,
          }
        }),
      )
    }, 1000) // Update every second for demonstration purposes

    return () => clearInterval(interval)
  }, [])

  const handleAdjustFlowRate = (id: number, adjustment: number) => {
    setIVFluids((prevFluids) =>
      prevFluids.map((fluid) =>
        fluid.id === id ? { ...fluid, flowRate: Math.max(0, fluid.flowRate + adjustment) } : fluid,
      ),
    )
  }

  const getStatusStyle = (status: "Normal" | "Low" | "Critical") => {
    switch (status) {
      case "Normal":
        return "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
      case "Low":
        return "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200"
      case "Critical":
        return "bg-gradient-to-r from-red-50 to-rose-50 border-red-200"
    }
  }

  const getStatusBadge = (status: "Normal" | "Low" | "Critical") => {
    switch (status) {
      case "Normal":
        return "bg-green-100 text-green-700"
      case "Low":
        return "bg-amber-100 text-amber-700"
      case "Critical":
        return "bg-red-100 text-red-700"
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">AI-Powered IV Fluid Monitor</h1>
        <p className="text-slate-600">Real-time monitoring of IV fluid levels and flow rates</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">Active IV Fluids</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Patient Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Fluid Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Remaining Volume</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Flow Rate (mL/hr)</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {ivFluids.map((fluid) => (
                <tr key={fluid.id} className={`${getStatusStyle(fluid.status)} hover:bg-opacity-80 transition-colors`}>
                  <td className="px-6 py-4 text-slate-800 font-medium">{fluid.patientName}</td>
                  <td className="px-6 py-4 text-slate-700">{fluid.fluidType}</td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="text-slate-700">
                        {fluid.remainingVolume.toFixed(0)} / {fluid.totalVolume} mL
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            fluid.status === "Critical"
                              ? "bg-red-400"
                              : fluid.status === "Low"
                                ? "bg-amber-400"
                                : "bg-blue-400"
                          }`}
                          style={{ width: `${Math.max(5, (fluid.remainingVolume / fluid.totalVolume) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-700 font-mono">{fluid.flowRate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(fluid.status)}`}>
                      {fluid.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAdjustFlowRate(fluid.id, -10)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                      >
                        -10
                      </button>
                      <button
                        onClick={() => handleAdjustFlowRate(fluid.id, 10)}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
                      >
                        +10
                      </button>
                    </div>
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
