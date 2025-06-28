"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Clipboard,
  User,
  MapPin,
  Clock,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Plus,
  Calendar,
  FileText,
  Stethoscope,
  Pill,
  Activity,
} from "lucide-react"
import { useState, useEffect } from "react"

type RoundingTask = {
  id: number
  patientName: string
  patientId: string
  room: string
  taskType: "assessment" | "medication" | "vitals" | "documentation" | "discharge" | "admission"
  description: string
  priority: "low" | "medium" | "high" | "urgent"
  estimatedTime: number
  scheduledTime: string
  completed: boolean
  notes?: string
  vitals?: {
    heartRate?: number
    bloodPressure?: string
    temperature?: number
    oxygenSat?: number
  }
  medications?: string[]
  alerts?: string[]
}

const mockTasks: RoundingTask[] = [
  {
    id: 1,
    patientName: "John Doe",
    patientId: "P001",
    room: "101A",
    taskType: "assessment",
    description: "Post-operative assessment and wound check",
    priority: "high",
    estimatedTime: 20,
    scheduledTime: "09:00",
    completed: false,
    vitals: {
      heartRate: 78,
      bloodPressure: "120/80",
      temperature: 98.6,
      oxygenSat: 98,
    },
    alerts: ["Monitor for signs of infection"],
  },
  {
    id: 2,
    patientName: "Jane Smith",
    patientId: "P002",
    room: "102B",
    taskType: "medication",
    description: "Administer morning medications",
    priority: "urgent",
    estimatedTime: 10,
    scheduledTime: "08:30",
    completed: false,
    medications: ["Lisinopril 5mg", "Metformin 500mg"],
  },
  {
    id: 3,
    patientName: "Bob Johnson",
    patientId: "P003",
    room: "103C",
    taskType: "vitals",
    description: "Routine vital signs check",
    priority: "medium",
    estimatedTime: 15,
    scheduledTime: "09:30",
    completed: true,
    notes: "All vitals within normal range",
    vitals: {
      heartRate: 72,
      bloodPressure: "118/76",
      temperature: 98.4,
      oxygenSat: 99,
    },
  },
  {
    id: 4,
    patientName: "Alice Brown",
    patientId: "P004",
    room: "104A",
    taskType: "discharge",
    description: "Discharge planning and education",
    priority: "medium",
    estimatedTime: 30,
    scheduledTime: "10:00",
    completed: false,
  },
]

