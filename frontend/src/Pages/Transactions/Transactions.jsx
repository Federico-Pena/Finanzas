import { useState, useContext } from 'react'
import './Transactions.css'
import { FormularioTransaction } from '../../components/FormularioTransaction/FormularioTransaction'
import useFetchData from '../../Hooks/Fetch/useFetchData'
import Spinner from '../../components/Spinner/Spinner'
import { MensajeContext } from '../../Context/MensajeContext'
import { Toast } from '../../components/Toast/Toast'
import { Transaccion } from '../../components/Transaccion/Transaccion'
import { TransactionContext } from '../../Context/TransactionContext'
import RangoFechas from '../../components/RangoFechas/RangoFechas'
import { Graficos } from '../../components/Graficos/Graficos'
import { Totales } from '../../components/Totales/Totales'

const Dashboard = () => {
  const [form, setForm] = useState(false)
  const [graficos, setGraficos] = useState(false)
  const { loading } = useFetchData(`/api/transactions`)
  const { mensaje, setMensaje } = useContext(MensajeContext)
  const { state } = useContext(TransactionContext)
  const actualizarEliminada = (res) => {
    const { error } = res
    if (error) {
      setMensaje(error)
    } else {
      setMensaje('Transacción eliminada con éxito')
    }
  }
  return (
    <main className='mainDashboard'>
      {mensaje && <Toast mensaje={mensaje} setMensaje={setMensaje} />}
      <h2 className='titleDashboard'>Transacciones</h2>
      <RangoFechas />
      <Totales />
      {loading ? (
        <Spinner />
      ) : (
        <article className='transactionArticle'>
          <div className='btnsDashboard'>
            <button className='btnAbrirForm' onClick={() => setForm(!form)}>
              {form ? 'Cerrar Formulario' : 'Agregar Nueva Transacción'}
            </button>
            <button className='btnCambiarVista' onClick={() => setGraficos(!graficos)}>
              {graficos ? 'Ver Detalles' : 'Ver Gráfico'}
            </button>
          </div>
          {form && <FormularioTransaction cerrarForm={() => setForm(false)} />}

          <section>
            {graficos ? (
              <Graficos />
            ) : state.data.length > 0 ? (
              <ul className='listTransactions'>
                <li className='elementTransactions top'>
                  <span className='headerTransactions'>Descripción</span>
                  <span className='mainTransaction'>Detalle</span>
                </li>
                {state.data.map((transaction) => (
                  <Transaccion
                    actualizarEliminada={actualizarEliminada}
                    key={transaction._id}
                    transaction={transaction}
                  />
                ))}
              </ul>
            ) : (
              <h2>No hay transacciones en este rango de fechas</h2>
            )}
          </section>
        </article>
      )}
    </main>
  )
}

export default Dashboard
