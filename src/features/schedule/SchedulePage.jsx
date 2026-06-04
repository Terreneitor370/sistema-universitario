export default function SchedulePage() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const times = ['07:00', '09:00', '11:00', '13:00', '15:00']

  const classes = {
    '07:00-Mon': { name: 'Cálculo Diferencial', room: 'Aula 101', teacher: 'Dr. Ramírez', color: '#185fa5' },
    '07:00-Wed': { name: 'Cálculo Diferencial', room: 'Aula 101', teacher: 'Dr. Ramírez', color: '#185fa5' },
    '09:00-Tue': { name: 'Programación Avanzada', room: 'Lab 3', teacher: 'Dra. Morales', color: '#0d9488' },
    '09:00-Thu': { name: 'Programación Avanzada', room: 'Lab 3', teacher: 'Dra. Morales', color: '#0d9488' },
    '11:00-Mon': { name: 'Bases de Datos', room: 'Aula 204', teacher: 'Mtro. Vega', color: '#9333ea' },
    '11:00-Wed': { name: 'Bases de Datos', room: 'Aula 204', teacher: 'Mtro. Vega', color: '#9333ea' },
    '13:00-Thu': { name: 'Arquitectura de SW', room: 'Sala B', teacher: 'Dr. Torres', color: '#d97706' },
    '15:00-Tue': { name: 'Arquitectura de SW', room: 'Sala B', teacher: 'Dr. Torres', color: '#d97706' },
  }

  const dayKeys = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  const dateMap = { Mon: 'Oct 14', Tue: 'Oct 15', Wed: 'Oct 16', Thu: 'Oct 17', Fri: 'Oct 18' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#d8e3fb' }}>Weekly Schedule</h1>
          <p style={{ fontSize: 13, color: '#8c919c', marginTop: 4 }}>Fall Semester 2024</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Semana anterior', 'Semana siguiente'].map((l, i) => (
            <button key={l} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '7px 14px', background: 'none', border: '1px solid #424751', borderRadius: 6, color: '#d8e3fb', fontSize: 12, cursor: 'pointer' }}>
              {i === 0 && <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_left</span>}
              {l}
              {i === 1 && <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_right</span>}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: '#1f2a3c', border: '1px solid #424751', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: 800 }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(5, 1fr)', borderBottom: '1px solid #424751', background: '#2a3548' }}>
              <div style={{ padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#8c919c', borderRight: '1px solid #42475155' }}>GMT</div>
              {days.map((d, i) => (
                <div key={d} style={{ padding: 10, textAlign: 'center', borderRight: i < 4 ? '1px solid #42475155' : 'none' }}>
                  <span style={{ display: 'block', fontSize: 13, fontWeight: 700, color: dayKeys[i] === 'Wed' ? '#a4c9ff' : '#d8e3fb' }}>{d}</span>
                  <span style={{ display: 'block', fontSize: 11, color: dayKeys[i] === 'Wed' ? '#a4c9ff' : '#8c919c', marginTop: 2 }}>{dateMap[dayKeys[i]]}</span>
                </div>
              ))}
            </div>

            {/* Time rows */}
            {times.map(time => (
              <div key={time} style={{ display: 'grid', gridTemplateColumns: '80px repeat(5, 1fr)', borderBottom: '1px solid #42475133', minHeight: 110 }}>
                <div style={{ padding: 10, paddingTop: 16, textAlign: 'right', fontSize: 11, color: '#8c919c', borderRight: '1px solid #42475155' }}>{time}</div>
                {dayKeys.map((dk, i) => {
                  const key = `${time}-${dk}`
                  const cls = classes[key]
                  return (
                    <div key={dk} style={{ borderRight: i < 4 ? '1px solid #42475122' : 'none', padding: 4, position: 'relative' }}>
                      {cls && (
                        <div style={{
                          position: 'absolute', inset: 6, background: `${cls.color}22`, border: `1px solid ${cls.color}55`,
                          borderRadius: 8, padding: '8px 10px', display: 'flex', flexDirection: 'column', cursor: 'pointer',
                        }}>
                          <span style={{ fontSize: 11, fontWeight: 600, color: cls.color }}>{cls.name}</span>
                          <span style={{ fontSize: 10, color: '#b7c8e1', marginTop: 4, display: 'flex', alignItems: 'center', gap: 3 }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 12 }}>person</span> {cls.teacher}
                          </span>
                          <span style={{ fontSize: 10, color: '#8c919c', marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 3 }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 12 }}>location_on</span> {cls.room}
                          </span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}