export default function RoundingAssistant() {
  const [tasks, setTasks] = useState<RoundingTask[]>(mockTasks)
  const [selectedTask, setSelectedTask] = useState<RoundingTask | null>(null)
  const [showAddTask, setShowAddTask] = useState(false)
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all")
  const [priorityFilter, setPriorityFilter] = useState<"all" | "urgent" | "high" | "medium" | "low">("all")
  const [currentTime, setCurrentTime] = useState(new Date())

  const [newTask, setNewTask] = useState({
    patientName: "",
    patientId: "",
    room: "",
    taskType: "assessment" as RoundingTask["taskType"],
    description: "",
    priority: "medium" as RoundingTask["priority"],
    estimatedTime: 15,
    scheduledTime: "",
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  const handleCompleteTask = (id: number, notes?: string, vitals?: RoundingTask["vitals"]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: true,
              notes: notes || task.notes,
              vitals: vitals || task.vitals,
            }
          : task,
      ),
    )
    setSelectedTask(null)
  }

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    const task: RoundingTask = {
      id: tasks.length + 1,
      ...newTask,
      completed: false,
    }
    setTasks([...tasks, task])
    setNewTask({
      patientName: "",
      patientId: "",
      room: "",
      taskType: "assessment",
      description: "",
      priority: "medium",
      estimatedTime: 15,
      scheduledTime: "",
    })
    setShowAddTask(false)
  }

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case "assessment":
        return <Stethoscope className="h-4 w-4" />
      case "medication":
        return <Pill className="h-4 w-4" />
      case "vitals":
        return <Activity className="h-4 w-4" />
      case "documentation":
        return <FileText className="h-4 w-4" />
      case "discharge":
        return <User className="h-4 w-4" />
      case "admission":
        return <Plus className="h-4 w-4" />
      default:
        return <Clipboard className="h-4 w-4" />
    }
  }

  const getTaskTypeColor = (type: string) => {
    switch (type) {
      case "assessment":
        return "bg-blue-100 text-blue-800"
      case "medication":
        return "bg-purple-100 text-purple-800"
      case "vitals":
        return "bg-green-100 text-green-800"
      case "documentation":
        return "bg-gray-100 text-gray-800"
      case "discharge":
        return "bg-orange-100 text-orange-800"
      case "admission":
        return "bg-cyan-100 text-cyan-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const isOverdue = (scheduledTime: string) => {
    const scheduled = new Date(`${new Date().toDateString()} ${scheduledTime}`)
    return currentTime > scheduled
  }

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "pending") return !task.completed
      if (filter === "completed") return task.completed
      return true
    })
    .filter((task) => priorityFilter === "all" || task.priority === priorityFilter)
    .sort((a, b) => {
      // Sort by priority and scheduled time
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 }
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }
      return a.scheduledTime.localeCompare(b.scheduledTime)
    })

  const completedTasks = tasks.filter((t) => t.completed).length
  const pendingTasks = tasks.filter((t) => !t.completed).length
  const overdueTasks = tasks.filter((t) => !t.completed && isOverdue(t.scheduledTime)).length
  const totalEstimatedTime = tasks.filter((t) => !t.completed).reduce((sum, task) => sum + task.estimatedTime, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Rounding Assistant</h1>
            <p className="text-slate-600">Organize and track patient rounds efficiently</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-slate-600">Current Time</p>
              <p className="text-lg font-semibold text-slate-800">
                {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
            <Button onClick={() => setShowAddTask(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Pending Tasks</p>
                <p className="text-2xl font-bold text-blue-800">{pendingTasks}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Overdue</p>
                <p className="text-2xl font-bold text-red-800">{overdueTasks}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Completed</p>
                <p className="text-2xl font-bold text-green-800">{completedTasks}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Est. Time</p>
                <p className="text-2xl font-bold text-purple-800">{totalEstimatedTime} min</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <h2 className="text-xl font-semibold text-slate-800">Patient Rounds</h2>
          <div className="flex items-center space-x-4 ml-auto">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card
            key={task.id}
            className={`shadow-sm border transition-all duration-300 hover:shadow-lg ${
              task.completed
                ? "bg-gray-50 border-gray-200 opacity-75"
                : isOverdue(task.scheduledTime)
                  ? "bg-red-50 border-red-200"
                  : "bg-white border-slate-200"
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <button
                    onClick={() => !task.completed && handleCompleteTask(task.id)}
                    className="mt-1"
                    disabled={task.completed}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle
                        className={`text-lg font-bold ${
                          task.completed ? "line-through text-gray-500" : "text-slate-800"
                        }`}
                      >
                        {task.patientName}
                      </CardTitle>
                      <Badge className={`${getPriorityColor(task.priority)} border text-xs`}>
                        {task.priority.toUpperCase()}
                      </Badge>
                      <Badge className={`${getTaskTypeColor(task.taskType)} text-xs`}>
                        <span className="flex items-center space-x-1">
                          {getTaskTypeIcon(task.taskType)}
                          <span>{task.taskType.toUpperCase()}</span>
                        </span>
                      </Badge>
                      {!task.completed && isOverdue(task.scheduledTime) && (
                        <Badge className="bg-red-100 text-red-800 border-red-200 text-xs">OVERDUE</Badge>
                      )}
                    </div>

                    <p className={`mb-2 ${task.completed ? "text-gray-500" : "text-slate-700"}`}>{task.description}</p>

                    <div className="flex items-center space-x-4 text-sm text-slate-600 mb-2">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>ID: {task.patientId}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>Room: {task.room}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Scheduled: {task.scheduledTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Est: {task.estimatedTime} min</span>
                      </div>
                    </div>

                    {task.medications && task.medications.length > 0 && (
                      <div className="mb-2">
                        <p className="text-sm font-medium text-slate-700 mb-1">Medications:</p>
                        <div className="flex flex-wrap gap-1">
                          {task.medications.map((med, index) => (
                            <Badge key={index} className="bg-purple-100 text-purple-800 text-xs">
                              {med}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {task.alerts && task.alerts.length > 0 && (
                      <div className="mb-2">
                        <div className="flex items-center space-x-2 mb-1">
                          <AlertTriangle className="h-4 w-4 text-amber-600" />
                          <p className="text-sm font-medium text-amber-700">Alerts:</p>
                        </div>
                        <div className="space-y-1">
                          {task.alerts.map((alert, index) => (
                            <p key={index} className="text-sm text-amber-600 bg-amber-50 p-2 rounded">
                              {alert}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {task.notes && (
                      <div className="p-2 bg-green-50 rounded text-sm text-green-700">
                        <strong>Notes:</strong> {task.notes}
                      </div>
                    )}
                  </div>
                </div>

                <Button size="sm" variant="outline" onClick={() => setSelectedTask(task)} className="ml-4">
                  <FileText className="h-4 w-4 mr-1" />
                  Details
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Add New Rounding Task</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowAddTask(false)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddTask} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Patient Name"
                    value={newTask.patientName}
                    onChange={(e) => setNewTask({ ...newTask, patientName: e.target.value })}
                    className="px-3 py-2 border border-slate-300 rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Patient ID"
                    value={newTask.patientId}
                    onChange={(e) => setNewTask({ ...newTask, patientId: e.target.value })}
                    className="px-3 py-2 border border-slate-300 rounded-lg"
                    required
                  />
                </div>

                <input
                  type="text"
                  placeholder="Room Number"
                  value={newTask.room}
                  onChange={(e) => setNewTask({ ...newTask, room: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={newTask.taskType}
                    onChange={(e) => setNewTask({ ...newTask, taskType: e.target.value as any })}
                    className="px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="assessment">Assessment</option>
                    <option value="medication">Medication</option>
                    <option value="vitals">Vitals</option>
                    <option value="documentation">Documentation</option>
                    <option value="discharge">Discharge</option>
                    <option value="admission">Admission</option>
                  </select>

                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                    className="px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <textarea
                  rows={3}
                  placeholder="Task description..."
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="time"
                    value={newTask.scheduledTime}
                    onChange={(e) => setNewTask({ ...newTask, scheduledTime: e.target.value })}
                    className="px-3 py-2 border border-slate-300 rounded-lg"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Est. Time (min)"
                    value={newTask.estimatedTime}
                    onChange={(e) => setNewTask({ ...newTask, estimatedTime: Number(e.target.value) })}
                    className="px-3 py-2 border border-slate-300 rounded-lg"
                    min="5"
                    max="120"
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Add Task
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl bg-white max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Task Details: {selectedTask.patientName}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setSelectedTask(null)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Patient ID</p>
                    <p className="text-lg text-slate-800">{selectedTask.patientId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Room</p>
                    <p className="text-lg text-slate-800">{selectedTask.room}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Task Type</p>
                    <Badge className={`${getTaskTypeColor(selectedTask.taskType)} mt-1`}>
                      <span className="flex items-center space-x-1">
                        {getTaskTypeIcon(selectedTask.taskType)}
                        <span>{selectedTask.taskType.toUpperCase()}</span>
                      </span>
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Priority</p>
                    <Badge className={`${getPriorityColor(selectedTask.priority)} border mt-1`}>
                      {selectedTask.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Scheduled Time</p>
                    <p className="text-lg text-slate-800">{selectedTask.scheduledTime}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Estimated Time</p>
                    <p className="text-lg text-slate-800">{selectedTask.estimatedTime} minutes</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-700 mb-2">Description</p>
                  <p className="text-slate-800 p-3 bg-slate-50 rounded-lg">{selectedTask.description}</p>
                </div>

                {selectedTask.vitals && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Vital Signs</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {selectedTask.vitals.heartRate && (
                        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                          <p className="text-sm font-medium text-red-700">Heart Rate</p>
                          <p className="text-xl font-bold text-red-800">{selectedTask.vitals.heartRate} bpm</p>
                        </div>
                      )}
                      {selectedTask.vitals.bloodPressure && (
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-sm font-medium text-blue-700">Blood Pressure</p>
                          <p className="text-xl font-bold text-blue-800">{selectedTask.vitals.bloodPressure}</p>
                        </div>
                      )}
                      {selectedTask.vitals.temperature && (
                        <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <p className="text-sm font-medium text-orange-700">Temperature</p>
                          <p className="text-xl font-bold text-orange-800">{selectedTask.vitals.temperature}°F</p>
                        </div>
                      )}
                      {selectedTask.vitals.oxygenSat && (
                        <div className="p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                          <p className="text-sm font-medium text-cyan-700">Oxygen Saturation</p>
                          <p className="text-xl font-bold text-cyan-800">{selectedTask.vitals.oxygenSat}%</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {!selectedTask.completed ? (
                  <div className="flex space-x-4">
                    <Button
                      onClick={() => handleCompleteTask(selectedTask.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Mark Complete
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Add Notes
                    </Button>
                  </div>
                ) : (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-700">Task Completed</span>
                    </div>
                    {selectedTask.notes && <p className="text-sm text-green-600 mt-2">Notes: {selectedTask.notes}</p>}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
