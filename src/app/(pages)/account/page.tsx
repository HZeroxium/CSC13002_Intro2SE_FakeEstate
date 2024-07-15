// #include from "./FakeEstate/node_modules/@types/..."
import React, { Fragment } from 'react'

// #include from "./FakeEstate/node_modules/..."
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../../../app/_components/Button'
import { Gutter } from '../../../app/_components/Gutter'
import { HR } from '../../../app/_components/HR'
import { RenderParams } from '../../../app/_components/RenderParams'
import { LowImpactHero } from '../../../app/_heros/LowImpact'
import { getMeUser } from '../../../app/_utilities/getMeUser'
import { mergeOpenGraph } from '../../../app/_utilities/mergeOpenGraph'
import AccountForm from './AccountForm'

import classes from './index.module.scss'

export default async function Account() {
  const { user } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to access your account.',
    )}&redirect=${encodeURIComponent('/account')}`,
  })

  return (
    <Fragment>
      <Gutter>
        <RenderParams className={classes.params} />
      </Gutter>
      <LowImpactHero
        type="lowImpact"
        media={null}
        richText={[
          {
            type: 'h1',
            children: [
              {
                text: 'Account',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: 'This is your account dashboard. Here you can update your account information, view your purchased products, and browse your order history. To manage all users, ',
              },
              {
                type: 'link',
                url: '/admin/collections/users',
                children: [
                  {
                    text: 'login to the admin dashboard.',
                  },
                ],
              },
            ],
          },
        ]}
      />
        <section className={classes.profileContainerWrapper}>
          <div className={classes.profileContainer}>
            <div className={classes.profileCard}>
              <div className={classes.cardHeader}>
                <div className={classes.cardActions}>
                  <div className={classes.myAccount}>My Account</div>
                    <div
                      className={classes.myOrders}
                    >
                    My Orders
                  </div>
                </div>
              </div>
              <div className={classes.profile}>
                <div className={classes.profileChild} />
                <div className={classes.detailsContainer}>
                  <div className={classes.detailsHeader}>
                    <div className={classes.myProfile}>My Profile</div>
                    <div className={classes.manageAndProtect}> Manage and protect your account</div>
                  </div>
                </div>
                <div className={classes.divider}> 
                  <div className={classes.dividerChild} />
                </div>
                <div className={classes.profileInfo}>
                  <div className={classes.infoContainer}>
                    
                    <div className={classes.contactDetailsParent}>
                      <div className={classes.contactDetails}>
                        <div className={classes.contactFields}>
                          <div className={classes.name}>Username</div>
                        </div>
                        <div className={classes.contactFields}>
                          <div className={classes.name}>Name</div>
                        </div>
                        <div className={classes.email}>Email</div>
                        <div className={classes.contactFields1}>
                          <div className={classes.phoneNumber}>Phone Number</div>
                        </div>
                        <div className={classes.contactFields2}>
                          <div className={classes.gender}>Gender</div>
                        </div>
                        <div className={classes.contactFields3}>
                          <div className={classes.dateOfBirth}>
                            Date of birth
                          </div>
                        </div>
                      </div>

                      <div className={classes.emailFieldParent}>
                        <div className={classes.editButton}>
                          <div className={classes.usernameLabel}>
                            <div className={classes.username}>
                              giakhiem417
                            </div>
                          </div>
                          <div className={classes.change}>Change</div>
                        </div>

                        <div className={classes.emailField}>
                          <div className={classes.emailValue}>
                            <div className={classes.emailValueChild} />
                            <input
                              className={classes.giaKhim}
                              placeholder="Gia Khiêm"
                              type="text"
                            />
                          </div>
                        </div>

                        <div className={classes.editEmail}>
                          <div className={classes.editLink}>
                            <div className={classes.editButton}>
                              <div className={classes.linkLabel}>
                                <div className={classes.gigmailcom}>
                                  gi*********@gmail.com
                                </div>
                              </div>
                              <div className={classes.change}>Change</div>
                            </div>
                          </div>
                        </div>

                        <div className={classes.editPhone}>
                          <div className={classes.editLink}>                            
                            <div className={classes.changeLink}>
                              <div className={classes.changeActions}> ********37 </div>
                              <div className={classes.change1}>Change</div>
                            </div>
                          </div>
                        </div>                      
                        <div className={classes.radio_group}>
                            <label className={classes.radio}>
                              <input type="radio" value={"male"} name='gender'></input>
                              Male
                              <span></span>
                            </label>  
                            <label className={classes.radio}>
                              <input type="radio" value={"female"} name='gender'></input>
                              Female
                              <span></span>
                            </label>
                            <label className={classes.radio}> 
                              <input type="radio" value={"orther"} name='gender'></input>
                              Other
                              <span></span>
                            </label>
                        </div>
                        
                        <div className={classes.dateFieldParent}>
                          <div className={classes.dateField}>
                            <div className={classes.dateValue}>
                              <div className={classes.userBirthDate}>
                                **/09/20**
                              </div>
                            </div>
                            <div className={classes.change2}>Change</div>
                          </div>
                          <div className={classes.editLink1}>
                            <button className={classes.saveButton}>
                              <div className={classes.save}>Save</div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.buttonWrapper}>
              <button className={classes.button}>
                <div className={classes.stateLayer}>
                  <div className={classes.iconWrapper}>
                    <Link href="/logout">
                      <Image className={classes.icon} alt="" src="/assets/icons/arrow-left-solid.svg" width={100} height={100}/>
                    </Link>
                  </div>
                  <div className={classes.buttonLabel}>Logout</div>
                </div>
              </button>
            </div>
          </div>
        </section>  
    </Fragment>
  )
}

export const metadata: Metadata = {
  title: 'Account',
  description: 'Create an account or log in to your existing account.',
  openGraph: mergeOpenGraph({
    title: 'Account',
    url: '/account',
  }),
}
