// #include from "./FakeEstate/node_modules/@types/..."
import React from 'react'

// #include from "./FakeEstate/node_modules/..."
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import { Gutter } from '../../../app/_components/Gutter'
import { RenderParams } from '../../../app/_components/RenderParams'
import { getMeUser } from '../../../app/_utilities/getMeUser'
import { mergeOpenGraph } from '../../../app/_utilities/mergeOpenGraph'
import LoginForm from './LoginForm'

import classes from './index.module.scss'

export default async function Login() {
  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent('You are already logged in.')}`,
  })

  return (
    <section className={classes.login}>
      <div className={classes.heroImg}>
        <div className={classes.formWrapper}>
          <div className={classes.formContainer}>
            <RenderParams className={classes.params} />
            <div className={classes.formTitle}>
              <Link href="/">
                <Image
                  src="fakeestate.svg"
                  alt="logo"
                  width={120}
                  height={12}
                  className={classes.logo}
                />
              </Link>
            </div>
            <p>Please login here</p>
            <LoginForm />
          </div >

        </div>
      </div>
    </section>

  )
}

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login or create an account to get started.',
  openGraph: mergeOpenGraph({
    title: 'Login',
    url: '/login',
  }),
}
