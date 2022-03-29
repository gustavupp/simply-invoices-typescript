import React, { useContext } from 'react'
import LandingPage from './LandingPage'
import { AppContext } from '../Context'

const PrivateRoute: React.FC = ({ children }: any) => {
  const {
    userInfo: { userId },
  } = useContext(AppContext)
  return userId && userId ? children : <LandingPage />
}
export default PrivateRoute
