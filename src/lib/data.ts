import { Hospital, Doctor, Patient, Appointment, Revenue, Stats } from './types'

export const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'City General Hospital',
    address: '123 Medical Center Drive',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    phone: '+1 (555) 123-4567',
    email: 'contact@citygeneral.com',
    facilities: ['Emergency', 'Surgery', 'Cardiology', 'Neurology'],
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    name: 'Heart Care Center',
    address: '456 Cardiology Lane',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
    phone: '+1 (555) 987-6543',
    email: 'info@heartcarecenter.com',
    facilities: ['Cardiology', 'Cardiac Surgery', 'Rehabilitation'],
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '3',
    name: 'Neuroscience Institute',
    address: '789 Brain Avenue',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    phone: '+1 (555) 321-9876',
    email: 'contact@neuroinstitute.com',
    facilities: ['Neurology', 'Neurosurgery', 'Stroke Center'],
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
]

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    email: 'sarah.wilson@citygeneral.com',
    phone: '+1 (555) 234-5678',
    specialty: 'Cardiology',
    hospitalId: '1',
    status: 'approved',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@heartcarecenter.com',
    phone: '+1 (555) 876-5432',
    specialty: 'Cardiology',
    hospitalId: '2',
    status: 'approved',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@neuroinstitute.com',
    phone: '+1 (555) 765-4321',
    specialty: 'Neurology',
    hospitalId: '3',
    status: 'approved',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
]

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 345-6789',
    dateOfBirth: new Date('1990-01-01'),
    gender: 'male',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    dateOfBirth: new Date('1985-05-15'),
    gender: 'female',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
]

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    hospitalId: '1',
    date: new Date('2024-01-15T09:00:00'),
    status: 'scheduled',
    type: 'in-person',
    amount: 150,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '2',
    hospitalId: '2',
    date: new Date('2024-01-16T14:00:00'),
    status: 'scheduled',
    type: 'video',
    amount: 100,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
]

export const mockRevenue: Revenue[] = [
  {
    id: '1',
    hospitalId: '1',
    amount: 150,
    type: 'appointment',
    date: new Date('2024-01-15'),
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    hospitalId: '2',
    amount: 100,
    type: 'appointment',
    date: new Date('2024-01-16'),
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
]

export const mockStats: Stats = {
  totalAppointments: 1287,
  totalPatients: 965,
  totalDoctors: 128,
  totalRevenue: 315000,
  appointmentsByAgeGroup: {
    child: 250,
    adult: 600,
    elderly: 437,
  },
  revenueByHospital: [
    { hospitalId: '1', amount: 150000 },
    { hospitalId: '2', amount: 100000 },
    { hospitalId: '3', amount: 65000 },
  ],
  appointmentTrends: [
    { date: new Date('2024-01-01'), count: 45 },
    { date: new Date('2024-01-02'), count: 52 },
    { date: new Date('2024-01-03'), count: 48 },
  ],
}

export const doctors = [
  {
    id: '1',
    name: 'Dr. Topon Kumar',
    title: 'Neurologist',
    image: '/placeholder.svg?height=400&width=400',
    qualifications: 'MD, DM (Neurology)',
    hospital: 'City General Hospital',
    experience: '12+ Years',
    languages: ['English', 'Bengali', 'Hindi'],
    specializations: ['General Neurology', 'Stroke Management', 'Epilepsy'],
    rating: 4.8,
    totalReviews: 156,
    about: 'Dr. Topon Kumar is a highly skilled neurologist with over 12 years of experience in diagnosing and treating complex neurological disorders. He specializes in stroke management and epilepsy treatment.',
    education: [
      {
        degree: 'Doctor of Medicine',
        institution: 'Calcutta Medical College',
        year: '2005',
      },
      {
        degree: 'DM in Neurology',
        institution: 'All India Institute of Medical Sciences',
        year: '2010',
      },
    ],
    awards: [
      'Best Neurologist Award 2021',
      'Research Excellence in Epilepsy Management 2019',
    ],
  },
  {
    id: '2',
    name: 'Dr. Albert Miles',
    title: 'Cardiologist',
    image: '/placeholder.svg?height=400&width=400',
    qualifications: 'MD, DM (Cardiology), FACC',
    hospital: 'Heart Care Center',
    experience: '15+ Years',
    languages: ['English', 'Spanish'],
    specializations: ['Interventional Cardiology', 'Electrophysiology', 'Preventive Cardiology'],
    rating: 5.0,
    totalReviews: 203,
    about: 'Dr. Albert Miles is a renowned cardiologist with expertise in interventional cardiology and electrophysiology. He has performed over 1000 successful cardiac procedures and is dedicated to providing comprehensive cardiac care.',
    education: [
      {
        degree: 'Doctor of Medicine',
        institution: 'Harvard Medical School',
        year: '2003',
      },
      {
        degree: 'DM in Cardiology',
        institution: 'Cleveland Clinic',
        year: '2008',
      },
    ],
    awards: [
      'Excellence in Cardiology Award 2022',
      'Innovator in Interventional Cardiology 2020',
    ],
  },
]

export const hospitals = [
  { id: '1', name: 'City General Hospital' },
  { id: '2', name: 'Heart Care Center' },
  { id: '3', name: 'Neuroscience Institute' },
]

export const reviews = [
  {
    id: 1,
    name: 'John Doe',
    rating: 5,
    date: '2024-01-15',
    comment: 'Excellent doctor! Very thorough and caring.',
  },
  {
    id: 2,
    name: 'Jane Smith',
    rating: 4,
    date: '2024-01-10',
    comment: 'Professional and knowledgeable. Highly recommend.',
  },
]

