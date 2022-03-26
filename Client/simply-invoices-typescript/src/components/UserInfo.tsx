import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../Context'
import Loading from './Loading'

const UserInfo: React.FC = () => {
  const navigate = useNavigate()
  const {
    userInfo: { email, mobile, notes, paymentDetails, signUpDate, userId },
    updateUserSettings,
    isUserSettingsLoading,
  } = useContext(AppContext)
  const [id, setId] = useState(userId)
  const [userEmail, setUserEmail] = useState(email)
  const [userMobile, setUserMobile] = useState(mobile)
  const [userSignUpDate, setUserSignUpDate] = useState(signUpDate)
  const [userPaymentDetails, setUserPaymentDetails] = useState(paymentDetails)
  const [userNotes, setUserNotes] = useState(notes)

  useEffect(() => {
    console.log({ email, mobile, notes, paymentDetails, signUpDate, userId })
    setId(userId)
    setUserEmail(email)
    setUserMobile(mobile)
    setUserSignUpDate(signUpDate)
    setUserPaymentDetails(paymentDetails)
    setUserNotes(notes)
  }, [userId, email, mobile, signUpDate, paymentDetails, notes])

  if (isUserSettingsLoading) return <Loading />

  return (
    <main className="container my-5 py-3">
      <h3>User Default Settings</h3>
      <form>
        <section className="row my-5">
          <div className="form-group col-sm">
            <label htmlFor="id">User Id</label>
            <input
              type="text"
              className="form-control"
              id="id"
              name="id"
              value={id}
              readOnly
            />
          </div>
          <div className="col-sm">
            <div className="form-group">
              <label htmlFor="userSignUpDate">Signed up on:</label>
              <input
                type="text"
                className="form-control"
                id="userSignUpDate"
                value={userSignUpDate}
                name="userSignUpDate"
                readOnly
              />
            </div>
          </div>
        </section>
        <section className="row my-5">
          <div className="form-group col-sm">
            <label htmlFor="mobile">Phone</label>
            <input
              type="text"
              className="form-control"
              id="mobile"
              name="mobile"
              value={userMobile}
              onChange={(e) => setUserMobile(e.target.value)}
              placeholder="Phone Number"
            />
          </div>
          <div className="col-sm">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={userEmail}
                name="invoiceNumber"
                readOnly
              />
            </div>
          </div>
        </section>

        <section className="row my-4">
          <div className="form-group col-sm">
            <label htmlFor="paymentDetails">Payment Details</label>
            <textarea
              className="form-control"
              id="paymentDetails"
              name="paymentDetails"
              value={userPaymentDetails}
              onChange={(e) => setUserPaymentDetails(e.target.value)}
              rows={4}
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
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                rows={4}
                placeholder="Any notes?"
              />
            </div>
          </div>
        </section>
      </form>
      <p>
        * All information added here will be automatically prefilled on your
        invoices
      </p>

      <div className="d-flex justify-content-between m-2">
        <Link to="/" className="btn btn-info">
          Back
        </Link>
        <button
          className="btn btn-success"
          onClick={() => {
            updateUserSettings(
              userId,
              userMobile,
              userPaymentDetails,
              userNotes
            ).then(() => navigate('/'))
          }}
        >
          Save
        </button>
      </div>
    </main>
  )
}

export default UserInfo
