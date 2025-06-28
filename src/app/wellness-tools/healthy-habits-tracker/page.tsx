"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import {
  Droplets,
  Moon,
  Footprints,
  Apple,
  CalendarIcon,
  Plus,
  Minus,
  TrendingUp,
  Target,
  Award,
  Settings,
  Edit,
  BarChart3,
  Zap,
} from "lucide-react"
import { format, isToday, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns"

interface HabitEntry {
  id: string
  date: Date
  water: number
  sleep: number
  steps: number
  meals: number
  exercise: number
  customHabits: { [key: string]: number }
}

interface HabitGoals {
  water: number
  sleep: number
  steps: number
  meals: number
  exercise: number
  customHabits: { [key: string]: number }
}

interface CustomHabit {
  id: string
  name: string
  unit: string
  goal: number
  color: string
  icon: string
}

const defaultGoals: HabitGoals = {
  water: 8,
  sleep: 8,
  steps: 10000,
  meals: 3,
  exercise: 30,
  customHabits: {},
}

const habitColors = [
  "bg-blue-50 text-blue-600",
  "bg-green-50 text-green-600",
  "bg-purple-50 text-purple-600",
  "bg-orange-50 text-orange-600",
  "bg-pink-50 text-pink-600",
  "bg-indigo-50 text-indigo-600",
  "bg-teal-50 text-teal-600",
  "bg-red-50 text-red-600",
]

export default function HealthyHabitsTrackerPage() {
  const [entries, setEntries] = useState<HabitEntry[]>([])
  const [goals, setGoals] = useState<HabitGoals>(defaultGoals)
  const [customHabits, setCustomHabits] = useState<CustomHabit[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [todayEntry, setTodayEntry] = useState<HabitEntry | null>(null)
  const [showGoalsDialog, setShowGoalsDialog] = useState(false)
  const [showCustomHabitDialog, setShowCustomHabitDialog] = useState(false)
  const [newHabit, setNewHabit] = useState({
    name: "",
    unit: "",
    goal: 1,
    color: habitColors[0],
    icon: "Target",
  })
  const [quickAddMode, setQuickAddMode] = useState<string | null>(null)
  const [quickAddValue, setQuickAddValue] = useState("")

  // Load data from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem("habit-entries")
    const savedGoals = localStorage.getItem("habit-goals")
    const savedCustomHabits = localStorage.getItem("custom-habits")

    if (savedEntries) {
      const parsed = JSON.parse(savedEntries)
      setEntries(
        parsed.map((entry: any) => ({
          ...entry,
          date: new Date(entry.date),
        })),
      )
    }

    if (savedGoals) {
      setGoals(JSON.parse(savedGoals))
    }

    if (savedCustomHabits) {
      setCustomHabits(JSON.parse(savedCustomHabits))
    }
  }, [])

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("habit-entries", JSON.stringify(entries))
  }, [entries])

  useEffect(() => {
    localStorage.setItem("habit-goals", JSON.stringify(goals))
  }, [goals])

  useEffect(() => {
    localStorage.setItem("custom-habits", JSON.stringify(customHabits))
  }, [customHabits])

  // Find today's entry
  useEffect(() => {
    const today = entries.find((entry) => isToday(entry.date))
    if (today) {
      setTodayEntry(today)
    } else {
      const newEntry: HabitEntry = {
        id: Date.now().toString(),
        date: new Date(),
        water: 0,
        sleep: 0,
        steps: 0,
        meals: 0,
        exercise: 0,
        customHabits: {},
      }
      setTodayEntry(newEntry)
    }
  }, [entries])

  const updateHabit = (habit: string, value: number, isCustom = false) => {
    if (!todayEntry) return

    let updatedEntry: HabitEntry
    if (isCustom) {
      updatedEntry = {
        ...todayEntry,
        customHabits: {
          ...todayEntry.customHabits,
          [habit]: Math.max(0, value),
        },
      }
    } else {
      updatedEntry = {
        ...todayEntry,
        [habit]: Math.max(0, value),
      }
    }

    setTodayEntry(updatedEntry)

    const existingIndex = entries.findIndex((entry) => isToday(entry.date))
    if (existingIndex >= 0) {
      const newEntries = [...entries]
      newEntries[existingIndex] = updatedEntry
      setEntries(newEntries)
    } else {
      setEntries([updatedEntry, ...entries])
    }
  }

  const quickAdd = (habit: string, isCustom = false) => {
    const value = Number.parseFloat(quickAddValue) || 0
    if (value > 0) {
      const currentValue = isCustom
        ? todayEntry?.customHabits[habit] || 0
        : (todayEntry?.[habit as keyof HabitEntry] as number) || 0
      updateHabit(habit, currentValue + value, isCustom)
      setQuickAddValue("")
      setQuickAddMode(null)
    }
  }

  const addCustomHabit = () => {
    if (newHabit.name && newHabit.unit) {
      const customHabit: CustomHabit = {
        id: Date.now().toString(),
        ...newHabit,
      }
      setCustomHabits([...customHabits, customHabit])
      setGoals((prev) => ({
        ...prev,
        customHabits: {
          ...prev.customHabits,
          [customHabit.id]: newHabit.goal,
        },
      }))
      setNewHabit({
        name: "",
        unit: "",
        goal: 1,
        color: habitColors[customHabits.length % habitColors.length],
        icon: "Target",
      })
      setShowCustomHabitDialog(false)
    }
  }

  const deleteCustomHabit = (habitId: string) => {
    setCustomHabits(customHabits.filter((h) => h.id !== habitId))
    const newGoals = { ...goals }
    delete newGoals.customHabits[habitId]
    setGoals(newGoals)
  }

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100)
  }

  const getWeeklyData = () => {
    const weekStart = startOfWeek(selectedDate)
    const weekEnd = endOfWeek(selectedDate)
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })

    return weekDays.map((day) => {
      const entry = entries.find((e) => e.date.toDateString() === day.toDateString())
      return {
        date: day,
        entry: entry || null,
      }
    })
  }

  const getStreakCount = (habit: string, isCustom = false) => {
    let streak = 0
    const sortedEntries = [...entries].sort((a, b) => b.date.getTime() - a.date.getTime())

    for (const entry of sortedEntries) {
      const goal = isCustom ? goals.customHabits[habit] : (goals[habit as keyof HabitGoals] as number)
      const current = isCustom ? entry.customHabits[habit] || 0 : (entry[habit as keyof HabitEntry] as number)

      if (current >= goal) {
        streak++
      } else {
        break
      }
    }

    return streak
  }

  const getTotalCompletedToday = () => {
    if (!todayEntry) return { completed: 0, total: 0 }

    const coreHabits = ["water", "sleep", "steps", "meals", "exercise"]
    let completed = 0
    const total = coreHabits.length + customHabits.length

    coreHabits.forEach((habit) => {
      const current = todayEntry[habit as keyof HabitEntry] as number
      const goal = goals[habit as keyof HabitGoals] as number
      if (current >= goal) completed++
    })

    customHabits.forEach((habit) => {
      const current = todayEntry.customHabits[habit.id] || 0
      const goal = goals.customHabits[habit.id] || habit.goal
      if (current >= goal) completed++
    })

    return { completed, total }
  }

  const { completed, total } = getTotalCompletedToday()

  const habitCards = [
    {
      key: "water" as const,
      title: "Water Intake",
      icon: Droplets,
      unit: "glasses",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      increment: 1,
    },
    {
      key: "sleep" as const,
      title: "Sleep",
      icon: Moon,
      unit: "hours",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      increment: 0.5,
    },
    {
      key: "steps" as const,
      title: "Steps",
      icon: Footprints,
      unit: "steps",
      color: "text-green-600",
      bgColor: "bg-green-50",
      increment: 1000,
    },
    {
      key: "meals" as const,
      title: "Healthy Meals",
      icon: Apple,
      unit: "meals",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      increment: 1,
    },
    {
      key: "exercise" as const,
      title: "Exercise",
      icon: Target,
      unit: "minutes",
      color: "text-red-600",
      bgColor: "bg-red-50",
      increment: 15,
    },
  ]

  if (!todayEntry) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-4">
            <BarChart3 className="w-4 h-4 mr-2" />
            Daily Wellness Tracking
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Healthy <span className="text-purple-600">Habits</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Track your daily wellness habits and build healthy routines that last.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
          <Card className="text-center hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-4 sm:pt-6">
              <div className="text-xl sm:text-2xl font-bold text-purple-600">
                {completed}/{total}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Today's Goals</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-4 sm:pt-6">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">{entries.length}</div>
              <div className="text-xs sm:text-sm text-gray-600">Days Tracked</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-4 sm:pt-6">
              <div className="text-xl sm:text-2xl font-bold text-green-600">
                {Math.round((completed / total) * 100)}%
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Completion Rate</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-4 sm:pt-6">
              <div className="text-xl sm:text-2xl font-bold text-orange-600">
                {habitCards.reduce((max, habit) => Math.max(max, getStreakCount(habit.key)), 0)}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Best Streak</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="today" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            {/* Core Habits */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold">Core Habits</h2>
                <Badge variant="outline" className="flex items-center">
                  <Target className="w-4 h-4 mr-1" />
                  {
                    habitCards.filter((habit) => {
                      const current = todayEntry[habit.key]
                      const goal = goals[habit.key]
                      return current >= goal
                    }).length
                  }
                  /{habitCards.length} completed
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
                {habitCards.map((habit) => {
                  const current = todayEntry[habit.key]
                  const goal = goals[habit.key]
                  const progress = getProgressPercentage(current, goal)
                  const streak = getStreakCount(habit.key)

                  return (
                    <Card key={habit.key} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div
                              className={`p-2 sm:p-3 rounded-xl ${habit.bgColor} transition-all duration-300 hover:scale-110`}
                            >
                              <habit.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${habit.color}`} />
                            </div>
                            <div>
                              <CardTitle className="text-base sm:text-lg">{habit.title}</CardTitle>
                              <CardDescription className="text-xs sm:text-sm">
                                Goal: {goal} {habit.unit}
                              </CardDescription>
                            </div>
                          </div>
                          {streak > 0 && (
                            <Badge variant="secondary" className="flex items-center text-xs">
                              <Award className="w-3 h-3 mr-1" />
                              {streak}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xl sm:text-2xl font-bold">
                                {habit.key === "steps" ? current.toLocaleString() : current}
                              </span>
                              <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
                            </div>
                            <Progress value={progress} className="h-2 sm:h-3" />
                          </div>

                          <div className="flex items-center justify-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateHabit(habit.key, current - habit.increment)}
                              className="hover:bg-red-50"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>

                            {quickAddMode === habit.key ? (
                              <div className="flex items-center space-x-1">
                                <Input
                                  type="number"
                                  value={quickAddValue}
                                  onChange={(e) => setQuickAddValue(e.target.value)}
                                  className="w-16 h-8 text-center text-xs"
                                  placeholder="0"
                                  onKeyPress={(e) => e.key === "Enter" && quickAdd(habit.key)}
                                />
                                <Button size="sm" onClick={() => quickAdd(habit.key)} className="h-8 px-2">
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setQuickAddMode(habit.key)}
                                className="min-w-[80px] text-xs"
                              >
                                Quick Add
                              </Button>
                            )}

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateHabit(habit.key, current + habit.increment)}
                              className="hover:bg-green-50"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Custom Habits */}
            {customHabits.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold">Custom Habits</h2>
                  <Badge variant="outline" className="flex items-center">
                    <Zap className="w-4 h-4 mr-1" />
                    {
                      customHabits.filter((habit) => {
                        const current = todayEntry.customHabits[habit.id] || 0
                        const goal = goals.customHabits[habit.id] || habit.goal
                        return current >= goal
                      }).length
                    }
                    /{customHabits.length} completed
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {customHabits.map((habit) => {
                    const current = todayEntry.customHabits[habit.id] || 0
                    const goal = goals.customHabits[habit.id] || habit.goal
                    const progress = getProgressPercentage(current, goal)
                    const streak = getStreakCount(habit.id, true)

                    return (
                      <Card key={habit.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div
                                className={`p-2 sm:p-3 rounded-xl ${habit.color} transition-all duration-300 hover:scale-110`}
                              >
                                <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                              </div>
                              <div>
                                <CardTitle className="text-base sm:text-lg">{habit.name}</CardTitle>
                                <CardDescription className="text-xs sm:text-sm">
                                  Goal: {goal} {habit.unit}
                                </CardDescription>
                              </div>
                            </div>
                            {streak > 0 && (
                              <Badge variant="secondary" className="flex items-center text-xs">
                                <Award className="w-3 h-3 mr-1" />
                                {streak}
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xl sm:text-2xl font-bold">{current}</span>
                                <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
                              </div>
                              <Progress value={progress} className="h-2 sm:h-3" />
                            </div>

                            <div className="flex items-center justify-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateHabit(habit.id, current - 1, true)}
                                className="hover:bg-red-50"
                              >
                                <Minus className="w-4 h-4" />
                              </Button>

                              {quickAddMode === habit.id ? (
                                <div className="flex items-center space-x-1">
                                  <Input
                                    type="number"
                                    value={quickAddValue}
                                    onChange={(e) => setQuickAddValue(e.target.value)}
                                    className="w-16 h-8 text-center text-xs"
                                    placeholder="0"
                                    onKeyPress={(e) => e.key === "Enter" && quickAdd(habit.id, true)}
                                  />
                                  <Button size="sm" onClick={() => quickAdd(habit.id, true)} className="h-8 px-2">
                                    <Plus className="w-3 h-3" />
                                  </Button>
                                </div>
                              ) : (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setQuickAddMode(habit.id)}
                                  className="min-w-[80px] text-xs"
                                >
                                  Quick Add
                                </Button>
                              )}

                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateHabit(habit.id, current + 1, true)}
                                className="hover:bg-green-50"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Today's Progress Summary */}
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-800">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Today's Progress Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {habitCards.map((habit) => {
                    const current = todayEntry[habit.key]
                    const goal = goals[habit.key]
                    const isComplete = current >= goal

                    return (
                      <div key={habit.key} className="text-center">
                        <div
                          className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto mb-2 flex items-center justify-center transition-all duration-300 ${
                            isComplete ? "bg-green-100 scale-110" : habit.bgColor
                          }`}
                        >
                          <habit.icon
                            className={`w-6 h-6 sm:w-8 sm:h-8 ${isComplete ? "text-green-600" : habit.color}`}
                          />
                        </div>
                        <p className="text-sm font-medium">{habit.title}</p>
                        <p className="text-xs text-gray-500">{Math.round(getProgressPercentage(current, goal))}%</p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-0">Weekly Overview</h2>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(selectedDate, "MMM d, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
              {getWeeklyData().map((day, index) => (
                <Card
                  key={index}
                  className={`${isToday(day.date) ? "ring-2 ring-purple-500 bg-purple-50" : ""} hover:shadow-lg transition-all duration-300`}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-center">{format(day.date, "EEE")}</CardTitle>
                    <CardDescription className="text-center">{format(day.date, "MMM d")}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {day.entry ? (
                      <div className="space-y-2">
                        {habitCards.map((habit) => {
                          const current = day.entry![habit.key]
                          const goal = goals[habit.key]
                          const progress = getProgressPercentage(current, goal)

                          return (
                            <div key={habit.key} className="flex items-center space-x-2">
                              <habit.icon className={`w-3 h-3 ${habit.color}`} />
                              <div className="flex-1">
                                <Progress value={progress} className="h-1" />
                              </div>
                              <span className="text-xs text-gray-500 min-w-[35px]">{Math.round(progress)}%</span>
                            </div>
                          )
                        })}
                        {customHabits.map((habit) => {
                          const current = day.entry!.customHabits[habit.id] || 0
                          const goal = goals.customHabits[habit.id] || habit.goal
                          const progress = getProgressPercentage(current, goal)

                          return (
                            <div key={habit.id} className="flex items-center space-x-2">
                              <Target className="w-3 h-3 text-gray-600" />
                              <div className="flex-1">
                                <Progress value={progress} className="h-1" />
                              </div>
                              <span className="text-xs text-gray-500 min-w-[35px]">{Math.round(progress)}%</span>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 text-center py-4">No data</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Habit Streaks</CardTitle>
                  <CardDescription>Current consecutive days meeting your goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {habitCards.map((habit) => {
                      const streak = getStreakCount(habit.key)
                      return (
                        <div key={habit.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${habit.bgColor}`}>
                              <habit.icon className={`w-4 h-4 ${habit.color}`} />
                            </div>
                            <div>
                              <p className="font-medium">{habit.title}</p>
                              <p className="text-sm text-gray-600">
                                {streak} day{streak !== 1 ? "s" : ""} streak
                              </p>
                            </div>
                          </div>
                          <Badge variant={streak > 0 ? "default" : "secondary"}>
                            {streak > 0 ? `${streak} days` : "No streak"}
                          </Badge>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Completion Rate</CardTitle>
                  <CardDescription>Percentage of goals met this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {habitCards.map((habit) => {
                      const weekData = getWeeklyData()
                      const completedDays = weekData.filter((day) => {
                        if (!day.entry) return false
                        const current = day.entry[habit.key]
                        const goal = goals[habit.key]
                        return current >= goal
                      }).length
                      const completionRate = Math.round((completedDays / 7) * 100)

                      return (
                        <div key={habit.key} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <habit.icon className={`w-4 h-4 ${habit.color}`} />
                              <span className="font-medium">{habit.title}</span>
                            </div>
                            <span className="text-sm text-gray-600">{completionRate}%</span>
                          </div>
                          <Progress value={completionRate} className="h-2" />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Goal Settings
                  </CardTitle>
                  <CardDescription>Customize your daily targets for each habit</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {habitCards.map((habit) => (
                      <div key={habit.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${habit.bgColor}`}>
                            <habit.icon className={`w-4 h-4 ${habit.color}`} />
                          </div>
                          <div>
                            <p className="font-medium">{habit.title}</p>
                            <p className="text-sm text-gray-600">{habit.unit}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            value={goals[habit.key]}
                            onChange={(e) =>
                              setGoals({
                                ...goals,
                                [habit.key]: Number.parseFloat(e.target.value) || 0,
                              })
                            }
                            className="w-20 text-center"
                            min="0"
                            step={habit.key === "sleep" ? "0.5" : "1"}
                          />
                          <span className="text-sm text-gray-500">{habit.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Plus className="w-5 h-5 mr-2" />
                      Custom Habits
                    </div>
                    <Dialog open={showCustomHabitDialog} onOpenChange={setShowCustomHabitDialog}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Habit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create Custom Habit</DialogTitle>
                          <DialogDescription>
                            Add a personalized habit to track alongside your core wellness metrics.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Habit Name</Label>
                              <Input
                                value={newHabit.name}
                                onChange={(e) => setNewHabit((prev) => ({ ...prev, name: e.target.value }))}
                                placeholder="e.g., Read Books"
                              />
                            </div>
                            <div>
                              <Label>Unit</Label>
                              <Input
                                value={newHabit.unit}
                                onChange={(e) => setNewHabit((prev) => ({ ...prev, unit: e.target.value }))}
                                placeholder="e.g., pages, minutes"
                              />
                            </div>
                          </div>

                          <div>
                            <Label>Daily Goal</Label>
                            <Slider
                              value={[newHabit.goal]}
                              onValueChange={([value]) => setNewHabit((prev) => ({ ...prev, goal: value }))}
                              max={100}
                              min={1}
                              step={1}
                              className="mt-2"
                            />
                            <div className="text-sm text-gray-500 mt-1">
                              {newHabit.goal} {newHabit.unit}
                            </div>
                          </div>

                          <div>
                            <Label>Color Theme</Label>
                            <div className="grid grid-cols-4 gap-2 mt-2">
                              {habitColors.map((color, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  className={`w-12 h-12 rounded-lg ${color} border-2 ${
                                    newHabit.color === color ? "border-gray-800" : "border-transparent"
                                  }`}
                                  onClick={() => setNewHabit((prev) => ({ ...prev, color }))}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2 pt-4">
                            <Button onClick={addCustomHabit} className="flex-1">
                              Create Habit
                            </Button>
                            <Button variant="outline" onClick={() => setShowCustomHabitDialog(false)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardTitle>
                  <CardDescription>Manage your personalized tracking habits</CardDescription>
                </CardHeader>
                <CardContent>
                  {customHabits.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Target className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No custom habits yet</p>
                      <p className="text-sm">Create personalized habits to track</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {customHabits.map((habit) => (
                        <div key={habit.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${habit.color}`}>
                              <Target className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-medium">{habit.name}</p>
                              <p className="text-sm text-gray-600">
                                Goal: {habit.goal} {habit.unit}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              value={goals.customHabits[habit.id] || habit.goal}
                              onChange={(e) =>
                                setGoals((prev) => ({
                                  ...prev,
                                  customHabits: {
                                    ...prev.customHabits,
                                    [habit.id]: Number.parseFloat(e.target.value) || 0,
                                  },
                                }))
                              }
                              className="w-16 text-center"
                              min="0"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteCustomHabit(habit.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
