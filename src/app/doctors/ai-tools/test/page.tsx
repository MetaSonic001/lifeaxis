import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AITestPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">AI Test System</h1>
      <Card>
        <CardHeader>
          <CardTitle>Test System</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Hi Test System</p>
        </CardContent>
      </Card>
    </div>
  )
}

