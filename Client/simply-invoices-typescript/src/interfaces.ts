import { User } from '@auth0/auth0-react'

//lineItems object Interface
export interface lineItems {
  id: number
  service: string
  quantity: number
  rate: number
  lineItemTotal: number
}

//invoices object
export interface Invoice {
  billTo: string
  date: string
  image: any
  invoiceFrom: string
  invoiceId: number
  invoiceNumber: number
  lineItems: lineItems[]
  notes: string
  paymentDetails: string
  subtotal: number
  userId: string
}

//userinfo
export interface UserInfoInterface {
  email: string
  mobile: string
  notes: string
  paymentDetails: string
  signUpDate: string
  userId: string
}

//State Interface
export interface StateInterface {
  invoices: Invoice[] | any[]
  isEditingInvoice: boolean
  userInfo: UserInfoInterface
  isInvoiceLoading: boolean
  isUserSettingsLoading: boolean
  isPaginationLoading: boolean
  amountOfPages: number
  totals: { fiscalYearTotal: number; globalTotal: number }
  currentPage: number
  setIsEditingInvoice: (trueOrFalse: boolean) => void
  getInvoices: (userId: string, page?: number) => Promise<any>
  addUserToContext: (userData: UserInfoInterface) => void
  getUserFromDb: (userId: string) => void
  checkIfUserExists: (userId: string) => any
  addUserToDb: (email: string, userId: string) => void | any
  postInvoiceToServer: (
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
  ) => Promise<any>
  updateInvoice: (
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
  ) => Promise<any>
  deleteInvoice: (invoiceId: number, userId: string) => Promise<any>
  updateUserSettings: (
    userId: string,
    userMobile: string,
    userPaymentDetails: string,
    userNotes: string
  ) => Promise<any>
  setIsInvoiceLoading: (trueOrFalse: boolean) => void
  setIsUserSettingsLoading: (trueOrFalse: boolean) => void
  setIsPaginationLoading: (trueOrFalse: boolean) => void
  setCurrentPage: (pageIndex: number) => void
}

//actions
export type Actions =
  | { type: 'SET_IS_PAGINATION_LOADING'; payload: boolean }
  | { type: 'SET_CURRENT_PAGE_INDEX'; payload: number }
  | { type: 'SET_IS_INVOICE_LOADING'; payload: boolean }
  | { type: 'SET_IS_EDITING_INVOICE'; payload: boolean }
  | {
      type: 'SET_TOTALS'
      payload: { globalTotal: number; fiscalYearTotal: number }
    }
  | { type: 'SET_AMOUNT_OF_PAGES'; payload: number }
  | { type: 'SET_INVOICES'; payload: Invoice[] }
  | { type: 'ADD_USER_INFO'; payload: UserInfoInterface }
  | { type: 'SET_IS_USER_SETTINGS_LOADING'; payload: boolean }
