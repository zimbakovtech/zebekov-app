'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { appointmentsAPI } from '@/lib/api'
import type { Appointment } from '@/lib/types'

interface AppointmentListProps {
  onEdit?: (appointment: Appointment) => void;
  patientNameFilter?: string;
}

export default function AppointmentList({ onEdit, patientNameFilter }: AppointmentListProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAppointments()
  }, [patientNameFilter])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const response = await appointmentsAPI.getAll({ 
        patient_name: patientNameFilter 
      })
      setAppointments(response.data)
      setError(null)
    } catch (err) {
      setError('Неуспешно вчитување на термини')
      console.error('Error fetching appointments:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Дали сте сигурни дека сакате да го избришете овој термин?')) {
      try {
        await appointmentsAPI.delete(id)
        setAppointments(appointments.filter(appointment => appointment.id !== id))
      } catch (err) {
        console.error('Error deleting appointment:', err)
        alert('Неуспешно бришење на термин')
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-2 text-gray-600">Се вчитуваат термини...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">{error}</div>
        <button 
          onClick={fetchAppointments}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Обидете се повторно
        </button>
      </div>
    )
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500">Нема пронајдени термини</div>
        {patientNameFilter && (
          <div className="text-sm text-gray-400 mt-2">
            Нема термини за "{patientNameFilter}"
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Пациент
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Услуга
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Доктор
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Датум и време
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Цена
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Акции
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {appointment.patient_full_name}
                </div>
                <div className="text-sm text-gray-500">{appointment.patient_phone_number}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {appointment.service ? appointment.service.name : appointment.custom_service_name}
                </div>
                <div className="text-sm text-gray-500">
                  {appointment.duration_minutes} мин
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {appointment.doctor.full_name}
                </div>
                <div className="text-sm text-gray-500">
                  {appointment.doctor.email}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {format(new Date(appointment.start_datetime), 'MMM d, yyyy')}
                </div>
                <div className="text-sm text-gray-500">
                  {format(new Date(appointment.start_datetime), 'HH:mm')} - {format(new Date(appointment.end_datetime), 'HH:mm')}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {appointment.price} МКД
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleDelete(appointment.id)}
                  className="text-red-600 hover:text-red-900 mr-4"
                  title="Избриши термин"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <button
                  onClick={() => onEdit?.(appointment)}
                  className="text-blue-600 hover:text-blue-900"
                  title="Уреди термин"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 