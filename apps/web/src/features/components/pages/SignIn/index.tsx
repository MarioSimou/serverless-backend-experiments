import React from 'react'
import { useFormValues, useAuth } from '@features/hooks'
import { useRouter } from 'next/router'
import { Field } from '@features/components/shared'
import Link from 'next/link'
import type { Page } from '@types'

const SignIn: Page = () => {
  const { formValues, handleOnChange, handleOnBlur } = useFormValues({
    email: '',
    password: '',
  })
  const { signIn } = useAuth()
  const router = useRouter()

  const handleOnSubmit = async () => {
    const { email, password } = formValues
    const isTouched = email.touched && password.touched

    if (!isTouched) {
      return window.alert('Please fill out all fields')
    }

    if (email.error || password.error) {
      return window.alert(email.error || password.error)
    }

    const [signInError] = await signIn(email.value, password.value)
    if (signInError) {
      return window.alert(signInError.message)
    }
    return router.push('/todos')
  }

  return (
    <main style={{ padding: '0.5rem 0.25rem' }}>
      <h1>Sign In</h1>
      <form>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '0.5rem',
            marginBottom: '1rem',
            maxWidth: 'max-content',
          }}
        >
          <Field id='email' label='Email:'>
            <input
              id='email'
              type='email'
              value={formValues.email.value}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              placeholder='Your email...'
            />
          </Field>
          <Field id='password' label='Password:'>
            <input
              id='password'
              type='password'
              value={formValues.password.value}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              placeholder='Your password...'
            />
          </Field>
        </div>
        <button type='button' onClick={handleOnSubmit}>
          Sign In
        </button>
        <div style={{ marginTop: '0.75rem' }}>
          <Link href='/sign-up'>Do not have an account</Link>
        </div>
      </form>
    </main>
  )
}

SignIn.currentPageName = 'sign-in'
export default SignIn
