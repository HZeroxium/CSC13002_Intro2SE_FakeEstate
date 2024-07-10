// #include from "./FakeEstate/node_modules/@types/..."
import React from 'react'

// #include css from "./FakeEstate/src/app/_components/BackgroundColor/..."
import classes from './index.module.scss'

type Props = {
  invert?: boolean
  className?: string
  children?: React.ReactNode
  id?: string
}

export const BackgroundColor: React.FC<Props> = props => {
  const { id, className, children, invert } = props

  return (
    <div id={id} className={[invert && classes.invert, className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}
