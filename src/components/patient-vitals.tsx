"use client"

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const generateVitalData = () => {
  const data = []
  for (let i = 0; i < 24; i++) {
    data.push({
      time: `${i}:00`,
      heartRate: Math.floor(Math.random() * (100 - 60) + 60),
      bloodPressure: Math.floor(Math.random() * (140 - 100) + 100),
      oxygenSaturation: Math.floor(Math.random() * (100 - 95) + 95),
    })
  }
  return data
}

interface Patient {
  name: string;
  // Add other properties of the patient object if needed
}

export function PatientVitals({ patient }: { patient: Patient }) {
  const data = generateVitalData()

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{patient.name}&apos;s Vitals</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="heartRate" stroke="#8884d8" name="Heart Rate" />
          <Line type="monotone" dataKey="bloodPressure" stroke="#82ca9d" name="Blood Pressure" />
          <Line type="monotone" dataKey="oxygenSaturation" stroke="#ffc658" name="Oxygen Saturation" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

