import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const activity = { title: 'Diagrama de componentes', subject: 'Arquitectura de SW', group: 'IN-201', due: '20/10/2025 23:59', total: 30 }

const submissions = [
  { name: 'Laura Méndez', id: '2024-0312', submittedAt: '19/10/2025 22:15', file: 'diagrama_mendez.pdf', status: 'submitted', grade: null, comment: '' },
  { name: 'Rodrigo Alvarado', id: '2023-0887', submittedAt: '18/10/2025 14:30', file: 'diagrama_alvarado.pdf', status: 'submitted', grade: 9.0, comment: 'Excelente trabajo, muy bien estructurado.' },
  { name: 'Sofía González', id: '2024-0056', submittedAt: '20/10/2025 08:45', file: 'diagrama_gonzalez.pdf', status: 'submitted', grade: null, comment: '' },
  { name: 'Carlos Peralta', id: '2022-1145', submittedAt: null, file: null, status: 'missing', grade: null, comment: '' },
  { name: 'Marcos Herrera', id: '2021-2201', submittedAt: '21/10/2025 01:20', file: 'diagrama_herrera.pdf', status: 'late', grade: null, comment: '' },
]

const statusStyle = {
  submitted: { label: 'Entregado', color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
  late:      { label: 'Tarde', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
  missing:   { label: 'Sin entregar', color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
  graded:    { label: 'Calificado', color: '#a4c9ff', bg: 'rgba(164,201,255,0.12)' },
}

export default function SubmissionsView() {
  const navigate = useNavigate()
  const [items, setItems] = useState(submissions)
  const [saved, setSaved] = useState(null)

  function handleGrade(idx, field, value) {
    setItems(prev => prev.map((s, i) => i === idx ? { ...s, [field]: value } : s))
  }

  function handleSave(idx) {
    setSaved(idx)
    setTimeout(() => setSaved(null), 2000)
  }

  const submitted = items.filter(s => s.status !== 'missing').length
  const graded = items.filter(s => s.grade !== null).length

  const card = { background: '#152031', border: '1px solid #424751', borderRadius: 12 }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 4 }}>
        <button onClick={() => navigate('/docente/material')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8c919c', display: 'flex', alignItems: 'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        </button>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#d8e3fb' }}>{activity.title}</h1>
          <p style={{ fontSize: 13, color: '#8c919c', marginTop: 2 }}>{activity.subject} · {activity.group} · Límite: {activity.due}</p>
        </div>
      </div>

      {/* Progress KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { label: 'Inscritos', value: activity.total, color: '#d8e3fb', icon: 'group' },
          { label: 'Entregaron', value: submitted, color: '#4ade80', icon: 'upload_file' },
          { label: 'Sin entregar', value: activity.total - submitted, color: '#f87171', icon: 'cancel' },
          { label: 'Calificados', value: graded, color: '#a4c9ff', icon: 'grading' },
        ].map(k => (
          <div key={k.label} style={{ ...card, padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="material-symbols-outlined" style={{ color: k.color, fontSize: 22 }}>{k.icon}</span>
            <div>
              <p style={{ fontSize: 22, fontWeight: 700, color: k.color, lineHeight: 1 }}>{k.value}</p>
              <p style={{ fontSize: 11, color: '#8c919c', marginTop: 2 }}>{k.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Submissions list */}
      <div style={card}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #424751', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#d8e3fb' }}>Entregas de alumnos</h3>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: '#a4c9ff', fontSize: 12 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>download</span> Descargar todas
          </button>
        </div>

        {items.map((s, i) => {
          const st = s.grade !== null ? statusStyle.graded : statusStyle[s.status]
          return (
            <div key={s.id} style={{ padding: '1rem 1.25rem', borderBottom: i < items.length - 1 ? '1px solid #42475133' : 'none' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, alignItems: 'start' }}>
                {/* Alumno */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#185fa530', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#a4c9ff', flexShrink: 0 }}>
                      {s.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#d8e3fb' }}>{s.name}</p>
                      <p style={{ fontSize: 11, color: '#8c919c' }}>{s.id}</p>
                    </div>
                  </div>
                  <span style={{ padding: '2px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: st.bg, color: st.color }}>{st.label}</span>
                </div>

                {/* Archivo */}
                <div>
                  {s.file ? (
                    <>
                      <p style={{ fontSize: 11, color: '#8c919c', marginBottom: 4 }}>Entrega: {s.submittedAt}</p>
                      <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(164,201,255,0.1)', border: '1px solid rgba(164,201,255,0.3)', borderRadius: 6, padding: '5px 12px', color: '#a4c9ff', fontSize: 12, cursor: 'pointer' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>description</span>
                        {s.file}
                      </button>
                    </>
                  ) : (
                    <p style={{ fontSize: 12, color: '#f87171' }}>No ha entregado</p>
                  )}
                </div>

                {/* Calificación */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {s.file && (
                    <>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <input type="number" min="0" max="10" step="0.5" value={s.grade || ''} placeholder="Calificación"
                          onChange={e => handleGrade(i, 'grade', parseFloat(e.target.value) || null)}
                          style={{ width: 90, background: '#040e1f', border: '1px solid #424751', borderRadius: 6, padding: '6px 10px', fontSize: 13, color: '#d8e3fb', outline: 'none', textAlign: 'center' }} />
                        <span style={{ fontSize: 11, color: '#8c919c' }}>/ 10</span>
                      </div>
                      <input type="text" value={s.comment} placeholder="Comentario al alumno..."
                        onChange={e => handleGrade(i, 'comment', e.target.value)}
                        style={{ background: '#040e1f', border: '1px solid #424751', borderRadius: 6, padding: '6px 10px', fontSize: 12, color: '#d8e3fb', outline: 'none' }} />
                      <button onClick={() => handleSave(i)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, background: saved === i ? 'rgba(74,222,128,0.15)' : '#185fa520', border: `1px solid ${saved === i ? 'rgba(74,222,128,0.4)' : '#185fa5'}`, borderRadius: 6, padding: '5px 12px', color: saved === i ? '#4ade80' : '#a4c9ff', fontSize: 12, cursor: 'pointer', fontWeight: 600, width: 'fit-content' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{saved === i ? 'check' : 'save'}</span>
                        {saved === i ? 'Guardado' : 'Guardar'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}