import './backend/database.js'
import express from 'express'
import cors from 'cors'
import { resolve } from 'path'
import userRoutes from './backend/routes/user.routes.js'
import authMiddleware from './backend/Middleware/authMiddleware.js'
import { setCache } from './backend/Middleware/cache.js'
import transactionRoutes from './backend/routes/transactions.routes.js'
const PORT = process.env.PORT || 4000

const app = express()
const optionsCors = {
  origin: ['https://tus-finanzas.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'PUT', 'POST', 'DELETE']
}
app.disable('x-powered-by')
app.use(express.json())
app.use(cors(optionsCors))
app.use(setCache)
app.use(express.static(resolve('./frontend', 'dist')))
app.use(userRoutes)
app.use(authMiddleware)
app.use(transactionRoutes)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`)
})
