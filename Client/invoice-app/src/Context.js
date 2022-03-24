import React, { useReducer } from 'react'
import { reducer } from './reducer'
const AppContext = React.createContext()

const intialState = {
  invoices: [],
  isEditingInvoice: false,
  userInfo: [],
  isInvoiceLoading: false,
  isUserSettingsLoading: false,
  isPaginationLoading: true,
  amountOfPages: 0,
  totals: 0,
  currentPage: 0,
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState)

  /********************************PAGINATION*****************************************/
  const setIsPaginationLoading = (trueOrFalse) => {
    dispatch({ type: 'SET_IS_PAGINATION_LOADING', payload: trueOrFalse })
  }

  const setCurrentPage = (pageIndex) => {
    dispatch({ type: 'SET_CURRENT_PAGE_INDEX', payload: pageIndex })
  }
  /********************************INVOICES*****************************************/

  const setIsInvoiceLoading = (trueOrFalse) => {
    dispatch({ type: 'SET_IS_INVOICE_LOADING', payload: trueOrFalse })
  }

  const setIsEditingInvoice = (trueOrFalse) => {
    dispatch({ type: 'SET_IS_EDITING_INVOICE', payload: trueOrFalse })
  }

  //get all invoices from db
  const getInvoices = async (userId, page = 0) => {
    if (userId) {
      try {
        const response = await fetch(
          `https://simply-invoice-app.herokuapp.com/api/invoice/all/${userId}/?page=${page}&limit=8`
        )
        const data = await response.json()
        console.log(data)
        dispatch({
          type: 'SET_TOTALS',
          payload: { globalTotal: data[2], fiscalYearTotal: data[3] },
        })
        dispatch({ type: 'SET_AMOUNT_OF_PAGES', payload: data[0][0].count })
        dispatch({ type: 'SET_INVOICES', payload: data[1] })
        setIsInvoiceLoading(false)
        setIsPaginationLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
  }

  //posts invoice to server
  const postInvoiceToServer = async (
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
  ) => {
    setIsInvoiceLoading(true)
    if (invoiceFrom && billTo && invoiceNumber && date && subtotal) {
      let formData = new FormData()
      formData.append('image', image)
      formData.append('lineItems', JSON.stringify(lineItems))
      formData.append('invoiceFrom', invoiceFrom)
      formData.append('billTo', billTo)
      formData.append('invoiceNumber', invoiceNumber)
      formData.append('date', date)
      formData.append('subtotal', subtotal)
      formData.append('paymentDetails', paymentDetails)
      formData.append('notes', notes)
      formData.append('userId', userId)

      const options = {
        method: 'POST',
        body: formData,
      }

      try {
        const response = await fetch(
          'https://simply-invoice-app.herokuapp.com/api/invoice/add',
          options
        )
        const data = await response.json()
        console.log(data)
        getInvoices(userId)
      } catch (error) {
        console.log(error)
      }
    }
  }

  //updates invoice on db
  const updateInvoice = async (
    userId,
    invoiceId,
    invoiceFrom,
    billTo,
    invoiceNumber,
    date,
    subtotal,
    image,
    lineItems,
    paymentDetails,
    notes
  ) => {
    setIsInvoiceLoading(true)
    if (invoiceFrom && billTo && invoiceNumber && date && subtotal) {
      let formData = new FormData()
      formData.append('image', image)
      formData.append('lineItems', JSON.stringify(lineItems))
      formData.append('invoiceFrom', invoiceFrom)
      formData.append('billTo', billTo)
      formData.append('invoiceNumber', invoiceNumber)
      formData.append('date', date)
      formData.append('subtotal', subtotal)
      formData.append('invoiceId', invoiceId)
      formData.append('paymentDetails', paymentDetails)
      formData.append('notes', notes)

      const options = {
        method: 'PUT',
        body: formData,
      }
      try {
        const response = await fetch(
          'https://simply-invoice-app.herokuapp.com/api/invoice/update',
          options
        )
        const data = await response.json()
        console.log(data)
        getInvoices(userId)
        setIsEditingInvoice(false)
      } catch (error) {
        console.log(error)
      }
    }
  }

  //delete invoice from db
  const deleteInvoice = async (invoiceId, userId) => {
    setIsInvoiceLoading(true)
    try {
      const response = await fetch(
        `https://simply-invoice-app.herokuapp.com/api/invoice/${invoiceId}`,
        {
          method: 'delete',
        }
      )
      const data = await response.json()
      console.log(data)
      getInvoices(userId)
    } catch (error) {
      throw error
    }
  }
  /********************************USERS******************************************/

  const addUserToContext = (userData) => {
    dispatch({ type: 'ADD_USER_INFO', payload: userData })
  }

  const setIsUserSettingsLoading = (trueOrFalse) => {
    dispatch({ type: 'SET_IS_USER_SETTINGS_LOADING', payload: trueOrFalse })
  }

  //check if user exists in the database
  const checkIfUserExists = async (userId) => {
    try {
      const response = await fetch(
        `https://simply-invoice-app.herokuapp.com/api/user/${userId}`
      )
      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
  }

  //add user to db
  const addUserToDb = async (email, userId) => {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({ email, userId }),
    }
    try {
      const response = await fetch(
        'https://simply-invoice-app.herokuapp.com/api/user/add',
        options
      )
      const data = await response.json()
      console.log(data)
    } catch (error) {
      throw error
    }
  }

  //get user info from db
  const getUserFromDb = async (userId) => {
    try {
      const response = await fetch(
        `https://simply-invoice-app.herokuapp.com/api/user/${userId}`
      )
      const data = await response.json()
      dispatch({ type: 'ADD_USER_INFO', payload: data })
      setIsUserSettingsLoading(false)
    } catch (error) {
      throw error
    }
  }

  const updateUserSettings = async (
    userId,
    userMobile,
    userPaymentDetails,
    userNotes
  ) => {
    setIsUserSettingsLoading(true)
    const options = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        userId,
        userMobile,
        userPaymentDetails,
        userNotes,
      }),
    }

    try {
      const response = await fetch(
        'https://simply-invoice-app.herokuapp.com/api/user/update',
        options
      )
      const data = await response.json()
      console.log(data)
      getUserFromDb(userId)
    } catch (error) {
      throw error
    }
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        setIsEditingInvoice,
        getInvoices,
        addUserToContext,
        getUserFromDb,
        checkIfUserExists,
        addUserToDb,
        postInvoiceToServer,
        updateInvoice,
        deleteInvoice,
        updateUserSettings,
        setIsInvoiceLoading,
        setIsUserSettingsLoading,
        setIsPaginationLoading,
        setCurrentPage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext }
