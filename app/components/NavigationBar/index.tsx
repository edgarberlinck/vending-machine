import {
  AuthenticationContextType,
  AuthenticationProvider,
} from '../../providers/AuthenticationProvider'
import Link from 'next/link'
import { Button } from '../Button'
import { useRouter } from 'next/router'
import styles from './NavigationBar.module.scss'
import { useEffect, useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useCart } from '../../hooks/useCart'
import { CartContextType } from '../../providers/CartProvider'
import { Product } from '../../types/product'

export const NavigationBar: React.FC = () => {
  const router = useRouter()
  const authContext: AuthenticationContextType = useAuthentication()

  useEffect(() => {
    authContext.me()
  }, [authContext])

  return (
    <header className={styles.navigation_bar}>
      <Link href="/">
        <label>My Vending Machine</label>
      </Link>
      {!authContext.currentUser ? (
        <div>
          <Button onClick={() => router.replace('/signin')}>Signin</Button>
          <Button onClick={() => router.replace('/signup')}>Signup</Button>
        </div>
      ) : (
        <div>
          <Cart />
          <span>{`Welcome ${
            authContext.currentUser?.username ?? 'Muffin'
          }`}</span>
          <Button onClick={() => authContext.logout()}>Logout</Button>
        </div>
      )}
    </header>
  )
}

export const Cart: React.FC = () => {
  const cart: CartContextType = useCart()
  const [visible, setVisible] = useState<boolean>(false)

  return (
    <div className={styles.cart} onClick={() => setVisible(!visible)}>
      {cart.products.length > 0 && <span>{cart.products.length}</span>}
      {visible && (
        <div>
          <CartItems />
        </div>
      )}
    </div>
  )
}

export const CartItems: React.FC = () => {
  const cart: CartContextType = useCart()

  return (
    <div onClick={(e: MouseEvent) => e.stopPropagation()}>
      {cart.products.map((product: Product) => (
        <section key={product.productName}>
          <label>{product.productName}</label>
          <div>
            <input type="number" value={1} />
            <Button>Remove</Button>
          </div>
        </section>
      ))}
      <Button>Order</Button>
    </div>
  )
}
