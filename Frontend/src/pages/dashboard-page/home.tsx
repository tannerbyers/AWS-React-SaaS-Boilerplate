import React, { FC } from 'react'
import { Auth } from 'aws-amplify'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthenticator } from '@aws-amplify/ui-react'
import Shell from 'layouts/shell'
import ContentLayout from '@cloudscape-design/components/content-layout'
import Grid from '@cloudscape-design/components/grid'
import Header from '@cloudscape-design/components/header'
import Link from '@cloudscape-design/components/link'
import HelpPanel from '@cloudscape-design/components/help-panel'
import Container from '@cloudscape-design/components/container'

import Navigation from 'components/Navigation'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Home: FC<Props> = () => {
  return <h2 style={{ color: 'white' }}>Home Page</h2>
}

export default Home
