// start_of_file: ./FakeEstate/src/app/(pages)/create-account/page.tsx

// #include from ".FakeEstate/node_modules/*/..."
import React from 'react'

// #include from "./FakeEstate/node_modules/..."
import { Metadata } from 'next'

import { Gutter } from '../../../app/_components/Gutter'
import { RenderParams } from '../../../app/_components/RenderParams'
import { getMeUser } from '../../../app/_utilities/getMeUser'
import { mergeOpenGraph } from '../../../app/_utilities/mergeOpenGraph'

// #include from "./FakeEstate/src/app/(pages)/create-account/..."
import CreateAccountForm from './CreateAccountForm'

import classes from './index.module.scss'

export default async function CreateAccount() {
  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent(
      'Cannot create a new account while logged in, please log out and try again.',
    )}`,
  })

  return (
    <div className={classes.createAccount}>
      <div className={classes.formWrapper}>
        <div className={classes.formContainer}>
          <CreateAccountForm />
        </div>
      </div>
      <div className={classes.heroImg}></div>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Account',
  description: 'Create an account or log in to your existing account.',
  openGraph: mergeOpenGraph({
    title: 'Account',
    url: '/account',
  }),
}

// end_of_file: ./FakeEstate/src/app/(pages)/create-account/page.tsx