'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { shiftsAPI, doctorsAPI } from '@/lib/api'

type ShiftFormData = {
  doctor: number
  week_number: number
  shift_type: 'Morning' | 'Evening'
  start_date: Date
  end_date: Date
}

type Doctor = {
  id: number
  name: string
}

type ShiftFormProps = {
  shift?: {
    id: number
    doctor: number
    week_number: number
    shift_type: 'Morning' | 'Evening'
    start_date: string
    end_date: string
  }
  onSuccess?: () => void
  onCancel?: () => void
}

export default function ShiftForm({ shift, onSuccess, onCancel }: ShiftFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [doctors, setDoctors] = useState<Doctor[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShiftFormData>({
    defaultValues: shift
      ? {
          doctor: shift.doctor,
          week_number: shift.week_number,
          shift_type: shift.shift_type,
          start_date: new Date(shift.start_date),
          end_date: new Date(shift.end_date),
        }
      : undefined,
  })

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await doctorsAPI.getAll()
        setDoctors(response.data)
      } catch (err) {
        console.error('Error fetching doctors:', err)
        setError('Failed to load doctors')
      }
    }

    fetchDoctors()
  }, [])

  const onSubmit = async (data: ShiftFormData) => {
    try {
      setLoading(true)
      setError(null)

      const formattedData = {
        ...data,
        start_date: format(data.start_date, 'yyyy-MM-dd'),
        end_date: format(data.end_date, 'yyyy-MM-dd'),
      }

      if (shift) {
        await shiftsAPI.update(shift.id, formattedData)
      } else {
        await shiftsAPI.create(formattedData)
      }

      onSuccess?.()
    } catch (err) {
      console.error('Error saving shift:', err)
      setError('Failed to save shift')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="text-lg font-medium text-gray-900">
        {shift ? 'Edit Shift' : 'Add New Shift'}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <div>
          <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">
            Doctor
          </label>
          <select
            id="doctor"
            {...register('doctor', { required: 'Doctor is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
          {errors.doctor && (
            <p className="mt-1 text-sm text-red-600">{errors.doctor.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="week_number" className="block text-sm font-medium text-gray-700">
            Week Number
          </label>
          <input
            type="number"
            id="week_number"
            {...register('week_number', {
              required: 'Week number is required',
              min: { value: 1, message: 'Week number must be at least 1' },
              max: { value: 52, message: 'Week number cannot exceed 52' },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          {errors.week_number && (
            <p className="mt-1 text-sm text-red-600">{errors.week_number.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="shift_type" className="block text-sm font-medium text-gray-700">
            Shift Type
          </label>
          <select
            id="shift_type"
            {...register('shift_type', { required: 'Shift type is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">Select shift type</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
          </select>
          {errors.shift_type && (
            <p className="mt-1 text-sm text-red-600">{errors.shift_type.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            id="start_date"
            {...register('start_date', { required: 'Start date is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          {errors.start_date && (
            <p className="mt-1 text-sm text-red-600">{errors.start_date.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            id="end_date"
            {...register('end_date', { required: 'End date is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          {errors.end_date && (
            <p className="mt-1 text-sm text-red-600">{errors.end_date.message}</p>
          )}
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-end space-x-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Saving...' : shift ? 'Save Changes' : 'Add Shift'}
          </button>
        </div>
      </form>
    </div>
  )
} 