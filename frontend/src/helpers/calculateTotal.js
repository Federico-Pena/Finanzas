export const calculateTotal = (transactions) => {
  const totales = transactions.reduce(
    (accumulator, transaction) => {
      const amount = transaction.type === 'gasto' ? -transaction.amount : transaction.amount

      accumulator.total += amount

      if (transaction.type === 'ingreso') {
        accumulator.ingresos += amount
        accumulator.countIngresos += 1
      } else {
        accumulator.gastos += amount
        accumulator.countGastos += 1
      }

      return accumulator
    },
    { total: 0, ingresos: 0, gastos: 0, countIngresos: 0, countGastos: 0 }
  )

  return totales
}
