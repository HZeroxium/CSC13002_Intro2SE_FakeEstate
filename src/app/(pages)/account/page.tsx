// #include from "./FakeEstate/node_modules/@types/..."
import React, { Fragment } from 'react'
import { GetServerSideProps } from 'next';
// #include from "./FakeEstate/node_modules/..."
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../../../app/_components/Button'
import { Gutter } from '../../../app/_components/Gutter'
import { RenderParams } from '../../../app/_components/RenderParams'
import { LowImpactHero } from '../../../app/_heros/LowImpact'
import { getMeUser } from '../../../app/_utilities/getMeUser'
import { mergeOpenGraph } from '../../../app/_utilities/mergeOpenGraph'
import AccountForm from './UpdateData/update'
import UpdateProfileClient from './UpdateProfileClient/UpdateProfileClient'

import classes from './index.module.scss'

type ProfileProps = {
  initialData: any;
};

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
                <div className={classes.profileDetails} />
                <div className={classes.detailsContainer}>
                  <div className={classes.detailsHeader}>
                    <div className={classes.myProfile}>My Profile</div>
                    <div className={classes.manageAndProtect}> Manage and protect your account</div>
                  </div>
                </div>
                <div className={classes.divider}> 
                  <div className={classes.dividerLine} />
                </div>
                <div className={classes.profileInfo}>
                  <div className={classes.infoContainer}>
                    
                    <div className={classes.contactInfoContainer}>
                      <div className={classes.contactInfo}>
                        <div className={classes.contactInfoFields}>
                          <div className={classes.name}>Username</div>
                        </div>
                        <div className={classes.contactInfoFields}>
                          <div className={classes.name}>Full name</div>
                        </div>
                        <div className={classes.email}>Email</div>
                        <div className={classes.contactInfoFields}>
                          <div className={classes.phoneNumber}>Phone Number</div>
                        </div>
                        <div className={classes.contactInfoFields}>
                          <div className={classes.gender}>Gender</div>
                        </div>
                        <div className={classes.contactInfoFields}>
                          <div className={classes.dateOfBirth}>
                            Date of birth
                          </div>
                        </div>
                      </div>

                      <div className={classes.emailFieldContainer}>
                        <div className={classes.editButton}>
                          <div className={classes.usernameLabel}>
                            <div className={classes.username}>
                              {user.name}
                            </div>
                          </div>
                        </div>

                        <div className={classes.editPhone}>
                          <div className={classes.editLink}>                            
                            <div className={classes.changeLink}>
                              <div className={classes.changeActions}> {user.fullName} </div>
                            </div>
                          </div>
                        </div>     

                        <div className={classes.editPhone}>
                          <div className={classes.editLink}>                            
                            <div className={classes.changeLink}>
                              <div className={classes.changeActions}> {user.email} </div>
                            </div>
                          </div>
                        </div>     

                        <div className={classes.editPhone}>
                          <div className={classes.editLink}>                            
                            <div className={classes.changeLink}>
                              <div className={classes.changeActions}> {user.phoneNumber} </div>
                            </div>
                          </div>
                        </div>        

                        <div className={classes.editPhone}>
                          <div className={classes.editLink}>                            
                            <div className={classes.changeLink}>
                              <div className={classes.changeActions}> {user.gender} </div>
                            </div>
                          </div>
                        </div> 

                        <div className={classes.dateFieldContainer}>
                          <div className={classes.dateField}>
                            <div className={classes.dateValue}>
                              <div className={classes.userBirthDate}>
                                **/09/2004
                              </div>
                            </div>
                          </div>
                          <div className={classes.editLink1}>
                          <UpdateProfileClient initialData={user} />
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
                    <Link href="/logout" className={classes.stateLayer}>
                      <Image className={classes.icon} alt="" src="/assets/icons/arrow-left-solid.svg" width={100} height={100}/>
                      <div className={classes.buttonLabel}>Logout</div>
                    </Link> 
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
