"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { ChevronRight, Search } from "lucide-react"
import { useState } from "react"

const popularTests = [
  "Complete Blood Count",
  "Lipid Profile",
  "Thyroid Function Test",
  "Vitamin D Test",
  "HbA1c",
  "Liver Function Test",
]

const healthPackages = [
  {
    name: "Comprehensive Health Check",
    color: "blue",
    tests: ["Full body check-up", "Cardiac risk assessment", "Diabetes screening", "Cancer markers"],
  },
  {
    name: "Women's Wellness Package",
    color: "emerald",
    tests: ["Gynecological exam", "Mammography", "Pap smear", "Bone density scan"],
  },
  {
    name: "Senior Citizen Health Package",
    color: "purple",
    tests: [
      "Comprehensive geriatric assessment",
      "Vision and hearing tests",
      "Bone health assessment",
      "Cognitive function evaluation",
    ],
  },
]

export default function MedicalTestsSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    try {
      // Simulate search
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Search Results",
        description: `Found tests matching "${searchQuery}"`,
      })
    } catch (error) {
      toast({
        title: "Search Error",
        description: "Failed to search tests. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSearching(false)
    }
  }

  const handleBookPackage = (packageName: string) => {
    toast({
      title: "Book Package",
      description: `Booking ${packageName}...`,
    })
    // In a real app, this would open booking modal
    setTimeout(() => {
      toast({
        title: "Success",
        description: `${packageName} has been added to your cart.`,
      })
    }, 1500)
  }

  const handleBookTest = (testName: string) => {
    toast({
      title: "Book Test",
      description: `Booking ${testName}...`,
    })
    setTimeout(() => {
      toast({
        title: "Success",
        description: `${testName} has been added to your cart.`,
      })
    }, 1000)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-12">
          Laboratory Services & Health Check-ups
        </h2>

        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Search for tests or health packages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border-slate-300 focus:border-blue-500 focus:ring-blue-500 bg-white/80 backdrop-blur-sm"
              disabled={isSearching}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </form>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {healthPackages.map((pkg, index) => (
            <div
              key={pkg.name}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border-0 hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`${
                  pkg.color === "blue"
                    ? "bg-gradient-to-r from-blue-100 to-indigo-100"
                    : pkg.color === "emerald"
                      ? "bg-gradient-to-r from-emerald-100 to-teal-100"
                      : "bg-gradient-to-r from-purple-100 to-pink-100"
                } rounded-lg p-4 mb-4`}
              >
                <h3 className="text-xl font-semibold text-slate-700">{pkg.name}</h3>
              </div>
              <ul className="space-y-2 mb-4">
                {pkg.tests.map((test, testIndex) => (
                  <li key={testIndex} className="flex items-center text-slate-600">
                    <ChevronRight
                      className={`w-5 h-5 mr-2 ${
                        pkg.color === "blue"
                          ? "text-blue-600"
                          : pkg.color === "emerald"
                            ? "text-emerald-600"
                            : "text-purple-600"
                      }`}
                    />
                    {test}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleBookPackage(pkg.name)}
                className={`w-full text-white shadow-lg ${
                  pkg.color === "blue"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                    : pkg.color === "emerald"
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                      : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                }`}
              >
                Book Now
              </Button>
            </div>
          ))}
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border-0">
          <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg p-4 mb-4">
            <h3 className="text-xl font-semibold text-slate-700">Popular Individual Tests</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {popularTests.map((test, index) => (
              <Button
                key={index}
                onClick={() => handleBookTest(test)}
                variant="outline"
                className="justify-start text-blue-600 border-blue-200 hover:bg-blue-50 bg-white/50 transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5 mr-2" />
                {test}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
