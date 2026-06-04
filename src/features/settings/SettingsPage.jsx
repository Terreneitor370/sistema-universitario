import { useAuthStore } from '@store/authStore'

export default function SettingsPage() {
  const { user } = useAuthStore()
  const card = { background: '#152031', border: '1px solid #424751', borderRadius: 12, padding: '1.5rem', marginBottom: 24 }
  const inp = { width: '100%', background: '#081425', border: '1px solid #424751', borderRadius: 8, padding: '9px 14px', fontSize: 13, color: '#d8e3fb', outline: 'none', boxSizing: 'border-box' }
  const label = (txt) => (
    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#8c919c', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{txt}</label>
  )

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#d8e3fb' }}>Configuración</h1>
        <p style={{ fontSize: 14, color: '#8c919c', marginTop: 4 }}>Administra tu información personal y credenciales de acceso.</p>
      </div>

      <div style={{ maxWidth: 640 }}>
        {/* Perfil */}
        <div style={card}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, paddingBottom: 16, borderBottom: '1px solid #42475155', marginBottom: 20 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#3a4a5f', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ color: '#a9bad3' }}>person</span>
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#d8e3fb' }}>Datos personales</h3>
              <p style={{ fontSize: 13, color: '#8c919c', marginTop: 2 }}>Actualiza tu nombre completo.</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              {label('Nombre completo')}
              <input type="text" defaultValue={user?.name || ''} style={inp} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingTop: 16, marginTop: 16, borderTop: '1px solid #42475133' }}>
            <button style={{ padding: '8px 20px', borderRadius: 6, border: '1px solid #424751', background: 'none', color: '#a4c9ff', fontSize: 12, cursor: 'pointer' }}>Cancelar</button>
            <button style={{ padding: '8px 20px', borderRadius: 6, border: 'none', background: '#185fa5', color: '#c1d9ff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Guardar cambios</button>
          </div>
        </div>

        {/* Contraseña */}
        <div style={card}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, paddingBottom: 16, borderBottom: '1px solid #42475155', marginBottom: 20 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#3a4a5f', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ color: '#a9bad3' }}>lock</span>
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#d8e3fb' }}>Cambiar contraseña</h3>
              <p style={{ fontSize: 13, color: '#8c919c', marginTop: 2 }}>Usa una contraseña segura de al menos 8 caracteres.</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              {label('Contraseña actual')}
              <input type="password" placeholder="••••••••" style={inp} />
            </div>
            <div>
              {label('Nueva contraseña')}
              <input type="password" placeholder="••••••••" style={inp} />
            </div>
            <div>
              {label('Confirmar nueva contraseña')}
              <input type="password" placeholder="••••••••" style={inp} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingTop: 16, marginTop: 16, borderTop: '1px solid #42475133' }}>
            <button style={{ padding: '8px 20px', borderRadius: 6, border: '1px solid #424751', background: 'none', color: '#a4c9ff', fontSize: 12, cursor: 'pointer' }}>Cancelar</button>
            <button style={{ padding: '8px 20px', borderRadius: 6, border: 'none', background: '#185fa5', color: '#c1d9ff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Actualizar contraseña</button>
          </div>
        </div>
      </div>
    </div>
  )
}