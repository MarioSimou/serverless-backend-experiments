import React from 'react'
import type { AppProps as NextAppProps } from 'next/app'
import { AuthProvider } from '@features/providers'
import { MainLayout } from '@features/components/shared'
import '@features/components/shared/MainLayout/global.css'
import type { Page, Nullable } from '@types'
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { newRealm } from '@features/realm'

const NEXT_PUBLIC_GRAPHQL_API = process.env.NEXT_PUBLIC_GRAPHQL_API

if (!NEXT_PUBLIC_GRAPHQL_API) {
  throw new Error(
    "Please provide a valid configuration for 'NEXT_PUBLIC_GRAPHQL_API'"
  )
}

const getCurrentUserAccessToken = async (): Promise<Nullable<string>> => {
  const { app } = newRealm()

  if (!app.currentUser) {
    return null
  }

  await app.currentUser.refreshCustomData()
  return app.currentUser.accessToken
}

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
    fetch: async (uri, options) => {
      const { headers, ...rest } = options ?? {}
      const currentUserAccessToken = await getCurrentUserAccessToken()
      return fetch(uri, {
        ...rest,
        headers: {
          ...headers,
          Authorization: `Bearer ${currentUserAccessToken}`,
        },
      })
    },
  }),
  cache: new InMemoryCache(),
})

type AppProps = NextAppProps & {
  Component: Page
}

const App: React.FC<AppProps> = ({ pageProps, Component }) => {
  const isAuthPage =
    Component.currentPageName === 'sign-in' ||
    Component.currentPageName === 'sign-up'

  return (
    <AuthProvider>
      <ApolloProvider client={apolloClient}>
        {isAuthPage && <Component {...pageProps} />}
        {!isAuthPage && (
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        )}
      </ApolloProvider>
    </AuthProvider>
  )
}

export default App
