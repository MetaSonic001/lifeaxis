import { Button } from '@/components/ui/button'

export default function HealthQuiz() {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Find the Right Doctor for You</h2>
          <p className="text-center text-gray-600 mb-8">
            Take our quick health quiz and get personalized doctor recommendations based on your symptoms and health goals.
          </p>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">What's your primary health concern?</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start text-left">Chronic Pain</Button>
                <Button variant="outline" className="justify-start text-left">Heart Health</Button>
                <Button variant="outline" className="justify-start text-left">Mental Health</Button>
                <Button variant="outline" className="justify-start text-left">Skin Issues</Button>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">How would you describe your lifestyle?</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start text-left">Active</Button>
                <Button variant="outline" className="justify-start text-left">Sedentary</Button>
                <Button variant="outline" className="justify-start text-left">Balanced</Button>
                <Button variant="outline" className="justify-start text-left">Stressful</Button>
              </div>
            </div>
            <Button className="w-full bg-blue-800 hover:bg-blue-900">Get Personalized Recommendations</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

