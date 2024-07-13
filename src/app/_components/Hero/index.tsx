// #include from "./FakeEstate/node_modules/@types/..."
import React from 'react'

// #include from "./FakeEstate/src/..."
import { Page } from '../../../payload/payload-types'
import { HighImpactHero } from '../../../app/_heros/HighImpact'
import { LowImpactHero } from '../../../app/_heros/LowImpact'
import { MediumImpactHero } from '../../../app/_heros/MediumImpact'

const heroes = {
  highImpact: HighImpactHero,
  mediumImpact: MediumImpactHero,
  lowImpact: LowImpactHero,
}

export const Hero: React.FC<Page['hero']> = props => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
