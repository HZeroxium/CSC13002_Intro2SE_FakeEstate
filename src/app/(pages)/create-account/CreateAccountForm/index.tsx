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
import { logToFile } from '../../../../../logToFile'

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

// Define the structure of registration form data
type RegisterFormData = {
  email: string
  password: string
  passwordConfirm: string
}

// A class to handle logging to a file
// This class provides static methods for different log levels
class Logger {
  static async logInfo(message: string) {
    try {
      await logToFile(`[INFO] ${message}`)
    } catch (logError) {
      console.error('Logging failed', logError)
    }
  }

  static async logDebug(message: string) {
    try {
      await logToFile(`[DEBUG] ${message}`)
    } catch (logError) {
      console.error('Logging failed', logError)
    }
  }

  static async logError(message: string) {
    try {
      await logToFile(`[ERROR] ${message}`)
    } catch (logError) {
      console.error('Logging failed', logError)
    }
  }

  static async logWarn(message: string) {
    try {
      await logToFile(`[WARN] ${message}`)
    } catch (logError) {
      console.error('Logging failed', logError)
    }
  }
}

// A function to handle account creation by making an API call
// This function returns a promise and handles the response or error
async function createAccount(data: RegisterFormData): Promise<Response> {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
  if (!serverUrl) {
    throw new Error('Server URL not defined')
  }

  // Log the URL and data before making the API call
  await Logger.logDebug(`Creating account at ${serverUrl}/api/users with data: ${JSON.stringify(data)}`)

  const response = await fetch(`${serverUrl}/api/users`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(response.statusText || 'Failed to create account')
  }

  return response
}

// Class-based component for handling form fields
// This class allows each form field to be managed separately
class FormFields {
  register: any
  errors: any
  password: string

  constructor(register: any, errors: any, password: string) {
    this.register = register
    this.errors = errors
    this.password = password
  }

  getEmailField() {
    Logger.logDebug('Rendering email field')
    return (
      <Input
        name="email"
        label="Email Address"
        required
        register={this.register}
        error={this.errors.email}
        type="email"
      />
    )
  }

  getPasswordField() {
    Logger.logDebug('Rendering password field')
    return (
      <Input
        name="password"
        type="password"
        label="Password"
        required
        register={this.register}
        error={this.errors.password}
      />
    )
  }

  getPasswordConfirmField() {
    Logger.logDebug('Rendering password confirmation field')
    return (
      <Input
        name="passwordConfirm"
        type="password"
        label="Confirm Password"
        required
        register={this.register}
        validate={value => value === this.password || 'The passwords do not match'}
        error={this.errors.passwordConfirm}
      />
    )
  }
}

// CreateAccountForm component
// This component handles the account creation process and form submission
const CreateAccountForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString()
  const queryString = allParams ? `?${allParams}` : ''
  const { login } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize form with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>()

  // Watch for password changes to validate password confirmation
  const password = watch('password', '')

  // Create an instance of FormFields class
  const formFields = new FormFields(register, errors, password)

  // Handle form submission
  const onSubmit = useCallback(
    async (data: RegisterFormData) => {
      setLoading(true)
      setError(null) // Clear previous errors

      try {
        // Log the data being submitted
        await Logger.logDebug(`Submitting registration data: ${JSON.stringify(data)}`)

        // Attempt to create user with submitted data
        await createAccount(data)

        // Log successful account creation
        await Logger.logInfo('User account created successfully.')

        // Log the login attempt
        await Logger.logInfo('Attempting to log in user.')

        // Attempt to log in the user
        await login({
          username: data.email,
          password: data.password,
        })

        // Determine redirection path after login
        const redirect = searchParams.get('redirect') || '/'
        await Logger.logDebug(`Redirecting to: ${redirect}`)
        router.push(redirect)
      } catch (error) {
        // Log any errors encountered during account creation or login
        await Logger.logError(`Error during account creation or login: ${error}`)
        setError('An error occurred while creating the account. Please try again.')
      } finally {
        setLoading(false)
      }
    },
    [login, router, searchParams],
  )


  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <h2>Create Account</h2>

      {/* Display any error messages */}
      <Message error={error} className={classes.message} />

      {/* Render email input field */}
      {formFields.getEmailField()}

      {/* Render password input field */}
      {formFields.getPasswordField()}

      {/* Render password confirmation input field */}
      {formFields.getPasswordConfirmField()}

      {/* Submit button */}
      <Button
        type="submit"
        label={loading ? 'Processing' : 'Create Account'}
        disabled={loading}
        appearance="primary"
        className={classes.submit}
      />

      {/* Link to login page */}
      <div>
        {'Already have an account? '}
        <Link href={`/login${queryString}`}>Login</Link>
      </div>
    </form>
  )
}

export default CreateAccountForm

// end_of_file: ./FakeEstate/src/app/(pages)/create-account/CreateAccountForm/index.tsx
