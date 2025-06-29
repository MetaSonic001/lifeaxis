
"use client";

import { useState, useEffect } from "react";
import {
  Book,
  Plus,
  Calendar,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Download,
  TrendingUp,
  Heart,
  Moon,
  Zap,
  Brain,
  Target,
  Smile,
  Frown,
  Meh,
  Sun,
  Cloud,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function JournalPage() {
  const [journalEntries, setJournalEntries] = useState<{
    id: number;
    date: string;
    mood: string;
    painLevel: number;
    stressLevel: number;
    sleepQuality: string;
    hasMigraine: boolean;
    notes: string;
    symptoms: string[];
  }[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const [newEntry, setNewEntry] = useState({
    mood: "",
    painLevel: 0,
    stressLevel: 0,
    sleepQuality: "",
    hasMigraine: false,
    notes: "",
    date: new Date().toISOString().split("T")[0],
  });

  const moodOptions = [
    { id: "excellent", label: "Excellent", icon: Smile, color: "bg-green-500", textColor: "text-green-700" },
    { id: "happy", label: "Happy", icon: Smile, color: "bg-blue-500", textColor: "text-blue-700" },
    { id: "calm", label: "Calm", icon: Sun, color: "bg-yellow-500", textColor: "text-yellow-700" },
    { id: "neutral", label: "Neutral", icon: Meh, color: "bg-gray-500", textColor: "text-gray-700" },
    { id: "anxious", label: "Anxious", icon: Cloud, color: "bg-orange-500", textColor: "text-orange-700" },
    { id: "sad", label: "Sad", icon: Frown, color: "bg-indigo-500", textColor: "text-indigo-700" },
    { id: "stressed", label: "Stressed", icon: Flame, color: "bg-red-500", textColor: "text-red-700" },
    { id: "tired", label: "Tired", icon: Moon, color: "bg-purple-500", textColor: "text-purple-700" },
  ];

  const sleepOptions = [
    { id: "excellent", label: "Excellent", icon: Sun, color: "bg-green-500" },
    { id: "good", label: "Good", icon: Smile, color: "bg-blue-500" },
    { id: "fair", label: "Fair", icon: Meh, color: "bg-yellow-500" },
    { id: "poor", label: "Poor", icon: Frown, color: "bg-red-500" },
  ];

  const symptomOptions = [
    { id: "headache", label: "Headache", icon: Brain, color: "bg-red-100 text-red-700" },
    { id: "nausea", label: "Nausea", icon: Heart, color: "bg-green-100 text-green-700" },
    { id: "fatigue", label: "Fatigue", icon: Moon, color: "bg-purple-100 text-purple-700" },
    { id: "anxiety", label: "Anxiety", icon: Heart, color: "bg-orange-100 text-orange-700" },
    { id: "energetic", label: "Energetic", icon: Zap, color: "bg-yellow-100 text-yellow-700" },
    { id: "focused", label: "Focused", icon: Target, color: "bg-indigo-100 text-indigo-700" },
  ];

  useEffect(() => {
    // Load journal entries from localStorage
    const storedEntries = JSON.parse(localStorage.getItem("journal_entries") || "[]");
    
    if (storedEntries.length === 0) {
      // Initialize with sample entries
      const sampleEntries = [
        {
          id: 1,
          date: "2025-06-28",
          mood: "happy",
          painLevel: 2,
          stressLevel: 3,
          sleepQuality: "good",
          hasMigraine: false,
          notes: "Had a productive day at work. Feeling optimistic about the week ahead. Exercise routine is going well.",
          symptoms: ["energetic", "focused"],
        },
        {
          id: 2,
          date: "2025-06-27",
          mood: "anxious",
          painLevel: 4,
          stressLevel: 6,
          sleepQuality: "poor",
          hasMigraine: true,
          notes: "Dealing with a headache today. Work stress is affecting my sleep. Need to focus on stress management techniques.",
          symptoms: ["headache", "fatigue"],
        },
        {
          id: 3,
          date: "2025-06-26",
          mood: "calm",
          painLevel: 1,
          stressLevel: 2,
          sleepQuality: "excellent",
          hasMigraine: false,
          notes: "Great day overall. Had a relaxing evening with family. The new meditation app is really helping.",
          symptoms: ["energetic"],
        },
      ];
      setJournalEntries(sampleEntries);
      localStorage.setItem("journal_entries", JSON.stringify(sampleEntries));
    } else {
      setJournalEntries(storedEntries);
    }
  }, []);

  const saveEntry = () => {
    const entry = {
      ...newEntry,
      id: Date.now(),
      symptoms: selectedSymptoms,
    };
    
    const updatedEntries = [entry, ...journalEntries];
    setJournalEntries(updatedEntries);
    localStorage.setItem("journal_entries", JSON.stringify(updatedEntries));
    
    // Reset form
    setNewEntry({
      mood: "",
      painLevel: 0,
      stressLevel: 0,
      sleepQuality: "",
      hasMigraine: false,
      notes: "",
      date: new Date().toISOString().split("T")[0],
    });
    setSelectedSymptoms([]);
    setShowAddDialog(false);
  };

  const deleteEntry = (id) => {
    const updatedEntries = journalEntries.filter(entry => entry.id !== id);
    setJournalEntries(updatedEntries);
    localStorage.setItem("journal_entries", JSON.stringify(updatedEntries));
  };

interface Symptom {
    id: string;
    label: string;
    icon: React.ElementType;
    color: string;
}

const toggleSymptom = (symptomId: string): void => {
    setSelectedSymptoms((prev: string[]) =>
        prev.includes(symptomId) 
            ? prev.filter((id: string) => id !== symptomId) 
            : [...prev, symptomId]
    );
};

interface MoodOption {
    id: string;
    label: string;
    icon: React.ElementType;
    color: string;
    textColor: string;
}

const getMoodOption = (moodId: string): MoodOption => {
    return moodOptions.find((m: MoodOption) => m.id === moodId) || moodOptions[3];
};

  const getSleepOption = (sleepId) => {
    return sleepOptions.find(s => s.id === sleepId) || sleepOptions[2];
  };

  const getPainColor = (level) => {
    if (level <= 3) return "text-green-600";
    if (level <= 6) return "text-yellow-600";
    return "text-red-600";
  };

  const filteredEntries = journalEntries.filter(entry =>
    entry.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.mood.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInsights = () => {
    if (journalEntries.length === 0) return null;
    
    const avgPain = journalEntries.reduce((sum, entry) => sum + entry.painLevel, 0) / journalEntries.length;
    const avgStress = journalEntries.reduce((sum, entry) => sum + entry.stressLevel, 0) / journalEntries.length;
    const moodCounts = journalEntries.reduce<Record<string, number>>((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {});
    const mostCommonMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b);
    
    return { avgPain, avgStress, mostCommonMood };
  };

  const insights = getInsights();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Book className="w-8 h-8 mr-3 text-blue-600" />
            Health Journal
          </h1>
          <p className="text-gray-600 mt-2">Track your daily mood, symptoms, and overall well-being</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Entries
          </Button>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Journal Entry</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Date */}
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <Input
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                  />
                </div>

                {/* Mood Selection */}
                <div>
                  <label className="block text-sm font-medium mb-3">How are you feeling?</label>
                  <div className="grid grid-cols-4 gap-3">
                    {moodOptions.map((mood) => (
                      <button
                        key={mood.id}
                        onClick={() => setNewEntry({ ...newEntry, mood: mood.id })}
                        className={`p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                          newEntry.mood === mood.id
                            ? `${mood.color} text-white border-transparent shadow-lg`
                            : "bg-white border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <mood.icon className={`w-6 h-6 mx-auto mb-1 ${
                          newEntry.mood === mood.id ? "text-white" : mood.textColor
                        }`} />
                        <div className={`text-xs font-medium ${
                          newEntry.mood === mood.id ? "text-white" : "text-gray-700"
                        }`}>
                          {mood.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sleep Quality */}
                <div>
                  <label className="block text-sm font-medium mb-3">Sleep Quality</label>
                  <div className="grid grid-cols-4 gap-3">
                    {sleepOptions.map((sleep) => (
                      <button
                        key={sleep.id}
                        onClick={() => setNewEntry({ ...newEntry, sleepQuality: sleep.id })}
                        className={`p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                          newEntry.sleepQuality === sleep.id
                            ? `${sleep.color} text-white border-transparent shadow-lg`
                            : "bg-white border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <sleep.icon className={`w-5 h-5 mx-auto mb-1 ${
                          newEntry.sleepQuality === sleep.id ? "text-white" : "text-gray-600"
                        }`} />
                        <div className={`text-xs font-medium ${
                          newEntry.sleepQuality === sleep.id ? "text-white" : "text-gray-700"
                        }`}>
                          {sleep.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pain and Stress Levels */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Pain Level (0-10)</label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={newEntry.painLevel}
                        onChange={(e) => setNewEntry({ ...newEntry, painLevel: parseInt(e.target.value) })}
                        className="flex-1"
                      />
                      <span className={`font-semibold text-lg ${getPainColor(newEntry.painLevel)}`}>
                        {newEntry.painLevel}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Stress Level (0-10)</label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={newEntry.stressLevel}
                        onChange={(e) => setNewEntry({ ...newEntry, stressLevel: parseInt(e.target.value) })}
                        className="flex-1"
                      />
                      <span className={`font-semibold text-lg ${getPainColor(newEntry.stressLevel)}`}>
                        {newEntry.stressLevel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Symptoms */}
                <div>
                  <label className="block text-sm font-medium mb-3">Symptoms</label>
                  <div className="grid grid-cols-3 gap-3">
                    {symptomOptions.map((symptom) => (
                      <button
                        key={symptom.id}
                        onClick={() => toggleSymptom(symptom.id)}
                        className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                          selectedSymptoms.includes(symptom.id)
                            ? `${symptom.color} border-transparent shadow-md`
                            : "bg-white border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <symptom.icon className="w-5 h-5 mx-auto mb-1" />
                        <div className="text-xs font-medium">{symptom.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Migraine */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="migraine"
                    checked={newEntry.hasMigraine}
                    onChange={(e) => setNewEntry({ ...newEntry, hasMigraine: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="migraine" className="text-sm font-medium">
                    I experienced a migraine today
                  </label>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium mb-2">Notes</label>
                  <Textarea
                    value={newEntry.notes}
                    onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                    placeholder="How was your day? Any thoughts or observations..."
                    rows={4}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={saveEntry}>Save Entry</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Insights Cards */}
      {insights && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">{insights.avgPain.toFixed(1)}</div>
              <div className="text-sm text-blue-600">Average Pain Level</div>
            </CardContent>
          </Card>
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4 text-center">
              <Brain className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-700">{insights.avgStress.toFixed(1)}</div>
              <div className="text-sm text-orange-600">Average Stress Level</div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              {(() => {
                const MoodIcon = getMoodOption(insights.mostCommonMood).icon;
                return MoodIcon ? <MoodIcon className="w-8 h-8 text-green-600 mx-auto mb-2" /> : null;
              })()}
              <div className="text-lg font-bold text-green-700 capitalize">{insights.mostCommonMood}</div>
              <div className="text-sm text-green-600">Most Common Mood</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input 
          placeholder="Search journal entries..." 
          className="pl-10" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Journal Entries */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600">No journal entries found</h3>
              <p className="text-gray-500">Start tracking your daily health and mood</p>
            </CardContent>
          </Card>
        ) : (
          filteredEntries.map((entry) => {
            const moodOption = getMoodOption(entry.mood);
            const sleepOption = getSleepOption(entry.sleepQuality);
            
            return (
              <Card key={entry.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <moodOption.icon className={`w-6 h-6 ${moodOption.textColor}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h3 className="text-lg font-semibold">{entry.date}</h3>
                          <Badge className={`${moodOption.color} text-white`}>
                            {moodOption.label}
                          </Badge>
                          <Badge variant="outline">{sleepOption.label} Sleep</Badge>
                          {entry.hasMigraine && (
                            <Badge className="bg-red-100 text-red-800">Migraine</Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-6 mb-3 text-sm">
                          <span className={`font-medium ${getPainColor(entry.painLevel)}`}>
                            Pain: {entry.painLevel}/10
                          </span>
                          <span className={`font-medium ${getPainColor(entry.stressLevel)}`}>
                            Stress: {entry.stressLevel}/10
                          </span>
                        </div>

                        {entry.symptoms && entry.symptoms.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {entry.symptoms.map((symptomId) => {
                              const symptom = symptomOptions.find(s => s.id === symptomId);
                              return symptom ? (
                                <Badge key={symptomId} variant="outline" className="text-xs">
                                  {symptom.label}
                                </Badge>
                              ) : null;
                            })}
                          </div>
                        )}
                        
                        <p className="text-gray-700">{entry.notes}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => deleteEntry(entry.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
