'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { servicesAPI } from '@/lib/api'

type ServiceFormData = {
  name: string
  duration: number
}

type ServiceFormProps = {
  service?: {
    id: number
    name: string
    duration: number
  }
  onSuccess?: () => void
  onCancel?: () => void
}

export default function ServiceForm({ service, onSuccess, onCancel }: ServiceFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<ServiceFormData>({
    defaultValues: service
      ? {
          name: service.name,
          duration: service.duration,
        }
      : undefined,
  })

  const onSubmit = async (data: ServiceFormData) => {
    try {
      setLoading(true)
      setError(null)

      if (service) {
        await servicesAPI.update(service.id, data)
      } else {
        await servicesAPI.create(data)
      }

      onSuccess?.()
    } catch (err) {
      console.error('Error saving service:', err)
      setError('Failed to save service')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="text-lg font-medium text-gray-900">
        {service ? 'Edit Service' : 'Add New Service'}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Service Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            {...register('name', { required: 'Service name is required' })}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duration (minutes)
          </label>
          <input
            type="number"
            id="duration"
            min="15"
            step="15"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            {...register('duration', {
              required: 'Duration is required',
              min: { value: 15, message: 'Minimum duration is 15 minutes' },
              max: { value: 240, message: 'Maximum duration is 240 minutes' },
            })}
          />
          {errors.duration && (
            <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
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
            {loading ? 'Saving...' : service ? 'Save Changes' : 'Add Service'}
          </button>
        </div>
      </form>
    </div>
  )
} 