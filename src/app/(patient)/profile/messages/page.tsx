
"use client";

import { useState, useEffect } from "react";
import {
  MessageCircle,
  Send,
  Search,
  Plus,
  User,
  Clock,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function MessagesPage() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Initialize with sample conversations
    const sampleConversations = [
      {
        id: 1,
        doctorName: "Dr. Sarah Johnson",
        specialty: "Cardiology",
        lastMessage: "Your test results look good. Let's schedule a follow-up.",
        lastMessageTime: "2025-06-28 14:30",
        unreadCount: 2,
        avatar: "SJ",
        messages: [
          {
            id: 1,
            sender: "doctor",
            content: "Hello! I've reviewed your recent blood work results.",
            timestamp: "2025-06-28 14:25",
          },
          {
            id: 2,
            sender: "doctor",
            content: "Your test results look good. Let's schedule a follow-up.",
            timestamp: "2025-06-28 14:30",
          },
        ],
      },
      {
        id: 2,
        doctorName: "Dr. Michael Chen",
        specialty: "General Practice",
        lastMessage: "Thank you for the update. Take care!",
        lastMessageTime: "2025-06-27 10:15",
        unreadCount: 0,
        avatar: "MC",
        messages: [
          {
            id: 1,
            sender: "patient",
            content: "Hi Dr. Chen, I wanted to update you on my symptoms.",
            timestamp: "2025-06-27 09:30",
          },
          {
            id: 2,
            sender: "patient",
            content: "The headaches have been much better since starting the new medication.",
            timestamp: "2025-06-27 09:31",
          },
          {
            id: 3,
            sender: "doctor",
            content: "That's great news! I'm glad the medication is helping.",
            timestamp: "2025-06-27 10:10",
          },
          {
            id: 4,
            sender: "doctor",
            content: "Thank you for the update. Take care!",
            timestamp: "2025-06-27 10:15",
          },
        ],
      },
      {
        id: 3,
        doctorName: "Dr. Emily Davis",
        specialty: "Dermatology",
        lastMessage: "Please send me a photo of the affected area.",
        lastMessageTime: "2025-06-26 16:45",
        unreadCount: 1,
        avatar: "ED",
        messages: [
          {
            id: 1,
            sender: "patient",
            content: "Hi Dr. Davis, I have a question about the rash we discussed.",
            timestamp: "2025-06-26 16:20",
          },
          {
            id: 2,
            sender: "doctor",
            content: "Of course! What would you like to know?",
            timestamp: "2025-06-26 16:40",
          },
          {
            id: 3,
            sender: "doctor",
            content: "Please send me a photo of the affected area.",
            timestamp: "2025-06-26 16:45",
          },
        ],
      },
    ];
    
    setConversations(sampleConversations);
    if (sampleConversations.length > 0) {
      setSelectedConversation(sampleConversations[0]);
    }
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const message = {
        id: Date.now(),
        sender: "patient",
        content: newMessage,
        timestamp: new Date().toISOString(),
      };

      const updatedConversations = conversations.map(conv => {
        if (conv.id === selectedConversation.id) {
          return {
            ...conv,
            messages: [...conv.messages, message],
            lastMessage: newMessage,
            lastMessageTime: new Date().toISOString(),
          };
        }
        return conv;
      });

      setConversations(updatedConversations);
      setSelectedConversation({
        ...selectedConversation,
        messages: [...selectedConversation.messages, message],
      });
      setNewMessage("");
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex">
      {/* Conversations List */}
      <div className="w-1/3 border-r bg-white">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold flex items-center">
              <MessageCircle className="w-6 h-6 mr-2 text-blue-600" />
              Messages
            </h1>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-1" />
              New
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Search conversations..." 
              className="pl-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-y-auto h-full">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedConversation?.id === conversation.id ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">{conversation.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {conversation.doctorName}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {conversation.unreadCount > 0 && (
                        <Badge className="bg-blue-600 text-white text-xs">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                      <span className="text-xs text-gray-500">
                        {formatTime(conversation.lastMessageTime)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{conversation.specialty}</p>
                  <p className="text-sm text-gray-500 truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {selectedConversation.avatar}
                  </span>
                </div>
                <div>
                  <h2 className="font-semibold">{selectedConversation.doctorName}</h2>
                  <p className="text-sm text-gray-600">{selectedConversation.specialty}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Video className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "patient" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === "patient"
                          ? "bg-blue-600 text-white"
                          : "bg-white border shadow-sm"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === "patient" ? "text-blue-100" : "text-gray-500"
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600">No conversation selected</h3>
              <p className="text-gray-500">Choose a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
