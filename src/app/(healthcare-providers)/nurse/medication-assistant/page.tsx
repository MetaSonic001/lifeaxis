'use client'

import { useState } from 'react'

type Medication = {
  id: number
  name: string
  dosage: string
  frequency: string
  patientName: string
}

export default function MedicationAdministrationAssistant() {
  const [medications] = useState<Medication[]>([
    { id: 1, name: 'Aspirin', dosage: '81mg', frequency: 'Once daily', patientName: 'John Doe' },
    { id: 2, name: 'Lisinopril', dosage: '10mg', frequency: 'Twice daily', patientName: 'Jane Smith' },
  ])
  const [scannedBarcode, setScannedBarcode] = useState('')
  const [verificationResult, setVerificationResult] = useState<string | null>(null)

  const handleBarcodeScanned = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // In a real application, this would verify the medication against a database
    const medication = medications.find(med => med.id.toString() === scannedBarcode)
    if (medication) {
      setVerificationResult(`Verified: ${medication.name} ${medication.dosage} for ${medication.patientName}`)
    } else {
      setVerificationResult('Error: Medication not found or incorrect')
    }
    setScannedBarcode('')
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Medication Administration AI Assistant</h1>
      <form onSubmit={handleBarcodeScanned} className="mb-4">
        <div className="flex items-center">
          <input
            type="text"
            value={scannedBarcode}
            onChange={(e) => setScannedBarcode(e.target.value)}
            placeholder="Scan medication barcode"
            className="flex-grow px-4 py-2 border rounded-l-md"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
          >
            Verify
          </button>
        </div>
      </form>
      {verificationResult && (
        <div className={`p-4 rounded-md ${verificationResult.startsWith('Error') ? 'bg-red-100' : 'bg-green-100'}`}>
          {verificationResult}
        </div>
      )}
      <h2 className="text-xl font-semibold mt-6 mb-2">Medication Schedule</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Patient</th>
            <th className="p-2 text-left">Medication</th>
            <th className="p-2 text-left">Dosage</th>
            <th className="p-2 text-left">Frequency</th>
          </tr>
        </thead>
        <tbody>
          {medications.map(med => (
            <tr key={med.id} className="border-b">
              <td className="p-2">{med.patientName}</td>
              <td className="p-2">{med.name}</td>
              <td className="p-2">{med.dosage}</td>
              <td className="p-2">{med.frequency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

