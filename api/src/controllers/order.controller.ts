import { confirmOrder } from '../remote/order.remote'
import { Order } from '../types/order'

export const placeOrder = async (
  order: Order,
  buyer: number
): Promise<Order> => {
  return confirmOrder(order, buyer)
}
