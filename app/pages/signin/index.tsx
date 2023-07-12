import { GetServerSidePropsContext, NextPage } from 'next'
import { ChangeEvent, useState } from 'react'
import { Button } from '../../components/Button'
import { useRouter } from 'next/router'
import client from '../../client'

import styles from '../../styles/SignIn.module.scss'

export function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      apiUrl: process.env.API_URL,
    },
  }
}

const SignIn: NextPage<{ apiUrl: string }> = ({ apiUrl }) => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const router = useRouter()

  const handleLogin = async () => {
    const credentials = await client.post(`${apiUrl}/login`, {
      username,
      password,
    })

    localStorage.setItem('token', credentials.data.token)
    router.replace('/')
  }

  return (
    <main className={styles.wrapper}>
      <h1>Sign in</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setUsername(event.target.value)
        }
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setPassword(event.target.value)
        }
      />
      <Button onClick={() => handleLogin()}>Login</Button>
    </main>
  )
}

export default SignIn
