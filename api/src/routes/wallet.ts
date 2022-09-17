import express, { Response } from 'express'
import { AuthenticatedRequest, authorize } from '../middlewares/auth'
import { Role } from '../enums/Role'
import { Wallet } from '../types/wallet'
import { ErrorMessage } from './types/ErrosMessage'
import { addBalance, myBalance } from '../controllers/wallet.controller'
import { ALLOWED_DEPOSIT_AMOUNT } from '../contants/allowedDeposits'

const router = express.Router()

router
  .route('/balance')
  .get(
    authorize([Role.BUYER]),
    async (
      req: AuthenticatedRequest,
      res: Response<Wallet | ErrorMessage | null>
    ) => {
      try {
        if (!req.user) throw new Error('Session expired')

        const wallet = await myBalance(req.user.id)
        res.status(200).json(wallet)
      } catch (e) {
        res.status(500).json({ message: (e as Error).message })
      }
    }
  )

router
  .route('/balance/add/:amount')
  .get(
    authorize([Role.BUYER]),
    async (req: AuthenticatedRequest, res: Response) => {
      try {
        if (!req.user) throw new Error('Session expired')

        const amount = Number(req.params.amount)

        if (!ALLOWED_DEPOSIT_AMOUNT.includes(amount))
          throw new Error(
            `Invalid amount. You can only deposit ${ALLOWED_DEPOSIT_AMOUNT.join()}`
          )

        await addBalance(amount, req.user.id)

        res.status(200).send()
      } catch (e) {
        res.status(500).json({ message: (e as Error).message })
      }
    }
  )

export default router
