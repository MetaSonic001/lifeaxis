import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  FileText,
  Activity,
  Heart,
  Stethoscope,
  Video,
  Smartphone,
  Glasses,
  TrendingUp,
  Users,
  Clock,
  Star,
} from "lucide-react"

export default function WellnessToolsPage() {
  const basicTools = [
    {
      title: "Mindful Minutes",
      description: "Guided stress-relief exercises and mindfulness activities",
      icon: Brain,
      href: "/wellness-tools/mindful-minutes",
      color: "bg-blue-50 text-blue-600 hover:bg-blue-100",
      borderColor: "hover:border-blue-200",
      stats: "5+ exercises",
      difficulty: "Beginner",
    },
    {
      title: "Symptom Journal",
      description: "Log daily symptoms and track health trends over time",
      icon: FileText,
      href: "/wellness-tools/symptom-journal",
      color: "bg-green-50 text-green-600 hover:bg-green-100",
      borderColor: "hover:border-green-200",
      stats: "Daily tracking",
      difficulty: "Easy",
    },
    {
      title: "Healthy Habits Tracker",
      description: "Monitor water intake, sleep hours, and daily wellness habits",
      icon: Activity,
      href: "/wellness-tools/healthy-habits-tracker",
      color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
      borderColor: "hover:border-purple-200",
      stats: "5 habit types",
      difficulty: "Intermediate",
    },
    {
      title: "First Aid Quiz Game",
      description: "Learn essential first-aid skills through interactive quizzes",
      icon: Heart,
      href: "/wellness-tools/first-aid-quiz-game",
      color: "bg-red-50 text-red-600 hover:bg-red-100",
      borderColor: "hover:border-red-200",
      stats: "50+ questions",
      difficulty: "All levels",
    },
  ]

  const advancedTools = [
    {
      title: "AI Symptom Checker",
      description: "Get AI-powered insights on possible conditions",
      icon: Stethoscope,
      href: "/wellness-tools/ai-symptom-checker",
      color: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100",
      borderColor: "hover:border-indigo-200",
      badge: "Coming Soon",
      stats: "AI-powered",
    },
    {
      title: "Telemedicine Portal",
      description: "Video consultations and appointment management",
      icon: Video,
      href: "/wellness-tools/telemedicine-portal",
      color: "bg-teal-50 text-teal-600 hover:bg-teal-100",
      borderColor: "hover:border-teal-200",
      badge: "Coming Soon",
      stats: "HD video calls",
    },
    {
      title: "IoT Health Monitor",
      description: "Real-time health metrics from connected devices",
      icon: Smartphone,
      href: "/wellness-tools/iot-health-monitor",
      color: "bg-orange-50 text-orange-600 hover:bg-orange-100",
      borderColor: "hover:border-orange-200",
      badge: "Coming Soon",
      stats: "Real-time data",
    },
    {
      title: "VR Physical Therapy",
      description: "Immersive rehabilitation and exercise guidance",
      icon: Glasses,
      href: "/wellness-tools/vr-physical-therapy",
      color: "bg-pink-50 text-pink-600 hover:bg-pink-100",
      borderColor: "hover:border-pink-200",
      badge: "Coming Soon",
      stats: "3D exercises",
    },
  ]

  const quickStats = [
    { label: "Active Users", value: "2.5K+", icon: Users, color: "text-blue-600" },
    { label: "Sessions Today", value: "847", icon: TrendingUp, color: "text-green-600" },
    { label: "Avg. Session", value: "12 min", icon: Clock, color: "text-purple-600" },
    { label: "User Rating", value: "4.8/5", icon: Star, color: "text-yellow-600" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            <Heart className="w-4 h-4 mr-2" />
            Your Wellness Journey Starts Here
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Wellness <span className="text-blue-600">Tools</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Comprehensive digital health tools to support your wellness journey. Track symptoms, build healthy habits,
            learn first aid, and practice mindfulness with our interactive platform.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {quickStats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-4 sm:pt-6">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-2 sm:mb-3`}
                >
                  <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Available Tools */}
        <div className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Available Tools</h2>
              <p className="text-gray-600">Start your wellness journey with these interactive tools</p>
            </div>
            <Badge variant="outline" className="self-start sm:self-auto mt-2 sm:mt-0">
              4 Tools Available
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            {basicTools.map((tool, index) => (
              <Card
                key={tool.title}
                className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent ${tool.borderColor} cursor-pointer`}
              >
                <CardHeader className="pb-3 sm:pb-4">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${tool.color} flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-110`}
                  >
                    <tool.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg sm:text-xl group-hover:text-blue-600 transition-colors">
                      {tool.title}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {tool.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm sm:text-base leading-relaxed">{tool.description}</CardDescription>
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {tool.stats}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    asChild
                    className="w-full group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
                  >
                    <Link href={tool.href} className="flex items-center justify-center">
                      Get Started
                      <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Advanced Features */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Advanced Features</h2>
              <p className="text-gray-600">Cutting-edge wellness technology coming soon</p>
            </div>
            <Badge variant="outline" className="self-start sm:self-auto mt-2 sm:mt-0">
              In Development
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            {advancedTools.map((tool, index) => (
              <Card
                key={tool.title}
                className={`group hover:shadow-lg transition-all duration-300 opacity-75 hover:opacity-90 border-2 border-transparent ${tool.borderColor}`}
              >
                <CardHeader className="pb-3 sm:pb-4">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${tool.color} flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300`}
                  >
                    <tool.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg sm:text-xl">{tool.title}</CardTitle>
                    {tool.badge && (
                      <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                        {tool.badge}
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-sm sm:text-base leading-relaxed">{tool.description}</CardDescription>
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {tool.stats}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button disabled className="w-full">
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 sm:mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="py-8 sm:py-12">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start Your Wellness Journey?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Join thousands of users who are already improving their health with our comprehensive wellness tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/wellness-tools/mindful-minutes">Start with Mindfulness</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                  asChild
                >
                  <Link href="/wellness-tools/healthy-habits-tracker">Track Your Habits</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
