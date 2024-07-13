// #include from "./FakeEstate/node_modules/@types/..."
import React from 'react'

// #include from "./FakeEstate/src/..."
import { Product } from '../../../payload/payload-types'
import { Card } from '../../../app/_components/Card'
import { Gutter } from '../../../app/_components/Gutter'
import RichText from '../../../app/_components/RichText'

// #include css from "./FakeEstate/src/app/_blocks/RelatedProducts/..."
import classes from './index.module.scss'

export type RelatedProductsProps = {
  blockType: 'relatedProducts'
  blockName: string
  introContent?: any
  docs?: (string | Product)[]
  relationTo: 'products'
}

export const RelatedProducts: React.FC<RelatedProductsProps> = props => {
  const { introContent, docs, relationTo } = props

  return (
    <div className={classes.relatedProducts}>
      {introContent && (
        <Gutter className={classes.introContent}>
          <RichText content={introContent} />
        </Gutter>
      )}
      <Gutter>
        <div className={classes.grid}>
          {docs?.map((doc, index) => {
            if (typeof doc === 'string') return null

            return (
              <div
                key={index}
                className={[
                  classes.column,
                  docs.length === 2 && classes['cols-half'],
                  docs.length >= 3 && classes['cols-thirds'],
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <Card relationTo={relationTo} doc={doc} showCategories />
              </div>
            )
          })}
        </div>
      </Gutter>
    </div>
  )
}
