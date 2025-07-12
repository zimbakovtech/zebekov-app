'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { format, parseISO } from 'date-fns';
import { appointmentsAPI, doctorsAPI, servicesAPI } from '@/lib/api';
import type { Appointment, Doctor, Service } from '@/lib/types';

type AppointmentFormData = {
  patient_first_name: string;
  patient_last_name: string;
  patient_phone_number: string;
  doctor_id: number;
  service_id?: number;
  custom_service_name?: string;
  price?: string;
  duration_minutes?: number;
  start_datetime: string;
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
  const [useCustomService, setUseCustomService] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    defaultValues: appointment
      ? {
          patient_first_name: appointment.patient_first_name,
          patient_last_name: appointment.patient_last_name,
          patient_phone_number: appointment.patient_phone_number,
          doctor_id: appointment.doctor_id,
          service_id: appointment.service_id,
          custom_service_name: appointment.custom_service_name,
          price: appointment.price,
          duration_minutes: appointment.duration_minutes,
          start_datetime: format(parseISO(appointment.start_datetime), "yyyy-MM-dd'T'HH:mm"),
        }
      : {
          start_datetime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
        },
  });

  const watchedServiceId = watch('service_id');
  const watchedCustomService = watch('custom_service_name');

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
        setError('Неуспешно вчитување на податоците');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (watchedServiceId && !useCustomService) {
      const service = services.find(s => s.id === watchedServiceId);
      if (service) {
        setSelectedService(service);
        setValue('price', service.price);
        setValue('duration_minutes', service.duration_minutes);
      }
    }
  }, [watchedServiceId, services, setValue, useCustomService]);

  useEffect(() => {
    if (appointment) {
      setUseCustomService(!!appointment.custom_service_name);
    }
  }, [appointment]);

  const onSubmit = async (data: AppointmentFormData) => {
    try {
      setLoading(true);
      setError(null);

      const formattedData = {
        ...data,
        // Remove service_id if using custom service
        ...(useCustomService && { service_id: undefined }),
        // Remove custom_service_name if using predefined service
        ...(!useCustomService && { custom_service_name: undefined }),
      };

      if (appointment) {
        await appointmentsAPI.update(appointment.id, formattedData);
      } else {
        await appointmentsAPI.create(formattedData);
      }

      onSuccess?.();
    } catch (err: any) {
      console.error('Error saving appointment:', err);
      setError(err.response?.data?.error || 'Неуспешно зачувување на термин');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        {appointment ? 'Уреди термин' : 'Додај нов термин'}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Patient Information */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="patient_first_name" className="block text-sm font-medium text-gray-700">
              Име *
            </label>
            <input
              type="text"
              id="patient_first_name"
              {...register('patient_first_name', { required: 'Името е задолжително' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.patient_first_name && (
              <p className="mt-1 text-sm text-red-600">{errors.patient_first_name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="patient_last_name" className="block text-sm font-medium text-gray-700">
              Презиме *
            </label>
            <input
              type="text"
              id="patient_last_name"
              {...register('patient_last_name', { required: 'Презимето е задолжително' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.patient_last_name && (
              <p className="mt-1 text-sm text-red-600">{errors.patient_last_name.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="patient_phone_number" className="block text-sm font-medium text-gray-700">
            Телефонски број *
          </label>
          <input
            type="tel"
            id="patient_phone_number"
            {...register('patient_phone_number', { required: 'Телефонскиот број е задолжителен' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.patient_phone_number && (
            <p className="mt-1 text-sm text-red-600">{errors.patient_phone_number.message}</p>
          )}
        </div>

        {/* Doctor Selection */}
        <div>
          <label htmlFor="doctor_id" className="block text-sm font-medium text-gray-700">
            Доктор *
          </label>
          <select
            id="doctor_id"
            {...register('doctor_id', { required: 'Докторот е задолжителен' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Изберете доктор</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.full_name}
              </option>
            ))}
          </select>
          {errors.doctor_id && (
            <p className="mt-1 text-sm text-red-600">{errors.doctor_id.message}</p>
          )}
        </div>

        {/* Service Selection */}
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <label className="block text-sm font-medium text-gray-700">Тип на услуга</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={!useCustomService}
                  onChange={() => setUseCustomService(false)}
                  className="mr-2"
                />
                Предодредена услуга
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={useCustomService}
                  onChange={() => setUseCustomService(true)}
                  className="mr-2"
                />
                Прилагодена услуга
              </label>
            </div>
          </div>

          {!useCustomService ? (
            <div>
              <label htmlFor="service_id" className="block text-sm font-medium text-gray-700">
                Услуга *
              </label>
              <select
                id="service_id"
                {...register('service_id', { required: !useCustomService && 'Услугата е задолжителна' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Изберете услуга</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - {service.price} МКД ({service.duration_minutes} мин)
                  </option>
                ))}
              </select>
              {errors.service_id && (
                <p className="mt-1 text-sm text-red-600">{errors.service_id.message}</p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label htmlFor="custom_service_name" className="block text-sm font-medium text-gray-700">
                  Име на прилагодена услуга *
                </label>
                <input
                  type="text"
                  id="custom_service_name"
                  {...register('custom_service_name', { required: useCustomService && 'Името на услугата е задолжително' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.custom_service_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.custom_service_name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Цена *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    id="price"
                    {...register('price', { 
                      required: useCustomService && 'Цената е задолжителна',
                      min: { value: 0, message: 'Цената мора да биде позитивна' }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="duration_minutes" className="block text-sm font-medium text-gray-700">
                    Времетраење (минути) *
                  </label>
                  <input
                    type="number"
                    id="duration_minutes"
                    {...register('duration_minutes', { 
                      required: useCustomService && 'Времетраењето е задолжително',
                      min: { value: 1, message: 'Времетраењето мора да биде најмалку 1 минута' }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  {errors.duration_minutes && (
                    <p className="mt-1 text-sm text-red-600">{errors.duration_minutes.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Appointment Time */}
        <div>
          <label htmlFor="start_datetime" className="block text-sm font-medium text-gray-700">
            Датум и време на почеток *
          </label>
          <input
            type="datetime-local"
            id="start_datetime"
            {...register('start_datetime', { required: 'Датумот и времето се задолжителни' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.start_datetime && (
            <p className="mt-1 text-sm text-red-600">{errors.start_datetime.message}</p>
          )}
        </div>

        {/* Service Preview */}
        {(selectedService || useCustomService) && (
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Резиме на услугата</h3>
            <div className="text-sm text-gray-600">
              <p><strong>Услуга:</strong> {selectedService?.name || watchedCustomService}</p>
              <p><strong>Цена:</strong> {selectedService?.price || watch('price')} МКД</p>
              <p><strong>Времетраење:</strong> {selectedService?.duration_minutes || watch('duration_minutes')} минути</p>
            </div>
          </div>
        )}

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
            {loading ? 'Се зачувува...' : appointment ? 'Зачувај промени' : 'Додај термин'}
          </button>
        </div>
      </form>
    </div>
  );
} 