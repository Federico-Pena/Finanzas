import { useState, useEffect, useContext } from 'react'
import { MensajeContext } from '../../Context/MensajeContext'
import { UserContext } from '../../Context/UserContext'
import { baseUrl } from '../../../constantes'

const useFetchData = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { user } = useContext(UserContext)
  const { setMensaje } = useContext(MensajeContext)

  useEffect(() => {
    const options = {
      headers: {
        authorization: user.token
      }
    }
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${baseUrl}/api/transactions`, options)
        const res = await response.json()
        if (response.ok) {
          setData(res.data)
        } else {
          setError(res.error)
          setMensaje(res.error)
        }
      } catch (err) {
        setError('Ocurrió un error')
        setMensaje('Ocurrió un error')
      }
      setLoading(false)
    }

    fetchData()
  }, [user, setMensaje])
  const postNota = async (transaccion) => {
    setLoading(true)
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: user.token
        },
        body: JSON.stringify(transaccion)
      }
      const res = await fetch(`${baseUrl}/api/transactions`, options)
      const response = await res.json()
      return response
    } catch (error) {
      setMensaje(error)
    }
    setLoading(false)
  }
  return { data, error, loading, postNota }
}

export default useFetchData
