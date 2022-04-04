import React, { useContext } from 'react'
import '../styles/navbar.scss'
import { AppContext } from '../Context'

const Navbar: React.FC = () => {
  const {
    isSidebarOpen,
    setSidebarOpen,
    userInfo: { picture, nickname, userId },
  } = useContext(AppContext)

  return (
    <nav className="navbar navbar-expand-lg navbar-light p-3 d-flex justify-content-between">
      <button
        className="btn btn-outline-info"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {userId ? (
        <div className=" d-flex align-items-center justify-content-start">
          <small>Welcome {nickname}</small>
          <img
            src={picture}
            alt="profile"
            width="50px"
            style={{ borderRadius: '50%', margin: '0 20px' }}
          />
        </div>
      ) : null}
    </nav>
  )
}

export default Navbar
