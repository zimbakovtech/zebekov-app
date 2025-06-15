'use client'

import { useState, useEffect } from 'react'
import { doctorsAPI } from '@/lib/api'
import { Doctor } from '@/lib/types'
import DoctorForm from '@/components/DoctorForm'
import { UserGroupIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | undefined>()

  const fetchDoctors = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await doctorsAPI.getAll()
      setDoctors(response.data)
    } catch (err) {
      console.error('Error fetching doctors:', err)
      setError('Failed to load doctors')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDoctors()
  }, [])

  const handleEdit = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this doctor?')) return

    try {
      await doctorsAPI.delete(id)
      await fetchDoctors()
    } catch (err) {
      console.error('Error deleting doctor:', err)
      setError('Failed to delete doctor')
    }
  }

  const handleFormSuccess = async () => {
    setShowForm(false)
    setSelectedDoctor(undefined)
    await fetchDoctors()
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Doctors</h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center rounded-md bg-[#44B0B6] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#3A9A9F] focus:outline-none focus:ring-2 focus:ring-[#44B0B6] focus:ring-offset-2"
        >
          <UserGroupIcon className="mr-2 h-5 w-5" aria-hidden="true" />
          Add Doctor
        </button>
      </div>

      {showForm && (
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-medium text-gray-900">
            {selectedDoctor ? 'Edit Doctor' : 'Add Doctor'}
          </h2>
          <DoctorForm
            doctor={selectedDoctor}
            onSuccess={handleFormSuccess}
            onCancel={() => {
              setShowForm(false)
              setSelectedDoctor(undefined)
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="flex flex-col rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-md"
          >
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">
                {doctor.first_name} {doctor.last_name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{doctor.specialization}</p>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span> {doctor.email}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Phone:</span> {doctor.phone}
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => handleEdit(doctor)}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#44B0B6] focus:ring-offset-2"
              >
                <PencilIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(doctor.id)}
                className="inline-flex items-center rounded-md border border-transparent bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <TrashIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 