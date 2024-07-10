'use client'

// #include from "./FakeEstate/node_modules/@types/..."
import React from 'react'

// #include from "./FakeEstate/node_modules/..."
import Link from 'next/link'
import Image from 'next/image'

// #include from "./FakeEstate/src/..."
import { Header as HeaderType } from '../../../../payload/payload-types'
import { useAuth } from '../../../../app/_providers/Auth'

// #include from "./FakeEstate/src/app/_components/..."
import { CartLink } from '../../CartLink'
import { CMSLink } from '../../Link'
import { Button } from '../../Button'

// #include from "./FakeEstate/src/app/_components/Header/Nav/..."
import classes from './index.module.scss'

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
      <ul className={classes.Catalogue}>
        <li>
          <a href="#">Catalogue ▾</a>
          <ul className={classes.dropdown}>
            <li><a href="#">khoi</a></li>
            <li><a href="#">khiem</a></li>
            <li><a href="#">thai</a></li>
            <li><a href="#">anh</a> </li>
            <li><a href="#">huy</a></li>
          </ul>
        </li>
      </ul>

      <CartLink />
      {user &&
        <Link href="/account">
          <Image src="/user-removebg-preview.webp" alt="user_logo" width={50} height={50} />
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
