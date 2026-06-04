import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

const labelMap = {
  admin: 'Inicio',
  alumnos: 'Alumnos',
  materias: 'Materias',
  calificaciones: 'Calificaciones',
  horarios: 'Horarios',
  finanzas: 'Finanzas',
  notificaciones: 'Notificaciones',
  configuracion: 'Configuración',
  estudiante: 'Inicio',
  docente: 'Inicio',
  grupos: 'Mis grupos',
  horario: 'Horario',
  pagos: 'Estado de cuenta',
  tramites: 'Trámites',
  asistencia: 'Asistencia',
  soporte: 'Soporte',
}

export default function Breadcrumb() {
  const { pathname } = useLocation()
  const parts = pathname.split('/').filter(Boolean)

  if (parts.length <= 1) return null

  const crumbs = parts.map((part, i) => ({
    label: labelMap[part] || part,
    path: '/' + parts.slice(0, i + 1).join('/'),
    isLast: i === parts.length - 1,
  }))

  return (
    <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--color-text-muted)', marginBottom: '1rem', flexWrap: 'wrap' }}>
      {crumbs.map((c, i) => (
        <span key={c.path} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {i > 0 && <ChevronRight size={12} />}
          {c.isLast ? (
            <span style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>{c.label}</span>
          ) : (
            <Link to={c.path} style={{ color: 'var(--color-primary)', textDecoration: 'none' }}
              onMouseEnter={e => e.target.style.textDecoration = 'underline'}
              onMouseLeave={e => e.target.style.textDecoration = 'none'}
            >
              {i === 0 ? <Home size={13} style={{ display: 'inline', marginBottom: 1 }} /> : c.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}
