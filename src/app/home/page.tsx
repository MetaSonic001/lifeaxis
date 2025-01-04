import AppointmentBooking from '@/components/AppointmentBooking'
import BlockchainSecurity from '@/components/BlockchainSecurity'
import DoctorShowcase from '@/components/DoctorShowcase'
import FeatureHighlights from '@/components/FeatureHighlights'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import HealthQuiz from '@/components/HealthQuiz'
import HeroSection from '@/components/HeroSection'
import HospitalFinder from '@/components/HospitalFinder'
import InteractiveMap from '@/components/InteractiveMap'
import OnlineConsultationSection from '@/components/OnlineConsultationSection'
import ServiceCategories from '@/components/ServiceCategories'
import Statistics from '@/components/Statistics'
import TestBooking from '@/components/TestBooking'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <FeatureHighlights />
        <ServiceCategories />
        <HospitalFinder />
        <DoctorShowcase />
        <OnlineConsultationSection/>
        <AppointmentBooking />
        <InteractiveMap />
        <BlockchainSecurity />

    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-r from-blue-600 to-teal-500">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-white opacity-5">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-grid" />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="h-16 w-16 rounded-full bg-white bg-opacity-10 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Health
            <span className="text-teal-200">Connect</span>
          </h1>
          
          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-xl sm:text-2xl text-teal-50 font-light">
            Your journey to better health starts here. Find trusted healthcare providers tailored to your needs.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8">
            <Button 
              size="lg"
              className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 hover:bg-teal-50 transition-all duration-200 text-lg font-semibold rounded-full"
            >
              <Link href="/find-doctors">Find Doctors</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
         className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 hover:bg-teal-50 transition-all duration-200 text-lg font-semibold rounded-full"

            >
                 <Link href="/find-hospitals">Find Hospitals</Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex justify-center space-x-6 text-sm text-white/80">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Verified Providers</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secure Platform</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  
        <HealthQuiz />
        <TestBooking />
        <Statistics />
      </main>
      <Footer />
    </div>
  )
}

