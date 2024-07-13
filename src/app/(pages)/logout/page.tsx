// #include from "./FakeEstate/node_modules/@types/..."
import React from 'react'

// #include from "./FakeEstate/node_modules/..."
import { Metadata } from 'next'

// #include from "./FakeEstate/src/..."
import { Settings } from '../../../payload/payload-types'
import { fetchSettings } from '../../../app/_api/fetchGlobals'
import { Gutter } from '../../../app/_components/Gutter'
import { mergeOpenGraph } from '../../../app/_utilities/mergeOpenGraph'

// #include from "./FakeEstate/src/app/(pages)/logout/..."
import { LogoutPage } from './LogoutPage'
import classes from './index.module.scss'

export default async function Logout() {
  let settings: Settings | null = null

  try {
    settings = await fetchSettings()
  } catch (error) {
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // so swallow the error here and simply render the page with fallback data where necessary
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    // console.error(error)
  }

  return (
    <Gutter className={classes.logout}>
      <LogoutPage settings={settings} />
    </Gutter>
  )
}

export const metadata: Metadata = {
  title: 'Logout',
  description: 'You have been logged out.',
  openGraph: mergeOpenGraph({
    title: 'Logout',
    url: '/logout',
  }),
}
