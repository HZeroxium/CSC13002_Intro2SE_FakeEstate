'use client'
// start_of_file: ./FakeEstate/src/app/(pages)/create-account/CreateAccountForm/index.tsx

// #include from "./FakeEstate/node_modules/@types/..."
import React, { useCallback, useRef, useState } from 'react'

// #include from "./FakeEstate/node_modules/..."
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

// #include from "./FakeEstate/src/..."
import { Button } from '../../../../app/_components/Button'
import { Input } from '../../../../app/_components/Input'
import { Message } from '../../../../app/_components/Message'
import { useAuth } from '../../../../app/_providers/Auth'

// #include from local "./FakeEstate/src/app/(pages)/create-account/CreateAccountForm/..."
import classes from './index.module.scss'

// #root method for logging
import { logToFile } from '../../../../../logToFile';

type RegisterFormData = {
  email: string
  password: string
  passwordConfirm: string
}

const CreateAccountForm: React.FC = () => {
  const searchParams = useSearchParams();
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : '';
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>();

  const password = watch('password', '');

  const onSubmit = useCallback(
    async (data: RegisterFormData) => {
      // [DEBUG] Log the data being submitted
      const debugLog = `[DEBUG] Submitting registration data: ${JSON.stringify(data)}`;
      await logToFile(debugLog);

      // Attempt to create user with submitted data
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // [ERROR] Check if there was an error in the response
      if (!response.ok) {
        const errorLog = `[ERROR] Server response error: ${response.statusText}`;
        await logToFile(errorLog);
        setError(response.statusText || 'There was an error creating the account.');
        return;
      }

      // [INFO] User creation was successful
      const infoLog = '[INFO] User account created successfully.';
      await logToFile(infoLog);

      const redirect = searchParams.get('redirect');
      const timer = setTimeout(() => setLoading(true), 1000);

      try {
        // Log the login attempt
        const loginLog = '[INFO] Attempting to log in user.';
        await logToFile(loginLog);
        await login({
          username: data.email,
          password: data.password,
        });
        clearTimeout(timer);
        router.push(redirect ? redirect as string : `/`);
        window.location.href = '/';
      } catch (error) {
        // [WARN] Log any issues during the login attempt
        const warnLog = `[WARN] Login failed: ${error}`;
        await logToFile(warnLog);
        clearTimeout(timer);
        setError('There was an error with the credentials provided. Please try again.');
      }
    },
    [login, router, searchParams],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <h2>Create Account</h2>
      <Message error={error} className={classes.message} />
      <Input
        name="email"
        label="Email Address"
        required
        register={register}
        error={errors.email}
        type="username"
      />
      {/* <Input
        name="username"
        label="Username"
        required
        register={register}
        error={errors.username}
      /> */}
      <Input
        name="password"
        type="password"
        label="Password"
        required
        register={register}
        error={errors.password}
      />
      <Input
        name="passwordConfirm"
        type="password"
        label="Confirm Password"
        required
        register={register}
        validate={value => value === password || 'The passwords do not match'}
        error={errors.passwordConfirm}
      />
      <Button
        type="submit"
        label={loading ? 'Processing' : 'Create Account'}
        disabled={loading}
        appearance="primary"
        className={classes.submit}
      />
      <div>
        {'Already have an account? '}
        <Link href={`/login${allParams}`}>Login</Link>
      </div>
    </form>
  )
}

export default CreateAccountForm

// end_of_file: ./FakeEstate/src/app/(pages)/create-account/CreateAccountForm/index.tsx
