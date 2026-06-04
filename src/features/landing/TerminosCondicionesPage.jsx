export default function TerminosCondicionesPage() {
  const section = (num, title, children) => (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0d1c2f', marginBottom: 12, paddingBottom: 8, borderBottom: '2px solid #185fa5' }}>{num}. {title}</h2>
      {children}
    </div>
  )
  const p = (text) => <p style={{ fontSize: 14, color: '#424751', lineHeight: 1.8, marginBottom: 10 }}>{text}</p>

  return (
    <div style={{ background: '#f8f9ff', minHeight: '100vh' }}>
      <div style={{ background: '#004782', padding: '3rem 4rem' }}>
        <p style={{ fontSize: 11, color: '#a4c9ff', marginBottom: 8 }}>Vigente desde: 1 de agosto de 2025</p>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#fff' }}>Términos y Condiciones</h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginTop: 8 }}>Portal Universitario — Universidad Central A.C.</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ background: '#fff3cd', border: '1px solid #fbbf2440', borderRadius: 10, padding: '14px 18px', marginBottom: 32, display: 'flex', gap: 10 }}>
          <span className="material-symbols-outlined" style={{ color: '#d97706', flexShrink: 0 }}>warning</span>
          <p style={{ fontSize: 13, color: '#424751' }}>Al acceder y utilizar el Portal Universitario, usted acepta íntegramente los presentes términos y condiciones. Si no está de acuerdo, deberá abstenerse de usar el sistema.</p>
        </div>

        {section(1, 'Aceptación de los Términos',
          <>{p('El uso del Portal Universitario de Universidad Central A.C. implica la aceptación plena y sin reservas de las presentes condiciones. Estos términos aplican a todos los usuarios: alumnos, docentes y personal administrativo.')}</>
        )}
        {section(2, 'Acceso y Credenciales',
          <>
            {p('El acceso al portal requiere credenciales únicas (matrícula/número de empleado y contraseña). El usuario es responsable de:')}
            <ul style={{ paddingLeft: 20, fontSize: 14, color: '#424751', lineHeight: 2 }}>
              {['Mantener la confidencialidad de su contraseña','No compartir sus credenciales con terceros','Notificar inmediatamente a Soporte cualquier acceso no autorizado','Cerrar sesión al término de cada uso en dispositivos compartidos'].map(i => <li key={i}>{i}</li>)}
            </ul>
          </>
        )}
        {section(3, 'Uso Permitido del Sistema',
          <>{p('El portal está diseñado exclusivamente para actividades académicas y administrativas institucionales. Queda estrictamente prohibido: intentar acceder a cuentas ajenas, realizar ataques al sistema, subir contenido malicioso, compartir información confidencial de otros usuarios, utilizar el sistema para actividades comerciales no autorizadas, y alterar o falsificar información académica.')}</>
        )}
        {section(4, 'Pagos y Transacciones',
          <>{p('Los pagos realizados a través del portal son procesados por proveedores de pago certificados. Universidad Central no almacena datos de tarjetas de crédito/débito. Los pagos confirmados no son reembolsables salvo en los casos establecidos en el Reglamento Escolar vigente. El usuario debe verificar los datos de pago antes de confirmar cualquier transacción.')}</>
        )}
        {section(5, 'Propiedad Intelectual',
          <>{p('Todo el contenido del portal (diseño, textos, materiales de clase, documentos institucionales) es propiedad de Universidad Central A.C. o de sus respectivos autores. Queda prohibida su reproducción, distribución o uso comercial sin autorización escrita previa.')}</>
        )}
        {section(6, 'Limitación de Responsabilidad',
          <>{p('Universidad Central no será responsable por interrupciones del servicio por mantenimiento o causas de fuerza mayor, pérdida de datos por uso indebido del usuario, daños derivados del uso de contraseñas comprometidas por negligencia del usuario, ni por decisiones tomadas con base en información incorrecta ingresada por el propio usuario.')}</>
        )}
        {section(7, 'Modificaciones',
          <>{p('Universidad Central se reserva el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor a partir de su publicación en el portal. El uso continuado del sistema constituirá aceptación de los términos modificados.')}</>
        )}
        {section(8, 'Legislación Aplicable',
          <>{p('Los presentes términos se rigen por las leyes de los Estados Unidos Mexicanos. Para cualquier controversia, las partes se someten a la jurisdicción de los tribunales competentes de la Ciudad de México, renunciando a cualquier otro fuero que pudiera corresponderles.')}</>
        )}
        <div style={{ background: '#fff', border: '1px solid #e0e2ec', borderRadius: 10, padding: '1.25rem', marginTop: 8 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1c2f', marginBottom: 4 }}>¿Tienes dudas sobre estos términos?</p>
          <p style={{ fontSize: 13, color: '#727782' }}>Contacta a servicios escolares: soporte@universidad.edu.mx</p>
        </div>
      </div>
    </div>
  )
}
