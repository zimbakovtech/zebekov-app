'use client';

import { useState } from 'react';
import AppointmentList from '@/components/AppointmentList';
import AppointmentForm from '@/components/AppointmentForm';
import type { Appointment } from '@/lib/types';

export default function AppointmentsPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | undefined>();
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddClick = () => {
    setSelectedAppointment(undefined);
    setShowForm(true);
  };

  const handleEdit = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelectedAppointment(undefined);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedAppointment(undefined);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is handled by the AppointmentList component
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Термини</h1>
        <button
          onClick={handleAddClick}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Додај термин
        </button>
      </div>

      {showForm ? (
        <AppointmentForm
          appointment={selectedAppointment}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      ) : (
        <div className="space-y-4">
          {/* Search Form */}
          <div className="bg-white p-4 rounded-lg shadow">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="search" className="sr-only">
                  Барај термини
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Барај по име на пациент..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Барај
              </button>
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Исчисти
                </button>
              )}
            </form>
          </div>

          {/* Appointments List */}
          <div className="bg-white rounded-lg shadow">
            <AppointmentList 
              onEdit={handleEdit} 
              patientNameFilter={searchTerm || undefined}
            />
          </div>
        </div>
      )}
    </div>
  );
} 