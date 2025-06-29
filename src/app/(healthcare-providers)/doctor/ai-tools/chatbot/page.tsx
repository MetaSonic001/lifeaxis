"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

// Define message type
type Message = {
  role: "user" | "system"
  content: string
  timestamp: string
}

export default function AIChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content:
        "Hello! I am your AI assistant, trained to aid doctors with patient management, diagnostics, and daily tasks. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString(),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setIsLoading(true)

    try {
      // Simulate AI response
      setTimeout(() => {
        const responses = [
          "I understand your concern. Based on the symptoms you've described, I recommend conducting a thorough examination and considering the following diagnostic approaches...",
          "That's an excellent question about patient management. Here are some evidence-based strategies you might consider...",
          "For this type of case, the current medical guidelines suggest a multi-step approach. Let me break this down for you...",
          "I can help you with that scheduling concern. Here are some efficient ways to optimize your patient appointments...",
          "Regarding the diagnostic criteria you mentioned, recent studies have shown that the most effective approach involves...",
        ]

        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            content: randomResponse,
            timestamp: new Date().toLocaleTimeString(),
          },
        ])
        setIsLoading(false)
      }, 2000)
    } catch (error) {
      console.error("Error generating AI response:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: "Sorry, I encountered an error. Could you please try again?",
          timestamp: new Date().toLocaleTimeString(),
        },
      ])
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (!isLoading && input.trim()) {
        handleSend()
      }
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          AI Assistant for Doctors
        </h1>
        <p className="text-slate-600">Your intelligent medical companion for daily practice</p>
      </div>

      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-t-lg">
          <CardTitle className="text-slate-700 flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">AI</span>
            </div>
            <span>Chat with your Assistant</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px] w-full p-6">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="flex items-start space-x-3 max-w-[80%]">
                    {msg.role === "system" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                        AI
                      </div>
                    )}
                    <div
                      className={`rounded-lg px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                          : "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 shadow-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <p className={`text-xs mt-2 ${msg.role === "user" ? "text-blue-100" : "text-slate-500"}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                    {msg.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                        U
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-sm">
                      AI
                    </div>
                    <div className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 px-4 py-3 rounded-lg shadow-sm">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                        <span className="text-sm italic text-slate-600">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-6 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
            <div className="flex items-center space-x-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-grow border-slate-200 focus:border-purple-400 bg-white"
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg px-6"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Send"
                )}
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-2">Press Enter to send, Shift+Enter for new line</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-t-lg">
          <CardTitle className="text-slate-700">Quick Tips</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-slate-700">Ask about:</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Patient symptoms and diagnosis</li>
                <li>• Treatment recommendations</li>
                <li>• Drug interactions and dosages</li>
                <li>• Medical procedures and protocols</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-slate-700">Get help with:</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Appointment scheduling</li>
                <li>• Medical documentation</li>
                <li>• Patient management</li>
                <li>• Clinical decision support</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
