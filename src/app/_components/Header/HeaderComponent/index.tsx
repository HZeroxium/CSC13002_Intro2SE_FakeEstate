'use client'

// #include from "./FakeEstate/node_modules/@types/..."
import React from 'react'

// #include from "./FakeEstate/node_modules/..."
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

// #include from "./FakeEstate/src/..."
import { Header } from '../../../../payload/payload-types'
import { noHeaderFooterUrls } from '../../../../app/constants'
import { Gutter } from '../../../../app/_components/Gutter'
import { HeaderNav } from '../../../../app/_components/Header/Nav'
import SearchComponent from '../../../../app/_components/Header/SeachComponent'

// #include css from "./FakeEstate/src/app/_components/Header/HeaderComponent/..."
import classes from './index.module.scss'

const HeaderComponent = ({ header }: { header: Header }) => {
  const pathname = usePathname()

  return (
    <nav className = {[classes.header, noHeaderFooterUrls.includes(pathname) && classes.hide].filter(Boolean).join(' ')}>
      <Gutter className = {classes.wrap}>
        <HeaderNav header = {header}/>
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