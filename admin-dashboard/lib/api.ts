import axios from 'axios'
import type { 
  Appointment, 
  Doctor, 
  Service, 
  Shift, 
  CalendarData, 
  FutureAppointmentsData,
  LoginCredentials,
  AuthResponse
} from './types'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor to add the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refresh_token')
        if (!refreshToken) {
          throw new Error('No refresh token')
        }
        
        const response = await api.post<AuthResponse>('/token/refresh/', {
          refresh: refreshToken,
        })

        localStorage.setItem('access_token', response.data.access)

        originalRequest.headers.Authorization = `Bearer ${response.data.access}`
        return api(originalRequest)
      } catch (error) {
        // Handle refresh token error (e.g., redirect to login)
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: (credentials: LoginCredentials) =>
    api.post<AuthResponse>('/token/', credentials),
  refreshToken: (refresh: string) =>
    api.post<AuthResponse>('/token/refresh/', { refresh }),
}

// Appointments API
export const appointmentsAPI = {
  getAll: (params?: { patient_name?: string }) => 
    api.get<Appointment[]>('/appointments/', { params }),
  getById: (id: number) => 
    api.get<Appointment>(`/appointments/${id}/`),
  create: (data: Partial<Appointment>) => 
    api.post<Appointment>('/appointments/', data),
  update: (id: number, data: Partial<Appointment>) => 
    api.put<Appointment>(`/appointments/${id}/`, data),
  delete: (id: number) => 
    api.delete(`/appointments/${id}/`),
  getFuture: (week: number) => 
    api.get<FutureAppointmentsData>(`/appointments/future/?week=${week}`),
}

// Doctors API
export const doctorsAPI = {
  getAll: () => 
    api.get<Doctor[]>('/doctors/'),
  getById: (id: number) => 
    api.get<Doctor>(`/doctors/${id}/`),
  create: (data: Partial<Doctor>) => 
    api.post<Doctor>('/doctors/', data),
  update: (id: number, data: Partial<Doctor>) => 
    api.put<Doctor>(`/doctors/${id}/`, data),
  delete: (id: number) => 
    api.delete(`/doctors/${id}/`),
}

// Services API
export const servicesAPI = {
  getAll: () => 
    api.get<Service[]>('/services/'),
  getById: (id: number) => 
    api.get<Service>(`/services/${id}/`),
  create: (data: Partial<Service>) => 
    api.post<Service>('/services/', data),
  update: (id: number, data: Partial<Service>) => 
    api.put<Service>(`/services/${id}/`, data),
  delete: (id: number) => 
    api.delete(`/services/${id}/`),
}

// Shifts API
export const shiftsAPI = {
  getAll: (params?: { week?: number }) => 
    api.get<Shift[]>('/shifts/', { params }),
  getById: (id: number) => 
    api.get<Shift>(`/shifts/${id}/`),
  create: (data: Partial<Shift>) => 
    api.post<Shift>('/shifts/', data),
  update: (id: number, data: Partial<Shift>) => 
    api.put<Shift>(`/shifts/${id}/`, data),
  delete: (id: number) => 
    api.delete(`/shifts/${id}/`),
  addDoctors: (id: number, doctorIds: number[]) => 
    api.post(`/shifts/${id}/doctors/`, { doctor_ids: doctorIds }),
  removeDoctor: (id: number, doctorId: number) => 
    api.delete(`/shifts/${id}/doctors/${doctorId}/`),
  generateWeek: (week: number, year?: number) => 
    api.post('/shifts/generate_week/', { week, year }),
}

// Calendar API
export const calendarAPI = {
  getWeek: (week: number) => 
    api.get<CalendarData>(`/calendar/?week=${week}`),
}

export default api 