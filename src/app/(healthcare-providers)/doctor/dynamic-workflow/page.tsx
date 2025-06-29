"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Play, Pause, Clock, CheckCircle, AlertCircle, Save } from "lucide-react"

type WorkflowStep = {
  id: number
  title: string
  description: string
  duration: number
  status: "pending" | "active" | "completed" | "skipped"
  required: boolean
}

type WorkflowType = {
  id: number
  name: string
  description: string
  category: string
  steps: WorkflowStep[]
  status: "draft" | "active" | "completed" | "paused"
  progress: number
  estimatedTime: number
  actualTime: number
}

const mockWorkflows: WorkflowType[] = [
  {
    id: 1,
    name: "Patient Admission Process",
    description: "Complete workflow for admitting new patients",
    category: "Patient Care",
    status: "active",
    progress: 60,
    estimatedTime: 45,
    actualTime: 27,
    steps: [
      {
        id: 1,
        title: "Patient Registration",
        description: "Register patient details and insurance",
        duration: 10,
        status: "completed",
        required: true,
      },
      {
        id: 2,
        title: "Medical History Review",
        description: "Review patient's medical history",
        duration: 15,
        status: "completed",
        required: true,
      },
      {
        id: 3,
        title: "Initial Assessment",
        description: "Conduct initial medical assessment",
        duration: 20,
        status: "active",
        required: true,
      },
      {
        id: 4,
        title: "Room Assignment",
        description: "Assign patient to appropriate room",
        duration: 5,
        status: "pending",
        required: true,
      },
      {
        id: 5,
        title: "Care Plan Creation",
        description: "Create initial care plan",
        duration: 15,
        status: "pending",
        required: false,
      },
    ],
  },
  {
    id: 2,
    name: "Surgery Preparation",
    description: "Pre-operative preparation workflow",
    category: "Surgery",
    status: "draft",
    progress: 0,
    estimatedTime: 120,
    actualTime: 0,
    steps: [
      {
        id: 1,
        title: "Pre-op Assessment",
        description: "Complete pre-operative assessment",
        duration: 30,
        status: "pending",
        required: true,
      },
      {
        id: 2,
        title: "Consent Forms",
        description: "Obtain surgical consent",
        duration: 15,
        status: "pending",
        required: true,
      },
      {
        id: 3,
        title: "Lab Results Review",
        description: "Review all lab results",
        duration: 20,
        status: "pending",
        required: true,
      },
      {
        id: 4,
        title: "Anesthesia Consultation",
        description: "Consult with anesthesiologist",
        duration: 25,
        status: "pending",
        required: true,
      },
      {
        id: 5,
        title: "Final Preparations",
        description: "Complete final pre-op preparations",
        duration: 30,
        status: "pending",
        required: true,
      },
    ],
  },
]

