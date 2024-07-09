{
  /* eslint-disable @next/next/no-img-element */
}

// #include from "./FakeEstate/node_modules/*/..."
import React from 'react'

// #include from "./FakeEstate/node_modules/..."
import Link from 'next/link'

import { Header } from '../../../payload/payload-types'
import { fetchHeader } from '../../_api/fetchGlobals'
import HeaderComponent from './HeaderComponent'

export async function Header() {
  let header: Header | null = null

  try {
    header = await fetchHeader()
  } catch (error) {
    console.log(error)
  }

  return (
    <>
      <HeaderComponent header={header} />
    </>
  )
}
