// #include from "./FakeEstate/node_modules/@types/..."
import React from 'react'
// #include from "./FakeEstate/node_modules/..."
import Link from 'next/link'

import { fetchFooter } from '../../../app/_api/fetchGlobals'
import FooterComponent from '../../../app/_components/Footer/FooterComponent'
// #include from "./FakeEstate/src/..."
import type { Footer } from '../../../payload/payload-types'

export async function Footer() {
  let footer: Footer | null = null

  try {
    footer = await fetchFooter()
  } catch (error) {
    console.log(error)
  }

  const navItems = footer?.navItems || []

  return <FooterComponent footer={footer} />
}
