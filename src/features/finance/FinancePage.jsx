import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'

const payments = [
  { concept: 'Colegiatura Octubre 2025', amount: 15000, due: '15/10/2025', paid: null, status: 'pending' },
  { concept: 'Colegiatura Septiembre 2025', amount: 15000, due: '15/09/2025', paid: '12/09/2025', status: 'paid' },
  { concept: 'Examen Extraordinario', amount: 500, due: '20/09/2025', paid: '18/09/2025', status: 'paid' },
  { concept: 'Colegiatura Noviembre 2025', amount: 15000, due: '15/11/2025', paid: null, status: 'upcoming' },
  { concept: 'Inscripción Cuatrimestre 2025-B', amount: 1800, due: '01/08/2025', paid: '28/07/2025', status: 'paid' },
]

const adminPayments = [
  { student: 'Laura Méndez', concept: 'Colegiatura Oct', amount: 15000, due: '15/10/2025', status: 'pending' },
  { student: 'Rodrigo Alvarado', concept: 'Colegiatura Oct', amount: 15000, due: '15/10/2025', status: 'paid' },
  { student: 'Carlos Peralta', concept: 'Colegiatura Oct', amount: 15000, due: '15/10/2025', status: 'overdue' },
  { student: 'Sofía González', concept: 'Colegiatura Oct', amount: 0, due: '—', status: 'scholarship' },
  { student: 'Marcos Herrera', concept: 'Colegiatura Oct', amount: 7500, due: '30/10/2025', status: 'partial' },
]

const statusStyle = {
  paid:       { bg: 'rgba(74,222,128,0.12)',  color: '#4ade80',  label: 'Pagado' },
  pending:    { bg: 'rgba(248,113,113,0.12)', color: '#f87171',  label: 'Pendiente' },
  upcoming:   { bg: 'rgba(251,191,36,0.12)',  color: '#fbbf24',  label: 'Próximo' },
  overdue:    { bg: 'rgba(248,113,113,0.12)', color: '#f87171',  label: 'Vencido' },
  scholarship:{ bg: 'rgba(164,201,255,0.12)', color: '#a4c9ff',  label: 'Beca 100%' },
  partial:    { bg: 'rgba(251,191,36,0.12)',  color: '#fbbf24',  label: 'Parcial' },
}

const card = { background: '#152031', border: '1px solid #424751', borderRadius: 12 }

