import express, { Request, Response } from 'express'
// TODO: import controller
import { authorize, AuthenticatedRequest, Role } from '../middlewares/auth'
const router = express.Router()

router
  .route('/products')
  .get(authorize([Role.BUYER]), (req: AuthenticatedRequest, res: Response) => {
    res.status(200).json(req.user)
  })

export = router
