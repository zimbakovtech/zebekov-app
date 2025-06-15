'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { appointmentsAPI, doctorsAPI, servicesAPI } from '@/lib/api';

type AppointmentFormData = {
  patient_first_name: string;
  patient_last_name: string;
  phone_number: string;
  services: number[];
  doctor: number;
  date: Date;
  start_time: string;
  end_time: string;
};

type Doctor = {
  id: number;
  full_name: string;
};

type Service = {
  id: number;
  name: string;
  duration: number;
};

type Appointment = {
  id: number;
  doctor: {
    id: number;
    full_name: string;
  };
  patient_first_name: string;
  patient_last_name: string;
  phone_number: string;
  services: Array<{
    id: number;
    name: string;
    duration: number;
  }>;
  date: string;
  start_time: string;
  end_time: string;
};

type AppointmentFormProps = {
  appointment?: Appointment;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export default function AppointmentForm({ appointment, onSuccess, onCancel }: AppointmentFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    defaultValues: appointment
      ? {
          patient_first_name: appointment.patient_first_name,
          patient_last_name: appointment.patient_last_name,
          phone_number: appointment.phone_number,
          services: appointment.services.map(service => service.id),
          doctor: appointment.doctor.id,
          date: new Date(appointment.date),
          start_time: appointment.start_time,
          end_time: appointment.end_time,
        }
      : undefined,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorsResponse, servicesResponse] = await Promise.all([
          doctorsAPI.getAll(),
          servicesAPI.getAll(),
        ]);
        setDoctors(doctorsResponse.data);
        setServices(servicesResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load form data');
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data: AppointmentFormData) => {
    try {
      setLoading(true);
      setError(null);

      const formattedData = {
        ...data,
        date: format(data.date, 'yyyy-MM-dd'),
      };

      if (appointment) {
        await appointmentsAPI.update(appointment.id, formattedData);
      } else {
        await appointmentsAPI.create(formattedData);
      }

      onSuccess?.();
    } catch (err) {
      console.error('Error saving appointment:', err);
      setError('Failed to save appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="patient_first_name" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="patient_first_name"
            {...register('patient_first_name', { required: 'First name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          {errors.patient_first_name && (
            <p className="mt-1 text-sm text-red-600">{errors.patient_first_name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="patient_last_name" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="patient_last_name"
            {...register('patient_last_name', { required: 'Last name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          {errors.patient_last_name && (
            <p className="mt-1 text-sm text-red-600">{errors.patient_last_name.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone_number"
          {...register('phone_number', { required: 'Phone number is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        {errors.phone_number && (
          <p className="mt-1 text-sm text-red-600">{errors.phone_number.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="services" className="block text-sm font-medium text-gray-700">
          Services
        </label>
        <select
          id="services"
          multiple
          {...register('services', { required: 'At least one service is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name} ({service.duration} minutes)
            </option>
          ))}
        </select>
        {errors.services && (
          <p className="mt-1 text-sm text-red-600">{errors.services.message}</p>
        )}
      </div>

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
              {doctor.full_name}
            </option>
          ))}
        </select>
        {errors.doctor && (
          <p className="mt-1 text-sm text-red-600">{errors.doctor.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          {...register('date', { required: 'Date is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        {errors.date && (
          <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="start_time" className="block text-sm font-medium text-gray-700">
            Start Time
          </label>
          <input
            type="time"
            id="start_time"
            {...register('start_time', { required: 'Start time is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          {errors.start_time && (
            <p className="mt-1 text-sm text-red-600">{errors.start_time.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="end_time" className="block text-sm font-medium text-gray-700">
            End Time
          </label>
          <input
            type="time"
            id="end_time"
            {...register('end_time', { required: 'End time is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          {errors.end_time && (
            <p className="mt-1 text-sm text-red-600">{errors.end_time.message}</p>
          )}
        </div>
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
          {loading ? 'Saving...' : appointment ? 'Save Changes' : 'Add Appointment'}
        </button>
      </div>
    </form>
  );
} 