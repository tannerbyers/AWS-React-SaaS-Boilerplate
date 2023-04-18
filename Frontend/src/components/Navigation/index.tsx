// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react'
import SideNavigation, {
  SideNavigationProps
} from '@cloudscape-design/components/side-navigation'

const items: SideNavigationProps['items'] = [
  { type: 'link', text: 'Dashboard', href: '#/dashboard/home' }
]

interface NavigationProps {
  activeHref: string
  setActiveHref: (activeHref: string) => void
}

export default function Navigation({
  activeHref,
  setActiveHref
}: NavigationProps) {
  return (
    <>
      <SideNavigation
        activeHref={activeHref}
        onFollow={(event) => {
          if (!event.detail.external) {
            event.preventDefault()
            setActiveHref(event.detail.href)
          }
        }}
        header={{ href: '/', text: '' }}
        items={items}
      />
    </>
  )
}
