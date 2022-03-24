import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import LandingPage from './LandingPage'

const PrivateRoute = ({ children }) => {
  const { user } = useAuth0()
  return user && Object.keys(user).length > 0 ? children : <LandingPage />
}
export default PrivateRoute
