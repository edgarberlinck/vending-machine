import React, { useEffect, useState } from 'react'
import client from '../client'
export interface AuthenticationContextType {
  currentUser: { username: string; role: string; id: number } | null
  apiUrl: string
  me: () => void
  logout: () => void
  token?: string
}

export const AuthenticationContext =
  React.createContext<AuthenticationContextType>({
    apiUrl: '',
    me: () => {},
    logout: () => {},
  })

export interface AuthenticationProviderType {
  apiUrl: string
  children: typeof React.Children
}

export const AuthenticationProvider: React.FC<AuthenticationProviderType> = ({
  children,
  apiUrl,
}) => {
  const [token, setToken] = useState<string>()
  const [user, setUser] = useState<{
    username: string
    role: string
    id: number
  } | null>()
  useEffect(() => {
    setToken(localStorage.token)
  }, [])

  const authenticationContext: AuthenticationContextType = {
    apiUrl,
    token,
    me: async () => {
      if (token) {
        client.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const me = await client.post(`${apiUrl}/me`)

        if (me.status === 401) {
          localStorage.clear()
          window.location.replace('/login')
        } else {
          if (user?.username !== me.data.username) setUser(me.data)
        }
      }
    },
    logout: () => {
      localStorage.clear()
      window.location.replace('/')
    },
  }

  return (
    <AuthenticationContext.Provider
      value={{ ...authenticationContext, currentUser: user }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}
