import { App, User, Credentials } from 'realm-web'
import type { Result } from '@types'

const ErrInternalServerError = new Error('Internal Server Error')

export type UserCredentials = {
  user: User
}

const signOut = (app: App) => async (): Promise<[Error | undefined]> => {
  try {
    await app.currentUser?.logOut()

    return [undefined]
  } catch (e) {
    if (e instanceof Error) {
      return [e]
    }
    return [ErrInternalServerError]
  }
}

const signUp =
  (app: App) =>
  async (email: string, password: string): Promise<Result<UserCredentials>> => {
    try {
      await app.emailPasswordAuth.registerUser(email, password)

      const [signInError, result] = await signIn(app)(email, password)
      if (signInError) {
        return [signInError]
      }

      return [undefined, result]
    } catch (e) {
      if (e instanceof Error) {
        return [e]
      }
      return [ErrInternalServerError]
    }
  }

const signIn =
  (app: App) =>
  async (email: string, password: string): Promise<Result<UserCredentials>> => {
    try {
      const credentials = Credentials.emailPassword(email, password)
      const user = await app.logIn(credentials)

      return [undefined, { user }]
    } catch (e) {
      if (e instanceof Error) {
        return [e]
      }
      return [ErrInternalServerError]
    }
  }

export type NewAuthFactoryResult = {
  signUp: ReturnType<typeof signUp>
  signIn: ReturnType<typeof signIn>
  signOut: ReturnType<typeof signOut>
}

export const newAuthFactory = (app: App): NewAuthFactoryResult => {
  return {
    signUp: signUp(app),
    signIn: signIn(app),
    signOut: signOut(app),
  }
}
