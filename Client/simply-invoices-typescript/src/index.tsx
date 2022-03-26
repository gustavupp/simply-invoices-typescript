import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
import App from './App'
import { AppProvider } from './Context'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Auth0Provider
        domain="dev-gus.au.auth0.com"
        clientId="i1lkh5e6rCXheQzCNXCaNxnVRbQfxT43"
        redirectUri={window.location.origin}
      >
        <App />
      </Auth0Provider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
