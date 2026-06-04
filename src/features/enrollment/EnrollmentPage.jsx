import { useState } from 'react'

const cuatrimestres = [
  { id: 1, label: 'Cuatrimestre 1', period: 'Ene–Abr 2024', status: 'completed', gpa: 9.1, subjects: ['Cálculo Diferencial', 'Introducción a la Programación', 'Álgebra Lineal', 'Inglés I', 'Fundamentos de Ing.'] },
  { id: 2, label: 'Cuatrimestre 2', period: 'May–Ago 2024', status: 'completed', gpa: 8.8, subjects: ['Cálculo Integral', 'Programación Orientada a Objetos', 'Probabilidad y Estadística', 'Inglés II', 'Física'] },
  { id: 3, label: 'Cuatrimestre 3', period: 'Sep–Dic 2024', status: 'completed', gpa: 8.5, subjects: ['Ecuaciones Diferenciales', 'Estructura de Datos', 'Bases de Datos', 'Inglés III', 'Sistemas Operativos'] },
  { id: 4, label: 'Cuatrimestre 4', period: 'Ene–Abr 2025', status: 'completed', gpa: 8.7, subjects: ['Redes de Computadoras', 'Programación Web', 'Ingeniería de Software', 'Inglés IV', 'Arquitectura de Computadoras'] },
  { id: 5, label: 'Cuatrimestre 5', period: 'May–Ago 2025', status: 'active', gpa: 8.47, subjects: ['Cálculo Diferencial', 'Programación Avanzada', 'Arquitectura de SW', 'Bases de Datos', 'Inglés V', 'Estadística'] },
  { id: 6, label: 'Cuatrimestre 6', period: 'Sep–Dic 2025', status: 'next', gpa: null, subjects: ['Inteligencia Artificial', 'Desarrollo Móvil', 'Seguridad Informática', 'Inglés VI', 'Gestión de Proyectos'] },
  { id: 7, label: 'Cuatrimestre 7', period: 'Ene–Abr 2026', status: 'locked', gpa: null, subjects: [] },
  { id: 8, label: 'Cuatrimestre 8', period: 'May–Ago 2026', status: 'locked', gpa: null, subjects: [] },
  { id: 9, label: 'Cuatrimestre 9', period: 'Sep–Dic 2026', status: 'locked', gpa: null, subjects: ['Estadía Profesional', 'Proyecto Integrador'] },
]

const statusConfig = {
  completed: { label: 'Completado', color: '#4ade80', bg: 'rgba(74,222,128,0.12)', icon: 'check_circle' },
  active:    { label: 'En curso',   color: '#a4c9ff', bg: 'rgba(164,201,255,0.12)', icon: 'play_circle' },
  next:      { label: 'Próximo',    color: '#fbbf24', bg: 'rgba(251,191,36,0.12)',  icon: 'schedule' },
  locked:    { label: 'Bloqueado',  color: '#424751', bg: 'rgba(66,71,81,0.12)',    icon: 'lock' },
}

