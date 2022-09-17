import { Product } from './product'

export type OrderProduct = {
  product: Product
  amount: number
}

export type Order = {
  id?: string
  products: OrderProduct[]
  total?: number
  buyer: number
}
