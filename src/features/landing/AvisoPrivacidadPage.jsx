export default function AvisoPrivacidadPage() {
  const section = (title, children) => (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0d1c2f', marginBottom: 12, paddingBottom: 8, borderBottom: '2px solid #185fa5' }}>{title}</h2>
      {children}
    </div>
  )
  const p = (text) => <p style={{ fontSize: 14, color: '#424751', lineHeight: 1.8, marginBottom: 10 }}>{text}</p>

  return (
    <div style={{ background: '#f8f9ff', minHeight: '100vh' }}>
      <div style={{ background: '#004782', padding: '3rem 4rem' }}>
        <p style={{ fontSize: 11, color: '#a4c9ff', marginBottom: 8 }}>Última actualización: 1 de octubre de 2025</p>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#fff' }}>Aviso de Privacidad</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginTop: 8 }}>Universidad Central A.C. — Portal Universitario</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ background: '#eff4ff', border: '1px solid #185fa530', borderRadius: 10, padding: '14px 18px', marginBottom: 32, display: 'flex', gap: 10 }}>
          <span className="material-symbols-outlined" style={{ color: '#185fa5', flexShrink: 0 }}>info</span>
          <p style={{ fontSize: 13, color: '#424751' }}>Este aviso de privacidad es emitido en cumplimiento de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y su Reglamento.</p>
        </div>

        {section('I. Identidad y domicilio del Responsable',
          <>{p('Universidad Central A.C., con domicilio en Av. Insurgentes Sur 1234, Col. Del Valle, Ciudad de México, C.P. 03100, es responsable del tratamiento de sus datos personales.')}</>
        )}
        {section('II. Datos personales que recabamos',
          <>{p('Recabamos los siguientes datos personales: nombre completo, CURP, fecha de nacimiento, domicilio particular, correo electrónico institucional y personal, número de teléfono, matrícula o número de empleado, información académica (calificaciones, asistencia, historial), información financiera (estado de cuenta, pagos de colegiatura) y datos biométricos en caso de aplicar.')}</>
        )}
        {section('III. Finalidades del tratamiento',
          <>
            {p('Los datos personales serán utilizados para:')}
            <ul style={{ paddingLeft: 20, fontSize: 14, color: '#424751', lineHeight: 2 }}>
              {['Gestión de la relación académica y administrativa entre el alumno/docente y la institución','Prestación de servicios educativos y evaluación del desempeño académico','Generación de documentos escolares: constancias, credenciales, certificados','Control de acceso a instalaciones y sistemas institucionales','Comunicación de avisos y notificaciones académico-administrativas','Facturación y gestión de colegiaturas y becas','Cumplimiento de obligaciones legales ante autoridades educativas (SEP, ANUIES)'].map(i => <li key={i}>{i}</li>)}
            </ul>
          </>
        )}
        {section('IV. Transferencia de datos',
          <>{p('Sus datos personales podrán ser transferidos a: Secretaría de Educación Pública (SEP) para efectos de registro y validación oficial; instituciones bancarias para procesamiento de pagos; empresas para programas de estadía profesional y vinculación; y autoridades competentes cuando sea requerido por ley. No se realizarán transferencias comerciales sin su consentimiento.')}</>
        )}
        {section('V. Derechos ARCO',
          <>{p('Usted tiene derecho a Acceder, Rectificar, Cancelar y Oponerse (derechos ARCO) al tratamiento de sus datos personales. Para ejercer estos derechos, envíe su solicitud a privacidad@ucentral.edu.mx o preséntese en la Oficina de Servicios Escolares con identificación oficial. El plazo de respuesta es de 20 días hábiles.')}</>
        )}
        {section('VI. Uso de cookies y tecnologías de rastreo',
          <>{p('El Portal Universitario utiliza cookies de sesión estrictamente necesarias para el funcionamiento del sistema de autenticación. No utilizamos cookies publicitarias ni de terceros para rastreo comercial. Puede configurar su navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del portal.')}</>
        )}
        {section('VII. Cambios al aviso de privacidad',
          <>{p('Nos reservamos el derecho de modificar el presente aviso de privacidad. Cualquier cambio será notificado a través del portal universitario y/o correo electrónico institucional. Le recomendamos revisar periódicamente este documento.')}</>
        )}
        <div style={{ background: '#fff', border: '1px solid #e0e2ec', borderRadius: 10, padding: '1.25rem', marginTop: 8 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1c2f', marginBottom: 4 }}>Contacto del Responsable de Privacidad</p>
          <p style={{ fontSize: 13, color: '#727782' }}>Correo: privacidad@ucentral.edu.mx</p>
          <p style={{ fontSize: 13, color: '#727782' }}>Teléfono: (686) 123-4567 ext. 310</p>
          <p style={{ fontSize: 13, color: '#727782' }}>Horario: Lunes a Viernes 9:00–14:00 hrs</p>
        </div>
      </div>
    </div>
  )
}
