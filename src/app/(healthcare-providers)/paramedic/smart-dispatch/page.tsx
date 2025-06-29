"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Clock, MapPin, Users, CheckCircle, AlertCircle, RefreshCw, Plus } from "lucide-react"

type EmergencyCall = {
  id: number
  location: string
  description: string
  priority: "Low" | "Medium" | "High"
  status: "Pending" | "Dispatched" | "Resolved"
  assignedTeam?: string
  timestamp: string
}

export default function SmartDispatchSystem() {
  const [calls, setCalls] = useState<EmergencyCall[]>([
    {
      id: 1,
      location: "123 Main St",
      description: "Chest pain, 65-year-old male",
      priority: "High",
      status: "Pending",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      location: "456 Elm St",
      description: "Minor injury from fall",
      priority: "Low",
      status: "Pending",
      timestamp: "10:45 AM",
    },
    {
      id: 3,
      location: "789 Oak Ave",
      description: "Difficulty breathing",
      priority: "Medium",
      status: "Dispatched",
      assignedTeam: "Team A",
      timestamp: "11:00 AM",
    },
  ])

  const [teams] = useState(["Team A", "Team B", "Team C", "Team D"])
  const [selectedTeams, setSelectedTeams] = useState<{ [key: number]: string }>({})

  useEffect(() => {
    // In a real application, you would fetch emergency calls data here
    console.log("Smart Dispatch System loaded")
  }, [])

  const handleDispatch = (id: number, team: string) => {
    if (!team) {
      alert("Please select a team to dispatch")
      return
    }

    setCalls((prevCalls) =>
      prevCalls.map((call) => (call.id === id ? { ...call, status: "Dispatched" as const, assignedTeam: team } : call)),
    )

    // Clear the selected team for this call
    setSelectedTeams((prev) => {
      const newState = { ...prev }
      delete newState[id]
      return newState
    })

    console.log(`Dispatched call ${id} to ${team}`)
    alert(`Successfully dispatched emergency call to ${team}`)
  }

  const handleResolve = (id: number) => {
    setCalls((prevCalls) => prevCalls.map((call) => (call.id === id ? { ...call, status: "Resolved" as const } : call)))
    console.log(`Resolved call ${id}`)
    alert(`Emergency call #${id} has been marked as resolved`)
  }

  const handleTeamSelection = (callId: number, team: string) => {
    setSelectedTeams((prev) => ({
      ...prev,
      [callId]: team,
    }))
  }

  const handleRefresh = () => {
    console.log("Refreshing emergency calls...")
    alert("Emergency calls refreshed")
    // In a real app, this would fetch new data
  }

  const handleAddNewCall = () => {
    const newCall: EmergencyCall = {
      id: Math.max(...calls.map((c) => c.id)) + 1,
      location: "New Emergency Location",
      description: "New emergency call",
      priority: "Medium",
      status: "Pending",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setCalls((prev) => [newCall, ...prev])
    alert("New emergency call added")
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-gradient-to-r from-red-100 to-pink-100 border-red-200"
      case "Medium":
        return "bg-gradient-to-r from-amber-100 to-yellow-100 border-amber-200"
      case "Low":
        return "bg-gradient-to-r from-green-100 to-emerald-100 border-green-200"
      default:
        return "bg-white"
    }
  }

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500 hover:bg-red-600"
      case "Medium":
        return "bg-amber-500 hover:bg-amber-600"
      case "Low":
        return "bg-green-500 hover:bg-green-600"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-4 h-4" />
      case "Dispatched":
        return <AlertCircle className="w-4 h-4" />
      case "Resolved":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const pendingCalls = calls.filter((call) => call.status === "Pending").length
  const dispatchedCalls = calls.filter((call) => call.status === "Dispatched").length
  const resolvedCalls = calls.filter((call) => call.status === "Resolved").length

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Smart Dispatch System
          </h1>
          <p className="text-slate-600 mt-2">Manage emergency calls and coordinate response teams</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={handleRefresh} variant="outline" className="bg-white hover:bg-blue-50 border-blue-200">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button
            onClick={handleAddNewCall}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Call
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Pending Calls</CardTitle>
            <Clock className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">{pendingCalls}</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-700">Dispatched</CardTitle>
            <AlertCircle className="h-5 w-5 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-700">{dispatchedCalls}</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Resolved</CardTitle>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">{resolvedCalls}</div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Calls */}
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-blue-600" />
            <span>Emergency Calls</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {calls.map((call) => (
              <Card
                key={call.id}
                className={`border ${getPriorityColor(call.priority)} shadow-sm hover:shadow-md transition-all duration-200`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-3">
                        <Badge className={`${getPriorityBadgeColor(call.priority)} text-white`}>
                          {call.priority} Priority
                        </Badge>
                        <Badge variant="outline" className="flex items-center space-x-1">
                          {getStatusIcon(call.status)}
                          <span>{call.status}</span>
                        </Badge>
                        <span className="text-sm text-slate-500">{call.timestamp}</span>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="flex items-center space-x-2 text-slate-600">
                          <MapPin className="w-4 h-4" />
                          <span className="font-medium">{call.location}</span>
                        </div>
                      </div>

                      <p className="text-slate-700">{call.description}</p>

                      {call.assignedTeam && (
                        <div className="flex items-center space-x-2 text-blue-600">
                          <Users className="w-4 h-4" />
                          <span className="font-medium">Assigned to: {call.assignedTeam}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      {call.status === "Pending" && (
                        <div className="flex space-x-2">
                          <Select
                            value={selectedTeams[call.id] || ""}
                            onValueChange={(team) => handleTeamSelection(call.id, team)}
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue placeholder="Select Team" />
                            </SelectTrigger>
                            <SelectContent>
                              {teams.map((team) => (
                                <SelectItem key={team} value={team}>
                                  {team}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            onClick={() => handleDispatch(call.id, selectedTeams[call.id])}
                            disabled={!selectedTeams[call.id]}
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Dispatch
                          </Button>
                        </div>
                      )}

                      {call.status === "Dispatched" && (
                        <Button
                          onClick={() => handleResolve(call.id)}
                          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark Resolved
                        </Button>
                      )}

                      {call.status === "Resolved" && (
                        <Badge className="bg-green-100 text-green-800 border-green-200">✓ Completed</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
