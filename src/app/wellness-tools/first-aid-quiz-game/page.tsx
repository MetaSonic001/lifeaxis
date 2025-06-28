"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Heart,
  CheckCircle,
  XCircle,
  RotateCcw,
  Trophy,
  Clock,
  AlertTriangle,
  Zap,
  Plus,
  Settings,
  BarChart3,
  Target,
} from "lucide-react"
import { format } from "date-fns" // Import format from date-fns

interface Question {
  id: number
  category: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: "easy" | "medium" | "hard"
}

interface QuizResult {
  score: number
  totalQuestions: number
  timeSpent: number
  category: string
  date: Date
  difficulty: string
}

interface CustomQuestion {
  id: number
  category: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: "easy" | "medium" | "hard"
}

const defaultQuestions: Question[] = [
  {
    id: 1,
    category: "CPR",
    question: "What is the correct compression rate for adult CPR?",
    options: ["60-80 per minute", "100-120 per minute", "140-160 per minute", "180-200 per minute"],
    correctAnswer: 1,
    explanation: "The American Heart Association recommends 100-120 compressions per minute for effective CPR.",
    difficulty: "easy",
  },
  {
    id: 2,
    category: "Choking",
    question: "What should you do first when someone is choking but can still cough?",
    options: [
      "Perform back blows immediately",
      "Encourage them to keep coughing",
      "Start abdominal thrusts",
      "Call 911 immediately",
    ],
    correctAnswer: 1,
    explanation: "If the person can still cough, encourage them to continue coughing as this may dislodge the object.",
    difficulty: "easy",
  },
  {
    id: 3,
    category: "Bleeding",
    question: "What is the most effective way to control severe bleeding?",
    options: [
      "Apply ice to the wound",
      "Elevate the injured area",
      "Apply direct pressure to the wound",
      "Use a tourniquet immediately",
    ],
    correctAnswer: 2,
    explanation: "Direct pressure on the wound is the most effective first step to control bleeding.",
    difficulty: "easy",
  },
  {
    id: 4,
    category: "Burns",
    question: "How should you treat a minor burn?",
    options: [
      "Apply ice directly",
      "Use butter or oil",
      "Run cool water over it for 10-20 minutes",
      "Pop any blisters that form",
    ],
    correctAnswer: 2,
    explanation: "Cool running water helps reduce pain and prevent further tissue damage.",
    difficulty: "easy",
  },
  {
    id: 5,
    category: "Shock",
    question: "What position should you place someone in if they are showing signs of shock?",
    options: ["Sitting upright", "On their side", "Lying flat with legs elevated", "Standing up"],
    correctAnswer: 2,
    explanation: "Elevating the legs helps improve blood flow to vital organs.",
    difficulty: "medium",
  },
  {
    id: 6,
    category: "Fractures",
    question: "What should you NOT do when someone has a suspected fracture?",
    options: ["Immobilize the area", "Apply ice", "Try to realign the bone", "Seek medical attention"],
    correctAnswer: 2,
    explanation: "Never try to realign a fractured bone as this can cause further damage.",
    difficulty: "medium",
  },
  {
    id: 7,
    category: "Poisoning",
    question: "If someone has ingested poison, what should you do first?",
    options: ["Make them vomit", "Give them milk", "Call Poison Control", "Give them water"],
    correctAnswer: 2,
    explanation: "Always call Poison Control (1-800-222-1222) first for professional guidance.",
    difficulty: "medium",
  },
  {
    id: 8,
    category: "Heart Attack",
    question: "What medication might help someone having a heart attack?",
    options: ["Ibuprofen", "Aspirin", "Acetaminophen", "Antihistamine"],
    correctAnswer: 1,
    explanation: "Aspirin can help prevent blood clots and may reduce heart attack damage.",
    difficulty: "hard",
  },
  {
    id: 9,
    category: "Stroke",
    question: "What does the acronym FAST stand for in stroke recognition?",
    options: [
      "Face, Arms, Speech, Time",
      "Fever, Ache, Swelling, Tremor",
      "Fatigue, Anxiety, Stress, Tension",
      "Focus, Alert, Stable, Transport",
    ],
    correctAnswer: 0,
    explanation:
      "FAST helps remember: Face drooping, Arm weakness, Speech difficulty, Time to call emergency services.",
    difficulty: "hard",
  },
  {
    id: 10,
    category: "Allergic Reaction",
    question: "What is the first-line treatment for severe allergic reactions (anaphylaxis)?",
    options: ["Antihistamines", "Epinephrine auto-injector", "Inhaled bronchodilator", "Corticosteroids"],
    correctAnswer: 1,
    explanation: "Epinephrine (EpiPen) is the first-line treatment for anaphylaxis and should be given immediately.",
    difficulty: "hard",
  },
]

