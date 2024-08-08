'use client'
// start_of_file: ./FakeEstate/src/app/(pages)/create-account/CreateAccountForm/index.tsx

import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '../../../../app/_components/Button'
import { Input } from '../../../../app/_components/Input'
import { Message } from '../../../../app/_components/Message'
import { useAuth } from '../../../../app/_providers/Auth'
import { Log } from '../../../../../logToFile'
import classes from './index.module.scss'

type RegisterFormData = {
  email: string
  password: string
  passwordConfirm: string
}

async function createAccount(data: RegisterFormData): Promise<Response> {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  if (!serverUrl) {
    throw new Error('Server URL is not defined.')
  }

  await Log.debug(`Sending account creation request to ${serverUrl}/api/users with data: ${JSON.stringify(data)}`)

  try {
    const response = await fetch(`${serverUrl}/api/users`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      await Log.error(`Account creation failed. Status: ${response.status}, Error: ${errorMessage}`)
      throw new Error(errorMessage || 'Failed to create account')
    }

    await Log.info('Account successfully created.')
    return response
  } catch (error) {
    await Log.error(`Error in createAccount function: ${error}`)
    throw error
  }
}

const CreateAccountForm: React.FC = () => {
  // Separator: Start of component initialization
  console.log('----------------------------------------')
  console.log('Initializing CreateAccountForm component')

  const searchParams = useSearchParams()
  const queryString = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const { login } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>()
  const password = watch('password', '')

  const onSubmit = useCallback(
    async (data: RegisterFormData) => {
      setLoading(true)
      setError(null)

      try {
        await Log.info('Form submission started.')
        await createAccount(data)
        await Log.info('User account created successfully.')
        await Log.info(`Logging in user with username: ${data.email}`)

        await login({
          username: data.email,
          password: data.password,
        })

        const redirect = searchParams.get('redirect') || '/'
        await Log.info(`Redirecting user to: ${redirect}`)
        router.push(redirect)
      } catch (error) {
        await Log.error(`Error during account creation or login: ${error}`)
        setError('An error occurred while creating the account. Please try again.')
      } finally {
        setLoading(false)
        await Log.info('Form submission process ended.')
      }
    },
    [login, router, searchParams],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <h2>Create Account</h2>

      {/* Display any error messages */}
      <Message error={error} className={classes.message} />

      {/* Email input field */}
      <Input
        name="email"
        label="Email Address"
        required
        register={register}
        error={errors.email}
        type="email"
      />
      {/* Note: Rendering the email input field for capturing user's email. */}

      {/* Password input field */}
      <Input
        name="password"
        type="password"
        label="Password"
        required
        register={register}
        error={errors.password}
      />
      {/* Note: Rendering the password input field for capturing user's password. */}

      {/* Password confirmation input field */}
      <Input
        name="passwordConfirm"
        type="password"
        label="Confirm Password"
        required
        register={register}
        validate={value => value === password || 'Passwords do not match'}
        error={errors.passwordConfirm}
      />
      {/* Note: Rendering the password confirmation input field for user to confirm their password. */}

      {/* Submit button */}
      <Button
        type="submit"
        label={loading ? 'Processing' : 'Create Account'}
        disabled={loading}
        appearance="primary"
        className={classes.submit}
      />
      {/* Note: Render submit button. Disabled while processing. */}

      {/* Link to login page */}
      <div>
        {'Already have an account? '}
        <Link href={`/login${queryString}`}>Login</Link>
      </div>
      {/* Note: Render link to login page for existing users. */}
    </form>
  )
}

export default CreateAccountForm

// end_of_file: ./FakeEstate/src/app/(pages)/create-account/CreateAccountForm/index.tsx
