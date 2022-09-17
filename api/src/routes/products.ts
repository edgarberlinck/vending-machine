import express, { Response } from 'express'
import { AuthenticatedRequest, authorize } from '../middlewares/auth'
import { Role } from '../enums/Role'
import { Product } from '../types/product'
import {
  listProducts,
  productById,
  saveProduct,
  deleteProduct,
} from '../controllers/products.controller'
import { ErrorMessage } from './types/ErrosMessage'
import { ProductRegistration } from './types/ProductRegistration'

const router = express.Router()

router
  .route('/products')
  .get(
    authorize([Role.BUYER, Role.SELLER]),
    async (
      req: AuthenticatedRequest,
      res: Response<Product[] | ErrorMessage>
    ) => {
      try {
        const products: Product[] = await listProducts()

        res.status(200).json(products)
      } catch (e) {
        res.status(500).json({ message: (e as Error).message })
      }
    }
  )

router
  .route('/product/:id')
  .get(
    authorize([Role.BUYER, Role.SELLER]),
    async (
      req: AuthenticatedRequest,
      res: Response<Product | ErrorMessage>
    ) => {
      try {
        const product: Product = await productById(Number(req.params.id))
        res.status(200).json(product)
      } catch (e) {
        res.status(500).json({ message: (e as Error).message })
      }
    }
  )

router
  .route('/product')
  .post(
    authorize([Role.SELLER]),
    async (
      req: AuthenticatedRequest<ProductRegistration>,
      res: Response<Product | ErrorMessage>
    ) => {
      try {
        if (!req.user) throw new Error('Session expired.')

        const product: Product = await saveProduct({
          productName: req.body.productName,
          cost: req.body.cost,
          amountAvailable: req.body.amountAvailable ?? 0,
          seller: req.user.id,
        })
        res.status(200).json(product)
      } catch (e) {
        res.status(500).json({ message: (e as Error).message })
      }
    }
  )

router
  .route('/product/:id')
  .patch(
    authorize([Role.SELLER]),
    async (
      req: AuthenticatedRequest<ProductRegistration>,
      res: Response<Product | ErrorMessage>
    ) => {
      try {
        if (!req.user) throw new Error('Session expired.')

        const product: Product = await saveProduct({
          id: Number(req.params.id),
          productName: req.body.productName,
          cost: req.body.cost,
          amountAvailable: req.body.amountAvailable ?? 0,
          seller: req.user.id,
        })
        res.status(200).json(product)
      } catch (e) {
        res.status(500).json({ message: (e as Error).message })
      }
    }
  )

router
  .route('/product/:id')
  .delete(
    authorize([Role.SELLER]),
    async (req: AuthenticatedRequest, res: Response) => {
      try {
        if (!req.user) throw new Error('Session expired.')

        await deleteProduct(Number(req.params.id), req.user.id)
        res.status(200).send()
      } catch (e) {
        res.status(500).json({ message: (e as Error).message })
      }
    }
  )

export default router
