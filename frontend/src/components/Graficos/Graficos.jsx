import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { formatFechaParaUser } from '../../helpers/formatFechaParaUser'
import { TransactionContext } from '../../Context/TransactionContext'
import { useContext } from 'react'
import './Graficos.css'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`custom-tooltip ${payload[0].value > 0 ? 'ingreso' : 'gasto'}`}>
        <p className='label'>{`Fecha: ${label}`}</p>
        <p className={`desc `}>{`Balance: $ ${payload[0].value}`}</p>
      </div>
    )
  }

  return null
}
export const Graficos = () => {
  const { state } = useContext(TransactionContext)
  const diasAgrupados = state.data.reduce((result, transaccion) => {
    const fecha = formatFechaParaUser(transaccion.date.split('T')[0])
    if (result[fecha]) {
      result[fecha].Monto +=
        transaccion.type === 'ingreso' ? transaccion.amount : transaccion.amount * -1
    } else {
      result[fecha] = {
        fecha,
        Monto: transaccion.type === 'ingreso' ? transaccion.amount : transaccion.amount * -1
      }
    }

    return result
  }, {})

  const datosGrafico = Object.values(diasAgrupados).reverse()

  return state.data.length > 0 ? (
    <ResponsiveContainer width='100%' height={350}>
      <LineChart data={datosGrafico} margin={{ top: 20, right: 20 }}>
        <XAxis dataKey='fecha' />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type='bump' dataKey='Monto' stroke='#8884d8' />
      </LineChart>
    </ResponsiveContainer>
  ) : (
    <h2>No hay transacciones en este rango de fechas</h2>
  )
}
