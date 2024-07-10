// #include from "./FakeEstate/node_modules/@types/..."
import React from 'react'

// #include from "./FakeEstate/src/..."
import { Page } from '../../../payload/payload-types'

// #include from "./FakeEstate/src/app/..."
import { Gutter } from '../../_components/Gutter'
import { CMSLink } from '../../_components/Link'
import RichText from '../../_components/RichText'

// #include from "./FakeEstate/src/app/_blocks/Content/..."
import classes from './index.module.scss'

type Props = Extract<Page['layout'][0], { blockType: 'content' }>

export const ContentBlock: React.FC<
  Props & {
    id?: string
  }
> = props => {
  const { columns } = props

  return (
    <Gutter className={classes.content}>
      <div className={classes.grid}>
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, richText, link, size } = col

            return (
              <div key={index} className={[classes.column, classes[`column--${size}`]].join(' ')}>
                <RichText content={richText} />
                {enableLink && <CMSLink className={classes.link} {...link} />}
              </div>
            )
          })}
      </div>
    </Gutter>
  )
}
