import { AuthenticationProvider } from '../../providers/AuthenticationProvider'
import Link from 'next/link'
import { Button } from '../Button'

import styles from './NavigationBar.module.scss'

export const NavigationBar: React.FC = () => {
  return (
    <AuthenticationProvider>
      <header className={styles.navigation_bar}>
        <Link href="/">
          <label>My Vending Machine</label>
        </Link>
        <div>
          <Button>Signin</Button>
          <Button>Signup</Button>
        </div>
      </header>
    </AuthenticationProvider>
  )
}
