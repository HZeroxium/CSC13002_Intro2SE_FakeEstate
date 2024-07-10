// #include from "./FakeEstate/node_modules/@types/..."
import React from 'react'

// #include from "./FakeEstate/node_modules/..."
import { StaticImageData } from 'next/image'

// #include from "./FakeEstate/src/..."
import { Page } from '../../../payload/payload-types'

// #include from "./FakeEstate/src/app/..."
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'

import classes from './index.module.scss'

type Props = Extract<Page['layout'][0], { blockType: 'mediaBlock' }> & {
  staticImage?: StaticImageData
  id?: string
}

export const MediaBlock: React.FC<Props> = props => {
  const { media, position = 'default', staticImage } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div className={classes.mediaBlock}>
      {position === 'fullscreen' && (
        <div className={classes.fullscreen}>
          <Media resource={media} src={staticImage} />
        </div>
      )}
      {position === 'default' && (
        <Gutter>
          <Media resource={media} src={staticImage} />
        </Gutter>
      )}
      {caption && (
        <Gutter className={classes.caption}>
          <RichText content={caption} />
        </Gutter>
      )}
    </div>
  )
}
