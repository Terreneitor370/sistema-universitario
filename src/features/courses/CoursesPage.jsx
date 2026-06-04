export default function CoursesPage() {

  const statusStyle = {
    open:   { background: 'rgba(34,197,94,0.15)', color: '#4ade80', border: 'rgba(34,197,94,0.3)' },
    full:   { background: 'rgba(239,68,68,0.15)',  color: '#f87171', border: 'rgba(239,68,68,0.3)' },
    almost: { background: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: 'rgba(245,158,11,0.3)' },
  }

  const card = { background: '#152031', border: '1px solid #424751', borderRadius: 12 }

  const courses = [
    { code: 'CS101', name: 'Intro to Computer Science', prof: 'Dr. Reyes', enrolled: '24/30', schedule: 'Mon/Wed 10:00', statusType: 'open', status: 'Open' },
    { code: 'ENG204', name: 'English Literature', prof: 'M. Ortega', enrolled: '18/25', schedule: 'Tue/Thu 12:00', statusType: 'almost', status: 'Almost Full' },
    { code: 'MATH301', name: 'Calculus II', prof: 'A. Pérez', enrolled: '25/25', schedule: 'Mon/Wed/Fri 14:00', statusType: 'full', status: 'Full' },
    { code: 'HIST110', name: 'World History', prof: 'L. Gómez', enrolled: '20/30', schedule: 'Tue/Thu 09:00', statusType: 'open', status: 'Open' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#d8e3fb' }}>Course Management</h1>
        <p style={{ fontSize: 14, color: '#8c919c', marginTop: 4 }}>Create and manage academic offerings.</p>
      </div>

      {/* Form */}
      <div style={{ ...card, padding: '1.5rem' }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: '#d8e3fb', marginBottom: 16 }}>Create New Course</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[['Course Name', 'text', 'e.g. Introduction to Computer Science'],['Course Code', 'text', 'e.g. CS101'],['Department', 'select'],['Assigned Professor', 'select'],['Max Capacity', 'number']].map(([label, type, ph]) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#8c919c', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</label>
              {type === 'select' ? (
                <select style={{ background: '#040e1f', border: '1px solid #424751', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#d8e3fb', outline: 'none' }}>
                  <option>Select...</option>
                </select>
              ) : (
                <input type={type} placeholder={ph} style={{ background: '#040e1f', border: '1px solid #424751', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#d8e3fb', outline: 'none' }} />
              )}
            </div>
          ))}
          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end' }}>
            <button style={{ background: '#185fa5', color: '#c1d9ff', padding: '10px 24px', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
              Create Course
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ ...card, overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid #424751', background: '#1f2a3c' }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: '#d8e3fb' }}>Course Catalog</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            {['filter_list', 'more_vert'].map(icon => (
              <button key={icon} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8c919c', padding: 6, borderRadius: 6 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{icon}</span>
              </button>
            ))}
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#152031', borderBottom: '1px solid #424751' }}>
                {['Code', 'Course Name', 'Professor', 'Enrolled/Cap', 'Schedule', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courses.map(c => {
                const s = statusStyle[c.statusType]
                return (
                  <tr key={c.code} style={{ borderBottom: '1px solid #42475133' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#d8e3fb' }}>{c.code}</td>
                    <td style={{ padding: '12px 16px', color: '#b7c8e1' }}>{c.name}</td>
                    <td style={{ padding: '12px 16px', color: '#b7c8e1' }}>{c.prof}</td>
                    <td style={{ padding: '12px 16px', color: '#d8e3fb', textAlign: 'center' }}></td>
                    <td style={{ padding: '12px 16px', color: '#d8e3fb', textAlign: 'center' }}>{c.enrolled}</td>
                    <td style={{ padding: '12px 16px', color: '#8c919c', fontSize: 12 }}>{c.schedule}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: s.background, color: s.color, border: `1px solid ${s.border}` }}>{c.status}</span>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8c919c' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>edit</span>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', borderTop: '1px solid #424751', background: '#152031' }}>
          <span style={{ fontSize: 11, color: '#8c919c' }}>Showing 1 to 4 of 48 courses</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {['1', '2', '3'].map((n, i) => (
              <button key={n} style={{ padding: '4px 10px', borderRadius: 6, border: i === 0 ? 'none' : '1px solid #424751', background: i === 0 ? '#185fa5' : 'none', color: i === 0 ? '#c1d9ff' : '#d8e3fb', fontSize: 12, cursor: 'pointer' }}>{n}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}