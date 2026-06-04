import { useState } from 'react'
import { useAuthStore } from '@store/authStore'

const allNotifications = {
  student: [
    { id: 1, type: 'alert', icon: 'warning', color: '#f87171', bg: 'rgba(248,113,113,0.1)', title: 'Alerta académica — Estadística', body: 'Tu promedio parcial es 6.5. Visita asesorías los martes de 14:00 a 16:00 en el Depto. de Matemáticas.', time: 'Hace 2 horas', read: false },
    { id: 2, type: 'payment', icon: 'payments', color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', title: 'Recordatorio de pago', body: 'Tu colegiatura del cuatrimestre 2025-B vence el 15 de octubre. Realiza tu pago en caja o en línea.', time: 'Hace 5 horas', read: false },
    { id: 3, type: 'grade', icon: 'grade', color: '#4ade80', bg: 'rgba(74,222,128,0.1)', title: 'Calificaciones publicadas — Bases de Datos', body: 'El Mtro. Vega publicó las calificaciones del examen parcial 2. Tu resultado: 7.8.', time: 'Ayer, 18:30', read: false },
    { id: 4, type: 'activity', icon: 'assignment', color: '#a4c9ff', bg: 'rgba(164,201,255,0.1)', title: 'Nueva actividad — Arquitectura de SW', body: 'El Dr. Torres publicó la tarea "Diagrama de componentes" con entrega el 20 de octubre.', time: 'Ayer, 10:00', read: true },
    { id: 5, type: 'activity', icon: 'schedule', color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', title: 'Entrega próxima — Cálculo Diferencial', body: 'La tarea "Ejercicios integrales" vence mañana a las 23:59. ¡No olvides subir tu entrega!', time: 'Hace 1 día', read: true },
    { id: 6, type: 'info', icon: 'info', color: '#a4c9ff', bg: 'rgba(164,201,255,0.1)', title: 'Periodo de inscripciones abierto', body: 'Las inscripciones al cuatrimestre 2026-A estarán abiertas del 1 al 15 de noviembre.', time: 'Hace 2 días', read: true },
    { id: 7, type: 'document', icon: 'description', color: '#4ade80', bg: 'rgba(74,222,128,0.1)', title: 'Constancia de estudios disponible', body: 'Tu constancia de estudios actualizada está lista para descargarse desde el portal de servicios escolares.', time: 'Hace 3 días', read: true },
  ],
  teacher: [
    { id: 1, type: 'submission', icon: 'upload_file', color: '#4ade80', bg: 'rgba(74,222,128,0.1)', title: 'Nueva entrega — Laura Méndez', body: 'Laura Méndez entregó "Diagrama de componentes" en Arquitectura de SW. Pendiente de calificar.', time: 'Hace 30 min', read: false },
    { id: 2, type: 'submission', icon: 'upload_file', color: '#4ade80', bg: 'rgba(74,222,128,0.1)', title: 'Nueva entrega — Rodrigo Alvarado', body: 'Rodrigo Alvarado entregó "Diagrama de componentes" en Arquitectura de SW.', time: 'Hace 1 hora', read: false },
    { id: 3, type: 'alert', icon: 'warning', color: '#f87171', bg: 'rgba(248,113,113,0.1)', title: 'Cierre de captura en 48 horas', body: 'El parcial 2 del grupo IN-201 cierra el 20 de octubre a las 23:59. Tienes 3 calificaciones pendientes.', time: 'Hace 3 horas', read: false },
    { id: 4, type: 'info', icon: 'groups', color: '#b7c8e1', bg: 'rgba(183,200,225,0.1)', title: 'Junta de Academia', body: 'Se les recuerda la sesión ordinaria de academia el viernes 22 de octubre a las 14:00 en sala de juntas B.', time: 'Ayer', read: true },
    { id: 5, type: 'info', icon: 'assignment_late', color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', title: 'Límite de entrega de actas', body: 'La fecha definitiva para el cargue de actas finales en el sistema central es el 20 de octubre.', time: 'Hace 2 días', read: true },
  ],
  admin: [
    { id: 1, type: 'alert', icon: 'person_add', color: '#4ade80', bg: 'rgba(74,222,128,0.1)', title: 'Nuevo alumno registrado', body: 'Laura Méndez (2024-0312) completó su inscripción a Ingeniería en Sistemas Computacionales.', time: 'Hace 15 min', read: false },
    { id: 2, type: 'payment', icon: 'payments', color: '#f87171', bg: 'rgba(248,113,113,0.1)', title: '3 alumnos con adeudo vencido', body: 'Carlos Peralta, Marcos Herrera y Ana López tienen colegiaturas vencidas por más de 15 días.', time: 'Hace 2 horas', read: false },
    { id: 3, type: 'grade', icon: 'trending_down', color: '#f87171', bg: 'rgba(248,113,113,0.1)', title: 'Alerta académica masiva', body: '5 alumnos del grupo IN-201 tienen promedio menor a 7.0 en Cálculo Integral.', time: 'Hace 4 horas', read: false },
    { id: 4, type: 'info', icon: 'info', color: '#a4c9ff', bg: 'rgba(164,201,255,0.1)', title: 'Calificaciones publicadas — Bases de Datos', body: 'El Mtro. Vega publicó las calificaciones parciales del grupo BD-301. 33 alumnos calificados.', time: 'Hace 1 día', read: true },
  ],
}

export default function NotificationsPage() {
  const { user } = useAuthStore()
  const role = user?.role || 'student'
  const notifications = allNotifications[role] || allNotifications.student
  const [filter, setFilter] = useState('all')
  const [items, setItems] = useState(notifications)

  const unread = items.filter(n => !n.read).length
  const filtered = filter === 'unread' ? items.filter(n => !n.read) : items

  function markAllRead() {
    setItems(prev => prev.map(n => ({ ...n, read: true })))
  }

  function markRead(id) {
    setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const card = { background: '#152031', border: '1px solid #424751', borderRadius: 12, overflow: 'hidden' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#d8e3fb' }}>Notificaciones</h1>
          <p style={{ fontSize: 13, color: '#8c919c', marginTop: 4 }}>
            {unread > 0 ? <><span style={{ color: '#a4c9ff', fontWeight: 600 }}>{unread} sin leer</span> · {items.length} en total</> : `${items.length} notificaciones`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ display: 'flex', background: '#2a3548', borderRadius: 999, padding: 3, gap: 2 }}>
            {['all', 'unread'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{ padding: '6px 16px', borderRadius: 999, border: 'none', background: filter === f ? '#185fa5' : 'transparent', color: filter === f ? '#c1d9ff' : '#8c919c', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                {f === 'all' ? 'Todas' : 'Sin leer'}
              </button>
            ))}
          </div>
          {unread > 0 && (
            <button onClick={markAllRead}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: 'none', border: '1px solid #424751', borderRadius: 8, color: '#a4c9ff', fontSize: 12, cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>done_all</span>
              Marcar todas como leídas
            </button>
          )}
        </div>
      </div>

      <div style={card}>
        {filtered.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 40, color: '#424751', display: 'block', marginBottom: 12 }}>notifications_off</span>
            <p style={{ color: '#8c919c', fontSize: 14 }}>No hay notificaciones sin leer</p>
          </div>
        ) : (
          filtered.map((n, i) => (
            <div key={n.id} onClick={() => markRead(n.id)}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '16px 20px', borderBottom: i < filtered.length - 1 ? '1px solid #42475133' : 'none', cursor: 'pointer', background: n.read ? 'transparent' : '#1f2a3c44', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#1f2a3c'}
              onMouseLeave={e => e.currentTarget.style.background = n.read ? 'transparent' : '#1f2a3c44'}>
              {!n.read && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#a4c9ff', flexShrink: 0, marginTop: 8 }} />}
              {n.read && <div style={{ width: 7, flexShrink: 0 }} />}
              <div style={{ width: 36, height: 36, borderRadius: 10, background: n.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: n.color }}>{n.icon}</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: n.read ? 400 : 600, color: '#d8e3fb', marginBottom: 3 }}>{n.title}</p>
                <p style={{ fontSize: 12, color: '#8c919c', lineHeight: 1.5 }}>{n.body}</p>
                <p style={{ fontSize: 11, color: '#424751', marginTop: 6 }}>{n.time}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}