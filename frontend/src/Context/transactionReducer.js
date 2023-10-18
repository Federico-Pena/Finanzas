import { ACTIONS } from '../../constantes'
import { calculateTotal } from '../helpers/calculateTotal'

const funciones = {
  delete: (data, payload) =>
    data.filter((d) => d._id !== payload._id).sort((a, b) => (b.date > a.date ? 1 : -1)),
  update: (data, payload) =>
    data
      .filter((d) => d._id !== payload._id)
      .concat(payload)
      .sort((a, b) => (b.date > a.date ? 1 : -1))
}
export const transactionReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case ACTIONS.ADD:
      return { ...state, data: payload, total: calculateTotal(payload) }
    case ACTIONS.UPDATE:
      return {
        ...state,
        data: funciones.update(state.data, payload),
        total: calculateTotal(funciones.update(state.data, payload))
      }
    case ACTIONS.DELETE:
      return {
        ...state,
        data: funciones.delete(state.data, payload),
        total: calculateTotal(funciones.delete(state.data, payload))
      }
    default:
      return { ...state }
  }
}
