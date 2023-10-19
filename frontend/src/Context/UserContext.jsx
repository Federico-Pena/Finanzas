import { createContext, useContext, useEffect, useState } from 'react'
import { baseUrl } from '../../constantes'
import { MensajeContext } from './MensajeContext'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const { setMensaje } = useContext(MensajeContext)
  const [theme, setTheme] = useState('dark')
  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem('token'))
    const tema = localStorage.getItem('theme')
    console.log(tema)
    setTheme(tema || 'dark')
    if (data) {
      setUser(data)
    }
  }, [])

  const loginUser = (data) => {
    setUser(data)
    sessionStorage.setItem('token', JSON.stringify(data))
  }
  const logoutUser = () => {
    setUser(null)
    sessionStorage.removeItem('token')
  }
  const deleteUser = async () => {
    const options = {
      method: 'POST',
      headers: {
        authorization: user.token
      }
    }
    const res = await fetch(`${baseUrl}/api/delete/${user.username}`, options)
    const data = await res.json()
    if (data.user) {
      const mensaje = `Usuario eliminado ${data.user.username} transacciones eliminadas ${data.transacciones}`
      setMensaje(mensaje)
      logoutUser()
    }
    if (data.error) {
      setMensaje(data.error)
    }
  }

  const toggleTheme = () => {
    const tema = theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', tema)
    setTheme(tema)
  }
  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, deleteUser, toggleTheme, theme }}>
      {children}
    </UserContext.Provider>
  )
}
