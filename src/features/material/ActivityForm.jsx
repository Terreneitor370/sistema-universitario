import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ActivityForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', description: '', type: 'Tarea', group: '', due: '', file: null })
  const [saved, setSaved] = useState(false)


  function handleSubmit(e) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => navigate('/docente/material'), 1500)
  }

  const inp = { width: '100%', background: '#040e1f', border: '1px solid #424751', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#d8e3fb', outline: 'none', boxSizing: 'border-box' }
  const label = { display: 'block', fontSize: 11, fontWeight: 600, color: '#8c919c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
        <button onClick={() => navigate('/docente/material')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8c919c', display: 'flex', alignItems: 'center', gap: 4 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        </button>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#d8e3fb' }}>Nueva actividad</h1>
          <p style={{ fontSize: 13, color: '#8c919c', marginTop: 2 }}>Crea una tarea, proyecto o material de lectura.</p>
        </div>
      </div>

      {saved && (
        <div style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span className="material-symbols-outlined" style={{ color: '#4ade80' }}>check_circle</span>
          <p style={{ fontSize: 13, color: '#4ade80', fontWeight: 600 }}>Actividad creada. Notificando a los alumnos del grupo...</p>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ background: '#152031', border: '1px solid #424751', borderRadius: 12, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Título */}
        <div>
          <label style={label}>Título de la actividad *</label>
          <input
            required
            placeholder="Ej. Diagrama de componentes"
            style={inp}
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          />
        </div>

        {/* Tipo + Grupo */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={label}>Tipo de actividad *</label>
            <select
              required
              style={{ ...inp, appearance: 'none', cursor: 'pointer' }}
              value={form.type}
              onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
            >
              {['Tarea', 'Proyecto', 'Lectura', 'Examen'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label style={label}>Grupo *</label>
            <select
              required
              style={{ ...inp, appearance: 'none', cursor: 'pointer' }}
              value={form.group}
              onChange={e => setForm(f => ({ ...f, group: e.target.value }))}
            >
              <option value="">Selecciona un grupo</option>
              {['IN-201 — Cálculo Integral', 'IN-205 — Álgebra Lineal', 'IN-302 — Ecuaciones Diferenciales'].map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label style={label}>Instrucciones</label>
          <textarea
            rows={4}
            placeholder="Describe lo que deben hacer los alumnos..."
            style={{ ...inp, resize: 'vertical' }}
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          />
        </div>

        {/* Fecha límite */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={label}>Fecha límite *</label>
            <input
              type="datetime-local"
              required
              style={inp}
              value={form.due}
              onChange={e => setForm(f => ({ ...f, due: e.target.value }))}
            />
          </div>
          <div>
            <label style={label}>Puntuación máxima</label>
            <input type="number" min="1" max="10" defaultValue="10" style={inp} />
          </div>
        </div>

        {/* Archivo adjunto */}
        <div>
          <label style={label}>Archivo adjunto (opcional)</label>
          <div style={{ border: '2px dashed #424751', borderRadius: 8, padding: '1.5rem', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#185fa5'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#424751'}>
            <span className="material-symbols-outlined" style={{ fontSize: 32, color: '#424751', display: 'block', marginBottom: 8 }}>upload_file</span>
            <p style={{ fontSize: 13, color: '#8c919c' }}>Arrastra un archivo o <span style={{ color: '#a4c9ff', fontWeight: 600 }}>haz clic para seleccionar</span></p>
            <p style={{ fontSize: 11, color: '#424751', marginTop: 4 }}>PDF, DOCX, PPTX, ZIP — máximo 50MB</p>
            <input type="file" style={{ display: 'none' }} />
          </div>
        </div>

        {/* Notificación automática */}
        <div style={{ background: '#1f2a3c', borderRadius: 8, padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <span className="material-symbols-outlined" style={{ color: '#a4c9ff', flexShrink: 0, marginTop: 1 }}>notifications_active</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#d8e3fb' }}>Notificaciones automáticas activadas</p>
            <p style={{ fontSize: 12, color: '#8c919c', marginTop: 2 }}>
              Al publicar: los alumnos reciben una notificación inmediata.<br />
              24 horas antes del límite: recordatorio automático.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingTop: 8, borderTop: '1px solid #42475133' }}>
          <button type="button" onClick={() => navigate('/docente/material')}
            style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #424751', background: 'none', color: '#b7c8e1', fontSize: 13, cursor: 'pointer' }}>
            Cancelar
          </button>
          <button type="submit"
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', borderRadius: 8, border: 'none', background: '#185fa5', color: '#c1d9ff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>publish</span>
            Publicar actividad
          </button>
        </div>
      </form>
    </div>
  )
}