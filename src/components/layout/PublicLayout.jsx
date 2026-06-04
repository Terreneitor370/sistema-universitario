import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom'

const navLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Oferta Educativa', to: '/oferta-educativa' },
  { label: 'Investigación', to: '/investigacion' },
  { label: 'Vida Universitaria', to: '/vida-universitaria' },
  { label: 'Contacto', to: '/contacto' },
]

export default function PublicLayout() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9ff' }}>
      {/* Navbar */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: '#f8f9ff', borderBottom: '1px solid #c2c6d2', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 40, height: 40, background: '#185fa5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ color: '#c1d9ff', fontSize: 22, fontVariationSettings: "'FILL' 1" }}>school</span>
            </div>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#004782' }}>Universidad Central</span>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {navLinks.map(l => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'}
                style={({ isActive }) => ({
                  padding: '6px 12px', fontSize: 13, fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#004782' : '#424751', borderRadius: 4, textDecoration: 'none',
                  borderBottom: isActive ? '2px solid #185fa5' : '2px solid transparent',
                  transition: 'all 0.15s',
                })}>
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate('/login')}
            style={{ background: '#185fa5', color: '#fff', padding: '9px 22px', borderRadius: 4, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Iniciar sesión
          </button>
        </div>
      </nav>

      <main><Outlet /></main>

      {/* Footer */}
      <footer style={{ background: '#0d1c2f', color: '#b7c8e1', padding: '3.5rem 4rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{ width: 28, height: 28, background: '#185fa5', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ color: '#c1d9ff', fontSize: 16, fontVariationSettings: "'FILL' 1" }}>school</span>
              </div>
              <span style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>Universidad Central</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: '#8c919c', maxWidth: 280 }}>
              Institución de educación superior bajo el modelo de universidades tecnológicas y politécnicas del Sistema SEP. Formando profesionistas para el desarrollo de México.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              {[['facebook', 'f'], ['twitter', 't'], ['instagram', 'ig'], ['linkedin', 'in']].map(([n]) => (
                <div key={n} style={{ width: 32, height: 32, borderRadius: '50%', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#8c919c' }}>{n[0].toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div>
            <p style={{ color: '#fff', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Contacto</p>
            {[
              ['location_on', 'Av. Insurgentes Sur 1234, CDMX'],
              ['call', '+52 (686) 123-4567'],
              ['mail', 'contacto@ucentral.edu.mx'],
            ].map(([icon, text]) => (
              <div key={text} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 10 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#8c919c', marginTop: 1, flexShrink: 0 }}>{icon}</span>
                <p style={{ fontSize: 13, color: '#8c919c' }}>{text}</p>
              </div>
            ))}
          </div>

          {/* Legal */}
          <div>
            <p style={{ color: '#fff', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Legal</p>
            {[
              { label: 'Aviso de Privacidad', to: '/aviso-privacidad' },
              { label: 'Términos y Condiciones', to: '/terminos-condiciones' },
            ].map(l => (
              <Link key={l.to} to={l.to} style={{ display: 'block', fontSize: 13, color: '#8c919c', marginBottom: 8, textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => e.target.style.color = '#a4c9ff'}
                onMouseLeave={e => e.target.style.color = '#8c919c'}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Horario */}
          <div>
            <p style={{ color: '#fff', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Horario de atención</p>
            <p style={{ fontSize: 13, color: '#8c919c', marginBottom: 4 }}>Lunes a Viernes</p>
            <p style={{ fontSize: 13, color: '#8c919c', marginBottom: 12 }}>8:00 – 18:00 hrs</p>
            <p style={{ fontSize: 13, color: '#8c919c', marginBottom: 4 }}>Sábados</p>
            <p style={{ fontSize: 13, color: '#8c919c' }}>9:00 – 13:00 hrs</p>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: '2rem auto 0', paddingTop: '1.5rem', borderTop: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#8c919c', flexWrap: 'wrap', gap: 12 }}>
          <span>© 2025 Universidad Central A.C. Todos los derechos reservados.</span>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link to="/aviso-privacidad" style={{ color: '#8c919c', textDecoration: 'none' }}>Privacidad</Link>
            <Link to="/terminos-condiciones" style={{ color: '#8c919c', textDecoration: 'none' }}>Términos</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}