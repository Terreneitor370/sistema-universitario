import { useNavigate, useLocation } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const isPortal = pathname.startsWith('/estudiante') || pathname.startsWith('/docente') || pathname.startsWith('/admin')
  const role = pathname.startsWith('/estudiante') ? 'estudiante' : pathname.startsWith('/docente') ? 'docente' : pathname.startsWith('/admin') ? 'admin' : null
  const homeRoute = role ? `/${role}` : '/'
  const homeLabel = role ? 'Volver al inicio' : 'Ir al inicio'

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: isPortal ? '#081425' : '#eff4ff', padding: '2rem',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>

        <div style={{ position: 'relative', marginBottom: 8 }}>
          <p style={{
            fontSize: 160, fontWeight: 900, lineHeight: 1,
            color: isPortal ? '#185fa520' : '#185fa510',
            userSelect: 'none', letterSpacing: -8,
          }}>404</p>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{
              fontSize: 72, color: isPortal ? '#185fa5' : '#004782',
              fontVariationSettings: "'FILL' 1",
            }}>search_off</span>
          </div>
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 10, color: isPortal ? '#d8e3fb' : '#0d1c2f' }}>
          Página no encontrada
        </h1>

        <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 8, color: isPortal ? '#8c919c' : '#727782' }}>
          La ruta{' '}
          <code style={{
            fontSize: 12, padding: '2px 8px', borderRadius: 4,
            background: isPortal ? '#1f2a3c' : '#e0e8ff',
            color: isPortal ? '#a4c9ff' : '#185fa5', fontFamily: 'monospace',
          }}>{pathname}</code>
          {' '}no existe o fue movida.
        </p>

        <p style={{ fontSize: 13, color: isPortal ? '#424751' : '#8c919c', marginBottom: 32 }}>
          Verifica que la URL esté escrita correctamente o regresa al inicio.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate(-1)} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '10px 20px',
            borderRadius: 8, cursor: 'pointer',
            border: `1px solid ${isPortal ? '#424751' : '#c2c6d2'}`,
            background: 'transparent', color: isPortal ? '#b7c8e1' : '#424751',
            fontSize: 13, fontWeight: 500,
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
            Regresar
          </button>

          <button onClick={() => navigate(homeRoute)} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '10px 24px',
            borderRadius: 8, cursor: 'pointer', border: 'none',
            background: '#185fa5', color: '#c1d9ff', fontSize: 13, fontWeight: 600,
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>home</span>
            {homeLabel}
          </button>
        </div>

      </div>
    </div>
  )
}