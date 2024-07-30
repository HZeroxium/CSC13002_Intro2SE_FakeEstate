'use client'

// #include from "./FakeEstate/node_modules/@types/..."
import React from 'react'
// #include from "./FakeEstate/node_modules/..."
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '../../../../app/_components/Button'
import { Gutter } from '../../../../app/_components/Gutter'
import { inclusions, noHeaderFooterUrls, profileNavItems } from '../../../../app/constants'
// #include from "./FakeEstate/src/..."
import { Footer, Media } from '../../../../payload/payload-types'

// #include css from "./FakeEstate/src/app/_components/Footer/FooterComponent/..."
import classes from './index.module.scss'

const FooterComponent = ({ footer }: { footer: Footer }) => {
  const pathname = usePathname()

  return (
    <footer
      className={[classes.footer, noHeaderFooterUrls.includes(pathname) ? classes.hide : ' ']
        .filter(Boolean)
        .join(' ')}
    >
      <Gutter className={classes.wrap}>
        <Link href="/">
          <Image src="/fake_estate_black_logo_2.svg" alt="logo" width={100} height={100} />
        </Link>
        <ul className={classes.customUL}>
          <li>
            <Link href="/">
              <p>Home</p>
            </Link>
          </li>
          <li>About us</li>
          <li>Privacy policy</li>
          <li>Accessibility</li>
        </ul>
        <ul className={classes.inclusions}>
          {inclusions.map((inclusion, index) => (
            <li key={inclusion.title} className={classes.item}>
              <div className={classes.content}>
                <Image
                  src={inclusion.icon}
                  alt={inclusion.title}
                  width={20}
                  height={20}
                  className={classes.icon}
                />
                <div className={classes.text}>
                  <h4 className={classes.title}>{inclusion.title}</h4>
                  <p>{inclusion.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className={classes.custom1}>
          <h4>CONTACT INFO</h4>
          <h6>nghuy22@clc.fitus.edu.vn</h6>
          <h6>0987.654.321</h6>
        </div>
      </Gutter>
      <div className={classes.copyright}>
        <Gutter>
          <p>{footer?.copyright}</p>
        </Gutter>
      </div>
    </footer>
  )
}

export default FooterComponent