function StudentFinance() {
  const navigate = useNavigate()
  const total = 45000
  const paid = payments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0)
  const pending = payments.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0)
  const hasPending = pending > 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: '#d8e3fb' }}>Mi Estado de Cuenta</h1>

      {hasPending && (
        <div style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: 10, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="material-symbols-outlined" style={{ color: '#f87171' }}>priority_high</span>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#f87171' }}>Pago pendiente de <strong>${pending.toLocaleString()} MXN</strong> — vence el 15 de Octubre</p>
              <p style={{ fontSize: 11, color: '#8c919c' }}>Evita recargos realizando tu pago hoy mismo.</p>
            </div>
          </div>
          <button onClick={() => navigate('/estudiante/pagos/pagar')} style={{ background: '#a4c9ff', color: '#00315d', padding: '8px 20px', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
            Realizar pago
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ ...card, padding: '1.25rem' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#d8e3fb', marginBottom: 16 }}>Resumen</h3>
            {[['Colegiatura total', `$${total.toLocaleString()} MXN`, '#d8e3fb'], ['Monto pagado', `$${paid.toLocaleString()} MXN`, '#4ade80'], ['Saldo pendiente', `$${pending.toLocaleString()} MXN`, '#f87171']].map(([l, v, c], i) => (
              <div key={l} style={{ paddingTop: i > 0 ? 12 : 0, borderTop: i > 0 ? '1px solid #424751' : 'none', marginTop: i > 0 ? 12 : 0 }}>
                <p style={{ fontSize: 11, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{l}</p>
                <p style={{ fontSize: 20, fontWeight: 600, color: c }}>{v}</p>
              </div>
            ))}
          </div>

          <div style={{ ...card, padding: '1.25rem' }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Métodos de pago</p>
            {[['account_balance', 'SPEI / Transferencia', 'CLABE: 021 680 00012345678 9'],
              ['payments', 'Depósito en banco', 'Convenio CIE: 123456'],
              ['credit_card', 'Pago en línea', 'Tarjeta de crédito o débito']].map(([icon, label, detail]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0', borderBottom: '1px solid #42475133' }}>
                <span className="material-symbols-outlined" style={{ color: '#a4c9ff', fontSize: 20, flexShrink: 0, marginTop: 2 }}>{icon}</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: '#d8e3fb' }}>{label}</p>
                  <p style={{ fontSize: 11, color: '#8c919c' }}>{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid #424751' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#d8e3fb' }}>Historial de pagos</h3>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#a4c9ff', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>download</span> Descargar estado
            </button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#1f2a3c' }}>
                {['Concepto', 'Monto', 'Vencimiento', 'Fecha de pago', 'Estado'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payments.map((p, i) => {
                const s = statusStyle[p.status]
                return (
                  <tr key={i} style={{ borderBottom: '1px solid #42475133' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 500, color: '#d8e3fb' }}>{p.concept}</td>
                    <td style={{ padding: '12px 16px', color: '#b7c8e1' }}>${p.amount.toLocaleString()}</td>
                    <td style={{ padding: '12px 16px', color: '#8c919c' }}>{p.due}</td>
                    <td style={{ padding: '12px 16px', color: '#8c919c' }}>{p.paid || '—'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: s.bg, color: s.color }}>{s.label}</span>
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

function AdminFinance() {
  const kpis = [
    { label: 'Ingresos este ciclo', value: '$18.4M', trend: '+5.1%', icon: 'trending_up', color: '#4ade80' },
    { label: 'Colegiaturas cobradas', value: '4,312', trend: '89.4% del total', icon: 'check_circle', color: '#a4c9ff' },
    { label: 'Becas activas', value: '621', trend: '$3.1M comprometidos', icon: 'school', color: '#fbbf24' },
    { label: 'Cuentas por cobrar', value: '509', trend: 'Requieren seguimiento', icon: 'warning', color: '#f87171' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: '#d8e3fb' }}>Finanzas y Colegiaturas</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {kpis.map(k => (
          <div key={k.label} style={{ ...card, padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8c919c' }}>{k.label}</span>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: k.color }}>{k.icon}</span>
            </div>
            <p style={{ fontSize: 28, fontWeight: 700, color: k.color, lineHeight: 1 }}>{k.value}</p>
            <p style={{ fontSize: 11, color: '#8c919c', marginTop: 6 }}>{k.trend}</p>
          </div>
        ))}
      </div>

      <div style={card}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #424751' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#d8e3fb' }}>Registro de pagos</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#1f2a3c' }}>
              {['Alumno', 'Concepto', 'Monto', 'Vencimiento', 'Estado'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {adminPayments.map((p, i) => {
              const s = statusStyle[p.status]
              return (
                <tr key={i} style={{ borderBottom: '1px solid #42475133' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#d8e3fb' }}>{p.student}</td>
                  <td style={{ padding: '12px 16px', color: '#b7c8e1' }}>{p.concept}</td>
                  <td style={{ padding: '12px 16px', color: '#b7c8e1' }}>{p.amount === 0 ? '—' : `$${p.amount.toLocaleString()}`}</td>
                  <td style={{ padding: '12px 16px', color: '#8c919c' }}>{p.due}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: s.bg, color: s.color }}>{s.label}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function FinancePage() {
  const { user } = useAuthStore()
  if (user?.role === 'admin') return <AdminFinance />
  return <StudentFinance />
}