export default function AdminDashboard() {
  const kpis = [
    { label: 'Active Students', value: '12,480', trend: '+2.5%', icon: 'group', up: true },
    { label: 'Courses Offered', value: '450', trend: 'Stable', icon: 'library_books', up: null },
    { label: 'Retention Rate', value: '94%', trend: '+1.2%', icon: 'how_to_reg', up: true },
    { label: 'General Average', value: '3.82', trend: '+0.05 GPA', icon: 'analytics', up: true },
  ]

  const bars = [
    { label: 'Comp Sci', pct: 85, val: '4,250' },
    { label: 'Business', pct: 70, val: '3,500' },
    { label: 'Arts', pct: 40, val: '2,000' },
    { label: 'Engineering', pct: 60, val: '3,000' },
    { label: 'Medicine', pct: 25, val: '1,250' },
  ]

  const schedule = [
    { time: '9:00 AM', dur: '1.5 hrs', name: 'Intro to AI', loc: 'Room 402 • Prof. Smith', color: '#185fa5' },
    { time: '11:30 AM', dur: '2.0 hrs', name: 'Macroeconomics', loc: 'Auditorium B • Prof. Davis', color: '#924b00' },
    { time: '2:00 PM', dur: '1.0 hrs', name: 'Digital Marketing', loc: 'Room 105 • Prof. Miller', color: '#3a4a5f' },
    { time: '4:00 PM', dur: '1.0 hrs', name: 'Faculty Meeting', loc: 'Conference Room 1', color: '#424751', muted: true },
  ]

  const activity = [
    { dot: '#a4c9ff', text: 'New student registered:', detail: 'Sarah Jenkins (Computer Science)', time: '10 mins ago' },
    { dot: '#b7c8e1', text: 'Grade report generated:', detail: 'Fall Semester 2023 - Business Administration', time: '45 mins ago by Admin System' },
    { dot: '#ffb781', text: 'System maintenance scheduled:', detail: 'Servers will be down for 2 hours this Sunday.', time: '2 hours ago by IT Dept' },
    { dot: '#424751', text: 'Course capacity updated:', detail: "'Introduction to Psychology' increased to 120 seats.", time: 'Yesterday at 3:15 PM' },
  ]

  const card = { background: '#111c2d', border: '1px solid #424751', borderRadius: 12, padding: '1.5rem' }
  const small = { fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: '#d8e3fb' }}>Dashboard Overview</h2>
        <p style={{ fontSize: 14, color: '#8c919c', marginTop: 4 }}>Welcome back. Here is the current status of the institution.</p>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
        {kpis.map(k => (
          <div key={k.label} style={{ ...card, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ ...small, color: '#b7c8e1' }}>{k.label}</span>
              <div style={{ background: '#185fa5', borderRadius: 8, padding: '4px 6px', display: 'flex' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#c1d9ff' }}>{k.icon}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <span style={{ fontSize: 32, fontWeight: 700, color: '#d8e3fb', lineHeight: 1 }}>{k.value}</span>
              {k.trend && <span style={{ fontSize: 11, fontWeight: 500, color: k.up === false ? '#ffb4ab' : '#a4c9ff', marginBottom: 2 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{k.up === null ? 'trending_flat' : k.up ? 'trending_up' : 'trending_down'}</span> {k.trend}
              </span>}
            </div>
          </div>
        ))}
      </div>

      {/* Middle row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Bar chart */}
        <div style={{ ...card }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: '#d8e3fb', marginBottom: 16 }}>Enrollment by Department</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 200, borderBottom: '1px solid #424751', paddingBottom: 8 }}>
            {bars.map(b => (
              <div key={b.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '100%', maxWidth: 56, borderRadius: '4px 4px 0 0', background: '#a4c9ff', height: `${b.pct}%`, position: 'relative' }}
                  title={b.val} />
                <span style={{ fontSize: 10, color: '#8c919c', textAlign: 'center' }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div style={{ ...card }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#d8e3fb' }}>Today's Class Schedule</h3>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#a4c9ff', fontSize: 12 }}>View All</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {schedule.map(s => (
              <div key={s.time} style={{ display: 'flex', borderLeft: `4px solid ${s.color}`, background: `${s.color}15`, padding: '8px 12px', borderRadius: '0 8px 8px 0', opacity: s.muted ? 0.5 : 1 }}>
                <div style={{ width: 70, flexShrink: 0, borderRight: '1px solid #42475144', paddingRight: 10, marginRight: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#d8e3fb' }}>{s.time}</div>
                  <div style={{ fontSize: 10, color: '#8c919c' }}>{s.dur}</div>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#d8e3fb' }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: '#8c919c' }}>{s.loc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity feed */}
      <div style={{ ...card }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, borderBottom: '1px solid #424751', marginBottom: 12 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: '#d8e3fb' }}>Recent Activity Feed</h3>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8c919c', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>refresh</span> Update
          </button>
        </div>
        {activity.map((a, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '8px 0', borderBottom: i < activity.length - 1 ? '1px solid #42475133' : 'none' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.dot, flexShrink: 0, marginTop: 6 }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, color: '#d8e3fb' }}><strong>{a.text}</strong> {a.detail}</p>
              <span style={{ fontSize: 11, color: '#8c919c' }}>{a.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
