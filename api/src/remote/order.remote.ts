import { myBalance } from '../controllers/wallet.controller'
import { Order } from '../types/order'
import { useAmountFromWallet } from './wallet.remote'
import client from './client'

export const confirmOrder = async (
  order: Order,
  buyer: number
): Promise<Order> => {
  const buyerWallet = await myBalance(buyer)

  const orderTotal = order.products.reduce((acc, value) => {
    acc += value.amount * value.product.cost
    return acc
  }, 0)

  if ((!buyerWallet || orderTotal > buyerWallet?.amount) ?? 0)
    throw new Error('Insuficient funds')

  // @TODO need to verify if I have the product requested amount
  // @TODO subtract amountAvailable of each product

  const response = await client.post<Order>('/order', {
    ...order,
    total: orderTotal,
    buyer,
  })

  await useAmountFromWallet(orderTotal, buyerWallet.id)

  return response.data
}
