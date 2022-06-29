import React from 'react'
import { useFormValues, useAuth } from '@features/hooks'
import { useRouter } from 'next/router'
import { Field } from '@features/components/shared'
import Link from 'next/link'
import type { Page } from '@types'

const SignUp: Page = () => {
  const { formValues, handleOnChange, handleOnBlur } = useFormValues({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const { signUp } = useAuth()
  const router = useRouter()

  const handleOnSubmit = async () => {
    const { email, password, confirmPassword } = formValues
    const isTouched =
      email.touched && password.touched && confirmPassword.touched

    if (!isTouched) {
      return window.alert('Please fill out all fields')
    }

    if (email.error || password.error || confirmPassword.error) {
      return window.alert(
        email.error || password.error || confirmPassword.error
      )
    }

    if (password.value !== confirmPassword.value) {
      return window.alert('Passwords do not match')
    }

    const [signUpError] = await signUp(email.value, password.value)
    if (signUpError) {
      return window.alert(signUpError.message)
    }
    return router.push('/todos')
  }

  return (
    <main style={{ padding: '0.5rem 0.25rem' }}>
      <h1>Sign Up</h1>
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
          <Field id='confirmPassword' label='Password:'>
            <input
              id='confirmPassword'
              type='password'
              value={formValues.confirmPassword.value}
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
          <Link href='/sign-in'>Already have an account?</Link>
        </div>
      </form>
    </main>
  )
}

SignUp.currentPageName = 'sign-up'

export default SignUp
