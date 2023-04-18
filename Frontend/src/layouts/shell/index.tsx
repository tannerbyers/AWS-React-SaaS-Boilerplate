// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react'
import AppLayout, {
  AppLayoutProps
} from '@cloudscape-design/components/app-layout'
import TopNavigation from '@cloudscape-design/components/top-navigation'
import { Auth } from 'aws-amplify'

import './styles.css'

export interface ShellProps {
  breadcrumbs?: AppLayoutProps['breadcrumbs']
  contentType?: Extract<
    AppLayoutProps.ContentType,
    'default' | 'table' | 'form'
  >
  tools?: AppLayoutProps['tools']
  children?: AppLayoutProps['content']
  navigation?: AppLayoutProps['navigation']
  notifications?: AppLayoutProps['notifications']
}

interface NavItemI {
  external?: boolean | undefined
  href: string | undefined
  id: string
  target?: string | undefined
}

export default function Shell({
  children,
  contentType,
  tools,
  navigation,
  notifications
}: ShellProps) {
  const handleNavigationClick = async (navItem: NavItemI) => {
    if (navItem.id == 'signout') {
      try {
        await Auth.signOut({ global: true })
      } catch (error) {
        console.log('error signing out: ', error)
      }
    }
  }
  return (
    <>
      <div id="top-nav">
        <TopNavigation
          identity={{
            logo: { src: 'src/public/favicon.svg', alt: ' Logo' },
            title: 'Push Enhance',
            href: '/'
          }}
          i18nStrings={{
            overflowMenuTriggerText: 'More',
            overflowMenuTitleText: 'All'
          }}
          utilities={[
            {
              type: 'menu-dropdown',
              text: 'Customer Name',
              description: 'email@example.com',
              iconName: 'user-profile',
              onItemClick: (e) => handleNavigationClick(e.detail),
              items: [
                { id: 'profile', text: 'Profile' },
                { id: 'preferences', text: 'Preferences' },
                { id: 'security', text: 'Security' },
                {
                  id: 'support-group',
                  text: 'Support',
                  items: [
                    {
                      id: 'documentation',
                      text: 'Documentation',
                      href: '#',
                      external: true,
                      externalIconAriaLabel: ' (opens in new tab)'
                    },
                    { id: 'support', text: 'Support' },
                    {
                      id: 'feedback',
                      text: 'Feedback',
                      href: '#',
                      external: true,
                      externalIconAriaLabel: ' (opens in new tab)'
                    }
                  ]
                },
                { id: 'signout', text: 'Sign out' }
              ]
            }
          ]}
        />
      </div>
      <AppLayout
        contentType={contentType}
        navigation={navigation}
        notifications={notifications}
        stickyNotifications={true}
        tools={tools}
        content={children}
        headerSelector="#top-nav"
        ariaLabels={{
          navigation: 'Navigation drawer',
          navigationClose: 'Close navigation drawer',
          navigationToggle: 'Open navigation drawer',
          notifications: 'Notifications',
          tools: 'Help panel',
          toolsClose: 'Close help panel',
          toolsToggle: 'Open help panel'
        }}
      />
    </>
  )
}
