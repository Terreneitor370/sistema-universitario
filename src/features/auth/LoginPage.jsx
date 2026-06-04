import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'

// ── Detecta rol por formato de matrícula ──────────────────
function detectRole(matricula) {
  const m = matricula.trim().toUpperCase()
  if (/^ADM-\d{4}$/.test(m)) return 'admin'
  if (/^DOC-\d{4}$/.test(m)) return 'teacher'
  if (/^\d{4}-\d{4}$/.test(m)) return 'student'
  return null
}

// ── Sanitización: solo alfanuméricos y guión ─────────────
function sanitize(value) {
  return value.replace(/[^a-zA-Z0-9-]/g, '').slice(0, 12)
}

function sanitizePassword(value) {
  // Permite letras, números y símbolos comunes, bloquea comillas y operadores SQL
  return value.replace(/['"`;\\=<>]/g, '').slice(0, 32)
}

const MOCK_USERS = {
  student: { id: 1, name: 'Laura Méndez', role: 'student', matricula: '2024-0312', carrera: 'Ing. en Sistemas Computacionales' },
  teacher: { id: 2, name: 'Dr. Ernesto Torres', role: 'teacher', empleado: 'DOC-0045', departamento: 'Ingeniería en Sistemas' },
  admin:   { id: 3, name: 'Admin User', role: 'admin', empleado: 'ADM-0001', departamento: 'Rectoría' },
}

export default function LoginPage() {
  const [matricula, setMatricula] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuthStore()
  const navigate = useNavigate()

  // Formato esperado según lo que va escribiendo
  const hint = !matricula ? '' :
    matricula.toUpperCase().startsWith('ADM') ? 'ADM-0000' :
    matricula.toUpperCase().startsWith('DOC') ? 'DOC-0000' :
    '2024-0000'

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const role = detectRole(matricula)
    if (!role) {
      setError('Formato de matrícula no válido.')
      return
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    login(MOCK_USERS[role], `token-${role}`)
    navigate({ student: '/estudiante', teacher: '/docente', admin: '/admin' }[role])
    setLoading(false)
  }

  const inp = {
    width: '100%', height: 46, background: '#f8f9ff',
    border: `1px solid ${error ? '#ba1a1a' : '#c2c6d2'}`,
    borderRadius: 4, padding: '0 14px', fontSize: 15,
    color: '#0d1c2f', outline: 'none', boxSizing: 'border-box',
    fontFamily: 'Inter, sans-serif',
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#eff4ff' }}>
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <div style={{ width: '100%', maxWidth: 420, background: '#fff', borderRadius: 12, border: '1px solid #c2c6d2', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>

          {/* Header */}
          <div style={{ padding: '2.5rem 2rem 2rem', textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, background: '#185fa5', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <span className="material-symbols-outlined" style={{ color: '#c1d9ff', fontSize: 30, fontVariationSettings: "'FILL' 1" }}>school</span>
            </div>
            <h1 style={{ fontSize: 20, fontWeight: 600, color: '#004782', marginBottom: 4 }}>Universidad Central</h1>
            <p style={{ fontSize: 12, color: '#727782' }}>Portal Universitario — Semestre 2025-B</p>
          </div>

          {/* Form */}
          <div style={{ padding: '0 2rem 2.5rem' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Matrícula */}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#424751', marginBottom: 6 }}>
                  Matrícula o número de empleado
                </label>
                <input
                  value={matricula}
                  onChange={e => {
                    setError('')
                    setMatricula(sanitize(e.target.value))
                  }}
                  placeholder="Ej. 2024-0312"
                  maxLength={12}
                  autoComplete="username"
                  spellCheck={false}
                  required
                  style={inp}
                />
                {hint && (
                  <p style={{ fontSize: 11, color: '#727782', marginTop: 4 }}>
                    Formato esperado: <strong>{hint}</strong>
                  </p>
                )}
              </div>

              {/* Contraseña */}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#424751', marginBottom: 6 }}>
                  Contraseña
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={e => {
                      setError('')
                      setPassword(sanitizePassword(e.target.value))
                    }}
                    placeholder="••••••••"
                    maxLength={32}
                    minLength={6}
                    autoComplete="current-password"
                    required
                    style={{ ...inp, paddingRight: 44, border: `1px solid ${error ? '#ba1a1a' : '#c2c6d2'}` }}
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#727782', display: 'flex', padding: 0 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{showPw ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
                <p style={{ fontSize: 11, color: '#727782', marginTop: 4 }}>Mínimo 6 caracteres · Máximo 32</p>
              </div>

              {/* Error */}
              {error && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#ffdad6', borderRadius: 6, padding: '8px 12px', border: '1px solid #ba1a1a22' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#ba1a1a', flexShrink: 0 }}>error</span>
                  <p style={{ fontSize: 13, color: '#ba1a1a' }}>{error}</p>
                </div>
              )}

              <div style={{ textAlign: 'right', marginTop: -8 }}>
                <Link to="/recuperar-contrasena" style={{ fontSize: 13, color: '#004782' }}>¿Olvidaste tu contraseña?</Link>
              </div>

              <button type="submit" disabled={loading}
                style={{ height: 46, background: loading ? '#8c919c' : '#185fa5', color: '#fff', borderRadius: 4, border: 'none', fontWeight: 600, fontSize: 14, cursor: loading ? 'wait' : 'pointer', transition: 'background 0.15s' }}>
                {loading ? 'Verificando...' : 'Ingresar'}
              </button>
            </form>

            <p style={{ fontSize: 12, color: '#727782', textAlign: 'center', marginTop: 16 }}>
              ¿Primera vez? <Link to="/contacto" style={{ color: '#004782', fontWeight: 500 }}>Solicita acceso en Servicios Escolares</Link>
            </p>
          </div>
        </div>
      </main>

      <footer style={{ padding: '1.25rem 4rem', background: '#fff', borderTop: '1px solid #c2c6d2', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1c2f' }}>Semestre 2025-B</p>
          <p style={{ fontSize: 12, color: '#727782' }}>© 2025 Universidad Central. Todos los derechos reservados.</p>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Aviso de Privacidad', 'Soporte Técnico', 'Directorio'].map(l => (
            <a key={l} href="#" style={{ fontSize: 12, color: '#727782', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}