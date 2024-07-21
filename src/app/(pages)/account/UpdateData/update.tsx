'use client'

// Import necessary modules from React and other libraries
import React, { Fragment, useCallback, useEffect, useState } from 'react'

// Import form handling and navigation utilities
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

// Import custom components
import { Button } from '../../../../app/_components/Button'
import { Input } from '../../../../app/_components/Input'
import { Message } from '../../../../app/_components/Message'
import { useAuth } from '../../../../app/_providers/Auth'

// Import CSS module for styling
import classes from './index.module.scss'

// Define the structure of the form data
type AccountFormData = {
  email: string
  name: string
  phoneNumber: string
  describeText: string
}

// Define the AccountForm component
const AccountForm: React.FC = () => {
  // State variables to handle errors and success messages
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  // Get user data and setUser function from authentication context
  const { user, setUser } = useAuth()

  // Destructure methods and states from useForm hook
  const {
    register,  // For registering form inputs
    handleSubmit,  // For handling form submission
    formState: { errors, isLoading },  // Form state including errors and loading state
    reset,  // For resetting the form
  } = useForm<AccountFormData>()

  // Get router instance for navigation
  const router = useRouter()

  // Define the form submission handler
  const onSubmit = useCallback(
    async (data: AccountFormData) => {
      if (user) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`, {
          // Include credentials with fetch
          credentials: 'include',
          method: 'PATCH',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const json = await response.json()
          // Update user context with new data
          setUser(json.doc)
          setSuccess('Successfully updated account.')
          setError('')
          // Reset form with updated values
          reset({
            email: json.doc.email,
            name: json.doc.name,
            phoneNumber: json.doc.phoneNumber,
            describeText: json.doc.describeText,
          })
        } else {
          setError('There was a problem updating your account.')
        }
      }
    },
    [user, setUser, reset],
  )

  // useEffect to handle side effects on component mount and when dependencies change
  useEffect(() => {
    if (user === null) {
      // Redirect to login page if user is not logged in
      router.push(
        `/login?error=${encodeURIComponent(
          'You must be logged in to view this page.',
        )}&redirect=${encodeURIComponent('/account')}`,
      )
    }

    // Reset form with user data when user is loaded
    if (user) {
      reset({
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
      })
    }
  }, [user, router, reset])

  return (
    // Form element with submit handler
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Message error={error} success={success} className={classes.message} />
      <Fragment>
        <p>
          {'Change your account details below.'}
        </p>
        <Input
          name="email"
          label="Email Address"
          required
          register={register}
          error={errors.email}
          type="email"
        />
        <Input name="name" label="Name" register={register} error={errors.name} />
        <Input name="phoneNumber" label="Phone Number" register={register} error={errors.phoneNumber} />
      </Fragment>
      <Button
        type="submit"
        label={isLoading ? 'Processing' : 'Update Account'}
        disabled={isLoading}
        appearance="primary"
        className={classes.submit}
      />
    </form>
  )
}

// Export the component as default
export default AccountForm
