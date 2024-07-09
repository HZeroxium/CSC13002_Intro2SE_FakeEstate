// #include from ".FakeEstate/node_modules/*/..."
import React from 'react'

// #include from "./FakeEstate/node_modules/..."
import { Metadata } from 'next'

// #include from "./FakeEstate/src/app/..."
import { Gutter } from '../../_components/Gutter'
import { RenderParams } from '../../_components/RenderParams'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import CreateAccountForm from './CreateAccountForm'

// #include from "./FakeEstate/src/app/(pages)/create-account/..."
import classes from './index.module.scss'

export default async function CreateAccount() {
  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent(
      'Cannot create a new account while logged in, please log out and try again.',
    )}`,
  })

  return (
    <Gutter className={classes.createAccount}>
      <h1>Create Account</h1>
      <RenderParams />
      <CreateAccountForm />
    </Gutter>
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
