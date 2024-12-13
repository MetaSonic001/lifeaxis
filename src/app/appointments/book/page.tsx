'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CalendarIcon, Video, Building2 } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { doctors, hospitals } from '@/lib/data'

const formSchema = z.object({
  appointmentType: z.enum(['in-person', 'video']),
  hospital: z.string().min(1, 'Please select a hospital'),
  doctor: z.string().min(1, 'Please select a doctor'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  symptoms: z.string().min(10, 'At least 10 characters required for symptoms'),
  reason: z.string().min(2, 'Reason must be at least 2 characters'),
  additionalNotes: z.string().optional(),
  amount: z.number().min(0, 'Amount must be a positive number'),
})

export default function BookAppointmentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null)
  const [availableDoctors, setAvailableDoctors] = useState(doctors)
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      appointmentType: 'in-person',
      symptoms: '',
    },
  })

  useEffect(() => {
    const doctorId = searchParams.get('doctorId')
    if (doctorId) {
      const doctor = doctors.find(d => d.id === doctorId)
      if (doctor) {
        setSelectedDoctor(doctor)
        form.setValue('doctor', doctorId)
        const hospitalId = hospitals.find(h => h.name === doctor.hospital)?.id
        if (hospitalId) {
          setSelectedHospital(hospitalId)
          form.setValue('hospital', hospitalId)
        }
      }
    }
  }, [searchParams, form])

  useEffect(() => {
    if (selectedHospital) {
      const hospital = hospitals.find(h => h.id === selectedHospital)
      if (hospital) {
        const filteredDoctors = doctors.filter(doctor => doctor.hospital === hospital.name)
        setAvailableDoctors(filteredDoctors)
      }
    } else {
      setAvailableDoctors(doctors)
    }
  }, [selectedHospital])

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here you would typically send the form data to your backend
    // and handle the appointment creation process

    // Simulate sending confirmation email and SMS
    console.log("Sending confirmation email to:", values.email);
    console.log("Sending confirmation SMS to:", values.phone);

    router.push('/appointments/transaction');
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  }

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 p-8"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="bg-blue-800 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Book an Appointment</CardTitle>
            <CardDescription className="text-blue-100">
              Fill in the details below to schedule your appointment
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {selectedDoctor && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Selected Doctor</h3>
                    <p className="text-gray-700">{selectedDoctor.name} - {selectedDoctor.title}</p>
                    <p className="text-gray-600">{selectedDoctor.hospital}</p>
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="appointmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Appointment Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="in-person" id="in-person" />
                            <label htmlFor="in-person" className="flex items-center">
                              <CalendarIcon className="w-4 h-4 mr-2 text-blue-800" />
                              In-person Visit
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="video" id="video" />
                            <label htmlFor="video" className="flex items-center">
                              <Video className="w-4 h-4 mr-2 text-blue-800" />
                              Video Consultation
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hospital"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Hospital</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value)
                          setSelectedHospital(value)
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a hospital" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {hospitals.map((hospital) => (
                            <SelectItem key={hospital.id} value={hospital.id}>
                              {hospital.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="doctor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Doctor</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a doctor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableDoctors.map((doctor) => (
                            <SelectItem key={doctor.id} value={doctor.id}>
                              {doctor.name} - {doctor.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <h3 className="font-medium">Select Date & Time</h3>
                  <div className="flex flex-col md:flex-row gap-8">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium mb-3">Available Time Slots</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'].map((time) => (
                          <Button
                            key={time}
                            variant="outline"
                            className="w-full hover:bg-blue-800 hover:text-white transition-colors"
                            type="button"
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 000-0000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="symptoms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Symptoms & Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe your symptoms or reason for visit"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for Booking</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Appointment Fee</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-blue-800 hover:bg-blue-900 text-white"
                  onClick={() => {
                    if (form.formState.isValid) {
                      router.push('/appointments/transaction');
                    }
                  }}
                >
                  Proceed to Payment
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Appointment Confirmed!</AlertDialogTitle>
              <AlertDialogDescription>
                Your appointment has been successfully scheduled. You will receive a
                confirmation email with all the details shortly.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => router.push('/')}>
                Return to Home
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </motion.div>
  )
}

