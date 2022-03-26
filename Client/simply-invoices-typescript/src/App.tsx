import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { InvoiceTemplate } from './components/InvoiceTemplate'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MainPage from './pages/MainPage'
import NewInvoicePage from './pages/NewInvoicePage'
import UserSettingsPage from './pages/UserSettingsPage'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useContext } from 'react'
import { AppContext } from './Context'
import PrivateRoute from './pages/PrivateRoute'
import { UserInfoInterface } from './interfaces'
import UserInfo from './components/UserInfo'

function App() {
  const { addUserToContext, getInvoices, checkIfUserExists, addUserToDb } =
    useContext(AppContext)

  //auth0 stuff
  const { user: { email = '', sub: userId = '' } = {} } = useAuth0()

  //chech the database for the user id, if not in the database, add the user.
  useEffect(() => {
    if (userId) {
      checkIfUserExists(userId).then((data: UserInfoInterface) => {
        if (Object.keys(data).length === 0) {
          addUserToDb(email, userId)
            .then(() => checkIfUserExists(userId))
            .then((data: UserInfoInterface) => {
              addUserToContext(data)
              getInvoices(userId)
            })
        } else {
          addUserToContext(data)
          getInvoices(userId)
        }
      })
    }
    // eslint-disable-next-line
  }, [userId])

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />

        <Route path="/invoice/:invoiceId" element={<NewInvoicePage />} />
        <Route path="/invoice/new" element={<NewInvoicePage />} />
        <Route path="/invoices/:invoiceId" element={<InvoiceTemplate />} />
        <Route path="/settings" element={<UserSettingsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
