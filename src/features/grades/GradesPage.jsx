import { useAuthStore } from '@store/authStore'

const studentGrades = [
  { subject: 'Cálculo Diferencial', code: 'ISC-501', teacher: 'Dr. Ramírez', p1: 9.0, p2: 8.5, p3: null, attendance: 95, status: 'active' },
  { subject: 'Programación Avanzada', code: 'ISC-502', teacher: 'Dra. Morales', p1: 8.0, p2: 9.2, p3: null, attendance: 92, status: 'active' },
  { subject: 'Arquitectura de SW', code: 'ISC-507', teacher: 'Dr. Torres', p1: 9.5, p2: 9.0, p3: null, attendance: 98, status: 'active' },
  { subject: 'Bases de Datos', code: 'ISC-503', teacher: 'Mtro. Vega', p1: 7.5, p2: 8.0, p3: null, attendance: 88, status: 'active' },
  { subject: 'Inglés Técnico', code: 'ISC-510', teacher: 'Mtra. Peña', p1: 9.8, p2: 9.5, p3: null, attendance: 100, status: 'active' },
  { subject: 'Estadística', code: 'ISC-505', teacher: 'Dr. Luna', p1: 6.5, p2: 7.0, p3: null, attendance: 78, status: 'risk' },
]

const teacherGroups = [
  {
    subject: 'Cálculo Integral', code: 'IN-201', partial: 2,
    students: [
      { name: 'Laura Méndez', id: '2024-0312', p1: 9.0, p2: null, attendance: 95 },
      { name: 'Rodrigo Alvarado', id: '2023-0887', p1: 8.5, p2: null, attendance: 88 },
      { name: 'Carlos Peralta', id: '2022-1145', p1: 6.0, p2: null, attendance: 72 },
      { name: 'Sofía González', id: '2024-0056', p1: 9.8, p2: null, attendance: 100 },
      { name: 'Marcos Herrera', id: '2021-2201', p1: 7.5, p2: null, attendance: 85 },
    ]
  }
]

