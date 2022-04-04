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
    <main style={{ minHeight: '70vh' }} className="container my-5 ">
      {/* ************TOTALS TABLE******** */}
      <div
        style={{ borderRadius: '10px' }}
        className="table-responsive my-4 w-75"
      >
        <table
          style={{ borderRadius: '10px' }}
          // className={`table table-invoice table-${theme}`}
          className="table table-sm table-invoice table-info"
        >
          <thead className="thead-dark">
            <tr>
              <th className="text-center">GLOBAL TOTAL</th>
              <th className="text-center">FISCAL YEAR TOTAL</th>
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
            className="table table-sm table-invoice table-info"
          >
            <thead className="thead-dark">
              <tr>
                <th scope="col" className="text-center">
                  No.
                </th>
                <th scope="col" className="text-center">
                  FROM
                </th>
                <th scope="col" className="text-center">
                  TO
                </th>

                <th scope="col" className="text-center">
                  TOTAL
                </th>
                <th scope="col" className="text-center">
                  DATE
                </th>
                <th scope="col" className="text-center">
                  VIEW | EDIT
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices &&
                //this built in method assigns a key to every child
                React.Children.toArray(
                  invoices.map((item) => {
                    const {
                      billTo,
                      invoiceFrom,
                      invoiceNumber,
                      subtotal,
                      date,
                      invoiceId,
                    } = item
                    return (
                      <tr>
                        <td className="text-center">#{invoiceNumber}</td>
                        <td className="text-center">{invoiceFrom}</td>
                        <td className="text-center">{billTo}</td>

                        <td className="text-center">${subtotal}</td>
                        <td className="text-center">{date}</td>
                        <td className="text-center">
                          <Link
                            to={`/invoices/${invoiceId}`}
                            className="btn btn-primary mr-2 mb-1 p-1"
                          >
                            <BiShowAlt style={{ fontSize: '22px' }} />
                          </Link>
                          <Link
                            to={`/invoice/${invoiceId}`}
                            className="btn btn-info mr-2 mb-1 p-1"
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
        className="btn btn-info"
        onClick={() => setIsEditingInvoice(false)}
      >
        New Invoice
      </Link>
    </main>
  )
}

export default MainPage
