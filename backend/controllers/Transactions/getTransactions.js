import Transaction from '../../models/transaction.js'
export const getTransactions = async (req, res) => {
  try {
    const { userId } = req.user
    const { startDate, endDate } = req.query
    const dateFilter = { user: userId }
    let transactions
    if (startDate && endDate) {
      dateFilter.date = { $gte: new Date(startDate), $lte: new Date(endDate) }
      transactions = await Transaction.find(dateFilter).sort({ date: -1 })
    } else {
      const today = new Date()
      const startOfWeekDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - today.getDay()
      )
      const endOfWeekDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + (6 - today.getDay())
      )
      dateFilter.date = { $gte: startOfWeekDate, $lte: endOfWeekDate }
      transactions = await Transaction.find(dateFilter).sort({ date: -1 })
    }

    res.json({ data: transactions })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las transacciones' })
  }
}
