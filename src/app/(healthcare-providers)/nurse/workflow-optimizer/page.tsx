"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Clock,
  User,
  AlertTriangle,
  CheckCircle2,
  Circle,
  Calendar,
  Search,
  MoreHorizontal,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react"
import { useState } from "react"

type Task = {
  id: number
  patientName: string
  patientRoom: string
  description: string
  priority: "low" | "medium" | "high" | "urgent"
  category: "medication" | "vitals" | "care" | "documentation" | "rounds"
  estimatedTime: number
  dueTime: string
  completed: boolean
  assignedTo?: string
  progress: number
}

const mockTasks: Task[] = [
  {
    id: 1,
    patientName: "John Doe",
    patientRoom: "101A",
    description: "Administer pain medication",
    priority: "urgent",
    category: "medication",
    estimatedTime: 10,
    dueTime: "09:00",
    completed: false,
    progress: 0,
  },
  {
    id: 2,
    patientName: "Jane Smith",
    patientRoom: "102B",
    description: "Check vital signs",
    priority: "high",
    category: "vitals",
    estimatedTime: 15,
    dueTime: "09:30",
    completed: false,
    progress: 60,
  },
  {
    id: 3,
    patientName: "Bob Johnson",
    patientRoom: "103C",
    description: "Wound dressing change",
    priority: "medium",
    category: "care",
    estimatedTime: 20,
    dueTime: "10:00",
    completed: false,
    progress: 25,
  },
  {
    id: 4,
    patientName: "Alice Brown",
    patientRoom: "104A",
    description: "Physical therapy assistance",
    priority: "low",
    category: "care",
    estimatedTime: 30,
    dueTime: "10:30",
    completed: true,
    progress: 100,
  },
]

