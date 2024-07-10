'use client'

// #include from "./FakeEstate/node_modules/@types/..."
import React, { Fragment, useCallback, useState } from 'react'

// #include from "./FakeEstate/node_modules/..."
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import { Button } from '../../../../app/_components/Button'
import { Input } from '../../../../app/_components/Input'
import { Message } from '../../../../app/_components/Message'

import classes from './index.module.scss'

type RecoverFormData = {
  email: string
}

export const RecoverPasswordForm: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoverFormData>()

  const onSubmit = useCallback(async (data: RecoverFormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (response.ok) {
      setSuccess(true)
      setError('')
    } else {
      setError(
        'There was a problem while attempting to send you a password reset email. Please try again.',
      )
    }
  }, [])

  return (
    <Fragment>
      {!success && (
        <React.Fragment>
          <h1>Recover Password</h1>
          <div className={classes.formWrapper}>
            <p>
              {`Please enter your email below. You will receive an email message with instructions on
              how to reset your password. To manage your all users, `}
              <Link href="/admin/collections/users">login to the admin dashboard</Link>
              {'.'}
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
              <Message error={error} className={classes.message} />
              <Input
                name="email"
                label="Email Address"
                required
                register={register}
                error={errors.email}
                type="email"
              />
              <Button
                type="submit"
                appearance="primary"
                label="Recover Password"
                className={classes.submit}
              />
            </form>
          </div>
        </React.Fragment>
      )}
      {success && (
        <React.Fragment>
          <h1>Request submitted</h1>
          <p>Check your email for a link that will allow you to securely reset your password.</p>
        </React.Fragment>
      )}
    </Fragment>
  )
}
