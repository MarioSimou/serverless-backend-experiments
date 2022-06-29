export * from 'lib/types'
export type { UserCredentials } from '@features/realm/auth'

import { NextPage } from 'next'

export type TodoItem = {
  _id: string
  title: string
  description: string
  completed: boolean
}

export type CurrentPageName = 'home' | 'new' | 'edit' | 'sign-in' | 'sign-up'

type Data = Record<string, unknown>

export type Page<Props extends Data = Data> = NextPage<Props> & {
  currentPageName?: CurrentPageName
}
