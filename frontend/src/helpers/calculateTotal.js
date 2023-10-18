export const calculateTotal = (transactions) => {
  const total = transactions.reduce((accumulator, transaction) => {
    const amount = transaction.type === 'gasto' ? -transaction.amount : transaction.amount
    return accumulator + amount
  }, 0)
  return total
}
