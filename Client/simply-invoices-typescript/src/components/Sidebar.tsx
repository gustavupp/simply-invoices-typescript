import { useState, useContext } from 'react'
import { AppContext } from '../Context'
import '../styles/sidebar.scss'
import {
  FaTachometerAlt,
  FaAngleRight,
  FaUser,
  FaSignOutAlt,
  FaAngleLeft,
} from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const Sidebar: React.FC = (): JSX.Element => {
  let { pathname } = useLocation()
  const { isSidebarOpen } = useContext(AppContext)
  const [isSidebarClosed, setIsSidebarClosed] = useState<boolean>(true)

  //auth0 stuff
  const { logout, loginWithRedirect, isAuthenticated } = useAuth0()

  if (!isSidebarOpen) return <></>

  return (
    <aside
      className={
        isSidebarClosed
          ? 'min-vh-100 bg-dark text-center mr-2'
          : 'min-vh-100 bg-dark min-vw-25 mr-2'
      }
    >
      <ul>
        <div className="sidebar-brand-text mx-3 my-5 text-white">
          <Link to="/" className="nav-link text-white">
            {isSidebarClosed ? (
              <>
                <strong>
                  S<span className="text-success">I</span>
                </strong>
              </>
            ) : (
              <>
                Simply<span className="text-success">Invoices</span>
              </>
            )}
          </Link>
        </div>

        <li className="nav-item active mb-2">
          <Link
            to="/"
            className={
              pathname === '/'
                ? 'nav-link text-white activeLink'
                : 'nav-link text-white'
            }
          >
            {isSidebarClosed ? (
              <div className="sidebar-links d-flex flex-column justify-content-center align-items-center">
                <FaTachometerAlt className="icons" />
                <small className="">Dash</small>
              </div>
            ) : (
              <div className="sidebar-links">
                <FaTachometerAlt className="icons" /> &nbsp; Dashboard
              </div>
            )}
          </Link>
        </li>

        <li className="nav-item active mb-2">
          <Link
            to="/settings"
            className={
              pathname === '/settings'
                ? 'nav-link text-white activeLink'
                : 'nav-link text-white'
            }
          >
            {isSidebarClosed ? (
              <div className="sidebar-links d-flex flex-column justify-content-center align-items-center">
                <FaUser className="icons" />
                <small className="">Settings</small>
              </div>
            ) : (
              <div className="sidebar-links">
                <FaUser className="icons" /> &nbsp; Settings
              </div>
            )}
          </Link>
        </li>

        <li className="nav-item active mb-2">
          <div
            className={
              isSidebarClosed
                ? 'd-flex justify-content-center'
                : 'd-flex justify-content-start'
            }
          >
            <button
              className="nav-link text-white btn btn-muted"
              onClick={
                isAuthenticated
                  ? () => logout({ returnTo: window.location.origin })
                  : loginWithRedirect
              }
            >
              {isSidebarClosed ? (
                <div className="sidebar-links d-flex flex-column justify-content-center align-items-center">
                  <FaSignOutAlt className="icons" />
                  <small className="">Logout</small>
                </div>
              ) : (
                <div className=" sidebar-links">
                  <FaSignOutAlt className="icons" /> &nbsp; Logout
                </div>
              )}
            </button>
          </div>
        </li>
      </ul>

      <div
        className={
          isSidebarClosed ? 'expand-btn text-center mt-5' : 'text-center mt-5'
        }
      >
        <button
          className="btn btn-outline-info"
          onClick={() => setIsSidebarClosed(!isSidebarClosed)}
        >
          {isSidebarClosed ? <FaAngleRight /> : <FaAngleLeft />}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
