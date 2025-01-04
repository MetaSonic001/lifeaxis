'use client'

import { useState } from 'react'

type ImageRecord = {
  id: number
  patientName: string
  imageType: string
  date: string
  radiologist: string
  findings: string
}

const mockRecords: ImageRecord[] = [
  { id: 1, patientName: 'John Doe', imageType: 'X-ray', date: '2023-06-01', radiologist: 'Dr. Smith', findings: 'No abnormalities detected' },
  { id: 2, patientName: 'Jane Smith', imageType: 'MRI', date: '2023-06-02', radiologist: 'Dr. Johnson', findings: 'Small lesion detected in left hemisphere' },
  { id: 3, patientName: 'Mike Brown', imageType: 'CT Scan', date: '2023-06-03', radiologist: 'Dr. Williams', findings: 'Mild inflammation in lower right lung' },
]

export default function ImageArchive() {
  const [records, setRecords] = useState<ImageRecord[]>(mockRecords)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredRecords = records.filter(record =>
    record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.imageType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.radiologist.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Radiology Image Archive</h1>
      <input
        type="text"
        placeholder="Search by patient name, image type, or radiologist"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border rounded mb-4"
      />
      <table className="w-full">
        <thead>
          <tr className="bg-black">
            <th className="p-2 text-left">Patient Name</th>
            <th className="p-2 text-left">Image Type</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Radiologist</th>
            <th className="p-2 text-left">Findings</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map(record => (
            <tr key={record.id}>
              <td className="p-2">{record.patientName}</td>
              <td className="p-2">{record.imageType}</td>
              <td className="p-2">{record.date}</td>
              <td className="p-2">{record.radiologist}</td>
              <td className="p-2">{record.findings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

