import landingPageImage from '../assets/landingPageImage.png'
import { useAuth0 } from '@auth0/auth0-react'
import '../styles/landingPage.scss'

const LandingPage = () => {
  //auth0 stuff
  const { loginWithRedirect } = useAuth0()

  return (
    <main className="wrapper container row text-center mx-auto py-5 align-items-center">
      <div className="hero-title col-md-12 col-lg-6">
        <h1 className="font-weight-bold">
          Simply<span style={{ color: '#17A2B8' }}>Invoice</span>
        </h1>
        <p>
          The boring task of invoicing made easy! Signup to start simplifying
          how you create invoices.
        </p>
        <button onClick={loginWithRedirect} className="btn btn-info">
          Login | Signup
        </button>
      </div>
      <div className="image-container col-md-12 col-lg-6">
        <img
          src={landingPageImage}
          className="main-image"
          alt="multiple devices"
        />
      </div>
    </main>
  )
}

export default LandingPage
