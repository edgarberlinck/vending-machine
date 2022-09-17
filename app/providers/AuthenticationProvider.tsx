import React from 'react'

export interface AuthenticationContextType {
  me: () => void
  login: (username: string, password: string) => void
  logout: () => void
  token?: string
}

export const AuthenticationContext =
  React.createContext<AuthenticationContextType>({
    me: () => {},
    login: (username: string, password: string) => {},
    logout: () => {},
  })

export interface AuthenticationProviderType {
  children: typeof React.Children
}

export const AuthenticationProvider: React.FC<AuthenticationProviderType> = ({
  children,
}) => {
  const authenticationContext: AuthenticationContextType = {
    me: () => {},
    login: (username: string, password: string) => {},
    logout: () => {},
  }

  return (
    <AuthenticationContext.Provider value={authenticationContext}>
      {children}
    </AuthenticationContext.Provider>
  )
}
