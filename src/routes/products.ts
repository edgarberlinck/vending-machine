import express, { Request, Response } from 'express'
// TODO: import controller
import { authenticate, AuthenticatedRequest } from '../middlewares/auth'
const router = express.Router()

router
  .route('/products')
  .get(authenticate, (req: AuthenticatedRequest, res: Response) => {
    res.status(200).json(req.user)
  })

export = router
