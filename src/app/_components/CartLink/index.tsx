'use client'

// #include from "./FakeEstate/node_modules/@types/..."
import React, { Fragment, useEffect, useState } from 'react'

// #include from "./FakeEstate/node_modules/..."
import Link from 'next/link'

// #include from "./FakeEstate/src/..."
import { useCart } from '../../../app/_providers/Cart'

// #include css from "./FakeEstate/src/app/_components/CartLink/..."
import classes from './index.module.scss'

export const CartLink: React.FC<{
  className?: string
}> = props => {
  const { className } = props
  const { cart } = useCart()
  const [length, setLength] = useState<number>()

  useEffect(() => {
    setLength(cart?.items?.length || 0)
  }, [cart])

  return (
    <Link className={[classes.cartLink, className].filter(Boolean).join(' ')} href="/cart">
      <Fragment>
        Cart
        {typeof length === 'number' && length > 0 && (
          <small className={classes.quantity}>({length})</small>
        )}
      </Fragment>
    </Link>
  )
}
