// start_of_file: ./FakeEstate/src/app/_providers/Auth/index.tsx
'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { User } from '../../../payload/payload-types'
import { Log } from '../../../../logToFile'  // Import the logging utility

// Define types for authentication functions
type ResetPassword = (args: {
  password: string
  passwordConfirm: string
  token: string
}) => Promise<void>

type ForgotPassword = (args: { username: string }) => Promise<void>

type Create = (args: { username: string; password: string; passwordConfirm: string }) => Promise<void>

type Login = (args: { username: string; password: string }) => Promise<User>

type Logout = () => Promise<void>

// Define the structure of the AuthContext
type AuthContext = {
  user?: User | null
  setUser: (user: User | null) => void
  logout: Logout
  login: Login
  create: Create
  resetPassword: ResetPassword
  forgotPassword: ForgotPassword
  status: undefined | 'loggedOut' | 'loggedIn'
}

// Create the AuthContext with default values
const Context = createContext({} as AuthContext)

// AuthProvider component: provides authentication context to its children
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>() // State to hold the current user
  const [status, setStatus] = useState<undefined | 'loggedOut' | 'loggedIn'>() // State to track authentication status

  // Function to create a new account
  const create = useCallback<Create>(async args => {
    try {
      await Log.info(`Starting account creation process for email: ${args.username}.`)
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: args.username,
          password: args.password,
          passwordConfirm: args.passwordConfirm,
        }),
      })

      if (res.ok) {
        const { data, errors } = await res.json()
        if (errors) {
          await Log.error(`Account creation failed for email: ${args.username}. Errors: ${JSON.stringify(errors)}`)
          throw new Error(errors[0].message)
        }
        setUser(data?.loginUser?.user)
        setStatus('loggedIn')
        await Log.info(`Account created successfully for email: ${args.username}, User ID: ${data?.loginUser?.user?.id}.`)
      } else {
        const errorMessage = `Failed to create account for email: ${args.username}. Status: ${res.status}, Response: ${await res.text()}`
        await Log.error(errorMessage)
        throw new Error(errorMessage)
      }
    } catch (e) {
      await Log.error(`Error during account creation for email: ${args.username}. Message: ${e.message}`)
      throw new Error('An error occurred while attempting to create an account.')
    }
  }, [])

  // Function to log in an existing user
  const login = useCallback<Login>(async args => {
    try {
      await Log.info(`Attempting to log in user: ${args.username}`)
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: args.username,
          password: args.password,
        }),
      })

      if (res.ok) {
        const { user, errors } = await res.json()
        if (errors) {
          await Log.error(`Login failed for email: ${args.username}. Errors: ${JSON.stringify(errors)}`)
          throw new Error(errors[0].message)
        }
        setUser(user)
        setStatus('loggedIn')
        await Log.info(`User logged in successfully: ${args.username}, User ID: ${user?.id}.`)
        return user
      }

      const errorMessage = `Login failed for email: ${args.username}. Status: ${res.status}, Response: ${await res.text()}`
      await Log.error(errorMessage)
      throw new Error(errorMessage)
    } catch (e) {
      await Log.error(`Error during login for email: ${args.username}. Message: ${e.message}`)
      throw new Error('An error occurred while attempting to log in.')
    }
  }, [])

  // Function to log out the current user
  const logout = useCallback<Logout>(async () => {
    try {
      if (!user) {
        await Log.warn('Logout attempt with no user logged in.')
        return
      }

      await Log.info(`Attempting to log out user: ${user.email}, User ID: ${user.id}.`)
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.ok) {
        setUser(null)
        setStatus('loggedOut')
        await Log.info(`User logged out successfully: ${user.email}, User ID: ${user.id}.`)
      } else {
        const errorMessage = `Logout failed for user: ${user.email}. Status: ${res.status}, Response: ${await res.text()}`
        await Log.error(errorMessage)
        throw new Error(errorMessage)
      }
    } catch (e) {
      await Log.error(`Error during logout for user: ${user?.email}. Message: ${e.message}`)
      throw new Error('An error occurred while attempting to log out.')
    }
  }, [user])

  // useEffect to fetch the current user (if logged in) when the component mounts
  useEffect(() => {
    const fetchMe = async () => {
      try {
        await Log.info('Fetching current user data.')
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (res.ok) {
          const { user: meUser } = await res.json()
          setUser(meUser || null)
          setStatus(meUser ? 'loggedIn' : undefined)
          await Log.info(`Fetched current user data: ${meUser?.email || 'No user logged in'}, User ID: ${meUser?.id || 'N/A'}.`)
        } else {
          const errorMessage = `Failed to fetch current user data. Status: ${res.status}, Response: ${await res.text()}`
          await Log.error(errorMessage)
          throw new Error(errorMessage)
        }
      } catch (e) {
        await Log.error(`Error fetching current user data. Message: ${e.message}`)
        setUser(null)
        throw new Error('An error occurred while fetching your account.')
      }
    }

    fetchMe()
  }, [])

  // Function to handle forgotten passwords
  const forgotPassword = useCallback<ForgotPassword>(async args => {
    try {
      await Log.info(`Initiating forgot password process for email: ${args.username}`)
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: args.username,
        }),
      })

      if (res.ok) {
        const { data, errors } = await res.json()
        if (errors) {
          await Log.error(`Forgot password failed for email: ${args.username}. Errors: ${JSON.stringify(errors)}`)
          throw new Error(errors[0].message)
        }
        setUser(data?.loginUser?.user)
        await Log.info(`Forgot password process completed for email: ${args.username}, User ID: ${data?.loginUser?.user?.id}.`)
      } else {
        const errorMessage = `Forgot password failed for email: ${args.username}. Status: ${res.status}, Response: ${await res.text()}`
        await Log.error(errorMessage)
        throw new Error(errorMessage)
      }
    } catch (e) {
      await Log.error(`Error during forgot password process for email: ${args.username}. Message: ${e.message}`)
      throw new Error('An error occurred while attempting to reset the password.')
    }
  }, [])

  // Function to handle password reset
  const resetPassword = useCallback<ResetPassword>(async args => {
    try {
      await Log.info(`Starting password reset process for token: ${args.token}`)
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/reset-password`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: args.password,
          passwordConfirm: args.passwordConfirm,
          token: args.token,
        }),
      })

      if (res.ok) {
        const { data, errors } = await res.json()
        if (errors) {
          await Log.error(`Password reset failed for token: ${args.token}. Errors: ${JSON.stringify(errors)}`)
          throw new Error(errors[0].message)
        }
        setUser(data?.loginUser?.user)
        setStatus(data?.loginUser?.user ? 'loggedIn' : undefined)
        await Log.info(`Password reset completed successfully for token: ${args.token}, User ID: ${data?.loginUser?.user?.id}.`)
      } else {
        const errorMessage = `Password reset failed for token: ${args.token}. Status: ${res.status}, Response: ${await res.text()}`
        await Log.error(errorMessage)
        throw new Error(errorMessage)
      }
    } catch (e) {
      await Log.error(`Error during password reset for token: ${args.token}. Message: ${e.message}`)
      throw new Error('An error occurred while attempting to reset the password.')
    }
  }, [])

  // Provide the AuthContext to child components
  return (
    <Context.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        create,
        resetPassword,
        forgotPassword,
        status,
      }}
    >
      {children}
    </Context.Provider>
  )
}

type UseAuth<T = User> = () => AuthContext;

// Custom hook to access the AuthContext
export const useAuth: UseAuth = () => useContext(Context)

// end_of_file: ./FakeEstate/src/app/_providers/Auth/index.tsx
