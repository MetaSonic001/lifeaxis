"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Play, Pause, RotateCcw, CheckCircle, Plus, Edit3, Volume2, VolumeX, Heart, Brain } from "lucide-react"

const defaultExercises = [
  {
    id: 1,
    title: "Deep Breathing",
    description: "Focus on slow, deep breaths to reduce stress",
    duration: 300,
    category: "Breathing",
    difficulty: "Beginner",
    instructions: [
      "Sit comfortably with your back straight",
      "Close your eyes or soften your gaze",
      "Breathe in slowly through your nose for 4 counts",
      "Hold your breath for 4 counts",
      "Exhale slowly through your mouth for 6 counts",
      "Repeat this cycle and focus on the rhythm",
    ],
  },
  {
    id: 2,
    title: "Body Scan",
    description: "Progressive relaxation from head to toe",
    duration: 600,
    category: "Relaxation",
    difficulty: "Intermediate",
    instructions: [
      "Lie down or sit comfortably",
      "Close your eyes and take three deep breaths",
      "Start by focusing on the top of your head",
      "Notice any tension or sensations without judgment",
      "Slowly move your attention down through your body",
      "Relax each part as you go, releasing any tension",
    ],
  },
  {
    id: 3,
    title: "Mindful Observation",
    description: "Focus on your surroundings to stay present",
    duration: 180,
    category: "Awareness",
    difficulty: "Beginner",
    instructions: [
      "Find a comfortable position",
      "Look around and notice 5 things you can see",
      "Listen for 4 things you can hear",
      "Feel 3 things you can touch",
      "Notice 2 things you can smell",
      "Identify 1 thing you can taste",
    ],
  },
  {
    id: 4,
    title: "Loving Kindness",
    description: "Cultivate compassion for yourself and others",
    duration: 480,
    category: "Compassion",
    difficulty: "Intermediate",
    instructions: [
      "Sit comfortably and close your eyes",
      "Begin by sending love to yourself",
      "Repeat: 'May I be happy, may I be healthy'",
      "Extend these wishes to a loved one",
      "Include a neutral person in your thoughts",
      "Finally, send love to someone difficult",
    ],
  },
]

interface Exercise {
  id: number
  title: string
  description: string
  duration: number
  category: string
  difficulty: string
  instructions: string[]
}

interface SessionStats {
  totalSessions: number
  totalMinutes: number
  currentStreak: number
  favoriteExercise: string
}

