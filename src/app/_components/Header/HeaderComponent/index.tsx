'use client'

// #include from "./FakeEstate/node_modules/@types/..."
import React from 'react'

// #include from "./FakeEstate/node_modules/..."
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

// #include from "./FakeEstate/src/..."
import { Header } from '../../../../payload/payload-types'

// #include from "./FakeEstate/src/app/..."
import { noHeaderFooterUrls } from '../../../constants'

// #include from "./FakeEstate/src/app/_components/..."
import { Gutter } from '../../Gutter'
import { HeaderNav } from '../Nav'

import classes from './index.module.scss'
import SearchComponent from '../SeachComponent'

const HeaderComponent = ({ header }: { header: Header }) => {
  const pathname = usePathname()

  return (
    <nav className={[classes.header, noHeaderFooterUrls.includes(pathname) && classes.hide].filter(Boolean).join(' ')}>
      <Gutter className={classes.wrap}>
        <Link href="/">
          <Image src="/fake_estate_logo_v(2).png" alt="logo" width={170} height={50} />
        </Link>
        <HeaderNav header={header} />
      </Gutter>
      <Gutter className={classes.wrap_search}>
        <h1>Stride Towards A <br /> Digital Tomorrow</h1>
        <form action="" className={classes.searchBox}>
          <input type="text" className={classes.searchText} />
          <button className={classes.searchBtn}>
            <Image className={classes.searchIcon} src="/assets/icons/magnifying-glass-solid-white.svg" alt="search-btn" width={24} height={24} />
          </button>
        </form>
      </Gutter>
    </nav>
  )
}

export default HeaderComponent