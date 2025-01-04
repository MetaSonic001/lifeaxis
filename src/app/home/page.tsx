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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-8">HealthConnect</h1>
            <p className="text-xl text-white mb-8">Find the right healthcare provider for you</p>
            <div className="space-x-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/find-doctors">Find Doctors</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/find-hospitals">Find Hospitals</Link>
              </Button>
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

