"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function AIChatbotPage() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Hello! I\'m your AI assistant. How can I help you today?' }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])
      // Here you would typically send the input to your AI backend and get a response
      // For now, we'll just echo the input
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'system', content: `You said: ${input}` }])
      }, 1000)
      setInput('')
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">AI Chatbot</h1>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Chat with AI Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full rounded-md border p-4 mb-4">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block rounded px-2 py-1 ${
                  msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                }`}>
                  {msg.content}
                </span>
              </div>
            ))}
          </ScrollArea>
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button onClick={handleSend}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

