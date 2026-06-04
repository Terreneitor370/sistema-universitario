const programs = [
  { area: 'Ingeniería', color: '#185fa5', icon: 'engineering', careers: [
    { name: 'Ingeniería en Sistemas Computacionales', duration: '9 cuatrimestres', modality: 'Presencial' },
    { name: 'Ingeniería Industrial', duration: '9 cuatrimestres', modality: 'Presencial' },
    { name: 'Ingeniería en Mecatrónica', duration: '9 cuatrimestres', modality: 'Presencial' },
    { name: 'Ingeniería en Tecnologías de la Información', duration: '9 cuatrimestres', modality: 'Presencial' },
  ]},
  { area: 'Ciencias Económico-Administrativas', color: '#0d9488', icon: 'business_center', careers: [
    { name: 'Administración y Gestión Empresarial', duration: '9 cuatrimestres', modality: 'Presencial / En línea' },
    { name: 'Contaduría Pública', duration: '9 cuatrimestres', modality: 'Presencial' },
    { name: 'Logística y Cadena de Suministro', duration: '9 cuatrimestres', modality: 'Presencial' },
  ]},
  { area: 'Tecnologías Emergentes', color: '#9333ea', icon: 'rocket_launch', careers: [
    { name: 'Inteligencia Artificial y Ciencia de Datos', duration: '9 cuatrimestres', modality: 'Presencial' },
    { name: 'Ciberseguridad', duration: '9 cuatrimestres', modality: 'Presencial' },
    { name: 'Desarrollo de Software', duration: '9 cuatrimestres', modality: 'En línea' },
  ]},
]

const requirements = [
  'Certificado de bachillerato o constancia de estudios',
  'Acta de nacimiento',
  'CURP',
  'Comprobante de domicilio',
  'Identificación oficial vigente',
]

export default function OfertaEducativaPage() {
  const card = { background: '#fff', border: '1px solid #e0e2ec', borderRadius: 12 }

  return (
    <div style={{ background: '#f8f9ff', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #004782, #185fa5)', padding: '4rem', textAlign: 'center' }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: '#a4c9ff', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Oferta Educativa</p>
        <h1 style={{ fontSize: 40, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Encuentra tu carrera ideal</h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
          Programas educativos de nivel superior bajo el modelo de universidades tecnológicas y politécnicas del Sistema SEP.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Model info */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 40 }}>
          {[
            { icon: 'schedule', label: 'Modelo cuatrimestral', detail: '3 cuatrimestres por año · Egreso en 3 años' },
            { icon: 'workspace_premium', label: 'Nivel TSU y Licenciatura', detail: 'Opción de titulación en 9 cuatrimestres' },
            { icon: 'handshake', label: 'Estadía profesional', detail: 'Vinculación empresarial en el cuatrimestre 8' },
          ].map(i => (
            <div key={i.label} style={{ ...card, padding: '1.25rem', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span className="material-symbols-outlined" style={{ color: '#185fa5', fontSize: 24, flexShrink: 0 }}>{i.icon}</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#0d1c2f', marginBottom: 4 }}>{i.label}</p>
                <p style={{ fontSize: 12, color: '#727782' }}>{i.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Programs by area */}
        {programs.map(area => (
          <div key={area.area} style={{ marginBottom: 36 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span className="material-symbols-outlined" style={{ color: area.color, fontSize: 24 }}>{area.icon}</span>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0d1c2f' }}>{area.area}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
              {area.careers.map(c => (
                <div key={c.name} style={{ ...card, padding: '1.25rem', borderLeft: `4px solid ${area.color}` }}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: '#0d1c2f', marginBottom: 10 }}>{c.name}</h3>
                  <div style={{ display: 'flex', gap: 16, marginBottom: 14 }}>
                    <span style={{ fontSize: 11, color: '#727782', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>schedule</span> {c.duration}
                    </span>
                    <span style={{ fontSize: 11, color: '#727782', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>location_on</span> {c.modality}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Admission requirements */}
        <div style={{ ...card, padding: '2rem', marginTop: 8 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0d1c2f', marginBottom: 4 }}>Requisitos de admisión</h2>
          <p style={{ fontSize: 13, color: '#727782', marginBottom: 20 }}>Documentos necesarios para iniciar tu proceso de inscripción.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
            {requirements.map(r => (
              <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#eff4ff', borderRadius: 8, padding: '10px 14px' }}>
                <span className="material-symbols-outlined" style={{ color: '#185fa5', fontSize: 18, flexShrink: 0 }}>check_circle</span>
                <span style={{ fontSize: 13, color: '#0d1c2f' }}>{r}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, padding: '14px 18px', background: '#185fa510', border: '1px solid #185fa530', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#004782' }}>¿Listo para inscribirte?</p>
              <p style={{ fontSize: 12, color: '#727782' }}>Periodo de inscripciones: 1–30 de noviembre 2025</p>
            </div>
            <button style={{ background: '#185fa5', color: '#fff', padding: '10px 24px', borderRadius: 6, border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
              Iniciar proceso
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}