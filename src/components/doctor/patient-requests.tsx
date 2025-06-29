"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { useState } from "react"

const initialRequests = [
  { id: 1, patient: "Alice Brown", reason: "Follow-up consultation" },
  { id: 2, patient: "Charlie Davis", reason: "New patient appointment" },
]

export function PatientRequests() {
  const [requests, setRequests] = useState(initialRequests)
  const [processingId, setProcessingId] = useState<number | null>(null)

  const handleApprove = async (requestId: number, patientName: string) => {
    setProcessingId(requestId)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setRequests(requests.filter((req) => req.id !== requestId))
      toast({
        title: "Request Approved",
        description: `Appointment request for ${patientName} has been approved.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setProcessingId(null)
    }
  }

  const handleReject = async (requestId: number, patientName: string) => {
    setProcessingId(requestId)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setRequests(requests.filter((req) => req.id !== requestId))
      toast({
        title: "Request Rejected",
        description: `Appointment request for ${patientName} has been rejected.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setProcessingId(null)
    }
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-6">
          <p className="text-slate-600">No pending patient requests</p>
        </div>
      </div>
    )
  }

  return (
    <ul className="space-y-4">
      {requests.map((request) => (
        <li
          key={request.id}
          className="flex items-center justify-between p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 hover:shadow-sm transition-all duration-200"
        >
          <div>
            <p className="font-medium text-slate-700">{request.patient}</p>
            <p className="text-sm text-slate-500">{request.reason}</p>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={() => handleApprove(request.id, request.patient)}
              disabled={processingId === request.id}
              size="sm"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-sm disabled:opacity-50"
            >
              {processingId === request.id ? (
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing</span>
                </div>
              ) : (
                "Approve"
              )}
            </Button>
            <Button
              onClick={() => handleReject(request.id, request.patient)}
              disabled={processingId === request.id}
              variant="outline"
              size="sm"
              className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent disabled:opacity-50"
            >
              Reject
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}
