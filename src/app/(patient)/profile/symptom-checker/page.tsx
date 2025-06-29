
"use client";

import { useState } from "react";
import { 
  Brain, 
  Search, 
  AlertTriangle, 
  Send, 
  Loader2,
  Stethoscope,
  Heart,
  Thermometer,
  Activity,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const commonSymptoms = [
    "Headache", "Fever", "Cough", "Fatigue", "Nausea", "Dizziness",
    "Chest pain", "Shortness of breath", "Abdominal pain", "Back pain",
    "Joint pain", "Muscle aches", "Sore throat", "Runny nose"
  ];

  const urgencyLevels = {
    low: { color: "bg-green-100 text-green-800", label: "Low Priority" },
    medium: { color: "bg-yellow-100 text-yellow-800", label: "Moderate Priority" },
    high: { color: "bg-red-100 text-red-800", label: "High Priority" },
    emergency: { color: "bg-red-600 text-white", label: "Emergency" }
  };

  const analyzeSymptoms = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/analyze-symptoms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symptoms: symptoms + " " + selectedSymptoms.join(" "),
          age: parseInt(age),
          gender,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysis(data);
      } else {
        throw new Error("Failed to analyze symptoms");
      }
    } catch (error) {
      console.error("Error analyzing symptoms:", error);
      // Fallback mock response for demo
      setAnalysis({
        possibleConditions: [
          { name: "Common Cold", probability: 75, description: "Viral upper respiratory infection" },
          { name: "Seasonal Allergies", probability: 45, description: "Allergic reaction to environmental factors" },
          { name: "Viral Infection", probability: 30, description: "General viral illness" }
        ],
        urgency: "low",
        recommendations: [
          "Get plenty of rest and stay hydrated",
          "Consider over-the-counter pain relievers",
          "Monitor symptoms for 24-48 hours",
          "Contact healthcare provider if symptoms worsen"
        ],
        redFlags: [
          "Difficulty breathing",
          "High fever above 103°F",
          "Severe chest pain"
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center">
          <Brain className="w-8 h-8 mr-3 text-purple-600" />
          AI Symptom Checker
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Describe your symptoms and get AI-powered insights about possible conditions and recommendations.
          This tool is not a substitute for professional medical advice.
        </p>
      </div>

      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <strong>Important:</strong> This AI symptom checker is for informational purposes only. 
          Always consult with a healthcare professional for proper diagnosis and treatment.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2 text-blue-600" />
              Describe Your Symptoms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Age</label>
                <Input
                  type="number"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Gender</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Common Symptoms</label>
              <div className="grid grid-cols-2 gap-2">
                {commonSymptoms.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => toggleSymptom(symptom)}
                    className={`p-2 text-sm rounded-lg border transition-all ${
                      selectedSymptoms.includes(symptom)
                        ? "bg-blue-100 border-blue-300 text-blue-800"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Additional Symptoms & Details</label>
              <Textarea
                placeholder="Describe any additional symptoms, when they started, severity, and any other relevant details..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={4}
              />
            </div>

            <Button 
              onClick={analyzeSymptoms} 
              disabled={isLoading || (!symptoms.trim() && selectedSymptoms.length === 0)}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Symptoms...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Analyze Symptoms
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Stethoscope className="w-5 h-5 mr-2 text-green-600" />
              Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!analysis ? (
              <div className="text-center py-12">
                <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Enter your symptoms above to get AI-powered analysis</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Urgency Level */}
                <div className="text-center">
                  <Badge className={`text-lg px-4 py-2 ${urgencyLevels[analysis.urgency].color}`}>
                    {urgencyLevels[analysis.urgency].label}
                  </Badge>
                </div>

                {/* Possible Conditions */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-blue-600" />
                    Possible Conditions
                  </h3>
                  <div className="space-y-3">
                    {analysis.possibleConditions?.map((condition, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{condition.name}</h4>
                          <Badge variant="outline">{condition.probability}% match</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{condition.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-red-500" />
                    Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {analysis.recommendations?.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Red Flags */}
                {analysis.redFlags && analysis.redFlags.length > 0 && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription>
                      <strong className="text-red-800">Seek immediate medical attention if you experience:</strong>
                      <ul className="mt-2 space-y-1">
                        {analysis.redFlags.map((flag, index) => (
                          <li key={index} className="text-sm text-red-700">• {flag}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Emergency Contact */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Emergency Situations</h3>
            <p className="text-red-700 mb-4">
              If you're experiencing a medical emergency, don't use this tool. Call emergency services immediately.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="destructive">
                <Phone className="w-4 h-4 mr-2" />
                Call 911
              </Button>
              <Button variant="outline" className="border-red-300 text-red-700">
                Find Emergency Room
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
