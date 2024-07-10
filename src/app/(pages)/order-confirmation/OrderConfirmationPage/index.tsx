'use client'

// #include from "./FakeEstate/node_modules/@types/..."
import React, { Fragment, useEffect } from 'react'

// #include from "./FakeEstate/node_modules/..."
import { useSearchParams } from 'next/navigation'

import { Button } from '../../../../app/_components/Button'
import { Message } from '../../../../app/_components/Message'
import { useCart } from '../../../../app/_providers/Cart'

import classes from './index.module.scss'

export const OrderConfirmationPage: React.FC<{}> = () => {
  const searchParams = useSearchParams()
  const orderID = searchParams.get('order_id')
  const error = searchParams.get('error')

  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div>
      {error ? (
        <Fragment>
          <Message error={error} />
          <p>
            {`Your payment was successful but there was an error processing your order. Please contact us to resolve this issue.`}
          </p>
          <div className={classes.actions}>
            <Button href="/account" label="View account" appearance="primary" />
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`}
              label="View all orders"
              appearance="secondary"
            />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h1>Thank you for your order!</h1>
          <p>
            {`Your order has been confirmed. You will receive an email confirmation shortly. Your order ID is ${orderID}.`}
          </p>
          <div className={classes.actions}>
            <Button href={`/orders/${orderID}`} label="View order" appearance="primary" />
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`}
              label="View all orders"
              appearance="secondary"
            />
          </div>
        </Fragment>
      )}
    </div>
  )
}
