// #include from "./FakeEstate/node_modules/@types/..."
import type { ElementType, Ref } from 'react'

// #include from "./FakeEstate/node_modules/..."
import type { StaticImageData } from 'next/image'

// #include from "./FakeEstate/src/..."
import type { Media as MediaType } from '../../../payload/payload-types'

export interface Props {
  src?: StaticImageData // for static media
  alt?: string
  resource?: string | MediaType // for Payload media
  size?: string // for NextImage only
  priority?: boolean // for NextImage only
  fill?: boolean // for NextImage only
  className?: string
  imgClassName?: string
  videoClassName?: string
  htmlElement?: ElementType | null
  onClick?: () => void
  onLoad?: () => void
  ref?: Ref<null | HTMLImageElement | HTMLVideoElement>
}
