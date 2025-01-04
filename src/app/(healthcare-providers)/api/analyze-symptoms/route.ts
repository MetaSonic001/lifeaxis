import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request: NextRequest) {
  try {
    const { symptoms } = await request.json()

    if (!symptoms) {
      return NextResponse.json({ message: 'Symptoms are required' }, { status: 400 })
    }

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)
    const model = genAI.getGenerativeModel({ model: "gemini-pro"})

    const prompt = `Provide a preliminary medical assessment based on these symptoms: ${symptoms}. 
    Include:
    1. Possible conditions
    2. Recommended follow-up questions
    3. Suggested initial measurements
    4. Basic recommendations
    5. Guidance on when to seek further medical attention

    Emphasize that this is not a definitive diagnosis and professional medical consultation is necessary.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Remove asterisks and extra formatting
    const cleanedText = text.replace(/\*{1,2}/g, '').trim()

    return NextResponse.json({ analysis: cleanedText })
  } catch (error) {
    console.error('Symptom analysis error:', error)
    return NextResponse.json({ 
      message: 'Error analyzing symptoms', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}