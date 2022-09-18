import { myBalance } from '../controllers/wallet.controller'
import { Order, OrderProduct } from '../types/order'
import { useAmountFromWallet } from './wallet.remote'
import client from './client'
import { Product } from '../types/product'
import { getProductById } from './products.remote'

export const confirmOrder = async (
  order: Order,
  buyer: number
): Promise<void> => {
  let orderTotal = 0
  const productsToUpdateAmountAvailable: Product[] = []

  order.products.forEach(async (orderProduct: OrderProduct) => {
    const product: Product = await getProductById(orderProduct.product.id)
    if (
      product.amountAvailable &&
      product.amountAvailable < orderProduct.amount
    ) {
      throw new Error(
        `There is not units of ${product.productName} available to complete this order`
      )
    } else {
      productsToUpdateAmountAvailable.push({
        ...product,
        amountAvailable: (product.amountAvailable ?? 0) - orderProduct.amount,
      })
      orderTotal += product.cost
    }
  })

  const buyerWallet = await myBalance(buyer)

  if ((!buyerWallet || orderTotal > buyerWallet?.amount) ?? 0)
    throw new Error('Insuficient funds')

  // create the order items
  const bag = await client.post('/bag', order.products)
  // place order
  await client.post('/orders', {
    buyer,
    products: bag.data.data,
    total: orderTotal,
  })
  // @TODO subtract amountAvailable of each product
  await client.patch('/products', productsToUpdateAmountAvailable)

  await useAmountFromWallet(orderTotal, buyerWallet.id)
}
