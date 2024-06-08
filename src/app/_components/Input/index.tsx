import React from 'react'
import { FieldValues, UseFormRegister, Validate } from 'react-hook-form'

import classes from './index.module.scss'

type Props = {
  name: string
  label: string
  register: UseFormRegister<FieldValues & any>
  required?: boolean
  error: any
  type?: 'text' | 'number' | 'password' | 'username' | 'email' | 'phone' | 'url' | 'gender'
  validate?: (value: string) => boolean | string
  disabled?: boolean
}

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
  const inputProps = getInputProps(name, type, register, required, validate, error, disabled);
  return (
    <div className={classes.inputWrap}>
      <label htmlFor="name" className={classes.label}>
        {label}
        {required ? <span className={classes.asterisk}>&nbsp;*</span> : ''}
      </label>
      <input {...inputProps} id={name} />
      {error && (
        <div className={classes.errorMessage}>
          {!error?.message && error?.type === 'required'
            ? 'This field is required'
            : error?.message}
        </div>
      )}
    </div>
  )
}

const getValidationPattern = (type) => {
  switch (type) {
    case 'email':
      return {
        pattern: {
          value: /^\S+@\S+\.\S+$/,
          message: 'Please enter an email with "@" and ".", containing no spaces'
        },
      };
    case 'phone':
      return {
        pattern: {
          value: /^\+?[0-9]{7,15}$/,
          message: 'Please enter a valid phone number with 7 to 15 digits.',
        },
      };
    case 'url':
      return {
        pattern: {
          value: /^(https?:\/\/)[\w.-]+(\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]+$/,
          message: 'Please enter a valid URL starting with "http://" or "https://".',
        },
      };
    case 'username':
      return {
        pattern: {
          value: /^[a-zA-Z0-9._-]{3,}$/,
          message: 'Enter a username with at least 3 characters, can be any latin letters, numbers, and underscores',
        },
      };
    case 'password':
      return {
        pattern: {
          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          message: 'Password must include at least 8 characters, one uppercase, one lowercase, one number, and one special character',
        },
      };
    default:
      return {};
  }
}

const getInputProps = (name, type, register, required, validate, error, disabled) => {
  const validationProps = getValidationPattern(type);

  return {
    className: [classes.input, error && classes.error].filter(Boolean).join(' '),
    type: type,
    disabled: disabled,
    ...register(name, {
      required,
      validate,
      ...validationProps,
    })
  };
}

