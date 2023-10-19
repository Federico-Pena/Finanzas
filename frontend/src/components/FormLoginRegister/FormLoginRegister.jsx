import { useContext, useState } from 'react'
import useForm from '../../Hooks/Formulario/useForm'
import './FormLoginRegister.css'
import { UserContext } from '../../Context/UserContext'
import { MensajeContext } from '../../Context/MensajeContext'
import { Toast } from '../Toast/Toast'
import { baseUrl } from '../../../constantes'
const initialValues = {
  username: '',
  password: ''
}
const validationRules = {
  username: {
    required: true,
    pattern: /^(?=.*[A-Za-z])[A-Za-z\d]{4,}$/,
    message: 'El nombre de usuario debe contener al menos 4 caracteres'
  },
  password: {
    required: true,
    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    message: 'La contraseña debe contener al menos 8 caracteres, una letra y un número'
  }
}
export const FormLoginRegister = () => {
  const { loginUser } = useContext(UserContext)
  const { mensaje, setMensaje } = useContext(MensajeContext)
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)

  const { values, errors, validateForm, handleChange, resetForm } = useForm(
    initialValues,
    validationRules
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validForm = validateForm()
    if (validForm && values !== initialValues) {
      setLoading(true)
      try {
        const response = await fetch(`${baseUrl}/api/${isLogin ? 'login' : 'register'}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })
        const data = await response.json()
        if (isLogin) {
          if (response.ok) {
            resetForm()
            loginUser(data)
          } else {
            setMensaje(data.error)
          }
        } else {
          if (response.status === 201) {
            resetForm()
            setMensaje(data.message)
          } else {
            setMensaje(data.error)
          }
        }
      } catch (error) {
        setMensaje(error)
      }
      setLoading(false)
    } else {
      return
    }
  }

  return (
    <>
      {mensaje && <Toast mensaje={mensaje} setMensaje={setMensaje} />}
      <dialog className='auth-dialog'>
        <form onSubmit={handleSubmit} className='auth-form'>
          <header>
            <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
          </header>
          <main>
            <label className='label-auth-form'>
              Usuario:
              <input
                autoComplete='off'
                type='text'
                name='username'
                value={values.username}
                onChange={handleChange}
                className='auth-input'
              />
              {errors.username && <span className='errors'>{errors.username}</span>}
            </label>
            <label className='label-auth-form'>
              Contraseña:
              <input
                autoComplete='off'
                type='password'
                name='password'
                value={values.password}
                onChange={handleChange}
                className='auth-input'
              />
              {errors.password && <span className='errors'>{errors.password}</span>}
            </label>
          </main>
          <footer>
            <button type='submit' className='auth-button' disabled={loading}>
              {loading ? 'Cargando...' : isLogin ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
            <span className='spanFooter' onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión'}
            </span>
          </footer>
        </form>
      </dialog>
    </>
  )
}
