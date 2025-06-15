'use client'

import { useState, useEffect } from 'react'
import Calendar from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'
import { ClockIcon } from '@heroicons/react/24/outline'
import { scheduleSlotsAPI } from '@/lib/api'

type ScheduleSlot = {
  id: number
  doctor: number
  date: string
  start_time: string
  end_time: string
  is_available: boolean
}

export default function DoctorSchedule() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [scheduleSlots, setScheduleSlots] = useState<ScheduleSlot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchScheduleSlots()
  }, [selectedDate])

  const fetchScheduleSlots = async () => {
    try {
      setLoading(true)
      const response = await scheduleSlotsAPI.getAll()
      const filteredSlots = response.data.filter(
        (slot: ScheduleSlot) => slot.date === format(selectedDate, 'yyyy-MM-dd')
      )
      setScheduleSlots(filteredSlots)
      setError(null)
    } catch (err) {
      setError('Failed to fetch schedule slots')
      console.error('Error fetching schedule slots:', err)
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
            Schedule for {format(selectedDate, 'MMMM d, yyyy')}
          </h2>
          {scheduleSlots.length === 0 ? (
            <p className="text-gray-500">No schedule slots for this date.</p>
          ) : (
            <div className="space-y-4">
              {scheduleSlots.map((slot) => (
                <div
                  key={slot.id}
                  className={`border rounded-lg p-4 ${
                    slot.is_available ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {slot.start_time} - {slot.end_time}
                      </p>
                      <p className="text-sm text-gray-500">
                        {slot.is_available ? 'Available' : 'Unavailable'}
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