'use client'

import { useState, useEffect } from 'react'
import { servicesAPI } from '@/lib/api'
import { Service } from '@/lib/types'
import { WrenchScrewdriverIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

interface ServiceFormData {
  name: string
  duration: number
  price: number
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    duration: 30,
    price: 0,
  })

  const fetchServices = async () => {
    try {
      setIsLoading(true)
      const response = await servicesAPI.getAll()
      setServices(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch services')
      console.error('Error fetching services:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const handleAddService = () => {
    setSelectedService(null)
    setFormData({ name: '', duration: 30, price: 0 })
    setShowForm(true)
  }

  const handleEditService = (service: Service) => {
    setSelectedService(service)
    setFormData({
      name: service.name,
      duration: service.duration,
      price: service.price,
    })
    setShowForm(true)
  }

  const handleDeleteService = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return

    try {
      await servicesAPI.delete(id)
      await fetchServices()
    } catch (err) {
      setError('Failed to delete service')
      console.error('Error deleting service:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (selectedService) {
        await servicesAPI.update(selectedService.id, formData)
      } else {
        await servicesAPI.create(formData)
      }
      setShowForm(false)
      setSelectedService(null)
      await fetchServices()
    } catch (err) {
      setError('Failed to save service')
      console.error('Error saving service:', err)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#44B0B6] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading services...</p>
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
            onClick={fetchServices}
            className="mt-4 rounded-md bg-[#44B0B6] px-4 py-2 text-white hover:bg-[#3A9A9F]"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Services</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your dental services</p>
        </div>
        <button
          onClick={handleAddService}
          className="inline-flex items-center rounded-md bg-[#44B0B6] px-4 py-2 text-sm font-medium text-white hover:bg-[#3A9A9F] focus:outline-none focus:ring-2 focus:ring-[#44B0B6] focus:ring-offset-2"
        >
          <WrenchScrewdriverIcon className="mr-2 h-5 w-5" />
          Add Service
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowForm(false)} />
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Service Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#44B0B6] focus:ring-[#44B0B6] sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#44B0B6] focus:ring-[#44B0B6] sm:text-sm"
                    min="15"
                    step="15"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price (MKD)
                  </label>
                  <input
                    type="number"
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#44B0B6] focus:ring-[#44B0B6] sm:text-sm"
                    min="0"
                    required
                  />
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-[#44B0B6] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#3A9A9F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#44B0B6] sm:col-start-2"
                  >
                    {selectedService ? 'Update Service' : 'Add Service'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <ul role="list" className="divide-y divide-gray-200">
          {services.map((service) => (
            <li key={service.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                  <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <svg className="mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {service.duration} minutes
                    </span>
                    <span className="flex items-center">
                      <svg className="mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {service.price} MKD
                    </span>
                  </div>
                </div>
                <div className="ml-4 flex space-x-2">
                  <button
                    onClick={() => handleEditService(service)}
                    className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500"
                  >
                    <TrashIcon className="h-5 w-5" />
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