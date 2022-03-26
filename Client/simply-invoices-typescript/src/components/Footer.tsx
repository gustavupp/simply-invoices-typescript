import React from 'react'
import '../styles/footer.scss'

const Footer: React.FC = () => {
  return (
    <footer className="page-footer font-small text-white bg-dark d-flex justify-content-center align-items-center">
      <div className="footer-copyright text-center py-3">
        © {new Date().getFullYear()} Copyright |&nbsp;
        <span className="font-weight-bold">
          Simply
          <span className="info-color-span">Invoices</span>
        </span>
      </div>
    </footer>
  )
}

export default Footer
