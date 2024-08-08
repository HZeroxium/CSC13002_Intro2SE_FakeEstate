import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { Log } from '../../../../logToFile';  // Assuming logToFile::Log is available

import classes from './index.module.scss';

type Props = {
  name: string;
  label: string;
  register: UseFormRegister<FieldValues & any>;
  required?: boolean;
  error: any;
  type?: 'text' | 'number' | 'password' | 'email';
  validate?: (value: string) => boolean | string;
  disabled?: boolean;
}

// Email validation pattern
const emailPattern = {
  value: /\S+@\S+\.\S+/,
  message: 'Please enter a valid email',
};

// Utility to handle field registration and validation
const useFieldRegistration = (register, name, type, required, validate) => {
  return register(name, {
    required,
    validate,
    ...(type === 'email' && { pattern: emailPattern }),
  });
};

// Component to display input errors with enhanced logging
const InputError = ({ error, inputName }) => {
  if (!error) return null;

  const errorMessage = error.message || (error.type === 'required' && 'This field is required');
  const detailedMessage = `Input error for ${inputName}: ${errorMessage}`;

  // Log the detailed error message including the specific field name and error
  Log.error(detailedMessage);

  return <div className={classes.errorMessage}>{errorMessage}</div>;
};

export const Input: React.FC<Props> = ({
  name,
  label,
  required,
  register,
  error,
  type = 'text',
  validate,
  disabled,
}) => {
  // Register field with validation and logging
  const fieldRegistration = useFieldRegistration(register, name, type, required, validate);

  return (
    <div className={classes.inputWrap}>
      <label htmlFor={name} className={classes.label}>
        {label}
        {required && <span className={classes.asterisk}>&nbsp;*</span>}
      </label>
      <input
        id={name}
        name={name}  // Ensure name attribute is included for precise logging and validation
        type={type}
        className={[classes.input, error && classes.error].filter(Boolean).join(' ')}
        {...fieldRegistration}
        disabled={disabled}
        // Log input data when it changes, especially useful for debugging invalid entries
        onChange={(e) => Log.debug(`Input change for ${name}: "${e.target.value}" `)}
      />
      <InputError error={error} inputName={name} />
    </div>
  );
};

// end_of_file: ./FakeEstate/src/app/_components/Input/index.tsx