export default function FirstAidQuizGamePage() {
  const [gameState, setGameState] = useState<"menu" | "playing" | "results">("menu")
  const [questions, setQuestions] = useState<Question[]>(defaultQuestions)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [results, setResults] = useState<QuizResult[]>([])
  const [timeLimit, setTimeLimit] = useState<number>(0) // 0 = no limit
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [showCustomQuestionDialog, setShowCustomQuestionDialog] = useState(false)
  const [newQuestion, setNewQuestion] = useState<CustomQuestion>({
    id: 0,
    category: "",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    explanation: "",
    difficulty: "easy",
  })

  // Load data from localStorage
  useEffect(() => {
    const savedResults = localStorage.getItem("first-aid-quiz-results")
    const savedCustomQuestions = localStorage.getItem("custom-first-aid-questions")

    if (savedResults) {
      const parsed = JSON.parse(savedResults)
      setResults(
        parsed.map((result: any) => ({
          ...result,
          date: new Date(result.date),
        })),
      )
    }

    if (savedCustomQuestions) {
      const customQuestions = JSON.parse(savedCustomQuestions)
      setQuestions([...defaultQuestions, ...customQuestions])
    }
  }, [])

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("first-aid-quiz-results", JSON.stringify(results))
  }, [results])

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (gameState === "playing" && timeLimit > 0 && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            finishQuiz()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [gameState, timeLimit, timeLeft])

  const startQuiz = (category: string, difficulty: string, customTimeLimit = 0) => {
    let filteredQuestions = [...questions]

    if (category !== "All") {
      filteredQuestions = filteredQuestions.filter((q) => q.category === category)
    }

    if (difficulty !== "All") {
      filteredQuestions = filteredQuestions.filter((q) => q.difficulty === difficulty)
    }

    // Shuffle questions
    const shuffled = filteredQuestions.sort(() => Math.random() - 0.5)
    const selectedQuestions = shuffled.slice(0, Math.min(10, shuffled.length))

    setCurrentQuestions(selectedQuestions)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setStartTime(new Date())
    setTimeLimit(customTimeLimit)
    setTimeLeft(customTimeLimit)
    setGameState("playing")
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(answerIndex)
    setShowExplanation(true)

    if (answerIndex === currentQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      finishQuiz()
    }
  }

  const finishQuiz = () => {
    if (!startTime) return

    const endTime = new Date()
    const timeSpent = Math.round((endTime.getTime() - startTime.getTime()) / 1000)

    const newResult: QuizResult = {
      score,
      totalQuestions: currentQuestions.length,
      timeSpent,
      category: selectedCategory,
      date: new Date(),
      difficulty: selectedDifficulty,
    }

    setResults([newResult, ...results.slice(0, 19)]) // Keep last 20 results
    setGameState("results")
  }

  const resetQuiz = () => {
    setGameState("menu")
    setSelectedCategory("All")
    setSelectedDifficulty("All")
    setCurrentQuestions([])
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setStartTime(null)
    setTimeLimit(0)
    setTimeLeft(0)
  }

  const addCustomQuestion = () => {
    if (newQuestion.question && newQuestion.options.every((opt) => opt.trim()) && newQuestion.explanation) {
      const customQuestion: Question = {
        ...newQuestion,
        id: Date.now(),
      }

      const updatedQuestions = [...questions, customQuestion]
      setQuestions(updatedQuestions)

      // Save custom questions
      const customQuestions = updatedQuestions.filter((q) => !defaultQuestions.find((def) => def.id === q.id))
      localStorage.setItem("custom-first-aid-questions", JSON.stringify(customQuestions))

      // Reset form
      setNewQuestion({
        id: 0,
        category: "",
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        explanation: "",
        difficulty: "easy",
      })
      setShowCustomQuestionDialog(false)
    }
  }

  const updateQuestionOption = (index: number, value: string) => {
    setNewQuestion((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) => (i === index ? value : opt)),
    }))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "hard":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const categories = [...new Set(questions.map((q) => q.category))]
  const difficulties = ["easy", "medium", "hard"]

  const getStats = () => {
    const totalQuizzes = results.length
    const averageScore =
      totalQuizzes > 0
        ? Math.round((results.reduce((sum, r) => sum + r.score / r.totalQuestions, 0) / totalQuizzes) * 100)
        : 0
    const bestScore =
      totalQuizzes > 0 ? Math.max(...results.map((r) => Math.round((r.score / r.totalQuestions) * 100))) : 0
    const totalTime = results.reduce((sum, r) => sum + r.timeSpent, 0)

    return { totalQuizzes, averageScore, bestScore, totalTime }
  }

  const stats = getStats()

  if (gameState === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-medium mb-4">
              <Heart className="w-4 h-4 mr-2" />
              Emergency Response Training
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              First Aid <span className="text-red-600">Quiz Game</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Test your first aid knowledge with interactive quizzes. Learn essential life-saving skills through
              engaging questions and detailed explanations.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-4 sm:pt-6">
                <div className="text-xl sm:text-2xl font-bold text-red-600">{stats.totalQuizzes}</div>
                <div className="text-xs sm:text-sm text-gray-600">Quizzes Taken</div>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-4 sm:pt-6">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">{stats.averageScore}%</div>
                <div className="text-xs sm:text-sm text-gray-600">Average Score</div>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-4 sm:pt-6">
                <div className="text-xl sm:text-2xl font-bold text-green-600">{stats.bestScore}%</div>
                <div className="text-xs sm:text-sm text-gray-600">Best Score</div>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-4 sm:pt-6">
                <div className="text-xl sm:text-2xl font-bold text-purple-600">{Math.floor(stats.totalTime / 60)}m</div>
                <div className="text-xs sm:text-sm text-gray-600">Study Time</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="quick-start" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="quick-start">Quick Start</TabsTrigger>
              <TabsTrigger value="custom">Custom Quiz</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

            <TabsContent value="quick-start" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-red-600" />
                    Quick Start Options
                  </CardTitle>
                  <CardDescription>Jump right into a quiz with these pre-configured options</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Button
                      onClick={() => startQuiz("All", "easy")}
                      className="h-auto p-6 flex flex-col items-center space-y-3 bg-green-50 hover:bg-green-100 text-green-800 border-green-200"
                      variant="outline"
                    >
                      <Target className="w-8 h-8" />
                      <div className="text-center">
                        <div className="font-semibold">Beginner Quiz</div>
                        <div className="text-sm opacity-75">Easy questions only</div>
                      </div>
                    </Button>

                    <Button
                      onClick={() => startQuiz("All", "All")}
                      className="h-auto p-6 flex flex-col items-center space-y-3 bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-200"
                      variant="outline"
                    >
                      <BarChart3 className="w-8 h-8" />
                      <div className="text-center">
                        <div className="font-semibold">Mixed Quiz</div>
                        <div className="text-sm opacity-75">All difficulty levels</div>
                      </div>
                    </Button>

                    <Button
                      onClick={() => startQuiz("All", "All", 300)}
                      className="h-auto p-6 flex flex-col items-center space-y-3 bg-red-50 hover:bg-red-100 text-red-800 border-red-200"
                      variant="outline"
                    >
                      <Clock className="w-8 h-8" />
                      <div className="text-center">
                        <div className="font-semibold">Timed Challenge</div>
                        <div className="text-sm opacity-75">5 minute time limit</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                  <CardDescription>Focus on specific first aid topics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {categories.map((category) => {
                      const categoryQuestions = questions.filter((q) => q.category === category)
                      return (
                        <Button
                          key={category}
                          variant="outline"
                          className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-md transition-all duration-300 bg-transparent"
                          onClick={() => startQuiz(category, "All")}
                        >
                          <Heart className="w-6 h-6 text-red-600" />
                          <div className="text-center">
                            <div className="font-medium text-sm">{category}</div>
                            <Badge variant="secondary" className="text-xs mt-1">
                              {categoryQuestions.length} questions
                            </Badge>
                          </div>
                        </Button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="custom" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="w-5 h-5 mr-2" />
                      Quiz Settings
                    </CardTitle>
                    <CardDescription>Customize your quiz experience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Category</Label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full mt-2 p-3 border rounded-lg bg-white"
                      >
                        <option value="All">All Categories</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label>Difficulty</Label>
                      <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="w-full mt-2 p-3 border rounded-lg bg-white"
                      >
                        <option value="All">All Difficulties</option>
                        {difficulties.map((difficulty) => (
                          <option key={difficulty} value={difficulty}>
                            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label>Time Limit</Label>
                      <Slider
                        value={[timeLimit / 60]}
                        onValueChange={([value]) => setTimeLimit(value * 60)}
                        max={15}
                        min={0}
                        step={1}
                        className="mt-3"
                      />
                      <div className="text-sm text-gray-500 mt-2">
                        {timeLimit === 0 ? "No time limit" : `${timeLimit / 60} minutes`}
                      </div>
                    </div>

                    <Button
                      onClick={() => startQuiz(selectedCategory, selectedDifficulty, timeLimit)}
                      className="w-full"
                      size="lg"
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      Start Custom Quiz
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Plus className="w-5 h-5 mr-2" />
                        Add Questions
                      </div>
                      <Dialog open={showCustomQuestionDialog} onOpenChange={setShowCustomQuestionDialog}>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Create Question
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Create Custom Question</DialogTitle>
                            <DialogDescription>Add your own first aid question to the quiz database</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <Label>Category</Label>
                                <Input
                                  value={newQuestion.category}
                                  onChange={(e) => setNewQuestion((prev) => ({ ...prev, category: e.target.value }))}
                                  placeholder="e.g., CPR, Burns"
                                />
                              </div>
                              <div>
                                <Label>Difficulty</Label>
                                <select
                                  value={newQuestion.difficulty}
                                  onChange={(e) =>
                                    setNewQuestion((prev) => ({
                                      ...prev,
                                      difficulty: e.target.value as "easy" | "medium" | "hard",
                                    }))
                                  }
                                  className="w-full mt-2 p-2 border rounded-md"
                                >
                                  <option value="easy">Easy</option>
                                  <option value="medium">Medium</option>
                                  <option value="hard">Hard</option>
                                </select>
                              </div>
                            </div>

                            <div>
                              <Label>Question</Label>
                              <Input
                                value={newQuestion.question}
                                onChange={(e) => setNewQuestion((prev) => ({ ...prev, question: e.target.value }))}
                                placeholder="Enter your question here"
                              />
                            </div>

                            <div>
                              <Label>Answer Options</Label>
                              <div className="space-y-2 mt-2">
                                {newQuestion.options.map((option, index) => (
                                  <div key={index} className="flex items-center space-x-2">
                                    <input
                                      type="radio"
                                      name="correctAnswer"
                                      checked={newQuestion.correctAnswer === index}
                                      onChange={() => setNewQuestion((prev) => ({ ...prev, correctAnswer: index }))}
                                      className="text-green-600"
                                    />
                                    <Input
                                      value={option}
                                      onChange={(e) => updateQuestionOption(index, e.target.value)}
                                      placeholder={`Option ${index + 1}`}
                                      className="flex-1"
                                    />
                                  </div>
                                ))}
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                Select the radio button next to the correct answer
                              </p>
                            </div>

                            <div>
                              <Label>Explanation</Label>
                              <Input
                                value={newQuestion.explanation}
                                onChange={(e) => setNewQuestion((prev) => ({ ...prev, explanation: e.target.value }))}
                                placeholder="Explain why this answer is correct"
                              />
                            </div>

                            <div className="flex gap-2 pt-4">
                              <Button onClick={addCustomQuestion} className="flex-1">
                                Add Question
                              </Button>
                              <Button variant="outline" onClick={() => setShowCustomQuestionDialog(false)}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardTitle>
                    <CardDescription>Contribute to the question database</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Create Custom Questions</h3>
                      <p className="text-gray-600 mb-4">
                        Add your own first aid questions to help others learn and test your knowledge creation skills.
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-blue-600">
                            {questions.length - defaultQuestions.length}
                          </div>
                          <div className="text-gray-600">Custom Questions</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-green-600">{questions.length}</div>
                          <div className="text-gray-600">Total Questions</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
                    Quiz History
                  </CardTitle>
                  <CardDescription>Your recent quiz performance and progress</CardDescription>
                </CardHeader>
                <CardContent>
                  {results.length === 0 ? (
                    <div className="text-center py-12">
                      <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No quiz results yet</h3>
                      <p className="text-gray-600">Take your first quiz to see your progress here!</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {results.slice(0, 10).map((result, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">{result.category}</Badge>
                              <Badge className={getDifficultyColor(result.difficulty)}>{result.difficulty}</Badge>
                            </div>
                            <div>
                              <span
                                className={`font-semibold text-lg ${getScoreColor(result.score, result.totalQuestions)}`}
                              >
                                {result.score}/{result.totalQuestions}
                              </span>
                              <span className="text-sm text-gray-600 ml-2">
                                ({Math.round((result.score / result.totalQuestions) * 100)}%)
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{formatTime(result.timeSpent)}</span>
                            </div>
                            <span>{format(result.date, "MMM d")}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }

  if (gameState === "playing") {
    const currentQuestion = currentQuestions[currentQuestionIndex]
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="max-w-4xl mx-auto">
            {/* Progress Header */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
                <h1 className="text-xl sm:text-2xl font-bold">First Aid Quiz</h1>
                <div className="flex items-center gap-4">
                  <Badge variant="outline">{selectedCategory}</Badge>
                  <Badge className={getDifficultyColor(selectedDifficulty)}>{selectedDifficulty}</Badge>
                  {timeLimit > 0 && (
                    <Badge variant="outline" className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatTime(timeLeft)}
                    </Badge>
                  )}
                  <span className="text-sm text-gray-600">
                    {currentQuestionIndex + 1} of {currentQuestions.length}
                  </span>
                </div>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            {/* Question Card */}
            <Card className="mb-6 shadow-xl">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                      {currentQuestion.difficulty}
                    </Badge>
                    <Badge variant="outline">{currentQuestion.category}</Badge>
                  </div>
                  <div className="text-sm text-gray-600">Question {currentQuestionIndex + 1}</div>
                </div>
                <CardTitle className="text-xl sm:text-2xl mt-4 leading-relaxed">{currentQuestion.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {currentQuestion.options.map((option, index) => {
                    let buttonVariant: "default" | "outline" | "destructive" | "secondary" = "outline"
                    let buttonClass = "text-left justify-start h-auto p-4 sm:p-6"

                    if (showExplanation) {
                      if (index === currentQuestion.correctAnswer) {
                        buttonVariant = "default"
                        buttonClass += " bg-green-600 hover:bg-green-700 text-white border-green-600"
                      } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                        buttonVariant = "destructive"
                      }
                    } else if (selectedAnswer === index) {
                      buttonVariant = "secondary"
                    }

                    return (
                      <Button
                        key={index}
                        variant={buttonVariant}
                        className={`w-full ${buttonClass} transition-all duration-300 hover:shadow-md`}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showExplanation}
                      >
                        <div className="flex items-center space-x-4 w-full">
                          <span className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="flex-1 text-left">{option}</span>
                          {showExplanation && index === currentQuestion.correctAnswer && (
                            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                          )}
                          {showExplanation && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                            <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                          )}
                        </div>
                      </Button>
                    )
                  })}
                </div>

                {/* Explanation */}
                {showExplanation && (
                  <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-3">Explanation</h4>
                        <p className="text-blue-800 leading-relaxed">{currentQuestion.explanation}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Next Button */}
                {showExplanation && (
                  <div className="mt-8 text-center">
                    <Button onClick={nextQuestion} size="lg" className="px-8">
                      {currentQuestionIndex < currentQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                      <span className="ml-2">→</span>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Score Display */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Current Score</p>
                      <p className="text-2xl font-bold text-green-600">{score}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Progress</p>
                      <p className="text-2xl font-bold">
                        {currentQuestionIndex + 1}/{currentQuestions.length}
                      </p>
                    </div>
                    {timeLimit > 0 && (
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Time Left</p>
                        <p className={`text-2xl font-bold ${timeLeft < 60 ? "text-red-600" : "text-blue-600"}`}>
                          {formatTime(timeLeft)}
                        </p>
                      </div>
                    )}
                  </div>
                  <Button variant="outline" onClick={resetQuiz}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Restart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (gameState === "results") {
    const percentage = Math.round((score / currentQuestions.length) * 100)
    const timeSpent = results[0]?.timeSpent || 0

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* Results Header */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-blue-600" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Quiz Complete!</h1>
              <p className="text-lg text-gray-600">Here's how you performed</p>
            </div>

            {/* Score Card */}
            <Card className="mb-8 shadow-xl">
              <CardContent className="pt-8 pb-8">
                <div className="text-center mb-8">
                  <div
                    className={`text-5xl sm:text-6xl font-bold mb-4 ${getScoreColor(score, currentQuestions.length)}`}
                  >
                    {percentage}%
                  </div>
                  <p className="text-xl text-gray-600 mb-6">
                    {score} out of {currentQuestions.length} correct
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                    <div>
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-semibold">{selectedCategory}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Difficulty</p>
                      <p className="font-semibold">{selectedDifficulty}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Time Spent</p>
                      <p className="font-semibold">{formatTime(timeSpent)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Accuracy</p>
                      <p className="font-semibold">{percentage}%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Message */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                {percentage >= 80 ? (
                  <div className="text-center text-green-700">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
                    <h3 className="text-xl font-bold mb-3">Excellent Work!</h3>
                    <p className="text-lg">
                      You have a strong understanding of first aid principles. Keep up the great work!
                    </p>
                  </div>
                ) : percentage >= 60 ? (
                  <div className="text-center text-yellow-700">
                    <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
                    <h3 className="text-xl font-bold mb-3">Good Effort!</h3>
                    <p className="text-lg">
                      You're on the right track. Review the explanations and try again to improve your score.
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-red-700">
                    <XCircle className="w-16 h-16 mx-auto mb-4 text-red-600" />
                    <h3 className="text-xl font-bold mb-3">Keep Learning!</h3>
                    <p className="text-lg">
                      First aid knowledge takes practice. Review the material and try the quiz again.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => startQuiz(selectedCategory, selectedDifficulty, timeLimit)}
                size="lg"
                className="px-8"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Try Again
              </Button>
              <Button variant="outline" onClick={resetQuiz} size="lg" className="px-8 bg-transparent">
                New Quiz
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