function avg(grades) {
  const valid = grades.filter(g => g !== null)
  if (!valid.length) return null
  return (valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(1)
}

function GradeCell({ value, editable = false, onChange }) {
  if (editable) return (
    <input type="number" min="0" max="10" step="0.1" defaultValue={value || ''}
      placeholder="—"
      onChange={e => onChange && onChange(parseFloat(e.target.value))}
      style={{ width: 56, background: '#185fa520', border: '1px solid #185fa5', borderRadius: 6, padding: '4px 8px', fontSize: 13, color: '#a4c9ff', textAlign: 'center', outline: 'none' }} />
  )
  if (value === null) return <span style={{ color: '#424751' }}>—</span>
  const color = value >= 8 ? '#4ade80' : value >= 7 ? '#fbbf24' : '#f87171'
  return <span style={{ fontWeight: 600, color }}>{value}</span>
}

function StudentGrades() {
  const totalSubjects = studentGrades.length
  const approvedSubjects = studentGrades.filter(g => {
    const a = avg([g.p1, g.p2, g.p3])
    return a && parseFloat(a) >= 7
  }).length
  const approvedPct = Math.round((approvedSubjects / totalSubjects) * 100)
  const overallAvg = (studentGrades.reduce((s, g) => s + avg([g.p1, g.p2, g.p3]) * 1, 0) / totalSubjects).toFixed(2)
  const atRisk = studentGrades.filter(g => g.attendance < 90 || (g.p1 < 7 && g.p2 < 7))

  const card = { background: '#152031', border: '1px solid #424751', borderRadius: 12 }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#d8e3fb' }}>Mis Calificaciones</h1>
        <p style={{ fontSize: 13, color: '#8c919c', marginTop: 4 }}>Cuatrimestre 2025-B</p>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          { label: 'Promedio General', value: overallAvg, color: parseFloat(overallAvg) >= 8 ? '#4ade80' : '#fbbf24', icon: 'grade', req: '≥ 8.0 para titularse' },
          { label: 'Materias Aprobadas', value: `${approvedSubjects}/${totalSubjects}`, color: approvedPct >= 80 ? '#4ade80' : '#fbbf24', icon: 'check_circle', req: `${approvedPct}% — requiere ≥ 80%` },
          { label: 'Materias en Riesgo', value: atRisk.length, color: atRisk.length === 0 ? '#4ade80' : '#f87171', icon: 'warning', req: 'Asistencia < 90% o promedio < 7' },
        ].map(k => (
          <div key={k.label} style={{ ...card, padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8c919c' }}>{k.label}</span>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: k.color }}>{k.icon}</span>
            </div>
            <p style={{ fontSize: 32, fontWeight: 700, color: k.color, lineHeight: 1 }}>{k.value}</p>
            <p style={{ fontSize: 11, color: '#8c919c', marginTop: 6 }}>{k.req}</p>
          </div>
        ))}
      </div>

      {/* Alerts */}
      {atRisk.length > 0 && atRisk.map(g => (
        <div key={g.code} style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="material-symbols-outlined" style={{ color: '#f87171' }}>error</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#f87171' }}>Riesgo académico — {g.subject}</p>
            <p style={{ fontSize: 12, color: '#8c919c' }}>
              {g.attendance < 90 ? `Asistencia: ${g.attendance}% (mínimo 90%)` : `Promedio: ${avg([g.p1, g.p2, g.p3])} (mínimo 7.0)`}
            </p>
          </div>
        </div>
      ))}

      {/* Grades table */}
      <div style={card}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #424751' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#d8e3fb' }}>Detalle por materia</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#1f2a3c' }}>
                {['Materia', 'Docente', 'Parcial 1', 'Parcial 2', 'Parcial 3', 'Promedio', 'Asistencia', 'Estado'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {studentGrades.map(g => {
                const a = avg([g.p1, g.p2, g.p3])
                const isRisk = g.attendance < 90 || (a && parseFloat(a) < 7)
                return (
                  <tr key={g.code} style={{ borderBottom: '1px solid #42475133' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <p style={{ fontWeight: 600, color: '#d8e3fb' }}>{g.subject}</p>
                      <p style={{ fontSize: 11, color: '#a4c9ff' }}>{g.code}</p>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#8c919c', fontSize: 12 }}>{g.teacher}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}><GradeCell value={g.p1} /></td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}><GradeCell value={g.p2} /></td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}><GradeCell value={g.p3} /></td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <span style={{ fontWeight: 700, fontSize: 15, color: a >= 8 ? '#4ade80' : a >= 7 ? '#fbbf24' : '#f87171' }}>{a || '—'}</span>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <span style={{ color: g.attendance >= 90 ? '#4ade80' : '#f87171', fontWeight: 600 }}>{g.attendance}%</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      {isRisk
                        ? <span style={{ padding: '3px 10px', borderRadius: 999, background: 'rgba(248,113,113,0.15)', color: '#f87171', fontSize: 11, fontWeight: 600 }}>En riesgo</span>
                        : <span style={{ padding: '3px 10px', borderRadius: 999, background: 'rgba(74,222,128,0.15)', color: '#4ade80', fontSize: 11, fontWeight: 600 }}>Regular</span>
                      }
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function TeacherGrades() {
  const group = teacherGroups[0]
  const card = { background: '#152031', border: '1px solid #424751', borderRadius: 12 }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#d8e3fb' }}>Captura de Calificaciones</h1>
          <p style={{ fontSize: 13, color: '#8c919c', marginTop: 4 }}>Cuatrimestre 2025-B</p>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#185fa5', color: '#c1d9ff', padding: '9px 20px', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>save</span> Guardar calificaciones
        </button>
      </div>

      {/* Alert */}
      <div style={{ background: 'rgba(255,183,129,0.1)', border: '1px solid rgba(255,183,129,0.25)', borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span className="material-symbols-outlined" style={{ color: '#ffb781' }}>schedule</span>
        <p style={{ fontSize: 13, color: '#ffb781' }}>El cierre de captura del <strong>Parcial 2</strong> para {group.subject} es en <strong>48 horas</strong>.</p>
      </div>

      <div style={card}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #424751', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#d8e3fb' }}>{group.subject}</h3>
            <p style={{ fontSize: 12, color: '#8c919c' }}>{group.code} · Parcial {group.partial} en captura</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[1, 2, 3].map(p => (
              <button key={p} style={{ padding: '5px 14px', borderRadius: 6, border: 'none', background: p === group.partial ? '#185fa5' : '#2a3548', color: p === group.partial ? '#c1d9ff' : '#8c919c', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                P{p}
              </button>
            ))}
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#1f2a3c' }}>
                {['Alumno', 'Matrícula', 'Parcial 1', 'Parcial 2 (capturando)', 'Asistencia', 'Promedio'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {group.students.map(s => {
                const a = avg([s.p1, s.p2])
                return (
                  <tr key={s.id} style={{ borderBottom: '1px solid #42475133' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 500, color: '#d8e3fb' }}>{s.name}</td>
                    <td style={{ padding: '12px 16px', color: '#8c919c', fontSize: 12 }}>{s.id}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}><GradeCell value={s.p1} /></td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}><GradeCell value={s.p2} editable /></td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <span style={{ color: s.attendance >= 90 ? '#4ade80' : '#f87171', fontWeight: 600 }}>{s.attendance}%</span>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <span style={{ fontWeight: 700, color: '#8c919c' }}>{a || '—'}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function GradesPage() {
  const { user } = useAuthStore()
  if (user?.role === 'teacher') return <TeacherGrades />
  if (user?.role === 'student') return <StudentGrades />
  return <StudentGrades /> // admin ve vista alumno por defecto
}