import React, { Children, useState } from 'react'
import { Product } from '../types/product'

export interface CartContextType {
  products: Product[]
  addToCart?: (product: Product) => void
}

export const CartContext = React.createContext<CartContextType>({
  products: [],
})

export const CartProvider: React.FC<{ children: typeof Children }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([])

  const handlAddToCart = (product: Product) => {
    setProducts([...products, product])
  }
  return (
    <CartContext.Provider value={{ products, addToCart: handlAddToCart }}>
      {children}
    </CartContext.Provider>
  )
}
