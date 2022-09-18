import { Wallet } from '../types/wallet'
import client from './client'

export const userWallet = async (userId: number): Promise<Wallet | null> => {
  const response = await client.get(`/wallet?filter[owner][_eq]=${userId}`)
  const wallet = response.data.data

  if (wallet.length === 0) return null

  return wallet[0]
}

export const addBalanceTo = async (amount: number, owner: number) => {
  const wallet: Wallet | null = await userWallet(owner)
  let response

  if (wallet) {
    response = await client.patch(`/wallet/${wallet.id}`, {
      amount: wallet.amount + amount,
    })
  } else {
    response = await client.post('/wallet', {
      amount,
      owner,
      status: 'published',
    })
  }

  return response.data.data
}

export const useAmountFromWallet = async (
  amount: number,
  walletId: string
): Promise<void> => {
  try {
    console.log(`Using ${amount} from wallet id ${walletId} `)
    const wallet = await client.get(`/wallet/${walletId}`)

    await client.patch(`/wallet/${walletId}`, {
      amount: wallet.data.data.amount - amount,
    })
    console.log('Balance Updated')
  } catch {
    throw new Error(
      'You dont have a wallet yet. Make sure to make a deposit before buy.'
    )
  }
}
