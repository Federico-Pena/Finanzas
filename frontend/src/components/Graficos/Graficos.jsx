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
        <p className='desc'>{`Descripción: ${payload[0].payload.descipcion}`}</p>
        <p className='label'>{`Fecha: ${label}`}</p>
        <p className={`desc `}>{`Monto: $ ${payload[0].value}`}</p>
        <p className='desc'>{`Tipo: ${payload[0].payload.tipo}`}</p>
      </div>
    )
  }

  return null
}
export const Graficos = () => {
  const { state } = useContext(TransactionContext)
  const datosGrafico = state.data
    .sort((a, b) => (b.date < a.date ? 1 : -1))
    .map((transaccion) => {
      const fecha = formatFechaParaUser(transaccion.date.split('T')[0])
      const Monto = transaccion.type === 'ingreso' ? transaccion.amount : transaccion.amount * -1
      return {
        descipcion: transaccion.description,
        fecha,
        Monto,
        tipo: transaccion.type
      }
    })

  return (
    <>
      <h4 className={`balance`}>
        <strong>Transacciones: {state.data.length}</strong>
        <strong className={state.total > 0 ? 'positivo' : 'negativo'}>
          {`Balance $ ${state.total} ${state.total > 0 ? '🤑' : '🥲'}`}
        </strong>
      </h4>
      <ResponsiveContainer width='100%' height={350}>
        <LineChart data={datosGrafico} margin={{ top: 20, right: 20 }}>
          <XAxis dataKey='fecha' />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type='step' dataKey='Monto' stroke='#8884d8' />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}
