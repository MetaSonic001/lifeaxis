export interface Hospital {
    id: string
    name: string
    address: string
    city: string
    state: string
    zipCode: string
    phone: string
    email: string
    facilities: string[]
    createdAt: Date
    updatedAt: Date
  }
  
  export interface Doctor {
    id: string
    name: string
    email: string
    phone: string
    specialty: string
    hospitalId: string
    status: 'pending' | 'approved' | 'rejected'
    createdAt: Date
    updatedAt: Date
  }
  
  export interface Patient {
    id: string
    name: string
    email: string
    phone: string
    dateOfBirth: Date
    gender: 'male' | 'female' | 'other'
    createdAt: Date
    updatedAt: Date
  }
  
  export interface Appointment {
    id: string
    patientId: string
    doctorId: string
    hospitalId: string
    date: Date
    status: 'scheduled' | 'completed' | 'cancelled'
    type: 'in-person' | 'video'
    amount: number
    createdAt: Date
    updatedAt: Date
  }
  
  export interface Revenue {
    id: string
    hospitalId: string
    amount: number
    type: 'appointment' | 'commission' | 'other'
    date: Date
    createdAt: Date
    updatedAt: Date
  }
  
  export interface SystemSettings {
    videoConsultation: boolean
    multilingualSupport: boolean
    aiServices: boolean
    blockchainEnabled: boolean
  }
  
  export type TimeRange = '24h' | '7d' | '30d' | '90d' | '1y'
  export type AgeGroup = 'child' | 'adult' | 'elderly'
  
  export interface Stats {
    totalAppointments: number
    totalPatients: number
    totalDoctors: number
    totalRevenue: number
    appointmentsByAgeGroup: Record<AgeGroup, number>
    revenueByHospital: { hospitalId: string; amount: number }[]
    appointmentTrends: { date: Date; count: number }[]
  }
  
  