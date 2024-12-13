import { Search, Menu, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="/favicon.ico" alt="DocDial Logo" className="h-10 w-auto mr-4" />
            <h1 className="text-2xl font-bold text-blue-800">DocDial</h1>
          </div>
          <nav className="hidden lg:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-800 transition duration-150 ease-in-out">Find Doctors</a>
            <a href="#" className="text-gray-600 hover:text-blue-800 transition duration-150 ease-in-out">Hospitals</a>
            <a href="#" className="text-gray-600 hover:text-blue-800 transition duration-150 ease-in-out">Services</a>
            <a href="#" className="text-gray-600 hover:text-blue-800 transition duration-150 ease-in-out">Lab Tests</a>
            <a href="#" className="text-gray-600 hover:text-blue-800 transition duration-150 ease-in-out">Health Records</a>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Input
                type="search"
                placeholder="Search doctors, hospitals..."
                className="pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-blue-800 focus:ring-blue-800"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Button variant="outline" className="text-blue-800 border-blue-800 hover:bg-blue-50">
              <User className="w-5 h-5 mr-2" />
              Sign In
            </Button>
            <Button className="bg-blue-800 text-white hover:bg-blue-900">Sign Up</Button>
            <Button variant="ghost" className="lg:hidden text-blue-800">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

