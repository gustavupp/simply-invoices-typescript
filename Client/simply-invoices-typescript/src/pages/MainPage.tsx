import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../Context'
import { AiFillEdit } from 'react-icons/ai'
import { BiShowAlt } from 'react-icons/bi'
import Pagination from '../components/Pagination'
import Loading from '../components/Loading'

const MainPage: React.FC = (): JSX.Element => {
  const {
    invoices,
    setIsEditingInvoice,
    isPaginationLoading,
    totals: { fiscalYearTotal, globalTotal },
  } = useContext(AppContext)

  if (isPaginationLoading) return <Loading />

  return (
    <main style={{ minHeight: '70vh' }} className="container my-5 min-vh-100">
      {/* ************TOTALS TABLE******** */}
      <div
        style={{ borderRadius: '10px' }}
        className="table-responsive my-4 w-75"
      >
        <table
          style={{ borderRadius: '10px' }}
          // className={`table table-invoice table-${theme}`}
          className="table table-sm table-invoice table-dark"
        >
          <thead className="thead-dark">
            <tr>
              <th className="text-center">Global Total</th>
              <th className="text-center">Fiscal Year Total</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="text-center">
                <strong>${globalTotal}</strong>
              </td>
              <td className="text-center">
                <strong>${fiscalYearTotal}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ************INVOICES TABLE******** */}
      {invoices.length > 0 ? (
        <div style={{ borderRadius: '10px' }} className="table-responsive my-4">
          <table
            style={{ borderRadius: '10px' }}
            //className={`table table-invoice table-${theme}`}
            className="table table-sm table-invoice table-dark table table-striped"
          >
            <thead className="thead-dark">
              <tr>
                <th scope="col" className="text-center">
                  №
                </th>
                <th scope="col" className="text-center">
                  Bill To
                </th>

                <th scope="col" className="text-center">
                  Total
                </th>
                <th scope="col" className="text-center">
                  Date
                </th>
                <th scope="col" className="text-center"></th>
              </tr>
            </thead>
            <tbody>
              {invoices &&
                //this built in method assigns a key to every child
                React.Children.toArray(
                  invoices.map((item) => {
                    const { billTo, invoiceNumber, subtotal, date, invoiceId } =
                      item
                    return (
                      <tr>
                        <td className="text-center">{invoiceNumber}</td>
                        <td className="text-center">{billTo}</td>
                        <td className="text-center">${subtotal}</td>
                        <td className="text-center">{date}</td>
                        <td className="text-center d-flex flex-direction-row ">
                          <Link
                            to={`/invoices/${invoiceId}`}
                            className="btn btn-outline-info mr-2 mb-1 p-1"
                          >
                            <BiShowAlt style={{ fontSize: '22px' }} />
                          </Link>
                          <Link
                            to={`/invoice/${invoiceId}`}
                            className="btn btn-outline-info mr-2 mb-1 p-1"
                            onClick={() => setIsEditingInvoice(true)}
                          >
                            <AiFillEdit style={{ fontSize: '22px' }} />
                          </Link>
                        </td>
                      </tr>
                    )
                  })
                )}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center my-5">
          Looks like you haven't created your first invoice yet... Create your
          first one with a few clicks! 😀
        </p>
      )}

      <Pagination />
      <br />
      <Link
        to="/invoice/new"
        type="button"
        className="btn btn-outline-light"
        onClick={() => setIsEditingInvoice(false)}
      >
        New Invoice
      </Link>
    </main>
  )
}

export default MainPage
