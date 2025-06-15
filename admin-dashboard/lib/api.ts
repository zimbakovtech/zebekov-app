import axios from 'axios'

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

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refresh_token')
        const response = await api.post('/token/refresh/', {
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
  login: (username: string, password: string) =>
    api.post('/token/', { username, password }),
  refreshToken: (refresh: string) =>
    api.post('/token/refresh/', { refresh }),
}

// Appointments API
export const appointmentsAPI = {
  getAll: () => api.get('/appointments/'),
  getById: (id: number) => api.get(`/appointments/${id}/`),
  create: (data: any) => api.post('/appointments/', data),
  update: (id: number, data: any) => api.put(`/appointments/${id}/`, data),
  delete: (id: number) => api.delete(`/appointments/${id}/`),
  getAvailableSlots: () => api.get('/appointments/available_slots/'),
  getCalendar: () => api.get('/appointments/calendar/'),
  getDay: () => api.get('/appointments/day/'),
  getWeek: () => api.get('/appointments/week/'),
}

// Doctors API
export const doctorsAPI = {
  getAll: () => api.get('/doctors/'),
  getById: (id: number) => api.get(`/doctors/${id}/`),
  create: (data: any) => api.post('/doctors/', data),
  update: (id: number, data: any) => api.put(`/doctors/${id}/`, data),
  delete: (id: number) => api.delete(`/doctors/${id}/`),
}

// Services API
export const servicesAPI = {
  getAll: () => api.get('/services/'),
  getById: (id: number) => api.get(`/services/${id}/`),
  create: (data: any) => api.post('/services/', data),
  update: (id: number, data: any) => api.put(`/services/${id}/`, data),
  delete: (id: number) => api.delete(`/services/${id}/`),
}

// Shifts API
export const shiftsAPI = {
  getAll: () => api.get('/shifts/'),
  getById: (id: number) => api.get(`/shifts/${id}/`),
  create: (data: any) => api.post('/shifts/', data),
  update: (id: number, data: any) => api.put(`/shifts/${id}/`, data),
  delete: (id: number) => api.delete(`/shifts/${id}/`),
  updateShift: (id: number, data: any) => api.patch(`/shifts/${id}/update_shift/`, data),
}

// Schedule Slots API
export const scheduleSlotsAPI = {
  getAll: () => api.get('/schedule-slots/'),
  getById: (id: number) => api.get(`/schedule-slots/${id}/`),
  create: (data: any) => api.post('/schedule-slots/', data),
  update: (id: number, data: any) => api.put(`/schedule-slots/${id}/`, data),
  delete: (id: number) => api.delete(`/schedule-slots/${id}/`),
}

export default api 