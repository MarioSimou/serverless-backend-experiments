import React from 'react'
import type { Nullable, UserCredentials } from '@types'
import { newRealm, NewAuthFactoryResult } from '@features/realm'

type AuthContextProps = {
  currentUserCredentials: Nullable<UserCredentials>
  resetCurrentUserCredentials: () => void
  signIn: NewAuthFactoryResult['signIn']
  signUp: NewAuthFactoryResult['signUp']
  signOut: NewAuthFactoryResult['signOut']
}
const AuthContext = React.createContext({} as AuthContextProps)

export const useAuth = (): AuthContextProps => {
  const ctx = React.useContext(AuthContext)
  if (!ctx) {
    throw new Error("error: Please wrap your component within 'AuthProvider'")
  }

  return ctx
}

type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUserCredentials, setCurrentUserCredentials] =
    React.useState<Nullable<UserCredentials>>(null)
  const { auth } = newRealm()

  const resetCurrentUserCredentials = React.useCallback(() => {
    setCurrentUserCredentials(() => null)
  }, [setCurrentUserCredentials])

  const signIn: NewAuthFactoryResult['signIn'] = React.useCallback(
    async (emal: string, password: string) => {
      const [signInError, user] = await auth.signIn(emal, password)
      if (signInError) {
        return [signInError]
      }

      setCurrentUserCredentials(() => user)
      return [undefined, user]
    },
    [setCurrentUserCredentials]
  )

  const signUp: NewAuthFactoryResult['signIn'] = React.useCallback(
    async (emal: string, password: string) => {
      const [signInError, user] = await auth.signUp(emal, password)
      if (signInError) {
        return [signInError]
      }

      setCurrentUserCredentials(() => user)
      return [undefined, user]
    },
    [setCurrentUserCredentials]
  )

  const signOut: NewAuthFactoryResult['signOut'] =
    React.useCallback(async () => {
      const [signOutError] = await auth.signOut()
      if (signOutError) {
        return [signOutError]
      }
      resetCurrentUserCredentials()
      return [undefined]
    }, [setCurrentUserCredentials, resetCurrentUserCredentials])

  return (
    <AuthContext.Provider
      value={{
        currentUserCredentials,
        resetCurrentUserCredentials,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
