import { useState } from 'react'

// Admin view — manage all scholarship requests
function AdminScholarships() {
  const [requests, setRequests] = useState([
    { id: 1, name: 'Laura Méndez', matricula: '2024-0312', carrera: 'Ing. en Sistemas', gpa: 9.6, cuatrimestre: 5, status: 'pending', date: '20/10/2025' },
    { id: 2, name: 'Sofía González', matricula: '2024-0056', carrera: 'Ing. en Sistemas', gpa: 9.8, cuatrimestre: 5, status: 'pending', date: '19/10/2025' },
    { id: 3, name: 'Carlos Peralta', matricula: '2022-1145', carrera: 'Ing. Industrial', gpa: 9.5, cuatrimestre: 7, status: 'approved', date: '10/10/2025' },
    { id: 4, name: 'Ana López', matricula: '2023-0774', carrera: 'Ing. en Mecatrónica', gpa: 9.7, cuatrimestre: 6, status: 'rejected', date: '05/10/2025' },
  ])
  const [selected, setSelected] = useState(null)
  const [reason, setReason] = useState('')

  function handle(id, action) {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r))
    setSelected(null)
    setReason('')
  }

  const statusStyle = {
    pending:  { label: 'Pendiente', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
    approved: { label: 'Aprobada',  color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
    rejected: { label: 'Rechazada', color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
  }
  const card = { background: '#152031', border: '1px solid #424751', borderRadius: 12 }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#d8e3fb' }}>Gestión de Becas</h1>
        <p style={{ fontSize: 13, color: '#8c919c', marginTop: 4 }}>Revisa y aprueba solicitudes de beca por desempeño académico.</p>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {[
          { label: 'Solicitudes pendientes', value: requests.filter(r => r.status === 'pending').length, color: '#fbbf24', icon: 'pending' },
          { label: 'Becas activas este ciclo', value: requests.filter(r => r.status === 'approved').length, color: '#4ade80', icon: 'school' },
          { label: 'Descuento promedio aplicado', value: '70%', color: '#a4c9ff', icon: 'percent' },
        ].map(k => (
          <div key={k.label} style={{ ...card, padding: '1.25rem', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: `${k.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ color: k.color, fontSize: 22 }}>{k.icon}</span>
            </div>
            <div>
              <p style={{ fontSize: 11, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{k.label}</p>
              <p style={{ fontSize: 26, fontWeight: 700, color: k.color }}>{k.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Policy note */}
      <div style={{ background: 'rgba(164,201,255,0.08)', border: '1px solid rgba(164,201,255,0.2)', borderRadius: 10, padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <span className="material-symbols-outlined" style={{ color: '#a4c9ff', flexShrink: 0 }}>info</span>
        <p style={{ fontSize: 13, color: '#b7c8e1' }}>
          <strong>Política de becas:</strong> Alumnos con promedio ≥ 9.5 pueden solicitar una beca de 70% de descuento sobre la inscripción del siguiente cuatrimestre. Solo se otorga una beca por cuatrimestre por alumno.
        </p>
      </div>

      {/* Requests table */}
      <div style={card}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #424751' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#d8e3fb' }}>Solicitudes recibidas</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#1f2a3c' }}>
              {['Alumno', 'Matrícula', 'Carrera', 'Promedio', 'Cuatrimestre', 'Fecha', 'Estado', 'Acción'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {requests.map(r => {
              const st = statusStyle[r.status]
              return (
                <tr key={r.id} style={{ borderBottom: '1px solid #42475133' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#d8e3fb' }}>{r.name}</td>
                  <td style={{ padding: '12px 16px', color: '#8c919c', fontSize: 12 }}>{r.matricula}</td>
                  <td style={{ padding: '12px 16px', color: '#b7c8e1', fontSize: 12 }}>{r.carrera}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontWeight: 700, color: '#4ade80' }}>{r.gpa}</span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#8c919c' }}>Cuatri {r.cuatrimestre}</td>
                  <td style={{ padding: '12px 16px', color: '#8c919c', fontSize: 12 }}>{r.date}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: st.bg, color: st.color }}>{st.label}</span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    {r.status === 'pending' && (
                      <button onClick={() => setSelected(r)}
                        style={{ background: '#185fa520', border: '1px solid #185fa5', color: '#a4c9ff', padding: '5px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                        Revisar
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Review modal */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#152031', border: '1px solid #424751', borderRadius: 16, padding: '2rem', maxWidth: 440, width: '100%' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#d8e3fb', marginBottom: 16 }}>Revisar solicitud de beca</h3>
            <div style={{ background: '#1f2a3c', borderRadius: 8, padding: '14px', marginBottom: 20 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#d8e3fb', marginBottom: 4 }}>{selected.name}</p>
              <p style={{ fontSize: 12, color: '#8c919c' }}>{selected.matricula} · {selected.carrera}</p>
              <p style={{ fontSize: 12, color: '#4ade80', marginTop: 8 }}>Promedio: <strong>{selected.gpa}</strong> — Cuatrimestre {selected.cuatrimestre}</p>
              <p style={{ fontSize: 12, color: '#a4c9ff', marginTop: 4 }}>Beneficio: <strong>70% descuento en inscripción del Cuatrimestre {selected.cuatrimestre + 1}</strong></p>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#8c919c', textTransform: 'uppercase', marginBottom: 6 }}>Comentario (opcional)</label>
              <textarea rows={3} value={reason} onChange={e => setReason(e.target.value)} placeholder="Observaciones sobre la decisión..."
                style={{ width: '100%', background: '#040e1f', border: '1px solid #424751', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#d8e3fb', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setSelected(null)}
                style={{ flex: 1, padding: '10px', borderRadius: 8, border: '1px solid #424751', background: 'none', color: '#b7c8e1', fontSize: 13, cursor: 'pointer' }}>
                Cancelar
              </button>
              <button onClick={() => handle(selected.id, 'rejected')}
                style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: 'rgba(248,113,113,0.15)', color: '#f87171', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                Rechazar
              </button>
              <button onClick={() => handle(selected.id, 'approved')}
                style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: '#185fa5', color: '#c1d9ff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                Aprobar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Student view — see scholarship status, already shown as banner in dashboard
export function StudentScholarshipBanner({ gpa = 8.47 }) {
  const [dismissed, setDismissed] = useState(false)
  const [requested, setRequested] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const eligible = gpa >= 9.5

  if (!eligible || dismissed) return null

  return (
    <>
      <div style={{ background: 'linear-gradient(135deg, rgba(24,95,165,0.15), rgba(164,201,255,0.08))', border: '1px solid rgba(164,201,255,0.3)', borderRadius: 12, padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#185fa530', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ color: '#a4c9ff', fontSize: 24, fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#a4c9ff' }}>🎉 ¡Felicidades! Tienes oportunidad de solicitar una beca</p>
            <p style={{ fontSize: 12, color: '#8c919c', marginTop: 2 }}>Tu promedio de <strong style={{ color: '#4ade80' }}>{gpa}</strong> te hace elegible para un <strong style={{ color: '#a4c9ff' }}>70% de descuento en tu próxima inscripción</strong>.</p>
          </div>
        </div>
        {!requested ? (
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setDismissed(true)}
              style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #424751', background: 'none', color: '#8c919c', fontSize: 12, cursor: 'pointer' }}>
              Ignorar
            </button>
            <button onClick={() => setShowModal(true)}
              style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: '#185fa5', color: '#c1d9ff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
              Solicitar beca
            </button>
          </div>
        ) : (
          <span style={{ padding: '6px 14px', borderRadius: 999, background: 'rgba(74,222,128,0.12)', color: '#4ade80', fontSize: 12, fontWeight: 600 }}>✓ Solicitud enviada</span>
        )}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#152031', border: '1px solid #424751', borderRadius: 16, padding: '2rem', maxWidth: 420, width: '100%' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 40, color: '#a4c9ff', display: 'block', marginBottom: 12 }}>workspace_premium</span>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#d8e3fb', marginBottom: 8 }}>Solicitud de beca académica</h3>
            <p style={{ fontSize: 13, color: '#8c919c', marginBottom: 16, lineHeight: 1.6 }}>
              Al confirmar, tu solicitud será enviada al área de administración escolar para revisión. Recibirás una notificación con la resolución en un plazo de 5 días hábiles.
            </p>
            <div style={{ background: '#1f2a3c', borderRadius: 8, padding: '12px 14px', marginBottom: 20 }}>
              <p style={{ fontSize: 12, color: '#8c919c', marginBottom: 6 }}>Beneficio solicitado:</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#a4c9ff' }}>70% de descuento en inscripción</p>
              <p style={{ fontSize: 12, color: '#8c919c', marginTop: 4 }}>Aplicable al Cuatrimestre 6 (Sep–Dic 2025)</p>
              <p style={{ fontSize: 12, color: '#4ade80', marginTop: 4 }}>Tu promedio: {gpa} ≥ 9.5 requerido ✓</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setShowModal(false)}
                style={{ flex: 1, padding: '10px', borderRadius: 8, border: '1px solid #424751', background: 'none', color: '#b7c8e1', fontSize: 13, cursor: 'pointer' }}>
                Cancelar
              </button>
              <button onClick={() => { setShowModal(false); setRequested(true) }}
                style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: '#185fa5', color: '#c1d9ff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                Confirmar solicitud
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AdminScholarships