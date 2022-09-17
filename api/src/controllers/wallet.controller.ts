import { addBalanceTo, userWallet } from '../remote/wallet.remote'
import { Wallet } from '../types/wallet'

export const myBalance = async (userId: number): Promise<Wallet | null> => {
  return userWallet(userId)
}

export const addBalance = async (
  amount: number,
  owner: number
): Promise<void> => {
  return addBalanceTo(amount, owner)
}
