import { Product } from '../types/product'
import client from './client'

export const findAllProducts = async (): Promise<Product[]> => {
  const response = await client.get('/products')

  return response.data.data
}

export const getProductById = async (productId: number): Promise<Product> => {
  const response = await client.get(`/products/${productId}`)

  return response.data.data
}

export const insertOrUpdateProduct = async (
  product: Partial<Product>
): Promise<Product> => {
  let response
  const productId = product.id
  delete product.id

  if (productId) {
    const isProductEditable = await isUserOwnsThisProduct(
      productId,
      product.seller as number
    )

    if (!isProductEditable) {
      throw new Error('You are not allowed to edit this product')
    }

    response = await client.patch(`/products/${productId}`, {
      ...product,
      status: 'published',
    })
  } else {
    response = await client.post('/products', {
      ...product,
      status: 'published',
    })
  }
  return response.data.data
}

export const deleteProduct = async (
  productId: number,
  userId: number
): Promise<void> => {
  const isProductOwnedByUser = await isUserOwnsThisProduct(productId, userId)

  if (!isProductOwnedByUser)
    throw new Error('You are not allowed to remove this product')

  await client.delete(`/products/${productId}`)
}

async function isUserOwnsThisProduct(
  productId: number,
  sellerId: number
): Promise<boolean> {
  const product: Product = await getProductById(productId)

  return Number(product.seller) === sellerId
}
