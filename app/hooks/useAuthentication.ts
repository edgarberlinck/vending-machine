import React from 'react'
import {
  AuthenticationContext,
  AuthenticationContextType,
} from '../providers/AuthenticationProvider'

export const useAuthentication: AuthenticationContextType = () =>
  React.useContext(AuthenticationContext)
