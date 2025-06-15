'use client'

import { useState, useEffect } from 'react'
import Calendar from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { appointmentsAPI } from '@/lib/api'

type Appointment = {
  id: number
  doctor: {
    id: number
    full_name: string
  }
  patient_first_name: string
  patient_last_name: string
  services: Array<{
    id: number
    name: string
  }>
  date: string
  start_time: string
  end_time: string
}

export default function AppointmentCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAppointments()
  }, [selectedDate])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const response = await appointmentsAPI.getCalendar()
      const filteredAppointments = response.data.filter(
        (appointment: Appointment) => appointment.date === format(selectedDate, 'yyyy-MM-dd')
      )
      setAppointments(filteredAppointments)
      setError(null)
    } catch (err) {
      setError('Failed to fetch appointments')
      console.error('Error fetching appointments:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-4">Loading...</div>
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">{error}</div>
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Calendar</h2>
          <Calendar
            selected={selectedDate}
            onChange={(date: Date) => setSelectedDate(date)}
            inline
            className="border rounded-lg"
          />
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Appointments for {format(selectedDate, 'MMMM d, yyyy')}
          </h2>
          {appointments.length === 0 ? (
            <p className="text-gray-500">No appointments scheduled for this date.</p>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {appointment.patient_first_name} {appointment.patient_last_name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {appointment.services.map(service => service.name).join(', ')}
                      </p>
                      <p className="text-sm text-gray-500">
                        Doctor: {appointment.doctor.full_name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {appointment.start_time} - {appointment.end_time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 