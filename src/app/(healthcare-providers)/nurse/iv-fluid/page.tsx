'use client'

import { useState, useEffect } from 'react'

type IVFluid = {
  id: number
  patientName: string
  fluidType: string
  totalVolume: number
  remainingVolume: number
  flowRate: number
  status: 'Normal' | 'Low' | 'Critical'
}

const mockIVFluids: IVFluid[] = [
  { id: 1, patientName: 'John Doe', fluidType: 'Saline', totalVolume: 1000, remainingVolume: 750, flowRate: 100, status: 'Normal' },
  { id: 2, patientName: 'Jane Smith', fluidType: 'Lactated Ringer\'s', totalVolume: 500, remainingVolume: 100, flowRate: 150, status: 'Low' },
  { id: 3, patientName: 'Bob Johnson', fluidType: 'Dextrose 5%', totalVolume: 1000, remainingVolume: 50, flowRate: 200, status: 'Critical' },
]

export default function IVFluidMonitor() {
  const [ivFluids, setIVFluids] = useState<IVFluid[]>(mockIVFluids)

  useEffect(() => {
    const interval = setInterval(() => {
      setIVFluids(prevFluids =>
        prevFluids.map(fluid => {
          const newRemainingVolume = Math.max(0, fluid.remainingVolume - (fluid.flowRate / 60))
          let newStatus: 'Normal' | 'Low' | 'Critical' = 'Normal'
          if (newRemainingVolume <= 0) {
            newStatus = 'Critical'
          } else if (newRemainingVolume / fluid.totalVolume <= 0.2) {
            newStatus = 'Low'
          }
          return {
            ...fluid,
            remainingVolume: newRemainingVolume,
            status: newStatus
          }
        })
      )
    }, 1000) // Update every second for demonstration purposes

    return () => clearInterval(interval)
  }, [])

  const handleAdjustFlowRate = (id: number, adjustment: number) => {
    setIVFluids(prevFluids =>
      prevFluids.map(fluid =>
        fluid.id === id
          ? { ...fluid, flowRate: Math.max(0, fluid.flowRate + adjustment) }
          : fluid
      )
    )
  }

  const getStatusColor = (status: 'Normal' | 'Low' | 'Critical') => {
    switch (status) {
      case 'Normal':
        return 'bg-green-900'
      case 'Low':
        return 'bg-yellow-400 text-black'
      case 'Critical':
        return 'bg-orange-600'
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">AI-Powered IV Fluid Monitor</h1>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-2 text-left">Patient Name</th>
            <th className="p-2 text-left">Fluid Type</th>
            <th className="p-2 text-left">Remaining Volume</th>
            <th className="p-2 text-left">Flow Rate (mL/hr)</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ivFluids.map(fluid => (
            <tr key={fluid.id} className={getStatusColor(fluid.status)}>
              <td className="p-2">{fluid.patientName}</td>
              <td className="p-2">{fluid.fluidType}</td>
              <td className="p-2">
                {fluid.remainingVolume.toFixed(0)} / {fluid.totalVolume} mL
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(fluid.remainingVolume / fluid.totalVolume) * 100}%` }}
                  ></div>
                </div>
              </td>
              <td className="p-2">{fluid.flowRate}</td>
              <td className="p-2">{fluid.status}</td>
              <td className="p-2">
              <button
              onClick={() => handleAdjustFlowRate(fluid.id, -10)}
              className="px-2 py-1 bg-red-600 text-white rounded mr-2 border border-black"
            >
              -10
            </button>
            <button
              onClick={() => handleAdjustFlowRate(fluid.id, 10)}
              className="px-2 py-1 bg-green-600 text-white rounded border border-black"
            >
              +10
            </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

