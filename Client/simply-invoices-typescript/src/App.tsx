import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { InvoiceTemplate } from './components/InvoiceTemplate'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import MainPage from './pages/MainPage'
import NewInvoicePage from './pages/NewInvoicePage'
import UserSettingsPage from './pages/UserSettingsPage'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useContext } from 'react'
import { AppContext } from './Context'
import PrivateRoute from './pages/PrivateRoute'
import { UserInfoInterface } from './interfaces'

function App() {
  const { addUserToContext, getInvoices, checkIfUserExists, addUserToDb } =
    useContext(AppContext)

  //auth0 stuff
  const {
    user: {
      email = '',
      sub: userId = '',
      nickname = '',
      name = '',
      picture = '',
    } = {},
  } = useAuth0()

  //check the database for the user id, if not in the database, add the user.
  useEffect(() => {
    if (userId) {
      checkIfUserExists(userId).then((data: UserInfoInterface) => {
        if (!data) {
          addUserToDb(email, userId, nickname, picture, name)
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
      <PrivateRoute>
        <div className="d-flex">
          <Sidebar />
          <div className="d-flex flex-column vw-100">
            <Navbar />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/invoice/:invoiceId" element={<NewInvoicePage />} />
              <Route path="/invoice/new" element={<NewInvoicePage />} />
              <Route
                path="/invoices/:invoiceId"
                element={<InvoiceTemplate />}
              />
              <Route path="/settings" element={<UserSettingsPage />} />
            </Routes>
          </div>
        </div>
      </PrivateRoute>
    </BrowserRouter>
  )
}

export default App
