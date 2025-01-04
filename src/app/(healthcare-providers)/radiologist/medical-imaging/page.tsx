"use client"

import { useState } from 'react'
import { Upload, Info, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Define analysis result type
type AnalysisResult = {
  label: string;
  score: number;
}

export default function MedicalImagingAnalysis() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult[] | null>(null)

  // Image upload handler
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setSelectedImage(e.target.result as string);
          setError(null);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  // Medical image analysis function
  const analyzeImage = async () => {
    if (!imageFile) {
      setError("Please upload a medical image first.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', imageFile);

      // Send to backend API
      const response = await fetch('http://127.0.0.1:8000/analyze', {  // Change localhost to 127.0.0.1
        method: 'POST',  // Explicitly set POST method
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Image analysis failed: ${errorText}`);
      }

      const data = await response.json();
      setAnalysisResult(data.analysis);
    } catch (err) {
      console.error("Image analysis error:", err);
      setError(`Analysis failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload & Analyze</TabsTrigger>
          <TabsTrigger value="history">Analysis History</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Medical Imaging Analysis</CardTitle>
              <CardDescription>AI-powered image classification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full max-w-sm items-center gap-4">
                <Input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="cursor-pointer"
                />
                {error && (
                  <Alert variant="destructive">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {selectedImage && (
                  <div className="mt-4">
                    <img 
                      src={selectedImage} 
                      alt="Selected medical image" 
                      className="max-w-full h-auto rounded-lg mb-4"
                    />
                    <Button 
                      onClick={analyzeImage} 
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        "Analyze Image"
                      )}
                    </Button>
                  </div>
                )}

                {analysisResult && (
                  <Card className="mt-4 w-full">
                    <CardHeader>
                      <CardTitle>Analysis Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <strong>Top Predictions:</strong>
                        <ul className="list-disc pl-5">
                          {analysisResult.map((result, index) => (
                            <li key={index}>
                              {result.label} - {(result.score * 100).toFixed(2)}% confidence
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 text-sm text-muted-foreground">
                          <p>Note: This is an AI-powered classification and should not replace professional medical advice.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Analysis History</CardTitle>
              <CardDescription>View past image analyses</CardDescription>
            </CardHeader>
            <CardContent>
              <p>No previous analyses found.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}