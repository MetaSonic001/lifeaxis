"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { CalendarIcon, Plus, TrendingUp, AlertCircle, Search, Download, Edit, Trash2, BarChart3 } from "lucide-react"
import { format, isToday, subDays, isWithinInterval } from "date-fns"

interface SymptomEntry {
  id: string
  date: Date
  symptoms: string[]
  severity: number
  notes: string
  mood: string
  triggers: string[]
  weather: string
  sleep: number
  stress: number
}

const commonSymptoms = [
  "Headache",
  "Fatigue",
  "Nausea",
  "Dizziness",
  "Back Pain",
  "Joint Pain",
  "Anxiety",
  "Insomnia",
  "Cough",
  "Fever",
  "Stomach Pain",
  "Muscle Aches",
  "Shortness of Breath",
  "Chest Pain",
  "Skin Rash",
  "Eye Strain",
]

const commonTriggers = [
  "Stress",
  "Weather Change",
  "Lack of Sleep",
  "Certain Foods",
  "Exercise",
  "Alcohol",
  "Caffeine",
  "Hormonal Changes",
  "Allergies",
  "Work Pressure",
]

const moodOptions = ["Excellent", "Great", "Good", "Okay", "Poor", "Terrible"]
const weatherOptions = ["Sunny", "Cloudy", "Rainy", "Stormy", "Snowy", "Humid", "Dry"]

