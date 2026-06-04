const activities = [
  { name: 'Club de Robótica', category: 'Tecnología', members: 45, schedule: 'Vie 16:00–18:00', icon: 'smart_toy' },
  { name: 'Orquesta Universitaria', category: 'Arte y Cultura', members: 32, schedule: 'Mar/Jue 17:00–19:00', icon: 'music_note' },
  { name: 'Selección de Fútbol', category: 'Deporte', members: 22, schedule: 'Lun/Mié 06:00–08:00', icon: 'sports_soccer' },
  { name: 'Emprendimiento Estudiantil', category: 'Negocios', members: 60, schedule: 'Sáb 10:00–12:00', icon: 'lightbulb' },
  { name: 'Club de Debate', category: 'Académico', members: 28, schedule: 'Jue 18:00–20:00', icon: 'forum' },
  { name: 'Voluntariado Universitario', category: 'Servicio Social', members: 80, schedule: 'Variable', icon: 'volunteer_activism' },
]

const facilities = [
  { name: 'Biblioteca Central', detail: '40,000 títulos · Hemeroteca digital · Salas de estudio 24/7', icon: 'local_library' },
  { name: 'Laboratorios de Cómputo', detail: '3 laboratorios · 120 equipos · Software especializado', icon: 'computer' },
  { name: 'Cancha Deportiva', detail: 'Fútbol, basquetbol, voleibol · Vestuarios · Área de pesas', icon: 'sports' },
  { name: 'Cafetería Universitaria', detail: 'Desayuno y comida · Opciones vegetarianas · Precios accesibles', icon: 'restaurant' },
  { name: 'Centro Médico', detail: 'Consultas generales · Psicología · Primeros auxilios', icon: 'local_hospital' },
  { name: 'Sala de Innovación', detail: 'Impresión 3D · Espacio maker · Prototipado rápido', icon: 'precision_manufacturing' },
]

export default function VidaUniversitariaPage() {
  const card = { background: '#fff', border: '1px solid #e0e2ec', borderRadius: 12 }

  return (
    <div style={{ background: '#f8f9ff', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg, #0d4b1a, #16a34a)', padding: '4rem', textAlign: 'center' }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: '#86efac', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Vida Universitaria</p>
        <h1 style={{ fontSize: 40, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Más que estudiar, vivir la universidad</h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
          Una comunidad vibrante con actividades, instalaciones y espacios diseñados para tu desarrollo integral.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 40 }}>
          {[['12k+','Estudiantes activos'],['40+','Clubs y organizaciones'],['6','Instalaciones deportivas'],['3','Festivales al año']].map(([v,l]) => (
            <div key={l} style={{ ...card, padding: '1.25rem', textAlign: 'center' }}>
              <p style={{ fontSize: 32, fontWeight: 700, color: '#16a34a', lineHeight: 1 }}>{v}</p>
              <p style={{ fontSize: 12, color: '#727782', marginTop: 6 }}>{l}</p>
            </div>
          ))}
        </div>

        {/* Activities */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0d1c2f', marginBottom: 16 }}>Clubs y actividades extracurriculares</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14, marginBottom: 40 }}>
          {activities.map(a => (
            <div key={a.name} style={{ ...card, padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#16a34a10', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ color: '#16a34a', fontSize: 20 }}>{a.icon}</span>
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1c2f' }}>{a.name}</p>
                  <p style={{ fontSize: 11, color: '#16a34a', fontWeight: 600 }}>{a.category}</p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#727782' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>group</span> {a.members} miembros
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>schedule</span> {a.schedule}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Facilities */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0d1c2f', marginBottom: 16 }}>Instalaciones</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14, marginBottom: 40 }}>
          {facilities.map(f => (
            <div key={f.name} style={{ ...card, padding: '1.25rem', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span className="material-symbols-outlined" style={{ color: '#16a34a', fontSize: 24, flexShrink: 0, marginTop: 2 }}>{f.icon}</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#0d1c2f', marginBottom: 4 }}>{f.name}</p>
                <p style={{ fontSize: 12, color: '#727782', lineHeight: 1.6 }}>{f.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Events */}
        <div style={{ ...card, padding: '2rem' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0d1c2f', marginBottom: 16 }}>Próximos eventos</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { date: 'Nov 15', name: 'Expo Emprendimiento 2025', desc: 'Presentación de proyectos estudiantiles ante empresas patrocinadoras', location: 'Auditorio Principal' },
              { date: 'Nov 22', name: 'Torneo Interfacultades de Fútbol', desc: 'Copa universitaria con participación de los 4 departamentos', location: 'Cancha Principal' },
              { date: 'Dic 5', name: 'Hackathon IA & Sustentabilidad', desc: '48 horas de desarrollo de soluciones tecnológicas con impacto social', location: 'Sala de Innovación' },
            ].map(e => (
              <div key={e.name} style={{ display: 'flex', gap: 16, padding: '12px 0', borderBottom: '1px solid #e0e2ec' }}>
                <div style={{ width: 52, height: 52, background: '#16a34a10', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, flexDirection: 'column' }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: '#16a34a' }}>{e.date.split(' ')[0].toUpperCase()}</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#16a34a' }}>{e.date.split(' ')[1]}</span>
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#0d1c2f', marginBottom: 2 }}>{e.name}</p>
                  <p style={{ fontSize: 12, color: '#727782', marginBottom: 4 }}>{e.desc}</p>
                  <span style={{ fontSize: 11, color: '#16a34a', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 13 }}>location_on</span> {e.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}