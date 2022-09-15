import http from 'http'
import express, { Express } from 'express'
import morgan from 'morgan'
import products from './routes/products'
import authentication from './routes/authentication'
import { config } from 'dotenv'

config()

const router: Express = express()

router.use(morgan('dev'))
router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'origin, X-Requested-With,Content-Type,Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST')
    return res.status(200).json({})
  }
  next()
})

router.use(products)
router.use(authentication)

router.use((req, res, next) => {
  const error = new Error('not found')
  return res.status(404).json({
    message: error.message,
  })
})

const httpServer = http.createServer(router)
const PORT = process.env.PORT ?? 8067
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`))
