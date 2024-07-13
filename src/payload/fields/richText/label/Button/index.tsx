/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line no-use-before-define

// #include from "./FakeEstate/node_modules/@types/..."
import React from 'react'

// #include from "./FakeEstate/node_modules/..."
import ElementButton from '@payloadcms/richtext-slate/dist/field/elements/Button'

import Icon from '../Icon'

const baseClass = 'rich-text-label-button'

const ToolbarButton: React.FC<{ path: string }> = () => (
  <ElementButton className={baseClass} format="label">
    <Icon />
  </ElementButton>
)

export default ToolbarButton
