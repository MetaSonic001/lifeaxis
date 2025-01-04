'use client'

import { useState } from 'react'

type Patient = {
  id: number
  name: string
  room: string
  careInstructions: string[]
}

const mockPatients: Patient[] = [
  {
    id: 1,
    name: 'John Doe',
    room: '101A',
    careInstructions: [
      'Check vital signs',
      'Administer pain medication if needed',
      'Assist with mobility exercises',
      'Ensure proper hydration'
    ]
  },
  {
    id: 2,
    name: 'Jane Smith',
    room: '102B',
    careInstructions: [
      'Monitor blood glucose levels',
      'Change wound dressing',
      'Assist with personal hygiene',
      'Encourage deep breathing exercises'
    ]
  },
  {
    id: 3,
    name: 'Bob Johnson',
    room: '103C',
    careInstructions: [
      'Administer prescribed antibiotics',
      'Monitor IV fluid levels',
      'Assist with feeding if necessary',
      'Encourage use of incentive spirometer'
    ]
  }
]

export default function RoundingAssistant() {
  const [patients] = useState<Patient[]>(mockPatients)
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null)
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set())

  const handleStartRound = (patient: Patient) => {
    setCurrentPatient(patient)
    setCompletedTasks(new Set())
  }

  const handleCompleteTask = (task: string) => {
    setCompletedTasks(prev => {
      const newSet = new Set(prev)
      if (newSet.has(task)) {
        newSet.delete(task)
      } else {
        newSet.add(task)
      }
      return newSet
    })
  }

  const handleFinishRound = () => {
    // In a real application, you would log the completed tasks to the patient's EHR
    console.log(`Completed tasks for ${currentPatient?.name}:`, Array.from(completedTasks))
    setCurrentPatient(null)
    setCompletedTasks(new Set())
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">AI-Powered Patient Rounding Assistant</h1>
      {currentPatient ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Current Patient: {currentPatient.name} (Room: {currentPatient.room})
          </h2>
          <ul className="space-y-2 mb-4">
            {currentPatient.careInstructions.map((task, index) => (
              <li key={index} className="flex items-center">
                <input
                  type="checkbox"
                  checked={completedTasks.has(task)}
                  onChange={() => handleCompleteTask(task)}
                  className="mr-2"
                />
                <span className={completedTasks.has(task) ? 'line-through' : ''}>{task}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={handleFinishRound}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Finish Round
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-2">Select a patient to start rounding:</h2>
          <ul className="space-y-2">
            {patients.map(patient => (
              <li key={patient.id}>
                <button
                  onClick={() => handleStartRound(patient)}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Start Round for {patient.name} (Room: {patient.room})
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

