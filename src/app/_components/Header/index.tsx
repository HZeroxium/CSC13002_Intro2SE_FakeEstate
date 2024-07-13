{
  /* eslint-disable @next/next/no-img-element */
}

import React from 'react'
import Link from 'next/link'

import { Header } from '../../../payload/payload-types'
import { fetchHeader } from '../../_api/fetchGlobals'
import HeaderComponent from './HeaderComponent'
import classes from './index.module.scss'


export async function Header() {
  let header: Header | null = null

  try {
    header = await fetchHeader()
  } catch (error) {
    console.log(error)
  }

  return (
    <>
      <div className={classes.heroTitleContainer}>
        <div className={classes.heroTitleContainerChild} />
        <div className={classes.welcomeToOur}>WELCOME TO OUR WEBSITE</div>
      </div>
      <HeaderComponent header={header}/>
    </>
  )
}
