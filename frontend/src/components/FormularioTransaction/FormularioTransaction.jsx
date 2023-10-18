import { useContext } from 'react'
import useForm from '../../Hooks/Formulario/useForm'
import './FormularioTransaction.css'
import { ACTIONS } from '../../../constantes'
import { TransactionContext } from '../../Context/TransactionContext'
import { MensajeContext } from '../../Context/MensajeContext'
import useFetchData from '../../Hooks/Fetch/useFetchData'
const initialValues = {
  descripciónTransaction: '',
  montoTransaction: '',
  selectTransaction: '',
  dateTransaction: ''
}
const validationRules = {
  descripciónTransaction: {
    minLength: 2,
    maxLength: 50
  },
  montoTransaction: {
    minLength: 1
  },
  selectTransaction: { required: true, message: 'El tipo es requerido' },
  dateTransaction: { required: true, message: 'La fecha es requerida' }
}
export const FormularioTransaction = ({ cerrarForm }) => {
  const { values, errors, handleChange, validateForm } = useForm(initialValues, validationRules)
  const { setMensaje } = useContext(MensajeContext)
  const { postNota } = useFetchData()
  const { dispatch } = useContext(TransactionContext)
  const submitTransaction = async (e) => {
    e.preventDefault()
    const isValid = validateForm()
    if (isValid && values !== initialValues) {
      const { descripciónTransaction, montoTransaction, selectTransaction, dateTransaction } =
        values
      const transaccion = {
        description: descripciónTransaction,
        amount: montoTransaction,
        type: selectTransaction,
        date: dateTransaction
      }
      const response = await postNota(transaccion)
      const { data, error } = response
      if (data) {
        dispatch({ type: ACTIONS.UPDATE, payload: data })
        cerrarForm()
      }
      if (error) {
        setMensaje(error)
      } else {
        setMensaje('Transacción ingresada con éxito')
      }
    } else {
      return
    }
  }
  return (
    <form className='transactionForm' onSubmit={submitTransaction}>
      <header className='headerTransactionForm'>
        <h2>Nueva transacción</h2>
      </header>
      <main className='mainTransactionForm'>
        <label htmlFor='descripción'>Descripción</label>
        <input
          value={values.descripciónTransaction}
          id='descripción'
          className='inputTransactionForm'
          type='text'
          placeholder='Descripción'
          name='descripciónTransaction'
          onChange={handleChange}
        />
        {errors.descripciónTransaction && <samp>{errors.descripciónTransaction}</samp>}
        <label htmlFor='monto'>Monto</label>
        <input
          value={values.montoTransaction}
          id='monto'
          min={0}
          step={0.1}
          className='inputTransactionForm'
          type='number'
          placeholder='50'
          name='montoTransaction'
          onChange={handleChange}
        />
        {errors.montoTransaction && <samp>{errors.montoTransaction}</samp>}

        <label htmlFor=''>Tipo</label>
        <select
          value={values.selectTransaction}
          className='selectTransactionForm'
          name='selectTransaction'
          onChange={handleChange}>
          <option value=''></option>
          <option value='ingreso'>Ingreso</option>
          <option value='gasto'>Gasto</option>
        </select>
        {errors.selectTransaction && <samp>{errors.selectTransaction}</samp>}
        <label htmlFor='fecha'>Fecha</label>
        <input
          value={values.dateTransaction}
          id='fecha'
          className='inputDateTransactionForm'
          type='date'
          name='dateTransaction'
          onChange={(e) => {
            handleChange(e)
          }}
        />
        {errors.dateTransaction && <samp>{errors.dateTransaction}</samp>}
      </main>
      <footer className='footerTransactionForm'>
        <button title='Enviar transacción' className='btnTransactionForm'>
          Enviar
        </button>
      </footer>
    </form>
  )
}
