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
      await Log.info('Starting account creation process.')
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
          await Log.error(`Account creation failed with errors: ${JSON.stringify(errors)}`)
          throw new Error(errors[0].message)
        }
        setUser(data?.loginUser?.user)
        setStatus('loggedIn')
        await Log.info(`Account created successfully for user: ${args.username}`)
      } else {
        const errorMessage = `Failed to create account. Status: ${res.status}`
        await Log.error(errorMessage)
        throw new Error(errorMessage)
      }
    } catch (e) {
      await Log.error(`Error during account creation: ${e.message}`)
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
          await Log.error(`Login failed with errors: ${JSON.stringify(errors)}`)
          throw new Error(errors[0].message)
        }
        setUser(user)
        setStatus('loggedIn')
        await Log.info(`User logged in successfully: ${args.username}`)
        return user
      }

      const errorMessage = `Login failed for user: ${args.username}, Status: ${res.status}`
      await Log.error(errorMessage)
      throw new Error(errorMessage)
    } catch (e) {
      await Log.error(`Error during login: ${e.message}`)
      throw new Error('An error occurred while attempting to log in.')
    }
  }, [])

  // Function to log out the current user
  const logout = useCallback<Logout>(async () => {
    try {
      await Log.info('Attempting to log out user.')
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
        await Log.info('User logged out successfully.')
      } else {
        const errorMessage = `Logout failed, Status: ${res.status}`
        await Log.error(errorMessage)
        throw new Error(errorMessage)
      }
    } catch (e) {
      await Log.error(`Error during logout: ${e.message}`)
      throw new Error('An error occurred while attempting to log out.')
    }
  }, [])

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
          await Log.info(`Fetched current user: ${meUser?.email || 'No user logged in'}`)
        } else {
          const errorMessage = `Failed to fetch user data, Status: ${res.status}`
          await Log.error(errorMessage)
          throw new Error(errorMessage)
        }
      } catch (e) {
        await Log.error(`Error fetching user data: ${e.message}`)
        setUser(null)
        throw new Error('An error occurred while fetching your account.')
      }
    }

    fetchMe()
  }, [])

  // Function to handle forgotten passwords
  const forgotPassword = useCallback<ForgotPassword>(async args => {
    try {
      await Log.info(`Initiating forgot password for user: ${args.username}`)
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
          await Log.error(`Forgot password failed with errors: ${JSON.stringify(errors)}`)
          throw new Error(errors[0].message)
        }
        setUser(data?.loginUser?.user)
        await Log.info(`Forgot password process completed for user: ${args.username}`)
      } else {
        const errorMessage = `Forgot password failed, Status: ${res.status}`
        await Log.error(errorMessage)
        throw new Error(errorMessage)
      }
    } catch (e) {
      await Log.error(`Error during forgot password: ${e.message}`)
      throw new Error('An error occurred while attempting to reset the password.')
    }
  }, [])

  // Function to handle password reset
  const resetPassword = useCallback<ResetPassword>(async args => {
    try {
      await Log.info('Starting password reset process.')
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
          await Log.error(`Password reset failed with errors: ${JSON.stringify(errors)}`)
          throw new Error(errors[0].message)
        }
        setUser(data?.loginUser?.user)
        setStatus(data?.loginUser?.user ? 'loggedIn' : undefined)
        await Log.info('Password reset completed successfully.')
      } else {
        const errorMessage = `Password reset failed, Status: ${res.status}`
        await Log.error(errorMessage)
        throw new Error(errorMessage)
      }
    } catch (e) {
      await Log.error(`Error during password reset: ${e.message}`)
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

// Define the `UseAuth` type before using it
type UseAuth<T = User> = () => AuthContext;

// Custom hook to access the AuthContext
export const useAuth: UseAuth = () => useContext(Context);


// end_of_file: ./FakeEstate/src/app/_providers/Auth/index.tsx
