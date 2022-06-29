import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@features/hooks'

export type NavbarProps = {}
const Navbar: React.FC<NavbarProps> = ({}) => {
  const { currentUserCredentials, signOut } = useAuth()
  const router = useRouter()

  const onClickSignOut = React.useCallback(async () => {
    await signOut()
    router.push('/sign-in')
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        background: 'lightgray',
        padding: '0.5rem 1rem',
      }}
    >
      <div style={{ display: 'flex', columnGap: '0.75rem' }}>
        <Link href='/todos'>Home</Link>
        <Link href='/todos/new'>New</Link>
        {currentUserCredentials && (
          <a href='#' onClick={onClickSignOut}>
            Sign Out
          </a>
        )}
        {!currentUserCredentials && <Link href='/sign-in'>Sign In</Link>}
      </div>
    </div>
  )
}

export type MainLayoutProps = {
  children: React.ReactNode
}
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { currentUserCredentials } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (!currentUserCredentials) {
      router.push('/sign-in')
    }
  }, [currentUserCredentials])

  return (
    <main>
      <Navbar />
      <div style={{ padding: '0.5rem 0.25rem' }}>{children}</div>
    </main>
  )
}

export default MainLayout
