'use client'

import { useEffect, useState } from 'react'

type Task = {
  id: number
  patientName: string
  description: string
  priority: 'low' | 'medium' | 'high'
  completed: boolean
}

const mockTasks: Task[] = [
  { id: 1, patientName: 'John Doe', description: 'Administer medication', priority: 'high', completed: false },
  { id: 2, patientName: 'Jane Smith', description: 'Change dressing', priority: 'medium', completed: false },
  { id: 3, patientName: 'Bob Johnson', description: 'Check vital signs', priority: 'low', completed: false },
  { id: 4, patientName: 'Alice Brown', description: 'Assist with physical therapy', priority: 'medium', completed: false },
  { id: 5, patientName: 'Charlie Davis', description: 'Prepare for discharge', priority: 'high', completed: false },
]

export default function WorkflowOptimizer() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [newTask, setNewTask] = useState({ patientName: '', description: '', priority: 'medium' as 'low' | 'medium' | 'high' })

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setTasks(prevTasks => {
        const updatedTasks = [...prevTasks]
        const randomIndex = Math.floor(Math.random() * updatedTasks.length)
        updatedTasks[randomIndex] = {
          ...updatedTasks[randomIndex],
          priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high'
        }
        return updatedTasks
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    setTasks(prevTasks => [
      ...prevTasks,
      {
        id: prevTasks.length + 1,
        ...newTask,
        completed: false
      }
    ])
    setNewTask({ patientName: '', description: '', priority: 'medium' })
  }

  const handleToggleComplete = (id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Nurse Workflow Optimizer</h1>
      <form onSubmit={handleAddTask} className="mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Patient Name"
            value={newTask.patientName}
            onChange={e => setNewTask({ ...newTask, patientName: e.target.value })}
            className="flex-grow px-2 py-1 border rounded"
          />
          <input
            type="text"
            placeholder="Task Description"
            value={newTask.description}
            onChange={e => setNewTask({ ...newTask, description: e.target.value })}
            className="flex-grow px-2 py-1 border rounded"
          />
          <select
            value={newTask.priority}
            onChange={e => setNewTask({ ...newTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
            className="px-2 py-1 border rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Add Task
          </button>
        </div>
      </form>
      <ul className="space-y-2">
        {sortedTasks.map(task => (
          <li
            key={task.id}
            className={`p-2 rounded ${
              task.priority === 'high'
                ? 'bg-red-600'
                : task.priority === 'medium'
                ? 'bg-yellow-600'
                : 'bg-green-600'
            } ${task.completed ? 'opacity-50' : ''}`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
                className="mr-2"
              />
              <span className={task.completed ? 'line-through' : ''}>
                <strong>{task.patientName}:</strong> {task.description} (Priority: {task.priority})
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

