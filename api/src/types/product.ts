export type Product = {
  id: number
  amountAvailable?: number
  cost: number
  productName: string
  seller: number
  status?: 'published' | 'draft' | 'archived'
}
