// #include from "./FakeEstate/node_modules/@types/..."
import React from 'react'

// #include from "./FakeEstate/node_modules/..."
import Link from 'next/link'

// #include from "./FakeEstate/src/..."
import { Footer } from '../../../payload/payload-types'
import { Footer } from '../../../payload/globals/Footer'
import { fetchFooter } from '../../../app/_api/fetchGlobals'

// #include from "./FakeEstate/src/app/_components/Footer/..."
import FooterComponent from './FooterComponent'

export async function Footer() {
  let footer: Footer | null = null

  try {
    footer = await fetchFooter()
  } catch (error) {
    console.log(error);
  }

  const navItems = footer?.navItems || []

  return (
    <FooterComponent footer={footer} />
  )
}
