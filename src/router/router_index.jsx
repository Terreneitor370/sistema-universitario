import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'

import PublicLayout from '@components/layout/PublicLayout'
import AppLayout from '@components/layout/AppLayout'

import LandingPage from '@features/landing/LandingPage'
import ContactPage from '@features/landing/ContactPage'
import LoginPage from '@features/auth/LoginPage'
import ForgotPasswordPage from '@features/auth/ForgotPasswordPage'
import OfertaEducativaPage from '@features/landing/OfertaEducativaPage'
import InvestigacionPage from '@features/landing/InvestigacionPage'
import VidaUniversitariaPage from '@features/landing/VidaUniversitariaPage'
import AvisoPrivacidadPage from '@features/landing/AvisoPrivacidadPage'
import TerminosCondicionesPage from '@features/landing/TerminosCondicionesPage'

import AdminDashboard from '@features/dashboard/AdminDashboard'
import StudentDashboard from '@features/dashboard/StudentDashboard'
import TeacherDashboard from '@features/dashboard/TeacherDashboard'

import StudentsPage from '@features/students/StudentsPage'
import CoursesPage from '@features/courses/CoursesPage'
import GradesPage from '@features/grades/GradesPage'
import SchedulePage from '@features/schedule/SchedulePage'
import FinancePage from '@features/finance/FinancePage'
import PaymentPage from '@features/finance/PaymentPage'
import NotificationsPage from '@features/notifications/NotificationsPage'
import SettingsPage from '@features/settings/SettingsPage'
import SupportPage from '@features/support/SupportPage'
import EnrollmentPage from '@features/enrollment/EnrollmentPage'
import AttendancePage from '@/features/attendance/AttendancePage'
import MyGroupsPage from '@/features/mygroups/MyGroupsPage'
import AdminScholarships from '@/features/scholarship/ScholarshipPage'

import MaterialPage from '@features/material/MaterialPage'
import ActivityForm from '@features/material/ActivityForm'
import SubmissionsView from '@features/material/SubmissionsView'
import StudentMaterialPage from '@features/material/StudentMaterialPage'

/* eslint-disable react-refresh/only-export-components */
function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, user } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (allowedRoles && !allowedRoles.includes(user?.role)) return <Navigate to="/unauthorized" replace />
  return <Outlet />
}

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/contacto', element: <ContactPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/recuperar-contrasena', element: <ForgotPasswordPage /> },
      { path: '/oferta-educativa', element: <OfertaEducativaPage /> },
      { path: '/investigacion', element: <InvestigacionPage /> },
      { path: '/vida-universitaria', element: <VidaUniversitariaPage /> },
      { path: '/aviso-privacidad', element: <AvisoPrivacidadPage /> },
      { path: '/terminos-condiciones', element: <TerminosCondicionesPage /> },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={['admin']} />,
    children: [{
      element: <AppLayout role="admin" />,
      children: [
        { path: '/admin', element: <AdminDashboard /> },
        { path: '/admin/alumnos', element: <StudentsPage /> },
        { path: '/admin/materias', element: <CoursesPage /> },
        { path: '/admin/calificaciones', element: <GradesPage /> },
        { path: '/admin/horarios', element: <SchedulePage /> },
        { path: '/admin/finanzas', element: <FinancePage /> },
        { path: '/admin/becas', element: <AdminScholarships /> },
        { path: '/admin/notificaciones', element: <NotificationsPage /> },
        { path: '/admin/configuracion', element: <SettingsPage /> },
      ],
    }],
  },
  {
    element: <ProtectedRoute allowedRoles={['student']} />,
    children: [{
      element: <AppLayout role="student" />,
      children: [
        { path: '/estudiante', element: <StudentDashboard /> },
        { path: '/estudiante/horario', element: <SchedulePage /> },
        { path: '/estudiante/calificaciones', element: <GradesPage /> },
        { path: '/estudiante/inscripciones', element: <EnrollmentPage /> },
        { path: '/estudiante/material', element: <StudentMaterialPage /> },
        { path: '/estudiante/pagos', element: <FinancePage /> },
        { path: '/estudiante/pagos/pagar', element: <PaymentPage /> },
        { path: '/estudiante/notificaciones', element: <NotificationsPage /> },
        { path: '/estudiante/soporte', element: <SupportPage /> },
        { path: '/estudiante/configuracion', element: <SettingsPage /> },
      ],
    }],
  },
  {
    element: <ProtectedRoute allowedRoles={['teacher']} />,
    children: [{
      element: <AppLayout role="teacher" />,
      children: [
        { path: '/docente', element: <TeacherDashboard /> },
        { path: '/docente/grupos', element: <MyGroupsPage /> },
        { path: '/docente/calificaciones', element: <GradesPage /> },
        { path: '/docente/asistencia', element: <AttendancePage /> },
        { path: '/docente/material', element: <MaterialPage /> },
        { path: '/docente/material/nueva', element: <ActivityForm /> },
        { path: '/docente/material/:id/entregas', element: <SubmissionsView /> },
        { path: '/docente/horario', element: <SchedulePage /> },
        { path: '/docente/notificaciones', element: <NotificationsPage /> },
        { path: '/docente/soporte', element: <SupportPage /> },
        { path: '/docente/configuracion', element: <SettingsPage /> },
      ],
    }],
  },
  { path: '/unauthorized', element: <div style={{ padding: '3rem', color: '#d8e3fb', background: '#081425', minHeight: '100vh' }}>No tienes permiso para acceder a esta página.</div> },
  { path: '*', element: <Navigate to="/" replace /> },
])