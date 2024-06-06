'use client'

import React from 'react'

import classes from './index.module.scss'
import { inclusions, noHeaderFooterUrls } from '../../../constant'
import { usePathname } from 'next/navigation'
import { Gutter } from '../../Gutter'
import Link from 'next/link'
import Image from 'next/image'

  
import DecriptionComponent from '../DecriptionComponent'

const FooterComponent = () => {

    const pathname = usePathname()

  return (
    <footer className={[classes.footer, noHeaderFooterUrls.includes(pathname) ? classes.hide: ' '].filter(Boolean).join(' ')}>
        <Gutter className={classes.wrap}>
          <Link href="/">
            <Image src = "/fake_estate_black_logo_2.svg" alt="logo" width={50} height={50}/>
          </Link>
          <DecriptionComponent/>
        </Gutter>   
    </footer>    
  )
}

export default FooterComponent