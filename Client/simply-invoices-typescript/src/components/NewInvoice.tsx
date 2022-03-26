import React, { useContext, useRef, useState, useEffect } from 'react'
//interfaces
import { lineItems } from '../interfaces'
//components
import Loading from './Loading'
import { AppContext } from '../Context'
//libraries
import { AiOutlineClose, AiFillEdit } from 'react-icons/ai'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

export const NewInvoice: React.FC = () => {
  //const [theme, setTheme] = useState('info')
  //auth0 stuff. Grab userId from auth0
  const { user: { sub: userId } = {} } = useAuth0()
  let navigate = useNavigate()

  const {
    invoices,
    isEditingInvoice,
    postInvoiceToServer,
    updateInvoice,
    deleteInvoice,
    setIsInvoiceLoading,
    isInvoiceLoading,
    setIsEditingInvoice,
    userInfo: {
      notes: userNotes = '',
      paymentDetails: userPaymentDetails = '',
    } = {},
  } = useContext(AppContext)

  let { invoiceId } = useParams()
  const imageOutput = useRef(null)

  const [subtotal, setSubtotal] = useState<number>(0)
  const [invoiceNumber, setInvoiceNumber] = useState<number>(0)
  const [invoiceFrom, setInvoiceFrom] = useState<string>('')
  const [billTo, setBillTo] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [image, setImage] = useState<any>(null)
  const [lineItems, setLineItems] = useState<lineItems[]>([])
  const [imageThumbnail, setImageThumbnail] = useState<string>(
    'https://socialimpact.com/wp-content/uploads/2021/03/logo-placeholder-300x210.jpg'
  )
  const [paymentDetails, setPaymentDetails] = useState<string>('')
  const [notes, setNotes] = useState<string>('')

  const [lineItemTotal, setLineItemTotal] = useState<number>(0)
  const [service, setService] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(0)
  const [rate, setRate] = useState<number>(0)

  const [editingLineItemId, setEditingLineItemId] = useState<
    number | null | string
  >('')
  const [isEditingLineItem, setIsEditingLineItem] = useState<boolean>(false)

  //when component loads and the invoices array is not empty, look for the given id in the array and populate the fields
  useEffect(() => {
    if (invoiceId && invoices.length > 0) {
      setIsEditingInvoice(true)
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
      } = invoices.find((item: { invoiceId: number }) => {
        if (invoiceId) return item.invoiceId === parseInt(invoiceId)
      })
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
    // eslint-disable-next-line
  }, [invoiceId, invoices])

  //populate notes and details fields with user info
  useEffect(() => {
    if (!invoiceId) {
      setPaymentDetails(userPaymentDetails)
      setNotes(userNotes)
    }
    // eslint-disable-next-line
  }, [])

  //updates current total
  useEffect(() => {
    let total = lineItems?.reduce((acc, cur) => {
      acc += cur.lineItemTotal
      return acc
    }, 0)
    setSubtotal(total)
  }, [lineItems])

  //updates line item total
  useEffect(() => {
    if (rate) {
      setLineItemTotal(rate * quantity)
    }
  }, [rate, quantity])

  //adds a line item
  const addLineItem = () => {
    if (isEditingLineItem && lineItems) {
      let updatedItemList: lineItems[] = lineItems.map((item) => {
        if (item.id === editingLineItemId) {
          item.service = service
          item.rate = rate
          item.quantity = quantity
          item.lineItemTotal = lineItemTotal
        }
        return item
      })
      setLineItems(updatedItemList)
    } else if (quantity && rate) {
      let newItem: lineItems = {
        id: Date.now(),
        service,
        quantity,
        rate,
        lineItemTotal,
      }
      setLineItems(lineItems && [...lineItems, newItem])
    }
    //reset fields
    setQuantity(0)
    setRate(0)
    setLineItemTotal(0)
    setService('')
    setIsEditingLineItem(false)
  }

  //deletes a line item
  const deleteLineItem = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: any
  ) => {
    e.preventDefault()
    if (lineItems) {
      let tempLineItems: lineItems[] = lineItems.filter(
        (item) => item.id !== id
      )
      setLineItems(tempLineItems)
    }
  }

  //edits a line item
  const editLineItem = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: any
  ) => {
    e.preventDefault()
    if (lineItems) {
      let editingLineItem: lineItems | undefined = lineItems.find(
        (item) => item.id === id
      )
      if (editingLineItem) {
        setRate(editingLineItem.rate)
        setQuantity(editingLineItem.quantity)
        setService(editingLineItem.service)
        setLineItemTotal(editingLineItem.lineItemTotal)
        setEditingLineItemId(editingLineItem.id)
        setIsEditingLineItem(true)
      }
    }
  }

  //loads image preview
  const loadImageFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files !== null) {
      setImageThumbnail(URL.createObjectURL(e.target.files[0]))
      setImage(e.target.files[0])
    }
  }

  if (isInvoiceLoading) return <Loading />

  const handleCreateOrSave = () => {
    //if main fields are empty return an alert
    if (
      !invoiceFrom ||
      !invoiceNumber ||
      !billTo ||
      !date ||
      lineItems.length === 0
    )
      return alert('Please, fill the required fields')

    //otherwise proceed
    if (isEditingInvoice && userId && invoiceId) {
      setIsInvoiceLoading(true)
      updateInvoice(
        userId,
        parseInt(invoiceId),
        invoiceFrom,
        billTo,
        invoiceNumber,
        date,
        subtotal,
        image,
        lineItems,
        paymentDetails,
        notes
      ).then(() => navigate('/'))
    } else if (userId) {
      setIsInvoiceLoading(true)
      postInvoiceToServer(
        invoiceFrom,
        billTo,
        invoiceNumber,
        date,
        subtotal,
        image,
        lineItems,
        paymentDetails,
        notes,
        userId
      ).then(() => navigate('/'))
    }
  }

  return (
    <main className="container my-5 py-3">
      <form>
        <section className=" row mb-3">
          <div className="input-group col-sm-12 col-md-8">
            <div className="input-group-prepend">
              <span className="input-group-text">Upload</span>
            </div>
            <div className="custom-file">
              <input
                type="file"
                accept="image/*"
                name="image"
                className="custom-file-input"
                id="file"
                onChange={(e) => loadImageFile(e)}
              />

              <label className="custom-file-label" htmlFor="file">
                Choose Logo Image
              </label>
            </div>
          </div>
        </section>

        <p>
          <img
            id="output"
            //if image variable is coming from db its value is a string(a path)
            src={
              typeof image === 'string'
                ? `https://simply-invoice-app.herokuapp.com/${image}`
                : imageThumbnail
            }
            alt="invoice logo"
            width="150px"
            style={{ borderRadius: '10px' }}
            ref={imageOutput}
          />
        </p>

        <section className="row mb-3">
          <div className="form-group col-sm-12 col-md-5">
            <label htmlFor="invoiceFrom">From</label>
            <input
              type="text"
              className="form-control "
              id="invoiceFrom"
              name="invoiceFrom"
              value={invoiceFrom}
              onChange={(e) => setInvoiceFrom(e.target.value)}
              placeholder="Who is this invoice from?"
            />
          </div>
          <div className="form-group col-sm-12 col-md-5">
            <label htmlFor="billTo">Bill To</label>
            <input
              type="text"
              className="form-control"
              id="billTo"
              name="billTo"
              value={billTo}
              onChange={(e) => setBillTo(e.target.value)}
              placeholder="Who is this invoice to?"
            />
          </div>
          <div className="col-sm-12 col-md-2">
            <div className="form-group">
              <label htmlFor="number">Invoice Nº</label>
              <input
                type="number"
                className="form-control"
                id="number"
                name="invoiceNumber"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(parseFloat(e.target.value))}
                placeholder="#1"
              />
            </div>
          </div>
        </section>

        <section className="row mb-3">
          <div className="col-sm-12 col-md-4">
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section style={{ borderRadius: '10px' }} className="table-responsive">
          <table
            style={{ borderRadius: '10px' }}
            className="table table-info"
            //className={`table table-${theme}`}
          >
            <thead className="thead-dark">
              <tr>
                <th scope="col">Service</th>
                <th scope="col">Quantity</th>
                <th scope="col">Rate</th>
                <th scope="col">Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    style={{ width: '100%' }}
                    type="text"
                    name="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    placeholder=" Description of service..."
                  />
                </td>
                <td>
                  <input
                    style={{ width: '50px' }}
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(parseFloat(e.target.value))}
                    placeholder=" Quantity"
                  />
                </td>
                <td>
                  <input
                    style={{ width: '70px' }}
                    type="number"
                    name="rate"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value))}
                    placeholder=" $"
                  />
                </td>
                <td>${lineItemTotal}</td>
              </tr>

              {lineItems &&
                lineItems.map((item, index) => {
                  const { service, quantity, rate, lineItemTotal, id } = item
                  return (
                    <tr key={index}>
                      <td>{service}</td>
                      <td>{quantity} </td>
                      <td>{rate}</td>
                      <td>${lineItemTotal}</td>
                      <td>
                        <button
                          className="btn"
                          onClick={(e) => editLineItem(e, id)}
                        >
                          <AiFillEdit />
                        </button>
                        <button
                          className="btn"
                          onClick={(e) => deleteLineItem(e, id)}
                        >
                          <AiOutlineClose />
                        </button>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </section>

        {
          <button
            className="btn btn-info mr-3"
            type="button"
            id="btn"
            onClick={addLineItem}
          >
            {isEditingLineItem ? 'Save' : '+ Item'}
          </button>
        }

        <section className="row my-4">
          <div className="form-group col-sm">
            <label htmlFor="paymentDetails">Payment Details</label>
            <textarea
              className="form-control"
              id="paymentDetails"
              name="paymentDetails"
              rows={4}
              value={paymentDetails ? paymentDetails : ''} //when empty its value comes back as null from the db and react complains. had to add this ternary to fix that.
              onChange={(e) => setPaymentDetails(e.target.value)}
              placeholder="Any payment details?"
            />
          </div>

          <div className="col-sm">
            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea
                className="form-control"
                name="notes"
                id="notes"
                rows={4}
                value={notes ? notes : ''} //when empty its value comes back as null from the db and react complains. had to add this ternary to fix that.
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any notes?"
              />
            </div>
          </div>
        </section>
      </form>

      <div className="d-flex justify-content-end m-2">
        <h5>Subtotal:&nbsp; </h5>
        <h5> ${subtotal}</h5>
      </div>

      <div className="d-flex justify-content-between m-2">
        <Link to="/" className="btn btn-secondary">
          Back
        </Link>

        <button
          className="btn btn-danger"
          onClick={() => {
            if (invoiceId && userId) {
              deleteInvoice(parseInt(invoiceId), userId).then(() =>
                navigate('/')
              )
            }
          }}
        >
          Delete
        </button>

        <button className="btn btn-info" onClick={handleCreateOrSave}>
          {isEditingInvoice ? 'Save Invoice' : 'Create Invoice'}
        </button>
      </div>
    </main>
  )
}
