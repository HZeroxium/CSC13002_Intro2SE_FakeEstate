'use client'

// #include from "./FakeEstate/node_modules/@types/..."
import React from 'react'
import Image from 'next/image'
// #include from "./FakeEstate/node_modules/..."
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Gutter } from '../../../../app/_components/Gutter'
import { HeaderNav } from '../../../../app/_components/Header/Nav'
import { noHeaderFooterUrls } from '../../../../app/constants'
// #include from "./FakeEstate/src/..."
import { Header } from '../../../../payload/payload-types'

// #include css from "./FakeEstate/src/app/_components/Header/HeaderComponent/..."
import classes from './index.module.scss'

const HeaderComponent = ({ header }: { header: Header }) => {
  const pathname = usePathname()

  return (
    <nav
      className={[classes.header, noHeaderFooterUrls.includes(pathname) && classes.hide]
        .filter(Boolean)
        .join(' ')}
    >
      <Gutter className={classes.wrap}>
        <Link href="/">
          <Image src="fakeestate.svg" alt="logo" width={170} height={50} />
        </Link>
        <HeaderNav header={header} />
        {/* <form action="" className={classes.searchBox}>
          <input type="text" className={classes.searchText} />
          <button className={classes.searchBtn}>
            <Image
              className={classes.searchIcon}
              src="/assets/icons/magnifying-glass-solid-white.svg"
              alt="search-btn"
              width={24}
              height={24}
            />
          </button>
        </form> */}
      </Gutter>
    </nav>
  )
}

export default HeaderComponent
