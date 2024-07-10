{
  /* eslint-disable @next/next/no-img-element */
}

// #include from "./FakeEstate/node_modules/@types/..."
import React from 'react'

// #include from "./FakeEstate/node_modules/..."
import Link from 'next/link'

// #include from "./FakeEstate/src/..."
import { Header } from '../../../payload/payload-types'

// #include from "./FakeEstate/src/app/..."
import { fetchHeader } from '../../_api/fetchGlobals'

// #include from "./FakeEstate/src/app/_components/..."
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
