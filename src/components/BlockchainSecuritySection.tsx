import { Shield, Lock, FileText } from 'lucide-react'

export default function BlockchainSecuritySection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Your Data, Secured by Blockchain</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Unparalleled Security</h3>
            <p className="text-gray-600">
              Your medical records are encrypted and stored on a decentralized blockchain network, ensuring the highest level of data protection.
            </p>
          </div>
          <div className="text-center">
            <Lock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Privacy Guaranteed</h3>
            <p className="text-gray-600">
              You have full control over your data. Only authorized healthcare providers can access your information with your explicit consent.
            </p>
          </div>
          <div className="text-center">
            <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Seamless Access</h3>
            <p className="text-gray-600">
              Access your complete medical history, prescriptions, and test results anytime, anywhere, while maintaining full data integrity.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

