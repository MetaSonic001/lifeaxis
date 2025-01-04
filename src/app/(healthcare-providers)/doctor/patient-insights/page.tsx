'use client'

import { useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const mockData = [
  { date: '2023-01-01', glucose: 120, bloodPressure: 130 },
  { date: '2023-02-01', glucose: 110, bloodPressure: 125 },
  { date: '2023-03-01', glucose: 130, bloodPressure: 135 },
  { date: '2023-04-01', glucose: 115, bloodPressure: 128 },
  { date: '2023-05-01', glucose: 125, bloodPressure: 132 },
  { date: '2023-06-01', glucose: 118, bloodPressure: 130 },
]

export default function PatientInsights() {
  const [patientId, setPatientId] = useState('')
  const [insights, setInsights] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would fetch patient data based on the ID
    // For this example, we'll use mock data and insights
    setInsights(`Patient Insights for ID ${patientId}:

    1. Glucose Levels:
       - Average: 119.67 mg/dL
       - Trend: Slightly increasing over the past 6 months
       - Recommendation: Consider adjusting diabetes management plan

    2. Blood Pressure:
       - Average: 130/85 mmHg
       - Trend: Stable with minor fluctuations
       - Recommendation: Continue current hypertension treatment

    3. Predicted Complications:
       - 15% risk of developing diabetic retinopathy in the next 5 years
       - 10% risk of cardiovascular event in the next 10 years

    4. Suggested Interventions:
       - Increase frequency of HbA1c tests to every 3 months
       - Recommend lifestyle modifications: increased physical activity and dietary changes
       - Schedule eye examination within the next 6 months

    Please review these insights and adjust the treatment plan as necessary.`)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Patient Insights Dashboard</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="patientId" className="block text-sm font-medium bg-black text-white">
            Patient ID
          </label>
          <input
            type="text"
            id="patientId"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            placeholder="Enter patient ID..."
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Get Patient Insights
        </button>
      </form>
      {insights && (
        <div className="mt-4 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Patient Insights:</h2>
          <p className="whitespace-pre-line">{insights}</p>
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Patient Data Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="glucose" stroke="#8884d8" name="Glucose (mg/dL)" />
                <Line yAxisId="right" type="monotone" dataKey="bloodPressure" stroke="#82ca9d" name="Blood Pressure (systolic)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}

