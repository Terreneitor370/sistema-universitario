import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuthStore } from '@store/authStore'
import Breadcrumb from '@components/ui/Breadcrumb'

const navConfig = {
  admin: [
    { label: 'Dashboard', to: '/admin', icon: 'dashboard' },
    { label: 'Alumnos', to: '/admin/alumnos', icon: 'group', badge: 3 },
    { label: 'Materias', to: '/admin/materias', icon: 'school' },
    { label: 'Calificaciones', to: '/admin/calificaciones', icon: 'grade' },
    { label: 'Horarios', to: '/admin/horarios', icon: 'calendar_today' },
    { label: 'Finanzas', to: '/admin/finanzas', icon: 'payments' },
    { label: 'Becas', to: '/admin/becas', icon: 'workspace_premium' },
    { label: 'Notificaciones', to: '/admin/notificaciones', icon: 'notifications', badge: 5 },
    { label: 'Configuración', to: '/admin/configuracion', icon: 'settings' },
  ],
  student: [
    { label: 'Inicio', to: '/estudiante', icon: 'home' },
    { label: 'Mi Horario', to: '/estudiante/horario', icon: 'calendar_month' },
    { label: 'Calificaciones', to: '/estudiante/calificaciones', icon: 'grade' },
    { label: 'Inscripciones', to: '/estudiante/inscripciones', icon: 'assignment_ind' },
    { label: 'Material y Actividades', to: '/estudiante/material', icon: 'assignment' },
    { label: 'Mi Estado de Cuenta', to: '/estudiante/pagos', icon: 'account_balance_wallet', badge: 1 },
    { label: 'Notificaciones', to: '/estudiante/notificaciones', icon: 'notifications', badge: 3 },
    { label: 'Soporte', to: '/estudiante/soporte', icon: 'support_agent' },
  ],
  teacher: [
    { label: 'Inicio', to: '/docente', icon: 'home' },
    { label: 'Mis Grupos', to: '/docente/grupos', icon: 'group' },
    { label: 'Captura de Calificaciones', to: '/docente/calificaciones', icon: 'edit_note' },
    { label: 'Asistencia', to: '/docente/asistencia', icon: 'fact_check' },
    { label: 'Material de Clase', to: '/docente/material', icon: 'menu_book' },
    { label: 'Horario', to: '/docente/horario', icon: 'calendar_today' },
    { label: 'Notificaciones', to: '/docente/notificaciones', icon: 'notifications', badge: 2 },
    { label: 'Soporte', to: '/docente/soporte', icon: 'help_outline' },
  ],
}

const roleLabels = { admin: 'Admin Portal', student: 'Portal Académico', teacher: 'Portal Docente' }

function Sidebar({ role, navItems, user, onLogout }) {
  return (
    <aside style={{
      width: 'var(--sidebar-width)', minWidth: 'var(--sidebar-width)', height: '100%',
      background: '#040e1f', borderRight: '1px solid #424751',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      {/* Logo */}
      <div style={{ padding: '18px 16px', borderBottom: '1px solid #424751' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <span className="material-symbols-outlined" style={{ color: '#a4c9ff', fontSize: 28 }}>school</span>
          <span style={{ fontWeight: 700, fontSize: 18, color: '#a4c9ff' }}>UMS Pro</span>
        </div>
        <p style={{ fontSize: 11, color: '#8c919c', marginLeft: 38 }}>{roleLabels[role]}</p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px 8px', overflowY: 'auto' }}>
        {navItems.map(({ label, to, icon, badge }) => (
          <NavLink key={to} to={to} end={to.split('/').length === 2}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 12px', borderRadius: 8, marginBottom: 2,
              fontWeight: isActive ? 600 : 400, fontSize: 12, letterSpacing: '0.05em',
              color: isActive ? '#c1d9ff' : '#b7c8e1',
              background: isActive ? '#185fa5' : 'transparent',
              textDecoration: 'none', transition: 'all 0.15s',
            })}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{icon}</span>
            <span style={{ flex: 1 }}>{label}</span>
            {badge && (
              <span style={{ background: '#ffb4ab', color: '#690005', borderRadius: 10, fontSize: 10, padding: '1px 6px', fontWeight: 600 }}>
                {badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User footer */}
      <div style={{ padding: '12px 8px', borderTop: '1px solid #424751' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 8px' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#185fa5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#c1d9ff', flexShrink: 0 }}>
            {(user?.name || 'U').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#d8e3fb', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name || 'Usuario'}</div>
            <div style={{ fontSize: 11, color: '#8c919c' }}>{roleLabels[role]}</div>
          </div>
          <button onClick={onLogout} title="Cerrar sesión"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ffb4ab', padding: 4, borderRadius: 4, display: 'flex', alignItems: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>logout</span>
          </button>
        </div>
      </div>
    </aside>
  )
}

export default function AppLayout({ role }) {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const navItems = navConfig[role] || navConfig.admin

  function handleLogout() { logout(); navigate('/login') }

  return (
    <div className="dark" style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#081425', color: '#d8e3fb' }}>
      {/* Desktop sidebar */}
      <div className="hidden md:flex" style={{ flexShrink: 0 }}><Sidebar role={role} navItems={navItems} user={user} onLogout={handleLogout} /></div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40, display: 'flex' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} onClick={() => setMenuOpen(false)} />
          <div style={{ position: 'relative', zIndex: 1, width: 'var(--sidebar-width)' }}><Sidebar role={role} navItems={navItems} user={user} onLogout={handleLogout} /></div>
        </div>
      )}

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Topbar */}
        <header style={{
          height: 64, flexShrink: 0, background: '#1f2a3c',
          borderBottom: '1px solid #424751',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 1.5rem', gap: 12,
        }}>
          <button className="flex md:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#b7c8e1', padding: 4 }} onClick={() => setMenuOpen(true)}>
            <span className="material-symbols-outlined">menu</span>
          </button>
          {/* Search */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 8, background: '#152031', border: '1px solid #424751', borderRadius: 999, padding: '6px 14px', flex: '0 0 260px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#8c919c' }}>search</span>
            <input placeholder="Buscar..." style={{ background: 'none', border: 'none', outline: 'none', fontSize: 13, color: '#d8e3fb', width: '100%' }} />
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={() => navigate(`/${role === 'admin' ? 'admin' : role === 'teacher' ? 'docente' : 'estudiante'}/notificaciones`)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#b7c8e1', padding: 6, borderRadius: '50%', display: 'flex', position: 'relative' }}>
              <span className="material-symbols-outlined">notifications</span>
              <span style={{ position: 'absolute', top: 5, right: 5, width: 7, height: 7, background: '#ffb4ab', borderRadius: '50%', border: '1.5px solid #1f2a3c' }} />
            </button>
            <button onClick={() => navigate(`/${role === 'admin' ? 'admin' : role === 'teacher' ? 'docente' : 'estudiante'}/configuracion`)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#b7c8e1', padding: 6, borderRadius: '50%', display: 'flex' }}>
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div style={{ width: 1, height: 24, background: '#424751', margin: '0 4px' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: '#d8e3fb' }}>{user?.name || 'Usuario'}</div>
                <div style={{ fontSize: 10, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Semestre 2025-B</div>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#185fa5', border: '2px solid #a4c9ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#c1d9ff' }}>
                {(user?.name || 'U').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem' }}>
          <Breadcrumb />
          <Outlet />
        </main>
      </div>
    </div>
  )
}


