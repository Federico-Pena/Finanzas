import { useContext, useState } from 'react'
import './RangoFechas.css'
import { formatFechaParaUser } from '../../helpers/formatFechaParaUser'
import { UserContext } from '../../Context/UserContext'
import { ACTIONS, baseUrl } from '../../../constantes'
import { TransactionContext } from '../../Context/TransactionContext'
import { semanaActual } from '../../helpers/semanaActual'
import { MensajeContext } from '../../Context/MensajeContext'

const RangoFechas = () => {
  const { dispatch } = useContext(TransactionContext)
  const [startDate, setStartDate] = useState(semanaActual().inicio)
  const [endDate, setEndDate] = useState(semanaActual().fin)
  const [visible, setVisible] = useState(true)
  const { user } = useContext(UserContext)
  const { setMensaje } = useContext(MensajeContext)
  const handleDateChange = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date)
      setEndDate(null)
    } else if (date >= startDate) {
      setEndDate(date)
    } else {
      setStartDate(date)
      setEndDate(null)
    }
  }
  const getDataDate = async (startDate, endDate) => {
    const options = {
      headers: {
        authorization: user.token
      }
    }
    try {
      const response = await fetch(
        `${baseUrl}/api/transactions?startDate=${startDate} 00:00:00&endDate=${endDate} 00:00:00`,
        options
      )
      const { data, error } = await response.json()
      if (data) {
        dispatch({ type: ACTIONS.ADD, payload: data })
      }
      if (error) {
        setMensaje(error)
      }
    } catch (error) {
      setMensaje('Error al obtener las transacciones')
    }
  }
  return (
    <section className='date-range-picker'>
      <button
        type='button'
        title={visible ? 'Cerrar' : 'Filtrar'}
        onClick={() => {
          setVisible(!visible)
        }}>
        {visible ? 'Cerrar' : 'Filtrar'}
      </button>
      <div className={`divFechas ${visible ? 'open' : ''}`}>
        <label className='label-fecha'>
          Selecciona la fecha {startDate && !endDate ? 'de fin' : 'de inicio'}
          <input
            className='inputFecha'
            type='date'
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </label>
        <p>
          <strong>{startDate && formatFechaParaUser(startDate)}</strong> {startDate && 'al'}{' '}
          <strong>{endDate && formatFechaParaUser(endDate)}</strong>
        </p>
        {startDate && endDate && (
          <button
            onClick={() => {
              setVisible(false)
              getDataDate(startDate, endDate)
            }}
            type='button'
            title='Buscar transacciones'>
            Buscar
          </button>
        )}
      </div>
    </section>
  )
}

export default RangoFechas
