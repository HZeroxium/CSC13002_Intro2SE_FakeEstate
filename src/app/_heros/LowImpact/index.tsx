// #include from "./FakeEstate/node_modules/@types/..."
import React from 'react'

// #include from "./FakeEstate/src/..."
import { Page } from '../../../payload/payload-types'

// #include from "./FakeEstate/src/app/..."
import { Gutter } from '../../_components/Gutter'
import RichText from '../../_components/RichText'
import { VerticalPadding } from '../../_components/VerticalPadding'

// #include from "./FakeEstate/src/app/_heros/LowImpact/..."
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
