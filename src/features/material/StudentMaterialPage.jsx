import { useState } from 'react'

const activities = [
  { id: 1, title: 'Diagrama de componentes', subject: 'Arquitectura de SW', teacher: 'Dr. Torres', type: 'Tarea', due: '20/10/2025 23:59', dueTs: new Date('2025-10-20T23:59'), file: 'instrucciones_diagrama.pdf', mySubmission: null, status: 'pending' },
  { id: 2, title: 'Ejercicios de integrales', subject: 'Cálculo Diferencial', teacher: 'Dr. Ramírez', type: 'Tarea', due: '15/10/2025 23:59', dueTs: new Date('2025-10-15T23:59'), file: 'ejercicios_integrales.pdf', mySubmission: { file: 'mi_tarea_integrales.pdf', submittedAt: '14/10/2025 21:30', grade: 9.0, comment: '¡Muy bien resuelto!' }, status: 'graded' },
  { id: 3, title: 'Lectura: Clean Architecture', subject: 'Arquitectura de SW', teacher: 'Dr. Torres', type: 'Lectura', due: '18/10/2025 23:59', dueTs: new Date('2025-10-18T23:59'), file: 'clean_architecture_ch1.pdf', mySubmission: { file: 'lectura_resumen.pdf', submittedAt: '17/10/2025 19:00', grade: null, comment: '' }, status: 'submitted' },
  { id: 4, title: 'Proyecto integrador parcial 2', subject: 'Arquitectura de SW', teacher: 'Dr. Torres', type: 'Proyecto', due: '25/10/2025 23:59', dueTs: new Date('2025-10-25T23:59'), file: null, mySubmission: null, status: 'pending' },
]

const typeColors = {
  Tarea:    { bg: 'rgba(164,201,255,0.12)', color: '#a4c9ff' },
  Proyecto: { bg: 'rgba(255,183,129,0.12)', color: '#ffb781' },
  Lectura:  { bg: 'rgba(183,200,225,0.12)', color: '#b7c8e1' },
  Examen:   { bg: 'rgba(248,113,113,0.12)', color: '#f87171' },
}

function ActivityCard({ activity }) {
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [fileName, setFileName] = useState('')
  const tc = typeColors[activity.type]

  const isOverdue = new Date() > activity.dueTs && !activity.mySubmission

  function handleUpload() {
    if (!fileName) return
    setUploading(true)
    setTimeout(() => { setUploading(false); setUploaded(true) }, 1200)
  }

  const card = { background: '#152031', border: '1px solid #424751', borderRadius: 12, padding: '1.25rem' }

  return (
    <div style={{ ...card, borderLeft: activity.status === 'graded' ? '4px solid #4ade80' : activity.status === 'submitted' ? '4px solid #a4c9ff' : isOverdue ? '4px solid #f87171' : '4px solid #185fa5' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ padding: '2px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: tc.bg, color: tc.color }}>{activity.type}</span>
            {isOverdue && <span style={{ padding: '2px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: 'rgba(248,113,113,0.12)', color: '#f87171' }}>Vencida</span>}
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#d8e3fb', marginBottom: 4 }}>{activity.title}</h3>
          <p style={{ fontSize: 12, color: '#8c919c' }}>{activity.subject} · {activity.teacher}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#8c919c' }}>schedule</span>
            <span style={{ fontSize: 12, color: isOverdue ? '#f87171' : '#8c919c' }}>Límite: {activity.due}</span>
          </div>
          {activity.mySubmission?.grade && (
            <div style={{ marginTop: 8, background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 8, padding: '4px 12px', display: 'inline-block' }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#4ade80' }}>{activity.mySubmission.grade}</span>
              <span style={{ fontSize: 12, color: '#8c919c' }}> / 10</span>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Material del docente */}
        {activity.file && (
          <div style={{ background: '#1f2a3c', borderRadius: 8, padding: '10px 14px' }}>
            <p style={{ fontSize: 11, color: '#8c919c', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>Material adjunto</p>
            <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: '1px solid #185fa5', borderRadius: 6, padding: '6px 12px', color: '#a4c9ff', fontSize: 12, cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>
              {activity.file}
            </button>
          </div>
        )}

        {/* Mi entrega */}
        <div style={{ background: '#1f2a3c', borderRadius: 8, padding: '10px 14px' }}>
          <p style={{ fontSize: 11, color: '#8c919c', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>Mi entrega</p>
          {activity.mySubmission && !uploaded ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#4ade80' }}>check_circle</span>
                <span style={{ fontSize: 12, color: '#4ade80', fontWeight: 600 }}>{activity.mySubmission.file}</span>
              </div>
              <p style={{ fontSize: 11, color: '#8c919c' }}>Entregado: {activity.mySubmission.submittedAt}</p>
              {activity.mySubmission.comment && (
                <p style={{ fontSize: 12, color: '#b7c8e1', marginTop: 6, fontStyle: 'italic' }}>"{activity.mySubmission.comment}"</p>
              )}
            </div>
          ) : uploaded ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="material-symbols-outlined" style={{ color: '#4ade80', fontSize: 16 }}>check_circle</span>
              <span style={{ fontSize: 12, color: '#4ade80', fontWeight: 600 }}>{fileName} — Entregado</span>
            </div>
          ) : !isOverdue ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#040e1f', border: '1px dashed #424751', borderRadius: 6, padding: '8px 12px', cursor: 'pointer' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#a4c9ff' }}>attach_file</span>
                <span style={{ fontSize: 12, color: fileName ? '#d8e3fb' : '#8c919c', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {fileName || 'Seleccionar archivo...'}
                </span>
                <input type="file" style={{ display: 'none' }}
                  onChange={e => { if (e.target.files[0]) setFileName(e.target.files[0].name) }} />
              </label>
              <button onClick={handleUpload} disabled={!fileName || uploading}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: fileName ? '#185fa5' : '#1f2a3c', color: fileName ? '#c1d9ff' : '#424751', border: 'none', borderRadius: 6, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: fileName ? 'pointer' : 'default' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{uploading ? 'hourglass_empty' : 'upload'}</span>
                {uploading ? 'Subiendo...' : 'Subir entrega'}
              </button>
            </div>
          ) : (
            <p style={{ fontSize: 12, color: '#f87171' }}>Entrega cerrada</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function StudentMaterialPage() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? activities
    : filter === 'pending' ? activities.filter(a => a.status === 'pending')
    : activities.filter(a => a.status === 'graded' || a.status === 'submitted')

  const pending = activities.filter(a => a.status === 'pending').length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#d8e3fb' }}>Material y Actividades</h1>
          <p style={{ fontSize: 13, color: '#8c919c', marginTop: 4 }}>Cuatrimestre 2025-B</p>
        </div>
        {pending > 0 && (
          <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: 8, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="material-symbols-outlined" style={{ color: '#f87171', fontSize: 16 }}>assignment_late</span>
            <span style={{ fontSize: 13, color: '#f87171', fontWeight: 600 }}>{pending} {pending === 1 ? 'actividad pendiente' : 'actividades pendientes'}</span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 2, background: '#2a3548', borderRadius: 999, padding: 3, width: 'fit-content' }}>
        {[['all','Todas'],['pending','Pendientes'],['done','Entregadas']].map(([v, l]) => (
          <button key={v} onClick={() => setFilter(v)}
            style={{ padding: '6px 16px', borderRadius: 999, border: 'none', background: filter === v ? '#185fa5' : 'transparent', color: filter === v ? '#c1d9ff' : '#8c919c', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            {l}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.map(a => <ActivityCard key={a.id} activity={a} />)}
      </div>
    </div>
  )
}