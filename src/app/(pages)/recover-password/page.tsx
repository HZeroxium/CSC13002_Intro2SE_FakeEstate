// #include from "./FakeEstate/node_modules/@types/..."
import React from 'react'
// #include from "./FakeEstate/node_modules/..."
import { Metadata } from 'next'

import { Gutter } from '../../../app/_components/Gutter'
import { mergeOpenGraph } from '../../../app/_utilities/mergeOpenGraph'
import { RecoverPasswordForm } from './RecoverPasswordForm'

import classes from './index.module.scss'

export default async function RecoverPassword() {
  return (
    <div className={classes.recoverPassword}>
      <div className={classes.heroImg}></div>
      <div className={classes.formWrapper}>
        <div className={classes.formContainer}>
          <RecoverPasswordForm />
        </div>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Recover Password',
  description: 'Enter your email address to recover your password.',
  openGraph: mergeOpenGraph({
    title: 'Recover Password',
    url: '/recover-password',
  }),
}
