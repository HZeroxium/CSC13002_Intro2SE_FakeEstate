{
  /* eslint-disable @next/next/no-img-element */
}

// start_of_file: ./FakeEstate/src/app/_components/Header/index.tsx

// #include from "./FakeEstate/node_modules/@types/..."
import React from 'react'
// #include from "./FakeEstate/node_modules/..."
import Link from 'next/link'

import { fetchHeader } from '../../../app/_api/fetchGlobals'
import HeaderComponent from '../../../app/_components/Header/HeaderComponent'
// #include from "./FakeEstate/src/..."
import type { Header } from '../../../payload/payload-types'

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

// end_of_file: ./FakeEstate/src/app/_components/Header/index.tsx
