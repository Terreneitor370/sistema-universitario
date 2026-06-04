import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PaymentPage() {
  const navigate = useNavigate()
  const [method, setMethod] = useState('card')
  const [step, setStep] = useState(1) // 1=method, 2=details, 3=confirm, 4=done
  const [form, setForm] = useState({ cardNumber: '', name: '', expiry: '', cvv: '', clabe: '' })
  const [errors, setErrors] = useState({})
  const [reference] = useState(() => `TXN-${Date.now().toString().slice(-8)}`)
  const [today] = useState(() => new Date().toLocaleDateString('es-MX'))

  const concept = 'Colegiatura Octubre 2025'
  const amount = 15000

  function formatCard(val) { return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim() }
  function formatExpiry(val) { const d = val.replace(/\D/g, '').slice(0, 4); return d.length > 2 ? `${d.slice(0,2)}/${d.slice(2)}` : d }

  function validate() {
    const e = {}
    if (method === 'card') {
      if (form.cardNumber.replace(/\s/g,'').length < 16) e.cardNumber = 'Número de tarjeta inválido'
      if (!form.name.trim()) e.name = 'Nombre requerido'
      if (form.expiry.length < 5) e.expiry = 'Fecha inválida'
      if (form.cvv.length < 3) e.cvv = 'CVV inválido'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const inp = (err) => ({ width: '100%', background: '#040e1f', border: `1px solid ${err ? '#f87171' : '#424751'}`, borderRadius: 8, padding: '11px 14px', fontSize: 14, color: '#d8e3fb', outline: 'none', boxSizing: 'border-box' })
  const card = { background: '#152031', border: '1px solid #424751', borderRadius: 12 }

  if (step === 4) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 16, textAlign: 'center' }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(74,222,128,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 44, color: '#4ade80' }}>check_circle</span>
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#d8e3fb' }}>¡Pago realizado con éxito!</h2>
      <p style={{ fontSize: 14, color: '#8c919c' }}>Tu pago de <strong style={{ color: '#d8e3fb' }}>${amount.toLocaleString()} MXN</strong> fue procesado correctamente.</p>
      <div style={{ ...card, padding: '1.25rem', width: '100%', maxWidth: 360, textAlign: 'left', marginTop: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: '#8c919c' }}>Concepto</span>
          <span style={{ fontSize: 12, color: '#d8e3fb' }}>{concept}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: '#8c919c' }}>Referencia</span>
          <span style={{ fontSize: 12, color: '#a4c9ff', fontFamily: 'monospace' }}>{reference}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, color: '#8c919c' }}>Fecha</span>
          <span style={{ fontSize: 12, color: '#d8e3fb' }}>{today}</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
        <button onClick={() => navigate('/estudiante/pagos')} style={{ padding: '10px 24px', borderRadius: 8, border: '1px solid #424751', background: 'none', color: '#b7c8e1', fontSize: 13, cursor: 'pointer' }}>
          Ver estado de cuenta
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 24px', borderRadius: 8, border: 'none', background: '#185fa5', color: '#c1d9ff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span> Descargar recibo
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 680 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => step > 1 ? setStep(s => s - 1) : navigate('/estudiante/pagos')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8c919c', display: 'flex', alignItems: 'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 22 }}>arrow_back</span>
        </button>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#d8e3fb' }}>Realizar pago</h1>
          <p style={{ fontSize: 13, color: '#8c919c' }}>Paso {step} de 3</p>
        </div>
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', gap: 0 }}>
        {['Método', 'Datos', 'Confirmar'].map((s, i) => (
          <div key={s} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: step > i + 1 ? '#4ade80' : step === i + 1 ? '#185fa5' : '#2a3548', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: step > i + 1 ? '#003010' : step === i + 1 ? '#c1d9ff' : '#8c919c', marginBottom: 4 }}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span style={{ fontSize: 10, color: step === i + 1 ? '#a4c9ff' : '#8c919c' }}>{s}</span>
            </div>
            {i < 2 && <div style={{ flex: 1, height: 2, background: step > i + 1 ? '#4ade80' : '#2a3548', marginBottom: 18 }} />}
          </div>
        ))}
      </div>

      {/* Summary card */}
      <div style={{ ...card, padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: 11, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Concepto de pago</p>
          <p style={{ fontSize: 15, fontWeight: 600, color: '#d8e3fb' }}>{concept}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: 11, color: '#8c919c', marginBottom: 4 }}>Total a pagar</p>
          <p style={{ fontSize: 26, fontWeight: 700, color: '#a4c9ff' }}>${amount.toLocaleString()} <span style={{ fontSize: 14, color: '#8c919c' }}>MXN</span></p>
        </div>
      </div>

      {/* Step 1 — method */}
      {step === 1 && (
        <div style={{ ...card, padding: '1.5rem' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#d8e3fb', marginBottom: 16 }}>Selecciona tu método de pago</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { id: 'card', icon: 'credit_card', label: 'Tarjeta de crédito o débito', detail: 'Visa, Mastercard, American Express' },
              { id: 'spei', icon: 'account_balance', label: 'SPEI / Transferencia bancaria', detail: 'Pago inmediato desde tu banco en línea' },
              { id: 'deposit', icon: 'payments', label: 'Depósito en banco', detail: 'Genera tu referencia y paga en sucursal' },
            ].map(m => (
              <button key={m.id} onClick={() => setMethod(m.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 10, border: `2px solid ${method === m.id ? '#185fa5' : '#424751'}`, background: method === m.id ? '#185fa515' : 'transparent', cursor: 'pointer', textAlign: 'left' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 24, color: method === m.id ? '#a4c9ff' : '#8c919c' }}>{m.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#d8e3fb' }}>{m.label}</p>
                  <p style={{ fontSize: 12, color: '#8c919c' }}>{m.detail}</p>
                </div>
                {method === m.id && <span className="material-symbols-outlined" style={{ color: '#a4c9ff', fontSize: 20 }}>check_circle</span>}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(2)} style={{ width: '100%', marginTop: 20, padding: '12px', borderRadius: 8, border: 'none', background: '#185fa5', color: '#c1d9ff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Continuar
          </button>
        </div>
      )}

      {/* Step 2 — details */}
      {step === 2 && (
        <div style={{ ...card, padding: '1.5rem' }}>
          {method === 'card' && (
            <>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#d8e3fb', marginBottom: 16 }}>Datos de la tarjeta</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Número de tarjeta</label>
                  <input placeholder="0000 0000 0000 0000" value={form.cardNumber} onChange={e => setForm(f => ({ ...f, cardNumber: formatCard(e.target.value) }))} style={inp(errors.cardNumber)} />
                  {errors.cardNumber && <p style={{ fontSize: 11, color: '#f87171', marginTop: 4 }}>{errors.cardNumber}</p>}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Nombre del titular</label>
                  <input placeholder="Como aparece en la tarjeta" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,'').slice(0,40) }))} style={inp(errors.name)} />
                  {errors.name && <p style={{ fontSize: 11, color: '#f87171', marginTop: 4 }}>{errors.name}</p>}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Vencimiento</label>
                    <input placeholder="MM/AA" value={form.expiry} onChange={e => setForm(f => ({ ...f, expiry: formatExpiry(e.target.value) }))} style={inp(errors.expiry)} />
                    {errors.expiry && <p style={{ fontSize: 11, color: '#f87171', marginTop: 4 }}>{errors.expiry}</p>}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>CVV</label>
                    <input placeholder="000" type="password" value={form.cvv} onChange={e => setForm(f => ({ ...f, cvv: e.target.value.replace(/\D/g,'').slice(0,4) }))} style={inp(errors.cvv)} />
                    {errors.cvv && <p style={{ fontSize: 11, color: '#f87171', marginTop: 4 }}>{errors.cvv}</p>}
                  </div>
                </div>
              </div>
            </>
          )}
          {method === 'spei' && (
            <>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#d8e3fb', marginBottom: 16 }}>Datos para transferencia SPEI</h3>
              <div style={{ background: '#1f2a3c', borderRadius: 10, padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[['Banco destino','BBVA Bancomer'],['CLABE interbancaria','021680001234567890'],['Beneficiario','Universidad Central A.C.'],['Concepto','Colegiatura Oct 2025 — 2024-0312'],['Monto exacto',`$${amount.toLocaleString()}.00 MXN`]].map(([k,v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #42475133' }}>
                    <span style={{ fontSize: 12, color: '#8c919c' }}>{k}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#d8e3fb' }}>{v}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 12, color: '#fbbf24', marginTop: 12 }}>⚠ El pago se verifica en 1–2 horas hábiles. No cierres esta página hasta confirmar.</p>
            </>
          )}
          {method === 'deposit' && (
            <>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#d8e3fb', marginBottom: 16 }}>Referencia para depósito</h3>
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <p style={{ fontSize: 12, color: '#8c919c', marginBottom: 8 }}>Tu referencia de pago</p>
                <p style={{ fontSize: 36, fontWeight: 700, color: '#a4c9ff', fontFamily: 'monospace', letterSpacing: 4 }}>9182745</p>
                <p style={{ fontSize: 12, color: '#8c919c', marginTop: 8 }}>Convenio CIE: 123456 · BBVA Bancomer</p>
              </div>
              <p style={{ fontSize: 12, color: '#fbbf24', textAlign: 'center' }}>⚠ Esta referencia vence el 15 de Octubre 2025.</p>
            </>
          )}
          <button onClick={() => { if (validate()) setStep(3) }} style={{ width: '100%', marginTop: 20, padding: '12px', borderRadius: 8, border: 'none', background: '#185fa5', color: '#c1d9ff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Continuar
          </button>
        </div>
      )}

      {/* Step 3 — confirm */}
      {step === 3 && (
        <div style={{ ...card, padding: '1.5rem' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#d8e3fb', marginBottom: 16 }}>Confirmar pago</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {[['Concepto', concept], ['Monto', `$${amount.toLocaleString()} MXN`], ['Método', method === 'card' ? `Tarjeta ****${form.cardNumber.slice(-4)}` : method === 'spei' ? 'SPEI / Transferencia' : 'Depósito en banco'], ['Fecha', today]].map(([k,v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#1f2a3c', borderRadius: 8 }}>
                <span style={{ fontSize: 13, color: '#8c919c' }}>{k}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#d8e3fb' }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 8, padding: '10px 14px', marginBottom: 20, display: 'flex', gap: 8 }}>
            <span className="material-symbols-outlined" style={{ color: '#4ade80', fontSize: 16, flexShrink: 0, marginTop: 1 }}>lock</span>
            <p style={{ fontSize: 12, color: '#8c919c' }}>Tu información de pago está protegida con encriptación SSL de 256 bits.</p>
          </div>
          <button onClick={() => setStep(4)} style={{ width: '100%', padding: '13px', borderRadius: 8, border: 'none', background: '#185fa5', color: '#c1d9ff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            Pagar ${amount.toLocaleString()} MXN
          </button>
        </div>
      )}
    </div>
  )
}