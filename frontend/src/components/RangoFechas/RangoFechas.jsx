import { useContext, useState } from 'react'
import './RangoFechas.css'
import { formatFechaParaUser } from '../../helpers/formatFechaParaUser'
import { UserContext } from '../../Context/UserContext'
import { ACTIONS, baseUrl } from '../../../constantes'
import { TransactionContext } from '../../Context/TransactionContext'

const RangoFechas = () => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [visible, setVisible] = useState(false)
  const { user } = useContext(UserContext)
  const { dispatch } = useContext(TransactionContext)

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
      const data = await response.json()
      dispatch({ type: ACTIONS.ADD, payload: data.data })
    } catch (error) {
      console.error('Error al obtener las transacciones', error)
    }
  }

  return (
    <section className='date-range-picker'>
      <button
        onClick={() => {
          setVisible(!visible)
          setEndDate('')
          setStartDate('')
        }}>
        {visible ? 'Cerrar' : 'Filtrar'}
      </button>
      <div className={`divFechas ${visible ? 'open' : ''}`}>
        <label className='label-fecha'>
          Selecciona la fecha {startDate ? 'de fin' : 'de inicio'}
          <input
            className='inputFecha'
            type='date'
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </label>
        <p>
          Rango seleccionado: {!startDate && !endDate && 'Esta Semana'}{' '}
          <strong>{startDate && formatFechaParaUser(startDate)}</strong> {startDate && 'al'}{' '}
          <strong>{endDate && formatFechaParaUser(endDate)}</strong>
        </p>
      </div>
      {startDate && endDate && (
        <button
          onClick={() => getDataDate(startDate, endDate)}
          type='button'
          title='Buscar transacciones'>
          Buscar
        </button>
      )}
    </section>
  )
}

export default RangoFechas
