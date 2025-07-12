'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { doctorsAPI } from '@/lib/api';
import { Doctor } from '@/lib/types';

type DoctorFormData = {
  full_name: string;
  phone_number: string;
  email: string;
  profile_picture_url?: string;
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
          full_name: doctor.full_name,
          phone_number: doctor.phone_number,
          email: doctor.email,
          profile_picture_url: doctor.profile_picture_url,
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
    } catch (err: any) {
      console.error('Error saving doctor:', err);
      setError(err.response?.data?.error || 'Неуспешно зачувување на доктор');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        {doctor ? 'Уреди доктор' : 'Додај нов доктор'}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
            Цело име *
          </label>
          <input
            type="text"
            id="full_name"
            {...register('full_name', { required: 'Целото име е задолжително' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.full_name && (
            <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Е-пошта *
          </label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Е-поштата е задолжителна',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Неважечка е-пошта',
              },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
            Телефонски број *
          </label>
          <input
            type="tel"
            id="phone_number"
            {...register('phone_number', {
              required: 'Телефонскиот број е задолжителен',
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.phone_number && (
            <p className="mt-1 text-sm text-red-600">{errors.phone_number.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="profile_picture_url" className="block text-sm font-medium text-gray-700">
            URL на профилна слика
          </label>
          <input
            type="url"
            id="profile_picture_url"
            {...register('profile_picture_url')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="https://example.com/photo.jpg"
          />
          {errors.profile_picture_url && (
            <p className="mt-1 text-sm text-red-600">{errors.profile_picture_url.message}</p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="flex justify-end space-x-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Откажи
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Се зачувува...' : doctor ? 'Зачувај промени' : 'Додај доктор'}
          </button>
        </div>
      </form>
    </div>
  );
} 