'use client';

import { useState } from 'react';
import AppointmentList from '@/components/AppointmentList';
import AppointmentForm from '@/components/AppointmentForm';
import type { Appointment } from '@/lib/types';

export default function AppointmentsPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | undefined>();

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Appointments</h1>
        <button
          onClick={handleAddClick}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Appointment
        </button>
      </div>

      {showForm ? (
        <AppointmentForm
          appointment={selectedAppointment}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      ) : (
        <AppointmentList onEdit={handleEdit} />
      )}
    </div>
  );
} 