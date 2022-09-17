import express, { Response } from 'express'
import { RequestBody, UserRegistrationBody } from '../routes/types'
import { register, signin } from '../controllers/user.controller'
import { AuthenticatedRequest, authorize } from '../middlewares/auth'
import { Role } from '../enums/Role'

const router = express.Router()

router
  .route('/register')
  .post(async (req: RequestBody<UserRegistrationBody>, res: Response) => {
    try {
      const response = await register(req.body)
      res.status(200).json(response)
    } catch (e) {
      res.status(500).json({ message: (e as Error).message })
    }
  })

router
  .route('/login')
  .post(
    async (
      req: RequestBody<{ username: string; password: string }>,
      res: Response
    ) => {
      try {
        const response = await signin(req.body.username, req.body.password)
        res.status(200).json(response)
      } catch (e) {
        res.status(500).json({ message: (e as Error).message })
      }
    }
  )

router
  .route('/me')
  .post(
    authorize([Role.BUYER, Role.SELLER]),
    (req: AuthenticatedRequest, res: Response) => {
      res.status(200).json(req.user)
    }
  )

export = router