export default function SymptomJournalPage() {
  const [entries, setEntries] = useState<SymptomEntry[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingEntry, setEditingEntry] = useState<SymptomEntry | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [severity, setSeverity] = useState<number[]>([3])
  const [notes, setNotes] = useState("")
  const [mood, setMood] = useState("")
  const [customSymptom, setCustomSymptom] = useState("")
  const [triggers, setTriggers] = useState<string[]>([])
  const [customTrigger, setCustomTrigger] = useState("")
  const [weather, setWeather] = useState("")
  const [sleep, setSleep] = useState<number[]>([7])
  const [stress, setStress] = useState<number[]>([3])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterMood, setFilterMood] = useState("all")
  const [filterSeverity, setFilterSeverity] = useState("all")
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })

  // Load entries from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem("symptom-entries")
    if (savedEntries) {
      const parsed = JSON.parse(savedEntries)
      setEntries(
        parsed.map((entry: any) => ({
          ...entry,
          date: new Date(entry.date),
        })),
      )
    }
  }, [])

  // Save entries to localStorage
  useEffect(() => {
    localStorage.setItem("symptom-entries", JSON.stringify(entries))
  }, [entries])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const entryData: SymptomEntry = {
      id: editingEntry?.id || Date.now().toString(),
      date: selectedDate,
      symptoms: selectedSymptoms,
      severity: severity[0],
      notes,
      mood,
      triggers,
      weather,
      sleep: sleep[0],
      stress: stress[0],
    }

    if (editingEntry) {
      setEntries(entries.map((entry) => (entry.id === editingEntry.id ? entryData : entry)))
    } else {
      setEntries([entryData, ...entries])
    }

    resetForm()
  }

  const resetForm = () => {
    setSelectedSymptoms([])
    setSeverity([3])
    setNotes("")
    setMood("")
    setTriggers([])
    setWeather("")
    setSleep([7])
    setStress([3])
    setShowForm(false)
    setEditingEntry(null)
  }

  const editEntry = (entry: SymptomEntry) => {
    setEditingEntry(entry)
    setSelectedDate(entry.date)
    setSelectedSymptoms(entry.symptoms)
    setSeverity([entry.severity])
    setNotes(entry.notes)
    setMood(entry.mood)
    setTriggers(entry.triggers)
    setWeather(entry.weather)
    setSleep([entry.sleep])
    setStress([entry.stress])
    setShowForm(true)
  }

  const deleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id))
  }

  const addSymptom = (symptom: string) => {
    if (symptom && !selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom])
    }
  }

  const removeSymptom = (symptom: string) => {
    setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom))
  }

  const addCustomSymptom = () => {
    if (customSymptom.trim()) {
      addSymptom(customSymptom.trim())
      setCustomSymptom("")
    }
  }

  const addTrigger = (trigger: string) => {
    if (trigger && !triggers.includes(trigger)) {
      setTriggers([...triggers, trigger])
    }
  }

  const removeTrigger = (trigger: string) => {
    setTriggers(triggers.filter((t) => t !== trigger))
  }

  const addCustomTrigger = () => {
    if (customTrigger.trim()) {
      addTrigger(customTrigger.trim())
      setCustomTrigger("")
    }
  }

  const getSeverityColor = (severity: number) => {
    if (severity <= 2) return "bg-green-100 text-green-800 border-green-200"
    if (severity <= 4) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-red-100 text-red-800 border-red-200"
  }

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "Excellent":
      case "Great":
        return "bg-green-100 text-green-800 border-green-200"
      case "Good":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Okay":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "Poor":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Terrible":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      searchTerm === "" ||
      entry.symptoms.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      entry.notes.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesMood = filterMood === "all" || entry.mood === filterMood
    const matchesSeverity =
      filterSeverity === "all" ||
      (filterSeverity === "low" && entry.severity <= 2) ||
      (filterSeverity === "medium" && entry.severity >= 3 && entry.severity <= 4) ||
      (filterSeverity === "high" && entry.severity >= 5)

    const matchesDateRange = 
      dateRange.from && dateRange.to 
        ? isWithinInterval(entry.date, { start: dateRange.from, end: dateRange.to })
        : true

    return matchesSearch && matchesMood && matchesSeverity && matchesDateRange
  })


  const getSymptomFrequency = () => {
    const frequency: { [key: string]: number } = {}
    entries.forEach((entry) => {
      entry.symptoms.forEach((symptom) => {
        frequency[symptom] = (frequency[symptom] || 0) + 1
      })
    })
    return Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
  }

  const getAverageSeverity = () => {
    if (entries.length === 0) return 0
    const total = entries.reduce((sum, entry) => sum + entry.severity, 0)
    return (total / entries.length).toFixed(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-4">
            <BarChart3 className="w-4 h-4 mr-2" />
            Health Tracking & Analytics
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Symptom <span className="text-green-600">Journal</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Track your daily symptoms to identify patterns and share insights with your healthcare provider.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
          <Card className="text-center hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-4 sm:pt-6">
              <div className="text-xl sm:text-2xl font-bold text-green-600">{entries.length}</div>
              <div className="text-xs sm:text-sm text-gray-600">Total Entries</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-4 sm:pt-6">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">{getAverageSeverity()}</div>
              <div className="text-xs sm:text-sm text-gray-600">Avg Severity</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-4 sm:pt-6">
              <div className="text-xl sm:text-2xl font-bold text-purple-600">
                {entries.filter((e) => isToday(e.date)).length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Today's Entries</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-4 sm:pt-6">
              <div className="text-xl sm:text-2xl font-bold text-orange-600">
                {new Set(entries.flatMap((e) => e.symptoms)).size}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Unique Symptoms</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="entries" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="entries">Journal Entries</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="export">Export Data</TabsTrigger>
          </TabsList>

          <TabsContent value="entries" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
              {/* Add/Edit Entry Form */}
              <div className="lg:col-span-4">
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Plus className="w-5 h-5 mr-2" />
                      {editingEntry ? "Edit Entry" : "Log Symptoms"}
                    </CardTitle>
                    <CardDescription>
                      {editingEntry ? "Update your symptom entry" : "Record your daily symptoms and wellness data"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!showForm ? (
                      <Button onClick={() => setShowForm(true)} className="w-full" size="lg">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Entry
                      </Button>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Date Selection */}
                        <div>
                          <Label>Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start bg-transparent">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {format(selectedDate, "PPP")}
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

                        {/* Symptoms */}
                        <div>
                          <Label>Symptoms</Label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {commonSymptoms.map((symptom) => (
                              <Button
                                key={symptom}
                                type="button"
                                variant={selectedSymptoms.includes(symptom) ? "default" : "outline"}
                                size="sm"
                                className="text-xs"
                                onClick={() =>
                                  selectedSymptoms.includes(symptom) ? removeSymptom(symptom) : addSymptom(symptom)
                                }
                              >
                                {symptom}
                              </Button>
                            ))}
                          </div>
                          <div className="flex mt-2 gap-2">
                            <Input
                              placeholder="Add custom symptom"
                              value={customSymptom}
                              onChange={(e) => setCustomSymptom(e.target.value)}
                              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCustomSymptom())}
                              className="flex-1"
                            />
                            <Button type="button" onClick={addCustomSymptom} size="sm">
                              Add
                            </Button>
                          </div>
                          {selectedSymptoms.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {selectedSymptoms.map((symptom) => (
                                <Badge
                                  key={symptom}
                                  variant="secondary"
                                  className="cursor-pointer hover:bg-red-100"
                                  onClick={() => removeSymptom(symptom)}
                                >
                                  {symptom} ×
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Severity Slider */}
                        <div>
                          <Label>Severity: {severity[0]}/5</Label>
                          <Slider
                            value={severity}
                            onValueChange={setSeverity}
                            max={5}
                            min={1}
                            step={1}
                            className="mt-2"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Mild</span>
                            <span>Moderate</span>
                            <span>Severe</span>
                          </div>
                        </div>

                        {/* Mood */}
                        <div>
                          <Label>Overall Mood</Label>
                          <Select value={mood} onValueChange={setMood}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select mood" />
                            </SelectTrigger>
                            <SelectContent>
                              {moodOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Sleep Hours */}
                        <div>
                          <Label>Sleep Hours: {sleep[0]}h</Label>
                          <Slider value={sleep} onValueChange={setSleep} max={12} min={0} step={0.5} className="mt-2" />
                        </div>

                        {/* Stress Level */}
                        <div>
                          <Label>Stress Level: {stress[0]}/5</Label>
                          <Slider value={stress} onValueChange={setStress} max={5} min={1} step={1} className="mt-2" />
                        </div>

                        {/* Weather */}
                        <div>
                          <Label>Weather</Label>
                          <Select value={weather} onValueChange={setWeather}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select weather" />
                            </SelectTrigger>
                            <SelectContent>
                              {weatherOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Triggers */}
                        <div>
                          <Label>Possible Triggers</Label>
                          <div className="grid grid-cols-2 gap-1 mt-2">
                            {commonTriggers.slice(0, 6).map((trigger) => (
                              <Button
                                key={trigger}
                                type="button"
                                variant={triggers.includes(trigger) ? "default" : "outline"}
                                size="sm"
                                className="text-xs"
                                onClick={() =>
                                  triggers.includes(trigger) ? removeTrigger(trigger) : addTrigger(trigger)
                                }
                              >
                                {trigger}
                              </Button>
                            ))}
                          </div>
                          <div className="flex mt-2 gap-2">
                            <Input
                              placeholder="Add custom trigger"
                              value={customTrigger}
                              onChange={(e) => setCustomTrigger(e.target.value)}
                              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCustomTrigger())}
                              className="flex-1"
                            />
                            <Button type="button" onClick={addCustomTrigger} size="sm">
                              Add
                            </Button>
                          </div>
                          {triggers.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {triggers.map((trigger) => (
                                <Badge
                                  key={trigger}
                                  variant="outline"
                                  className="cursor-pointer hover:bg-red-100"
                                  onClick={() => removeTrigger(trigger)}
                                >
                                  {trigger} ×
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Notes */}
                        <div>
                          <Label>Additional Notes</Label>
                          <Textarea
                            placeholder="Any additional details, observations, or context..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            className="resize-none"
                          />
                        </div>

                        <div className="flex gap-2 pt-4">
                          <Button type="submit" className="flex-1">
                            {editingEntry ? "Update Entry" : "Save Entry"}
                          </Button>
                          <Button type="button" variant="outline" onClick={resetForm}>
                            Cancel
                          </Button>
                        </div>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Entries List */}
              <div className="lg:col-span-8">
                {/* Search and Filters */}
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            placeholder="Search symptoms or notes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <Select value={filterMood} onValueChange={setFilterMood}>
                        <SelectTrigger className="w-full sm:w-32">
                          <SelectValue placeholder="Mood" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Moods</SelectItem>
                          {moodOptions.map((mood) => (
                            <SelectItem key={mood} value={mood}>
                              {mood}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                        <SelectTrigger className="w-full sm:w-32">
                          <SelectValue placeholder="Severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Levels</SelectItem>
                          <SelectItem value="low">Low (1-2)</SelectItem>
                          <SelectItem value="medium">Medium (3-4)</SelectItem>
                          <SelectItem value="high">High (5)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold">Journal Entries ({filteredEntries.length})</h2>
                  {entries.length > 0 && (
                    <Badge variant="outline" className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {entries.length} total entries
                    </Badge>
                  )}
                </div>

                {filteredEntries.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-12">
                      <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {entries.length === 0 ? "No entries yet" : "No entries match your filters"}
                      </h3>
                      <p className="text-gray-600">
                        {entries.length === 0
                          ? "Start logging your symptoms to track patterns over time."
                          : "Try adjusting your search or filter criteria."}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {filteredEntries.map((entry) => (
                      <Card key={entry.id} className="hover:shadow-lg transition-all duration-300">
                        <CardHeader className="pb-3">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <CardTitle className="text-lg">
                              {format(entry.date, "EEEE, MMMM d, yyyy")}
                              {isToday(entry.date) && (
                                <Badge variant="secondary" className="ml-2">
                                  Today
                                </Badge>
                              )}
                            </CardTitle>
                            <div className="flex items-center gap-2">
                              <Badge className={getSeverityColor(entry.severity)}>Severity: {entry.severity}/5</Badge>
                              {entry.mood && <Badge className={getMoodColor(entry.mood)}>{entry.mood}</Badge>}
                              <div className="flex gap-1">
                                <Button variant="outline" size="sm" onClick={() => editEntry(entry)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => deleteEntry(entry.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {entry.symptoms.length > 0 && (
                              <div>
                                <h4 className="font-medium text-sm text-gray-700 mb-2">Symptoms:</h4>
                                <div className="flex flex-wrap gap-1">
                                  {entry.symptoms.map((symptom) => (
                                    <Badge key={symptom} variant="secondary" className="text-xs">
                                      {symptom}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-gray-600">Sleep:</span>
                                <span className="ml-1 font-medium">{entry.sleep}h</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Stress:</span>
                                <span className="ml-1 font-medium">{entry.stress}/5</span>
                              </div>
                              {entry.weather && (
                                <div>
                                  <span className="text-gray-600">Weather:</span>
                                  <span className="ml-1 font-medium">{entry.weather}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {entry.triggers.length > 0 && (
                            <div className="mt-3">
                              <h4 className="font-medium text-sm text-gray-700 mb-2">Triggers:</h4>
                              <div className="flex flex-wrap gap-1">
                                {entry.triggers.map((trigger) => (
                                  <Badge key={trigger} variant="outline" className="text-xs">
                                    {trigger}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {entry.notes && (
                            <div className="mt-3">
                              <h4 className="font-medium text-sm text-gray-700 mb-2">Notes:</h4>
                              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{entry.notes}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Most Common Symptoms</CardTitle>
                  <CardDescription>Frequency of symptoms over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getSymptomFrequency().map(([symptom, count], index) => (
                      <div key={symptom} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{symptom}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(count / entries.length) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 min-w-[30px]">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Severity Trends</CardTitle>
                  <CardDescription>Average severity over the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{getAverageSeverity()}</div>
                    <p className="text-gray-600">Average Severity</p>
                    <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-600">
                          {entries.filter((e) => e.severity <= 2).length}
                        </div>
                        <div className="text-gray-600">Low</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-yellow-600">
                          {entries.filter((e) => e.severity >= 3 && e.severity <= 4).length}
                        </div>
                        <div className="text-gray-600">Medium</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-red-600">
                          {entries.filter((e) => e.severity >= 5).length}
                        </div>
                        <div className="text-gray-600">High</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="w-5 h-5 mr-2" />
                  Export Your Data
                </CardTitle>
                <CardDescription>
                  Download your symptom journal data for sharing with healthcare providers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center bg-transparent">
                    <Download className="w-8 h-8 mb-2" />
                    <span className="font-medium">Export as CSV</span>
                    <span className="text-sm text-gray-600">Spreadsheet format</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center bg-transparent">
                    <Download className="w-8 h-8 mb-2" />
                    <span className="font-medium">Export as PDF</span>
                    <span className="text-sm text-gray-600">Printable report</span>
                  </Button>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Export includes:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• All symptom entries with dates and severity</li>
                    <li>• Mood and stress level tracking</li>
                    <li>• Sleep patterns and weather correlations</li>
                    <li>• Identified triggers and patterns</li>
                    <li>• Personal notes and observations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
