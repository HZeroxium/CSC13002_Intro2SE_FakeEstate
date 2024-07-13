// #include from "./FakeEstate/node_modules/@types/..."
import React, { Fragment } from 'react'

// #include from "./FakeEstate/node_modules/..."
import { Metadata } from 'next'
import Link from 'next/link'

import { Gutter } from '../../../../app/_components/Gutter'
import { Message } from '../../../../app/_components/Message'
import { VerticalPadding } from '../../../../app/_components/VerticalPadding'
import { mergeOpenGraph } from '../../../../app/_utilities/mergeOpenGraph'

export default async function MessageComponentPage() {
  return (
    <Fragment>
      <Gutter>
        <p>
          <Link href="/styleguide">Styleguide</Link>
          {' / '}
          <span>Message Component</span>
        </p>
        <h1>Message Component</h1>
      </Gutter>
      <Gutter>
        <VerticalPadding bottom="large" top="none">
          <Message message="This is a message" />
          <br />
          <Message error="This is an error" />
          <br />
          <Message success="This is a success" />
          <br />
          <Message warning="This is a warning" />
        </VerticalPadding>
      </Gutter>
    </Fragment>
  )
}

export const metadata: Metadata = {
  title: 'Message Component',
  description: 'Styleguide for message component.',
  openGraph: mergeOpenGraph({
    title: 'Message Component',
    url: '/styleguide/message',
  }),
}
