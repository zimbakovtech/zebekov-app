export interface Appointment {
  id: number;
  patient_id: number;
  doctor_id: number;
  service_id: number;
  date: string;
  start_time: string;
  end_time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Doctor {
  id: number;
  full_name: string;
  phone: string;
  photo: string;
  email: string;
  username: string;
}

export interface Service {
  id: number;
  name: string;
  duration: number;
  price: number;
}

export interface Shift {
  id: number;
  doctor: Doctor;
  week_number: number;
  shift_type: 'first' | 'second';
  start_date: string;
  end_date: string;
} 