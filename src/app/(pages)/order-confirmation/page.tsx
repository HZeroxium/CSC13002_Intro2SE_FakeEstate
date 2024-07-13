// #include from "./FakeEstate/node_modules/@types/..."
import React, { Suspense } from 'react'

// #include from "./FakeEstate/node_modules/..."
import { Metadata } from 'next'

import { Gutter } from '../../../app/_components/Gutter'
import { mergeOpenGraph } from '../../../app/_utilities/mergeOpenGraph'
import { OrderConfirmationPage } from './OrderConfirmationPage'

import classes from './index.module.scss'

export default async function OrderConfirmation() {
  return (
    <Gutter className={classes.confirmationPage}>
      <Suspense fallback={<div>Loading...</div>}>
        <OrderConfirmationPage />
      </Suspense>
    </Gutter>
  )
}

export const metadata: Metadata = {
  title: 'Order Confirmation',
  description: 'Your order has been confirmed.',
  openGraph: mergeOpenGraph({
    title: 'Order Confirmation',
    url: '/order-confirmation',
  }),
}
