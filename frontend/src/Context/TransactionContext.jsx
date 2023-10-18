import { createContext, useEffect, useReducer } from 'react'
import useFetchData from '../Hooks/Fetch/useFetchData'
import { ACTIONS } from '../../constantes'
import { transactionReducer } from './transactionReducer'

const initialValues = {
  data: [],
  totales: {}
}
export const TransactionContext = createContext()

export const TransactionProvider = ({ children }) => {
  const { data } = useFetchData()
  const [state, dispatch] = useReducer(transactionReducer, initialValues)

  useEffect(() => {
    dispatch({ type: ACTIONS.ADD, payload: data })
  }, [data])
  return (
    <TransactionContext.Provider value={{ state, dispatch }}>
      {children}
    </TransactionContext.Provider>
  )
}
