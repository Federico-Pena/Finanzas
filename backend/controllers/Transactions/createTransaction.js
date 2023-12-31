import Transaction from '../../models/transaction.js'

export const createTransaction = async (req, res) => {
  try {
    const { userId } = req.user
    const { description, amount, type, date } = req.body
    const newTransaction = new Transaction({
      user: userId,
      description,
      amount,
      type,
      date: new Date(`${date} 00:00:00`)
    })
    const savedTransaction = await newTransaction.save()
    res.json({ data: savedTransaction })
  } catch (error) {
    console.error('Error al guardar transacción:', error)
    res.status(500).json({ error: 'Error al guardar transacción' })
  }
}
