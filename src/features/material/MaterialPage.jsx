import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const activities = [
  { id: 1, title: 'Diagrama de componentes', subject: 'Arquitectura de SW', group: 'IN-201', type: 'Tarea', due: '20/10/2025 23:59', submitted: 18, total: 30, status: 'active', file: 'instrucciones_diagrama.pdf' },
  { id: 2, title: 'Proyecto integrador parcial 2', subject: 'Arquitectura de SW', group: 'IN-201', type: 'Proyecto', due: '25/10/2025 23:59', submitted: 5, total: 30, status: 'active', file: null },
  { id: 3, title: 'Ejercicios de integrales', subject: 'Cálculo Integral', group: 'IN-205', type: 'Tarea', due: '15/10/2025 23:59', submitted: 32, total: 32, status: 'closed', file: 'ejercicios_integrales.pdf' },
  { id: 4, title: 'Lectura: Clean Architecture', subject: 'Arquitectura de SW', group: 'IN-201', type: 'Lectura', due: '18/10/2025 23:59', submitted: 22, total: 30, status: 'graded', file: 'clean_architecture_ch1.pdf' },
]

const typeColors = {
  Tarea:     { bg: 'rgba(164,201,255,0.12)', color: '#a4c9ff' },
  Proyecto:  { bg: 'rgba(255,183,129,0.12)', color: '#ffb781' },
  Lectura:   { bg: 'rgba(183,200,225,0.12)', color: '#b7c8e1' },
  Examen:    { bg: 'rgba(248,113,113,0.12)', color: '#f87171' },
}

const statusLabel = { active: { label: 'Activa', color: '#4ade80' }, closed: { label: 'Cerrada', color: '#8c919c' }, graded: { label: 'Calificada', color: '#a4c9ff' } }

const card = { background: '#152031', border: '1px solid #424751', borderRadius: 12 }

export default function MaterialPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? activities : activities.filter(a => a.status === filter)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#d8e3fb' }}>Material de Clase</h1>
          <p style={{ fontSize: 13, color: '#8c919c', marginTop: 4 }}>Gestiona actividades, tareas y materiales de tus grupos.</p>
        </div>
        <button onClick={() => navigate('/docente/material/nueva')}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#185fa5', color: '#c1d9ff', padding: '10px 20px', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
          Nueva actividad
        </button>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          { label: 'Actividades activas', value: activities.filter(a => a.status === 'active').length, icon: 'assignment', color: '#4ade80' },
          { label: 'Entregas pendientes', value: activities.filter(a => a.status === 'active').reduce((s, a) => s + (a.total - a.submitted), 0), icon: 'pending', color: '#fbbf24' },
          { label: 'Por calificar', value: activities.filter(a => a.status === 'active').reduce((s, a) => s + a.submitted, 0), icon: 'grading', color: '#a4c9ff' },
        ].map(k => (
          <div key={k.label} style={{ ...card, padding: '1.25rem', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, background: `${k.color}20`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ color: k.color, fontSize: 22 }}>{k.icon}</span>
            </div>
            <div>
              <p style={{ fontSize: 11, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{k.label}</p>
              <p style={{ fontSize: 26, fontWeight: 700, color: k.color, lineHeight: 1 }}>{k.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 2, background: '#2a3548', borderRadius: 999, padding: 3, width: 'fit-content' }}>
        {[['all','Todas'],['active','Activas'],['closed','Cerradas'],['graded','Calificadas']].map(([v, l]) => (
          <button key={v} onClick={() => setFilter(v)}
            style={{ padding: '6px 16px', borderRadius: 999, border: 'none', background: filter === v ? '#185fa5' : 'transparent', color: filter === v ? '#c1d9ff' : '#8c919c', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            {l}
          </button>
        ))}
      </div>

      {/* Activity cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(a => {
          const pct = Math.round((a.submitted / a.total) * 100)
          const sl = statusLabel[a.status]
          const tc = typeColors[a.type]
          return (
            <div key={a.id} style={{ ...card, padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: tc.bg, color: tc.color }}>{a.type}</span>
                    <span style={{ fontSize: 12, color: sl.color, fontWeight: 600 }}>● {sl.label}</span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#d8e3fb', marginBottom: 4 }}>{a.title}</h3>
                  <p style={{ fontSize: 12, color: '#8c919c' }}>{a.subject} · {a.group}</p>
                  {a.file && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#a4c9ff' }}>attach_file</span>
                      <span style={{ fontSize: 12, color: '#a4c9ff' }}>{a.file}</span>
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#8c919c' }}>schedule</span>
                    <span style={{ fontSize: 12, color: '#8c919c' }}>{a.due}</span>
                  </div>
                  <button onClick={() => navigate(`/docente/material/${a.id}/entregas`)}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#185fa520', border: '1px solid #185fa5', color: '#a4c9ff', padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>grading</span>
                    Ver entregas
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ marginTop: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: '#8c919c' }}>Entregas recibidas</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: pct === 100 ? '#4ade80' : '#d8e3fb' }}>{a.submitted}/{a.total}</span>
                </div>
                <div style={{ height: 6, background: '#2a3548', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: pct === 100 ? '#4ade80' : '#185fa5', borderRadius: 3, transition: 'width 0.6s ease' }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}