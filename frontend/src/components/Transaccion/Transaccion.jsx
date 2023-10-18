import { useContext } from 'react'
import { Flecha } from '../Icons/Flecha'
import { UserContext } from '../../Context/UserContext'
import { ACTIONS, baseUrl } from '../../../constantes'
import { TransactionContext } from '../../Context/TransactionContext'
import './Transaccion.css'
import { formatFechaParaUser } from '../../helpers/formatFechaParaUser'
export const Transaccion = ({ transaction, actualizarEliminada }) => {
  const { user } = useContext(UserContext)
  const { dispatch } = useContext(TransactionContext)

  const handleDelete = async () => {
    const options = {
      method: 'DELETE',
      headers: {
        authorization: user.token
      }
    }
    const res = await fetch(`${baseUrl}/api/transactions/${transaction._id}`, options)
    const datos = await res.json()
    const { data } = datos
    dispatch({ type: ACTIONS.DELETE, payload: data })
    actualizarEliminada(datos)
  }
  return (
    <li className='elementTransactions'>
      <header className='headerTransactions'>{transaction.description}</header>
      <main className={`mainTransaction ${transaction.type === 'gasto' ? 'gasto' : 'ingreso'}`}>
        <span>$ {transaction.amount}</span>
        <span>
          <Flecha />
        </span>
        <button onClick={handleDelete}>Eliminar</button>
      </main>
      <footer className='footerTransaction'>
        <span>Ingresada {formatFechaParaUser(transaction.date.split('T')[0])}</span>
      </footer>
    </li>
  )
}
