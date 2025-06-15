'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { doctorsAPI } from '@/lib/api';
import { Doctor } from '@/lib/types';

type DoctorFormData = {
  first_name: string;
  last_name: string;
  specialization: string;
  email: string;
  phone: string;
};

type DoctorFormProps = {
  doctor?: Doctor;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export default function DoctorForm({ doctor, onSuccess, onCancel }: DoctorFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DoctorFormData>({
    defaultValues: doctor
      ? {
          first_name: doctor.first_name,
          last_name: doctor.last_name,
          specialization: doctor.specialization,
          email: doctor.email,
          phone: doctor.phone,
        }
      : undefined,
  });

  const onSubmit = async (data: DoctorFormData) => {
    try {
      setLoading(true);
      setError(null);

      if (doctor) {
        await doctorsAPI.update(doctor.id, data);
      } else {
        await doctorsAPI.create(data);
      }

      onSuccess?.();
    } catch (err) {
      console.error('Error saving doctor:', err);
      setError('Failed to save doctor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            {...register('first_name', { required: 'First name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#44B0B6] focus:ring-[#44B0B6] sm:text-sm"
          />
          {errors.first_name && (
            <p className="mt-1 text-sm text-red-600">{errors.first_name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            {...register('last_name', { required: 'Last name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#44B0B6] focus:ring-[#44B0B6] sm:text-sm"
          />
          {errors.last_name && (
            <p className="mt-1 text-sm text-red-600">{errors.last_name.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
          Specialization
        </label>
        <input
          type="text"
          id="specialization"
          {...register('specialization', { required: 'Specialization is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#44B0B6] focus:ring-[#44B0B6] sm:text-sm"
        />
        {errors.specialization && (
          <p className="mt-1 text-sm text-red-600">{errors.specialization.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#44B0B6] focus:ring-[#44B0B6] sm:text-sm"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          {...register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^\+?[1-9]\d{1,14}$/,
              message: 'Invalid phone number',
            },
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#44B0B6] focus:ring-[#44B0B6] sm:text-sm"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#44B0B6] focus:ring-offset-2"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-[#44B0B6] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#3A9A9F] focus:outline-none focus:ring-2 focus:ring-[#44B0B6] focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Saving...' : doctor ? 'Save Changes' : 'Add Doctor'}
        </button>
      </div>
    </form>
  );
} 