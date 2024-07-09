// #include from "./FakeEstate/node_modules/*/..."
import React from 'react'

// #include from "./FakeEstate/node_modules/..."
import Link from 'next/link'

import { Footer } from '../../../payload/payload-types'
import { fetchFooter } from '../../_api/fetchGlobals'

import { Footer } from '../../../payload/globals/Footer'
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
