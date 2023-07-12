import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import client from '../../client'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useCart } from '../../hooks/useCart'
import { AuthenticationContextType } from '../../providers/AuthenticationProvider'
import { CartContextType } from '../../providers/CartProvider'
import { Product } from '../../types/product'
import { Button } from '../Button'

import styles from './ProductList.module.scss'

export const ProductList: React.FC<{ apiUrl: string }> = ({ apiUrl }) => {
  const [productList, setProdutList] = useState<Product[]>()
  const authContext: AuthenticationContextType = useAuthentication()

  const fetchProducts = useCallback(async () => {
    if (!authContext.token) return null
    client.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${authContext.token}`
    const products = await client.get(`${apiUrl}/products`)
    return products
  }, [apiUrl, authContext.token])

  useEffect(() => {
    fetchProducts()
      .then((response) => response?.data ?? [])
      .then(setProdutList)
  }, [fetchProducts])

  useEffect(() => console.log(productList), [productList])

  return (
    <main className={styles.wrapper}>
      <h1>Products</h1>
      <div className={styles.productList}>
        {productList && productList.length > 0 ? (
          productList.map((product: Product) => (
            <ProductCard key={product.productName} product={product} />
          ))
        ) : (
          <h2>No products</h2>
        )}
      </div>
    </main>
  )
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const cart: CartContextType = useCart()

  return (
    <div className={styles.productCard}>
      {/* <Image
        src="https://via.placeholder.com/250"
        width={250}
        height={250}
        alt={product.productName}
      /> */}
      <img src="https://via.placeholder.com/250" alt={product.productName} />
      <label>{product.productName}</label>
      <small>{`${product.amountAvailable} units available`}</small>
      <Button onClick={() => cart.addToCart(product)}>Add to Cart</Button>
    </div>
  )
}
