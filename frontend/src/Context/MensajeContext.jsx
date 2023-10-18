import { createContext, useState } from 'react'

export const MensajeContext = createContext({})
export const MensajeProvider = ({ children }) => {
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  return (
    <MensajeContext.Provider value={{ mensaje, setMensaje, error, setError }}>
      {children}
    </MensajeContext.Provider>
  )
}
