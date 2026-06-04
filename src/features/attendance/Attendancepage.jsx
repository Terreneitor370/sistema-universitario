import { useState } from 'react'

const groups = [
  { id: 'G1', code: 'ISC-507-A', subject: 'Arquitectura de Software', students: 30 },
  { id: 'G2', code: 'MAT-201-B', subject: 'Cálculo Integral', students: 32 },
  { id: 'G3', code: 'ISC-507-B', subject: 'Arquitectura de Software', students: 28 },
]

const generateStudents = (n) => Array.from({ length: n }, (_, i) => ({
  id: i + 1,
  name: ['Laura Méndez','Rodrigo Alvarado','Sofía González','Carlos Peralta','Marcos Herrera','Ana López','Jorge Ruiz','María Torres','Luis Vega','Diana Reyes','Pablo Mora','Elena Castro','Ricardo Fuentes','Sandra Leal','Tomás Ibarra'][i % 15],
  matricula: `2024-${String(i + 100).padStart(4, '0')}`,
  attendance: Math.floor(Math.random() * 30 + 65),
  today: null,
}))

export default function AttendancePage() {
  const [selectedGroup, setSelectedGroup] = useState('G1')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [students, setStudents] = useState(generateStudents(15))
  const [saved, setSaved] = useState(false)
  const [filterVal, setFilterVal] = useState('all')

  const group = groups.find(g => g.id === selectedGroup)

  function markAll(status) {
    setStudents(prev => prev.map(s => ({ ...s, today: status })))
    setSaved(false)
  }

  function toggle(id, status) {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, today: status } : s))
    setSaved(false)
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const present = students.filter(s => s.today === 'present').length
  const absent = students.filter(s => s.today === 'absent').length
  const late = students.filter(s => s.today === 'late').length
  const pending = students.filter(s => s.today === null).length

  const filtered = filterVal === 'all' ? students
    : filterVal === 'risk' ? students.filter(s => s.attendance < 90)
    : students.filter(s => s.today === filterVal)

  const card = { background: '#152031', border: '1px solid #424751', borderRadius: 12 }

  const StatusBtn = ({ id, current, value, label, color }) => (
    <button onClick={() => toggle(id, value)}
      style={{ padding: '5px 12px', borderRadius: 6, border: `1px solid ${current === value ? color : '#424751'}`, background: current === value ? `${color}20` : 'transparent', color: current === value ? color : '#8c919c', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
      {label}
    </button>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#d8e3fb' }}>Control de Asistencia</h1>
          <p style={{ fontSize: 13, color: '#8c919c', marginTop: 4 }}>Registra la asistencia de tus grupos.</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <input type="date" value={date} onChange={e => { setDate(e.target.value); setSaved(false) }}
            style={{ background: '#152031', border: '1px solid #424751', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#d8e3fb', outline: 'none', cursor: 'pointer' }} />
          <button onClick={handleSave}
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: saved ? 'rgba(74,222,128,0.15)' : '#185fa5', color: saved ? '#4ade80' : '#c1d9ff', padding: '9px 20px', borderRadius: 8, border: saved ? '1px solid rgba(74,222,128,0.4)' : 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{saved ? 'check' : 'save'}</span>
            {saved ? 'Guardado' : 'Guardar lista'}
          </button>
        </div>
      </div>

      {/* Group selector */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {groups.map(g => (
          <button key={g.id} onClick={() => { setSelectedGroup(g.id); setStudents(generateStudents(g.students)); setSaved(false) }}
            style={{ padding: '8px 18px', borderRadius: 8, border: `1px solid ${selectedGroup === g.id ? '#185fa5' : '#424751'}`, background: selectedGroup === g.id ? '#185fa520' : 'transparent', color: selectedGroup === g.id ? '#a4c9ff' : '#8c919c', fontSize: 13, fontWeight: selectedGroup === g.id ? 600 : 400, cursor: 'pointer' }}>
            {g.code} — {g.subject}
          </button>
        ))}
      </div>

      {/* Summary KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {[
          { label: 'Presentes', value: present, color: '#4ade80', icon: 'check_circle' },
          { label: 'Ausentes', value: absent, color: '#f87171', icon: 'cancel' },
          { label: 'Tardanzas', value: late, color: '#fbbf24', icon: 'schedule' },
          { label: 'Sin marcar', value: pending, color: '#8c919c', icon: 'radio_button_unchecked' },
        ].map(k => (
          <div key={k.label} style={{ ...card, padding: '1rem', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="material-symbols-outlined" style={{ color: k.color, fontSize: 22 }}>{k.icon}</span>
            <div>
              <p style={{ fontSize: 22, fontWeight: 700, color: k.color }}>{k.value}</p>
              <p style={{ fontSize: 11, color: '#8c919c' }}>{k.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bulk actions + filter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#8c919c' }}>Marcar todos:</span>
          <button onClick={() => markAll('present')} style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid rgba(74,222,128,0.3)', background: 'rgba(74,222,128,0.1)', color: '#4ade80', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Presentes</button>
          <button onClick={() => markAll('absent')} style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid rgba(248,113,113,0.3)', background: 'rgba(248,113,113,0.1)', color: '#f87171', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Ausentes</button>
          <button onClick={() => markAll(null)} style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #424751', background: 'none', color: '#8c919c', fontSize: 12, cursor: 'pointer' }}>Limpiar</button>
        </div>
        <div style={{ display: 'flex', gap: 2, background: '#2a3548', borderRadius: 999, padding: 3 }}>
          {[['all','Todos'],['risk','En riesgo'],['absent','Ausentes']].map(([v,l]) => (
            <button key={v} onClick={() => setFilterVal(v)}
              style={{ padding: '5px 14px', borderRadius: 999, border: 'none', background: filterVal === v ? '#185fa5' : 'transparent', color: filterVal === v ? '#c1d9ff' : '#8c919c', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Student list */}
      <div style={card}>
        <div style={{ padding: '12px 20px', borderBottom: '1px solid #424751', background: '#1f2a3c', borderRadius: '12px 12px 0 0' }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#d8e3fb' }}>{group?.subject} · {group?.code} · {date}</h3>
        </div>
        {filtered.map((s, i) => {
          const pct = s.attendance
          const atRisk = pct < 90
          return (
            <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', alignItems: 'center', gap: 16, padding: '12px 20px', borderBottom: i < filtered.length - 1 ? '1px solid #42475133' : 'none', background: atRisk ? 'rgba(248,113,113,0.04)' : 'transparent' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#185fa530', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: '#a4c9ff', flexShrink: 0 }}>
                  {s.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: '#d8e3fb' }}>{s.name}</p>
                  <p style={{ fontSize: 11, color: '#8c919c' }}>{s.matricula}</p>
                </div>
                {atRisk && <span style={{ padding: '2px 8px', borderRadius: 999, background: 'rgba(248,113,113,0.12)', color: '#f87171', fontSize: 10, fontWeight: 600 }}>Riesgo {pct}%</span>}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 11, color: '#8c919c' }}>Asistencia acumulada:</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: pct >= 90 ? '#4ade80' : '#f87171' }}>{pct}%</span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <StatusBtn id={s.id} current={s.today} value="present" label="✓ Presente" color="#4ade80" />
                <StatusBtn id={s.id} current={s.today} value="late" label="⏱ Tardanza" color="#fbbf24" />
                <StatusBtn id={s.id} current={s.today} value="absent" label="✗ Ausente" color="#f87171" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}