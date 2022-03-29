import React, { useReducer } from 'react'
import { reducer } from './reducer'
//interfaces
import { UserInfoInterface, lineItems, StateInterface } from './interfaces'

interface ProviderProp {
  children: React.ReactNode
}

const intialState: StateInterface = {
  invoices: [],
  isEditingInvoice: false,
  userInfo: {
    email: '',
    mobile: '',
    picture: '',
    nickname: '',
    notes: '',
    paymentDetails: '',
    signUpDate: '',
    userId: '',
  },
  isInvoiceLoading: false,
  isUserSettingsLoading: false,
  isPaginationLoading: true,
  amountOfPages: 0,
  totals: { fiscalYearTotal: 0, globalTotal: 0 },
  currentPage: 0,
  setIsEditingInvoice: function (trueOrFalse: boolean): void {
    throw new Error('Function not implemented.')
  },
  getInvoices: function (userId: string, page?: number): Promise<any> {
    throw new Error('Function not implemented.')
  },
  addUserToContext: function (userData: UserInfoInterface): void {
    throw new Error('Function not implemented.')
  },
  getUserFromDb: function (userId: string): Promise<any> {
    throw new Error('Function not implemented.')
  },
  checkIfUserExists: function (userId: string) {
    throw new Error('Function not implemented.')
  },
  addUserToDb: function (
    email: string,
    userId: string,
    nickname: string,
    picture: string,
    name: string
  ): Promise<any> {
    throw new Error('Function not implemented.')
  },
  postInvoiceToServer: function (
    invoiceFrom: string,
    billTo: string,
    invoiceNumber: number,
    date: string,
    subtotal: number,
    image: any,
    lineItems: lineItems[],
    paymentDetails: string,
    notes: string,
    userId: string
  ): Promise<any> {
    throw new Error('Function not implemented.')
  },
  updateInvoice: function (
    userId: string,
    invoiceId: number,
    invoiceFrom: string,
    billTo: string,
    invoiceNumber: number,
    date: string,
    subtotal: number,
    image: any,
    lineItems: lineItems[],
    paymentDetails: string,
    notes: string
  ): Promise<any> {
    throw new Error('Function not implemented.')
  },
  deleteInvoice: function (invoiceId: number, userId: string): Promise<any> {
    throw new Error('Function not implemented.')
  },
  updateUserSettings: function (
    userId: string,
    userMobile: string,
    userPaymentDetails: string,
    userNotes: string
  ): Promise<any> {
    throw new Error('Function not implemented.')
  },
  setIsInvoiceLoading: function (trueOrFalse: boolean): void {
    throw new Error('Function not implemented.')
  },
  setIsUserSettingsLoading: function (trueOrFalse: boolean): void {
    throw new Error('Function not implemented.')
  },
  setIsPaginationLoading: function (trueOrFalse: boolean): void {
    throw new Error('Function not implemented.')
  },
  setCurrentPage: function (pageIndex: number): void {
    throw new Error('Function not implemented.')
  },
}

const AppContext = React.createContext<StateInterface>(intialState)

const AppProvider = ({ children }: ProviderProp) => {
  const [state, dispatch] = useReducer(reducer, intialState)

  /********************************PAGINATION*****************************************/
  const setIsPaginationLoading = (trueOrFalse: boolean) => {
    dispatch({ type: 'SET_IS_PAGINATION_LOADING', payload: trueOrFalse })
  }

  const setCurrentPage = (pageIndex: number) => {
    dispatch({ type: 'SET_CURRENT_PAGE_INDEX', payload: pageIndex })
  }
  /********************************INVOICES*****************************************/

  const setIsInvoiceLoading = (trueOrFalse: boolean) => {
    dispatch({ type: 'SET_IS_INVOICE_LOADING', payload: trueOrFalse })
  }

  const setIsEditingInvoice = (trueOrFalse: boolean) => {
    dispatch({ type: 'SET_IS_EDITING_INVOICE', payload: trueOrFalse })
  }

  //get all invoices from db
  const getInvoices = async (userId: string, page: number = 0) => {
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
    invoiceFrom: string,
    billTo: string,
    invoiceNumber: number,
    date: string,
    subtotal: number,
    image: any,
    lineItems: lineItems[],
    paymentDetails: string,
    notes: string,
    userId: string
  ) => {
    setIsInvoiceLoading(true)
    if (invoiceFrom && billTo && invoiceNumber && date && subtotal) {
      let formData = new FormData()
      formData.append('image', image)
      formData.append('lineItems', JSON.stringify(lineItems))
      formData.append('invoiceFrom', invoiceFrom)
      formData.append('billTo', billTo)
      formData.append('invoiceNumber', invoiceNumber.toString())
      formData.append('date', date)
      formData.append('subtotal', subtotal.toString())
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
    userId: string,
    invoiceId: number,
    invoiceFrom: string,
    billTo: string,
    invoiceNumber: number,
    date: string,
    subtotal: number,
    image: any,
    lineItems: lineItems[],
    paymentDetails: string,
    notes: string
  ) => {
    setIsInvoiceLoading(true)
    if (invoiceFrom && billTo && invoiceNumber && date && subtotal) {
      let formData = new FormData()
      formData.append('image', image)
      formData.append('lineItems', JSON.stringify(lineItems))
      formData.append('invoiceFrom', invoiceFrom)
      formData.append('billTo', billTo)
      formData.append('invoiceNumber', invoiceNumber.toString())
      formData.append('date', date)
      formData.append('subtotal', subtotal.toString())
      formData.append('invoiceId', invoiceId.toString())
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
  const deleteInvoice = async (invoiceId: number, userId: string) => {
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

  const addUserToContext = (userData: UserInfoInterface) => {
    dispatch({ type: 'ADD_USER_INFO', payload: userData })
  }

  const setIsUserSettingsLoading = (trueOrFalse: boolean) => {
    dispatch({ type: 'SET_IS_USER_SETTINGS_LOADING', payload: trueOrFalse })
  }

  //check if user exists in the database
  const checkIfUserExists = async (userId: string) => {
    try {
      const response = await fetch(
        `https://simply-invoice-app.herokuapp.com/api/user/${userId}`
      )
      const data = await response.json()
      return data[0] //return the object inside the array only
    } catch (error) {
      throw error
    }
  }

  //add user to db
  const addUserToDb = async (
    email: string,
    userId: string,
    nickname: string,
    picture: string,
    name: string
  ) => {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({ email, userId, nickname, picture, name }),
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
  const getUserFromDb = async (userId: string) => {
    try {
      const response = await fetch(
        `https://simply-invoice-app.herokuapp.com/api/user/${userId}`
      )
      const data = await response.json()
      dispatch({ type: 'ADD_USER_INFO', payload: data[0] })
      setIsUserSettingsLoading(false)
    } catch (error) {
      throw error
    }
  }

  const updateUserSettings = async (
    userId: string,
    userMobile: string,
    userPaymentDetails: string,
    userNotes: string
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
