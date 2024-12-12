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
        <HealthQuiz />
        <TestBooking />
        <Statistics />
      </main>
      <Footer />
    </div>
  )
}

