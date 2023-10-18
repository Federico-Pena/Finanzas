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
      return { ...state, data: payload, totales: calculateTotal(payload) }

    case ACTIONS.UPDATE:
      const updatedData = funciones.update(state.data, payload)
      return { ...state, data: updatedData, totales: calculateTotal(updatedData) }

    case ACTIONS.DELETE:
      const deletedData = funciones.delete(state.data, payload)
      return { ...state, data: deletedData, totales: calculateTotal(deletedData) }

    default:
      return { ...state }
  }
}
