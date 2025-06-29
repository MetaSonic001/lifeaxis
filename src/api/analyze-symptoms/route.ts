import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { symptoms, age, gender } = await request.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer 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`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/Meta-Llama-3-8B-Instruct",
        messages: [
          {
            role: "system",
            content: `You are a medical AI assistant that analyzes symptoms. You must respond with a JSON object containing:
            {
              "possibleConditions": [{"name": "condition name", "probability": number 0-100, "description": "brief description"}],
              "urgency": "low|medium|high|emergency",
              "recommendations": ["recommendation 1", "recommendation 2"],
              "redFlags": ["warning sign 1", "warning sign 2"]
            }
            
            Always include disclaimers about seeking professional medical advice. Base urgency on symptom severity.`
          },
          {
            role: "user",
            content: `Patient details: Age: ${age}, Gender: ${gender}
            Symptoms: ${symptoms}
            
            Please analyze these symptoms and provide medical insights in the specified JSON format.`
          }
        ],
        temperature: 0.3,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to get AI response");
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    // Parse the JSON response from AI
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiResponse);
    } catch (e) {
      // Fallback if AI doesn't return valid JSON
      parsedResponse = {
        possibleConditions: [
          { name: "Unable to analyze", probability: 0, description: "Please consult a healthcare professional" }
        ],
        urgency: "medium",
        recommendations: ["Consult with a healthcare professional for proper diagnosis"],
        redFlags: ["Severe symptoms", "Worsening condition"]
      };
    }

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error("Error in symptom analysis:", error);
    return NextResponse.json(
      { error: "Failed to analyze symptoms" },
      { status: 500 }
    );
  }
}
