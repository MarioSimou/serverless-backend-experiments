import { App, BSON } from 'realm-web'
import type { Maybe, Nullable } from '@types'
import { newAuthFactory, NewAuthFactoryResult } from './auth'
export * from './auth'
export * from './graphql'

export const newObjectID = (id: Maybe<string>): BSON.ObjectID =>
  new BSON.ObjectID(id)

const NEXT_PUBLIC_APP_ID = process.env.NEXT_PUBLIC_APP_ID

if (!NEXT_PUBLIC_APP_ID) {
  throw new Error('NEXT_PUBLIC_APP_ID is not defined')
}

let app: Nullable<App>
let auth: Nullable<NewAuthFactoryResult>

type NewRealmResult = {
  app: App
  auth: NewAuthFactoryResult
}

export const newRealm = (): NewRealmResult => {
  if (app && auth) {
    return { app, auth }
  }

  app = new App({ id: NEXT_PUBLIC_APP_ID })
  auth = newAuthFactory(app)
  return {
    app,
    auth,
  }
}
