import { RequireAuth } from 'helper/RequireAuth'
import DashboardPage from 'pages/dashboard-page'
import LandingPage from 'pages/landing-page'
import LoginPage from 'pages/login-page'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { Authenticator } from '@aws-amplify/ui-react'
import AuthenticatedTemplate from 'layouts/authenticated'
const router = createHashRouter([
  {
    path: '/',
    element: <LandingPage title="Racoon EDI" />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/dashboard',
    element: (
      <RequireAuth>
        <AuthenticatedTemplate>
          <DashboardPage />
        </AuthenticatedTemplate>
      </RequireAuth>
    )
  }
])

function App() {
  return (
    <Authenticator.Provider>
      <RouterProvider router={router} />
    </Authenticator.Provider>
  )
}

export default App
