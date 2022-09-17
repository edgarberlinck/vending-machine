import type { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { NavigationBar } from '../components/NavigationBar'
import { AuthenticationProvider } from '../providers/AuthenticationProvider'
import styles from '../styles/Home.module.scss'

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { API_URL } = process.env
  return { props: {} }
}

const Home: NextPage = () => {
  return (
    <AuthenticationProvider>
      <div>
        <NavigationBar />
      </div>
    </AuthenticationProvider>
  )
}

export default Home
