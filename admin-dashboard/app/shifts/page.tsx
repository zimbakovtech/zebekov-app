'use client'

import { useState, useEffect } from 'react'
import { shiftsAPI } from '@/lib/api'
import { Shift } from '@/lib/types'

interface ShiftFormData {
  doctor_id: number
  week_number: number
  shift_type: 'first' | 'second'
  start_date: string
  end_date: string
}

export default function ShiftsPage() {
  const [shifts, setShifts] = useState<Shift[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null)
  const [formData, setFormData] = useState<ShiftFormData>({
    doctor_id: 0,
    week_number: 1,
    shift_type: 'first',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0],
  })

  const fetchShifts = async () => {
    try {
      setIsLoading(true)
      const response = await shiftsAPI.getAll()
      setShifts(response.data)
      setError(null)
    } catch (err) {
      setError('Неуспешно вчитување на смените')
      console.error('Error fetching shifts:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchShifts()
  }, [])

  const handleAddShift = () => {
    setSelectedShift(null)
    setFormData({
      doctor_id: 0,
      week_number: 1,
      shift_type: 'first',
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date().toISOString().split('T')[0],
    })
    setShowForm(true)
  }

  const handleEditShift = (shift: Shift) => {
    setSelectedShift(shift)
    setFormData({
      doctor_id: shift.doctor_ids?.[0] || 0,
      week_number: shift.week_of_year,
      shift_type: shift.shift_type,
      start_date: new Date().toISOString().split('T')[0], // Using current date as fallback
      end_date: new Date().toISOString().split('T')[0], // Using current date as fallback
    })
    setShowForm(true)
  }

  const handleDeleteShift = async (id: number) => {
    if (!confirm('Дали сте сигурни дека сакате да ја избришете оваа смена?')) return

    try {
      await shiftsAPI.delete(id)
      await fetchShifts()
    } catch (err) {
      setError('Неуспешно бришење на смена')
      console.error('Error deleting shift:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (selectedShift) {
        await shiftsAPI.update(selectedShift.id, formData)
      } else {
        await shiftsAPI.create(formData)
      }
      setShowForm(false)
      setSelectedShift(null)
      await fetchShifts()
    } catch (err) {
      setError('Неуспешно зачувување на смена')
      console.error('Error saving shift:', err)
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('mk-MK', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#44B0B6] mx-auto"></div>
          <p className="mt-4 text-gray-600">Се вчитуваат смените...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button
            onClick={fetchShifts}
            className="mt-4 rounded-md bg-[#44B0B6] px-4 py-2 text-white hover:bg-[#3A9A9F]"
          >
            Обидете се повторно
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Смени</h1>
          <p className="mt-1 text-sm text-gray-500">Управувајте со смените на докторите</p>
        </div>
        <button
          onClick={handleAddShift}
          className="inline-flex items-center rounded-md bg-[#44B0B6] px-4 py-2 text-sm font-medium text-white hover:bg-[#3A9A9F] focus:outline-none focus:ring-2 focus:ring-[#44B0B6] focus:ring-offset-2"
        >
          <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Додај смена
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowForm(false)} />
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="doctor_id" className="block text-sm font-medium text-gray-700">
                    ID на доктор
                  </label>
                  <input
                    type="number"
                    id="doctor_id"
                    value={formData.doctor_id}
                    onChange={(e) => setFormData({ ...formData, doctor_id: parseInt(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#44B0B6] focus:ring-[#44B0B6] sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="week_number" className="block text-sm font-medium text-gray-700">
                    Број на недела
                  </label>
                  <input
                    type="number"
                    id="week_number"
                    value={formData.week_number}
                    onChange={(e) => setFormData({ ...formData, week_number: parseInt(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#44B0B6] focus:ring-[#44B0B6] sm:text-sm"
                    min="1"
                    max="52"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="shift_type" className="block text-sm font-medium text-gray-700">
                    Тип на смена
                  </label>
                  <select
                    id="shift_type"
                    value={formData.shift_type}
                    onChange={(e) => setFormData({ ...formData, shift_type: e.target.value as 'first' | 'second' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#44B0B6] focus:ring-[#44B0B6] sm:text-sm"
                    required
                  >
                    <option value="first">Прва смена</option>
                    <option value="second">Втора смена</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                      Почетен датум
                    </label>
                    <input
                      type="date"
                      id="start_date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#44B0B6] focus:ring-[#44B0B6] sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                      Краен датум
                    </label>
                    <input
                      type="date"
                      id="end_date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#44B0B6] focus:ring-[#44B0B6] sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-[#44B0B6] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#3A9A9F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#44B0B6] sm:col-start-2"
                  >
                    {selectedShift ? 'Ажурирај смена' : 'Додај смена'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                  >
                    Откажи
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <ul role="list" className="divide-y divide-gray-200">
          {shifts.map((shift) => (
            <li key={shift.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {shift.doctors.length > 0 ? shift.doctors[0].full_name : `Доктор ID: ${shift.doctor_ids?.[0]}`}
                  </h3>
                  <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <svg className="mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Недела {shift.week_of_year}
                    </span>
                    <span className="flex items-center">
                      <svg className="mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {shift.shift_type === 'first' ? 'Прва смена' : 'Втора смена'}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>Од: {shift.start_time} - До: {shift.end_time}</p>
                    <p>Ден: {shift.day_name}</p>
                  </div>
                </div>
                <div className="ml-4 flex space-x-2">
                  <button
                    onClick={() => handleEditShift(shift)}
                    className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteShift(shift.id)}
                    className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
} 