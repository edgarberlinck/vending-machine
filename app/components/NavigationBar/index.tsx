import { AuthenticationProvider } from '../../providers/AuthenticationProvider'
import Link from 'next/link'
import { Button } from '../Button'
import { useRouter } from 'next/router'
import styles from './NavigationBar.module.scss'

export const NavigationBar: React.FC = () => {
  const router = useRouter()

  return (
    <AuthenticationProvider>
      <header className={styles.navigation_bar}>
        <Link href="/">
          <label>My Vending Machine</label>
        </Link>
        <div>
          <Button onClick={() => router.replace('/signin')}>Signin</Button>
          <Button onClick={() => router.replace('/signup')}>Signup</Button>
        </div>
      </header>
    </AuthenticationProvider>
  )
}
