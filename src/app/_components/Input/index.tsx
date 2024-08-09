// start_of_file: ./FakeEstate/src/app/_components/Input/index.tsx

import React, { useEffect } from 'react';
import { FieldValues, UseFormRegister, Path, Validate } from 'react-hook-form';
import { Log } from '../../../../logToFile';
import classes from './index.module.scss';

// Define the props for the Input component with a generic type
type InputProps<T extends FieldValues> = {
  name: Path<T>; // The name of the input field (valid path of the form data)
  label: string; // The label for the input field
  register: UseFormRegister<T>; // Register function from react-hook-form with generic type
  required?: boolean; // Whether the field is required
  error: any; // Error object from react-hook-form
  type?: 'text' | 'number' | 'password' | 'email'; // Type of the input field
  validate?: Validate<string, T>; // Validation function with correct type arguments
  disabled?: boolean; // Whether the field is disabled
};

export const Input = <T extends FieldValues>({
  name,
  label,
  register,
  required = false,
  error,
  type = 'text',
  validate,
  disabled = false,
}: InputProps<T>) => {
  // Log input changes with a custom hook
  useInputLogger(name);

  // Validate the input properties to ensure correctness
  validateInputProps({ name, label, type, required, disabled });

  return (
    <div className={classes.inputWrap}>
      <label htmlFor={name} className={classes.label}>
        {label}
        {required && <span className={classes.asterisk}>&nbsp;*</span>}
      </label>
      <input
        id={name}
        className={getInputClassNames(error)}
        type={type}
        disabled={disabled}
        {...register(name, getValidationOptions(type, required, validate))}
      />
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

// Simplifies the logic for determining input class names
const getInputClassNames = (error: any): string => {
  return [classes.input, error && classes.error].filter(Boolean).join(' ');
};

// Encapsulates the validation options based on the input type
const getValidationOptions = <T extends FieldValues>(
  type: string,
  required: boolean,
  validate?: Validate<string, T>
): Record<string, any> => {
  const options: Record<string, any> = { required };

  if (validate) {
    options.validate = validate;
  }

  if (type === 'email') {
    options.pattern = {
      value: /\S+@\S+\.\S+/,
      message: 'Please enter a valid email',
    };
  }

  return options;
};

// Custom hook to log input changes, providing detailed context
const useInputLogger = (inputName: Path<any>) => {
  useEffect(() => {
    const logInputChange = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      await Log.debug(`Input change detected for "${inputName}". New value: "${target.value}"`);
    };

    const inputElement = document.getElementById(inputName);
    if (!inputElement) {
      Log.warn(`Input element with id "${inputName}" not found.`);
      return;
    }

    inputElement.addEventListener('input', logInputChange);

    // Cleanup the event listener on component unmount
    return () => {
      inputElement.removeEventListener('input', logInputChange);
    };
  }, [inputName]);
};

// Component to display error messages and log them
const ErrorMessage: React.FC<{ error: any }> = ({ error }) => {
  const message = error?.message || (error?.type === 'required' && 'This field is required');

  useEffect(() => {
    if (error) {
      Log.error(`Validation error in input "${error.ref?.name}": ${message}`);
    }
  }, [error, message]);

  return <div className={classes.errorMessage}>{message}</div>;
};

// Validates the input properties to ensure they are correct
const validateInputProps = ({
  name,
  label,
  type,
  required,
  disabled,
}: Omit<InputProps<FieldValues>, 'register' | 'error' | 'validate'>) => {
  if (!name || typeof name !== 'string' || name.trim() === '') {
    const errorMessage = `Invalid "name" prop: ${name}. It must be a non-empty string.`;
    Log.error(errorMessage);
    throw new Error(errorMessage);
  }

  if (!label || typeof label !== 'string' || label.trim() === '') {
    const errorMessage = `Invalid "label" prop: ${label}. It must be a non-empty string.`;
    Log.error(errorMessage);
    throw new Error(errorMessage);
  }

  if (!['text', 'number', 'password', 'email'].includes(type)) {
    const errorMessage = `Invalid "type" prop: ${type}. Allowed values are "text", "number", "password", "email".`;
    Log.error(errorMessage);
    throw new Error(errorMessage);
  }

  if (typeof required !== 'boolean') {
    const errorMessage = `Invalid "required" prop: ${required}. It must be a boolean.`;
    Log.error(errorMessage);
    throw new Error(errorMessage);
  }

  if (typeof disabled !== 'boolean') {
    const errorMessage = `Invalid "disabled" prop: ${disabled}. It must be a boolean.`;
    Log.error(errorMessage);
    throw new Error(errorMessage);
  }
};

// end_of_file: ./FakeEstate/src/app/_components/Input/index.tsx
