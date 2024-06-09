'use client'

import React from 'react'
import Link from 'next/link'

import { Header as HeaderType} from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { CartLink } from '../../CartLink'
import { CMSLink } from '../../Link'

import classes from './index.module.scss'
import { Button } from '../../Button'
import Image from 'next/image'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const { user } = useAuth()

  return (
    <nav
      className={[
        classes.nav,
        user === undefined && classes.hide,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="none" />
      })}
      <CartLink />
      {user && 
        <Link href="/account">
          <Image src="/user-removebg-preview.webp" alt="user_logo" width={50} height={50}/>
        </Link>}
      {!user && (<Button 
        el="link"
        href="/login"
        label="Sign in"
        appearance="custom"
        onClick={() => (window.location.href = '/login')}
      />)}
      {!user && (<Button 
        el="button"
        href="/login"
        label="Sign up"
        appearance="primary"
        onClick={() => (window.location.href = '/create-account')}
      />)}
    </nav>
  )
}
