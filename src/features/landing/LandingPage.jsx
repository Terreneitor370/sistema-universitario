import screenBg from '../../assets/screen.png'

export default function LandingPage() {
  const highlights = [
    { icon: 'school', title: 'Programas Académicos', body: 'Licenciaturas y posgrados diseñados para el éxito profesional en un entorno global competitivo.', cta: 'Ver planes de estudio' },
    { icon: 'science', title: 'Investigación y Posgrado', body: 'Generando conocimiento que transforma la sociedad a través de centros de investigación de vanguardia.', cta: 'Proyectos actuales' },
    { icon: 'payments', title: 'Becas y Financiamiento', body: 'Opciones de apoyo financiero para que nada detenga tu talento y puedas alcanzar tus metas académicas.', cta: 'Calcula tu beca' },
    { icon: 'apartment', title: 'Vida en el Campus', body: 'Una experiencia universitaria vibrante, multicultural y llena de actividades extracurriculares.', cta: 'Galería del campus' },
  ]

  const stats = [['95%', 'Empleabilidad'], ['+40', 'Convenios Int.'], ['12k', 'Estudiantes'], ['35', 'Licenciaturas']]

  return (
    <div>
      {/* Hero */}
      <header style={{ position: 'relative', height: 600, display: 'flex', alignItems: 'center', overflow: 'hidden', backgroundImage: `url(${screenBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: '0 4rem', width: '100%' }}>
          <div style={{ maxWidth: 680 }}>
            <h1 style={{ fontSize: 48, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 24, color: '#ffffff' }}>
              Formando líderes para México y el mundo
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.7, marginBottom: 40, color: 'rgba(255,255,255,0.85)' }}>
              Descubre una comunidad académica de excelencia dedicada a la innovación y el desarrollo integral, donde el futuro se construye hoy.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#185fa5', color: '#fff', padding: '14px 28px', borderRadius: 4, border: 'none', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
                Conoce nuestra oferta educativa
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
              </button>
              <button style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', padding: '14px 28px', borderRadius: 4, border: '2px solid #fff', fontSize: 14, cursor: 'pointer' }}>
                Agenda tu visita
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Highlights */}
      <section style={{ padding: '5rem 4rem', background: '#ffffff', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ color: '#004782', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Nuestra Excelencia</span>
          <h2 style={{ fontSize: 28, fontWeight: 600, marginTop: 8, marginBottom: 16, color: '#0d1c2f' }}>Comprometidos con tu Crecimiento Profesional</h2>
          <div style={{ width: 60, height: 3, background: '#185fa5', margin: '0 auto' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {highlights.map(h => (
            <div key={h.title} style={{ background: '#fff', border: '1px solid #c2c6d2', borderRadius: 4, padding: '2rem', transition: 'box-shadow 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#e6eeff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <span className="material-symbols-outlined" style={{ color: '#004782', fontSize: 24 }}>{h.icon}</span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: '#004782', marginBottom: 12 }}>{h.title}</h3>
              <p style={{ fontSize: 15, color: '#424751', lineHeight: 1.6, marginBottom: 16 }}>{h.body}</p>
              <a href="#" style={{ fontSize: 13, fontWeight: 700, color: '#004782', display: 'flex', alignItems: 'center', gap: 4 }}>
                {h.cta} <span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '4rem', background: '#004782' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, textAlign: 'center' }}>
          {stats.map(([v, l]) => (
            <div key={l}>
              <div style={{ fontSize: 42, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{v}</div>
              <div style={{ fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.75)' }}>{l}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
