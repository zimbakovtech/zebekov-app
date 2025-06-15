'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { appointmentsAPI } from '@/lib/api'

type Appointment = {
  id: number
  doctor: {
    id: number
    full_name: string
  }
  patient_first_name: string
  patient_last_name: string
  phone_number: string
  services: Array<{
    id: number
    name: string
    duration: number
  }>
  date: string
  start_time: string
  end_time: string
}

interface AppointmentListProps {
  onEdit?: (appointment: Appointment) => void;
}

export default function AppointmentList({ onEdit }: AppointmentListProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const response = await appointmentsAPI.getAll()
      setAppointments(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch appointments')
      console.error('Error fetching appointments:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await appointmentsAPI.delete(id)
        setAppointments(appointments.filter(appointment => appointment.id !== id))
      } catch (err) {
        console.error('Error deleting appointment:', err)
        alert('Failed to delete appointment')
      }
    }
  }

  if (loading) {
    return <div className="text-center py-4">Loading...</div>
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">{error}</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Patient
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Service
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Doctor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date & Time
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {appointment.patient_first_name} {appointment.patient_last_name}
                </div>
                <div className="text-sm text-gray-500">{appointment.phone_number}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {appointment.services.map(service => service.name).join(', ')}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {appointment.doctor.full_name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {format(new Date(appointment.date), 'MMM d, yyyy')}
                </div>
                <div className="text-sm text-gray-500">
                  {appointment.start_time} - {appointment.end_time}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleDelete(appointment.id)}
                  className="text-red-600 hover:text-red-900 mr-4"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onEdit?.(appointment)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 