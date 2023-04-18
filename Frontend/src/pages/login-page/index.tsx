import { FC, useEffect } from 'react'

import { Authenticator, useAuthenticator, View } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

import { useNavigate, useLocation } from 'react-router-dom'
import '@cloudscape-design/global-styles/index.css'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const LoginPage: FC<Props> = () => {
  const { route } = useAuthenticator((context) => [context.route])
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/dashboard'
  useEffect(() => {
    if (route === 'authenticated') {
      navigate(from, { replace: true })
    }
  }, [route, navigate, from])
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '90vh' }}>
      <Authenticator loginMechanisms={['email']} />
    </div>
  )
}

export default LoginPage