export default function EnrollmentPage() {
  const [selected, setSelected] = useState(5)
  const [showConfirm, setShowConfirm] = useState(false)
  const [enrolled, setEnrolled] = useState(false)

  const current = cuatrimestres.find(c => c.id === selected)
  const completed = cuatrimestres.filter(c => c.status === 'completed').length
  const total = cuatrimestres.length
  const progress = Math.round((completed / total) * 100)

  const card = { background: '#152031', border: '1px solid #424751', borderRadius: 12 }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#d8e3fb' }}>Inscripciones</h1>
        <p style={{ fontSize: 13, color: '#8c919c', marginTop: 4 }}>Ingeniería en Sistemas Computacionales — Plan de estudios 9 cuatrimestres</p>
      </div>

      {/* Progress bar */}
      <div style={{ ...card, padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#d8e3fb' }}>Avance en la carrera</p>
            <p style={{ fontSize: 12, color: '#8c919c', marginTop: 2 }}>{completed} de {total} cuatrimestres completados</p>
          </div>
          <span style={{ fontSize: 28, fontWeight: 700, color: '#a4c9ff' }}>{progress}%</span>
        </div>
        <div style={{ height: 10, background: '#2a3548', borderRadius: 5, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg,#185fa5,#a4c9ff)', borderRadius: 5, transition: 'width 0.6s ease' }} />
        </div>
        <div style={{ display: 'flex', gap: 20, marginTop: 12, flexWrap: 'wrap' }}>
          {Object.entries(statusConfig).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: v.color }}>{v.icon}</span>
              <span style={{ fontSize: 11, color: '#8c919c' }}>{v.label}: {cuatrimestres.filter(c => c.status === k).length}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next enrollment alert */}
      {!enrolled ? (
        <div style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: 10, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="material-symbols-outlined" style={{ color: '#fbbf24', fontSize: 22 }}>info</span>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#fbbf24' }}>Periodo de inscripción abierto — Cuatrimestre 6</p>
              <p style={{ fontSize: 12, color: '#8c919c' }}>Cierra el 30 de noviembre de 2025. Tu inscripción es automática al cuatrimestre siguiente.</p>
            </div>
          </div>
          <button onClick={() => setShowConfirm(true)}
            style={{ background: '#fbbf24', color: '#1a1000', padding: '8px 20px', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
            Confirmar inscripción
          </button>
        </div>
      ) : (
        <div style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="material-symbols-outlined" style={{ color: '#4ade80' }}>check_circle</span>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#4ade80' }}>Inscripción al Cuatrimestre 6 confirmada. Inicia en Septiembre 2025.</p>
        </div>
      )}

      {/* Confirm modal */}
      {showConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#152031', border: '1px solid #424751', borderRadius: 16, padding: '2rem', maxWidth: 420, width: '100%' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#d8e3fb', marginBottom: 8 }}>Confirmar inscripción</h3>
            <p style={{ fontSize: 13, color: '#8c919c', marginBottom: 16 }}>
              Estás a punto de confirmar tu inscripción al <strong style={{ color: '#d8e3fb' }}>Cuatrimestre 6 (Sep–Dic 2025)</strong>. Esta acción no puede deshacerse una vez procesada.
            </p>
            <div style={{ background: '#1f2a3c', borderRadius: 8, padding: '12px 14px', marginBottom: 20 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#8c919c', marginBottom: 8 }}>Materias a cursar:</p>
              {cuatrimestres[5].subjects.map(s => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#4ade80' }}>check</span>
                  <span style={{ fontSize: 12, color: '#b7c8e1' }}>{s}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: '#fbbf24', marginBottom: 20 }}>⚠ Tu colegiatura del Cuatrimestre 6 se generará al confirmar.</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowConfirm(false)}
                style={{ padding: '9px 20px', borderRadius: 8, border: '1px solid #424751', background: 'none', color: '#b7c8e1', fontSize: 13, cursor: 'pointer' }}>
                Cancelar
              </button>
              <button onClick={() => { setShowConfirm(false); setEnrolled(true) }}
                style={{ padding: '9px 24px', borderRadius: 8, border: 'none', background: '#185fa5', color: '#c1d9ff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid of cuatrimestres */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {cuatrimestres.map(c => {
          const st = statusConfig[c.status]
          const isSelected = selected === c.id
          return (
            <div key={c.id} onClick={() => c.status !== 'locked' && setSelected(c.id)}
              style={{ ...card, padding: '1rem', cursor: c.status !== 'locked' ? 'pointer' : 'default', border: isSelected ? '2px solid #185fa5' : '1px solid #424751', transition: 'border 0.15s, background 0.15s', background: isSelected ? '#1a2d44' : '#152031' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#d8e3fb' }}>{c.label}</p>
                  <p style={{ fontSize: 11, color: '#8c919c' }}>{c.period}</p>
                </div>
                <span style={{ padding: '2px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: st.bg, color: st.color }}>{st.label}</span>
              </div>
              {c.gpa && <p style={{ fontSize: 12, color: '#4ade80' }}>Promedio: <strong>{c.gpa}</strong></p>}
              {c.subjects.length > 0 && (
                <p style={{ fontSize: 11, color: '#8c919c', marginTop: 4 }}>{c.subjects.length} materias</p>
              )}
              {c.status === 'locked' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#424751' }}>lock</span>
                  <span style={{ fontSize: 11, color: '#424751' }}>Completa el cuatrimestre anterior</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Detail panel */}
      {current && (
        <div style={{ ...card, padding: '1.5rem' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#d8e3fb', marginBottom: 4 }}>{current.label} — {current.period}</h3>
          <p style={{ fontSize: 12, color: '#8c919c', marginBottom: 16 }}>Detalle de materias inscritas</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
            {current.subjects.map(s => (
              <div key={s} style={{ background: '#1f2a3c', borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: current.status === 'completed' ? '#4ade80' : '#a4c9ff' }}>
                  {current.status === 'completed' ? 'check_circle' : 'menu_book'}
                </span>
                <span style={{ fontSize: 13, color: '#d8e3fb' }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}