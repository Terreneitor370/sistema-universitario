import { useState } from 'react'
import { Link } from 'react-router-dom'

function sanitize(val) { return val.replace(/[^a-zA-Z0-9-]/g, '').slice(0, 12) }
function sanitizeCURP(val) { return val.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 18) }

const CURP_REGEX = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1) // 1=matricula+curp, 2=new password, 3=done
  const [matricula, setMatricula] = useState('')
  const [curp, setCurp] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState({})

  function validateStep1() {
    const e = {}
    if (!/^(\d{4}-\d{4}|DOC-\d{4}|ADM-\d{4})$/i.test(matricula)) e.matricula = 'Formato de matrícula inválido'
    if (!CURP_REGEX.test(curp)) e.curp = 'CURP inválida — debe tener 18 caracteres alfanuméricos'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function validateStep2() {
    const e = {}
    if (password.length < 6) e.password = 'Mínimo 6 caracteres'
    if (password !== confirm) e.confirm = 'Las contraseñas no coinciden'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const inp = (err) => ({
    width: '100%', height: 46, background: '#f8f9ff', border: `1px solid ${err ? '#ba1a1a' : '#c2c6d2'}`,
    borderRadius: 4, padding: '0 14px', fontSize: 15, color: '#0d1c2f', outline: 'none',
    boxSizing: 'border-box', fontFamily: 'Inter, sans-serif',
  })

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#eff4ff' }}>
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <div style={{ width: '100%', maxWidth: 420, background: '#fff', borderRadius: 12, border: '1px solid #c2c6d2', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          <div style={{ padding: '2.5rem 2rem 2rem', textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, background: step === 3 ? '#006e1c' : '#185fa5', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', transition: 'background 0.3s' }}>
              <span className="material-symbols-outlined" style={{ color: '#c1d9ff', fontSize: 30, fontVariationSettings: "'FILL' 1" }}>
                {step === 3 ? 'check_circle' : 'lock_reset'}
              </span>
            </div>
            <h1 style={{ fontSize: 20, fontWeight: 600, color: '#004782' }}>
              {step === 1 ? 'Recuperar contraseña' : step === 2 ? 'Nueva contraseña' : '¡Contraseña actualizada!'}
            </h1>
            <p style={{ fontSize: 12, color: '#727782', marginTop: 4 }}>
              {step === 1 ? 'Verificaremos tu identidad con tu matrícula y CURP' : step === 2 ? 'Elige una contraseña segura' : 'Ya puedes iniciar sesión con tu nueva contraseña'}
            </p>
          </div>

          <div style={{ padding: '0 2rem 2.5rem' }}>
            {/* Step indicator */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
              {[1,2,3].map(n => (
                <div key={n} style={{ flex: 1, height: 4, borderRadius: 2, background: step >= n ? '#185fa5' : '#e0e2ec', transition: 'background 0.3s' }} />
              ))}
            </div>

            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#424751', marginBottom: 6 }}>Matrícula o número de empleado</label>
                  <input value={matricula} onChange={e => { setMatricula(sanitize(e.target.value)); setErrors({}) }} placeholder="Ej. 2024-0312" maxLength={12} style={inp(errors.matricula)} />
                  {errors.matricula && <p style={{ fontSize: 11, color: '#ba1a1a', marginTop: 4 }}>{errors.matricula}</p>}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#424751', marginBottom: 6 }}>CURP</label>
                  <input value={curp} onChange={e => { setCurp(sanitizeCURP(e.target.value)); setErrors({}) }} placeholder="ABCD900101HXXXXX00" maxLength={18} style={{ ...inp(errors.curp), textTransform: 'uppercase', letterSpacing: 1 }} />
                  {errors.curp && <p style={{ fontSize: 11, color: '#ba1a1a', marginTop: 4 }}>{errors.curp}</p>}
                  <p style={{ fontSize: 11, color: '#727782', marginTop: 4 }}>18 caracteres · Sin espacios ni guiones</p>
                </div>
                <div style={{ background: '#eff4ff', border: '1px solid #c2c6d2', borderRadius: 8, padding: '10px 14px', display: 'flex', gap: 8 }}>
                  <span className="material-symbols-outlined" style={{ color: '#185fa5', fontSize: 16, flexShrink: 0, marginTop: 1 }}>info</span>
                  <p style={{ fontSize: 12, color: '#424751', lineHeight: 1.5 }}>Tu CURP debe coincidir exactamente con la registrada en tu expediente escolar. Si tienes dudas, contacta a Servicios Escolares.</p>
                </div>
                <button onClick={() => validateStep1() && setStep(2)}
                  style={{ height: 46, background: '#185fa5', color: '#fff', borderRadius: 4, border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer', marginTop: 4 }}>
                  Verificar identidad
                </button>
              </div>
            )}

            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#424751', marginBottom: 6 }}>Nueva contraseña</label>
                  <div style={{ position: 'relative' }}>
                    <input type={showPw ? 'text' : 'password'} value={password} onChange={e => { setPassword(e.target.value.replace(/['"`;\\=<>]/g,'').slice(0,32)); setErrors({}) }} placeholder="Mínimo 6 caracteres" style={{ ...inp(errors.password), paddingRight: 44 }} />
                    <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#727782', display: 'flex', padding: 0 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{showPw ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  </div>
                  {errors.password && <p style={{ fontSize: 11, color: '#ba1a1a', marginTop: 4 }}>{errors.password}</p>}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#424751', marginBottom: 6 }}>Confirmar contraseña</label>
                  <input type="password" value={confirm} onChange={e => { setConfirm(e.target.value.slice(0,32)); setErrors({}) }} placeholder="Repite tu nueva contraseña" style={inp(errors.confirm)} />
                  {errors.confirm && <p style={{ fontSize: 11, color: '#ba1a1a', marginTop: 4 }}>{errors.confirm}</p>}
                </div>
                {/* Strength indicator */}
                <div>
                  <p style={{ fontSize: 11, color: '#727782', marginBottom: 6 }}>Fortaleza de la contraseña</p>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[1,2,3,4].map(n => {
                      const strength = password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password) ? 4 : password.length >= 8 && /[A-Z]/.test(password) ? 3 : password.length >= 6 ? 2 : password.length > 0 ? 1 : 0
                      const color = strength >= 4 ? '#4ade80' : strength >= 3 ? '#a4c9ff' : strength >= 2 ? '#fbbf24' : '#f87171'
                      return <div key={n} style={{ flex: 1, height: 4, borderRadius: 2, background: n <= strength ? color : '#e0e2ec', transition: 'background 0.3s' }} />
                    })}
                  </div>
                </div>
                <button onClick={() => validateStep2() && setStep(3)}
                  style={{ height: 46, background: '#185fa5', color: '#fff', borderRadius: 4, border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer', marginTop: 4 }}>
                  Actualizar contraseña
                </button>
              </div>
            )}

            {step === 3 && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 13, color: '#424751', marginBottom: 24, lineHeight: 1.6 }}>Tu contraseña fue actualizada exitosamente. Ya puedes iniciar sesión con tus nuevas credenciales.</p>
                <Link to="/login" style={{ display: 'block', height: 46, lineHeight: '46px', background: '#185fa5', color: '#fff', borderRadius: 4, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>
                  Ir al inicio de sesión
                </Link>
              </div>
            )}

            {step < 3 && (
              <p style={{ fontSize: 12, color: '#727782', textAlign: 'center', marginTop: 20 }}>
                <Link to="/login" style={{ color: '#004782' }}>← Volver al inicio de sesión</Link>
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}