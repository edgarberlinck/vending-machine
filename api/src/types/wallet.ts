export type Wallet = {
  id: string
  status: 'published' | 'draft' | 'archived'
  owner: number
  amount: number
}
