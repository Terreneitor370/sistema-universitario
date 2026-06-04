import { useAuthStore } from '@store/authStore'

export default function StudentDashboard() {
  const { user } = useAuthStore()

  const payments = [
    { concept: 'Colegiatura Octubre', amount: '$15,000.00', due: '15/10/2023', paid: '--', status: 'Pendiente', statusType: 'pending' },
    { concept: 'Colegiatura Septiembre', amount: '$15,000.00', due: '15/09/2023', paid: '12/09/2023', status: 'Pagado', statusType: 'paid' },
    { concept: 'Examen Extraordinario', amount: '$500.00', due: '20/09/2023', paid: '18/09/2023', status: 'Pagado', statusType: 'paid' },
    { concept: 'Colegiatura Noviembre', amount: '$15,000.00', due: '15/11/2023', paid: '--', status: 'Próximo', statusType: 'upcoming', muted: true },
  ]

  const statusStyle = {
    paid:     { background: 'rgba(74,222,128,0.1)', color: '#4ade80' },
    pending:  { background: 'rgba(239,68,68,0.1)',  color: '#f87171' },
    upcoming: { background: 'rgba(245,158,11,0.1)', color: '#fbbf24' },
  }

  const card = { background: 'rgba(21,32,49,0.7)', border: '1px solid rgba(140,145,156,0.1)', borderRadius: 12, padding: '1.25rem' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: '#d8e3fb' }}>Bienvenido, {user?.name?.split(' ')[0] || 'Estudiante'} — Semestre 2025-B</h1>
          <p style={{ fontSize: 14, color: '#8c919c', marginTop: 4 }}>Ingeniería en Sistemas Computacionales • Campus Central</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{ background: '#185fa5', color: '#c1d9ff', borderRadius: 999, padding: '4px 12px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase' }}>Inscrito</span>
          <span style={{ background: '#2a3548', color: '#8c919c', borderRadius: 999, padding: '4px 12px', fontSize: 11, fontWeight: 600 }}>ID: 0192837</span>
        </div>
      </div>

      {/* Alert */}
      <div style={{ background: 'rgba(255,183,129,0.1)', border: '1px solid rgba(255,183,129,0.2)', borderRadius: 12, padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, background: '#924b00', color: '#ffceac', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span className="material-symbols-outlined">priority_high</span>
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#ffb781' }}>Tienes un pago pendiente de <strong>$15,000 MXN</strong> vencido el 15 de Octubre.</p>
            <p style={{ fontSize: 11, color: '#8c919c', marginTop: 2 }}>Evita recargos adicionales realizando tu pago hoy mismo.</p>
          </div>
        </div>
        <button style={{ background: '#a4c9ff', color: '#00315d', padding: '8px 20px', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}>
          Realizar pago
        </button>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
        <div style={{ ...card, height: 140, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8c919c' }}>Promedio actual</span>
            <span className="material-symbols-outlined" style={{ color: '#a4c9ff', fontSize: 20 }}>trending_up</span>
          </div>
          <div>
            <p style={{ fontSize: 32, fontWeight: 700, color: '#a4c9ff', lineHeight: 1 }}>3.85</p>
            <p style={{ fontSize: 11, color: '#4ade80', marginTop: 4 }}>+0.12 vs semestre anterior</p>
          </div>
        </div>
        <div style={{ ...card, height: 140, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8c919c' }}>Créditos completados</span>
            <span className="material-symbols-outlined" style={{ color: '#a4c9ff', fontSize: 20 }}>school</span>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 6 }}>
              <p style={{ fontSize: 28, fontWeight: 700, color: '#d8e3fb', lineHeight: 1 }}>150<span style={{ fontSize: 14, fontWeight: 400, color: '#8c919c' }}>/300</span></p>
              <span style={{ fontSize: 12, color: '#8c919c' }}>50%</span>
            </div>
            <div style={{ height: 6, background: '#2a3548', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '50%', background: '#a4c9ff', borderRadius: 3 }} />
            </div>
          </div>
        </div>
        <div style={{ ...card, height: 140, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8c919c' }}>Asistencia total</span>
            <span className="material-symbols-outlined" style={{ color: '#a4c9ff', fontSize: 20 }}>verified</span>
          </div>
          <div>
            <p style={{ fontSize: 32, fontWeight: 700, color: '#d8e3fb', lineHeight: 1 }}>94%</p>
            <p style={{ fontSize: 11, color: '#8c919c', marginTop: 4 }}>Cumplimiento mínimo: 80%</p>
          </div>
        </div>
      </div>

      {/* Estado de cuenta */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={card}>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#d8e3fb', marginBottom: 16 }}>Estado de Cuenta</h3>
            {[['Colegiatura Total', '$45,000 MXN', '#d8e3fb'],['Monto Pagado', '$30,000 MXN', '#4ade80'],['Saldo Pendiente', '$15,000 MXN', '#f87171']].map(([l, v, c], i) => (
              <div key={l} style={{ paddingTop: i > 0 ? 12 : 0, borderTop: i > 0 ? '1px solid #424751' : 'none', marginTop: i > 0 ? 12 : 0 }}>
                <p style={{ fontSize: 10, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>{l}</p>
                <p style={{ fontSize: 20, fontWeight: 600, color: c }}>{v}</p>
              </div>
            ))}
          </div>
          <div style={card}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Métodos de pago</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {[['account_balance','SPEI'],['payments','Banco'],['credit_card','Online']].map(([icon, label]) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '8px 4px', background: '#152031', borderRadius: 8, cursor: 'pointer' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#a4c9ff' }}>{icon}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', color: '#b7c8e1' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment table */}
        <div style={{ background: 'rgba(21,32,49,0.7)', border: '1px solid rgba(140,145,156,0.1)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid #42475155', background: 'rgba(31,42,60,0.5)' }}>
            <h3 style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#d8e3fb' }}>Historial de pagos</h3>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#a4c9ff', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>download</span> Descargar Estado
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#11253133' }}>
                  {['Concepto', 'Monto', 'Vencimiento', 'Fecha Pago', 'Estado'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payments.map((p, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #42475133', opacity: p.muted ? 0.6 : 1 }}>
                    <td style={{ padding: '12px 16px', fontWeight: 500, color: '#d8e3fb' }}>{p.concept}</td>
                    <td style={{ padding: '12px 16px', color: '#b7c8e1' }}>{p.amount}</td>
                    <td style={{ padding: '12px 16px', color: '#b7c8e1' }}>{p.due}</td>
                    <td style={{ padding: '12px 16px', color: '#8c919c' }}>{p.paid}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, ...statusStyle[p.statusType] }}>{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

// Titulation checklist — exported separately for reuse
export function TitulationChecklist() {
  const requirements = [
    { label: 'Promedio general ≥ 8.0', met: true, value: '8.47', detail: 'Promedio actual' },
    { label: 'Materias aprobadas ≥ 80%', met: true, value: '5/6', detail: '83% del plan' },
    { label: 'Asistencia ≥ 90% en todas las materias', met: false, value: '78%', detail: 'Estadística por debajo del mínimo' },
    { label: 'Sin adeudos financieros', met: false, value: '$15,000', detail: 'Colegiatura octubre pendiente' },
    { label: 'Estadía profesional completada', met: false, value: '0%', detail: 'No iniciada' },
    { label: 'Proyecto integrador entregado', met: false, value: 'Pendiente', detail: 'En curso' },
  ]

  const metCount = requirements.filter(r => r.met).length
  const pct = Math.round((metCount / requirements.length) * 100)

  const card = { background: '#152031', border: '1px solid #424751', borderRadius: 12, padding: '1.25rem' }

  return (
    <div style={card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#d8e3fb' }}>Checklist de Titulación</h3>
        <span style={{ fontSize: 13, fontWeight: 700, color: pct === 100 ? '#4ade80' : '#fbbf24' }}>{metCount}/{requirements.length} requisitos</span>
      </div>

      {/* Overall progress */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: '#8c919c' }}>Avance hacia titulación</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: pct === 100 ? '#4ade80' : '#fbbf24' }}>{pct}%</span>
        </div>
        <div style={{ height: 8, background: '#2a3548', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: pct === 100 ? '#4ade80' : 'linear-gradient(90deg, #185fa5, #a4c9ff)', borderRadius: 4, transition: 'width 0.6s ease' }} />
        </div>
      </div>

      {requirements.map((r, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: i < requirements.length - 1 ? '1px solid #42475133' : 'none' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: r.met ? '#4ade80' : '#f87171', flexShrink: 0, marginTop: 1 }}>
            {r.met ? 'check_circle' : 'cancel'}
          </span>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: r.met ? '#d8e3fb' : '#8c919c' }}>{r.label}</p>
            <p style={{ fontSize: 11, color: r.met ? '#4ade80' : '#f87171', marginTop: 2 }}>{r.value} — {r.detail}</p>
          </div>
        </div>
      ))}
    </div>
  )
}