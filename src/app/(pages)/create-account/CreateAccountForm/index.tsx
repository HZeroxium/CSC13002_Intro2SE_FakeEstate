'use client'
// start_of_file: ./FakeEstate/src/app/(pages)/create-account/CreateAccountForm/index.tsx

// #include from "./FakeEstate/node_modules/react"
// Import React and related hooks for component and state management
import React, { useCallback, useState } from 'react'

// #include from "./FakeEstate/node_modules/react-hook-form"
// Import form handling utilities from react-hook-form to manage form state and validation
import { useForm } from 'react-hook-form'

// #include from "./FakeEstate/node_modules/next/link"
// Import Link component from Next.js for client-side navigation between pages
import Link from 'next/link'

// #include from "./FakeEstate/node_modules/next/navigation"
// Import useRouter and useSearchParams for handling navigation and query parameters
import { useRouter, useSearchParams } from 'next/navigation'

// #root method for logging
// Import custom logging utility for logging to a file
import { Log } from '../../../../../logToFile'

// #include from "./FakeEstate/src/app/_components/Button"
// Import Button component for reusable button UI
import { Button } from '../../../../app/_components/Button'

// #include from "./FakeEstate/src/app/_components/Input"
// Import Input component for reusable input field UI
import { Input } from '../../../../app/_components/Input'

// #include from "./FakeEstate/src/app/_components/Message"
// Import Message component to display error or success messages
import { Message } from '../../../../app/_components/Message'

// #include from "./FakeEstate/src/app/_providers/Auth"
// Import custom authentication hook for managing user authentication
import { useAuth } from '../../../../app/_providers/Auth'

// #include from local "./FakeEstate/src/app/(pages)/create-account/CreateAccountForm/..."
// Import styles for the CreateAccountForm component
import classes from './index.module.scss'

// Define a TypeScript type for the form data
type RegisterFormData = {
  email: string
  password: string
  passwordConfirm: string
}

// Function to handle the account creation process
async function createAccount(data: RegisterFormData): Promise<Response> {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  // Ensure server URL is defined
  if (!serverUrl) {
    throw new Error('Server URL is not defined.')
  }

  // Log the account creation attempt
  await Log.debug(`Sending account creation request to ${serverUrl}/api/users with data: ${JSON.stringify(data)}`)

  try {
    // Send POST request to create user account
    const response = await fetch(`${serverUrl}/api/users`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Handle non-OK responses by logging and throwing an error
    if (!response.ok) {
      const errorMessage = await response.text()
      await Log.error(`Account creation failed. Status: ${response.status}, Error: ${errorMessage}`)
      throw new Error(errorMessage || 'Failed to create account')
    }

    // Log successful account creation
    await Log.info('Account successfully created.')
    return response
  } catch (error) {
    // Log any errors during the account creation process
    await Log.error(`Error in createAccount function: ${error}`)
    throw error
  }
}

// React functional component for the Create Account form
const CreateAccountForm: React.FC = () => {
  // Component initialization log
  console.log('----------------------------------------')
  console.log('Initializing CreateAccountForm component')

  // Hook to manage query parameters
  const searchParams = useSearchParams()
  // Construct query string for redirect URL
  const queryString = searchParams.toString() ? `?${searchParams.toString()}` : ''
  // Hooks for authentication and navigation
  const { login } = useAuth()
  const router = useRouter()
  // State hooks for managing form submission state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Setup form handlers and validators
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>()
  const password = watch('password', '')

  // Handle form submission
  const onSubmit = useCallback(
    async (data: RegisterFormData) => {
      setLoading(true)
      setError(null)

      try {
        // Process form submission
        await Log.info('Form submission started.')
        await createAccount(data)
        await Log.info('User account created successfully.')
        await Log.info(`Logging in user with username: ${data.email}`)

        // Attempt to log in the new user
        await login({
          username: data.email,
          password: data.password,
        })

        // Redirect user upon successful login
        const redirect = searchParams.get('redirect') || '/'
        await Log.info(`Redirecting user to: ${redirect}`)
        router.push(redirect)
      } catch (error) {
        // Handle errors during account creation or login
        await Log.error(`Error during account creation or login: ${error}`)
        setError('An error occurred while creating the account. Please try again.')
      } finally {
        setLoading(false)
        await Log.info('Form submission process ended.')
      }
    },
    [login, router, searchParams],
  )

  // Render the form with input fields and buttons
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

      {/* Password input field */}
      <Input
        name="password"
        type="password"
        label="Password"
        required
        register={register}
        error={errors.password}
      />

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

      {/* Submit button */}
      <Button
        type="submit"
        label={loading ? 'Processing' : 'Create Account'}
        disabled={loading}
        appearance="primary"
        className={classes.submit}
      />

      {/* Link to login page for existing users */}
      <div>
        {'Already have an account? '}
        <Link href={`/login${queryString}`}>Login</Link>
      </div>
    </form>
  )
}

export default CreateAccountForm

// end_of_file: ./FakeEstate/src/app/(pages)/create-account/CreateAccountForm/index.tsx