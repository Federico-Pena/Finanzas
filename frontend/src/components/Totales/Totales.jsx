import { useContext } from 'react'
import { TransactionContext } from '../../Context/TransactionContext'
import './Totales.css'
export const Totales = () => {
  const { state } = useContext(TransactionContext)
  const { data, totales } = state
  return (
    <article className={`totales`}>
      <section className='sectionTotales'>
        <strong className='negativo'>Gastos: {totales.countGastos}</strong>
        <strong className='negativo'>Total Gastos: $ {totales.gastos}</strong>
      </section>
      <section className='sectionTotales'>
        <strong className='positivo'>Ingresos: {totales.countIngresos}</strong>
        <strong className='positivo'>Total Ingresos: $ {totales.ingresos}</strong>
      </section>
      <section className='sectionTotales'>
        <strong>Transacciones: {data.length}</strong>
        <strong className={totales.total > 0 ? 'positivo' : 'negativo'}>
          Balance $ {totales.total} {totales.total > 0 ? '🤑' : '🥲'}
        </strong>
      </section>
    </article>
  )
}