export default function MindfulMinutesPage() {
  const [exercises, setExercises] = useState<Exercise[]>(defaultExercises)
  const [selectedExercise, setSelectedExercise] = useState(exercises[0])
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(selectedExercise.duration)
  const [currentStep, setCurrentStep] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const [customDuration, setCustomDuration] = useState(selectedExercise.duration)
  const [sessionStats, setSessionStats] = useState<SessionStats>({
    totalSessions: 0,
    totalMinutes: 0,
    currentStreak: 0,
    favoriteExercise: "Deep Breathing",
  })
  const [showCustomExercise, setShowCustomExercise] = useState(false)
  const [newExercise, setNewExercise] = useState({
    title: "",
    description: "",
    duration: 300,
    category: "Custom",
    difficulty: "Beginner",
    instructions: [""],
  })

  // Load data from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem("mindful-stats")
    const savedExercises = localStorage.getItem("mindful-exercises")

    if (savedStats) {
      setSessionStats(JSON.parse(savedStats))
    }

    if (savedExercises) {
      const customExercises = JSON.parse(savedExercises)
      setExercises([...defaultExercises, ...customExercises])
    }
  }, [])

  // Save stats to localStorage
  useEffect(() => {
    localStorage.setItem("mindful-stats", JSON.stringify(sessionStats))
  }, [sessionStats])

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => {
          if (timeLeft <= 1) {
            setIsActive(false)
            setIsCompleted(true)
            handleSessionComplete()
            return 0
          }
          return timeLeft - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  // Auto-advance steps during active session
  useEffect(() => {
    if (isActive && selectedExercise.instructions.length > 1) {
      const stepDuration = selectedExercise.duration / selectedExercise.instructions.length
      const elapsed = selectedExercise.duration - timeLeft
      const newStep = Math.floor(elapsed / stepDuration)

      if (newStep !== currentStep && newStep < selectedExercise.instructions.length) {
        setCurrentStep(newStep)
      }
    }
  }, [isActive, timeLeft, selectedExercise, currentStep])

  const handleSessionComplete = useCallback(() => {
    const sessionMinutes = Math.ceil(selectedExercise.duration / 60)
    setSessionStats((prev) => ({
      ...prev,
      totalSessions: prev.totalSessions + 1,
      totalMinutes: prev.totalMinutes + sessionMinutes,
      currentStreak: prev.currentStreak + 1,
      favoriteExercise: selectedExercise.title,
    }))
  }, [selectedExercise])

  const handleStart = () => {
    setIsActive(true)
    setIsCompleted(false)
    setCurrentStep(0)
  }

  const handlePause = () => {
    setIsActive(false)
  }

  const handleReset = () => {
    setIsActive(false)
    setTimeLeft(customDuration)
    setCurrentStep(0)
    setIsCompleted(false)
  }

  const handleExerciseChange = (exercise: Exercise) => {
    setSelectedExercise(exercise)
    setCustomDuration(exercise.duration)
    setTimeLeft(exercise.duration)
    setIsActive(false)
    setCurrentStep(0)
    setIsCompleted(false)
  }

  const handleDurationChange = (newDuration: number) => {
    setCustomDuration(newDuration)
    if (!isActive) {
      setTimeLeft(newDuration)
    }
  }

  const addCustomExercise = () => {
    if (newExercise.title && newExercise.instructions[0]) {
      const customExercise: Exercise = {
        ...newExercise,
        id: Date.now(),
        instructions: newExercise.instructions.filter((inst) => inst.trim() !== ""),
      }

      const updatedExercises = [...exercises, customExercise]
      setExercises(updatedExercises)

      // Save custom exercises
      const customExercises = updatedExercises.filter((ex) => !defaultExercises.find((def) => def.id === ex.id))
      localStorage.setItem("mindful-exercises", JSON.stringify(customExercises))

      // Reset form
      setNewExercise({
        title: "",
        description: "",
        duration: 300,
        category: "Custom",
        difficulty: "Beginner",
        instructions: [""],
      })
      setShowCustomExercise(false)
    }
  }

  const addInstructionStep = () => {
    setNewExercise((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }))
  }

  const updateInstructionStep = (index: number, value: string) => {
    setNewExercise((prev) => ({
      ...prev,
      instructions: prev.instructions.map((inst, i) => (i === index ? value : inst)),
    }))
  }

  const removeInstructionStep = (index: number) => {
    if (newExercise.instructions.length > 1) {
      setNewExercise((prev) => ({
        ...prev,
        instructions: prev.instructions.filter((_, i) => i !== index),
      }))
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progress = ((customDuration - timeLeft) / customDuration) * 100
  const categories = [...new Set(exercises.map((ex) => ex.category))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            <Brain className="w-4 h-4 mr-2" />
            Mindfulness & Meditation
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Mindful <span className="text-blue-600">Minutes</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Take a few minutes to center yourself with guided mindfulness exercises and meditation practices.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
          <Card className="text-center hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-4 sm:pt-6">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">{sessionStats.totalSessions}</div>
              <div className="text-xs sm:text-sm text-gray-600">Sessions</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-4 sm:pt-6">
              <div className="text-xl sm:text-2xl font-bold text-green-600">{sessionStats.totalMinutes}</div>
              <div className="text-xs sm:text-sm text-gray-600">Minutes</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-4 sm:pt-6">
              <div className="text-xl sm:text-2xl font-bold text-purple-600">{sessionStats.currentStreak}</div>
              <div className="text-xs sm:text-sm text-gray-600">Day Streak</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-4 sm:pt-6">
              <Heart className="w-6 h-6 text-red-500 mx-auto mb-1" />
              <div className="text-xs sm:text-sm text-gray-600">Favorite</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Exercise Selection */}
          <div className="lg:col-span-4">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold">Choose Exercise</h2>
              <Dialog open={showCustomExercise} onOpenChange={setShowCustomExercise}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Add Custom</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create Custom Exercise</DialogTitle>
                    <DialogDescription>
                      Design your own mindfulness exercise with custom instructions and duration.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={newExercise.title}
                          onChange={(e) => setNewExercise((prev) => ({ ...prev, title: e.target.value }))}
                          placeholder="Exercise name"
                        />
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Input
                          value={newExercise.category}
                          onChange={(e) => setNewExercise((prev) => ({ ...prev, category: e.target.value }))}
                          placeholder="e.g., Breathing, Relaxation"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Description</Label>
                      <Input
                        value={newExercise.description}
                        onChange={(e) => setNewExercise((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Brief description of the exercise"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label>Duration (minutes)</Label>
                        <Slider
                          value={[newExercise.duration / 60]}
                          onValueChange={([value]) => setNewExercise((prev) => ({ ...prev, duration: value * 60 }))}
                          max={30}
                          min={1}
                          step={1}
                          className="mt-2"
                        />
                        <div className="text-sm text-gray-500 mt-1">{newExercise.duration / 60} minutes</div>
                      </div>
                      <div>
                        <Label>Difficulty</Label>
                        <select
                          value={newExercise.difficulty}
                          onChange={(e) => setNewExercise((prev) => ({ ...prev, difficulty: e.target.value }))}
                          className="w-full mt-2 p-2 border rounded-md"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Instructions</Label>
                        <Button type="button" variant="outline" size="sm" onClick={addInstructionStep}>
                          <Plus className="w-4 h-4 mr-1" />
                          Add Step
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {newExercise.instructions.map((instruction, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={instruction}
                              onChange={(e) => updateInstructionStep(index, e.target.value)}
                              placeholder={`Step ${index + 1}`}
                            />
                            {newExercise.instructions.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeInstructionStep(index)}
                              >
                                ×
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button onClick={addCustomExercise} className="flex-1">
                        Create Exercise
                      </Button>
                      <Button variant="outline" onClick={() => setShowCustomExercise(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Tabs defaultValue="all" className="mb-4">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3">
                <TabsTrigger value="all" className="text-xs sm:text-sm">
                  All
                </TabsTrigger>
                <TabsTrigger value="beginner" className="text-xs sm:text-sm">
                  Beginner
                </TabsTrigger>
                <TabsTrigger value="favorites" className="text-xs sm:text-sm">
                  Favorites
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-3 sm:space-y-4">
                {exercises.map((exercise) => (
                  <Card
                    key={exercise.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      selectedExercise.id === exercise.id
                        ? "ring-2 ring-blue-500 bg-blue-50 shadow-lg"
                        : "hover:shadow-md"
                    }`}
                    onClick={() => handleExerciseChange(exercise)}
                  >
                    <CardHeader className="pb-2 sm:pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-base sm:text-lg">{exercise.title}</CardTitle>
                          <CardDescription className="text-sm mt-1">{exercise.description}</CardDescription>
                        </div>
                        <div className="flex flex-col items-end gap-1 ml-2">
                          <Badge variant="secondary" className="text-xs">
                            {exercise.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {Math.floor(exercise.duration / 60)}m
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            exercise.difficulty === "Beginner"
                              ? "text-green-600"
                              : exercise.difficulty === "Intermediate"
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {exercise.difficulty}
                        </Badge>
                        <div className="text-xs text-gray-500">{exercise.instructions.length} steps</div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="beginner" className="space-y-3 sm:space-y-4">
                {exercises
                  .filter((ex) => ex.difficulty === "Beginner")
                  .map((exercise) => (
                    <Card
                      key={exercise.id}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                        selectedExercise.id === exercise.id
                          ? "ring-2 ring-blue-500 bg-blue-50 shadow-lg"
                          : "hover:shadow-md"
                      }`}
                      onClick={() => handleExerciseChange(exercise)}
                    >
                      <CardHeader className="pb-2 sm:pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-base sm:text-lg">{exercise.title}</CardTitle>
                            <CardDescription className="text-sm mt-1">{exercise.description}</CardDescription>
                          </div>
                          <Badge variant="secondary" className="text-xs ml-2">
                            {Math.floor(exercise.duration / 60)}m
                          </Badge>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="favorites" className="space-y-3 sm:space-y-4">
                <div className="text-center py-8 text-gray-500">
                  <Heart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Complete sessions to build your favorites list</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Main Exercise Area */}
          <div className="lg:col-span-8">
            <Card className="mb-6 shadow-xl">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl sm:text-2xl">{selectedExercise.title}</CardTitle>
                    <CardDescription className="text-base">{selectedExercise.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800">{selectedExercise.category}</Badge>
                    <Badge variant="outline">{selectedExercise.difficulty}</Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {/* Duration Customization */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <Label className="text-sm font-medium">Session Duration</Label>
                      <p className="text-xs text-gray-600">Customize the length of your session</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[customDuration / 60]}
                        onValueChange={([value]) => handleDurationChange(value * 60)}
                        max={30}
                        min={1}
                        step={1}
                        className="w-24 sm:w-32"
                        disabled={isActive}
                      />
                      <span className="text-sm font-medium min-w-[60px]">{Math.floor(customDuration / 60)}m</span>
                    </div>
                  </div>
                </div>

                {/* Timer Display */}
                <div className="text-center mb-8">
                  <div className="relative inline-block">
                    <div className="text-4xl sm:text-6xl lg:text-7xl font-mono font-bold text-blue-600 mb-4">
                      {formatTime(timeLeft)}
                    </div>
                    <div className="absolute -inset-4 bg-blue-50 rounded-full -z-10 opacity-50"></div>
                  </div>
                  <Progress value={progress} className="w-full h-3 mb-6" />

                  {/* Control Buttons */}
                  <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6">
                    {!isActive ? (
                      <Button onClick={handleStart} size="lg" className="px-6 sm:px-8">
                        <Play className="w-5 h-5 mr-2" />
                        {timeLeft === customDuration ? "Start Session" : "Resume"}
                      </Button>
                    ) : (
                      <Button onClick={handlePause} size="lg" variant="outline" className="px-6 sm:px-8 bg-transparent">
                        <Pause className="w-5 h-5 mr-2" />
                        Pause
                      </Button>
                    )}
                    <Button onClick={handleReset} size="lg" variant="outline" className="px-6 sm:px-8 bg-transparent">
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Reset
                    </Button>
                    <Button variant="outline" size="lg" className="px-4 bg-transparent">
                      {isMuted ? (
                        <VolumeX className="w-5 h-5" onClick={() => setIsMuted(false)} />
                      ) : (
                        <Volume2 className="w-5 h-5" onClick={() => setIsMuted(true)} />
                      )}
                    </Button>
                  </div>

                  {/* Volume Control */}
                  {!isMuted && (
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <Volume2 className="w-4 h-4 text-gray-500" />
                      <Slider
                        value={[volume]}
                        onValueChange={([value]) => setVolume(value)}
                        max={100}
                        min={0}
                        step={1}
                        className="w-24 sm:w-32"
                      />
                      <span className="text-sm text-gray-500 min-w-[30px]">{volume}%</span>
                    </div>
                  )}
                </div>

                {/* Completion Message */}
                {isCompleted && (
                  <div className="text-center mb-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">Session Complete!</h3>
                    <p className="text-green-700 mb-4">
                      Wonderful! You've completed a {Math.floor(customDuration / 60)}-minute mindfulness session.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button onClick={() => handleExerciseChange(selectedExercise)} variant="outline">
                        Practice Again
                      </Button>
                      <Button onClick={() => setIsCompleted(false)}>Try Another Exercise</Button>
                    </div>
                  </div>
                )}

                {/* Instructions */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
                    <Edit3 className="w-5 h-5 mr-2" />
                    Guided Instructions
                  </h3>
                  <div className="space-y-3">
                    {selectedExercise.instructions.map((instruction, index) => (
                      <div
                        key={index}
                        className={`flex items-start space-x-3 p-4 rounded-xl transition-all duration-500 ${
                          isActive && index === currentStep
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 shadow-md transform scale-105"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <span
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                            isActive && index === currentStep
                              ? "bg-blue-500 text-white shadow-lg"
                              : "bg-white text-gray-600 border-2 border-gray-200"
                          }`}
                        >
                          {index + 1}
                        </span>
                        <p
                          className={`text-gray-700 leading-relaxed ${
                            isActive && index === currentStep ? "font-medium" : ""
                          }`}
                        >
                          {instruction}
                        </p>
                        {isActive && index === currentStep && (
                          <div className="flex-shrink-0">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
