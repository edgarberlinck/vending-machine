import type { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { NavigationBar } from '../components/NavigationBar'
import { ProductList } from '../components/ProductList'
import { AuthenticationProvider } from '../providers/AuthenticationProvider'
import { CartProvider } from '../providers/CartProvider'
import styles from '../styles/Home.module.scss'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {
      apiUrl: process.env.API_URL,
    },
  }
}

const Home: NextPage<{ apiUrl: string }> = ({ apiUrl }) => {
  return (
    <AuthenticationProvider apiUrl={apiUrl}>
      <CartProvider>
        <div>
          <NavigationBar />
          <ProductList apiUrl={apiUrl} />
        </div>
      </CartProvider>
    </AuthenticationProvider>
  )
}

export default Home
