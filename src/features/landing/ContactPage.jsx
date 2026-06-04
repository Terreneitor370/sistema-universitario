export default function ContactPage() {
  const departments = [
    { icon: 'school', title: 'Servicios Escolares', phone: 'Ext. 2101', email: 'escolares@umspro.edu.mx' },
    { icon: 'person_add', title: 'Admisiones', phone: 'Ext. 3050', email: 'admisiones@umspro.edu.mx' },
    { icon: 'payments', title: 'Finanzas', phone: 'Ext. 1180', email: 'finanzas@umspro.edu.mx' },
  ]

  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', padding: '2rem 4rem' }}>
      {/* Hero */}
      <section style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', color: '#0d1c2f', marginBottom: 12 }}>Contacto e Información Institucional</h1>
        <p style={{ fontSize: 16, color: '#424751', maxWidth: 600, margin: '0 auto' }}>Estamos aquí para apoyarte en tu camino académico. Encuentra nuestros datos de contacto o envíanos un mensaje directo.</p>
      </section>

      {/* Two cols */}
      <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 24, marginBottom: 48 }}>
        {/* Form */}
        <div style={{ background: '#e6eeff', borderRadius: 12, padding: '1.5rem', border: '1px solid #c2c6d2' }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#004782', marginBottom: 20 }}>Envíanos un mensaje</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[['Nombre Completo', 'text', 'Ej. Juan Pérez'],['Correo Electrónico', 'email', 'juan@ejemplo.com'],['Teléfono', 'tel', '+52 ...']].map(([l, t, p]) => (
                <div key={l} style={l === 'Teléfono' ? {} : {}}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#424751', marginBottom: 4, letterSpacing: '0.05em' }}>{l}</label>
                  <input type={t} placeholder={p} style={{ width: '100%', background: '#dde9ff', border: '1px solid #c2c6d2', borderRadius: 8, padding: '9px 12px', fontSize: 13, color: '#0d1c2f', outline: 'none' }} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#424751', marginBottom: 4, letterSpacing: '0.05em' }}>Asunto</label>
                <select style={{ width: '100%', background: '#dde9ff', border: '1px solid #c2c6d2', borderRadius: 8, padding: '9px 12px', fontSize: 13, color: '#0d1c2f', outline: 'none' }}>
                  {['Admisiones','Servicios Escolares','Becas','Posgrado','Otro'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#424751', marginBottom: 4, letterSpacing: '0.05em' }}>Mensaje</label>
              <textarea rows={5} placeholder="¿En qué podemos ayudarte?" style={{ width: '100%', background: '#dde9ff', border: '1px solid #c2c6d2', borderRadius: 8, padding: '9px 12px', fontSize: 13, color: '#0d1c2f', outline: 'none', resize: 'none' }} />
            </div>
            <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#004782', color: '#fff', padding: '11px 28px', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer', width: 'fit-content' }}>
              Enviar <span className="material-symbols-outlined" style={{ fontSize: 18 }}>send</span>
            </button>
          </div>
        </div>

        {/* Info */}
        <div style={{ background: '#dde9ff', borderRadius: 12, padding: '1.5rem', border: '1px solid #c2c6d2' }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#004782', marginBottom: 20 }}>Ubicación y Horarios</h2>
          {[
            { icon: 'location_on', label: 'Dirección', value: 'Blvd. Universidad 1000, Col. Centro, CP 76000' },
            { icon: 'call', label: 'Teléfonos', value: '+52 (442) 123 4567\n+52 (442) 987 6543' },
            { icon: 'mail', label: 'Correo Institucional', value: 'contacto@umspro.edu.mx' },
            { icon: 'schedule', label: 'Horario de Atención', value: 'Lunes a Viernes: 8:00 – 18:00' },
          ].map(i => (
            <div key={i.label} style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
              <span className="material-symbols-outlined" style={{ color: '#004782', flexShrink: 0 }}>{i.icon}</span>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#004782', marginBottom: 2, letterSpacing: '0.04em' }}>{i.label}</p>
                <p style={{ fontSize: 13, color: '#0d1c2f', whiteSpace: 'pre-line' }}>{i.value}</p>
              </div>
            </div>
          ))}
          {/* Map placeholder */}
          <div style={{ height: 160, background: '#c2c6d2', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', color: '#004782', padding: '8px 16px', borderRadius: 999, border: '1px solid #004782', fontSize: 13, cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>open_in_new</span> Ver en Google Maps
            </button>
          </div>
        </div>
      </div>

      {/* Departments */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: '#c2c6d2' }} />
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0d1c2f', whiteSpace: 'nowrap' }}>Directorio de Departamentos</h2>
          <div style={{ flex: 1, height: 1, background: '#c2c6d2' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {departments.map(d => (
            <div key={d.title} style={{ background: '#e6eeff', borderRadius: 12, padding: '1.5rem', border: '1px solid #c2c6d2', cursor: 'pointer', transition: 'border-color 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#004782'; e.currentTarget.style.background = '#dde9ff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#c2c6d2'; e.currentTarget.style.background = '#e6eeff' }}>
              <div style={{ width: 48, height: 48, borderRadius: 10, background: 'rgba(0,71,130,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <span className="material-symbols-outlined" style={{ color: '#004782' }}>{d.icon}</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#0d1c2f', marginBottom: 10 }}>{d.title}</h3>
              {[['call', d.phone], ['mail', d.email]].map(([icon, val]) => (
                <div key={val} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#424751', marginBottom: 4 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{icon}</span>
                  <span style={{ fontSize: 13 }}>{val}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
