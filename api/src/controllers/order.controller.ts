import { confirmOrder } from '../remote/order.remote'
import { Order } from '../types/order'

export const placeOrder = async (
  order: Order,
  buyer: number
): Promise<void> => {
  await confirmOrder(order, buyer)
}
