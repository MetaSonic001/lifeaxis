
"use client";

import { useState, useEffect } from "react";
import {
  Wind,
  Play,
  Pause,
  RotateCcw,
  Heart,
  Timer,
  Target,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BreathingActivityPage() {
  const [breathingState, setBreathingState] = useState("idle");
  const [breathingCount, setBreathingCount] = useState(0);
  const [breathingCycle, setBreathingCycle] = useState(0);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathingTimer, setBreathingTimer] = useState(null);
  const [selectedTechnique, setSelectedTechnique] = useState("4-7-8");
  const [sessionHistory, setSessionHistory] = useState([]);

  const techniques = {
    "4-7-8": {
      name: "4-7-8 Technique",
      description: "Inhale for 4, hold for 7, exhale for 8 seconds",
      phases: { inhale: 4, hold: 7, exhale: 8 },
      benefits: ["Reduces anxiety", "Improves sleep", "Lowers stress"],
    },
    "box": {
      name: "Box Breathing",
      description: "Inhale, hold, exhale, hold for 4 seconds each",
      phases: { inhale: 4, hold1: 4, exhale: 4, hold2: 4 },
      benefits: ["Improves focus", "Calms nervous system", "Enhances performance"],
    },
    "simple": {
      name: "Simple Breathing",
      description: "Inhale for 4, exhale for 6 seconds",
      phases: { inhale: 4, exhale: 6 },
      benefits: ["Easy to learn", "Quick stress relief", "Portable technique"],
    },
  };

  useEffect(() => {
    // Load session history from localStorage
    const history = JSON.parse(localStorage.getItem("breathing_sessions") || "[]");
    setSessionHistory(history);

    return () => {
      if (breathingTimer) {
        clearInterval(breathingTimer);
      }
    };
  }, [breathingTimer]);

  const startBreathingExercise = () => {
    setIsBreathingActive(true);
    setBreathingState("inhale");
    setBreathingCount(techniques[selectedTechnique].phases.inhale);
    setBreathingCycle(0);

    const timer = setInterval(() => {
      setBreathingCount((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          setBreathingState((currentState) => {
            const technique = techniques[selectedTechnique];
            
            if (selectedTechnique === "4-7-8") {
              if (currentState === "inhale") {
                setBreathingCount(technique.phases.hold);
                return "hold";
              } else if (currentState === "hold") {
                setBreathingCount(technique.phases.exhale);
                return "exhale";
              } else {
                setBreathingCount(technique.phases.inhale);
                setBreathingCycle((prev) => prev + 1);
                return "inhale";
              }
            } else if (selectedTechnique === "box") {
              if (currentState === "inhale") {
                setBreathingCount(technique.phases.hold1);
                return "hold1";
              } else if (currentState === "hold1") {
                setBreathingCount(technique.phases.exhale);
                return "exhale";
              } else if (currentState === "exhale") {
                setBreathingCount(technique.phases.hold2);
                return "hold2";
              } else {
                setBreathingCount(technique.phases.inhale);
                setBreathingCycle((prev) => prev + 1);
                return "inhale";
              }
            } else {
              if (currentState === "inhale") {
                setBreathingCount(technique.phases.exhale);
                return "exhale";
              } else {
                setBreathingCount(technique.phases.inhale);
                setBreathingCycle((prev) => prev + 1);
                return "inhale";
              }
            }
          });
          return prev;
        }
      });
    }, 1000);

    setBreathingTimer(timer);
  };

  const stopBreathingExercise = () => {
    setIsBreathingActive(false);
    setBreathingState("idle");
    setBreathingCount(0);
    
    // Save session to history
    if (breathingCycle > 0) {
      const session = {
        id: Date.now(),
        technique: selectedTechnique,
        cycles: breathingCycle,
        date: new Date().toISOString().split("T")[0],
        duration: breathingCycle * (Object.values(techniques[selectedTechnique].phases).reduce((a, b) => a + b, 0)),
      };
      
      const updatedHistory = [session, ...sessionHistory].slice(0, 10);
      setSessionHistory(updatedHistory);
      localStorage.setItem("breathing_sessions", JSON.stringify(updatedHistory));
    }
    
    setBreathingCycle(0);
    if (breathingTimer) {
      clearInterval(breathingTimer);
      setBreathingTimer(null);
    }
  };

  const resetBreathingExercise = () => {
    stopBreathingExercise();
  };

  const getBreathingInstruction = () => {
    switch (breathingState) {
      case "inhale": return "Breathe In";
      case "hold":
      case "hold1":
      case "hold2": return "Hold";
      case "exhale": return "Breathe Out";
      default: return "Ready to Begin";
    }
  };

  const getBreathingColor = () => {
    switch (breathingState) {
      case "inhale": return "from-blue-400 to-blue-600";
      case "hold":
      case "hold1":
      case "hold2": return "from-yellow-400 to-yellow-600";
      case "exhale": return "from-green-400 to-green-600";
      default: return "from-gray-400 to-gray-600";
    }
  };

  const getCircleScale = () => {
    switch (breathingState) {
      case "inhale": return "scale-150";
      case "hold":
      case "hold1":
      case "hold2": return "scale-150";
      case "exhale": return "scale-75";  
      default: return "scale-100";
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center">
          <Wind className="w-8 h-8 mr-3 text-blue-600" />
          Breathing Exercises
        </h1>
        <p className="text-gray-600">Practice mindful breathing to reduce stress and improve well-being</p>
      </div>

      {/* Technique Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Your Technique</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(techniques).map(([key, technique]) => (
              <div
                key={key}
                onClick={() => !isBreathingActive && setSelectedTechnique(key)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedTechnique === key
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                } ${isBreathingActive ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <h3 className="font-semibold text-lg mb-2">{technique.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{technique.description}</p>
                <div className="space-y-1">
                  {technique.benefits.map((benefit, index) => (
                    <div key={index} className="text-xs text-green-600 flex items-center">
                      <div className="w-1 h-1 bg-green-600 rounded-full mr-2"></div>
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Breathing Animation */}
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8">
          <div className="text-center space-y-8">
            <div className="relative flex items-center justify-center h-80">
              <div
                className={`w-64 h-64 rounded-full bg-gradient-to-br ${getBreathingColor()} 
                  transition-all duration-1000 ease-in-out ${getCircleScale()} 
                  flex items-center justify-center shadow-2xl`}
              >
                <div className="text-white text-center">
                  <div className="text-2xl font-bold mb-2">{getBreathingInstruction()}</div>
                  {isBreathingActive && <div className="text-4xl font-mono">{breathingCount}</div>}
                </div>
              </div>

              <div
                className={`absolute w-80 h-80 rounded-full border-4 border-opacity-30 
                ${
                  breathingState === "inhale"
                    ? "border-blue-400 animate-ping"
                    : breathingState.includes("hold")
                      ? "border-yellow-400"
                      : breathingState === "exhale"
                        ? "border-green-400 animate-pulse"
                        : "border-gray-400"
                }`}
              ></div>
            </div>

            <div className="space-y-4">
              <div className="text-lg text-gray-700">
                {!isBreathingActive
                  ? `Click start to begin ${techniques[selectedTechnique].name}`
                  : `Cycle ${breathingCycle + 1} - ${getBreathingInstruction()}`}
              </div>

              <div className="flex justify-center space-x-4">
                {!isBreathingActive ? (
                  <Button
                    onClick={startBreathingExercise}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Exercise
                  </Button>
                ) : (
                  <>
                    <Button onClick={stopBreathingExercise} variant="outline" className="px-6 py-3">
                      <Pause className="w-5 h-5 mr-2" />
                      Finish
                    </Button>
                    <Button onClick={resetBreathingExercise} variant="outline" className="px-6 py-3">
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Reset
                    </Button>
                  </>
                )}
              </div>
            </div>

            {isBreathingActive && (
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-2">Completed Cycles</div>
                <div className="text-2xl font-bold text-blue-600">{breathingCycle}</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Session History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Timer className="w-5 h-5 mr-2 text-green-600" />
            Recent Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sessionHistory.length === 0 ? (
            <div className="text-center py-8">
              <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No sessions yet. Start your first breathing exercise!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sessionHistory.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Wind className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">{techniques[session.technique].name}</div>
                      <div className="text-sm text-gray-600">{session.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{session.cycles} cycles</div>
                    <div className="text-sm text-gray-600">{Math.floor(session.duration / 60)}m {session.duration % 60}s</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="w-5 h-5 mr-2 text-red-500" />
            Benefits of Breathing Exercises
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                Reduces anxiety and stress
              </div>
              <div className="flex items-center text-blue-600">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                Improves sleep quality
              </div>
              <div className="flex items-center text-purple-600">
                <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
                Lowers blood pressure
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-orange-600">
                <div className="w-2 h-2 bg-orange-600 rounded-full mr-2"></div>
                Enhances focus and concentration
              </div>
              <div className="flex items-center text-indigo-600">
                <div className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></div>
                Promotes relaxation
              </div>
              <div className="flex items-center text-teal-600">
                <div className="w-2 h-2 bg-teal-600 rounded-full mr-2"></div>
                Improves emotional regulation
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
