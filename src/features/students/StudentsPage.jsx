export default function StudentsPage() {
  const students = [
    { name: 'Elena Jenkins', initials: 'EJ', id: 'UMS-10293', major: 'Computer Science', sem: '6th', gpa: '3.85', status: 'Active', statusClass: 'active', pct: 75 },
    { name: 'Marcus Chen', initials: 'MC', id: 'UMS-10442', major: 'Business Admin', sem: '4th', gpa: '2.40', status: 'At Risk', statusClass: 'risk', pct: 45 },
    { name: 'Sarah Williams', initials: 'SW', id: 'UMS-10501', major: 'Psychology', sem: '5th', gpa: '3.20', status: 'Partial Leave', statusClass: 'leave', pct: 60 },
    { name: 'James Patel', initials: 'JP', id: 'UMS-10118', major: 'Engineering', sem: '8th', gpa: '3.92', status: 'Baja', statusClass: 'leave', pct: 95 },
  ]

  const statusColors = {
    active: { bg: '#a4c9ff22', text: '#a4c9ff' },
    risk: { bg: '#ffb4ab22', text: '#ffb4ab' },
    leave: { bg: '#ffb78122', text: '#ffb781' },
  }

  const barColors = { active: '#a4c9ff', risk: '#ffb4ab', leave: '#ffb781' }

  const card = { background: '#152031', border: '1px solid #424751', borderRadius: 12, overflow: 'hidden' }

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#d8e3fb' }}>Students Directory</h1>
        <p style={{ fontSize: 16, color: '#8c919c', marginTop: 4 }}>Manage and track student academic progress.</p>
      </div>

      <div style={card}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 24, padding: '0 24px', borderBottom: '1px solid #424751', background: '#2f3a4c' }}>
          {['All Students', 'By Major', 'Academic Alerts'].map((t, i) => (
            <button key={t} style={{ padding: '10px 0', background: 'none', border: 'none', borderBottom: i === 0 ? '2px solid #a4c9ff' : '2px solid transparent', color: i === 0 ? '#a4c9ff' : '#8c919c', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', cursor: 'pointer' }}>
              {t}
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#1f2a3c', borderBottom: '1px solid #424751' }}>
                {['Student Name', 'ID Number', 'Major', 'Semester', 'GPA', 'Status', 'Progress', ''].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#8c919c', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id} style={{ borderBottom: '1px solid #42475133' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#1f2a3c'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#3a4a5f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: '#a9bad3', flexShrink: 0 }}>{s.initials}</div>
                      <span style={{ color: '#d8e3fb', fontWeight: 500 }}>{s.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#8c919c' }}>{s.id}</td>
                  <td style={{ padding: '12px 16px', color: '#b7c8e1' }}>{s.major}</td>
                  <td style={{ padding: '12px 16px', color: '#b7c8e1' }}>{s.sem}</td>
                  <td style={{ padding: '12px 16px', color: '#d8e3fb', fontWeight: 600, textAlign: 'right' }}>{s.gpa}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <span style={{ padding: '3px 10px', borderRadius: 4, background: statusColors[s.statusClass].bg, color: statusColors[s.statusClass].text, fontSize: 11, fontWeight: 600 }}>{s.status}</span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 6, background: '#2a3548', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${s.pct}%`, background: barColors[s.statusClass], borderRadius: 3 }} />
                      </div>
                      <span style={{ fontSize: 11, color: '#8c919c', width: 30 }}>{s.pct}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8c919c' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', borderTop: '1px solid #424751', background: '#2f3a4c' }}>
          <span style={{ fontSize: 12, color: '#8c919c' }}>Showing 1-4 of 1,248 students</span>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ padding: '4px 6px', background: 'none', border: 'none', cursor: 'pointer', color: '#8c919c', opacity: 0.4 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_left</span>
            </button>
            <button style={{ padding: '4px 6px', background: 'none', border: 'none', cursor: 'pointer', color: '#b7c8e1' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}