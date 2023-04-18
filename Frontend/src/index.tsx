import { createRoot } from 'react-dom/client'
import App from 'components/App'
import { Amplify } from 'aws-amplify'
import 'virtual:windi.css'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

Amplify.configure({
  aws_cognito_region: 'us-east-1', // (required) - Region where Amazon Cognito project was created
  aws_user_pools_id: import.meta.env.VITE_USER_POOL_ID, // (optional) -  Amazon Cognito User Pool ID
  aws_user_pools_web_client_id: import.meta.env.VITE_WEB_CLIENT_ID // (optional) - Amazon Cognito App Client ID (App client secret needs to be disabled)
})

root.render(<App />)
