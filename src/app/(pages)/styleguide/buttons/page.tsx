// #include from "./FakeEstate/node_modules/@types/..."
import React, { Fragment } from 'react'

// #include from "./FakeEstate/node_modules/..."
import { Metadata } from 'next'
import Link from 'next/link'

import { CallToActionBlock } from '../../../../app/_blocks/CallToAction'
import { Button } from '../../../../app/_components/Button'
import { Gutter } from '../../../../app/_components/Gutter'
import { VerticalPadding } from '../../../../app/_components/VerticalPadding'
import { mergeOpenGraph } from '../../../../app/_utilities/mergeOpenGraph'

export default async function ButtonsPage() {
  return (
    <Fragment>
      <Gutter>
        <p>
          <Link href="/styleguide">Styleguide</Link>
          {' / '}
          <span>Buttons</span>
        </p>
        <h1>Buttons</h1>
      </Gutter>
      <Gutter>
        <VerticalPadding bottom="large" top="none">
          <Button label="Default Button" appearance="default" />
          <br /> <br />
          <Button label="Primary Button" appearance="primary" />
          <br /> <br />
          <Button label="Secondary Button" appearance="secondary" />
        </VerticalPadding>
      </Gutter>
    </Fragment>
  )
}

export const metadata: Metadata = {
  title: 'Buttons',
  description: 'Styleguide for Buttons',
  openGraph: mergeOpenGraph({
    title: 'Buttons',
    url: '/styleguide/buttons',
  }),
}
