'use client';

import { useEffect, useState } from 'react';
import { appointmentsAPI, doctorsAPI, servicesAPI, shiftsAPI, calendarAPI } from '@/lib/api';
import type { Appointment, CalendarData } from '@/lib/types';
import { format, startOfWeek, addDays, getWeek } from 'date-fns';

interface DashboardStats {
  totalAppointments: number;
  totalDoctors: number;
  totalServices: number;
  totalShifts: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalAppointments: 0,
    totalDoctors: 0,
    totalServices: 0,
    totalShifts: 0,
  });
  const [calendarData, setCalendarData] = useState<CalendarData>({});
  const [currentWeek, setCurrentWeek] = useState(getWeek(new Date()));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [appointments, doctors, services, shifts, calendar] = await Promise.all([
          appointmentsAPI.getAll(),
          doctorsAPI.getAll(),
          servicesAPI.getAll(),
          shiftsAPI.getAll({ week: currentWeek }),
          calendarAPI.getWeek(currentWeek),
        ]);

        setStats({
          totalAppointments: appointments.data.length,
          totalDoctors: doctors.data.length,
          totalServices: services.data.length,
          totalShifts: shifts.data.length,
        });
        setCalendarData(calendar.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Неуспешно вчитување на податоците');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentWeek]);

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday start
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const handleWeekChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentWeek(prev => Math.max(1, prev - 1));
    } else {
      setCurrentWeek(prev => Math.min(52, prev + 1));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Се вчитува контролната табла...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Обидете се повторно
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Контролна табла</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleWeekChange('prev')}
            className="px-3 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Претходна недела
          </button>
          <span className="text-sm font-medium">Недела {currentWeek}</span>
          <button
            onClick={() => handleWeekChange('next')}
            className="px-3 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Следна недела
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Вкупно термини</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalAppointments}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Вкупно доктори</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalDoctors}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Вкупно услуги</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalServices}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Вкупно смени</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalShifts}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Calendar */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Неделно распоред</h2>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-full">
            <div className="grid grid-cols-7 gap-1 bg-gray-50">
              {weekDays.map((day, index) => (
                <div key={index} className="p-3 text-center">
                  <div className="text-sm font-medium text-gray-900">
                    {format(day, 'EEE')}
                  </div>
                  <div className="text-xs text-gray-500">
                    {format(day, 'MMM d')}
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {weekDays.map((day, index) => {
                const dayName = format(day, 'EEEE');
                const dayData = calendarData[dayName];
                
                return (
                  <div key={index} className="min-h-32 p-2 border border-gray-200">
                    {dayData ? (
                      <div className="space-y-2">
                        {/* Shifts */}
                        {dayData.shifts.first && (
                          <div className="text-xs bg-blue-100 p-1 rounded">
                            <div className="font-medium">Прва смена</div>
                            <div>{dayData.shifts.first.start_time} - {dayData.shifts.first.end_time}</div>
                            <div className="text-gray-600">
                              {dayData.shifts.first.doctors.map(d => d.full_name).join(', ')}
                            </div>
                          </div>
                        )}
                        {dayData.shifts.second && (
                          <div className="text-xs bg-green-100 p-1 rounded">
                            <div className="font-medium">Втора смена</div>
                            <div>{dayData.shifts.second.start_time} - {dayData.shifts.second.end_time}</div>
                            <div className="text-gray-600">
                              {dayData.shifts.second.doctors.map(d => d.full_name).join(', ')}
                            </div>
                          </div>
                        )}
                        
                        {/* Appointments */}
                        {dayData.appointments.map((appointment) => (
                          <div key={appointment.id} className="text-xs bg-yellow-100 p-1 rounded">
                            <div className="font-medium">{appointment.patient_full_name}</div>
                            <div>{format(new Date(appointment.start_datetime), 'HH:mm')} - {format(new Date(appointment.end_datetime), 'HH:mm')}</div>
                            <div className="text-gray-600">Д-р {appointment.doctor.full_name}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-400 text-xs text-center pt-4">Нема податоци</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 