// #include from "./FakeEstate/node_modules/@types/..."
import React, { Fragment } from 'react'

// #include from "./FakeEstate/src/..."
import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../../app/_components/Gutter'
import { CMSLink } from '../../../app/_components/Link'
import { Media } from '../../../app/_components/Media'
import RichText from '../../../app/_components/RichText'

// #include from "./FakeEstate/src/app/_heros/HighImpact/..."
import classes from './index.module.scss'

export const HighImpactHero: React.FC<Page['hero']> = ({ richText, media, links }) => {
  return (
    <Gutter className={classes.hero}>
      <div className={classes.content}>
        <RichText content={richText} />
        {Array.isArray(links) && links.length > 0 && (
          <ul className={classes.links}>
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <div className={classes.media}>
        {typeof media === 'object' && (
          <Fragment>
            <Media
              resource={media}
              // fill
              imgClassName={classes.image}
              priority
            />
            {media?.caption && <RichText content={media.caption} className={classes.caption} />}
          </Fragment>
        )}
      </div>
    </Gutter>
  )
}
