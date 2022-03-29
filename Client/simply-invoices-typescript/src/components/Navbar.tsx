import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import '../styles/navbar.scss'

const Navbar: React.FC = () => {
  //auth0 stuff
  const { logout, loginWithRedirect, isAuthenticated } = useAuth0()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/" className="navbar-brand font-weight-bold">
        Simply<span className="info-color-span">Invoices</span>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        {isAuthenticated ? (
          <ul className="navbar-nav">
            <li className="mr-1 nav-item">
              <Link to="/" className="nav-link">
                Dashboard
              </Link>
            </li>

            <li className="mr-1 nav-item">
              <Link to="/settings" className="nav-link">
                Settings
              </Link>
            </li>
          </ul>
        ) : null}

        <button
          className="login-btn nav-link btn btn-info"
          onClick={
            isAuthenticated
              ? () => logout({ returnTo: window.location.origin })
              : loginWithRedirect
          }
        >
          {isAuthenticated ? 'Logout' : 'Login'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
