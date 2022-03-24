import React, { useRef, useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppContext } from '../Context'
import { FiPhoneCall, FiMail } from 'react-icons/fi'
import { FaDownload } from 'react-icons/fa'
import '../styles/invoiceTemplate.css'

export function InvoiceTemplate() {
  const {
    invoices,
    userInfo: [{ email = '', mobile = '' } = {}],
  } = useContext(AppContext)
  const [subtotal, setSubtotal] = useState('')
  const [invoiceFrom, setInvoiceFrom] = useState('')
  const [billTo, setBillTo] = useState('')
  const [date, setDate] = useState('')
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [image, setImage] = useState('')
  const [lineItems, setLineItems] = useState('')
  const [paymentDetails, setPaymentDetails] = useState('')
  const [notes, setNotes] = useState('')

  const invoice = useRef(null)
  const { invoiceId } = useParams()

  //when component loadeds and the invoices array is not empty, look for the given id in the array and populate the fields
  useEffect(() => {
    if (invoiceId && invoices.length > 0) {
      let {
        subtotal,
        invoiceFrom,
        billTo,
        date,
        invoiceNumber,
        image,
        lineItems,
        paymentDetails,
        notes,
      } = invoices.find((item) => item.invoiceId === parseInt(invoiceId))
      setSubtotal(subtotal)
      setInvoiceFrom(invoiceFrom)
      setBillTo(billTo)
      setDate(date)
      setInvoiceNumber(invoiceNumber)
      setImage(image)
      setLineItems(JSON.parse(lineItems))
      setPaymentDetails(paymentDetails)
      setNotes(notes)
    }
  }, [invoiceId, invoices])

  const downloadInvoice = () => {
    let opt = {
      margin: 0,
      filename: `invoice-${invoiceNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { dpi: 192, scale: 4, letterRendering: true, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    }
    window.html2pdf(invoice.current, opt)
  }

  return (
    <main className="container my-5">
      <div>
        <div className="invoice" ref={invoice}>
          <div className="invoice-company text-inverse f-w-600">
            {image ? (
              <img
                src={`https://simply-invoice-app.herokuapp.com/${image}`}
                alt="logo"
                width="250px"
              />
            ) : null}
          </div>

          <div className="invoice-header">
            <div className="invoice-from">
              <p>from</p>
              <address className="m-t-5 m-b-5">
                <strong>{invoiceFrom}</strong>
              </address>
            </div>
            <div className="invoice-to">
              <p>to</p>
              <address className="m-t-5 m-b-5">
                <strong>{billTo}</strong>
              </address>
            </div>
            <div className="invoice-date">
              <p>Invoice</p>
              <div className="date text-inverse m-t-5">{date}</div>
              <div className="invoice-detail">#{invoiceNumber}</div>
            </div>
          </div>

          <div className="invoice-content">
            <div className="table-responsive">
              <table className="table table-invoice">
                <thead>
                  <tr>
                    <th>PRODUCT / SERVICE</th>
                    <th className="text-center" width="10%">
                      RATE
                    </th>
                    <th className="text-center" width="10%">
                      HOURS
                    </th>
                    <th className="text-right" width="20%">
                      LINE TOTAL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems
                    ? React.Children.toArray(
                        lineItems.map((item) => {
                          const { service, rate, quantity, lineItemTotal } =
                            item
                          return (
                            <tr>
                              <td>
                                <span className="text-inverse">{service}</span>
                              </td>
                              <td className="text-center">${rate}</td>
                              <td className="text-center">{quantity}</td>
                              <td className="text-right">${lineItemTotal}</td>
                            </tr>
                          )
                        })
                      )
                    : null}
                </tbody>
              </table>
            </div>

            <div className="invoice-price">
              <div className="invoice-price-left">
                <div className="invoice-price-row">
                  <div className="sub-price">
                    <small>SUBTOTAL</small>
                    <span className="text-inverse">${subtotal}</span>
                  </div>
                  <div className="sub-price">
                    <i className="fa fa-plus text-muted"></i>
                  </div>
                  <div className="sub-price">
                    <small>PAYPAL FEE (0%)</small>
                    <span className="text-inverse">$0.00</span>
                  </div>
                </div>
              </div>
              <div className="invoice-price-right">
                <small>TOTAL</small>
                <span className="f-w-600">${subtotal}</span>
              </div>
            </div>
          </div>
          <div>
            <pre>{paymentDetails}</pre>
            <pre>{notes}</pre>
          </div>
          <hr />
          <div>
            <p className="text-center ">
              <strong>THANK YOU {billTo}!</strong>
            </p>
            <p className="text-center">
              <FiPhoneCall /> {mobile} | <FiMail /> {email}
            </p>
          </div>
        </div>
        <br />
        <div className="d-flex justify-content-between">
          <Link to="/" className="btn btn-secondary mx-2">
            Back
          </Link>
          <button className="btn btn-info mx-2" onClick={downloadInvoice}>
            <FaDownload /> Download
          </button>
        </div>
      </div>
    </main>
  )
}
