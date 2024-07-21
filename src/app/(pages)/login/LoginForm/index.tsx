'use client'
// file: ./FakeEstate/src/app/(pages)/login/LoginForm/index.tsx

// #include from "./FakeEstate/node_modules/@types/..."
import React, { useCallback, useRef } from 'react'

// #include from "./FakeEstate/node_modules/..."
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '../../../../app/_components/Button'
import { Input } from '../../../../app/_components/Input'
import { Message } from '../../../../app/_components/Message'
import { useAuth } from '../../../../app/_providers/Auth'

import classes from './index.module.scss'

type LoginFormData = {
  username: string
  password: string
  email: string
}

const LoginForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const redirect = useRef(searchParams.get('redirect'))
  const { login } = useAuth()
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<LoginFormData>()

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        await login(data)
        if (redirect?.current) router.push(redirect.current as string)
        else router.push('/account')
        window.location.href = '/'
      } catch (_) {
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Message error={error} className={classes.message} />
      <Input
        name="username"
        label="Username"
        required
        register={register}
        error={errors.username}
        type="username"
      />
      <Input
        name="password"
        type="password"
        label="Password"
        required
        register={register}
        error={errors.password}
      />
      <Button
        type="submit"
        appearance="primary"
        label={isLoading ? 'Processing' : 'Login'}
        disabled={isLoading}
        className={classes.submit}
      />
      <div className={classes.links}>
        <Link href={`/recover-password${allParams}`} className={classes.link}>
          Forgot password
        </Link>
        <br />
        <Link href={`/create-account${allParams}`} className={classes.link}>
          No account? Register here
        </Link>
      </div>
    </form>
  )
}

export default LoginForm
