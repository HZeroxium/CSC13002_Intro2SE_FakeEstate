'use client'
// start_of_file: ./FakeEstate/src/app/_components/Button/index.tsx

// #include from "./FakeEstate/node_modules/@types/..."
import React from 'react'
import Link from 'next/link'

// #include css from "./FakeEstate/src/app/_components/Buttons/..."
import classes from './index.module.scss'

export type ButtonProps = {
  label?: string
  appearance?: 'default' | 'primary' | 'secondary' | 'none' | 'custom'
  href?: string
  newTab?: boolean
  className?: string
  type?: 'submit' | 'button'
  disabled?: boolean
  invert?: boolean
  children?: React.ReactNode
  onClick?: () => void
  element?: 'button' | 'link' | 'a' // Added element property here
}

const getClassName = (appearance?: string, classNameFromProps?: string, invert?: boolean) => {
  return [
    classes.button,
    classNameFromProps,
    appearance && classes[`appearance--${appearance}`],
    invert && classes[`${appearance}--invert`],
  ]
    .filter(Boolean)
    .join(' ')
}

const getNewTabProps = (newTab?: boolean) => {
  return newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}
}

const ButtonContent: React.FC<{ label?: string; children?: React.ReactNode }> = ({ label, children }) => {
  return (
    <div className={classes.content}>
      <span className={classes.label}>{label}</span>
      {children}
    </div>
  )
}

const LinkButton: React.FC<ButtonProps> = ({
  label,
  href,
  newTab,
  className,
  onClick,
  children,
  appearance,
  invert,
}) => {
  const newTabProps = getNewTabProps(newTab)
  const classNames = getClassName(appearance, className, invert)

  return (
    <Link href={href || ''} className={classNames} {...newTabProps} onClick={onClick}>
      <ButtonContent label={label}>{children}</ButtonContent>
    </Link>
  )
}

const ActionButton: React.FC<ButtonProps> = ({
  label,
  className,
  onClick,
  type,
  disabled,
  children,
  appearance,
  invert,
}) => {
  const classNames = getClassName(appearance, className, invert)

  return (
    <button className={classNames} type={type} onClick={onClick} disabled={disabled}>
      <ButtonContent label={label}>{children}</ButtonContent>
    </button>
  )
}

const AnchorButton: React.FC<ButtonProps> = ({
  label,
  href,
  className,
  children,
  appearance,
  invert,
}) => {
  const classNames = getClassName(appearance, className, invert)

  return (
    <a href={href} className={classNames}>
      <ButtonContent label={label}>{children}</ButtonContent>
    </a>
  )
}

export const Button: React.FC<ButtonProps> = props => {
  const { element = 'link', onClick, type } = props

  // Determine which button component to render based on props
  if (onClick || type === 'submit') {
    return <ActionButton {...props} />
  }

  if (element === 'link') {
    return <LinkButton {...props} />
  }

  return <AnchorButton {...props} />
}

// end_of_file: ./FakeEstate/src/app/_components/Button/index.tsx
