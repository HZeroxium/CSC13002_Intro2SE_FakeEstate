// #include from "./FakeEstate/node_modules/@types/..."
import React from 'react'

// #include from "./FakeEstate/src/..."
import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../../app/_components/Gutter'
import RichText from '../../../app/_components/RichText'
import { VerticalPadding } from '../../../app/_components/VerticalPadding'

// #include css from "./FakeEstate/src/app/_heros/LowImpact/..."
import classes from './index.module.scss'

export const LowImpactHero: React.FC<Page['hero']> = ({ richText }) => {
  return (
    <Gutter className={classes.lowImpactHero}>
      <div className={classes.content}>
        <VerticalPadding>
          <RichText className={classes.richText} content={richText} />
        </VerticalPadding>
      </div>
    </Gutter>
  )
}
