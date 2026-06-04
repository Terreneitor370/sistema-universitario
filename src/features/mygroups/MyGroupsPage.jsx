import { useNavigate } from 'react-router-dom'

const myGroups = [
  { id: 'G1', code: 'ISC-507-A', subject: 'Arquitectura de Software', cuatrimestre: 5, schedule: 'Lun/Mié 13:00–15:00', room: 'Sala B', students: 30, pending: 12, attendance: 94, color: '#d97706' },
  { id: 'G2', code: 'MAT-201-B', subject: 'Cálculo Integral', cuatrimestre: 2, schedule: 'Mar/Jue 07:00–09:00', room: 'Aula 205', students: 32, pending: 0, attendance: 88, color: '#185fa5' },
  { id: 'G3', code: 'ISC-507-B', subject: 'Arquitectura de Software', cuatrimestre: 5, schedule: 'Mié/Vie 11:00–13:00', room: 'Sala C', students: 28, pending: 5, attendance: 91, color: '#0d9488' },
]

export default function MyGroupsPage() {
  const navigate = useNavigate()
  const card = { background: '#152031', border: '1px solid #424751', borderRadius: 12 }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#d8e3fb' }}>Mis Grupos</h1>
        <p style={{ fontSize: 13, color: '#8c919c', marginTop: 4 }}>Cuatrimestre 2025-B — {myGroups.length} grupos asignados</p>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {[
          { label: 'Total alumnos', value: myGroups.reduce((s, g) => s + g.students, 0), icon: 'group', color: '#a4c9ff' },
          { label: 'Entregas pendientes', value: myGroups.reduce((s, g) => s + g.pending, 0), icon: 'assignment_late', color: '#fbbf24' },
          { label: 'Asistencia promedio', value: `${Math.round(myGroups.reduce((s,g) => s + g.attendance, 0) / myGroups.length)}%`, icon: 'fact_check', color: '#4ade80' },
        ].map(k => (
          <div key={k.label} style={{ ...card, padding: '1.25rem', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: `${k.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ color: k.color, fontSize: 22 }}>{k.icon}</span>
            </div>
            <div>
              <p style={{ fontSize: 11, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{k.label}</p>
              <p style={{ fontSize: 26, fontWeight: 700, color: k.color }}>{k.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Group cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {myGroups.map(g => (
          <div key={g.id} style={{ ...card, padding: '1.25rem', borderLeft: `4px solid ${g.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: g.color, background: `${g.color}18`, padding: '2px 10px', borderRadius: 999 }}>{g.code}</span>
                  <span style={{ fontSize: 12, color: '#8c919c' }}>Cuatrimestre {g.cuatrimestre}</span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#d8e3fb', marginBottom: 6 }}>{g.subject}</h3>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12, color: '#8c919c', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>schedule</span> {g.schedule}
                  </span>
                  <span style={{ fontSize: 12, color: '#8c919c', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>location_on</span> {g.room}
                  </span>
                  <span style={{ fontSize: 12, color: '#8c919c', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>group</span> {g.students} alumnos
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/docente/calificaciones')}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, border: '1px solid #424751', background: 'none', color: '#b7c8e1', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>grade</span> Calificaciones
                </button>
                <button onClick={() => navigate('/docente/asistencia')}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, border: '1px solid #424751', background: 'none', color: '#b7c8e1', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>fact_check</span> Asistencia
                </button>
                <button onClick={() => navigate('/docente/material')}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, border: 'none', background: '#185fa5', color: '#c1d9ff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>menu_book</span> Material
                </button>
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginTop: 16, paddingTop: 14, borderTop: '1px solid #42475133' }}>
              <div style={{ background: '#1f2a3c', borderRadius: 8, padding: '10px 14px' }}>
                <p style={{ fontSize: 11, color: '#8c919c', marginBottom: 4 }}>Entregas pendientes</p>
                <p style={{ fontSize: 20, fontWeight: 700, color: g.pending > 0 ? '#fbbf24' : '#4ade80' }}>{g.pending}</p>
              </div>
              <div style={{ background: '#1f2a3c', borderRadius: 8, padding: '10px 14px' }}>
                <p style={{ fontSize: 11, color: '#8c919c', marginBottom: 4 }}>Asistencia promedio</p>
                <p style={{ fontSize: 20, fontWeight: 700, color: g.attendance >= 90 ? '#4ade80' : '#fbbf24' }}>{g.attendance}%</p>
              </div>
              <div style={{ background: '#1f2a3c', borderRadius: 8, padding: '10px 14px' }}>
                <p style={{ fontSize: 11, color: '#8c919c', marginBottom: 4 }}>Alumnos en riesgo</p>
                <p style={{ fontSize: 20, fontWeight: 700, color: '#f87171' }}>{Math.floor(g.students * 0.1)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}