export default function WorkflowOptimizer() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddTask, setShowAddTask] = useState(false)
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban")

  const [newTask, setNewTask] = useState({
    patientName: "",
    patientRoom: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high" | "urgent",
    category: "care" as "medication" | "vitals" | "care" | "documentation" | "rounds",
    estimatedTime: 15,
    dueTime: "",
  })

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    const task: Task = {
      id: tasks.length + 1,
      ...newTask,
      completed: false,
      progress: 0,
    }
    setTasks([...tasks, task])
    setNewTask({
      patientName: "",
      patientRoom: "",
      description: "",
      priority: "medium",
      category: "care",
      estimatedTime: 15,
      dueTime: "",
    })
    setShowAddTask(false)
  }

  const toggleTaskComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed, progress: task.completed ? 0 : 100 } : task,
      ),
    )
  }

  const updateProgress = (id: number, progress: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, progress, completed: progress === 100 } : task)))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-gradient-to-r from-red-500 to-red-600 text-white"
      case "high":
        return "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
      case "medium":
        return "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
      case "low":
        return "bg-gradient-to-r from-green-500 to-green-600 text-white"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "medication":
        return "💊"
      case "vitals":
        return "📊"
      case "care":
        return "🩺"
      case "documentation":
        return "📝"
      case "rounds":
        return "🚶"
      default:
        return "📋"
    }
  }

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "pending") return !task.completed
      if (filter === "completed") return task.completed
      return true
    })
    .filter((task) => priorityFilter === "all" || task.priority === priorityFilter)
    .filter(
      (task) =>
        task.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.patientRoom.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    })

  const completedTasks = tasks.filter((t) => t.completed).length
  const totalTasks = tasks.length
  const urgentTasks = tasks.filter((t) => t.priority === "urgent" && !t.completed).length
  const inProgressTasks = tasks.filter((t) => t.progress > 0 && t.progress < 100).length

  const tasksByStatus = {
    todo: filteredTasks.filter((t) => t.progress === 0 && !t.completed),
    inProgress: filteredTasks.filter((t) => t.progress > 0 && t.progress < 100),
    completed: filteredTasks.filter((t) => t.completed),
  }

  return (
    <div className="space-y-6">
      {/* Modern Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-3">Workflow Optimizer</h1>
            <p className="text-indigo-100 text-lg">AI-powered task prioritization and workflow management</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-sm text-indigo-100">Efficiency Score</p>
              <p className="text-2xl font-bold">94%</p>
            </div>
            <Button
              onClick={() => setShowAddTask(true)}
              className="bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Task
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 mb-1">Total Tasks</p>
                <p className="text-3xl font-bold text-blue-900">{totalTasks}</p>
                <p className="text-xs text-blue-600 mt-1">Active workflow</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700 mb-1">In Progress</p>
                <p className="text-3xl font-bold text-amber-900">{inProgressTasks}</p>
                <p className="text-xs text-amber-600 mt-1">Currently active</p>
              </div>
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                <Play className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700 mb-1">Urgent</p>
                <p className="text-3xl font-bold text-red-900">{urgentTasks}</p>
                <p className="text-xs text-red-600 mt-1">Needs attention</p>
              </div>
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 mb-1">Completed</p>
                <p className="text-3xl font-bold text-green-900">{completedTasks}</p>
                <p className="text-xs text-green-600 mt-1">{Math.round((completedTasks / totalTasks) * 100)}% done</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modern Controls */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
                />
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
              >
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "kanban" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("kanban")}
                className="rounded-xl"
              >
                Kanban
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-xl"
              >
                List
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      {viewMode === "kanban" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* To Do Column */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-xl">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-700">To Do</span>
                </div>
                <Badge className="bg-gray-100 text-gray-700">{tasksByStatus.todo.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {tasksByStatus.todo.map((task) => (
                <Card
                  key={task.id}
                  className="border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg">{getCategoryIcon(task.category)}</span>
                          <Badge className={`${getPriorityColor(task.priority)} text-xs px-2 py-1`}>
                            {task.priority.toUpperCase()}
                          </Badge>
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-1">{task.description}</h4>
                        <p className="text-sm text-gray-600">
                          {task.patientName} • Room {task.patientRoom}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{task.dueTime}</span>
                      </div>
                      <span>{task.estimatedTime} min</span>
                    </div>
                    <div className="mt-3">
                      <Button
                        size="sm"
                        onClick={() => updateProgress(task.id, 50)}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start Task
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* In Progress Column */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-xl">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-blue-700">In Progress</span>
                </div>
                <Badge className="bg-blue-100 text-blue-700">{tasksByStatus.inProgress.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {tasksByStatus.inProgress.map((task) => (
                <Card
                  key={task.id}
                  className="border border-blue-200 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg">{getCategoryIcon(task.category)}</span>
                          <Badge className={`${getPriorityColor(task.priority)} text-xs px-2 py-1`}>
                            {task.priority.toUpperCase()}
                          </Badge>
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-1">{task.description}</h4>
                        <p className="text-sm text-gray-600">
                          {task.patientName} • Room {task.patientRoom}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{task.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{task.dueTime}</span>
                      </div>
                      <span>{task.estimatedTime} min</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => updateProgress(task.id, 100)}
                        className="flex-1 bg-green-600 hover:bg-green-700 rounded-lg"
                      >
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Complete
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateProgress(task.id, 0)}
                        className="rounded-lg"
                      >
                        <Pause className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Completed Column */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 rounded-t-xl">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-700">Completed</span>
                </div>
                <Badge className="bg-green-100 text-green-700">{tasksByStatus.completed.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {tasksByStatus.completed.map((task) => (
                <Card
                  key={task.id}
                  className="border border-green-200 hover:shadow-md transition-all duration-200 cursor-pointer opacity-75"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg">{getCategoryIcon(task.category)}</span>
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <h4 className="font-semibold text-gray-600 line-through mb-1">{task.description}</h4>
                        <p className="text-sm text-gray-500">
                          {task.patientName} • Room {task.patientRoom}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{task.dueTime}</span>
                      </div>
                      <span>✓ Done</span>
                    </div>
                    <div className="mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateProgress(task.id, 0)}
                        className="w-full rounded-lg"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reopen
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <Card key={task.id} className="border border-gray-200 hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <button onClick={() => toggleTaskComplete(task.id)} className="flex-shrink-0">
                          {task.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <Circle className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>

                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-lg">{getCategoryIcon(task.category)}</span>
                            <h3
                              className={`font-semibold ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}
                            >
                              {task.description}
                            </h3>
                            <Badge className={`${getPriorityColor(task.priority)} text-xs px-2 py-1`}>
                              {task.priority.toUpperCase()}
                            </Badge>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>
                                {task.patientName} - Room {task.patientRoom}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>
                                Due: {task.dueTime} ({task.estimatedTime} min)
                              </span>
                            </div>
                          </div>

                          {task.progress > 0 && task.progress < 100 && (
                            <div className="mt-2">
                              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                <span>Progress</span>
                                <span>{task.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${task.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {!task.completed && task.progress === 0 && (
                          <Button
                            size="sm"
                            onClick={() => updateProgress(task.id, 50)}
                            className="bg-indigo-600 hover:bg-indigo-700"
                          >
                            <Play className="h-4 w-4 mr-1" />
                            Start
                          </Button>
                        )}
                        {task.progress > 0 && task.progress < 100 && (
                          <Button
                            size="sm"
                            onClick={() => updateProgress(task.id, 100)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Complete
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Task Modal - Keep existing modal code */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md bg-white rounded-2xl border-0 shadow-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-gray-800">Add New Task</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowAddTask(false)} className="rounded-full">
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
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Room"
                    value={newTask.patientRoom}
                    onChange={(e) => setNewTask({ ...newTask, patientRoom: e.target.value })}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <input
                  type="text"
                  placeholder="Task Description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                  </select>

                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value as any })}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="medication">Medication</option>
                    <option value="vitals">Vitals</option>
                    <option value="care">Patient Care</option>
                    <option value="documentation">Documentation</option>
                    <option value="rounds">Rounds</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="time"
                    value={newTask.dueTime}
                    onChange={(e) => setNewTask({ ...newTask, dueTime: e.target.value })}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Est. Time (min)"
                    value={newTask.estimatedTime}
                    onChange={(e) => setNewTask({ ...newTask, estimatedTime: Number.parseInt(e.target.value) })}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    min="5"
                    max="120"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Add Task
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
