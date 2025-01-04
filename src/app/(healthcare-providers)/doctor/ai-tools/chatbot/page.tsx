'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Define message type
type Message = {
  role: 'user' | 'system';
  content: string;
  timestamp: string;
}

export default function AIChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'system', 
      content: 'Hello! I am your AI assistant, trained to aid doctors with patient management, diagnostics, and daily tasks. How can I assist you today?', 
      timestamp: new Date().toLocaleTimeString() 
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString()
    }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    try {
      // Initialize Gemini API
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '')
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })

      // Prepare conversation history for context
      const conversationHistory = updatedMessages
        .map(msg => `${msg.role === 'user' ? 'User:' : 'Assistant:'} ${msg.content}`)
        .join('\n')

      // Craft a specialized prompt for doctor-specific assistance
      const prompt = `You are a professional AI assistant designed to help doctors with their daily tasks. 
      Your responsibilities include:
      - Assisting with patient management and providing structured patient summaries.
      - Offering diagnostic suggestions based on symptoms provided.
      - Scheduling tasks and helping with medical documentation.
      - Acting in a friendly yet professional manner.

      Context of the conversation so far:
      ${conversationHistory}

      Respond professionally and naturally to the latest user message: "${input}"`

      // Generate AI response
      const result = await model.generateContent(prompt)
      const response = await result.response
      const rawText = response.text()

      // Clean and format the AI response
      const cleanText = rawText
        .replace(/\*\*/g, '') // Remove double asterisks
        .replace(/\n+/g, '\n') // Collapse redundant newlines
        .trim()

      // Add AI response to messages
      setMessages(prev => [
        ...prev, 
        { 
          role: 'system', 
          content: cleanText, 
          timestamp: new Date().toLocaleTimeString() 
        }
      ])
    } catch (error) {
      console.error('Error generating AI response:', error)
      setMessages(prev => [
        ...prev, 
        { 
          role: 'system', 
          content: 'Sorry, I encountered an error. Could you please try again?', 
          timestamp: new Date().toLocaleTimeString() 
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">AI Assistant for Doctors</h1>
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader className="text-center bg-gray-50 py-4 border-b">
          <CardTitle className="text-lg font-medium">Chat with your Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full rounded-md border p-4 mb-4 bg-gray-100">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'system' && (
                  <div className="mr-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                      AI
                    </div>
                  </div>
                )}
                <div 
                  className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                    msg.role === 'user' 
                      ? 'bg-primary text-primary-foreground text-right' 
                      : 'bg-white text-gray-800 text-left shadow-sm'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs text-gray-500 mt-1">{msg.timestamp}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-sm">
                  <p className="text-sm italic">Typing...</p>
                </div>
              </div>
            )}
          </ScrollArea>
          <div className="flex items-center space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
              disabled={isLoading}
              className="flex-grow"
            />
            <Button 
              onClick={handleSend} 
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
