import React from 'react'
import '../styles/footer.css'

const Footer = () => {
  return (
    <footer className="page-footer font-small text-white bg-dark d-flex justify-content-center align-items-center">
      <div className="footer-copyright text-center py-3">
        © {new Date().getFullYear()} Copyright{' '}
        <span className="font-weight-bold">
          Simply<span style={{ color: '#17A2B8' }}>Invoices</span>
        </span>
      </div>
    </footer>
  )
}

export default Footer
