import React, { useRef, useContext, useEffect, useState } from 'react'
import { Invoice, lineItems } from '../interfaces'
import { downloadInvoice } from '../html2pdf'
import { Link, useParams } from 'react-router-dom'
import { AppContext } from '../Context'
import { FiPhoneCall, FiMail } from 'react-icons/fi'
import { FaDownload } from 'react-icons/fa'
import '../styles/invoiceTemplate.scss'

export function InvoiceTemplate() {
  const { invoices, userInfo: { email = '', mobile = '' } = {} } =
    useContext(AppContext)
  const [subtotal, setSubtotal] = useState<number | undefined>(0)
  const [invoiceFrom, setInvoiceFrom] = useState<string>('')
  const [billTo, setBillTo] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [invoiceNumber, setInvoiceNumber] = useState<number>(0)
  const [image, setImage] = useState<any>(null)
  const [lineItems, setLineItems] = useState<lineItems[]>([])
  const [paymentDetails, setPaymentDetails] = useState<string>('')
  const [notes, setNotes] = useState<string>('')

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
      } = invoices.find(
        (item: Invoice) => item.invoiceId === parseInt(invoiceId)
      )
      setSubtotal(subtotal)
      setInvoiceFrom(invoiceFrom)
      setBillTo(billTo)
      setDate(date)
      setInvoiceNumber(invoiceNumber)
      setImage(image)
      setLineItems(lineItems)
      setPaymentDetails(paymentDetails)
      setNotes(notes)
    }
  }, [invoiceId, invoices])

  return (
    <main className="container my-5">
      <div>
        <div className="invoice" ref={invoice}>
          <div className="invoice-company text-inverse f-w-600">
            {image ? (
              <img
                src={`https://simply-invoice-app.herokuapp.com/${image}`}
                alt="logo"
                style={{ width: '150px', borderRadius: '10px' }}
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
                    <th className="text-center" style={{ width: '10%' }}>
                      RATE
                    </th>
                    <th className="text-center" style={{ width: '10%' }}>
                      HOURS
                    </th>
                    <th className="text-right" style={{ width: '20%' }}>
                      LINE TOTAL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems
                    ? React.Children.toArray(
                        lineItems.map((item: lineItems) => {
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
          <div className="invoice-footer">
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
          <button
            className="btn btn-info mx-2"
            onClick={() => downloadInvoice(invoiceNumber, invoice.current)}
          >
            <FaDownload /> Download
          </button>
        </div>
      </div>
    </main>
  )
}
