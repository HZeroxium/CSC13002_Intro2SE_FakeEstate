// #include from "./FakeEstate/node_modules/@types/..."
import React, { Fragment } from 'react'

// #include from "./FakeEstate/node_modules/..."
import { Metadata } from 'next'
import Link from 'next/link'

import { ContentBlock } from '../../../../app/_blocks/Content'
import { Gutter } from '../../../../app/_components/Gutter'
import { VerticalPadding } from '../../../../app/_components/VerticalPadding'
import { mergeOpenGraph } from '../../../../app/_utilities/mergeOpenGraph'

export default async function ContentBlockPage() {
  return (
    <Fragment>
      <Gutter>
        <p>
          <Link href="/styleguide">Styleguide</Link>
          {' / '}
          <span>Content Block</span>
        </p>
        <h1>Content Block</h1>
      </Gutter>
      <VerticalPadding bottom="large" top="none">
        <ContentBlock
          blockType="content"
          columns={[
            {
              size: 'full',
              richText: [
                {
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
              ],
            },
          ]}
        />
      </VerticalPadding>
    </Fragment>
  )
}

export const metadata: Metadata = {
  title: 'Content Block',
  description: 'Styleguide for the Content Block',
  openGraph: mergeOpenGraph({
    title: 'Content Block',
    url: '/styleguide/content-block',
  }),
}
