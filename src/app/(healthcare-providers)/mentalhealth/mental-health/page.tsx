"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const mockBurnoutData = [
  { date: '2023-01-01', score: 30 },
  { date: '2023-02-01', score: 35 },
  { date: '2023-03-01', score: 40 },
  { date: '2023-04-01', score: 38 },
  { date: '2023-05-01', score: 42 },
  { date: '2023-06-01', score: 45 },
]

export default function MentalHealth() {
  const [stressLevel, setStressLevel] = useState(50)
  const [moodLevel, setMoodLevel] = useState(50)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Mental Health Support</h2>
      </div>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="burnout">Burnout Management</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
          <TabsTrigger value="journal">Reflection Journal</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Check-in</CardTitle>
              <CardDescription>How are you feeling today?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Stress Level</Label>
                <Slider
                  value={[stressLevel]}
                  onValueChange={(value) => setStressLevel(value[0])}
                  max={100}
                  step={1}
                />
                <Progress value={stressLevel} className="mt-2" />
              </div>
              <div>
                <Label className="text-sm font-medium">Mood</Label>
                <Slider
                  value={[moodLevel]}
                  onValueChange={(value) => setMoodLevel(value[0])}
                  max={100}
                  step={1}
                />
                <Progress value={moodLevel} className="mt-2" />
              </div>
              <Button>Save Check-in</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="burnout" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Burnout Risk Assessment</CardTitle>
              <CardDescription>Track your burnout risk over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockBurnoutData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
              <p className="mt-4 text-sm text-muted-foreground">
                Your current burnout risk score is 45. This is a moderate level of risk. Consider taking some time off or speaking with a mental health professional.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mental Health Resources</CardTitle>
              <CardDescription>Access helpful articles, videos, and support services</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add a list or grid of mental health resources */}
              <ul className="list-disc pl-5 space-y-2">
                <li>24/7 Mental Health Hotline: 1-800-123-4567</li>
                <li>Employee Assistance Program</li>
                <li>Mindfulness and Meditation Apps</li>
                <li>Local Support Groups</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="exercises" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mindfulness Exercises</CardTitle>
              <CardDescription>Practice mindfulness and relaxation techniques</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add a list of mindfulness exercises or embedded audio/video content */}
              <ul className="list-disc pl-5 space-y-2">
                <li>5-Minute Breathing Exercise</li>
                <li>Progressive Muscle Relaxation</li>
                <li>Guided Imagery Meditation</li>
                <li>Body Scan Technique</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="journal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reflection Journal</CardTitle>
              <CardDescription>Write about your thoughts and feelings</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Start writing your journal entry here..." className="min-h-[200px]" />
              <Button className="mt-4">Save Entry</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

