
"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Heart,
  Thermometer,
  Weight,
  Moon,
  Brain,
  Calendar,
  BarChart3,
  PieChart,
  Target,
  Award,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, Pie } from "recharts";

export default function HealthAnalyticsPage() {
  const [healthData, setHealthData] = useState([]);
  const [aiInsights, setAiInsights] = useState(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);

  // Sample health data
  const vitalsData = [
    { date: "2025-06-20", bloodPressure: 125, heartRate: 75, weight: 165, sleep: 7.5, steps: 8500 },
    { date: "2025-06-21", bloodPressure: 120, heartRate: 72, weight: 164, sleep: 8.0, steps: 9200 },
    { date: "2025-06-22", bloodPressure: 118, heartRate: 70, weight: 164, sleep: 7.0, steps: 7800 },
    { date: "2025-06-23", bloodPressure: 122, heartRate: 74, weight: 163, sleep: 8.5, steps: 10500 },
    { date: "2025-06-24", bloodPressure: 119, heartRate: 71, weight: 163, sleep: 7.5, steps: 9800 },
    { date: "2025-06-25", bloodPressure: 121, heartRate: 73, weight: 162, sleep: 8.0, steps: 11200 },
    { date: "2025-06-26", bloodPressure: 117, heartRate: 69, weight: 162, sleep: 8.5, steps: 12000 },
  ];

  const symptomsData = [
    { name: "Headache", value: 15, color: "#ff6b6b" },
    { name: "Fatigue", value: 25, color: "#4ecdc4" },
    { name: "Anxiety", value: 20, color: "#45b7d1" },
    { name: "Joint Pain", value: 18, color: "#96ceb4" },
    { name: "Sleep Issues", value: 22, color: "#feca57" },
  ];

  const healthGoals = [
    { name: "Daily Steps", target: 10000, current: 9500, unit: "steps", progress: 95 },
    { name: "Sleep Hours", target: 8, current: 7.8, unit: "hours", progress: 97 },
    { name: "Water Intake", target: 8, current: 6, unit: "glasses", progress: 75 },
    { name: "Exercise Days", target: 5, current: 3, unit: "days/week", progress: 60 },
  ];

  const generateAIInsights = async () => {
    setIsLoadingInsights(true);
    try {
      const response = await fetch("/api/health-insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vitalsData,
          symptomsData,
          healthGoals,
        }),
      });

      if (response.ok) {
        const insights = await response.json();
        setAiInsights(insights);
      }
    } catch (error) {
      console.error("Error generating insights:", error);
      // Fallback insights
      setAiInsights({
        overallScore: 78,
        trends: [
          { metric: "Blood Pressure", trend: "improving", change: -3.2 },
          { metric: "Heart Rate", trend: "stable", change: 0.5 },
          { metric: "Weight", trend: "improving", change: -1.8 },
        ],
        recommendations: [
          "Your blood pressure shows a positive downward trend. Keep up the good work!",
          "Consider increasing your daily water intake to meet your hydration goals.",
          "Your sleep patterns are excellent. Maintaining 8+ hours is beneficial for recovery.",
        ],
        riskFactors: [
          "Exercise frequency is below target. Aim for 5 days per week.",
          "Monitor stress levels, as anxiety symptoms have increased slightly.",
        ],
      });
    } finally {
      setIsLoadingInsights(false);
    }
  };

  useEffect(() => {
    generateAIInsights();
  }, []);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "declining":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-blue-600" />;
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 90) return "bg-green-500";
    if (progress >= 70) return "bg-blue-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center">
          <TrendingUp className="w-8 h-8 mr-3 text-blue-600" />
          Health Analytics Dashboard
        </h1>
        <p className="text-gray-600">AI-powered insights into your health trends and patterns</p>
      </div>

      {/* Health Score Card */}
      {aiInsights && (
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Overall Health Score</h2>
                <p className="text-blue-100">Based on your recent health data and trends</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{aiInsights.overallScore}</div>
                <Badge className="bg-white text-blue-600">
                  <Award className="w-4 h-4 mr-1" />
                  Good
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Health Trends</TabsTrigger>
          <TabsTrigger value="goals">Health Goals</TabsTrigger>
          <TabsTrigger value="symptoms">Symptom Tracking</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Blood Pressure Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-500" />
                  Blood Pressure Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={vitalsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="bloodPressure" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Heart Rate Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-green-500" />
                  Heart Rate Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={vitalsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="heartRate" stroke="#22c55e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Weight Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Weight className="w-5 h-5 mr-2 text-blue-500" />
                  Weight Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={vitalsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Activity Tracking */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-purple-500" />
                  Daily Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={vitalsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="steps" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-green-600" />
                Health Goals Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {healthGoals.map((goal, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{goal.name}</h3>
                      <Badge variant="outline">
                        {goal.current}/{goal.target} {goal.unit}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(goal.progress)}`}
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="symptoms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-5 h-5 mr-2 text-purple-600" />
                Symptom Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={symptomsData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {symptomsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Symptom Breakdown</h3>
                  {symptomsData.map((symptom, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: symptom.color }}
                        />
                        <span className="font-medium">{symptom.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">{symptom.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          {aiInsights && (
            <>
              {/* Trend Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                    Trend Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {aiInsights.trends.map((trend, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{trend.metric}</h3>
                          {getTrendIcon(trend.trend)}
                        </div>
                        <div className="text-2xl font-bold mb-1">
                          {trend.change > 0 ? "+" : ""}{trend.change}%
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {trend.trend}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-purple-600" />
                    AI-Powered Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aiInsights.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm text-green-800">{rec}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Risk Factors */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aiInsights.riskFactors.map((risk, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-orange-800">{risk}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          <Card>
            <CardContent className="p-6 text-center">
              <Button onClick={generateAIInsights} disabled={isLoadingInsights}>
                {isLoadingInsights ? (
                  <>
                    <Brain className="w-4 h-4 mr-2 animate-pulse" />
                    Generating Insights...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Refresh AI Insights
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
