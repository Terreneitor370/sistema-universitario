const projects = [
  { title: 'Optimización de redes neuronales para diagnóstico médico', area: 'Inteligencia Artificial', leader: 'Dr. Ramírez Ortega', status: 'active', year: 2024, partners: ['IMSS', 'CONACYT'] },
  { title: 'Sistemas de energía renovable para comunidades rurales', area: 'Ingeniería Sustentable', leader: 'Dra. Morales Vega', status: 'active', year: 2024, partners: ['CFE', 'SENER'] },
  { title: 'Blockchain aplicado a cadenas de suministro agroindustriales', area: 'Tecnologías Emergentes', leader: 'Mtro. Torres Cruz', status: 'active', year: 2023, partners: ['SAGARPA'] },
  { title: 'Modelos predictivos de deserción escolar en educación superior', area: 'Ciencias de la Educación', leader: 'Dra. López Reyes', status: 'completed', year: 2023, partners: ['SEP', 'ANUIES'] },
]

const centers = [
  { name: 'Centro de Innovación y Desarrollo Tecnológico', abbr: 'CIDT', description: 'Desarrollo de prototipos y transferencia tecnológica hacia la industria regional.', icon: 'precision_manufacturing' },
  { name: 'Laboratorio de Inteligencia Artificial Aplicada', abbr: 'LIAA', description: 'Investigación en machine learning, visión computacional y procesamiento de lenguaje natural.', icon: 'psychology' },
  { name: 'Centro de Estudios en Sustentabilidad', abbr: 'CES', description: 'Proyectos de impacto ambiental, energías limpias y economía circular.', icon: 'eco' },
]

export default function InvestigacionPage() {
  const card = { background: '#fff', border: '1px solid #e0e2ec', borderRadius: 12 }

  return (
    <div style={{ background: '#f8f9ff', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg, #1a0050, #6d28d9)', padding: '4rem', textAlign: 'center' }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: '#c4b5fd', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Investigación</p>
        <h1 style={{ fontSize: 40, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Generando conocimiento que transforma</h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
          Investigación aplicada con impacto real en la industria, la sociedad y el medio ambiente.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 40 }}>
          {[['18', 'Proyectos activos'],['$12M', 'Financiamiento obtenido'],['45', 'Investigadores'],['120+', 'Publicaciones']].map(([v,l]) => (
            <div key={l} style={{ ...card, padding: '1.25rem', textAlign: 'center' }}>
              <p style={{ fontSize: 32, fontWeight: 700, color: '#6d28d9', lineHeight: 1 }}>{v}</p>
              <p style={{ fontSize: 12, color: '#727782', marginTop: 6 }}>{l}</p>
            </div>
          ))}
        </div>

        {/* Research centers */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0d1c2f', marginBottom: 16 }}>Centros de investigación</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14, marginBottom: 40 }}>
          {centers.map(c => (
            <div key={c.abbr} style={{ ...card, padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: '#6d28d910', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ color: '#6d28d9', fontSize: 22 }}>{c.icon}</span>
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#6d28d9' }}>{c.abbr}</p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1c2f' }}>{c.name}</p>
                </div>
              </div>
              <p style={{ fontSize: 13, color: '#727782', lineHeight: 1.6 }}>{c.description}</p>
            </div>
          ))}
        </div>

        {/* Active projects */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0d1c2f', marginBottom: 16 }}>Proyectos destacados</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {projects.map(p => (
            <div key={p.title} style={{ ...card, padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ padding: '2px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: p.status === 'active' ? '#185fa510' : '#72778210', color: p.status === 'active' ? '#185fa5' : '#727782' }}>
                    {p.status === 'active' ? 'En curso' : 'Completado'}
                  </span>
                  <span style={{ fontSize: 11, color: '#727782' }}>{p.area}</span>
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#0d1c2f', marginBottom: 6 }}>{p.title}</h3>
                <p style={{ fontSize: 12, color: '#727782' }}>Responsable: {p.leader} · Inicio: {p.year}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                <p style={{ fontSize: 11, color: '#727782' }}>Colaboradores:</p>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  {p.partners.map(pt => (
                    <span key={pt} style={{ padding: '2px 8px', borderRadius: 4, background: '#eff4ff', color: '#004782', fontSize: 11, fontWeight: 600 }}>{pt}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}