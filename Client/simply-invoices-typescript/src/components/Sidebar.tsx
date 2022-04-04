import { useState, useContext, useEffect } from 'react'
import { AppContext } from '../Context'
import '../styles/sidebar.scss'
import {
  FaTachometerAlt,
  FaAngleRight,
  FaUser,
  FaSignOutAlt,
  FaAngleLeft,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const Sidebar: React.FC = (): JSX.Element => {
  const [winSize, setWinSize] = useState<number>(0)
  const { isSidebarOpen } = useContext(AppContext)
  const [isSidebarClosed, setIsSidebarClosed] = useState<boolean>(true)
  const [skinnySidebar, setSkinnySidebar] = useState<boolean>(true)
  //auth0 stuff
  const { logout, loginWithRedirect, isAuthenticated } = useAuth0()

  const checkSize = () => {
    setWinSize(window.innerWidth)
    if (winSize < 768) setSkinnySidebar(true)
    else setSkinnySidebar(false)
  }

  useEffect(() => {
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  })

  if (!isSidebarOpen) return <></>

  return (
    <aside
      className={
        isSidebarClosed
          ? 'min-vh-100 bg-dark text-center'
          : 'min-vh-100 bg-dark min-vw-25'
      }
    >
      <ul>
        <div className="sidebar-brand-text mx-3 my-5 text-white">
          <Link to="/" className="nav-link text-white">
            {isSidebarClosed ? (
              <>
                S<span className="text-info">I</span>
              </>
            ) : (
              <>
                Simply<span className="text-info">Invoices</span>
              </>
            )}
          </Link>
        </div>

        <li className="nav-item active mb-2">
          <Link to="/" className="nav-link text-white ">
            {isSidebarClosed ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <FaTachometerAlt />
                <small className="">Dash</small>
              </div>
            ) : (
              <>
                <FaTachometerAlt /> &nbsp; Dashboard
              </>
            )}
          </Link>
        </li>

        <li className="nav-item active mb-2">
          <Link to="/settings" className="nav-link text-white">
            {isSidebarClosed ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <FaUser />
                <small className="">Settings</small>
              </div>
            ) : (
              <>
                <FaUser /> &nbsp; Settings
              </>
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
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <FaSignOutAlt />
                  <small className="">Logout</small>
                </div>
              ) : (
                <>
                  <FaSignOutAlt /> &nbsp; Logout
                </>
              )}
            </button>
          </div>
        </li>
      </ul>

      {skinnySidebar ? null : (
        <div className="text-center mt-5">
          <button
            className="btn btn-outline-info"
            onClick={() => setIsSidebarClosed(!isSidebarClosed)}
          >
            {isSidebarClosed ? <FaAngleRight /> : <FaAngleLeft />}
          </button>
        </div>
      )}
    </aside>
  )
}

export default Sidebar
