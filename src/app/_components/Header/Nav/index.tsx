  import React, { useState } from 'react'
  import Link from 'next/link'
  import { Header as HeaderType } from '../../../../payload/payload-types'
  import { useAuth } from '../../../_providers/Auth'
  import { CartLink } from '../../CartLink'
  import { CMSLink } from '../../Link'
  import { Button } from '../../Button'
  import Image from 'next/image'
  import classes from './index.module.scss'

  export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
    const { user } = useAuth()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen)
    }

    return (
      <div className={classes.navigation2}>
        <img
          className={classes.fakeEstateLogoV22Icon}
          loading="lazy"
          alt=""
          src="/fake_estate_logo_v(2).png"
        />
        <div className={classes.navLinks}>
          <div className={classes.frameParent}>
            <div className={classes.newCatalogueStateBlueWrapper}>
              <div className={classes.newCatalogueStateBlue} onClick={toggleDropdown}>
                <a className={classes.catalogue}>Catalogue</a>
                <div className={classes.catalogueLinkIcon}>
                  <img
                    className={classes.catalogueLinkIconChild}
                    loading="lazy"
                    alt=""
                    src="/angle-down-solid.svg"
                  />  
                </div>  
              </div>
              {dropdownOpen && (  // Added dropdown menu
                <div className={classes.dropdownMenu}>
                  <a href="#" className={classes.dropdownItem}>Item 1</a>
                  <a href="#" className={classes.dropdownItem}>Item 2</a>
                  <a href="#" className={classes.dropdownItem}>Item 3</a>
                </div>
              )}
            </div>
            <div className={classes.aboutLinkContainerParent}>
              <div className={classes.aboutLinkContainer}>
                <div className={classes.aboutBlue}>
                  <a className={classes.about}>About</a>
                </div>
              </div>
              <div className={classes.signinLinkContainerParent}>
                <div className={classes.signinLinkContainer}>
                  <div className={classes.signInBlue}>
                    {user ? (
                      <Link href="/account">
                        <Image src="/user-removebg-preview.webp" alt="user_logo" width={50} height={50}/>
                      </Link>
                    ) : (
                      <a className={classes.signIn} href="/login">Sign in</a>
                    )}
                  </div>
                </div>
                {!user && (
                  <div className={classes.signUp}>
                    <button className={classes.signUpButton}>
                      <a className={classes.signUp1} href="/create-account">Sign up</a>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
