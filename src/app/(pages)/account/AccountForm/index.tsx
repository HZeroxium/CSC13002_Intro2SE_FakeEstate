'use client'
// start_of_file: ./FakeEstate/src/app/(pages)/account/AccountForm/index.tsx

// Import essential React utilities and hooks for component and state management
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'

// Import useForm for handling and validating form inputs
import { useForm } from 'react-hook-form'

// Import useRouter for programmatic navigation handling
import { useRouter } from 'next/navigation'

// Reusable UI components
import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { Message } from '../../../_components/Message'

// Authentication context for managing user authentication states
import { useAuth } from '../../../_providers/Auth'

// Custom logging utility for recording operations
import { Log } from '../../../../../logToFile'

// CSS module for styling
import classes from './index.module.scss'

// FormData type definition for TypeScript to ensure type safety
type FormData = {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

// Helper function to handle API requests
async function updateUser(data, userId) {
  const endpoint = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${userId}`;
  const config = {
    credentials: 'include' as RequestCredentials,  // Explicitly type the 'include' as RequestCredentials
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const response = await fetch(endpoint, config);
    if (!response.ok) {
      Log.error(`Update failed with status: ${response.status}`);
      return { error: `Failed to update. Status: ${response.status}` };
    }
    return { data: await response.json() };
  } catch (error) {
    Log.error(`Exception during fetch: ${error.message}`);
    return { error: error.message };
  }
}


const AccountForm: React.FC = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user, setUser } = useAuth();
  const [changePassword, setChangePassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
    watch,
  } = useForm<FormData>();

  const password = useRef({});
  password.current = watch('password', '');

  const router = useRouter();

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (!user) {
        Log.warn('Attempt to submit form without a logged-in user');
        setError('No user logged in.');
        return;
      }

      if (data.password !== data.passwordConfirm) {
        Log.warn('Password mismatch detected during form submission.');
        setError('Passwords do not match.');
        return;
      }

      const { error, data: userData } = await updateUser(data, user.id);
      if (error) {
        setError(error);
        return;
      }

      setUser(userData.doc);
      setSuccess('Account updated successfully.');
      setError('');
      reset(userData.doc);
      Log.info('Account update successful.');
    },
    [user, setUser, reset]
  );

  useEffect(() => {
    if (!user) {
      Log.warn('Unauthorized access attempt detected.');
      router.push(`/login?error=${encodeURIComponent('You must be logged in to view this page.')}&redirect=${encodeURIComponent('/account')}`);
      return;
    }

    reset({
      email: user.email,
      name: user.name,
      password: '',
      passwordConfirm: '',
    });
  }, [user, router, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Message error={error} success={success} className={classes.message} />
      {!changePassword ? (
        <Fragment>
          <Input
            name="email"
            label="Email Address"
            required
            register={register}
            error={errors.email}
            type="email"
          />
          <Input name="name" label="Name" register={register} error={errors.name} />

          <p>
            {'Change your account details below, or '}
            <button
              type="button"
              className={classes.changePassword}
              onClick={() => setChangePassword(!changePassword)}
            >
              click here
            </button>
            {' to change your password.'}
          </p>
        </Fragment>
      ) : (
        <Fragment>
          <p>
            {'Change your password below, or '}
            <button
              type="button"
              className={classes.changePassword}
              onClick={() => setChangePassword(!changePassword)}
            >
              cancel
            </button>
            .
          </p>
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
            validate={value => value === password.current || 'The passwords do not match'}
            error={errors.passwordConfirm}
          />
        </Fragment>
      )}
      <Button
        type="submit"
        label={isLoading ? 'Processing' : changePassword ? 'Change Password' : 'Update Account'}
        disabled={isLoading}
        appearance="primary"
        className={classes.submit}
      />
    </form>
  );
}

export default AccountForm;

// end_of_file: ./FakeEstate/src/app/(pages)/account/AccountForm/index.tsx
