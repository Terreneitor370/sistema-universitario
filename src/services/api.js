import axios from 'axios'
import { useAuthStore } from '@store/authStore'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ── Auth ──────────────────────────────────────────────────
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
}

// ── Students ──────────────────────────────────────────────
export const studentService = {
  getAll: (params) => api.get('/students', { params }),
  getById: (id) => api.get(`/students/${id}`),
  create: (data) => api.post('/students', data),
  update: (id, data) => api.put(`/students/${id}`, data),
  delete: (id) => api.delete(`/students/${id}`),
  getGrades: (id) => api.get(`/students/${id}/grades`),
  getPayments: (id) => api.get(`/students/${id}/payments`),
  getSchedule: (id) => api.get(`/students/${id}/schedule`),
}

// ── Courses ───────────────────────────────────────────────
export const courseService = {
  getAll: (params) => api.get('/courses', { params }),
  getById: (id) => api.get(`/courses/${id}`),
  create: (data) => api.post('/courses', data),
  update: (id, data) => api.put(`/courses/${id}`, data),
  enroll: (courseId, studentId) => api.post(`/courses/${courseId}/enroll`, { studentId }),
}

// ── Grades ────────────────────────────────────────────────
export const gradeService = {
  getByGroup: (groupId) => api.get(`/grades/group/${groupId}`),
  submitGrades: (groupId, grades) => api.post(`/grades/group/${groupId}`, { grades }),
  getByStudent: (studentId) => api.get(`/grades/student/${studentId}`),
}

// ── Finance ───────────────────────────────────────────────
export const financeService = {
  getPayments: (params) => api.get('/finance/payments', { params }),
  getStudentBalance: (studentId) => api.get(`/finance/balance/${studentId}`),
  createPayment: (data) => api.post('/finance/payments', data),
  getInvoice: (paymentId) => api.get(`/finance/payments/${paymentId}/invoice`),
}

// ── Dashboard ─────────────────────────────────────────────
export const dashboardService = {
  getAdminStats: () => api.get('/dashboard/admin'),
  getStudentStats: (studentId) => api.get(`/dashboard/student/${studentId}`),
  getTeacherStats: (teacherId) => api.get(`/dashboard/teacher/${teacherId}`),
}
