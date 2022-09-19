import React from 'react'
import { CartContext, CartContextType } from '../providers/CartProvider'

export const useCart: CartContextType = () => React.useContext(CartContext)
