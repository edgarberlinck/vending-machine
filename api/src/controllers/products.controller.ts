import {
  findAllProducts,
  getProductById,
  insertOrUpdateProduct,
  deleteProduct as removeProduct,
} from '../remote/products.remote'
import { Product } from '../types/product'

export const listProducts = async (): Promise<Product[]> => {
  return findAllProducts()
}

export const productById = async (productId: number): Promise<Product> => {
  return getProductById(productId)
}

export const saveProduct = async ({
  productName,
  cost,
  amountAvailable,
  seller,
  id,
}: {
  productName: string
  cost: number
  amountAvailable: number
  seller: number
  id?: number
}): Promise<Product> => {
  return insertOrUpdateProduct({
    productName,
    cost,
    amountAvailable,
    seller,
    id,
  })
}

export const deleteProduct = async (
  productId: number,
  userId: number
): Promise<void> => {
  await removeProduct(productId, userId)
}
