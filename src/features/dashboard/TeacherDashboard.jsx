import { useAuthStore } from '@store/authStore'

export default function TeacherDashboard() {
  const { user } = useAuthStore()

  const groups = [
    { name: 'Cálculo Integral', code: 'IN-201', schedule: 'Lun-Mie 07:00-09:00', room: 'Lab 3', students: 30 },
    { name: 'Álgebra Lineal', code: 'IN-205', schedule: 'Mar-Jue 09:00-11:00', room: 'Aula 204', students: 32 },
    { name: 'Ecuaciones Diferenciales', code: 'IN-302', schedule: 'Vie 07:00-11:00', room: 'Aula 101', students: 28 },
  ]

  const notices = [
    { icon: 'assignment_late', label: 'IMPORTANTE', title: 'Límite de Entrega de Actas', body: 'Fecha definitiva para el cargue de actas finales en el sistema central.', date: 'Oct 20, 2025', color: '#ffb781' },
    { icon: 'groups', label: 'ACADEMIA', title: 'Junta de Facultad', body: 'Sesión ordinaria con el Decano para discusión de proyectos de investigación.', date: 'Oct 22, 13:00 hrs', color: '#b7c8e1' },
  ]

  const card = { background: '#152031', border: '1px solid #424751', borderRadius: 12 }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#a4c9ff', letterSpacing: '-0.02em' }}>Bienvenido, {user?.name || 'Dr. Ernesto Torres'} — Semestre 2025-B</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
          <span style={{ background: '#2a3548', color: '#8c919c', borderRadius: 999, padding: '2px 10px', fontSize: 11, fontWeight: 600 }}>ID: 2025-ET01</span>
          <span style={{ color: '#424751' }}>|</span>
          <span style={{ fontSize: 14, color: '#8c919c' }}>Facultad de Ingeniería</span>
        </div>
      </div>

      {/* Alert */}
      <div style={{ background: '#924b0033', border: '1px solid #924b0055', borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#ffceac' }}>warning</span>
          <p style={{ fontSize: 14, color: '#ffceac' }}><strong>Atención:</strong> La captura del Segundo Parcial para el grupo <strong>IN-201</strong> cierra en 48 horas.</p>
        </div>
        <button style={{ background: '#ffceac', color: '#4e2500', padding: '8px 20px', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}>
          Capturar ahora
        </button>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          { label: 'Grupos Activos', value: '4 clases', icon: 'group', bg: 'rgba(164,201,255,0.1)', color: '#a4c9ff' },
          { label: 'Total de Alumnos', value: '120 inscritos', icon: 'person', bg: 'rgba(58,74,95,0.3)', color: '#b7c8e1' },
          { label: 'Calificaciones Pendientes', value: '2 parciales', icon: 'pending_actions', bg: 'rgba(146,75,0,0.3)', color: '#ffb781' },
        ].map(k => (
          <div key={k.label} style={{ ...card, padding: '1.25rem', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 52, height: 52, background: k.bg, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 28, color: k.color }}>{k.icon}</span>
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8c919c' }}>{k.label}</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: '#d8e3fb', marginTop: 2 }}>{k.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        {/* Groups table */}
        <div style={{ ...card, overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid #424751' }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#d8e3fb' }}>Mis grupos este semestre</h2>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#a4c9ff', fontSize: 12 }}>Ver todos</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#1f2a3c' }}>
                  {['Materia / Grupo', 'Horario', 'Salón', 'Alumnos', 'Acción'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {groups.map(g => (
                  <tr key={g.code} style={{ borderBottom: '1px solid #42475133' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <p style={{ fontWeight: 600, color: '#d8e3fb' }}>{g.name}</p>
                      <p style={{ fontSize: 11, color: '#a4c9ff', marginTop: 2 }}>{g.code}</p>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#b7c8e1' }}>{g.schedule}</td>
                    <td style={{ padding: '12px 16px', color: '#b7c8e1' }}>{g.room}</td>
                    <td style={{ padding: '12px 16px', color: '#d8e3fb', textAlign: 'center' }}>{g.students}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <button style={{ background: '#a4c9ff', color: '#00315d', padding: '4px 12px', borderRadius: 6, border: 'none', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
                        Ver grupo
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#d8e3fb' }}>Avisos institucionales</h2>
          {notices.map(n => (
            <div key={n.title} style={{ ...card, padding: '1rem 1.25rem', display: 'flex', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: `${n.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ color: n.color }}>{n.icon}</span>
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#d8e3fb', marginBottom: 4 }}>{n.title}</p>
                <p style={{ fontSize: 12, color: '#8c919c', marginBottom: 6 }}>{n.body}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: n.color }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>event</span>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{n.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
