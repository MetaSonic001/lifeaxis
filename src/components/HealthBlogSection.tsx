import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const blogPosts = [
  {
    title: "10 Tips for a Healthy Heart",
    excerpt: "Discover simple lifestyle changes that can significantly improve your heart health.",
    image: "/blog-post-1.jpg",
  },
  {
    title: "Understanding Anxiety Disorders",
    excerpt: "Learn about the different types of anxiety disorders and effective coping strategies.",
    image: "/blog-post-2.jpg",
  },
  {
    title: "The Importance of Regular Check-ups",
    excerpt: "Find out why regular medical check-ups are crucial for maintaining your overall health.",
    image: "/blog-post-3.jpg",
  },
]

export default function HealthBlogSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Health Tips & Insights</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Button variant="link" className="text-blue-600 hover:text-blue-800">
                  Read More <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

