export interface Appointment {
  id: number;
  patient_first_name: string;
  patient_last_name: string;
  patient_full_name: string;
  patient_phone_number: string;
  doctor: Doctor;
  doctor_id: number;
  service?: Service;
  service_id?: number;
  custom_service_name?: string;
  price: string;
  duration_minutes: number;
  start_datetime: string;
  end_datetime: string;
}

export interface Doctor {
  id: number;
  full_name: string;
  phone_number: string;
  email: string;
  profile_picture_url?: string;
}

export interface Service {
  id: number;
  name: string;
  price: string;
  duration_minutes: number;
}

export interface Shift {
  id: number;
  week_of_year: number;
  day_of_week: number;
  day_name: string;
  shift_type: 'first' | 'second';
  start_time: string;
  end_time: string;
  doctors: Doctor[];
  doctor_ids?: number[];
}

export interface CalendarDay {
  date: string;
  day_name: string;
  shifts: {
    first?: {
      id: number;
      start_time: string;
      end_time: string;
      doctors: Doctor[];
    };
    second?: {
      id: number;
      start_time: string;
      end_time: string;
      doctors: Doctor[];
    };
  };
  appointments: Appointment[];
}

export interface CalendarData {
  [dayName: string]: CalendarDay;
}

export interface FutureAppointmentsData {
  [date: string]: {
    date: string;
    day_name: string;
    appointments: Appointment[];
  };
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
} 