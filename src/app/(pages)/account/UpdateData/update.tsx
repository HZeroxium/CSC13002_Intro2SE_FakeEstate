'use client'

// Import necessary modules from React and other libraries
import React, { Fragment, useCallback, useEffect, useState } from 'react';

// Import form handling and navigation utilities
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

// Import custom components
import { Button } from '../../../../app/_components/Button';
import { Input } from '../../../../app/_components/Input';
import { Message } from '../../../../app/_components/Message';
import { useAuth } from '../../../../app/_providers/Auth';

// Import CSS module for styling
import classes from './index.module.scss';

// Define the structure of the form data
type InitialData = {

  phoneNumber: string;
  fullName: string;
  gender: string;
};

type UpdateFormProps = {
  initialData: InitialData;
  onSuccess?: () => void; // Add onSuccess prop
};


const UpdateForm: React.FC<UpdateFormProps> = ({ initialData, onSuccess }) => {
  // State variables to handle errors and success messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Get user data and setUser function from authentication context
  const { user, setUser } = useAuth();

  // Destructure methods and states from useForm hook
  const {
    register,  // For registering form inputs
    handleSubmit,  // For handling form submission
    formState: { errors, isLoading },  // Form state including errors and loading state
    reset,  // For resetting the form
  } = useForm<InitialData>({
    defaultValues: initialData, // Set initial form values
  });

  // Get router instance for navigation
  const router = useRouter();

  // Define the form submission handler
  const onSubmit = useCallback(
    async (data: InitialData) => {
      if (user) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`, {
          // Include credentials with fetch
          credentials: 'include',
          method: 'PATCH',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const json = await response.json();
          // Update user context with new data
          setUser(json.doc);
          setSuccess('Successfully updated account.');
          setError('');
          // Reset form with updated values
          reset(json.doc);
          if (onSuccess) {
            onSuccess(); // Call onSuccess prop after successful update
          }
          router.refresh()
        } else {
          setError('There was a problem updating your account.');
        }
      }
    },
    [user, setUser, reset]
  );

  // useEffect to handle side effects on component mount and when dependencies change
  useEffect(() => {
    if (user === null) {
      // Redirect to login page if user is not logged in
      router.push(
        `/login?error=${encodeURIComponent(
          'You must be logged in to view this page.',
        )}&redirect=${encodeURIComponent('/account')}`
      );
    }
  }, [user, router]);

  return (
    // Form element with submit handler
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      
      <Message error={error} success={success} className={classes.message} />
      <Fragment>
        <Input name="fullName" label="Full Name" register={register} error={errors.fullName} />
        <div className={classes.select}>
          <label>Gender</label>
          <select id="gender" {...register("gender")}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span className={classes.error}>This field is required</span>}
        </div>
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
  );
};

// Export the component as default
export default UpdateForm;