export default function DynamicWorkflowPage() {
  const [workflows, setWorkflows] = useState<WorkflowType[]>(mockWorkflows)
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowType | null>(workflows[0])
  const [isCreatingWorkflow, setIsCreatingWorkflow] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isExecuting, setIsExecuting] = useState(false)

  const [newWorkflow, setNewWorkflow] = useState({
    name: "",
    description: "",
    category: "",
    steps: [] as Omit<WorkflowStep, "id" | "status">[],
  })

  const [newStep, setNewStep] = useState({
    title: "",
    description: "",
    duration: "",
    required: true,
  })

  const handleCreateWorkflow = async () => {
    if (!newWorkflow.name || !newWorkflow.description || newWorkflow.steps.length === 0) {
      alert("Please fill in all required fields and add at least one step")
      return
    }

    setIsCreatingWorkflow(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const workflow: WorkflowType = {
        id: workflows.length + 1,
        name: newWorkflow.name,
        description: newWorkflow.description,
        category: newWorkflow.category || "General",
        status: "draft",
        progress: 0,
        estimatedTime: newWorkflow.steps.reduce((sum, step) => sum + Number.parseInt(step.duration.toString()), 0),
        actualTime: 0,
        steps: newWorkflow.steps.map((step, index) => ({
          id: index + 1,
          title: step.title,
          description: step.description,
          duration: Number.parseInt(step.duration.toString()),
          status: "pending" as const,
          required: step.required,
        })),
      }

      const updatedWorkflows = [...workflows, workflow]
      setWorkflows(updatedWorkflows)
      setSelectedWorkflow(workflow)

      setNewWorkflow({ name: "", description: "", category: "", steps: [] })
      console.log("Workflow created successfully")
      alert("Workflow created successfully!")
    } catch (error) {
      console.error("Error creating workflow:", error)
      alert("Error creating workflow. Please try again.")
    } finally {
      setIsCreatingWorkflow(false)
    }
  }

  const handleAddStep = () => {
    if (!newStep.title || !newStep.description || !newStep.duration) {
      alert("Please fill in all step fields")
      return
    }

    const step = {
      title: newStep.title,
      description: newStep.description,
      duration: Number.parseInt(newStep.duration),
      required: newStep.required,
    }

    setNewWorkflow((prev) => ({
      ...prev,
      steps: [...prev.steps, step],
    }))

    setNewStep({ title: "", description: "", duration: "", required: true })
  }

  const handleStartWorkflow = async (workflowId: number) => {
    setIsExecuting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setWorkflows((prev) => prev.map((w) => (w.id === workflowId ? { ...w, status: "active" as const } : w)))

      console.log("Workflow started successfully")
    } catch (error) {
      console.error("Error starting workflow:", error)
    } finally {
      setIsExecuting(false)
    }
  }

  const handlePauseWorkflow = async (workflowId: number) => {
    setIsExecuting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setWorkflows((prev) => prev.map((w) => (w.id === workflowId ? { ...w, status: "paused" as const } : w)))

      console.log("Workflow paused")
    } catch (error) {
      console.error("Error pausing workflow:", error)
    } finally {
      setIsExecuting(false)
    }
  }

  const handleCompleteStep = async (workflowId: number, stepId: number) => {
    setIsExecuting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setWorkflows((prev) =>
        prev.map((w) => {
          if (w.id === workflowId) {
            const updatedSteps = w.steps.map((s) => (s.id === stepId ? { ...s, status: "completed" as const } : s))
            const completedSteps = updatedSteps.filter((s) => s.status === "completed").length
            const progress = Math.round((completedSteps / updatedSteps.length) * 100)

            return { ...w, steps: updatedSteps, progress }
          }
          return w
        }),
      )

      if (selectedWorkflow?.id === workflowId) {
        setSelectedWorkflow((prev) => {
          if (!prev) return null
          const updatedSteps = prev.steps.map((s) => (s.id === stepId ? { ...s, status: "completed" as const } : s))
          const completedSteps = updatedSteps.filter((s) => s.status === "completed").length
          const progress = Math.round((completedSteps / updatedSteps.length) * 100)

          return { ...prev, steps: updatedSteps, progress }
        })
      }

      console.log("Step completed successfully")
    } catch (error) {
      console.error("Error completing step:", error)
    } finally {
      setIsExecuting(false)
    }
  }

  const handleSaveWorkflow = async () => {
    if (!selectedWorkflow) return

    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Workflow saved successfully")
      alert("Workflow saved successfully!")
    } catch (error) {
      console.error("Error saving workflow:", error)
      alert("Error saving workflow. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200"
      case "active":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "paused":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "draft":
        return "bg-gray-100 text-gray-700 border-gray-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "active":
        return <Play className="w-4 h-4 text-blue-600" />
      case "pending":
        return <Clock className="w-4 h-4 text-slate-400" />
      default:
        return <AlertCircle className="w-4 h-4 text-slate-400" />
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Dynamic Workflows
          </h1>
          <p className="text-slate-600">Create and manage automated healthcare workflows</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={handleSaveWorkflow}
            disabled={isSaving || !selectedWorkflow}
            className="border-slate-200 hover:bg-slate-50 bg-transparent"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Workflow
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Workflow</DialogTitle>
                <DialogDescription>Design a custom workflow for your healthcare processes</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="workflowName" className="text-slate-700 font-medium">
                      Workflow Name *
                    </Label>
                    <Input
                      id="workflowName"
                      value={newWorkflow.name}
                      onChange={(e) => setNewWorkflow((prev) => ({ ...prev, name: e.target.value }))}
                      className="mt-1 border-slate-200 focus:border-indigo-400"
                      placeholder="Enter workflow name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="workflowCategory" className="text-slate-700 font-medium">
                      Category
                    </Label>
                    <Select
                      value={newWorkflow.category}
                      onValueChange={(value) => setNewWorkflow((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="mt-1 border-slate-200 focus:border-indigo-400">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Patient Care">Patient Care</SelectItem>
                        <SelectItem value="Surgery">Surgery</SelectItem>
                        <SelectItem value="Emergency">Emergency</SelectItem>
                        <SelectItem value="Diagnostics">Diagnostics</SelectItem>
                        <SelectItem value="Administration">Administration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="workflowDescription" className="text-slate-700 font-medium">
                    Description *
                  </Label>
                  <Textarea
                    id="workflowDescription"
                    value={newWorkflow.description}
                    onChange={(e) => setNewWorkflow((prev) => ({ ...prev, description: e.target.value }))}
                    className="mt-1 border-slate-200 focus:border-indigo-400 resize-none"
                    rows={3}
                    placeholder="Describe the workflow purpose and process"
                  />
                </div>

                <div>
                  <Label className="text-slate-700 font-medium">Workflow Steps</Label>
                  <div className="mt-2 space-y-4">
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <Input
                          placeholder="Step title"
                          value={newStep.title}
                          onChange={(e) => setNewStep((prev) => ({ ...prev, title: e.target.value }))}
                          className="border-slate-200 focus:border-indigo-400"
                        />
                      </div>
                      <div>
                        <Input
                          type="number"
                          placeholder="Duration (minutes)"
                          value={newStep.duration}
                          onChange={(e) => setNewStep((prev) => ({ ...prev, duration: e.target.value }))}
                          className="border-slate-200 focus:border-indigo-400"
                        />
                      </div>
                    </div>
                    <Textarea
                      placeholder="Step description"
                      value={newStep.description}
                      onChange={(e) => setNewStep((prev) => ({ ...prev, description: e.target.value }))}
                      className="border-slate-200 focus:border-indigo-400 resize-none"
                      rows={2}
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="stepRequired"
                          checked={newStep.required}
                          onChange={(e) => setNewStep((prev) => ({ ...prev, required: e.target.checked }))}
                          className="rounded border-slate-300"
                        />
                        <Label htmlFor="stepRequired" className="text-sm text-slate-600">
                          Required step
                        </Label>
                      </div>
                      <Button
                        type="button"
                        onClick={handleAddStep}
                        size="sm"
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                      >
                        Add Step
                      </Button>
                    </div>
                  </div>

                  {newWorkflow.steps.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h4 className="font-medium text-slate-700">Added Steps:</h4>
                      {newWorkflow.steps.map((step, index) => (
                        <div key={index} className="bg-slate-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium text-slate-700">{step.title}</h5>
                              <p className="text-sm text-slate-600">{step.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-slate-600">{step.duration} min</div>
                              {step.required && (
                                <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">Required</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleCreateWorkflow}
                  disabled={isCreatingWorkflow}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                >
                  {isCreatingWorkflow ? "Creating Workflow..." : "Create Workflow"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Workflow List */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-t-lg">
            <CardTitle className="text-slate-700 flex items-center space-x-2">
              {/* Workflow icon */}
              <span>Workflows</span>
            </CardTitle>
            <CardDescription className="text-slate-600">{workflows.length} workflows available</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {workflows.map((workflow) => (
                <div
                  key={workflow.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedWorkflow?.id === workflow.id
                      ? "border-indigo-200 bg-indigo-50"
                      : "border-slate-200 hover:border-indigo-200 hover:bg-slate-50"
                  }`}
                  onClick={() => setSelectedWorkflow(workflow)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-700">{workflow.name}</h4>
                    <Badge className={getStatusColor(workflow.status)}>{workflow.status}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{workflow.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">{workflow.category}</span>
                    <span className="text-slate-500">{workflow.progress}% complete</span>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${workflow.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Workflow Details */}
        <div className="lg:col-span-2">
          {selectedWorkflow ? (
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-100 data-[state=active]:to-purple-100"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="steps"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-100 data-[state=active]:to-purple-100"
                >
                  Steps
                </TabsTrigger>
                <TabsTrigger
                  value="execution"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-100 data-[state=active]:to-purple-100"
                >
                  Execution
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-t-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-slate-700">{selectedWorkflow.name}</CardTitle>
                        <CardDescription className="text-slate-600">{selectedWorkflow.description}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(selectedWorkflow.status)}>{selectedWorkflow.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-slate-700 font-medium">Category</Label>
                          <p className="text-slate-600">{selectedWorkflow.category}</p>
                        </div>
                        <div>
                          <Label className="text-slate-700 font-medium">Total Steps</Label>
                          <p className="text-slate-600">{selectedWorkflow.steps.length} steps</p>
                        </div>
                        <div>
                          <Label className="text-slate-700 font-medium">Progress</Label>
                          <div className="mt-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-slate-600">Completed</span>
                              <span className="text-slate-700">{selectedWorkflow.progress}%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${selectedWorkflow.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-slate-700 font-medium">Estimated Time</Label>
                          <p className="text-slate-600">{selectedWorkflow.estimatedTime} minutes</p>
                        </div>
                        <div>
                          <Label className="text-slate-700 font-medium">Actual Time</Label>
                          <p className="text-slate-600">{selectedWorkflow.actualTime} minutes</p>
                        </div>
                        <div>
                          <Label className="text-slate-700 font-medium">Efficiency</Label>
                          <p className="text-slate-600">
                            {selectedWorkflow.actualTime > 0
                              ? `${Math.round((selectedWorkflow.estimatedTime / selectedWorkflow.actualTime) * 100)}%`
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="steps">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-t-lg">
                    <CardTitle className="text-slate-700">Workflow Steps</CardTitle>
                    <CardDescription className="text-slate-600">
                      {selectedWorkflow.steps.length} steps in this workflow
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {selectedWorkflow.steps.map((step, index) => (
                        <div key={step.id} className="bg-slate-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full border-2 border-slate-200">
                                <span className="text-sm font-medium text-slate-600">{index + 1}</span>
                              </div>
                              <div>
                                <h4 className="font-medium text-slate-700 flex items-center space-x-2">
                                  <span>{step.title}</span>
                                  {step.required && (
                                    <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">Required</Badge>
                                  )}
                                </h4>
                                <p className="text-sm text-slate-600">{step.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="text-right">
                                <div className="text-sm text-slate-600">{step.duration} min</div>
                                <div className="flex items-center space-x-1">
                                  {getStepStatusIcon(step.status)}
                                  <span className="text-xs text-slate-500 capitalize">{step.status}</span>
                                </div>
                              </div>
                              {step.status === "active" && (
                                <Button
                                  size="sm"
                                  onClick={() => handleCompleteStep(selectedWorkflow.id, step.id)}
                                  disabled={isExecuting}
                                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                                >
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Complete
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="execution">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-t-lg">
                    <CardTitle className="text-slate-700">Workflow Execution</CardTitle>
                    <CardDescription className="text-slate-600">
                      Control workflow execution and monitor progress
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-center space-x-4">
                        {selectedWorkflow.status === "draft" && (
                          <Button
                            onClick={() => handleStartWorkflow(selectedWorkflow.id)}
                            disabled={isExecuting}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            {isExecuting ? "Starting..." : "Start Workflow"}
                          </Button>
                        )}

                        {selectedWorkflow.status === "active" && (
                          <Button
                            onClick={() => handlePauseWorkflow(selectedWorkflow.id)}
                            disabled={isExecuting}
                            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8"
                          >
                            <Pause className="w-4 h-4 mr-2" />
                            {isExecuting ? "Pausing..." : "Pause Workflow"}
                          </Button>
                        )}

                        {selectedWorkflow.status === "paused" && (
                          <Button
                            onClick={() => handleStartWorkflow(selectedWorkflow.id)}
                            disabled={isExecuting}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            {isExecuting ? "Resuming..." : "Resume Workflow"}
                          </Button>
                        )}
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="bg-slate-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-slate-700 mb-1">
                            {selectedWorkflow.steps.filter((s) => s.status === "completed").length}
                          </div>
                          <div className="text-sm text-slate-600">Completed Steps</div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-slate-700 mb-1">
                            {selectedWorkflow.steps.filter((s) => s.status === "active").length}
                          </div>
                          <div className="text-sm text-slate-600">Active Steps</div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-slate-700 mb-1">
                            {selectedWorkflow.steps.filter((s) => s.status === "pending").length}
                          </div>
                          <div className="text-sm text-slate-600">Pending Steps</div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg">
                        <h4 className="font-medium text-slate-700 mb-4">Execution Timeline</h4>
                        <div className="space-y-3">
                          {selectedWorkflow.steps.map((step, index) => (
                            <div key={step.id} className="flex items-center space-x-4">
                              <div
                                className={`w-4 h-4 rounded-full ${
                                  step.status === "completed"
                                    ? "bg-green-500"
                                    : step.status === "active"
                                      ? "bg-blue-500"
                                      : "bg-slate-300"
                                }`}
                              ></div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span
                                    className={`text-sm ${
                                      step.status === "completed"
                                        ? "text-green-700"
                                        : step.status === "active"
                                          ? "text-blue-700"
                                          : "text-slate-600"
                                    }`}
                                  >
                                    {step.title}
                                  </span>
                                  <span className="text-xs text-slate-500">{step.duration} min</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    {/* Workflow icon */}
                  </div>
                  <p className="text-slate-600">Select a workflow to view details and manage execution.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
