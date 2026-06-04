import { useState } from 'react'

const categories = ['Problema técnico', 'Calificaciones', 'Pagos y finanzas', 'Inscripciones', 'Material de clase', 'Acceso al sistema', 'Otro']
const faqs = [
  { q: '¿Cómo descargo mi constancia de estudios?', a: 'Las constancias se gestionan en ventanilla de Servicios Escolares. Preséntate con tu credencial vigente.' },
  { q: '¿Qué hago si no puedo acceder al sistema?', a: 'Verifica que tu matrícula tenga el formato correcto (Ej: 2024-0312). Si el problema persiste, abre un ticket de soporte.' },
  { q: '¿Cómo reporto un error en mis calificaciones?', a: 'Selecciona la categoría "Calificaciones" en el formulario de soporte e incluye la materia y el parcial afectado.' },
  { q: '¿Cuándo se aplica el descuento de beca a mi colegiatura?', a: 'El descuento se refleja en el estado de cuenta dentro de los 3 días hábiles posteriores a la aprobación.' },
  { q: '¿Puedo cambiar mis materias después de inscribirme?', a: 'Las inscripciones son por cuatrimestre completo. No es posible cambiar materias individuales una vez confirmada la inscripción.' },
]

export default function SupportPage() {
  const [form, setForm] = useState({ category: '', subject: '', description: '', priority: 'normal' })
  const [submitted, setSubmitted] = useState(false)
  const [ticketId, setTicketId] = useState('')
  const [openFaq, setOpenFaq] = useState(null)
  const [tickets] = useState([
    { id: 'TKT-2024-089', category: 'Calificaciones', subject: 'Error en calificación de Estadística parcial 1', status: 'in_progress', date: '18/10/2025' },
    { id: 'TKT-2024-071', category: 'Pagos y finanzas', subject: 'No se refleja mi pago de septiembre', status: 'resolved', date: '05/10/2025' },
  ])

  const statusStyle = {
    open:        { label: 'Abierto',     color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
    in_progress: { label: 'En revisión', color: '#a4c9ff', bg: 'rgba(164,201,255,0.12)' },
    resolved:    { label: 'Resuelto',    color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.category || !form.subject || !form.description) return
    setTicketId(`TKT-2025-${Math.floor(Math.random() * 900 + 100)}`)
    setSubmitted(true)
  }

  const card = { background: '#152031', border: '1px solid #424751', borderRadius: 12 }
  const inp = { width: '100%', background: '#040e1f', border: '1px solid #424751', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#d8e3fb', outline: 'none', boxSizing: 'border-box' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#d8e3fb' }}>Soporte</h1>
        <p style={{ fontSize: 13, color: '#8c919c', marginTop: 4 }}>¿Tienes algún problema? Envíanos un ticket y te ayudaremos a resolverlo.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 24, alignItems: 'start' }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Contact info */}
          <div style={{ ...card, padding: '1.25rem' }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#d8e3fb', marginBottom: 14 }}>Canales de atención</h3>
            {[
              { icon: 'location_on', label: 'Ventanilla presencial', detail: 'Edificio A, Planta Baja · Lun–Vie 8:00–15:00' },
              { icon: 'call', label: 'Teléfono', detail: '(686) 123-4567 ext. 200' },
              { icon: 'mail', label: 'Correo institucional', detail: 'soporte@universidad.edu.mx' },
              { icon: 'schedule', label: 'Tiempo de respuesta', detail: 'Tickets: 24–48 horas hábiles' },
            ].map(c => (
              <div key={c.label} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid #42475133' }}>
                <span className="material-symbols-outlined" style={{ color: '#a4c9ff', fontSize: 18, flexShrink: 0, marginTop: 1 }}>{c.icon}</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: '#d8e3fb' }}>{c.label}</p>
                  <p style={{ fontSize: 11, color: '#8c919c' }}>{c.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div style={{ ...card, padding: '1.25rem' }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#d8e3fb', marginBottom: 14 }}>Preguntas frecuentes</h3>
            {faqs.map((f, i) => (
              <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid #42475133' : 'none' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ fontSize: 12, fontWeight: 500, color: '#d8e3fb' }}>{f.q}</span>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#8c919c', flexShrink: 0, marginLeft: 8 }}>{openFaq === i ? 'expand_less' : 'expand_more'}</span>
                </button>
                {openFaq === i && (
                  <p style={{ fontSize: 12, color: '#8c919c', paddingBottom: 10, lineHeight: 1.6 }}>{f.a}</p>
                )}
              </div>
            ))}
          </div>

          {/* My tickets */}
          {tickets.length > 0 && (
            <div style={{ ...card, padding: '1.25rem' }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: '#d8e3fb', marginBottom: 14 }}>Mis tickets</h3>
              {tickets.map(t => {
                const st = statusStyle[t.status]
                return (
                  <div key={t.id} style={{ background: '#1f2a3c', borderRadius: 8, padding: '10px 14px', marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: '#8c919c', fontFamily: 'monospace' }}>{t.id}</span>
                      <span style={{ padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 600, background: st.bg, color: st.color }}>{st.label}</span>
                    </div>
                    <p style={{ fontSize: 12, fontWeight: 500, color: '#d8e3fb' }}>{t.subject}</p>
                    <p style={{ fontSize: 11, color: '#8c919c', marginTop: 2 }}>{t.category} · {t.date}</p>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Right: form */}
        <div style={{ ...card, padding: '1.5rem' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 56, color: '#4ade80', display: 'block', marginBottom: 16 }}>check_circle</span>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#d8e3fb', marginBottom: 8 }}>Ticket enviado</h3>
              <p style={{ fontSize: 13, color: '#8c919c', marginBottom: 6 }}>Tu caso fue registrado con el ID:</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#a4c9ff', fontFamily: 'monospace', marginBottom: 20 }}>{ticketId}</p>
              <p style={{ fontSize: 12, color: '#8c919c', marginBottom: 24 }}>Recibirás una notificación cuando haya una actualización. Tiempo de respuesta: 24–48 horas hábiles.</p>
              <button onClick={() => { setSubmitted(false); setForm({ category: '', subject: '', description: '', priority: 'normal' }) }}
                style={{ background: '#185fa5', color: '#c1d9ff', padding: '10px 24px', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                Nuevo ticket
              </button>
            </div>
          ) : (
            <>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#d8e3fb', marginBottom: 4 }}>Nuevo ticket de soporte</h3>
              <p style={{ fontSize: 12, color: '#8c919c', marginBottom: 20 }}>Describe tu problema con el mayor detalle posible para agilizar la atención.</p>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Categoría *</label>
                  <select required value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    style={{ ...inp, appearance: 'none', cursor: 'pointer' }}>
                    <option value="">Seleccionar categoría...</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Asunto *</label>
                  <input required placeholder="Describe brevemente tu problema" value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value.slice(0, 80) }))}
                    style={inp} />
                  <p style={{ fontSize: 11, color: '#424751', marginTop: 4 }}>{form.subject.length}/80 caracteres</p>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Descripción detallada *</label>
                  <textarea required rows={5} placeholder="Explica tu problema con todos los detalles: qué intentabas hacer, qué mensaje de error viste, cuándo ocurrió..." value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value.slice(0, 1000) }))}
                    style={{ ...inp, resize: 'vertical' }} />
                  <p style={{ fontSize: 11, color: '#424751', marginTop: 4 }}>{form.description.length}/1000 caracteres</p>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Prioridad</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[['normal', 'Normal', '#8c919c'], ['high', 'Alta', '#fbbf24'], ['urgent', 'Urgente', '#f87171']].map(([val, label, color]) => (
                      <button key={val} type="button" onClick={() => setForm(f => ({ ...f, priority: val }))}
                        style={{ flex: 1, padding: '8px', borderRadius: 8, border: `1px solid ${form.priority === val ? color : '#424751'}`, background: form.priority === val ? `${color}18` : 'transparent', color: form.priority === val ? color : '#8c919c', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Adjunto (opcional)</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#040e1f', border: '1px dashed #424751', borderRadius: 8, padding: '10px 14px', cursor: 'pointer' }}>
                    <span className="material-symbols-outlined" style={{ color: '#8c919c', fontSize: 18 }}>attach_file</span>
                    <span style={{ fontSize: 12, color: '#8c919c' }}>Captura de pantalla o documento</span>
                    <input type="file" style={{ display: 'none' }} />
                  </label>
                </div>
                <button type="submit"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#185fa5', color: '#c1d9ff', padding: '11px', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer', marginTop: 4 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>send</span>
                  Enviar ticket
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}