'use client'
// start_of_file: ./FakeEstate/src/app/(pages)/login/LoginForm/index.tsx

// Import React utilities and hooks
import React, { useCallback, useRef, useState } from 'react'
// React form handling with validation
import { useForm } from 'react-hook-form'
// Next.js components for client-side navigation
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

// Reusable UI components for consistency across the application
import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { Message } from '../../../_components/Message'
// Custom hook for handling authentication
import { useAuth } from '../../../_providers/Auth'

// Styling specific to this component
import classes from './index.module.scss'

// Type definition for form data to ensure type safety
type FormData = {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  // Extract search parameters to handle redirects post-login
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  // Store intended redirect path for post-login
  const redirect = useRef(searchParams.get('redirect'))
  // Authentication context to handle user login
  const { login } = useAuth()
  // Router for programmatic navigation
  const router = useRouter()
  // State for handling error messages displayed to the user
  const [error, setError] = useState<string | null>(null)

  // useForm hook for form state management and validation
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormData>()

  // Function to handle form submission
  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        // Attempt to log in with provided credentials
        await login(data)
        // Redirect to the specified path or to the account page
        router.push(redirect.current || '/account')
      } catch (error) {
        // Set error state to display to the user if login fails
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router, redirect]
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      {/* Display error messages if any */}
      <Message error={error} className={classes.message} />
      {/* Input field for username */}
      <Input
        name="username"
        label="Username"
        required
        register={register}
        error={errors.username}
        type="text"
      />
      {/* Input field for password */}
      <Input
        name="password"
        type="password"
        label="Password"
        required
        register={register}
        error={errors.password}
      />
      {/* Login button which is disabled during form processing */}
      <Button
        type="submit"
        appearance="primary"
        label={isLoading ? 'Processing' : 'Login'}
        disabled={isLoading}
        className={classes.submit}
      />
      {/* Links for password recovery and account registration */}
      <div className={classes.links}>
        <Link href={`/recover-password${allParams}`} className={classes.link}>Forgot password?</Link>
        <br />
        <Link href={`/create-account${allParams}`} className={classes.link}>No account? Register here.</Link>
      </div>
    </form>
  )
}

export default LoginForm

// end_of_file: ./FakeEstate/src/app/(pages)/login/LoginForm/index.tsx
