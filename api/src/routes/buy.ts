import express, { Response } from 'express'
import { placeOrder } from '../controllers/order.controller'
import { Role } from '../enums/Role'
import { AuthenticatedRequest, authorize } from '../middlewares/auth'
import { Order } from '../types/order'
import { ErrorMessage } from './types/ErrosMessage'

const router = express.Router()

router
  .route('/order/place')
  .post(
    authorize([Role.BUYER]),
    async (
      req: AuthenticatedRequest<Order>,
      res: Response<Order | ErrorMessage>
    ) => {
      try {
        const { user, body } = req
        if (!user) throw new Error('Session expired')
        if (!body) throw new Error('Your cart is empty')

        const order = await placeOrder(body, user.id)
        res.status(200).json(order)
      } catch (e) {
        res.status(500).json({ message: (e as Error).message })
      }
    }
  )

export default router
