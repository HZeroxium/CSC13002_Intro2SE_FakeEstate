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

type RegisterFormData = {
  email: string
  username: string
  password: string
  passwordConfirm: string
  phoneNumber: string
  describeText: string
}

class CreateAccountService {
  private apiUrl: string | undefined;

  constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    if (!this.apiUrl) {
      throw new Error("NEXT_PUBLIC_SERVER_URL is not defined");
    }
  }

  async registerUser(data: RegisterFormData): Promise<Response> {
    return fetch(`${this.apiUrl}/api/users`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
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

  const password = useRef({});
  password.current = watch('password', '');

  const logToFile = async (message: string) => {
    try {
      await fetch('/api/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
    } catch (error) {
      console.error('Error logging to file:', error);
    }
  };
  const accountService = new CreateAccountService();
  const onSubmit = useCallback(
    async (data: RegisterFormData) => {
      setLoading(true); // Set loading state to true
      setError(null); // Clear any previous errors

      const logMessage = '=================================================' + JSON.stringify(data);
      await logToFile(logMessage);
      console.log(logMessage);
      try {
        console.log('Registering user with data:', data);
        const response = await accountService.registerUser(data); // Call to register user
        console.log('Register response:', response);

        if (!response.ok) {
          const message = response.statusText || 'There was an error creating the account.';
          setError(message); // Set error message
          setLoading(false); // Set loading state to false
          return;
        }

        const redirect = searchParams.get('redirect'); // Get redirect URL from search params

        try {
          console.log('Logging in user with data:', { email: data.email, username: data.username, password: data.password });
          await login({ email: data.email, username: data.username, password: data.password }); // Ensure login with correct credentials
          console.log('Login successful');

          if (redirect) {
            router.push(redirect as string); // Redirect to specified URL
          } else {
            router.push(`/account?success=${encodeURIComponent('Account created successfully')}`); // Redirect to success page
          }
        } catch (loginError) {
          console.error('Login error:', loginError);
          setError('There was an error with the credentials provided. Please try again.'); // Set error message
        }
      } catch (error) {
        console.error('Registration error:', error);
        setError('There was an error creating the account. Please try again.'); // Set error message
      } finally {
        setLoading(false); // Set loading state to false
      }
    },
    [login, router, searchParams, accountService]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <p>
        {`This is where new customers can signup and create a new account. To manage all users, `}
        <Link href="/admin/collections/users">login to the admin dashboard</Link>
        {'.'}
      </p>
      <Message error={error} className={classes.message} />
      <Input
        name="email"
        label="Email Address"
        required
        register={register}
        error={errors.email}
        type="email"
      />
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
      <Input
        name="phoneNumber"
        type="text"
        label="Phone Number"
        register={register}
        error={errors.phoneNumber}
        validate={value => {
          if (!value) {
            return 'Phone number is required';
          }
          if (!/^\d{10}$/.test(value)) {
            return 'Phone number must be 10 digits';
          }
          return true;
        }}
      />
      <Input
        name="describeText"
        type="text"
        label="Describe yourself"
        register={register}
        error={errors.describeText}
        validate={value => {
          if (value.length > 200) {
            return 'Description must be less than 200 characters';
          }
          return true;
        }}
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
  );
};

export default CreateAccountForm;

// end_of_file: ./FakeEstate/src/app/(pages)/create-account/CreateAccountForm/index.tsx
