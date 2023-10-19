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

function getDaysBetweenDates(startDate, endDate) {
  const days = []
  let currentDate = startDate
  while (currentDate <= endDate) {
    days.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return days
}
export const Graficos = () => {
  const { state } = useContext(TransactionContext)
  const { data } = state
  const primerFecha = `${data[data.length - 1].date.toString().split('T')[0]} 00:00:00`
  const ultimaFecha = `${data[0].date.toString().split('T')[0]} 00:00:00`
  const primerDia = new Date(primerFecha)
  const ultimoDia = new Date(ultimaFecha)
  const diasGrafico = getDaysBetweenDates(primerDia, ultimoDia)

  const balanceData = diasGrafico.map((date) => {
    const formattedDate = formatFechaParaUser(date.toISOString().split('T')[0])
    const transactionsUntilDate = state.data.filter(
      (trans) => new Date(`${trans.date.toString().split('T')[0]} 00:00:00`) <= date
    )
    const totalBalance = transactionsUntilDate.reduce((acc, trans) => {
      return acc + (trans.type === 'ingreso' ? trans.amount : -trans.amount)
    }, 0)
    return { fecha: formattedDate, Monto: totalBalance }
  })

  return state.data.length > 0 ? (
    <ResponsiveContainer width='100%' height={350}>
      <LineChart data={balanceData} margin={{ top: 20, right: 20 }}>
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
